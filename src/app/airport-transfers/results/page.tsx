import { getTransferPrices, TransferPrice } from "@/lib/gettransfer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Car, Users, Briefcase, Info } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

interface TransferResultsPageProps {
  searchParams: Promise<{
    pickup_name?: string;
    pickup_lat?: string;
    pickup_lon?: string;
    dropoff_name?: string;
    dropoff_lat?: string;
    dropoff_lon?: string;
    date?: string;
    passengers?: string;
  }>;
}

export default async function TransferResultsPage(props: TransferResultsPageProps) {
  const searchParams = await props.searchParams;
  const {
    pickup_name,
    pickup_lat,
    pickup_lon,
    dropoff_name,
    dropoff_lat,
    dropoff_lon,
    date,
    passengers
  } = searchParams;

  if (!pickup_lat || !pickup_lon || !dropoff_lat || !dropoff_lon || !date) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Missing Search Parameters</h1>
        <Link href="/airport-transfers">
          <Button>Go Back</Button>
        </Link>
      </div>
    );
  }

  const from = {
    code: 'START',
    name: pickup_name || 'Pickup',
    country_name: '',
    type: 'location',
    coordinates: {
      lat: parseFloat(pickup_lat),
      lon: parseFloat(pickup_lon),
    }
  };

  const to = {
    code: 'END',
    name: dropoff_name || 'Dropoff',
    country_name: '',
    type: 'location',
    coordinates: {
      lat: parseFloat(dropoff_lat),
      lon: parseFloat(dropoff_lon),
    }
  };

  const pax = passengers ? parseInt(passengers) : 1;
  const pricesData = await getTransferPrices(from, to, date, pax);

  const vehicleTypes: Record<string, { label: string; icon: any; description: string }> = {
    economy: { label: "Economy", icon: Car, description: "Affordable reliable ride" },
    comfort: { label: "Comfort", icon: Car, description: "Comfortable sedan for city trips" },
    business: { label: "Business", icon: Briefcase, description: "Mercedes E-class or similar" },
    premium: { label: "Premium", icon: Briefcase, description: "Luxury sedan for VIPs" },
    limousine: { label: "Limousine", icon: Car, description: "Stretch limo for special occasions" },
    suv: { label: "SUV", icon: Car, description: "Spacious 4x4 for extra luggage" },
    van: { label: "Van", icon: Users, description: "Minivan for families or groups" },
    minibus: { label: "Minibus", icon: Users, description: "For larger groups up to 18" },
    bus: { label: "Bus", icon: Users, description: "Coach for large groups" },
  };

  // Construct deep link for GetTransfer
  // Using query params that GetTransfer likely accepts or at least pre-fills the form
  const getTransferLink = (vehicleType: string) => {
    const params = new URLSearchParams({
      from_name: pickup_name || '',
      to_name: dropoff_name || '',
      date_to: date,
      pax: pax.toString(),
      transport_type: vehicleType,
      marker: process.env.GETTRANSFER_MARKER || '',
    });
    return `https://gettransfer.com/en/transfer/request?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 h-24 w-full"></div>
      
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Transfer Options</h1>
          <div className="flex items-center gap-2 text-slate-600 flex-wrap">
            <span className="font-semibold text-slate-900">{pickup_name}</span>
            <ArrowRight className="h-4 w-4" />
            <span className="font-semibold text-slate-900">{dropoff_name}</span>
            <span className="mx-2 hidden md:inline">•</span>
            <span className="text-sm md:text-base">{format(new Date(date), 'MMMM d, yyyy HH:mm')}</span>
          </div>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {pricesData && pricesData.data && pricesData.data.prices ? (
            Object.entries(pricesData.data.prices).map(([type, priceInfo]) => {
              if (!priceInfo || !priceInfo.min) return null;
              const typeInfo = vehicleTypes[type] || { label: type, icon: Car, description: "Private transfer" };
              const Icon = typeInfo.icon;

              return (
                <div key={type} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-8 w-8 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold capitalize">{typeInfo.label}</h3>
                        <p className="text-slate-500">{typeInfo.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                           <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {pax} pax</span>
                           <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> Luggage included</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center min-w-[150px]">
                      <div className="text-sm text-muted-foreground mb-1">Starting from</div>
                      <div className="text-2xl font-bold text-primary mb-3">{priceInfo.min}</div>
                      <Link href={getTransferLink(type)} target="_blank" className="w-full">
                        <Button className="w-full">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
              <Car className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">No transfers found</h3>
              <p className="text-slate-500 mb-2">
                We couldn't find any available transfers for this route.
              </p>
              {pricesData?.error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm font-mono">
                  {pricesData.error}
                </div>
              )}
              <p className="text-slate-500 mb-6 text-sm">
                Tip: Bookings must be made at least 6 hours in advance.
              </p>
              <Link href="/airport-transfers">
                <Button variant="outline">Modify Search</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
