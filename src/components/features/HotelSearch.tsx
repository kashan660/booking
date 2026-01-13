"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, MapPin, Search, Users } from "lucide-react";
import { format, addDays } from "date-fns";
import { LocationSearch } from "./LocationSearch";

export function HotelSearch() {
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [checkIn, setCheckIn] = useState(format(new Date(), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    if (!location) {
      alert("Please select a destination");
      return;
    }

    const params = new URLSearchParams({
      location: location.name,
      checkIn,
      checkOut,
      guests: guests.toString()
    });

    router.push(`/hotel-booking/results?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <LocationSearch 
            label="Destination" 
            placeholder="Where are you going?" 
            icon={<MapPin className="h-4 w-4" />}
            onSelect={setLocation}
          />
        </div>
        
        <div className="md:col-span-1">
          <label className="text-sm font-medium mb-2 block">Check-in</label>
          <div className="relative">
             <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
             <Input 
               type="date" 
               className="pl-9"
               value={checkIn}
               onChange={(e) => setCheckIn(e.target.value)}
               min={format(new Date(), "yyyy-MM-dd")}
             />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="text-sm font-medium mb-2 block">Check-out</label>
          <div className="relative">
             <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
             <Input 
               type="date" 
               className="pl-9"
               value={checkOut}
               onChange={(e) => setCheckOut(e.target.value)}
               min={checkIn}
             />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="text-sm font-medium mb-2 block">Guests</label>
          <div className="relative">
             <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
             <Input 
               type="number" 
               className="pl-9"
               value={guests}
               onChange={(e) => setGuests(parseInt(e.target.value))}
               min={1}
               max={10}
             />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={handleSearch} className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" /> Search Hotels
        </Button>
      </div>
    </div>
  );
}
