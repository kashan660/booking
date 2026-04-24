import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildPageMetadata({
    title: `How to Get Your Moving Quote | ${settings.brandName}`,
    description:
      "Step-by-step guide to getting your moving quote. Learn how our process works and what to expect when you request a quote from our team.",
    path: "/guides",
    siteName: settings.brandName,
    image: settings.defaultOgImage,
    keywords: ["moving guide", "how to get moving quote", "moving process", "packers and movers guide"],
  });
}

export default async function GuidesPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              How to Get Your Moving Quote
            </h1>
            <p className="mt-4 text-xl text-slate-600">
              Follow these simple steps to get an accurate quote and start your stress-free move
            </p>
          </div>

          {/* Step-by-step Guide */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Fill Out the Quote Form</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Visit our <Link href="/get-a-quote" className="text-emerald-600 font-semibold hover:underline">Get a Quote</Link> page and provide us with your moving details:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span><strong>Origin & Destination:</strong> Where you're moving from and to</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span><strong>Moving Date:</strong> Your preferred moving date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span><strong>Property Size:</strong> Number of bedrooms or square footage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span><strong>Services Needed:</strong> Packing, loading, storage, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span><strong>Contact Information:</strong> Your name, phone, and email</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Team Reviews Your Request</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Once you submit the form, our moving specialists will:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Review your moving requirements carefully</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Calculate the best pricing based on distance and services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Check availability for your preferred moving date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Prepare a detailed quote with transparent pricing</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm text-emerald-800">
                      <strong>⏱️ Response Time:</strong> We typically respond within 2-4 hours during business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">We Contact You</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Our representative will reach out to you via your preferred contact method:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">📞</span>
                      <span><strong>Phone Call:</strong> Direct conversation to discuss your needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">📧</span>
                      <span><strong>Email:</strong> Detailed quote with itemized pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">💬</span>
                      <span><strong>WhatsApp:</strong> Quick chat at {settings.whatsappNumber}</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-slate-600 leading-relaxed">
                    During this conversation, we'll answer all your questions, clarify any details, and provide you with a comprehensive quote.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Discuss & Customize Your Move</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We'll work with you to customize the perfect moving solution:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Adjust services based on your budget and needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Discuss special items (pianos, antiques, fragile items)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Explore packing options and materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Schedule a virtual or in-home survey if needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Review insurance and protection options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Confirm & Schedule Your Move</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Once you're happy with the quote:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Confirm your booking with a deposit (if required)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Receive a detailed moving contract and timeline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Get assigned a dedicated moving coordinator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Receive pre-move checklist and preparation tips</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Pro Tip:</strong> Book early! Moving companies fill up quickly, especially during peak season (May-September)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-emerald-100 mb-6 text-lg">
              Get your free, no-obligation moving quote in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-a-quote"
                className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-colors shadow-md"
              >
                Get Your Free Quote
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-emerald-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-900 transition-colors"
              >
                Contact Us Directly
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Is the quote really free?</h3>
                <p className="text-slate-600">
                  Yes! We provide completely free, no-obligation quotes. There's no charge for the estimate, and you're under no pressure to book.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">How accurate is the online quote?</h3>
                <p className="text-slate-600">
                  Our online quotes are estimates based on the information you provide. For the most accurate quote, we recommend a virtual or in-home survey for larger moves.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">What if I need to change my moving date?</h3>
                <p className="text-slate-600">
                  We understand plans change! Contact your moving coordinator as soon as possible, and we'll do our best to accommodate your new date.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Do you offer same-day or emergency moves?</h3>
                <p className="text-slate-600">
                  Yes, we can accommodate urgent moves based on availability. Contact us directly at {settings.whatsappNumber} for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

