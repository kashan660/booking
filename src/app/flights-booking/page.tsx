import { Plane, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FlightsBookingPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Flights Booking</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Search and compare flights from hundreds of airlines. 
            Get the best deals for your next journey.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="relative">
                <Plane className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Departure City" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="relative">
                <Plane className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transform rotate-90" />
                <Input className="pl-9" placeholder="Arrival City" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" type="number" min="1" defaultValue="1" />
              </div>
            </div>
          </div>
          <Button className="w-full mt-6" size="lg">Search Flights</Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Popular Flight Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { from: "London", to: "Dubai", price: "£350" },
              { from: "New York", to: "London", price: "£420" },
              { from: "Paris", to: "Istanbul", price: "£180" },
              { from: "Dubai", to: "Singapore", price: "£450" },
            ].map((route, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-lg">{route.from}</p>
                    <p className="text-sm text-muted-foreground">LHR</p>
                  </div>
                  <Plane className="h-5 w-5 text-primary transform rotate-90" />
                  <div>
                    <p className="font-semibold text-lg">{route.to}</p>
                    <p className="text-sm text-muted-foreground">DXB</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">from</p>
                  <p className="text-xl font-bold text-primary">{route.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
