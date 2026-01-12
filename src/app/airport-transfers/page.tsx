import { Plane, CheckCircle, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SearchForm } from "@/components/features/SearchForm";

const transfers = [
  { name: "Paris Airport", image: "/images/destinations/paris.jpg", price: "From €65", href: "/airport-taxi-paris" },
  { name: "Istanbul Airport", image: "/images/destinations/istanbul.jpg", price: "From €40", href: "/airport-taxi-istanbul" },
  { name: "Dubai Airport", image: "/images/destinations/dubai.jpg", price: "From AED 100", href: "/airport-taxi-dubai" },
  { name: "Antalya Airport", image: "/images/destinations/antalya.jpg", price: "From €35", href: "/airport-taxi-antalya" },
];

export default function AirportTransfersPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80" alt="Background" fill className="object-cover" unoptimized />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Airport Transfers</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Reliable, comfortable, and affordable airport transfers worldwide. 
            Start your journey the right way.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <SearchForm />
      </div>

      <div className="container mx-auto px-4 py-20">
        
        {/* Popular Transfers Section */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Popular Airport Transfers</h2>
            <Link href="/destinations" className="text-primary font-medium hover:underline flex items-center">
              View All Destinations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transfers.map((item) => (
              <Link key={item.name} href={item.href} className="group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all block">
                <div className="relative h-48">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                    {item.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Private transfers & shuttle</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Airport Transfer?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Free Waiting Time</h3>
                  <p className="text-muted-foreground">
                    We track your flight and offer up to 60 minutes of free waiting time 
                    after your flight lands.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fixed Prices</h3>
                  <p className="text-muted-foreground">
                    No hidden costs. The price you see is the final price, including taxes 
                    and gratuity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Drivers</h3>
                  <p className="text-muted-foreground">
                    All our drivers are licensed, insured, and professionally trained to 
                    ensure your safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
             <Plane className="w-32 h-32 text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
