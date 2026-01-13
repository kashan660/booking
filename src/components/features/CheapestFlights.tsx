"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowRight, Plane, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CheapestTicket } from "@/lib/travelpayouts";

interface CheapestFlightsProps {
  origin?: string;
}

export function CheapestFlights({ origin: initialOrigin }: CheapestFlightsProps) {
  const [flights, setFlights] = useState<CheapestTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState(initialOrigin || "LON");
  const [cityName, setCityName] = useState("");
  const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '696229';

  useEffect(() => {
    const fetchFlights = async () => {
      let currentOrigin = initialOrigin;

      // If no origin provided, try to detect user location
      if (!currentOrigin) {
        try {
          const locRes = await fetch('https://www.travelpayouts.com/whereami');
          if (locRes.ok) {
            const locData = await locRes.json();
            if (locData.iata) {
              currentOrigin = locData.iata;
              setOrigin(currentOrigin);
              setCityName(locData.name);
            }
          }
        } catch (error) {
          console.error("Failed to detect location:", error);
        }
      }

      // Fallback to LON if still no origin
      if (!currentOrigin) {
        currentOrigin = "LON";
        setOrigin("LON");
        setCityName("London");
      } else if (!cityName && currentOrigin === initialOrigin) {
         // If origin was passed but city name not set, we might want to fetch city name or just show origin code
         // For now, we'll just show the origin code if city name is missing
      }

      try {
        const res = await fetch(`/api/flights/cheapest?origin=${currentOrigin}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setFlights(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [initialOrigin]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Finding best deals from your location...</p>
      </div>
    );
  }

  if (flights.length === 0) {
     return (
        <div className="text-center py-8 text-muted-foreground">
            No flight deals found from {cityName || origin}.
        </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Cheapest Flights from {cityName || origin}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flights.slice(0, 6).map((flight, index) => {
           const flightLink = `https://aviasales.com/search/${flight.origin}${format(new Date(flight.departure_at), 'ddMMyyyy')}${flight.destination}1?marker=${MARKER}`;
           
           return (
            <div key={`${flight.destination}-${index}`} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                   <div className="bg-blue-100 p-2 rounded-full">
                     <Plane className="h-4 w-4 text-primary" />
                   </div>
                   <span className="font-bold text-lg">{flight.destination}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block">From</span>
                  <span className="text-xl font-bold text-green-600">${flight.price}</span>
                </div>
              </div>
              
              <div className="text-sm text-slate-500 mb-4 space-y-1">
                 <div className="flex justify-between">
                   <span>Departure:</span>
                   <span className="font-medium text-slate-700">{format(new Date(flight.departure_at), 'MMM d, yyyy')}</span>
                 </div>
                 <div className="flex justify-between">
                   <span>Airline:</span>
                   <span className="font-medium text-slate-700">{flight.airline}</span>
                 </div>
              </div>

              <Link href={flightLink} target="_blank" className="w-full block">
                <Button variant="outline" className="w-full group">
                  View Flight <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
           );
        })}
      </div>
    </div>
  );
}
