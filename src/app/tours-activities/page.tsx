import { Camera, Map, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ViatorWidget } from "@/components/features/ViatorWidget";

export default function ToursActivitiesPage() {
  return (
    <div className="pb-20">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tours & Activities</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover the world with our curated experiences. 
            From city tours to desert safaris, create memories that last a lifetime.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-12">
             <ViatorWidget />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border overflow-hidden group hover:shadow-md transition-all">
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                   <Image 
                      src={`https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2572&auto=format&fit=crop&random=${i}`}
                      alt="Tour"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                      Best Seller
                   </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Map className="h-3 w-3" /> Rome, Italy</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 3 Hours</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Ancient Rome Walking Tour with Colosseum Access
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    Explore the ancient ruins of Rome with an expert guide. Skip the line access included.
                  </p>
                  
                  <div className="flex justify-between items-center border-t pt-4">
                    <div>
                      <span className="text-xs text-muted-foreground">From</span>
                      <p className="text-lg font-bold text-primary">€45</p>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
