import Link from "next/link";

type LinkItem = {
  href: string;
  label: string;
};

export function InternalLinksSection({
  title,
  description,
  links,
}: {
  title: string;
  description?: string;
  links: LinkItem[];
}) {
  if (!links.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
