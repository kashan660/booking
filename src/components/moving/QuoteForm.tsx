"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  moveDate: string;
  propertySize: string;
  services: Record<string, boolean>;
  notes: string;
  preferredContact: "whatsapp" | "phone" | "email";
};

const SERVICE_OPTIONS = [
  "Local moving",
  "Long-distance moving",
  "Packing (full)",
  "Packing (partial)",
  "Packing supplies",
  "Storage",
  "Junk removal",
  "Assembly / disassembly",
] as const;

export function QuoteForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [quote, setQuote] = useState<null | {
    currency: string;
    low: number;
    high: number;
    matchedRateCardName?: string;
  }>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const [state, setState] = useState<FormState>(() => ({
    fullName: "",
    phone: "",
    email: "",
    originCity: "",
    originState: "",
    destinationCity: "",
    destinationState: "",
    moveDate: "",
    propertySize: "",
    services: Object.fromEntries(SERVICE_OPTIONS.map((s) => [s, false])),
    notes: "",
    preferredContact: "whatsapp",
  }));

  const selectedServices = useMemo(
    () => Object.entries(state.services).filter(([, v]) => v).map(([k]) => k),
    [state.services]
  );

  const moveSize = useMemo(() => {
    const v = state.propertySize.toLowerCase();
    if (v.includes("studio")) return "studio";
    if (v.includes("1")) return "1br";
    if (v.includes("2")) return "2br";
    if (v.includes("3")) return "3br";
    if (v.includes("4") || v.includes("5") || v.includes("house") || v.includes("office")) return "4br+";
    return "2br";
  }, [state.propertySize]);

  const addOns = useMemo(() => {
    const has = (label: string) => selectedServices.some((s) => s.toLowerCase().includes(label));
    const packingFull = selectedServices.some((s) => s.toLowerCase().includes("packing (full)"));
    const packingPartial = selectedServices.some((s) => s.toLowerCase().includes("packing (partial)"));
    return {
      packing: packingFull ? "full" : packingPartial ? "partial" : "none",
      storage: has("storage"),
      junkRemoval: has("junk"),
      assembly: has("assembly"),
    } as const;
  }, [selectedServices]);

  async function fetchQuote() {
    setQuote(null);
    setQuoteLoading(true);
    try {
      // Pick first selected service as pricing scope (can be refined later)
      const serviceSlug =
        selectedServices.find((s) => s.toLowerCase().includes("local")) ? "local-moving" :
        selectedServices.find((s) => s.toLowerCase().includes("long")) ? "long-distance-moving" :
        selectedServices.find((s) => s.toLowerCase().includes("packing")) ? "packing-services" :
        selectedServices.find((s) => s.toLowerCase().includes("storage")) ? "moving-storage" :
        selectedServices.find((s) => s.toLowerCase().includes("commercial")) ? "commercial-moving" :
        null;

      const res = await fetch("/api/moving/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceSlug,
          originCity: state.originCity || null,
          originState: state.originState || null,
          destinationCity: state.destinationCity || null,
          destinationState: state.destinationState || null,
          moveDate: state.moveDate || null,
          moveSize,
          addOns,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setQuote({
        currency: json.currency,
        low: json.estimate.low,
        high: json.estimate.high,
        matchedRateCardName: json?.matchedRateCard?.name,
      });
    } catch (e) {
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  }

  const money = (cents: number) => `$${(cents / 100).toFixed(0)}`;
  const canGoStep2 =
    state.fullName.trim().length >= 2 &&
    state.phone.trim().length >= 7 &&
    state.originCity.trim().length > 0 &&
    state.destinationCity.trim().length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/moving/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: state.fullName,
          phone: state.phone,
          email: state.email || null,
          originCity: state.originCity || null,
          originState: state.originState || null,
          destinationCity: state.destinationCity || null,
          destinationState: state.destinationState || null,
          moveDate: state.moveDate ? new Date(state.moveDate).toISOString() : null,
          propertySize: state.propertySize || null,
          services: selectedServices,
          notes: state.notes || null,
          preferredContact: state.preferredContact,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit");
      }

      setResult({ ok: true, message: "Thanks — we received your request. We’ll contact you shortly." });
      setState((s) => ({
        ...s,
        notes: "",
      }));
    } catch (err: any) {
      setResult({ ok: false, message: err?.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <span className={`rounded-full px-3 py-1 ${step === 1 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}>
          Step 1
        </span>
        <span className={`rounded-full px-3 py-1 ${step === 2 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}>
          Step 2
        </span>
      </div>

      {step === 1 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={state.fullName}
                onChange={(e) => setState((s) => ({ ...s, fullName: e.target.value }))}
                placeholder="John Williams"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input
                id="phone"
                value={state.phone}
                onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
                placeholder="+1 646 719 7124"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originCity">Origin city</Label>
              <Input
                id="originCity"
                value={state.originCity}
                onChange={(e) => setState((s) => ({ ...s, originCity: e.target.value }))}
                placeholder="Houston"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationCity">Destination city</Label>
              <Input
                id="destinationCity"
                value={state.destinationCity}
                onChange={(e) => setState((s) => ({ ...s, destinationCity: e.target.value }))}
                placeholder="Austin"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" onClick={() => setStep(2)} disabled={!canGoStep2}>
              Continue to details
            </Button>
            <div className="text-xs text-slate-500">Provide name, phone, and route to continue.</div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={state.email}
                onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredContact">Preferred contact</Label>
              <select
                id="preferredContact"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={state.preferredContact}
                onChange={(e) => setState((s) => ({ ...s, preferredContact: e.target.value as any }))}
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="originState">Origin state</Label>
              <Input
                id="originState"
                value={state.originState}
                onChange={(e) => setState((s) => ({ ...s, originState: e.target.value }))}
                placeholder="TX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationState">Destination state</Label>
              <Input
                id="destinationState"
                value={state.destinationState}
                onChange={(e) => setState((s) => ({ ...s, destinationState: e.target.value }))}
                placeholder="TX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moveDate">Move date (optional)</Label>
              <Input
                id="moveDate"
                type="date"
                value={state.moveDate}
                onChange={(e) => setState((s) => ({ ...s, moveDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertySize">Property size (optional)</Label>
              <Input
                id="propertySize"
                value={state.propertySize}
                onChange={(e) => setState((s) => ({ ...s, propertySize: e.target.value }))}
                placeholder="Studio / 1BR / 2BR / House / Office"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-slate-900">Services</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SERVICE_OPTIONS.map((s) => (
                <label key={s} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2">
                  <input
                    type="checkbox"
                    checked={state.services[s]}
                    onChange={(e) => setState((st) => ({ ...st, services: { ...st.services, [s]: e.target.checked } }))}
                  />
                  <span className="text-sm font-medium text-slate-800">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-900">Instant estimate</div>
                <div className="text-sm text-slate-600">
                  Reseller estimate based on location, service type, move date, and partner pricing. Final quote is confirmed after review.
                </div>
              </div>
              <Button type="button" variant="secondary" onClick={fetchQuote} disabled={quoteLoading}>
                {quoteLoading ? "Calculating..." : "Get estimate"}
              </Button>
            </div>
            {quote ? (
              <div className="mt-3 text-sm">
                <div className="text-slate-900 font-semibold">
                  Estimated range: {money(quote.low)} – {money(quote.high)} {quote.currency}
                </div>
                {quote.matchedRateCardName ? (
                  <div className="text-slate-500">Rate card: {quote.matchedRateCardName}</div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={state.notes}
              onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
              placeholder="Stairs/elevator, fragile items, preferred time window, etc."
              rows={4}
            />
          </div>

          {result ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                result.ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-900"
              }`}
            >
              {result.message}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Request quote"}
            </Button>
            <div className="text-xs text-slate-500">By submitting, you agree we may contact you about this move.</div>
          </div>
        </>
      )}
    </form>
  );
}

