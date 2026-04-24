"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function VehicleRegistrationPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(false);
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      ownerName: String(data.get("ownerName") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || "") || null,
      vehicleType: String(data.get("vehicleType") || ""),
      plateNumber: String(data.get("plateNumber") || ""),
      capacity: String(data.get("capacity") || "") || null,
      serviceCoverage: String(data.get("coverage") || "") || null,
      notes: String(data.get("notes") || "") || null,
    };

    try {
      const res = await fetch("/api/team/vehicles", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to submit");
      }

      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      setError(err?.message || "Failed to submit registration");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Vehicle registration</h1>
        <p className="mt-3 text-slate-600">
          Register your vehicle for mover assignments in our partner network.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
          <div className="relative h-56 w-full">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80"
              alt="Moving truck and fleet registration"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Accepted vehicles: cargo vans, box trucks, and long-route support units with valid insurance.
          </div>
        </div>

        <form className="mt-8 space-y-5 rounded-2xl border border-slate-200 p-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner name *</Label>
              <Input 
                id="ownerName" 
                name="ownerName" 
                placeholder="John Smith" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone / WhatsApp *</Label>
              <Input 
                id="phone" 
                name="phone" 
                placeholder="+1 (555) 123-4567" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="john.smith@example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle type *</Label>
              <Input 
                id="vehicleType" 
                name="vehicleType" 
                placeholder="Cargo Van, 16ft Box Truck, 26ft Moving Truck" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plateNumber">Plate number *</Label>
              <Input 
                id="plateNumber" 
                name="plateNumber" 
                placeholder="ABC-1234" 
                required 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="capacity">Capacity details (optional)</Label>
              <Input 
                id="capacity" 
                name="capacity" 
                placeholder="16ft box truck, 3.5 ton capacity, lift gate available, climate controlled" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverage">Service coverage *</Label>
            <Textarea
              id="coverage"
              name="coverage"
              placeholder="List cities and states you can serve (e.g., Houston, Austin, Dallas, San Antonio - Texas statewide). Include your typical availability (weekdays, weekends, 24/7, etc.)"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Insurance details (liability coverage amount), special equipment (dollies, straps, blankets), helper/crew availability, any certifications or special capabilities..."
              rows={3}
            />
          </div>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit registration"}
          </Button>
        </form>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>
        ) : null}
        {submitted ? (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Registration received. Our team will contact you after verification.
          </p>
        ) : null}
      </div>
    </div>
  );
}
