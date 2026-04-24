import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function html(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

function cityContent({ city, state }) {
  const location = state ? `${city}, ${state}` : city;
  return html`
    <h2>Trusted packers and movers in ${location}</h2>
    <p>
      Looking for a reliable <strong>moving company in ${location}</strong>? Our trained crews help with
      <strong>local moving</strong>, <strong>long-distance moving</strong>, and <strong>commercial moves</strong>.
      Add <strong>packing services</strong>, <strong>moving supplies</strong>, and <strong>storage</strong> if you need flexibility.
    </p>

    <h3>What’s included</h3>
    <ul>
      <li>Furniture padding, stretch wrap, and careful loading</li>
      <li>Floor and doorway protection (when requested)</li>
      <li>Clear communication and a move-day checklist</li>
    </ul>

    <h3>How pricing works</h3>
    <p>
      Your quote depends on home size, stairs/elevator, distance, and add-ons like packing or storage.
      Share your origin, destination, and move date for the fastest estimate.
    </p>

    <h3>Keywords we target</h3>
    <p>
      Packers and movers ${location}, movers in ${location}, moving company ${location}, local movers ${location},
      long distance movers ${location}, packing and moving services ${location}.
    </p>
  `;
}

function serviceContent({ name }) {
  return html`
    <h2>${name} — what to expect</h2>
    <p>
      This service is designed for customers who want predictable scheduling, careful handling, and clear scope.
      You can combine ${name.toLowerCase()} with packing, supplies, and storage.
    </p>

    <h3>Best for</h3>
    <ul>
      <li>Apartments and houses</li>
      <li>Small businesses and offices</li>
      <li>Time-sensitive moves</li>
    </ul>

    <h3>Tips to save money</h3>
    <ul>
      <li>Declutter before you move</li>
      <li>Label boxes by room</li>
      <li>Book earlier for better availability</li>
    </ul>

    <h3>SEO keywords</h3>
    <p>
      ${name}, packers and movers, moving services USA, professional movers, packing service, storage.
    </p>
  `;
}

async function upsertSettings() {
  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    return prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        brandName: existing.brandName || "Lugvia Movers",
        whatsappNumber: existing.whatsappNumber || "+16467197124",
        supportEmail: "support@luggvia.com",
        addressLine: existing.addressLine || "United States",
      },
    });
  }

  return prisma.siteSettings.create({
    data: {
      brandName: "Lugvia Movers",
      whatsappNumber: "+16467197124",
      supportEmail: "support@luggvia.com",
      addressLine: "United States",
    },
  });
}

async function seedMovingServices() {
  const services = [
    {
      name: "Local Moving",
      slug: "local-moving",
      shortIntro: "Apartment and house moves with careful handling and clear scheduling.",
      description: "Local movers for apartments, houses, and small businesses. Add packing, supplies, and storage.",
      keywords: ["local moving", "local movers", "packers and movers", "moving company", "residential moving"],
    },
    {
      name: "Long-Distance Moving",
      slug: "long-distance-moving",
      shortIntro: "Cross-city and cross-state moves with dependable pickup and delivery windows.",
      description: "Long distance movers in the USA. Flexible scheduling, packing options, and storage when needed.",
      keywords: ["long distance moving", "interstate movers", "cross country moving", "moving company USA"],
    },
    {
      name: "Packing Services",
      slug: "packing-services",
      shortIntro: "Full or partial packing, fragile packing, and moving supplies.",
      description: "Professional packing services: full packing, partial packing, fragile items, and supplies.",
      keywords: ["packing services", "packers and movers", "moving supplies", "fragile packing", "full packing"],
    },
    {
      name: "Commercial / Office Moving",
      slug: "commercial-moving",
      shortIntro: "Office moves with labeling, coordination, and minimal downtime.",
      description: "Commercial movers for offices and small businesses. Coordinated moving plans and careful handling.",
      keywords: ["commercial moving", "office movers", "business relocation", "commercial movers"],
    },
    {
      name: "Storage",
      slug: "moving-storage",
      shortIntro: "Short-term storage during transitions, remodels, or delayed closings.",
      description: "Moving storage options for flexible timelines and temporary transitions.",
      keywords: ["moving storage", "storage during move", "short term storage", "storage solutions"],
    },
  ];

  for (const s of services) {
    await prisma.movingService.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        shortIntro: s.shortIntro,
        description: s.description,
        keywords: s.keywords,
        content: serviceContent({ name: s.name }),
        published: true,
        seoTitle: `${s.name} | Packers and Movers in USA`,
      },
      create: {
        name: s.name,
        slug: s.slug,
        shortIntro: s.shortIntro,
        description: s.description,
        keywords: s.keywords,
        content: serviceContent({ name: s.name }),
        published: true,
        seoTitle: `${s.name} | Packers and Movers in USA`,
      },
    });
  }
}

async function seedMovingCities() {
  const cities = [
    { name: "Houston", slug: "houston-tx", state: "TX" },
    { name: "Waco", slug: "waco-tx", state: "TX" },
    { name: "Lubbock", slug: "lubbock-tx", state: "TX" },
    { name: "Corpus Christi", slug: "corpus-christi-tx", state: "TX" },
    { name: "Baton Rouge", slug: "baton-rouge-la", state: "LA" },
    { name: "Shreveport", slug: "shreveport-la", state: "LA" },
    { name: "Mobile", slug: "mobile-al", state: "AL" },
    { name: "Augusta", slug: "augusta-ga", state: "GA" },
    { name: "Spokane", slug: "spokane-wa", state: "WA" },
    { name: "Boise", slug: "boise-id", state: "ID" },
    { name: "Reno", slug: "reno-nv", state: "NV" },
  ];

  for (const c of cities) {
    await prisma.movingCity.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        state: c.state,
        country: "USA",
        content: cityContent({ city: c.name, state: c.state }),
        published: true,
        seoTitle: `Movers in ${c.name}, ${c.state} | Packers and Movers`,
        description: `Hire packers and movers in ${c.name}, ${c.state} for local and long-distance moves. Optional packing, supplies, and storage.`,
        keywords: [
          `movers in ${c.name}`,
          `moving company ${c.name}`,
          `packers and movers ${c.name}`,
          `local movers ${c.name}`,
          `long distance movers ${c.name}`,
        ],
        faqs: [
          {
            question: `How much do movers cost in ${c.name}?`,
            answer:
              "Pricing depends on home size, stairs/elevator, distance, and add-ons like packing or storage. Request a quote with your move details for an accurate estimate.",
          },
          {
            question: "Do you offer packing and supplies?",
            answer:
              "Yes. Choose full packing, partial packing, fragile-only packing, and moving supplies based on your timeline and budget.",
          },
          {
            question: "Can I book storage during my move?",
            answer:
              "Yes. Short-term storage is available for delayed closings, remodels, or flexible delivery windows.",
          },
        ],
      },
      create: {
        name: c.name,
        slug: c.slug,
        state: c.state,
        country: "USA",
        content: cityContent({ city: c.name, state: c.state }),
        published: true,
        seoTitle: `Movers in ${c.name}, ${c.state} | Packers and Movers`,
        description: `Hire packers and movers in ${c.name}, ${c.state} for local and long-distance moves. Optional packing, supplies, and storage.`,
        keywords: [
          `movers in ${c.name}`,
          `moving company ${c.name}`,
          `packers and movers ${c.name}`,
          `local movers ${c.name}`,
          `long distance movers ${c.name}`,
        ],
        faqs: [
          {
            question: `How much do movers cost in ${c.name}?`,
            answer:
              "Pricing depends on home size, stairs/elevator, distance, and add-ons like packing or storage. Request a quote with your move details for an accurate estimate.",
          },
          {
            question: "Do you offer packing and supplies?",
            answer:
              "Yes. Choose full packing, partial packing, fragile-only packing, and moving supplies based on your timeline and budget.",
          },
          {
            question: "Can I book storage during my move?",
            answer:
              "Yes. Short-term storage is available for delayed closings, remodels, or flexible delivery windows.",
          },
        ],
      },
    });
  }
}

async function seedGuides() {
  const guides = [
    {
      title: "Moving Checklist (Printable Steps)",
      slug: "moving-checklist",
      description: "A step-by-step moving checklist for a stress-free local or long-distance move.",
      seoTitle: "Moving Checklist | Packers and Movers Guide",
      keywords: ["moving checklist", "moving tips", "packing checklist", "moving plan"],
      content: html`
        <h2>Moving checklist</h2>
        <p>This checklist helps you plan a <strong>local move</strong> or <strong>long-distance move</strong> with fewer surprises.</p>
        <h3>4–6 weeks before</h3>
        <ul>
          <li>Get quotes from packers and movers</li>
          <li>Declutter rooms and donate items</li>
          <li>Measure doorways and large furniture</li>
        </ul>
        <h3>1–2 weeks before</h3>
        <ul>
          <li>Book packing services (full/partial) if needed</li>
          <li>Collect supplies: boxes, tape, labels</li>
          <li>Confirm move date and access notes (stairs/elevator)</li>
        </ul>
        <h3>Move day</h3>
        <ul>
          <li>Keep essentials box (docs, meds, chargers)</li>
          <li>Do a final walkthrough</li>
          <li>Take photos of high-value items</li>
        </ul>
      `,
    },
    {
      title: "How to Choose a Moving Company (Avoid Scams)",
      slug: "choose-moving-company",
      description: "What to check before booking movers: reviews, licensing, insurance, and pricing.",
      seoTitle: "How to Choose Movers | Moving Company Tips",
      keywords: ["choose movers", "moving company tips", "avoid moving scams", "licensed movers"],
      content: html`
        <h2>How to choose movers</h2>
        <p>Use these checks to choose a <strong>moving company</strong> confidently.</p>
        <ul>
          <li>Read recent reviews and verify business details</li>
          <li>Confirm written estimates and what’s included</li>
          <li>Ask about packing, storage, and delivery windows</li>
          <li>Get clarity on stairs/elevator fees and heavy items</li>
        </ul>
      `,
    },
    {
      title: "Packing Tips for Fragile Items (Kitchen & Glassware)",
      slug: "packing-fragile-items",
      description: "Practical packing tips for dishes, glasses, TVs, and electronics.",
      seoTitle: "Packing Fragile Items | Packing Tips",
      keywords: ["packing fragile items", "packing tips", "kitchen packing", "glassware packing"],
      content: html`
        <h2>Packing fragile items</h2>
        <p>Protect your items with the right materials and labeling.</p>
        <ul>
          <li>Use dish packs or double-wall boxes</li>
          <li>Wrap each item individually</li>
          <li>Fill empty space to prevent shifting</li>
          <li>Label: <strong>FRAGILE</strong> + room + “This Side Up”</li>
        </ul>
      `,
    },
  ];

  for (const g of guides) {
    await prisma.page.upsert({
      where: { slug: g.slug },
      update: {
        title: g.title,
        description: g.description,
        seoTitle: g.seoTitle,
        keywords: g.keywords,
        content: g.content,
        published: true,
        template: "guide",
      },
      create: {
        title: g.title,
        slug: g.slug,
        description: g.description,
        seoTitle: g.seoTitle,
        keywords: g.keywords,
        content: g.content,
        published: true,
        template: "guide",
      },
    });
  }
}

async function seedRateCards() {
  // Default fallback card for any service/location
  await prisma.movingRateCard.upsert({
    where: { id: "default-card" },
    update: {},
    create: {
      id: "default-card",
      name: "Default USA (Any Service)",
      active: true,
      serviceSlug: null,
      originState: null,
      originCity: null,
      currency: "USD",
      minimumPrice: 19900,
      basePrice: 7900,
      perMile: 180,
      perHour: 8500,
      hoursStudio: 2.5,
      hours1br: 3.5,
      hours2br: 5.0,
      hours3br: 7.0,
      hours4brPlus: 9.0,
      packingFullMultiplier: 1.35,
      packingPartialMultiplier: 1.2,
      storageFlat: 15000,
      junkRemovalFlat: 12000,
      assemblyFlat: 8000,
      resellerMarkupPercent: 20,
    },
  });

  // Example: Houston local moving is cheaper base, higher hourly
  await prisma.movingRateCard.upsert({
    where: { id: "houston-local" },
    update: {},
    create: {
      id: "houston-local",
      name: "Houston, TX (Local Moving)",
      active: true,
      serviceSlug: "local-moving",
      originState: "TX",
      originCity: "Houston",
      currency: "USD",
      minimumPrice: 17900,
      basePrice: 5900,
      perMile: 120,
      perHour: 9500,
      hoursStudio: 2.5,
      hours1br: 3.5,
      hours2br: 5.0,
      hours3br: 7.0,
      hours4brPlus: 9.0,
      packingFullMultiplier: 1.35,
      packingPartialMultiplier: 1.2,
      storageFlat: 15000,
      junkRemovalFlat: 12000,
      assemblyFlat: 8000,
      resellerMarkupPercent: 20,
    },
  });
}

async function main() {
  await upsertSettings();
  await seedMovingServices();
  await seedMovingCities();
  await seedGuides();
  await seedRateCards();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

