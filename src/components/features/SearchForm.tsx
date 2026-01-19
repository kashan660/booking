"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Users, Clock, ArrowRightLeft, Car } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationSearch, Location } from "@/components/features/LocationSearch";

export function SearchForm() {
  const router = useRouter();
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState<string>("12:00");
  const [passengers, setPassengers] = useState<number>(1);
  const [returnDate, setReturnDate] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("12:00");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickup || !dropoff) {
      alert("Please select valid pickup and dropoff locations");
      return;
    }

    if (!pickup.coordinates || !dropoff.coordinates) {
        alert("Selected locations do not have valid coordinates. Please try another location.");
        return;
    }

    const dateTime = `${date}T${time}:00`;
    
    // Construct query params
    const params = new URLSearchParams({
      pickup_name: pickup.name,
      pickup_lat: pickup.coordinates.lat.toString(),
      pickup_lon: pickup.coordinates.lon.toString(),
      dropoff_name: dropoff.name,
      dropoff_lat: dropoff.coordinates.lat.toString(),
      dropoff_lon: dropoff.coordinates.lon.toString(),
      date: dateTime,
      passengers: passengers.toString(),
      type: tripType
    });

    if (tripType === "round-trip" && returnDate) {
        params.append("return_date", `${returnDate}T${returnTime}:00`);
    }

    router.push(`/airport-transfers/results?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden mt-8 relative z-30 border border-slate-100">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          type="button"
          className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
            tripType === "one-way" 
              ? "bg-white text-primary border-b-2 border-primary" 
              : "bg-slate-50 text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setTripType("one-way")}
        >
          One Way
        </button>
        <button
          type="button"
          className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
            tripType === "round-trip" 
              ? "bg-white text-primary border-b-2 border-primary" 
              : "bg-slate-50 text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setTripType("round-trip")}
        >
          Round Trip
        </button>
      </div>

      <form onSubmit={handleSearch} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <LocationSearch
              label="Pickup Location"
              placeholder="Airport, Hotel or City"
              icon={<MapPin className="h-4 w-4" />}
              onSelect={setPickup}
              className="w-full"
            />
            <LocationSearch
              label="Dropoff Location"
              placeholder="Airport, Hotel or City"
              icon={<MapPin className="h-4 w-4" />}
              onSelect={setDropoff}
              className="w-full"
            />
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-500">
                <CalendarIcon className="h-4 w-4" /> Date & Time
              </Label>
              <div className="flex gap-2">
                  <Input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="flex-1"
                  />
                  <Input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-24"
                  />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-500">
                <Users className="h-4 w-4" /> Passengers
              </Label>
              <Input 
                type="number" 
                min={1} 
                max={15}
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
              />
            </div>
        </div>
        
        {tripType === "round-trip" && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-slate-500">
                    <CalendarIcon className="h-4 w-4" /> Return Date & Time
                  </Label>
                  <div className="flex gap-2">
                      <Input 
                        type="date" 
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={date}
                        className="flex-1"
                      />
                      <Input 
                        type="time" 
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-24"
                      />
                  </div>
                </div>
             </div>
        )}

        <div className="mt-6 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto px-8 font-semibold text-lg h-12">
                Search Transfers
            </Button>
        </div>
      </form>
    </div>
  );
}
