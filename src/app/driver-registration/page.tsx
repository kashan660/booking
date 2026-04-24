"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DriverRegistrationPage() {
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
      fullName: String(data.get("fullName") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || "") || null,
      licenseType: String(data.get("licenseType") || ""),
      yearsExperience: data.get("yearsExperience") ? Number(data.get("yearsExperience")) : null,
      primaryCity: String(data.get("primaryCity") || "") || null,
      notes: String(data.get("experience") || "") || null,
    };

    try {
      const res = await fetch("/api/team/drivers", {
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
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Driver registration</h1>
        <p className="mt-3 text-slate-600">
          Join our reseller network delivery team. Submit your details and our operations team will contact you.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
          <div className="relative h-56 w-full">
            <Image
              src="https://images.unsplash.com/photo-1618248199961-0f3ad1988471?auto=format&fit=crop&w=1600&q=80"
              alt="Professional moving driver with truck"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Preferred profile: verified license, customer-friendly communication, and city-to-city move experience.
          </div>
        </div>

        <form className="mt-8 space-y-5 rounded-2xl border border-slate-200 p-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name *</Label>
              <Input 
                id="fullName" 
                name="fullName" 
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
              <Label htmlFor="licenseType">License type *</Label>
              <Input 
                id="licenseType" 
                name="licenseType" 
                placeholder="Class A CDL, Class B, etc." 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of experience (optional)</Label>
              <Input 
                id="yearsExperience" 
                name="yearsExperience" 
                type="number" 
                min={0} 
                max={60} 
                placeholder="5" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryCity">Primary city (optional)</Label>
              <Input 
                id="primaryCity" 
                name="primaryCity" 
                placeholder="Houston, TX" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience summary *</Label>
            <Textarea
              id="experience"
              name="experience"
              placeholder="Describe your driving experience, types of vehicles you've operated, routes you're familiar with, any special certifications (hazmat, tanker, etc.), and your availability..."
              rows={4}
              required
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
            Registration received. Our team will contact you for verification.
          </p>
        ) : null}
      </div>
    </div>
  );
}
