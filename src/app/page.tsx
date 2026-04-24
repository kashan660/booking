import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { ArrowRight, CheckCircle2, MapPin, Package, Shield, Truck } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { InternalLinksSection } from "@/components/moving/InternalLinksSection";
import { ReviewHighlights } from "@/components/moving/ReviewHighlights";
import { ComplianceSection } from "@/components/moving/ComplianceSection";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `${settings.brandName} | Packers and Movers in USA`,
    description:
      "Affordable packers and movers in the USA for local, long-distance, and commercial moves. Get a fast quote, optional packing & storage, and verified crews.",
    path: "/",
    siteName: settings.brandName,
    image: settings.defaultOgImage,
    keywords: ["packers and movers usa", "moving company", "local movers", "long-distance movers", "moving quote"],
  });
}

export const revalidate = 3600;

export default async function Home() {
  const settings = await getSiteSettings();
  let featuredCities: { name: string; slug: string; state: string | null; heroImage: string | null }[] = [];
  let featuredServices: { name: string; slug: string; shortIntro: string | null; heroImage: string | null }[] = [];
  try {
    [featuredCities, featuredServices] = await Promise.all([
      prisma.movingCity.findMany({
        where: { published: true },
        orderBy: { updatedAt: "desc" },
        take: 9,
        select: { name: true, slug: true, state: true, heroImage: true },
      }),
      prisma.movingService.findMany({
        where: { published: true },
        orderBy: { updatedAt: "desc" },
        take: 6,
        select: { name: true, slug: true, shortIntro: true, heroImage: true },
      }),
    ]);
  } catch {
    featuredCities = [];
    featuredServices = [];
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute inset-0 opacity-25">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400 blur-[90px]" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-400 blur-[90px]" />
        </div>

        <div className="relative container mx-auto px-4 pt-28 pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
              <Truck className="h-4 w-4" /> USA Moving • Local • Long-Distance • Commercial
            </p>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Packers and Movers in the USA — fast quotes, careful handling, on-time delivery.
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              {settings.brandName} helps you move with professional crews and optional full packing, loading, and storage.
              We focus on underserved cities where fewer movers operate — so you can book reliably.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-600 transition-colors"
              >
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/movers"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-white font-semibold hover:bg-white/15 transition-colors"
              >
                Browse Cities
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-white/85">
              {[
                "Furniture protection & shrink wrap",
                "Dedicated move coordinator",
                "Licensed crews (where required)",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Moving services</h2>
            <p className="text-slate-600 mt-2">Choose the right service. Customize packing, storage, and handling.</p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            View all services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {s.shortIntro || "Transparent pricing, trained movers, and careful handling from start to finish."}
                  </p>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Package className="h-5 w-5 text-emerald-700" />
                </div>
              </div>
              <div className="mt-4 text-sm font-semibold text-slate-900 inline-flex items-center">
                Learn more <ArrowRight className="ml-2 h-4 w-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Cities we serve</h2>
            <p className="text-slate-600 mt-2">
              Dedicated city pages with local details, FAQs, and move-day checklists.
            </p>
          </div>
          <Link href="/movers" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            View all cities
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCities.map((c) => (
            <Link
              key={c.slug}
              href={`/movers/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={
                    c.heroImage ||
                    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2070&auto=format&fit=crop"
                  }
                  alt={`${c.name} moving services`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <MapPin className="h-4 w-4 text-emerald-700" />
                  <span>
                    {c.name}
                    {c.state ? `, ${c.state}` : ""}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Movers in {c.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white border border-slate-200 p-6">
              <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Top-level protection</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Floor protection, furniture padding, and careful loading to reduce damage and delays.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6">
              <div className="h-11 w-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Local + long-distance</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                From apartment moves to cross-state relocations, we coordinate crews and scheduling.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6">
              <div className="h-11 w-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Packing & storage</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Add partial or full packing, supplies, and short-term storage for flexible moving timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="space-y-6">
          <ReviewHighlights />
          <ComplianceSection />
          <InternalLinksSection
            title="Plan your move"
            description="Use these structured pages to compare options and request accurate pricing."
            links={[
              { href: "/services", label: "Browse Services" },
              { href: "/movers", label: "Browse Cities" },
              { href: "/guides", label: "Read Guides" },
              { href: "/get-a-quote", label: "Get a Quote" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
