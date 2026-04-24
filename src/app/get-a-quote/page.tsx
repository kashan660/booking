import type { Metadata } from "next";
import { QuoteForm } from "@/components/moving/QuoteForm";
import { getSiteSettings } from "@/lib/site-settings";
import { TrustStrip } from "@/components/moving/TrustStrip";
import { buildPageMetadata } from "@/lib/seo";
import { ReviewHighlights } from "@/components/moving/ReviewHighlights";
import { ComplianceSection } from "@/components/moving/ComplianceSection";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `Get a Moving Quote | ${settings.brandName}`,
    description: "Request a fast moving quote. Share your origin, destination, and services needed.",
    path: "/get-a-quote",
    siteName: settings.brandName,
    image: settings.defaultOgImage,
    keywords: ["moving quote", "packers and movers quote", "local moving quote", "long-distance moving estimate"],
  });
}

export default async function GetAQuotePage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Get a free quote</h1>
          <p className="mt-3 text-slate-600">
            We are a reseller network with discounted partner rates from major moving companies. Share your move details to get an accurate estimate.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Prefer WhatsApp? Message us at <span className="font-semibold">{settings.whatsappNumber}</span>.
          </p>
          <div className="mt-6">
            <TrustStrip />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <QuoteForm />
          </div>
          <div className="mt-10 space-y-6">
            <ReviewHighlights />
            <ComplianceSection />
          </div>
        </div>
      </div>
    </div>
  );
}

