import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="mb-6 flex items-center gap-2">
              <Image src="/icon-white.svg" alt="Lugvia" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold text-white">Lugvia.com</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              Your trusted partner for airport transfers and chauffeur services. 
              Comfortable, reliable, and affordable rides worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/airport-transfers" className="hover:text-white transition-colors">Airport Transfers</Link>
              </li>
              <li>
                <Link href="/city-to-city" className="hover:text-white transition-colors">City to City</Link>
              </li>
              <li>
                <Link href="/hourly-booking" className="hover:text-white transition-colors">Hourly Booking</Link>
              </li>
              <li>
                <Link href="/chauffeur-service" className="hover:text-white transition-colors">Chauffeur Service</Link>
              </li>
              <li>
                <Link href="/hotel-booking" className="hover:text-white transition-colors">Hotel Booking</Link>
              </li>
              <li>
                <Link href="/flights-booking" className="hover:text-white transition-colors">Flights Booking</Link>
              </li>
              <li>
                <Link href="/tours-activities" className="hover:text-white transition-colors">Tours & Activities</Link>
              </li>
              <li>
                <Link href="/flash-deals" className="hover:text-red-400 transition-colors font-semibold">Flash Deals</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <span>123 Business Street, Tech City, TC 90210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+44 7466 779542</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@lugvia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Top Hotel Destinations</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                 <li><Link href="/best-hotels-paris" className="hover:text-white transition-colors">Paris Hotels</Link></li>
                 <li><Link href="/best-hotels-istanbul" className="hover:text-white transition-colors">Istanbul Hotels</Link></li>
                 <li><Link href="/best-hotels-dubai" className="hover:text-white transition-colors">Dubai Hotels</Link></li>
                 <li><Link href="/best-hotels-antalya" className="hover:text-white transition-colors">Antalya Hotels</Link></li>
                 <li><Link href="/best-hotels-makkah" className="hover:text-white transition-colors">Makkah Hotels</Link></li>
                 <li><Link href="/best-hotels-madina" className="hover:text-white transition-colors">Madina Hotels</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Popular Transfers</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                 <li><Link href="/airport-taxi-paris" className="hover:text-white transition-colors">Paris Airport Taxi</Link></li>
                 <li><Link href="/airport-taxi-istanbul" className="hover:text-white transition-colors">Istanbul Airport Taxi</Link></li>
                 <li><Link href="/airport-taxi-dubai" className="hover:text-white transition-colors">Dubai Airport Taxi</Link></li>
                 <li><Link href="/airport-taxi-antalya" className="hover:text-white transition-colors">Antalya Airport Taxi</Link></li>
                 <li><Link href="/jeddah-to-makkah-taxi" className="hover:text-white transition-colors">Jeddah to Makkah</Link></li>
                 <li><Link href="/city-transfers-makkah-madina" className="hover:text-white transition-colors">Makkah to Madina</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Lugvia.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
