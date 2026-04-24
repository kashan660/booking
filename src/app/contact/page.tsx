import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Contact ${settings.brandName}`,
    description: "Contact our reseller support team for quotes, partnerships, and team registration.",
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900">Contact us</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          We manage reseller pricing and partner coordination. Reach us for customer quotes, bulk business requests, or
          team onboarding.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h2 className="font-semibold text-slate-900">Phone / WhatsApp</h2>
                <p className="text-slate-600">{settings.primaryPhone || settings.whatsappNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h2 className="font-semibold text-slate-900">Email</h2>
                <p className="text-slate-600">{settings.supportEmail || "support@lugvia.com"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h2 className="font-semibold text-slate-900">Address</h2>
                <p className="text-slate-600">{settings.addressLine || "United States"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-4 space-y-3">
              <Link className="block rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50" href="/get-a-quote">
                Request a customer quote
              </Link>
              <Link
                className="block rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50"
                href="/driver-registration"
              >
                Driver registration
              </Link>
              <Link
                className="block rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50"
                href="/vehicle-registration"
              >
                Vehicle registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
