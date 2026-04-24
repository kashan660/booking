"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Service = { slug: string; name: string };

export default function NewRateCardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const [form, setForm] = useState<any>({
    name: "Default USA Rate Card",
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
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/moving/services");
        const json = await res.json();
        setServices((json || []).map((s: any) => ({ slug: s.slug, name: s.name })));
      } catch {
        setServices([]);
      }
    })();
  }, []);

  async function onSave() {
    setLoading(true);
    try {
      const res = await fetch("/api/moving/rate-cards", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/moving/pricing");
      router.refresh();
    } catch (e: any) {
      alert(e?.message || "Failed to create.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/moving/pricing">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Rate Card</h1>
          <p className="text-sm text-gray-500 mt-1">Pricing rules used by the instant quote API.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="active">Active</Label>
          <Switch id="active" checked={!!form.active} onCheckedChange={(v) => setForm((f: any) => ({ ...f, active: v }))} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm((f: any) => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Service (optional)</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.serviceSlug || ""}
              onChange={(e) => setForm((f: any) => ({ ...f, serviceSlug: e.target.value || null }))}
            >
              <option value="">Any service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} ({s.slug})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Origin state (optional)</Label>
            <Input value={form.originState || ""} onChange={(e) => setForm((f: any) => ({ ...f, originState: e.target.value || null }))} placeholder="TX" />
          </div>
          <div className="space-y-2">
            <Label>Origin city (optional)</Label>
            <Input value={form.originCity || ""} onChange={(e) => setForm((f: any) => ({ ...f, originCity: e.target.value || null }))} placeholder="Houston" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Minimum price (cents)</Label>
            <Input value={form.minimumPrice} onChange={(e) => setForm((f: any) => ({ ...f, minimumPrice: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Base price (cents)</Label>
            <Input value={form.basePrice} onChange={(e) => setForm((f: any) => ({ ...f, basePrice: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Reseller markup %</Label>
            <Input value={form.resellerMarkupPercent} onChange={(e) => setForm((f: any) => ({ ...f, resellerMarkupPercent: e.target.value }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Per mile (cents)</Label>
            <Input value={form.perMile} onChange={(e) => setForm((f: any) => ({ ...f, perMile: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Per hour (cents)</Label>
            <Input value={form.perHour} onChange={(e) => setForm((f: any) => ({ ...f, perHour: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Storage flat (cents)</Label>
            <Input value={form.storageFlat} onChange={(e) => setForm((f: any) => ({ ...f, storageFlat: e.target.value }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Packing full multiplier</Label>
            <Input value={form.packingFullMultiplier} onChange={(e) => setForm((f: any) => ({ ...f, packingFullMultiplier: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Packing partial multiplier</Label>
            <Input value={form.packingPartialMultiplier} onChange={(e) => setForm((f: any) => ({ ...f, packingPartialMultiplier: e.target.value }))} />
          </div>
        </div>

        <Button onClick={onSave} disabled={loading} className="flex items-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save rate card
        </Button>
      </div>
    </div>
  );
}

