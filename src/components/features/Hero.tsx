import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-slate-900">
        <Image 
          src="/images/hero/home-hero.jpg"
          alt="Luxury Airport Transfer and Chauffeur Service"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl drop-shadow-lg">
          Premium Airport Transfers & <br className="hidden md:block" />
          <span className="text-primary-foreground">Chauffeur Services</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-2xl drop-shadow-md">
          Reliable, comfortable, and affordable rides worldwide. Book your transfer in seconds and travel with peace of mind.
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="https://tpo.lu/hZW5cbuI" target="_blank" rel="noopener noreferrer">
              Book Transfer
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm" asChild>
            <Link href="/hourly-booking">
              Hourly Service
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
