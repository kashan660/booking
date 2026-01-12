import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tips for Stress-Free Airport Transfers",
    excerpt: "Traveling can be stressful, but your airport transfer doesn't have to be. Learn how to ensure a smooth journey from the airport to your hotel.",
    date: "Jan 15, 2024",
    author: "Sarah Johnson",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    slug: "top-10-tips-stress-free-airport-transfers"
  },
  {
    id: 2,
    title: "Why You Should Choose a Chauffeur Service for Your Next Business Trip",
    excerpt: "Make a lasting impression and maximize your productivity with a professional chauffeur service. Here are the key benefits for business travelers.",
    date: "Jan 12, 2024",
    author: "Michael Chen",
    category: "Business Travel",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    slug: "why-choose-chauffeur-service-business-trip"
  },
  {
    id: 3,
    title: "Hidden Gems in Istanbul: A Local's Guide",
    excerpt: "Beyond the Hagia Sophia and Blue Mosque, Istanbul hides countless treasures waiting to be discovered. Explore the city like a local.",
    date: "Jan 08, 2024",
    author: "Ahmet Yilmaz",
    category: "Destinations",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop",
    slug: "hidden-gems-istanbul-guide"
  },
  {
    id: 4,
    title: "The Ultimate Guide to Luxury Car Classes",
    excerpt: "From Mercedes E-Class to the S-Class and V-Class, understand the differences between luxury vehicle categories to choose the right one for you.",
    date: "Jan 05, 2024",
    author: "David Smith",
    category: "Fleet Guide",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
    slug: "ultimate-guide-luxury-car-classes"
  },
  {
    id: 5,
    title: "Traveling to Dubai? Here's What You Need to Know",
    excerpt: "Planning a trip to Dubai? From visa requirements to cultural etiquette, here is everything you need to know before you go.",
    date: "Jan 02, 2024",
    author: "Sarah Johnson",
    category: "Destinations",
    image: "https://images.unsplash.com/photo-1512453979798-5ea932a23518?q=80&w=2074&auto=format&fit=crop",
    slug: "traveling-to-dubai-guide"
  },
  {
    id: 6,
    title: "5 Benefits of Booking Your Transfer in Advance",
    excerpt: "Last-minute bookings can be risky and expensive. Discover why booking your airport transfer in advance is the smartest travel decision.",
    date: "Dec 28, 2023",
    author: "Michael Chen",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    slug: "5-benefits-booking-transfer-advance"
  }
];

export default function BlogPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Travel tips, destination guides, and industry insights from the Lugvia team.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="link" className="p-0 h-auto gap-1" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
