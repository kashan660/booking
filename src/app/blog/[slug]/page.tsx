import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Travel Tips</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Jan 15, 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Sarah Johnson</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Top 10 Tips for Stress-Free Airport Transfers ({slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')})
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Traveling can be stressful, but your airport transfer doesn't have to be. Learn how to ensure a smooth journey from the airport to your hotel with our expert guide.
          </p>
        </div>

        <div className="aspect-video relative rounded-xl overflow-hidden mb-12 bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Airport Transfer" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            This is a placeholder for the blog post content. In a real application, this content would be fetched from a CMS or a database based on the slug: <strong>{slug}</strong>.
          </p>
          
          <h2>1. Book in Advance</h2>
          <p>
            One of the most important things you can do to ensure a stress-free airport transfer is to book in advance. This will give you peace of mind knowing that your ride is sorted before you even land.
          </p>

          <h2>2. Check Your Flight Details</h2>
          <p>
            Make sure to double-check your flight details before you book your transfer. This includes your flight number, arrival time, and terminal.
          </p>

          <h2>3. Communicate with Your Driver</h2>
          <p>
            If your flight is delayed or you have any other issues, make sure to communicate with your driver as soon as possible. Most transfer services track flights, but it's always good to keep them in the loop.
          </p>

          <hr className="my-8" />
          
          <div className="bg-slate-50 p-6 rounded-xl border flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-1">Share this article</h3>
              <p className="text-sm text-muted-foreground">Found this helpful? Share it with your friends.</p>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
