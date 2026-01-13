"use client";

import { Plane, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationSearch } from "@/components/features/LocationSearch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function FlightsBookingPage() {
  const router = useRouter();
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);

  const handleSearch = () => {
    if (!origin || !destination) {
      alert("Please select both origin and destination");
      return;
    }

    const params = new URLSearchParams({
      origin,
      destination,
      passengers: passengers.toString(),
    });

    if (date) {
      params.append("date", date);
    }

    router.push(`/flight-search/results?${params.toString()}`);
  };

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
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <LocationSearch 
                label="From" 
                placeholder="Departure City" 
                onSelect={(loc) => setOrigin(loc.code)}
              />
            </div>
            <div className="space-y-2">
              <LocationSearch 
                label="To" 
                placeholder="Arrival City" 
                icon={<Plane className="h-4 w-4 transform rotate-90" />}
                onSelect={(loc) => setDestination(loc.code)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  type="number" 
                  min="1" 
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          <Button className="w-full mt-6" size="lg" onClick={handleSearch}>Search Flights</Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Popular Flight Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { from: "London", to: "Dubai", price: "£350" },
              { from: "New York", to: "London", price: "£420" },
              { from: "Paris", to: "Istanbul", price: "£180" },
              { from: "Dubai", to: "Singapore", price: "£450" },
            ].map((route, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-lg">{route.from}</p>
                    <p className="text-sm text-muted-foreground">LHR</p>
                  </div>
                  <Plane className="h-5 w-5 text-primary transform rotate-90" />
                  <div>
                    <p className="font-semibold text-lg">{route.to}</p>
                    <p className="text-sm text-muted-foreground">DXB</p>
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
      </div>
    </div>
  );
}
