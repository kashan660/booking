import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { buildPageMetadata } from "@/lib/seo";
import { TrustSignals } from "@/components/moving/TrustSignals";
import { InternalLinksSection } from "@/components/moving/InternalLinksSection";
import { ReviewHighlights } from "@/components/moving/ReviewHighlights";
import { ComplianceSection } from "@/components/moving/ComplianceSection";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `Moving Services | ${settings.brandName}`,
    description: "Local moving, long-distance moving, packing, storage, and more. Browse services and request a quote.",
    path: "/services",
    siteName: settings.brandName,
    image: settings.defaultOgImage,
    keywords: ["moving services", "local moving", "long-distance moving", "packing services", "storage"],
  });
}

export const revalidate = 3600;

export default async function ServicesIndexPage() {
  let services: { id: string; name: string; slug: string; shortIntro: string | null }[] = [];
  try {
    services = await prisma.movingService.findMany({
      where: { published: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, shortIntro: true },
    });
  } catch {
    services = [];
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Moving services</h1>
          <p className="mt-3 text-slate-600">
            Select a service to see what’s included, how it works, and which add-ons to consider.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className="text-xl font-bold text-slate-900">{s.name}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {s.shortIntro || "Professional movers, careful handling, and clear communication from start to finish."}
              </p>
              <div className="mt-4 text-sm font-semibold text-emerald-700">View details</div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/get-a-quote"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow hover:bg-emerald-700 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>

        <div className="mt-12 space-y-6">
          <TrustSignals />
          <ReviewHighlights />
          <ComplianceSection />
          <InternalLinksSection
            title="Explore by city"
            description="Need location-specific movers? Browse city pages with local details and FAQs."
            links={[
              { href: "/movers", label: "All Cities" },
              { href: "/guides", label: "Moving Guides" },
              { href: "/get-a-quote", label: "Get a Quote" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

