import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Packers and Movers in Austin, TX | Trusted Moving Company",
    description: "Top-rated packers and movers in Austin, Texas. Residential and commercial moving services with expert packing, storage, and furniture handling. Free estimates available!",
    keywords: ["packers and movers austin", "austin movers", "moving company austin tx", "austin moving services", "local movers austin"],
    openGraph: {
      title: "Packers and Movers in Austin, TX",
      description: "Professional moving services in Austin with expert packing and storage solutions.",
      url: "https://lugvia.com/movers/austin",
      type: "website",
    },
  };
}

export default async function AustinMoversPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MovingCompany",
            name: "Lugvia Movers - Austin, TX",
            description: "Professional packers and movers in Austin, Texas for local and long-distance moves.",
            areaServed: "Austin, TX",
            telephone: settings.whatsappNumber,
            url: "https://lugvia.com/movers/austin",
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
                Packers and Movers in Austin, TX
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Trusted moving services for Austin's growing community
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
              src="https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=1200&h=800&fit=crop"
              alt="Austin skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold">Keep Austin Moving</h2>
              <p className="text-white/90">Eco-friendly and efficient</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-slate lg:prose-lg max-w-none mb-10">
            <h2>Trusted Packers and Movers in Austin, TX</h2>
            <p>
              Welcome to Austin's premier moving service! Whether you're relocating within the city or moving to Austin from another state, our professional movers make your transition smooth and stress-free.
            </p>

            <h3>Austin Moving Services</h3>
            <ul>
              <li><strong>Residential Moving:</strong> Apartments, condos, townhomes, and houses</li>
              <li><strong>Student Moving:</strong> UT Austin dorm and apartment moves</li>
              <li><strong>Tech Company Relocations:</strong> Office moves for Austin's tech industry</li>
              <li><strong>Long-Distance Moving:</strong> Interstate moves to and from Austin</li>
              <li><strong>Packing and Unpacking:</strong> Professional packing services available</li>
              <li><strong>Storage Solutions:</strong> Secure storage facilities in Austin</li>
            </ul>

            <h3>Why Austin Residents Choose Us</h3>
            <p>
              Austin's rapid growth and unique neighborhoods require movers who know the area. Our team is familiar with Austin's traffic patterns, parking restrictions, and building requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
              {[
                "Experienced with high-rise moves downtown",
                "Knowledge of UT Austin campus moves",
                "Familiar with Austin's historic neighborhoods",
                "Eco-friendly moving practices",
                "Flexible scheduling for busy professionals",
                "Licensed and insured in Texas",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-900">{feature}</span>
                </div>
              ))}
            </div>

            <h3>Areas We Serve in Austin</h3>
            <ul>
              <li>Downtown Austin and Rainey Street</li>
              <li>South Congress (SoCo) and South Lamar</li>
              <li>East Austin and Mueller</li>
              <li>North Austin and Domain</li>
              <li>West Lake Hills and Tarrytown</li>
              <li>Round Rock and Cedar Park</li>
              <li>Pflugerville and Georgetown</li>
              <li>Lakeway and Bee Cave</li>
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
                    <div className="text-slate-600">Greater Austin Area</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Get Your Free Quote</h3>
              <p className="text-slate-600 mb-4">
                Request your free estimate! Our Austin moving experts are ready to help you plan your move.
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
                  question: "What's the average cost of movers in Austin?",
                  answer: "Local moves in Austin typically cost $350-$700 for apartments and $800-$1,500 for houses. Long-distance moves start at $2,000. Prices vary based on distance, home size, and services. We provide detailed quotes with no hidden fees."
                },
                {
                  question: "Can you handle moves in Austin's downtown high-rises?",
                  answer: "Yes! We're experienced with high-rise moves in downtown Austin. We coordinate with building management, reserve elevators, and ensure compliance with all building requirements."
                },
                {
                  question: "Do you move UT Austin students?",
                  answer: "Absolutely! We offer special rates for student moves, including dorm moves, apartment relocations, and storage between semesters. We're familiar with UT campus logistics and parking."
                },
                {
                  question: "What about parking permits in Austin neighborhoods?",
                  answer: "We handle all parking permit requirements for Austin moves. Our team coordinates with the city and neighborhood associations to ensure proper permits for moving trucks."
                },
                {
                  question: "Are you eco-friendly movers?",
                  answer: "Yes! We use reusable moving crates when possible, recycle packing materials, and maintain fuel-efficient trucks. We're committed to keeping Austin green while providing excellent service."
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
                { name: "Houston", slug: "houston" },
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
