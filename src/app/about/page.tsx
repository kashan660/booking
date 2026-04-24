import type { Metadata } from "next";
import { Building2, Handshake, ShieldCheck, TrendingDown } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `About ${settings.brandName}`,
    description:
      "We are a reseller partner network that secures discounted rates from large moving companies and passes savings to customers.",
  };
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">About {settings.brandName}</h1>
          <p className="mt-4 text-lg text-slate-600">
            We are a reseller, not a carrier. Our team works directly with major moving companies to secure partner
            discounts and deliver those lower rates to our customers.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">How we operate</h2>
            </div>
            <p className="mt-3 text-slate-600">
              We compare partner availability, service quality, and price in your lane. You get one clear quote and we
              handle provider coordination.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <Handshake className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Partner network</h2>
            </div>
            <p className="mt-3 text-slate-600">
              We maintain relationships with established moving providers across key cities to unlock better commercial
              rates than most customers can negotiate alone.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Discount pass-through</h2>
            </div>
            <p className="mt-3 text-slate-600">
              Our pricing model is built to pass discount value to customers while maintaining transparent service
              coordination and support.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Quality control</h2>
            </div>
            <p className="mt-3 text-slate-600">
              Every quote is reviewed against route, move size, service add-ons, and partner card rules so customers
              get practical and realistic estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
