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
    const services = await prisma.movingService.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const service = await prisma.movingService.findUnique({ where: { slug } });
  if (!service) return { title: "Service Not Found" };

  return buildPageMetadata({
    title: service.seoTitle || `${service.name} | ${settings.brandName}`,
    description:
      service.description ||
      `Learn about ${service.name} and what’s included. Request a quote for local or long-distance moving.`,
    path: `/services/${slug}`,
    siteName: settings.brandName,
    image: service.ogImage || service.heroImage || settings.defaultOgImage,
    keywords: service.keywords,
  });
}

export default async function MovingServicePage({ params }: PageProps) {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const service = await prisma.movingService.findUnique({ where: { slug } });
  if (!service || (!service.published && process.env.NODE_ENV === "production")) notFound();
  const faqItems = Array.isArray(service.faqs) ? service.faqs : [];
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
      { "@type": "ListItem", position: 2, name: "Services", item: "https://lugvia.com/services" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://lugvia.com/services/${slug}` },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description:
      service.description || "Professional moving service with route-based pricing, optional packing, and storage add-ons.",
    provider: {
      "@type": "MovingCompany",
      name: settings.brandName,
      url: "https://lugvia.com",
    },
    areaServed: "US",
    serviceType: service.name,
    url: `https://lugvia.com/services/${slug}`,
  };
  const relatedCities = await prisma.movingCity.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
    select: { name: true, slug: true },
    take: 8,
  });

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl space-y-6">
          {faqSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          ) : null}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
          <nav aria-label="Breadcrumb" className="text-sm">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to services
            </Link>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{service.name}</h1>
              <p className="mt-3 text-slate-600">
                {service.description ||
                  "Clear scope, careful handling, and a move-day plan that keeps your timeline on track."}
              </p>
            </div>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold shadow hover:bg-emerald-700 transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <article
              className="prose prose-slate lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>

          {faqItems.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
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

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Need help now?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Message us on WhatsApp with your origin, destination, and move date.
            </p>
            <div className="mt-3 text-sm">
              <span className="font-semibold text-slate-900">WhatsApp</span>:{" "}
              <span className="text-slate-700">{settings.whatsappNumber}</span>
            </div>
          </div>

          <TrustSignals />
          <InternalLinksSection
            title="Popular city pages"
            description={`See where ${service.name.toLowerCase()} is currently available.`}
            links={relatedCities.map((c) => ({ href: `/movers/${c.slug}`, label: `Movers in ${c.name}` }))}
          />
        </div>
      </div>
    </div>
  );
}

