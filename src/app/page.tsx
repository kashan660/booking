import { Hero } from "@/components/features/Hero";
import { TransferWidget } from "@/components/features/TransferWidget";
import { SearchForm } from "@/components/features/SearchForm";
import { FlightWidget } from "@/components/features/FlightWidget";
import { CheapestFlights } from "@/components/features/CheapestFlights";
import { CheckCircle, Clock, Globe, Shield, ArrowRightLeft, Hotel, Plane, MapPin, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />
      
      <div className="container mx-auto px-4">
        {/* <SearchForm /> */}
        <TransferWidget />

        {/* Flight Widget */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Book Your Flights</h2>
          <FlightWidget />
        </section>

        {/* Cheapest Flights */}
        <section className="mt-20">
          <CheapestFlights />
        </section>
        
        {/* Services Overview */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Travel Solutions Worldwide</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              From airport transfers to luxury hotels, flights to guided tours - Lugvia offers premium travel services 
              in 150+ countries. Book with confidence and experience seamless travel planning with our trusted partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Link href="/flights-booking" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-all group-hover:scale-105">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-blue-900">Flight Booking</h3>
                <p className="text-sm text-blue-700">Compare 1000+ airlines worldwide. Best price guarantee on international and domestic flights.</p>
                <span className="text-xs text-blue-600 font-medium mt-2 inline-block">Book Now →</span>
              </div>
            </Link>
            
            <Link href="/hotel-booking" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center hover:shadow-lg transition-all group-hover:scale-105">
                <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Hotel className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-purple-900">Hotel Reservations</h3>
                <p className="text-sm text-purple-700">2M+ properties worldwide. From budget to luxury hotels, resorts and apartments.</p>
                <span className="text-xs text-purple-600 font-medium mt-2 inline-block">Find Hotels →</span>
              </div>
            </Link>
            
            <Link href="/airport-transfers" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center hover:shadow-lg transition-all group-hover:scale-105">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <ArrowRightLeft className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-green-900">Airport Transfers</h3>
                <p className="text-sm text-green-700">Professional chauffeur service. Fixed prices, meet & greet, flight monitoring included.</p>
                <span className="text-xs text-green-600 font-medium mt-2 inline-block">Reserve Transfer →</span>
              </div>
            </Link>
            
            <Link href="/tours-activities" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center hover:shadow-lg transition-all group-hover:scale-105">
                <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-orange-900">Tours & Activities</h3>
                <p className="text-sm text-orange-700">50,000+ experiences worldwide. Skip-the-line tickets, guided tours, day trips.</p>
                <span className="text-xs text-orange-600 font-medium mt-2 inline-block">Explore Tours →</span>
              </div>
            </Link>
            
            <Link href="/travel-packages" className="group">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl text-center hover:shadow-lg transition-all group-hover:scale-105">
                <div className="bg-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-pink-900">Travel Packages</h3>
                <p className="text-sm text-pink-700">All-in-one packages: flights + hotels + transfers + tours. Save up to 40%!</p>
                <span className="text-xs text-pink-600 font-medium mt-2 inline-block">View Packages →</span>
              </div>
            </Link>
          </div>
        </section>

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
