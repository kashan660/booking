import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Packers and Movers in San Antonio, TX | Affordable Moving Company",
    description: "Expert packers and movers in San Antonio, Texas. Residential and commercial moving services with professional packing, storage, and military relocation support.",
    keywords: ["packers and movers san antonio", "san antonio movers", "moving company san antonio tx", "military movers san antonio"],
  };
}

export default async function SanAntonioMoversPage() {
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
                Packers and Movers in San Antonio, TX
              </h1>
              <p className="mt-4 text-lg text-slate-600">Military-friendly moving services</p>
            </div>
            <Link href="/get-a-quote" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700">
              Get Free Quote
            </Link>
          </div>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img src="https://images.unsplash.com/photo-1583225214464-9296029427aa?w=1200&h=800&fit=crop" alt="San Antonio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold">Serving San Antonio</h2>
              <p className="text-white/90">Military & civilian moves</p>
            </div>
          </div>

          <div className="prose prose-slate lg:prose-lg max-w-none mb-10">
            <h2>Expert Packers and Movers in San Antonio, TX</h2>
            <p>San Antonio's trusted moving company! We provide professional moving services throughout San Antonio and surrounding areas, including military relocations for Joint Base San Antonio personnel.</p>

            <h3>San Antonio Moving Services</h3>
            <ul>
              <li><strong>Residential Moving:</strong> Homes, apartments, and condos</li>
              <li><strong>Military Relocation:</strong> PCS moves for JBSA personnel</li>
              <li><strong>Senior Moving:</strong> Specialized service for senior citizens</li>
              <li><strong>Long-Distance Moving:</strong> Interstate moves from San Antonio</li>
              <li><strong>Packing Services:</strong> Full-service packing and unpacking</li>
              <li><strong>Storage Solutions:</strong> Secure storage facilities</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
              {["Military relocation specialists", "Experienced with historic homes", "Senior-friendly moving services", "Bilingual team (English/Spanish)", "Affordable rates", "Licensed and insured"].map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-900">{f}</span>
                </div>
              ))}
            </div>

            <h3>San Antonio Areas We Serve</h3>
            <ul>
              <li>Downtown San Antonio and River Walk</li>
              <li>Alamo Heights and Terrell Hills</li>
              <li>Stone Oak and Sonterra</li>
              <li>The Dominion and Shavano Park</li>
              <li>Helotes and Leon Valley</li>
              <li>New Braunfels and Schertz</li>
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
              <p className="text-slate-600 mb-4">Get your free moving estimate today! Our San Antonio team is ready to help.</p>
              <Link href="/get-a-quote" className="inline-flex items-center justify-center w-full rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700">
                Request Quote Now
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "How much do movers cost in San Antonio?", a: "San Antonio moving costs typically range from $300-$600 for local apartment moves and $700-$1,500 for house moves. We offer military discounts for JBSA personnel." },
                { q: "Do you handle military PCS moves?", a: "Yes! We specialize in military relocations for Joint Base San Antonio (JBSA) personnel. We understand PCS timelines and military moving requirements." },
                { q: "Do you offer senior moving services?", a: "Yes! We provide specialized senior moving services including downsizing assistance, patient packing, and coordination with retirement communities." },
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
