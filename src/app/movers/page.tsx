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
    title: `Cities We Serve | ${settings.brandName}`,
    description:
      "Browse movers by city. Find local packing and moving help with optional storage and long-distance services.",
    path: "/movers",
    siteName: settings.brandName,
    image: settings.defaultOgImage,
    keywords: ["movers by city", "local movers", "packers and movers near me", "moving company city pages"],
  });
}

export const revalidate = 3600;

export default async function MoversIndexPage() {
  const settings = await getSiteSettings();
  let cities: { id: string; name: string; slug: string; state: string | null; country: string }[] = [];
  try {
    cities = await prisma.movingCity.findMany({
      where: { published: true },
      orderBy: [{ country: "asc" }, { state: "asc" }, { name: "asc" }],
      select: { id: true, name: true, slug: true, state: true, country: true },
    });
  } catch {
    cities = [];
  }

  // Placeholder cities if database is empty
  const placeholderCities = cities.length === 0 ? [
    { id: "1", name: "Houston", slug: "houston", state: "TX", country: "USA" },
    { id: "2", name: "Austin", slug: "austin", state: "TX", country: "USA" },
    { id: "3", name: "Dallas", slug: "dallas", state: "TX", country: "USA" },
    { id: "4", name: "San Antonio", slug: "san-antonio", state: "TX", country: "USA" },
    { id: "5", name: "Phoenix", slug: "phoenix", state: "AZ", country: "USA" },
    { id: "6", name: "Los Angeles", slug: "los-angeles", state: "CA", country: "USA" },
    { id: "7", name: "San Diego", slug: "san-diego", state: "CA", country: "USA" },
    { id: "8", name: "Chicago", slug: "chicago", state: "IL", country: "USA" },
    { id: "9", name: "Miami", slug: "miami", state: "FL", country: "USA" },
  ] : [];

  const displayCities = cities.length > 0 ? cities : placeholderCities;

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Cities we serve</h1>
          <p className="mt-3 text-slate-600">
            Explore city pages for movers, packing, and storage. We focus on areas with fewer available moving companies.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Need help fast? Chat on WhatsApp: <span className="font-semibold">{settings.whatsappNumber}</span>
          </p>
        </div>

        {cities.length === 0 && (
          <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Showing placeholder cities. Run <code className="bg-blue-100 px-2 py-0.5 rounded">node prisma/seed-cities.mjs</code> to add real city pages.
            </p>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayCities.map((c) => (
            <Link
              key={c.id}
              href={`/movers/${c.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-lg font-bold text-slate-900">{c.name}</div>
              <div className="mt-1 text-sm text-slate-600">
                {c.state ? `${c.state}, ` : ""}
                {c.country}
              </div>
              <div className="mt-3 text-sm font-semibold text-emerald-700">View movers in {c.name}</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          <TrustSignals />
          <ReviewHighlights />
          <ComplianceSection />
          <InternalLinksSection
            title="Explore service categories"
            description="Compare moving service types before requesting your quote."
            links={[
              { href: "/services", label: "All Services" },
              { href: "/guides", label: "Moving Guides" },
              { href: "/get-a-quote", label: "Get a Quote" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

