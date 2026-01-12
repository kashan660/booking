import { Hero } from "@/components/features/Hero";
import { SearchForm } from "@/components/features/SearchForm";
import { CheckCircle, Clock, Globe, Shield, ArrowRightLeft, Hotel, Plane, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />
      
      <div className="container mx-auto px-4">
        <SearchForm />
        
        {/* Value Propositions */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Lugvia?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the best transfer experience with professional drivers and top-class vehicles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Global Coverage</h3>
              <p className="text-sm text-muted-foreground">Available in major cities and airports worldwide.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fixed Prices</h3>
              <p className="text-sm text-muted-foreground">No hidden fees. The price you see is the price you pay.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free Waiting Time</h3>
              <p className="text-sm text-muted-foreground">60 minutes free waiting time at airports.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">Safe and secure online payment methods.</p>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Dubai", image: "/images/destinations/dubai.jpg", href: "/airport-taxi-dubai" },
              { name: "London", image: "/images/destinations/london.jpg", href: "/destinations" },
              { name: "Makkah", image: "/images/destinations/makkah.jpg", href: "/jeddah-to-makkah-taxi" },
              { name: "Istanbul", image: "/images/destinations/istanbul.jpg", href: "/airport-taxi-istanbul" },
              { name: "Antalya", image: "/images/destinations/antalya.jpg", href: "/airport-taxi-antalya" },
              { name: "Paris", image: "/images/destinations/paris.jpg", href: "/airport-taxi-paris" },
            ].map((city) => (
              <Link key={city.name} href={city.href} className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer block">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
                <Image 
                  src={city.image} 
                  alt={city.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                  <span className="text-white/90 text-sm flex items-center gap-1 mt-1 group-hover:underline">
                    Book Transfer <ArrowRightLeft className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Travel Guides & Tips */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Travel Guides & Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Hotel Guides */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Hotel className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Top Hotel Collections</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "Best Hotels in Paris", href: "/best-hotels-paris", count: "Top 10" },
                  { title: "Best Hotels in Istanbul", href: "/best-hotels-istanbul", count: "Top 15" },
                  { title: "Best Hotels in Makkah", href: "/best-hotels-makkah", count: "Near Haram" },
                  { title: "Best Hotels in Madina", href: "/best-hotels-madina", count: "Near Masjid Nabawi" },
                  { title: "Best Hotels in Dubai", href: "/best-hotels-dubai", count: "Luxury Stays" },
                  { title: "Best Hotels in Antalya", href: "/best-hotels-antalya", count: "Resorts" },
                ].map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="flex items-center justify-between group p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">{item.title}</span>
                      <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{item.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transport Guides */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Plane className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Airport & City Transfers</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "Airport Taxi Paris (CDG/Orly)", href: "/airport-taxi-paris", type: "Airport Transfer" },
                  { title: "Istanbul Airport Transfers", href: "/airport-taxi-istanbul", type: "VIP Transfer" },
                  { title: "Dubai Airport Chauffeur", href: "/airport-taxi-dubai", type: "Luxury Ride" },
                  { title: "Antalya Airport Shuttle", href: "/airport-taxi-antalya", type: "Resort Transfer" },
                  { title: "Jeddah to Makkah Taxi", href: "/jeddah-to-makkah-taxi", type: "Umrah Taxi" },
                  { title: "Makkah to Madina Transfer", href: "/city-transfers-makkah-madina", type: "City to City" },
                ].map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="flex items-center justify-between group p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">{item.title}</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.type}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
