import { getCheapestFlights, CheapestTicket } from "@/lib/travelpayouts";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Plane, AlertCircle, Info } from "lucide-react";
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

  let flights: CheapestTicket[] = [];
  let error = "";

  try {
    flights = await getCheapestFlights(origin, destination, date);
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

        {flights.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <div className="max-w-md mx-auto">
              <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Cached Flights Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find cached deals for this specific route and date. 
                However, you can check real-time availability and prices directly on Aviasales.
              </p>
              <Link href={aviasalesSearchUrl} target="_blank" rel="nofollow noopener">
                <Button size="lg" className="w-full sm:w-auto bg-[#ff6d00] hover:bg-[#ff6d00]/90">
                  Search Live on Aviasales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {flights.map((flight, index) => (
              <div key={`${flight.airline}-${flight.flight_number}-${index}`} className="bg-white rounded-xl shadow-sm border p-4 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Airline Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <Plane className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{flight.airline}</div>
                        <div className="text-sm text-muted-foreground">Flight {flight.flight_number}</div>
                      </div>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="flex-[2] flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <div className="text-center">
                      <div className="font-bold text-xl">{formatTime(flight.departure_at)}</div>
                      <div className="text-sm text-muted-foreground">{flight.origin}</div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center w-full md:w-auto">
                      <div className="text-xs text-muted-foreground mb-1">Direct</div>
                      <div className="w-full h-[2px] bg-slate-200 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1">
                          <Plane className="h-3 w-3 text-slate-300 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-xl">{formatTime(flight.return_at)}</div>
                      <div className="text-sm text-muted-foreground">{flight.destination}</div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-col items-end gap-3 min-w-[140px] border-t md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0">
                    <div>
                      <div className="text-sm text-muted-foreground text-right">Price from</div>
                      <div className="text-2xl font-bold text-primary">${flight.price}</div>
                    </div>
                    <Link href={aviasalesSearchUrl} target="_blank" rel="nofollow noopener" className="w-full">
                       <Button className="w-full">Select Flight</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-8 text-center">
               <p className="text-muted-foreground mb-4">Not finding what you want?</p>
               <Link href={aviasalesSearchUrl} target="_blank" rel="nofollow noopener">
                  <Button variant="outline">View More Flights on Aviasales</Button>
               </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
