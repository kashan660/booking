import { Hero } from "@/components/features/Hero";
// import { TransferWidget } from "@/components/features/TransferWidget";
import { SearchForm } from "@/components/features/SearchForm";
import { FlightWidget } from "@/components/features/FlightWidget";
import { CheapestFlights } from "@/components/features/CheapestFlights";
import { CheckCircle, Clock, Globe, Shield, ArrowRightLeft, Hotel, Plane, MapPin, Package, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Lugvia | Luxury Airport Transfers, Chauffeur Service & Hotel Booking Worldwide",
  description: "Book reliable airport transfers, VIP chauffeur services, and luxury hotels worldwide. Lugvia operates in 150+ countries including Dubai, London, Paris, Istanbul, and Makkah. Fixed prices, professional drivers, and 24/7 support.",
  keywords: "Airport Transfer, Chauffeur Service, Luxury Travel, Hotel Booking, Dubai Transfers, Istanbul Taxi, Makkah Umrah Taxi, VIP Transport, City to City Transfer, Private Driver Service, Global Chauffeur",
};

export default async function Home() {
  // Static trip.com section data (replaced Prisma query)
  const tripSettings: any = {};
  const tripBgImage = tripSettings.backgroundImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop";
  const tripHeading = tripSettings.heading || "Unbeatable Flight Deals";
  const tripSubheading = tripSettings.subheading || "Starting from $99";
  const tripDesc = tripSettings.description || "Discover limited-time offers to top destinations. Book now and save up to 40% on your next journey.";
  const tripIframeSrc = tripSettings.iframeSrc || "https://www.trip.com/partners/ad/DB10327655?Allianceid=7712503&SID=289350125&trip_sub1=";

  // Transfer Widget Data
  const transferSettings: any = {};
  const transferBgImage = transferSettings.backgroundImage;

  return (
    <div className="pb-20">
      <Hero />
      
      <div className="container mx-auto px-4">
        <SearchForm />
        {/* <div id="booking-widget" className="scroll-mt-24">
          <TransferWidget backgroundImage={transferBgImage} />
        </div> */}

        {/* Trip.com Flight Deals */}
        <section className="mt-16">
          <div className="w-full flex justify-center px-4">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative group">
               {/* Background Image */}
               <div className="absolute inset-0 z-0">
                 <Image 
                   src={tripBgImage} 
                   alt="Flight deals background" 
                   fill
                   className="object-cover opacity-15 transition-transform duration-700 group-hover:scale-105"
                   unoptimized
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-white/80" />
               </div>

               <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                 <div className="flex-1 text-center md:text-left space-y-4">
                   <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-2">
                     <Plane className="h-4 w-4" /> Exclusive Offers
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                     {tripHeading} <br/>
                     <span className="text-blue-600">{tripSubheading}</span>
                   </h2>
                   <p className="text-lg text-slate-600 max-w-md mx-auto md:mx-0">
                     {tripDesc}
                   </p>
                 </div>

                 <div className="w-full md:w-[500px] bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden transform transition-all hover:shadow-xl">
                   <iframe 
                     src={tripIframeSrc}
                     style={{ width: "100%", height: "250px", border: "none" }} 
                     id="DB10327655"
                     title="Trip.com Flight Deals"
                     className="w-full block"
                   />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Cheapest Flights */}
        <section className="mt-20">
          <CheapestFlights />
        </section>
        
        {/* Services Overview */}
        <section className="mt-24 mb-20" aria-labelledby="services-heading" itemScope itemType="https://schema.org/Service">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="text-4xl font-extrabold mb-6 tracking-tight text-slate-900">
              Complete Travel Solutions Worldwide
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From <span className="font-semibold text-blue-600">airport transfers</span> to luxury hotels, flights to guided tours — 
              Lugvia offers premium travel services in 150+ countries. Book with confidence and experience seamless travel planning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Flight Booking */}
            <Link href="/flights-booking" className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white p-8 h-full border border-slate-100 rounded-2xl group-hover:border-transparent">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <Plane className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-white" itemProp="name">Flight Booking</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed group-hover:text-blue-50" itemProp="description">
                  Compare 1000+ airlines worldwide. Best price guarantee on international and domestic flights.
                </p>
                <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:text-white">
                  Book Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            
            {/* Hotel Reservations */}
            <Link href="/hotel-booking" className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white p-8 h-full border border-slate-100 rounded-2xl group-hover:border-transparent">
                <div className="bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <Hotel className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-white" itemProp="name">Hotel Stays</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed group-hover:text-purple-50" itemProp="description">
                  2M+ properties worldwide. From budget to luxury hotels, resorts and apartments.
                </p>
                <div className="flex items-center text-purple-600 text-sm font-semibold group-hover:text-white">
                  Find Hotels <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            
            {/* Airport Transfers */}
            <Link href="/airport-transfers" className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white p-8 h-full border border-slate-100 rounded-2xl group-hover:border-transparent">
                <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <ArrowRightLeft className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-white" itemProp="name">Transfers</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed group-hover:text-green-50" itemProp="description">
                  Professional chauffeur service. Fixed prices, meet & greet, flight monitoring included.
                </p>
                <div className="flex items-center text-green-600 text-sm font-semibold group-hover:text-white">
                  Reserve Ride <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            
            {/* Tours & Activities */}
            <Link href="/tours-activities" className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white p-8 h-full border border-slate-100 rounded-2xl group-hover:border-transparent">
                <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <MapPin className="h-7 w-7 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-white" itemProp="name">Tours</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed group-hover:text-orange-50" itemProp="description">
                  50,000+ experiences worldwide. Skip-the-line tickets, guided tours, day trips.
                </p>
                <div className="flex items-center text-orange-600 text-sm font-semibold group-hover:text-white">
                  Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            
            {/* Travel Packages */}
            <Link href="/travel-packages" className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white p-8 h-full border border-slate-100 rounded-2xl group-hover:border-transparent">
                <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <Package className="h-7 w-7 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-white" itemProp="name">Packages</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed group-hover:text-pink-50" itemProp="description">
                  All-in-one packages: flights + hotels + transfers + tours. Save up to 40% on trips!
                </p>
                <div className="flex items-center text-pink-600 text-sm font-semibold group-hover:text-white">
                  View Deals <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
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
        {/* Removed Travel Guides & Tips section as requested */}
      </div>
    </div>
  );
}
