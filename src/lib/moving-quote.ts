import prisma from "@/lib/prisma";

export type MoveSize = "studio" | "1br" | "2br" | "3br" | "4br+";

export type QuoteRequest = {
  serviceSlug?: string | null;
  originCity?: string | null;
  originState?: string | null;
  destinationCity?: string | null;
  destinationState?: string | null;
  miles?: number | null; // optional, if you have a distance provider
  moveDate?: string | null;
  moveSize?: MoveSize | null;
  addOns?: {
    packing?: "none" | "partial" | "full";
    storage?: boolean;
    junkRemoval?: boolean;
    assembly?: boolean;
  };
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toCents(n: number) {
  return Math.round(n);
}

function normalizeText(v?: string | null) {
  return (v || "").trim().toLowerCase();
}

function normalizeState(v?: string | null) {
  return (v || "").trim().toUpperCase();
}

function hoursForSize(card: any, size: MoveSize) {
  switch (size) {
    case "studio":
      return Number(card.hoursStudio);
    case "1br":
      return Number(card.hours1br);
    case "2br":
      return Number(card.hours2br);
    case "3br":
      return Number(card.hours3br);
    case "4br+":
      return Number(card.hours4brPlus);
  }
}

function pickMoveSize(raw?: string | null): MoveSize {
  const v = (raw || "").toLowerCase().trim();
  if (v.includes("studio")) return "studio";
  if (v.includes("1")) return "1br";
  if (v.includes("2")) return "2br";
  if (v.includes("3")) return "3br";
  if (v.includes("4") || v.includes("5") || v.includes("house") || v.includes("villa")) return "4br+";
  return "2br";
}

function scoreRateCardMatch(
  card: {
    serviceSlug: string | null;
    originState: string | null;
    originCity: string | null;
  },
  req: {
    serviceSlug?: string | null;
    originState?: string | null;
    originCity?: string | null;
  }
) {
  const requestedService = normalizeText(req.serviceSlug);
  const requestedState = normalizeState(req.originState);
  const requestedCity = normalizeText(req.originCity);

  const cardService = normalizeText(card.serviceSlug);
  const cardState = normalizeState(card.originState);
  const cardCity = normalizeText(card.originCity);

  if (cardService && requestedService && cardService !== requestedService) return -1;
  if (cardState && requestedState && cardState !== requestedState) return -1;
  if (cardCity && requestedCity && cardCity !== requestedCity) return -1;

  let score = 0;
  if (cardService && requestedService && cardService === requestedService) score += 100;
  if (cardState && requestedState && cardState === requestedState) score += 60;
  if (cardCity && requestedCity && cardCity === requestedCity) score += 30;

  if (!cardService) score += 5;
  if (!cardState) score += 3;
  if (!cardCity) score += 2;

  return score;
}

function estimateMiles(req: QuoteRequest) {
  if (typeof req.miles === "number" && Number.isFinite(req.miles)) {
    return clamp(req.miles, 0, 4000);
  }

  const originState = normalizeState(req.originState);
  const destinationState = normalizeState(req.destinationState);
  const originCity = normalizeText(req.originCity);
  const destinationCity = normalizeText(req.destinationCity);

  if (originState && destinationState) {
    if (originState === destinationState) {
      if (originCity && destinationCity) {
        return originCity === destinationCity ? 12 : 55;
      }
      return 80;
    }
    return 420;
  }

  return 45;
}

function getDateAdjustment(moveDateRaw?: string | null) {
  if (!moveDateRaw) return { multiplier: 1, reason: "no-date" as const };
  const date = new Date(moveDateRaw);
  if (Number.isNaN(date.getTime())) return { multiplier: 1, reason: "invalid-date" as const };
  const day = date.getUTCDay();
  const dayOfMonth = date.getUTCDate();
  const isWeekend = day === 0 || day === 6;
  const isMonthEnd = dayOfMonth >= 25 || dayOfMonth <= 2;
  if (isWeekend && isMonthEnd) return { multiplier: 1.12, reason: "weekend-month-end" as const };
  if (isWeekend) return { multiplier: 1.08, reason: "weekend" as const };
  if (isMonthEnd) return { multiplier: 1.05, reason: "month-end" as const };
  return { multiplier: 1, reason: "weekday" as const };
}

export async function getMovingQuote(req: QuoteRequest) {
  const originState = normalizeState(req.originState) || undefined;
  const originCity = req.originCity?.trim() || undefined;
  const serviceSlug = req.serviceSlug?.trim() || undefined;

  // Prefer the most specific active rate card.
  const cards = await prisma.movingRateCard.findMany({
    where: {
      active: true,
      OR: [
        // city+state + service
        { originState, originCity, serviceSlug },
        // state + service
        { originState, originCity: null, serviceSlug },
        // any location + service
        { originState: null, originCity: null, serviceSlug },
        // city+state any service
        { originState, originCity, serviceSlug: null },
        // state any service
        { originState, originCity: null, serviceSlug: null },
        // default
        { originState: null, originCity: null, serviceSlug: null },
      ],
    },
    take: 100,
  });

  if (!cards.length) {
    return {
      ok: false as const,
      error: "No rate cards configured",
    };
  }

  const scoredCards = cards
    .map((card) => ({
      card,
      score: scoreRateCardMatch(card, req),
    }))
    .filter((v) => v.score >= 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.card.updatedAt.getTime() - a.card.updatedAt.getTime();
    });

  if (!scoredCards.length) {
    return {
      ok: false as const,
      error: "No matching rate cards for this request",
    };
  }

  const card = scoredCards[0].card;
  const miles = estimateMiles(req);
  const size = req.moveSize || pickMoveSize(null);
  const dateAdj = getDateAdjustment(req.moveDate);

  const addOns = req.addOns || {};
  const packing = addOns.packing || "none";
  const packingMultiplier =
    packing === "full"
      ? Number(card.packingFullMultiplier)
      : packing === "partial"
        ? Number(card.packingPartialMultiplier)
        : 1;

  const hours = hoursForSize(card, size);
  const labor = toCents(hours * Number(card.perHour));
  const distanceFee = toCents(miles * Number(card.perMile));

  const addOnFees =
    (addOns.storage ? Number(card.storageFlat) : 0) +
    (addOns.junkRemoval ? Number(card.junkRemovalFlat) : 0) +
    (addOns.assembly ? Number(card.assemblyFlat) : 0);

  const subtotal = Number(card.basePrice) + labor + distanceFee + addOnFees;
  const packedSubtotal = toCents(subtotal * packingMultiplier);
  const dateAdjusted = toCents(packedSubtotal * dateAdj.multiplier);
  const markup = toCents((dateAdjusted * Number(card.resellerMarkupPercent)) / 100);
  const total = dateAdjusted + markup;

  const minimum = Number(card.minimumPrice) || 0;
  const final = Math.max(total, minimum);

  // Present as a range for sales realism.
  const confidenceSpread =
    req.originState && req.destinationState && req.originCity && req.destinationCity ? 0.08 : 0.16;
  const low = toCents(final * (1 - confidenceSpread));
  const high = toCents(final * (1 + confidenceSpread));

  return {
    ok: true as const,
    currency: card.currency,
    estimate: {
      low,
      high,
      mid: toCents((low + high) / 2),
    },
    breakdown: {
      basePrice: Number(card.basePrice),
      labor,
      distanceFee,
      addOnFees,
      packingMultiplier,
      dateMultiplier: dateAdj.multiplier,
      resellerMarkupPercent: Number(card.resellerMarkupPercent),
      minimumPrice: Number(card.minimumPrice),
    },
    matchedRateCard: {
      id: card.id,
      name: card.name,
    },
    assumptions: {
      milesUsed: miles,
      moveSize: size,
      packing,
      datePricing: dateAdj.reason,
      matchedScore: scoredCards[0].score,
    },
  };
}

