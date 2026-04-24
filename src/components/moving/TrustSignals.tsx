import { BadgeCheck, ShieldCheck, Star, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: BadgeCheck,
    title: "Verified moving partners",
    text: "We work with pre-screened carriers and crews in active service areas.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent quote logic",
    text: "Pricing is based on route, move size, services, and timing factors.",
  },
  {
    icon: Truck,
    title: "Local + long-distance coverage",
    text: "Book city moves, interstate routes, and commercial relocations.",
  },
  {
    icon: Star,
    title: "Reseller discount model",
    text: "We secure partner rates and pass discount value to customers.",
  },
];

export function TrustSignals() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-2xl font-bold text-slate-900">Why customers choose us</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <item.icon className="h-4 w-4 text-emerald-700" />
              {item.title}
            </div>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
