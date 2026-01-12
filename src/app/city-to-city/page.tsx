import { Car, Map, Navigation, Shield, ArrowRight } from "lucide-react";
import { SearchForm } from "@/components/features/SearchForm";
import Link from "next/link";
import Image from "next/image";

const routes = [
  { name: "Jeddah Airport to Makkah", image: "/images/destinations/makkah.jpg", price: "From SAR 200", href: "/jeddah-to-makkah-taxi" },
  { name: "Makkah to Madina", image: "https://images.unsplash.com/photo-1573074558525-4b045353165b?auto=format&fit=crop&q=80", price: "From SAR 450", href: "/city-transfers-makkah-madina" },
  { name: "Istanbul to Antalya", image: "/images/destinations/istanbul.jpg", price: "From €350", href: "/city-to-city" }, // Fallback link
];

export default function CityToCityPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80" alt="Background" fill className="object-cover" unoptimized />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">City to City Transfers</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Seamless long-distance travel between cities. 
            More comfortable than a train, faster than a bus.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <SearchForm />
      </div>

      <div className="container mx-auto px-4 py-20">
        
        {/* Popular Routes Section */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Popular Routes</h2>
            <Link href="/destinations" className="text-primary font-medium hover:underline flex items-center">
              View All Routes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {routes.map((item) => (
              <Link key={item.name} href={item.href} className="group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all block">
                <div className="relative h-56">
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
                <div className="p-5">
                  <h3 className="font-bold text-xl group-hover:text-primary transition-colors mb-2">{item.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Car className="h-4 w-4 mr-2" /> Private Transfer
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-xl text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Door-to-Door Service</h3>
            <p className="text-muted-foreground">
              We pick you up from your location and drop you off exactly where you need to be.
              No hassle, no walking with luggage.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Map className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fixed Pricing</h3>
            <p className="text-muted-foreground">
              Know exactly what you pay before you travel. No hidden fees or surge pricing,
              regardless of traffic.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Safety First</h3>
            <p className="text-muted-foreground">
              Our professional drivers are experienced in long-distance travel and our vehicles
              are regularly maintained for safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
