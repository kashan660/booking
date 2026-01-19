import { searchBookingHotels } from "@/lib/booking-com";
import { Star, MapPin, Wifi, Coffee, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RealtimeHotelListProps {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export async function RealtimeHotelList({ city, checkIn, checkOut, guests }: RealtimeHotelListProps) {
  // Fetch real-time data from Booking.com (or mock if no keys)
  const hotels = await searchBookingHotels({
    city,
    checkIn,
    checkOut,
    adults: guests,
    children: 0,
    currency: "USD"
  });

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border">
        <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
        <p className="text-muted-foreground">Try changing your dates or destination.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {hotels.length} Properties found in {city}
        </h2>
        <span className="text-sm text-muted-foreground bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
          Real-time Availability
        </span>
      </div>

      {hotels.map((hotel) => (
        <div key={hotel.hotel_id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
          <div className="relative w-full md:w-72 h-48 md:h-auto bg-slate-100 flex-shrink-0">
            <Image
              src={hotel.photo_url}
              alt={hotel.name}
              fill
              className="object-cover"
            />
            {hotel.stars && (
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                {hotel.stars} Star
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{hotel.address}, {hotel.city}</span>
                </div>
              </div>
              {hotel.review_score && (
                <div className="flex flex-col items-end">
                  <div className="bg-[#003580] text-white font-bold px-2 py-1 rounded text-sm">
                    {hotel.review_score}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Rating</span>
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-6 mt-2 text-sm text-muted-foreground">
               {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
                 <span key={idx} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border">
                   {amenity === "Free WiFi" ? <Wifi className="h-3 w-3" /> : <Coffee className="h-3 w-3" />}
                   {amenity}
                 </span>
               )) || (
                 <>
                    <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> Free WiFi</span>
                    <span className="flex items-center gap-1"><Coffee className="h-3 w-3" /> Breakfast Info</span>
                 </>
               )}
            </div>

            <div className="mt-auto flex justify-between items-end">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Price for {guests} guests</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#003580]">
                    {hotel.currency} {hotel.min_price}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-medium mt-1">Free cancellation options</p>
              </div>
              
              <Button asChild className="bg-[#003580] hover:bg-[#00224f]">
                <Link href={hotel.deep_link_url} target="_blank" rel="noopener noreferrer">
                  View Availability <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
