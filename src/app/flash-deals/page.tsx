import { Metadata } from "next";
import { Plane, Hotel, Car, Map, Timer, ArrowRight, Zap, Star, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TiqetsWidget } from "@/components/features/TiqetsWidget";

export const metadata: Metadata = {
  title: "Exclusive Flash Deals | Flights, Hotels & Transfers | Lugvia",
  description: "Limited time offers on flights, luxury hotels, airport transfers, and tour packages. Book now and save up to 50% on your next travel adventure.",
  keywords: "flash deals, cheap flights, hotel discounts, airport transfer offers, last minute travel, holiday packages",
};

export default function FlashDealsPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse">
            <Zap className="h-5 w-5 text-yellow-300" />
            <span className="font-bold text-sm uppercase tracking-wider">Limited Time Offers</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Exclusive Flash Deals</h1>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto mb-8">
            Unbeatable prices on flights, hotels, and experiences. 
            These offers are here for a good time, not a long time.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-red-600 hover:bg-slate-100" asChild>
              <Link href="#flights">Explore Deals</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow-xl border">
          <Link href="#featured" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-slate-50 transition-colors group text-center">
            <div className="p-3 bg-red-100 rounded-full group-hover:scale-110 transition-transform">
              <Star className="h-6 w-6 text-red-600" />
            </div>
            <span className="font-medium">Top Campaigns</span>
          </Link>
          <Link href="#flights" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-slate-50 transition-colors group text-center">
            <div className="p-3 bg-blue-100 rounded-full group-hover:scale-110 transition-transform">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-medium">Flight Deals</span>
          </Link>
          <Link href="#hotels" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-slate-50 transition-colors group text-center">
            <div className="p-3 bg-indigo-100 rounded-full group-hover:scale-110 transition-transform">
              <Hotel className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="font-medium">Hotel Offers</span>
          </Link>
          <Link href="#transfers" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-slate-50 transition-colors group text-center">
            <div className="p-3 bg-emerald-100 rounded-full group-hover:scale-110 transition-transform">
              <Car className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="font-medium">Transfer Sales</span>
          </Link>
          <Link href="#esim" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-slate-50 transition-colors group text-center">
            <div className="p-3 bg-purple-100 rounded-full group-hover:scale-110 transition-transform">
              <Smartphone className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-medium">eSIM Deals</span>
          </Link>
          <Link href="#tours" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-slate-50 transition-colors group text-center">
            <div className="p-3 bg-amber-100 rounded-full group-hover:scale-110 transition-transform">
              <Map className="h-6 w-6 text-amber-600" />
            </div>
            <span className="font-medium">Experiences</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* Featured Campaigns Section */}
        <section id="featured" className="scroll-mt-24">
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
            <Zap className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            Featured Partner Campaigns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Everyday Escape */}
             <div className="group relative overflow-hidden rounded-2xl shadow-lg border hover:shadow-xl transition-all">
                <div className="h-48 relative">
                   <Image 
                     src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80" 
                     alt="Everyday Escape" 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">DAILY DEALS</span>
                      <h3 className="text-xl font-bold">Everyday Escape</h3>
                   </div>
                </div>
                <div className="p-6 bg-white">
                   <p className="text-slate-600 mb-6 text-sm">
                     Discover daily drops on hotels and flights. Your next escape is just a click away.
                   </p>
                   <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                     <a 
                       href="https://sg.trip.com/sale/w/28065/everydayescape.html?locale=en-SG&promo_referer=3371_28065_1&Allianceid=7712503&SID=289350125&trip_sub1=&trip_sub3=P10328201" 
                       target="_blank" 
                       rel="noopener noreferrer"
                     >
                       Shop Daily Deals <ArrowRight className="ml-2 h-4 w-4" />
                     </a>
                   </Button>
                </div>
             </div>

             {/* Holiday Deals 2025 */}
             <div className="group relative overflow-hidden rounded-2xl shadow-lg border hover:shadow-xl transition-all">
                <div className="h-48 relative">
                   <Image 
                     src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80" 
                     alt="Holiday Deals 2025" 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-rose-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">UP TO 80% OFF</span>
                      <h3 className="text-xl font-bold">2025 Holiday Specials</h3>
                   </div>
                </div>
                <div className="p-6 bg-white">
                   <p className="text-slate-600 mb-6 text-sm">
                     Plan ahead and save big. Massive discounts on early bird bookings for your 2025 holidays.
                   </p>
                   <Button asChild className="w-full bg-rose-600 hover:bg-rose-700">
                     <a 
                       href="https://sg.trip.com/sale/w/27435/holidaydeals2025.html?locale=en-sg&curr=sgd&transparentBar=1&promo_referer=3371_27435_3&Allianceid=7712503&SID=289350125&trip_sub1=&trip_sub3=P10328222" 
                       target="_blank" 
                       rel="noopener noreferrer"
                     >
                       View 2025 Offers <ArrowRight className="ml-2 h-4 w-4" />
                     </a>
                   </Button>
                </div>
             </div>

             {/* CNY Long Weekend */}
             <div className="group relative overflow-hidden rounded-2xl shadow-lg border hover:shadow-xl transition-all">
                <div className="h-48 relative">
                   <Image 
                     src="https://images.unsplash.com/photo-1523585895729-a4bb980d5c14?auto=format&fit=crop&q=80" 
                     alt="CNY Getaways" 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-red-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">LIMITED TIME</span>
                      <h3 className="text-xl font-bold">Long Weekend Getaways</h3>
                   </div>
                </div>
                <div className="p-6 bg-white">
                   <p className="text-slate-600 mb-6 text-sm">
                     Celebrate Chinese New Year with a quick escape. Curated trips for the long weekend.
                   </p>
                   <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                     <a 
                       href="https://sg.trip.com/sale/w/29815/long-weekend.html?locale=en-SG&promo_referer=3371_29815_2&Allianceid=7712503&SID=289350125&trip_sub1=&trip_sub3=P10328243" 
                       target="_blank" 
                       rel="noopener noreferrer"
                     >
                       Book CNY Trip <ArrowRight className="ml-2 h-4 w-4" />
                     </a>
                   </Button>
                </div>
             </div>
          </div>
        </section>
        
        {/* Flight Deals Section */}
        <section id="flights" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Plane className="h-8 w-8 text-blue-600" />
              Flash Flight Deals
            </h2>
            <div className="flex items-center gap-2 text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">
              <Timer className="h-4 w-4" />
              <span>Ends in 24h</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid gap-6">
               {/* Deal Cards */}
               <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    50% OFF
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 space-y-2 text-center md:text-left">
                       <h3 className="text-xl font-bold">China to Global Destinations</h3>
                       <p className="text-muted-foreground">Exclusive rates for departures from Beijing, Shanghai, and Guangzhou.</p>
                       <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                          <span className="bg-slate-100 px-2 py-1 rounded">Economy</span>
                          <span className="bg-slate-100 px-2 py-1 rounded">23kg Baggage</span>
                       </div>
                    </div>
                    <div className="text-center md:text-right">
                       <p className="text-sm text-muted-foreground line-through">was $850</p>
                       <p className="text-3xl font-bold text-blue-600">$425</p>
                       <Button className="mt-2 w-full md:w-auto">Book Now</Button>
                    </div>
                  </div>
               </div>

               <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    HOT
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 space-y-2 text-center md:text-left">
                       <h3 className="text-xl font-bold">Europe Summer Sale</h3>
                       <p className="text-muted-foreground">London, Paris, Rome - Fly for less this summer.</p>
                       <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                          <span className="bg-slate-100 px-2 py-1 rounded">Round Trip</span>
                          <span className="bg-slate-100 px-2 py-1 rounded">Meal Included</span>
                       </div>
                    </div>
                    <div className="text-center md:text-right">
                       <p className="text-sm text-muted-foreground line-through">was $600</p>
                       <p className="text-3xl font-bold text-blue-600">$350</p>
                       <Button className="mt-2 w-full md:w-auto">Check Dates</Button>
                    </div>
                  </div>
               </div>
            </div>

            {/* Banner Sidebar */}
            <div className="bg-slate-50 rounded-xl p-6 border flex flex-col items-center text-center">
              <h3 className="font-bold text-lg mb-4">Partner Special</h3>
              <p className="text-sm text-muted-foreground mb-6">Exclusive flight offers for our members.</p>
              <iframe 
                src="https://www.trip.com/partners/ad/DB10327655?Allianceid=7712503&SID=289350125&trip_sub1=" 
                style={{ width: "300px", height: "250px", border: "none" }} 
                id="DB10327655"
                title="Trip.com Flight Deals"
              />
            </div>
          </div>
        </section>

        {/* Hotel Deals Section */}
        <section id="hotels" className="scroll-mt-24 pt-8 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Hotel className="h-8 w-8 text-indigo-600" />
              Hotel Flash Sales
            </h2>
            <Link href="/hotel-booking" className="text-indigo-600 font-medium hover:underline flex items-center gap-1">
              View all hotels <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-6 border flex flex-col items-center text-center order-last lg:order-first">
               <h3 className="font-bold text-lg mb-4">Deal of the Day</h3>
               <p className="text-sm text-muted-foreground mb-6">Luxury stays at unbeatable prices.</p>
               <iframe 
                 src="https://www.trip.com/partners/ad/DB10327207?Allianceid=7712503&SID=289350125&trip_sub1=" 
                 style={{ width: "300px", height: "250px", border: "none" }} 
                 id="DB10327207"
                 title="Trip.com Hotel Deals"
               />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
               {[1, 2].map((i) => (
                 <div key={i} className="group bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all">
                    <div className="relative h-48">
                      <Image 
                        src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&random=${i}`}
                        alt="Hotel"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> 4.9
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2">Luxury Resort & Spa</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <Map className="h-3 w-3" /> Maldives
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground line-through">$800/night</p>
                          <p className="text-xl font-bold text-indigo-600">$450</p>
                        </div>
                        <Button variant="outline" size="sm">View Deal</Button>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Transfer & Tours Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
          <section id="transfers" className="scroll-mt-24">
             <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <Car className="h-6 w-6 text-emerald-600" />
                Transfer Deals
             </h2>
             <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <div className="space-y-4">
                   <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                      <div>
                        <h4 className="font-bold">Airport to City</h4>
                        <p className="text-sm text-muted-foreground">Fixed price for groups up to 4</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">-20%</span>
                   </div>
                   <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                      <div>
                        <h4 className="font-bold">Hourly Chauffeur</h4>
                        <p className="text-sm text-muted-foreground">Min. 4 hours booking</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">-15%</span>
                   </div>
                   <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">Book Transfer</Button>
                </div>
             </div>
          </section>

          <section id="esim" className="scroll-mt-24">
             <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <Smartphone className="h-6 w-6 text-purple-600" />
                Global Connectivity
             </h2>
             <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-6 relative h-48 rounded-lg overflow-hidden">
                    <Image 
                       src="https://images.unsplash.com/photo-1512428559087-560fa5ce7d87?auto=format&fit=crop&q=80"
                       alt="eSIM"
                       fill
                       className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                       <h3 className="text-white text-2xl font-bold text-center px-4">Stay Connected Worldwide</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                     <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                        <div>
                          <h4 className="font-bold">Airalo eSIMs</h4>
                          <p className="text-sm text-muted-foreground">Data packs for 200+ countries</p>
                        </div>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">Best Rates</span>
                     </div>
                     <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside px-2">
                       <li>Instant activation</li>
                       <li>No physical SIM needed</li>
                       <li>Keep your number active</li>
                     </ul>
                  </div>
                  
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 mt-6">
                    <a href="https://airalo.tpo.lu/GpUbMuA3" target="_blank" rel="noopener noreferrer">
                      Get eSIM Now <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
             </div>
          </section>

          <section id="tours" className="scroll-mt-24 md:col-span-2">
             <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <Map className="h-6 w-6 text-amber-600" />
                Top Experiences & Activities
             </h2>
             <div className="bg-white rounded-xl shadow-sm border p-1 min-h-[400px]">
                <TiqetsWidget />
             </div>
          </section>
        </div>

      </div>
    </div>
  );
}
