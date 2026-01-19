import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden h-[60vh] min-h-[400px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-slate-900">
        <Image 
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Airport Transfer and Chauffeur Service"
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/30 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 max-w-4xl drop-shadow-xl leading-tight">
          World-Class <span className="text-blue-400">Airport Transfers</span> & <br className="hidden md:block" />
          <span className="text-white">Luxury Chauffeur Service</span>
        </h1>
        <p className="text-lg text-white mb-8 max-w-2xl drop-shadow-md font-medium leading-relaxed">
          Experience the #1 rated global transfer service. From private airport pickups to hourly executive chauffeurs, 
          we guarantee <span className="text-white font-semibold">punctuality</span>, <span className="text-white font-semibold">safety</span>, and <span className="text-white font-semibold">comfort</span> in over 150 countries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button size="lg" className="text-lg px-8 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20" asChild>
            <Link href="/book-transfer">
              Book Your Ride Now
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 h-12 bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-md" asChild>
            <Link href="/hourly-booking">
              Hourly Chauffeur
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
