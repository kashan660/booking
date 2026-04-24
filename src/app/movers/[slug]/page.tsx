import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { TrustSignals } from "@/components/moving/TrustSignals";
import { InternalLinksSection } from "@/components/moving/InternalLinksSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const cities = await prisma.movingCity.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return cities.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const city = await prisma.movingCity.findUnique({ where: { slug } });
  if (!city) return { title: "City Not Found" };

  return buildPageMetadata({
    title: city.seoTitle || `Movers in ${city.name}${city.state ? `, ${city.state}` : ""} | ${settings.brandName}`,
    description:
      city.description ||
      `Book packers and movers in ${city.name}${city.state ? `, ${city.state}` : ""}. Local and long-distance moving, packing, and storage options.`,
    path: `/movers/${slug}`,
    siteName: settings.brandName,
    image: city.ogImage || city.heroImage || settings.defaultOgImage,
    keywords: city.keywords,
  });
}

export default async function CityMoversPage({ params }: PageProps) {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const city = await prisma.movingCity.findUnique({ where: { slug } });
  if (!city || (!city.published && process.env.NODE_ENV === "production")) notFound();

  const services = await prisma.movingService.findMany({
    where: { published: true },
    orderBy: { name: "asc" },
    select: { name: true, slug: true },
    take: 12,
  });
  const relatedCities = await prisma.movingCity.findMany({
    where: { published: true, slug: { not: city.slug } },
    orderBy: { updatedAt: "desc" },
    select: { name: true, slug: true },
    take: 8,
  });

  const titleCity = `${city.name}${city.state ? `, ${city.state}` : ""}`;
  const faqItems = Array.isArray(city.faqs) ? city.faqs : [];
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems
            .filter((f: any) => f?.question && f?.answer)
            .map((f: any) => ({
              "@type": "Question",
              name: String(f.question),
              acceptedAnswer: { "@type": "Answer", text: String(f.answer) },
            })),
        }
      : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lugvia.com/" },
      { "@type": "ListItem", position: 2, name: "Cities", item: "https://lugvia.com/movers" },
      { "@type": "ListItem", position: 3, name: `Movers in ${titleCity}`, item: `https://lugvia.com/movers/${slug}` },
    ],
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: `${settings.brandName} - ${titleCity}`,
    description:
      city.description || `Packers and movers in ${titleCity} for local and long-distance relocation with optional packing.`,
    areaServed: titleCity,
    telephone: settings.primaryPhone || settings.whatsappNumber,
    email: settings.supportEmail || undefined,
    url: `https://lugvia.com/movers/${slug}`,
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          {faqSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          ) : null}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
          <div className="mb-6">
            <Link
              href="/movers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to cities
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Movers in {titleCity}</h1>
              <p className="mt-3 text-slate-600">
                Reliable packers and movers for apartments, houses, and businesses. Add packing, supplies, and storage as
                needed.
              </p>
            </div>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold shadow hover:bg-emerald-700 transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <article
              className="prose prose-slate lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: city.content }}
            />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">Services available in {city.name}</h2>
              <p className="mt-2 text-sm text-slate-600">Pick a service to learn what’s included.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">Need help now?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Share your move details and we’ll reply with the best available option.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-900">WhatsApp</span>:{" "}
                  <span className="text-slate-700">{settings.whatsappNumber}</span>
                </div>
                {settings.primaryPhone ? (
                  <div>
                    <span className="font-semibold text-slate-900">Phone</span>:{" "}
                    <span className="text-slate-700">{settings.primaryPhone}</span>
                  </div>
                ) : null}
                {settings.supportEmail ? (
                  <div>
                    <span className="font-semibold text-slate-900">Email</span>:{" "}
                    <span className="text-slate-700">{settings.supportEmail}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {faqItems.length > 0 ? (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
              <div className="mt-4 space-y-4">
                {faqItems.map((f: any, idx: number) => (
                  <div key={`${idx}-${f?.question || "faq"}`}>
                    <div className="font-semibold text-slate-900">{f?.question}</div>
                    <div className="mt-1 text-slate-600">{f?.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-10 space-y-6">
            <TrustSignals />
            <InternalLinksSection
              title="Nearby and related city pages"
              description="Compare coverage and request the best route-based quote."
              links={relatedCities.map((c) => ({ href: `/movers/${c.slug}`, label: `Movers in ${c.name}` }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

