"use client";

import { Plane, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationSearch } from "@/components/features/LocationSearch";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FlightWidget() {
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
    <div className="w-full my-12 flex justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
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
  );
}
