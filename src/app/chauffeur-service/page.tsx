import { User, Shield, Star, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChauffeurServicePage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Chauffeur Service</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Experience the ultimate in luxury and comfort with our professional 
            chauffeur service.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Drivers</h3>
              <p className="text-muted-foreground">
                Discreet, punctual, and highly trained professionals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Luxury Fleet</h3>
              <p className="text-muted-foreground">
                Latest models of Mercedes-Benz, BMW, and Audi.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Highest standards of safety and hygiene.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Perfect for Any Occasion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-8">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> Business Meetings
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> Airport Transfers
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> Special Events
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> Weddings
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> City Tours
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> VIP Transport
                </li>
              </ul>
            </div>
            <Button size="lg">Book a Chauffeur</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
