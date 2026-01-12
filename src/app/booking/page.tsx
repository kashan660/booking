import { Button } from "@/components/ui/button";
import { Users, Briefcase, Check, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const pickup = params.pickup as string;
  const dropoff = params.dropoff as string;
  const date = params.date as string;
  const time = params.time as string;
  const passengers = params.passengers as string;

  const vehicles = [
    {
      id: "economy",
      name: "Economy Sedan",
      image: "/images/hero/istanbul.jpg", // Placeholder
      price: 45,
      passengers: 3,
      luggage: 2,
      features: ["Air Conditioning", "Free Cancelation", "Instant Confirmation"],
    },
    {
      id: "business",
      name: "Business Class",
      image: "/images/hero/dubai.jpg", // Placeholder
      price: 75,
      passengers: 3,
      luggage: 2,
      features: ["Meet & Greet", "Free Waiting Time", "Leather Seats"],
    },
    {
      id: "van",
      name: "Luxury Van",
      image: "/images/hero/antalya.jpg", // Placeholder
      price: 90,
      passengers: 7,
      luggage: 6,
      features: ["Extra Space", "Child Seats Available", "Group Travel"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Summary */}
      <div className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Select Your Vehicle</h1>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">From:</span> {pickup}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">To:</span> {dropoff}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Date:</span> {date} at {time}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Passengers:</span> {passengers}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid gap-6 max-w-4xl mx-auto">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 relative h-48 md:h-auto">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                    unoptimized={false}
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{vehicle.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {vehicle.passengers}</span>
                        <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {vehicle.luggage}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">€{vehicle.price}</div>
                      <div className="text-xs text-slate-500">Fixed Price</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {vehicle.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-3 w-3 text-green-500" /> {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button size="lg" className="w-full md:w-auto">
                      Book {vehicle.name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
