"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Phone, X, ChevronDown, User, LogOut, LayoutDashboard, Zap } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { LanguageCurrencySelector } from "@/components/features/LanguageCurrencySelector";

export function Header({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
                <Link href="/flash-deals" className="px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 font-semibold text-red-600 flex items-center gap-2">
                  <Zap className="h-3 w-3" /> Flash Deals
                </Link>
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
          <div className="hidden md:flex items-center gap-2">
            <LanguageCurrencySelector variant="dropdown" showLocation={false} />
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4" />
            <span>+44 7466 779542</span>
          </div>

          {session?.user ? (
            <div className="relative group hidden md:block">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{session.user.name?.split(' ')[0] || 'User'}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white border rounded-lg shadow-lg py-2 flex flex-col">
                  <div className="px-4 py-2 border-b mb-2">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>
                  {session.user.role === "ADMIN" && (
                    <Link href="/admin" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                    </Link>
                  )}
                  <Link href="/profile" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" /> User Dashboard
                  </Link>
                  <Link href="/profile/bookings" className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary flex items-center gap-2">
                    <User className="h-4 w-4" /> My Bookings
                  </Link>
                  <button 
                    onClick={() => signOut()} 
                    className="px-4 py-2 text-sm hover:bg-slate-50 hover:text-red-600 flex items-center gap-2 text-left w-full"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

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
                  <Link href="/flash-deals" className="text-sm py-1 text-red-600 font-semibold flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <Zap className="h-3 w-3" /> Flash Deals
                  </Link>
                </div>
              )}
            </div>

            <Link href="/destinations" className="text-sm font-medium py-2 border-b border-border/50" onClick={() => setIsMenuOpen(false)}>
              Destinations
            </Link>
            <Link href="/contact" className="text-sm font-medium py-2 border-b border-border/50" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>

            {session?.user ? (
              <div className="py-2 border-t border-border/50 mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/profile" className="text-sm font-medium py-2 border-b border-border/50 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link href="/profile/bookings" className="text-sm font-medium py-2 border-b border-border/50 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-4 w-4" /> My Bookings
                  </Link>
                  <button 
                    onClick={() => signOut()} 
                    className="text-sm font-medium py-2 text-red-600 flex items-center gap-2 text-left w-full"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm font-medium py-2 border-b border-border/50">
              <Phone className="h-4 w-4" />
              <span>+44 7466 779542</span>
            </div>
            <div className="py-2">
              <LanguageCurrencySelector variant="card" showLocation={false} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
