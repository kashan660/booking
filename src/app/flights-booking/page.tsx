"use client";

import { Plane } from "lucide-react";
import { TravelPayoutsWhiteLabel } from "@/components/features/TravelPayoutsWhiteLabel";

export default function FlightsBookingPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Flights Booking</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Search and compare flights from hundreds of airlines. 
            Get the best deals for your next journey.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
           <TravelPayoutsWhiteLabel />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Popular Flight Routes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { from: "London", to: "Dubai", price: "£350" },
                  { from: "New York", to: "London", price: "£420" },
                  { from: "Paris", to: "Istanbul", price: "£180" },
                  { from: "Dubai", to: "Singapore", price: "£450" },
                  { from: "Beijing", to: "London", price: "£550" },
                  { from: "Shanghai", to: "Los Angeles", price: "£620" },
                ].map((route, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-xl border flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-lg">{route.from}</p>
                        <p className="text-sm text-muted-foreground">Depart</p>
                      </div>
                      <Plane className="h-5 w-5 text-primary transform rotate-90" />
                      <div>
                        <p className="font-semibold text-lg">{route.to}</p>
                        <p className="text-sm text-muted-foreground">Arrive</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">from</p>
                      <p className="text-xl font-bold text-primary">{route.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold text-lg mb-4">Special Flight Deals</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Check out these exclusive flight offers from China to destinations worldwide.
                </p>
                <div className="flex justify-center">
                  <iframe 
                    src="https://www.trip.com/partners/ad/DB10327655?Allianceid=7712503&SID=289350125&trip_sub1=" 
                    style={{ width: "300px", height: "250px", border: "none" }} 
                    id="DB10327655"
                    title="Trip.com Flight Deals"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border">
                <h3 className="font-bold text-lg mb-4">Why Fly with Us?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Plane className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Global Coverage</p>
                      <p className="text-sm text-muted-foreground">Flights to over 5,000 destinations.</p>
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
