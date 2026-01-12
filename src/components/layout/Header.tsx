"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.svg" alt="Lugvia" width={32} height={32} className="h-8 w-8" priority />
            <span className="text-xl font-bold text-slate-900">Lugvia</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
          <div className="relative group">
            <button className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
              Services
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="bg-white border rounded-lg shadow-lg py-2 flex flex-col">
                <Link href="/airport-transfers" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary">Airport Transfers</Link>
                <Link href="/city-to-city" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary">City to City</Link>
                <Link href="/hourly-booking" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary">Hourly Booking</Link>
                <Link href="/chauffeur-service" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary">Chauffeur Service</Link>
                <Link href="/hotel-booking" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary">Hotel Booking</Link>
                <Link href="/flights-booking" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary">Flights Booking</Link>
                <Link href="/tours-activities" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary">Tours & Activities</Link>
              </div>
            </div>
          </div>
          <Link href="/destinations" className="text-sm font-medium transition-colors hover:text-primary">
            Destinations
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4" />
            <span>+44 7466 779542</span>
          </div>
          <Button variant="default" size="sm" className="hidden md:inline-flex">
            Book Now
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium py-2 border-b border-border/50" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium py-2 border-b border-border/50" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            
            <div className="flex flex-col">
              <button 
                className="flex items-center justify-between text-sm font-medium py-2 border-b border-border/50"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="flex flex-col bg-slate-50/50 pl-4 py-2 gap-2">
                  <Link href="/airport-transfers" className="text-sm py-1" onClick={() => setIsMenuOpen(false)}>Airport Transfers</Link>
                  <Link href="/city-to-city" className="text-sm py-1" onClick={() => setIsMenuOpen(false)}>City to City</Link>
                  <Link href="/hourly-booking" className="text-sm py-1" onClick={() => setIsMenuOpen(false)}>Hourly Booking</Link>
                  <Link href="/chauffeur-service" className="text-sm py-1" onClick={() => setIsMenuOpen(false)}>Chauffeur Service</Link>
                  <Link href="/hotel-booking" className="text-sm py-1" onClick={() => setIsMenuOpen(false)}>Hotel Booking</Link>
                  <Link href="/flights-booking" className="text-sm py-1" onClick={() => setIsMenuOpen(false)}>Flights Booking</Link>
                  <Link href="/tours-activities" className="text-sm py-1" onClick={() => setIsMenuOpen(false)}>Tours & Activities</Link>
                </div>
              )}
            </div>

            <Link href="/destinations" className="text-sm font-medium py-2 border-b border-border/50" onClick={() => setIsMenuOpen(false)}>
              Destinations
            </Link>
            <Link href="/contact" className="text-sm font-medium py-2 border-b border-border/50" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            
            <div className="flex items-center gap-2 text-sm font-medium py-2">
              <Phone className="h-4 w-4" />
              <span>+44 7466 779542</span>
            </div>
            
            <Button className="w-full">Book Now</Button>
          </div>
        </div>
      )}
    </header>
  );
}
