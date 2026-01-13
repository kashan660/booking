import { getHotelPrices, getHotelDeepLink, getHotelSearchDeepLink, HotelPrice } from "@/lib/travelpayouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, MapPin, Wifi, Coffee, ArrowRight, Hotel, AlertCircle, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HotelSearch } from "@/components/features/HotelSearch";
import { format, addDays } from "date-fns";

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
  
  if (!location || !checkIn || !checkOut) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Search Parameters</h1>
            <p className="mb-8">Please provide a destination and dates.</p>
            <Link href="/hotel-booking">
                <Button>Go Back</Button>
            </Link>
        </div>
      </div>
    );
  }

  let hotels: HotelPrice[] = [];
  let isFallback = false;
  let error = null;

  try {
    // 1. Try fetching for user's specific dates
    hotels = await getHotelPrices(location, checkIn, checkOut);

    // 2. If no results, try fetching for "tomorrow" to show sample hotels
    if (hotels.length === 0) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextDay = new Date(tomorrow);
        nextDay.setDate(tomorrow.getDate() + 1);

        const fallbackCheckIn = format(tomorrow, 'yyyy-MM-dd');
        const fallbackCheckOut = format(nextDay, 'yyyy-MM-dd');

        hotels = await getHotelPrices(location, fallbackCheckIn, fallbackCheckOut);
        
        if (hotels.length > 0) {
            isFallback = true;
        }
    }
  } catch (err) {
    console.error(err);
    error = "Failed to fetch hotel prices.";
  }

  const searchLink = getHotelSearchDeepLink(
    location, 
    checkIn, 
    checkOut, 
    guests ? parseInt(guests) : 2
  );

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Hotels in {location}</h1>
          <p className="text-slate-300">
             {checkIn} — {checkOut} • {guests || 2} Guests
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
         <HotelSearch />
      </div>

      <div className="container mx-auto px-4">
        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
            </div>
        )}

        {isFallback && (
            <div className="bg-blue-50 border-blue-100 border text-blue-800 p-4 rounded-lg mb-8 flex items-start gap-3">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="font-bold">Showing Sample Prices</h3>
                    <p className="text-sm mt-1">
                        We don't have cached prices for your specific dates ({checkIn} to {checkOut}). 
                        Below are popular hotels in {location} with prices for tomorrow. 
                        <strong>Click "View Deal" to see real-time availability and prices for your dates.</strong>
                    </p>
                </div>
            </div>
        )}

        {hotels.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border shadow-sm">
                <Hotel className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Cached Deals Found</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find cached prices for this specific date and location. 
                    However, you can check real-time availability on Hotellook.
                </p>
                <Link href={searchLink} target="_blank" rel="nofollow noopener">
                    <Button size="lg" className="bg-[#ff6d00] hover:bg-[#ff6d00]/90">
                        Search Live on Hotellook <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                    <Card key={hotel.hotelId} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 bg-slate-200">
                             {/* Hotellook Image URL pattern */}
                             <Image 
                                src={`https://photo.hotellook.com/image_v2/limit/${hotel.hotelId}_1/800/520.auto`}
                                alt={hotel.hotelName}
                                fill
                                className="object-cover"
                                unoptimized
                             />
                             <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-bold shadow-sm">
                                {hotel.stars} ★
                             </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <h3 className="font-bold text-lg line-clamp-1">{hotel.hotelName}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span className="line-clamp-1">{hotel.location.name}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <div className="flex gap-2 text-xs text-muted-foreground mb-4">
                                <span className="bg-slate-100 px-2 py-1 rounded">Avg Price</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-primary">${Math.round(hotel.priceAvg)}</span>
                                <span className="text-sm text-muted-foreground">/night</span>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Link 
                                href={getHotelDeepLink(hotel.hotelId, checkIn, checkOut, guests ? parseInt(guests) : 2)}
                                target="_blank"
                                rel="nofollow noopener"
                                className="w-full"
                            >
                                <Button className="w-full">View Deal</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
