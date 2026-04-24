"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function RateCardEditForm({ card }: { card: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({
    ...card,
    originState: card.originState || "",
    originCity: card.originCity || "",
    serviceSlug: card.serviceSlug || "",
  });

  async function onSave() {
    setLoading(true);
    try {
      const res = await fetch(`/api/moving/rate-cards/${card.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          active: !!form.active,
          serviceSlug: form.serviceSlug || null,
          originState: form.originState || null,
          originCity: form.originCity || null,
          currency: form.currency || "USD",
          minimumPrice: form.minimumPrice,
          basePrice: form.basePrice,
          perMile: form.perMile,
          perHour: form.perHour,
          hoursStudio: form.hoursStudio,
          hours1br: form.hours1br,
          hours2br: form.hours2br,
          hours3br: form.hours3br,
          hours4brPlus: form.hours4brPlus,
          packingFullMultiplier: form.packingFullMultiplier,
          packingPartialMultiplier: form.packingPartialMultiplier,
          storageFlat: form.storageFlat,
          junkRemovalFlat: form.junkRemovalFlat,
          assemblyFlat: form.assemblyFlat,
          resellerMarkupPercent: form.resellerMarkupPercent,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/moving/pricing");
      router.refresh();
    } catch (e: any) {
      alert(e?.message || "Failed to save.");
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Rate Card</h1>
          <p className="text-sm text-gray-500 mt-1">{card.name}</p>
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
            <Label>Service slug (blank = any)</Label>
            <Input value={form.serviceSlug} onChange={(e) => setForm((f: any) => ({ ...f, serviceSlug: e.target.value }))} placeholder="local-moving" />
          </div>
          <div className="space-y-2">
            <Label>Origin state (optional)</Label>
            <Input value={form.originState} onChange={(e) => setForm((f: any) => ({ ...f, originState: e.target.value }))} placeholder="TX" />
          </div>
          <div className="space-y-2">
            <Label>Origin city (optional)</Label>
            <Input value={form.originCity} onChange={(e) => setForm((f: any) => ({ ...f, originCity: e.target.value }))} placeholder="Houston" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Minimum price (cents)</Label>
            <Input value={String(form.minimumPrice)} onChange={(e) => setForm((f: any) => ({ ...f, minimumPrice: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Base price (cents)</Label>
            <Input value={String(form.basePrice)} onChange={(e) => setForm((f: any) => ({ ...f, basePrice: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Reseller markup %</Label>
            <Input value={String(form.resellerMarkupPercent)} onChange={(e) => setForm((f: any) => ({ ...f, resellerMarkupPercent: e.target.value }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Per mile (cents)</Label>
            <Input value={String(form.perMile)} onChange={(e) => setForm((f: any) => ({ ...f, perMile: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Per hour (cents)</Label>
            <Input value={String(form.perHour)} onChange={(e) => setForm((f: any) => ({ ...f, perHour: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Storage flat (cents)</Label>
            <Input value={String(form.storageFlat)} onChange={(e) => setForm((f: any) => ({ ...f, storageFlat: e.target.value }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Packing full multiplier</Label>
            <Input value={String(form.packingFullMultiplier)} onChange={(e) => setForm((f: any) => ({ ...f, packingFullMultiplier: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Packing partial multiplier</Label>
            <Input value={String(form.packingPartialMultiplier)} onChange={(e) => setForm((f: any) => ({ ...f, packingPartialMultiplier: e.target.value }))} />
          </div>
        </div>

        <Button onClick={onSave} disabled={loading} className="flex items-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </Button>
      </div>
    </div>
  );
}

