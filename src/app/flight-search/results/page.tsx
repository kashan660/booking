import { getFlightPrices, FlightTicket } from "@/lib/travelpayouts";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Plane, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

interface FlightSearchResultsPageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: string;
  }>;
}

export default async function FlightSearchResultsPage(props: FlightSearchResultsPageProps) {
  const searchParams = await props.searchParams;
  const { origin, destination, date, passengers } = searchParams;
  
  const MARKER = process.env.TRAVELPAYOUTS_MARKER || '696229';

  if (!origin || !destination) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl inline-block">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Missing Search Parameters</h1>
          <p className="mb-6">Please provide both origin and destination.</p>
          <Link href="/flights-booking">
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
    );
  }

  let flights: FlightTicket[] = [];
  let error = "";

  try {
    flights = await getFlightPrices(origin, destination, date);
  } catch (err) {
    console.error(err);
    error = "Failed to fetch flight prices. Please try again later.";
  }

  // Construct the search URL for the "See all flights" fallback
  // Format: https://aviasales.com/search/ORIGIN[DATE]DESTINATION1
  // Date format: DDMMYYYY
  const formattedDate = date ? format(new Date(date), 'ddMMyyyy') : '';
  // Default to 1 passenger if not specified
  const passengerCount = passengers ? parseInt(passengers) : 1;
  
  const aviasalesSearchUrl = `https://aviasales.com/search/${origin}${formattedDate}${destination}${passengerCount}?marker=${MARKER}`;

  const formatDate = (dateStr: string) => {
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return dateStr;
      return format(dateObj, 'MMMM d, yyyy');
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return '--:--';
      return format(dateObj, 'HH:mm');
    } catch {
      return '--:--';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Flight Results</h1>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-semibold text-white">{origin}</span>
            <ArrowRight className="h-4 w-4" />
            <span className="font-semibold text-white">{destination}</span>
            {date && (
              <>
                <span className="mx-2">•</span>
                <span>{formatDate(date)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 shadow-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="grid gap-4 max-w-4xl mx-auto">
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-2xl font-bold text-slate-900">{flight.airline}</div>
                      <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                        Flight {flight.flight_number}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div>
                        <div className="text-xl font-bold">{formatTime(flight.departure_at)}</div>
                        <div className="text-sm text-muted-foreground">{flight.origin}</div>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center px-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                        </div>
                        <div className="w-full h-[2px] bg-slate-200 relative">
                          <Plane className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 transform rotate-90" />
                        </div>
                        <div className="text-xs text-green-600 font-medium mt-1">
                          {flight.transfers === 0 ? 'Direct' : `${flight.transfers} Stop(s)`}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold">{formatTime(flight.return_at)}</div>
                        <div className="text-sm text-muted-foreground">{flight.destination}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 min-w-[150px]">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="text-2xl font-bold text-primary">${flight.price}</div>
                    </div>
                    <Link 
                      href={`https://aviasales.com${flight.link}${flight.link.includes('?') ? '&' : '?'}marker=${MARKER}`} 
                      target="_blank"
                      className="w-full"
                    >
                      <Button className="w-full">
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
              <Plane className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">No specific flights found</h3>
              <p className="text-slate-500 mb-6">
                We couldn't find exact matches for this date in our cache. 
                Check live availability on Aviasales.
              </p>
              <Link href={aviasalesSearchUrl} target="_blank">
                <Button size="lg">
                  Search on Aviasales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
          
          <div className="mt-8 text-center">
             <p className="text-sm text-slate-500 mb-4">Not finding what you're looking for?</p>
             <Link href={aviasalesSearchUrl} target="_blank">
                <Button variant="outline">
                  View All Flights on Aviasales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
