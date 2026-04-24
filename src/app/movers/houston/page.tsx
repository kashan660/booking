import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Packers and Movers in Houston, TX | Affordable Moving Services",
    description: "Professional packers and movers in Houston, Texas. Local and long-distance moving services with packing, storage, and furniture assembly. Get a free quote today!",
    keywords: ["packers and movers houston", "houston movers", "moving company houston tx", "houston moving services", "local movers houston"],
    openGraph: {
      title: "Packers and Movers in Houston, TX",
      description: "Professional moving services in Houston with expert packing and storage solutions.",
      url: "https://lugvia.com/movers/houston",
      type: "website",
    },
  };
}

export default async function HoustonMoversPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MovingCompany",
            name: "Lugvia Movers - Houston, TX",
            description: "Professional packers and movers in Houston, Texas for local and long-distance moves.",
            areaServed: "Houston, TX",
            telephone: settings.whatsappNumber,
            url: "https://lugvia.com/movers/houston",
          }),
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/movers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to cities
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Packers and Movers in Houston, TX
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Professional moving services throughout Houston and surrounding areas
              </p>
            </div>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition-colors"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img
              src="https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=1200&h=800&fit=crop"
              alt="Houston skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold">Serving Greater Houston Area</h2>
              <p className="text-white/90">Reliable, affordable, and professional</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-slate lg:prose-lg max-w-none mb-10">
            <h2>Professional Packers and Movers in Houston, TX</h2>
            <p>
              Looking for reliable packers and movers in Houston? We provide comprehensive moving services throughout the Houston metropolitan area, including Sugar Land, The Woodlands, Pearland, and surrounding communities.
            </p>

            <h3>Our Houston Moving Services</h3>
            <ul>
              <li><strong>Local Moving:</strong> Apartment, house, and condo moves within Houston and Harris County</li>
              <li><strong>Long-Distance Moving:</strong> Interstate moves from Houston to anywhere in the USA</li>
              <li><strong>Packing Services:</strong> Full and partial packing with quality materials</li>
              <li><strong>Storage Solutions:</strong> Short-term and long-term climate-controlled storage</li>
              <li><strong>Commercial Moving:</strong> Office relocations and business moves</li>
              <li><strong>Furniture Assembly:</strong> Disassembly and reassembly of furniture</li>
            </ul>

            <h3>Why Choose Our Houston Movers?</h3>
            <p>
              Houston's hot and humid climate requires special care when moving. Our experienced team understands the unique challenges of moving in Houston, from navigating busy highways like I-10 and I-45 to handling moves in high-rise buildings downtown.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
              {[
                "Licensed and insured moving company",
                "Experienced with Houston's neighborhoods",
                "Climate-controlled trucks for Houston's heat",
                "Competitive pricing with transparent quotes",
                "Same-day and next-day moving available",
                "Professional packing materials included",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-900">{feature}</span>
                </div>
              ))}
            </div>

            <h3>Houston Neighborhoods We Serve</h3>
            <p>We provide moving services throughout Greater Houston, including:</p>
            <ul>
              <li>Downtown Houston and Midtown</li>
              <li>The Heights and Garden Oaks</li>
              <li>Memorial and Energy Corridor</li>
              <li>Galleria and Uptown</li>
              <li>Montrose and Museum District</li>
              <li>Sugar Land and Missouri City</li>
              <li>The Woodlands and Spring</li>
              <li>Pearland and Friendswood</li>
              <li>Katy and Cypress</li>
            </ul>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Phone / WhatsApp</div>
                    <div className="text-slate-600">{settings.whatsappNumber}</div>
                  </div>
                </div>
                {settings.supportEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Email</div>
                      <div className="text-slate-600">{settings.supportEmail}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Service Area</div>
                    <div className="text-slate-600">Greater Houston Area</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Get Your Free Quote</h3>
              <p className="text-slate-600 mb-4">
                Ready to move? Contact us today for a free, no-obligation quote. Our Houston moving specialists are available 7 days a week.
              </p>
              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center w-full rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition-colors"
              >
                Request Quote Now
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How much do movers cost in Houston?",
                  answer: "Moving costs in Houston typically range from $300-$600 for local moves (studio to 2-bedroom) and $1,500-$5,000+ for long-distance moves. Final cost depends on distance, home size, services needed, and move date. We provide free quotes with transparent pricing."
                },
                {
                  question: "Do you provide packing materials?",
                  answer: "Yes! We offer complete packing services including boxes, bubble wrap, packing paper, tape, and furniture blankets. You can purchase materials separately or include full packing service in your quote."
                },
                {
                  question: "How far in advance should I book movers in Houston?",
                  answer: "We recommend booking 2-4 weeks in advance, especially during peak season (May-September). However, we often accommodate last-minute moves within 24-48 hours based on availability."
                },
                {
                  question: "Are you licensed and insured?",
                  answer: "Yes, we are fully licensed and insured. We carry liability insurance and cargo insurance to protect your belongings during the move. All our movers are background-checked and trained professionals."
                },
                {
                  question: "Do you move during Houston's hot summer months?",
                  answer: "Absolutely! Our trucks are equipped to handle Houston's heat and humidity. We take extra precautions during summer months, including climate-controlled trucks and proper hydration for our crew."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-slate-200 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Cities */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Other Texas Cities We Serve</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Austin", slug: "austin" },
                { name: "Dallas", slug: "dallas" },
                { name: "San Antonio", slug: "san-antonio" },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/movers/${city.slug}`}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                >
                  Movers in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
