import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Travel Blog - Expert Tips, Guides & News | Lugvia",
  description: "Discover expert travel guides, airport transfer tips, and luxury travel insights. Read our latest articles on Dubai, London, Paris, and more.",
  openGraph: {
    title: "Lugvia Travel Blog",
    description: "Your guide to luxury travel and seamless airport transfers.",
    images: ["/images/hero/dubai.jpg"],
  },
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Travel Insights & Guides</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Expert advice for seamless journeys, from luxury airport transfers to securing the best hotel deals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.featuredImage || "/images/hero/dubai.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author.name || "Lugvia Team"}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-primary text-sm font-semibold mt-auto">
                  Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p>No blog posts found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
