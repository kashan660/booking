import { FileCheck2, ShieldCheck, Stamp, ClipboardCheck } from "lucide-react";

const complianceItems = [
  {
    icon: FileCheck2,
    title: "Partner Verification",
    text: "Carrier partners are screened before activation in our routing and pricing network.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance-Aware Routing",
    text: "Assignments prioritize partners with required documentation for route and service type.",
  },
  {
    icon: Stamp,
    title: "Transparent Pricing Records",
    text: "Quote logic uses configured rate cards with clear assumptions and update history.",
  },
  {
    icon: ClipboardCheck,
    title: "Operational Review Process",
    text: "Leads and registrations are reviewed in admin workflows before approval and dispatch.",
  },
];

export function ComplianceSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-slate-900">Safety, licensing, and compliance</h2>
      <p className="mt-2 text-sm text-slate-600">
        We are a reseller coordinator. Final delivery is completed by verified partner movers aligned to operational checks.
      </p>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {complianceItems.map((item) => (
          <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="inline-flex items-center gap-2 text-slate-900 font-semibold">
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
