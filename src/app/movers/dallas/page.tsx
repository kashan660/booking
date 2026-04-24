import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Packers and Movers in Dallas, TX | Professional Moving Services",
    description: "Reliable packers and movers in Dallas, Texas. Full-service moving company offering local, long-distance, and commercial moves. Licensed, insured, and affordable!",
    keywords: ["packers and movers dallas", "dallas movers", "moving company dallas tx", "dallas moving services", "local movers dallas"],
  };
}

export default async function DallasMoversPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/movers" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to cities
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Packers and Movers in Dallas, TX
              </h1>
              <p className="mt-4 text-lg text-slate-600">Professional moving services across the DFW Metroplex</p>
            </div>
            <Link href="/get-a-quote" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700">
              Get Free Quote
            </Link>
          </div>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img src="https://images.unsplash.com/photo-1552083974-186346191183?w=1200&h=800&fit=crop" alt="Dallas skyline" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold">Serving Dallas-Fort Worth</h2>
              <p className="text-white/90">Corporate and residential moves</p>
            </div>
          </div>

          <div className="prose prose-slate lg:prose-lg max-w-none mb-10">
            <h2>Professional Packers and Movers in Dallas, TX</h2>
            <p>Moving in Dallas or the DFW Metroplex? Our experienced team provides comprehensive moving services throughout Dallas, Fort Worth, and surrounding areas. From downtown high-rises to suburban homes, we handle it all.</p>

            <h3>Dallas Moving Services</h3>
            <ul>
              <li><strong>Local Moving:</strong> Moves within Dallas and DFW Metroplex</li>
              <li><strong>Long-Distance Moving:</strong> Interstate relocations from Dallas</li>
              <li><strong>Corporate Relocation:</strong> Employee moves and office relocations</li>
              <li><strong>Luxury Moving:</strong> White-glove service for high-value items</li>
              <li><strong>Packing Services:</strong> Professional packing and custom crating</li>
              <li><strong>Storage Solutions:</strong> Climate-controlled storage facilities</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
              {["Licensed by Texas DMV", "Fully insured with comprehensive coverage", "Experienced with luxury high-rises", "Corporate relocation specialists", "Same-day service available", "Bilingual staff (English/Spanish)"].map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-900">{f}</span>
                </div>
              ))}
            </div>

            <h3>Dallas-Fort Worth Areas We Serve</h3>
            <ul>
              <li>Downtown Dallas and Uptown</li>
              <li>Highland Park and University Park</li>
              <li>Plano and Frisco</li>
              <li>Irving and Las Colinas</li>
              <li>Richardson and Garland</li>
              <li>Fort Worth and Arlington</li>
              <li>McKinney and Allen</li>
              <li>Carrollton and Lewisville</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="text-sm font-semibold">Phone / WhatsApp</div>
                    <div className="text-slate-600">{settings.whatsappNumber}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Get Your Free Quote</h3>
              <p className="text-slate-600 mb-4">Ready for a stress-free move? Contact our Dallas moving team for a free quote.</p>
              <Link href="/get-a-quote" className="inline-flex items-center justify-center w-full rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700">
                Request Quote Now
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "How much do movers cost in Dallas?", a: "Dallas moving costs range from $400-$800 for local apartment moves and $1,000-$2,000 for house moves. Long-distance moves from Dallas start at $2,500." },
                { q: "Do you serve the entire DFW Metroplex?", a: "Yes! We provide moving services throughout Dallas, Fort Worth, Arlington, Plano, Frisco, Irving, and all surrounding DFW cities." },
                { q: "Can you handle corporate relocations?", a: "Absolutely! We specialize in corporate relocations, including employee moves, office relocations, and executive transfers." },
              ].map((faq, i) => (
                <div key={i} className="border-b border-slate-200 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
