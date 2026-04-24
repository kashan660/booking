import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site-settings";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({
      where: { published: true, template: "guide" },
      select: { slug: true },
    });
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getSiteSettings();

  let page: any = null;
  try {
    page = await prisma.page.findUnique({ where: { slug } });
  } catch {
    page = null;
  }

  if (!page || page.template !== "guide") return { title: "Guide Not Found" };

  return {
    title: page.seoTitle || `${page.title} | ${settings.brandName}`,
    description: page.description || "Moving guide and tips.",
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.description || "",
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;

  let page: any = null;
  try {
    page = await prisma.page.findUnique({ where: { slug } });
  } catch {
    page = null;
  }

  if (!page || page.template !== "guide" || (!page.published && process.env.NODE_ENV === "production")) notFound();

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="mb-6">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to guides
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{page.title}</h1>
          {page.description ? <p className="mt-3 text-slate-600">{page.description}</p> : null}

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <article
              className="prose prose-slate lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

