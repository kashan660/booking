"use client";

import { Car, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationSearch, Location } from "@/components/features/LocationSearch";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AirportTransfersPage() {
  const router = useRouter();
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);

  const handleSearch = () => {
    if (!pickup || !dropoff || !date || !time) {
      alert("Please select pickup, dropoff, date and time");
      return;
    }

    if (!pickup.coordinates || !dropoff.coordinates) {
        alert("Selected locations do not have valid coordinates. Please try another location.");
        return;
    }

    const dateTime = `${date}T${time}:00`;
    
    // Construct query params with coordinates
    const params = new URLSearchParams({
      pickup_name: pickup.name,
      pickup_lat: pickup.coordinates.lat.toString(),
      pickup_lon: pickup.coordinates.lon.toString(),
      dropoff_name: dropoff.name,
      dropoff_lat: dropoff.coordinates.lat.toString(),
      dropoff_lon: dropoff.coordinates.lon.toString(),
      date: dateTime,
      passengers: passengers.toString(),
    });

    router.push(`/airport-transfers/results?${params.toString()}`);
  };

  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Airport Transfers</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Book reliable private transfers from airports and cities worldwide.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <LocationSearch
              label="Pickup Location"
              placeholder="Enter airport or city"
              icon={<Car className="h-4 w-4" />}
              onSelect={setPickup}
              className="w-full"
            />
            <LocationSearch
              label="Dropoff Location"
              placeholder="Enter airport or city"
              icon={<Car className="h-4 w-4" />}
              onSelect={setDropoff}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-9"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">Time</label>
              <div className="relative">
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="1"
                  max="50"
                  className="pl-9"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full text-lg h-12"
            onClick={handleSearch}
          >
            Search Transfers <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Car className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Reliable Service</h3>
            <p className="text-slate-600">Professional drivers and tracked flights for seamless pickups.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Any Group Size</h3>
            <p className="text-slate-600">From sedans to buses, we have vehicles for every group size.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Cancellation</h3>
            <p className="text-slate-600">Free cancellation up to 24 hours before your transfer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
