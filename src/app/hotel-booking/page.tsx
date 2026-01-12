import { Hotel, MapPin, Star, Wifi, Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  { name: "Paris", image: "/images/destinations/paris.jpg", count: "1,200+ Hotels", href: "/best-hotels-paris" },
  { name: "Istanbul", image: "/images/destinations/istanbul.jpg", count: "850+ Hotels", href: "/best-hotels-istanbul" },
  { name: "Dubai", image: "/images/destinations/dubai.jpg", count: "900+ Hotels", href: "/best-hotels-dubai" },
  { name: "Antalya", image: "/images/destinations/antalya.jpg", count: "400+ Resorts", href: "/best-hotels-antalya" },
  { name: "Makkah", image: "/images/destinations/makkah.jpg", count: "300+ Hotels", href: "/best-hotels-makkah" },
  { name: "Madina", image: "https://images.unsplash.com/photo-1573074558525-4b045353165b?auto=format&fit=crop&q=80", count: "250+ Hotels", href: "/best-hotels-madina" },
];

export default function HotelBookingPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" alt="Background" fill className="object-cover" unoptimized />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Hotel Booking</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Find the perfect stay for your trip. Luxury hotels, cozy apartments, 
            and everything in between.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Destinations Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Top Hotel Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {destinations.map((city) => (
                <Link key={city.name} href={city.href} className="group relative h-40 rounded-lg overflow-hidden block">
                  <Image 
                    src={city.image} 
                    alt={city.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <span className="font-bold block">{city.name}</span>
                    <span className="text-xs opacity-80">{city.count}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Hotel className="h-6 w-6 text-primary" /> Popular Hotels
                  </h2>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col md:flex-row gap-6 border-b last:border-0 pb-6 last:pb-0">
                        <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                           <Image 
                              src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&random=${i}`}
                              alt="Hotel"
                              fill
                              className="object-cover"
                           />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold mb-1">Grand Luxury Hotel</h3>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                <MapPin className="h-3 w-3" />
                                <span>Downtown, Dubai</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                              <Star className="h-3 w-3 text-primary fill-primary" />
                              <span className="font-bold text-primary">4.9</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> Free Wifi</span>
                            <span className="flex items-center gap-1"><Coffee className="h-3 w-3" /> Breakfast</span>
                          </div>

                          <div className="flex justify-between items-end mt-auto">
                            <div>
                              <span className="text-2xl font-bold text-primary">$299</span>
                              <span className="text-sm text-muted-foreground">/night</span>
                            </div>
                            <Button>View Deal</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-50 p-6 rounded-xl border">
                <h3 className="font-bold text-lg mb-4">Why Book with Us?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Best Price Guarantee</p>
                      <p className="text-sm text-muted-foreground">Find a lower price? We'll match it.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Hotel className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Handpicked Selection</p>
                      <p className="text-sm text-muted-foreground">Only the best hotels for our clients.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
