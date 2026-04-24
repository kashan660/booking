import { Shield, PhoneCall, Clock3, CircleDollarSign } from "lucide-react";

export function TrustStrip() {
  const items = [
    { icon: Shield, text: "Verified partner network" },
    { icon: CircleDollarSign, text: "Reseller discount pricing" },
    { icon: Clock3, text: "Fast quote turnaround" },
    { icon: PhoneCall, text: "WhatsApp + phone support" },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
        {items.map((item) => (
          <div key={item.text} className="inline-flex items-center gap-2">
            <item.icon className="h-4 w-4 text-emerald-700" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
