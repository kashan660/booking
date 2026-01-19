import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = await prisma.page.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
  });

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.seoTitle || `${page.title} | Lugvia`,
    description: page.description,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.description || "",
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
  });

  if (!page || (!page.published && process.env.NODE_ENV === "production")) {
    notFound();
  }

  // Determine Image Layout
  const imagePosition = page.imagePosition || "center";
  const hasImage = !!page.featuredImage;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. TOP POSITION (Full Width Hero) */}
      {hasImage && imagePosition === "top" && (
        <div className="relative h-[50vh] w-full">
          <Image
            src={page.featuredImage!}
            alt={page.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white shadow-sm">
                {page.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Standard Header (if not using Top Image) */}
      {(!hasImage || imagePosition !== "top") && (
        <div className="pt-32 pb-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {page.title}
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* 2. CENTER POSITION (Inline at top of content) */}
        {hasImage && imagePosition === "center" && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={page.featuredImage!}
              alt={page.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Page Content */}
        <article 
          className="prose prose-slate lg:prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* 3. BOTTOM POSITION (After content) */}
        {hasImage && imagePosition === "bottom" && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-12 shadow-lg">
            <Image
              src={page.featuredImage!}
              alt={page.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
