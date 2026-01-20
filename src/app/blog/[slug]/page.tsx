import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.warn("Database connection failed during build, skipping static generation for blog posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Lugvia Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.excerpt || "",
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!post || (!post.published && process.env.NODE_ENV === "production")) {
    notFound();
  }

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.featuredImage,
        "datePublished": post.createdAt.toISOString(),
        "dateModified": post.updatedAt.toISOString(),
        "author": {
          "@type": "Person",
          "name": post.author.name || "Lugvia Team",
        },
        "description": post.excerpt,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header Image */}
        <div className="relative h-[60vh] w-full">
           <Image
             src={post.featuredImage || "/images/hero/dubai.jpg"}
             alt={post.title}
             fill
             className="object-cover"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
           
           <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
             <div className="container mx-auto max-w-4xl">
               <Link 
                 href="/blog" 
                 className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
               >
                 <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
               </Link>
               
               <div className="flex items-center gap-4 text-sm md:text-base text-slate-300 mb-4">
                 <span className="bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-primary/30">
                   {post.category}
                 </span>
                 <span className="flex items-center gap-1">
                   <Calendar className="h-4 w-4" />
                   {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                 </span>
                 <span className="flex items-center gap-1">
                   <User className="h-4 w-4" />
                   {post.author.name || "Lugvia Team"}
                 </span>
               </div>
               
               <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                 {post.title}
               </h1>
             </div>
           </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl -mt-5 relative z-10">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
            
            {/* Main Content */}
            <article 
              className="prose prose-slate lg:prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Keywords/Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm"
                  >
                    <Tag className="h-3 w-3 mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
