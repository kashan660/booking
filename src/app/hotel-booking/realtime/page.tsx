import { HotelSearch } from "@/components/features/HotelSearch";
import { RealtimeHotelList } from "@/components/features/RealtimeHotelList";
import { HotelListSkeleton } from "@/components/ui/skeleton-hotel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function RealtimeHotelPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const { location, checkIn, checkOut, guests } = searchParams;
  
  const city = location || "Dubai";
  const checkInDate = checkIn || new Date().toISOString().split("T")[0];
  const checkOutDate = checkOut || new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const guestCount = parseInt(guests || "2");

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      <div className="bg-[#003580] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/hotel-booking">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Real-time Search: {city}</h1>
          </div>
          <p className="text-blue-100">
             Showing live results from Booking.com Demand API (Demo Mode)
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
         <HotelSearch />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters (Placeholder) */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold mb-4">Filters</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="f1" className="rounded border-gray-300" />
                  <label htmlFor="f1">Free Cancellation</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="f2" className="rounded border-gray-300" />
                  <label htmlFor="f2">4 Stars & up</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="f3" className="rounded border-gray-300" />
                  <label htmlFor="f3">Breakfast Included</label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <Suspense fallback={<HotelListSkeleton />}>
              <RealtimeHotelList 
                city={city}
                checkIn={checkInDate}
                checkOut={checkOutDate}
                guests={guestCount}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
