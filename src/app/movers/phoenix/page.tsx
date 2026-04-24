import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Packers and Movers in Phoenix, AZ | Top-Rated Moving Services",
    description: "Professional packers and movers in Phoenix, Arizona. Local and long-distance moving with expert packing, climate-controlled storage, and same-day service available.",
    keywords: ["packers and movers phoenix", "phoenix movers", "moving company phoenix az", "phoenix moving services"],
  };
}

export default async function PhoenixMoversPage() {
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
                Packers and Movers in Phoenix, AZ
              </h1>
              <p className="mt-4 text-lg text-slate-600">Beat the heat with professional movers</p>
            </div>
            <Link href="/get-a-quote" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700">
              Get Free Quote
            </Link>
          </div>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=800&fit=crop" alt="Phoenix skyline" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold">Serving Phoenix Metro</h2>
              <p className="text-white/90">Climate-controlled moves</p>
            </div>
          </div>

          <div className="prose prose-slate lg:prose-lg max-w-none mb-10">
            <h2>Top-Rated Packers and Movers in Phoenix, AZ</h2>
            <p>Phoenix's premier moving company! We provide professional moving services throughout the Phoenix metropolitan area, including Scottsdale, Tempe, Mesa, and Glendale. Beat the heat with our efficient, reliable movers.</p>

            <h3>Phoenix Moving Services</h3>
            <ul>
              <li><strong>Local Moving:</strong> Moves within Phoenix and surrounding cities</li>
              <li><strong>Long-Distance Moving:</strong> Interstate relocations from Arizona</li>
              <li><strong>Commercial Moving:</strong> Office and business relocations</li>
              <li><strong>Packing Services:</strong> Heat-safe packing for Phoenix climate</li>
              <li><strong>Storage Solutions:</strong> Climate-controlled storage facilities</li>
              <li><strong>Piano Moving:</strong> Specialized piano and heavy item moving</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
              {["Heat-resistant packing materials", "Climate-controlled trucks", "Early morning moves to avoid heat", "Experienced with Phoenix layout", "Licensed and insured in Arizona", "Same-day service available"].map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-900">{f}</span>
                </div>
              ))}
            </div>

            <h3>Phoenix Metro Areas We Serve</h3>
            <ul>
              <li>Downtown Phoenix and Midtown</li>
              <li>Scottsdale and Paradise Valley</li>
              <li>Tempe and ASU area</li>
              <li>Mesa and Gilbert</li>
              <li>Chandler and Ahwatukee</li>
              <li>Glendale and Peoria</li>
              <li>Surprise and Avondale</li>
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
              <p className="text-slate-600 mb-4">Ready to move? Contact our Phoenix moving specialists for a free estimate.</p>
              <Link href="/get-a-quote" className="inline-flex items-center justify-center w-full rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700">
                Request Quote Now
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "How much do movers cost in Phoenix?", a: "Phoenix moving costs range from $350-$700 for local apartment moves and $800-$1,800 for house moves. Long-distance moves from Phoenix start at $2,000." },
                { q: "How do you handle Phoenix's extreme heat?", a: "We schedule moves early in the morning, use climate-controlled trucks, provide heat-resistant packing materials, and ensure our crew stays hydrated." },
                { q: "Can you move during Phoenix summers?", a: "Yes! We move year-round in Phoenix. Summer moves are scheduled for early morning hours (6-7 AM) to avoid peak heat." },
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
