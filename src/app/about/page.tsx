import { Building2, Users, Trophy, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Lugvia</h1>
        
        <div className="prose prose-lg dark:prose-invert mb-12">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Lugvia is a premier global transportation service provider, dedicated to offering 
            seamless, comfortable, and reliable travel experiences. Whether you're traveling for 
            business or leisure, we ensure your journey is as smooth as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-50 p-8 rounded-xl">
            <Target className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To revolutionize the ground transportation industry by providing top-tier service, 
              transparent pricing, and unmatched reliability to travelers worldwide.
            </p>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-xl">
            <Trophy className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              To be the world's most trusted and preferred choice for premium airport transfers 
              and chauffeur services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Cities Covered</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">50k+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
