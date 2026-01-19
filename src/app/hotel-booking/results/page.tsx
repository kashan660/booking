import { Button } from "@/components/ui/button";
import { ArrowRight, Hotel, Info } from "lucide-react";
import Link from "next/link";
import { HotelSearch } from "@/components/features/HotelSearch";

interface PageProps {
  searchParams: Promise<{
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function HotelResultsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const { location, checkIn, checkOut, guests } = searchParams;
  
  // Construct a deep link for the "View Deals" button as a fallback
  const hotellookLink = `https://search.hotellook.com/hotels?destination=${location}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}&children=&currency=usd&marker=696229.manual`;
  
  // Create the widget src with search params to pre-fill the search
  // Note: The widget uses specific parameter names
  const widgetSrc = `/hotel-widget.html?destination=${location || ''}&checkIn=${checkIn || ''}&checkOut=${checkOut || ''}&adults=${guests || '2'}`;

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white pt-32 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Hotels in {location || "Your Destination"}</h1>
          <p className="text-slate-300">
             {checkIn} — {checkOut} • {guests || 2} Guests
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
         <HotelSearch />
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden min-h-[600px] relative">
            {/* 
                We use an iframe to load the official Hotellook Search Widget.
                This provides REAL-TIME availability and prices, solving the issue of the Cache API being empty.
            */}
            
            <div className="bg-blue-50 p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <Info className="h-5 w-5 text-blue-600" />
                 <span className="text-sm text-blue-800 font-medium">Want to see our new Native Booking Engine?</span>
              </div>
              <Link href={`/hotel-booking/realtime?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}>
                <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Try Real-time API Demo
                </Button>
              </Link>
            </div>

            <iframe 
                src={widgetSrc}
                className="w-full h-full min-h-[800px] border-0"
                title="Hotel Search Results"
            />
            
            {/* Fallback / Direct Link Overlay at bottom */}
            <div className="bg-slate-50 border-t p-4 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                    Don't see what you're looking for? Check the full inventory directly.
                </p>
                <Link href={hotellookLink} target="_blank" rel="nofollow noopener">
                    <Button variant="outline" className="gap-2">
                        Open Full Search on Hotellook <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
