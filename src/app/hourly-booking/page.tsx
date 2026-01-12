import { Clock, Briefcase, Star, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HourlyBookingPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hourly Booking</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Flexible chauffeur service by the hour. You direct the driver, 
            we take care of the rest.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Total Flexibility</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Need a car for a few hours or the whole day? Our hourly booking service gives you
              the freedom to travel at your own pace. Perfect for business meetings, sightseeing,
              or shopping trips.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>Minimum booking from just 2 hours</span>
              </li>
              <li className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>Professional business class service</span>
              </li>
              <li className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-primary" />
                <span>Dedicated driver at your disposal</span>
              </li>
              <li className="flex items-center gap-3">
                <Star className="h-5 w-5 text-primary" />
                <span>Premium fleet of vehicles</span>
              </li>
            </ul>

            <Button size="lg">Book Hourly Service</Button>
          </div>
          
          <div className="bg-slate-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
             <Clock className="w-32 h-32 text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
