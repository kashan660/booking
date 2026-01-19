import Image from "next/image";
import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";

const destinations = [
  { name: "Dubai", image: "/images/destinations/dubai.jpg", country: "UAE", href: "/best-hotels-dubai" },
  { name: "London", image: "/images/destinations/london.jpg", country: "UK", href: "/airport-taxi-london" },
  { name: "Makkah", image: "/images/destinations/makkah.jpg", country: "Saudi Arabia", href: "/jeddah-to-makkah-taxi" },
  { name: "Istanbul", image: "/images/destinations/istanbul.jpg", country: "Turkey", href: "/best-hotels-istanbul" },
  { name: "Antalya", image: "/images/destinations/antalya.jpg", country: "Turkey", href: "/best-hotels-antalya" },
  { name: "Paris", image: "/images/destinations/paris.jpg", country: "France", href: "/best-hotels-paris" },
  { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop", country: "USA", href: "/airport-taxi-newyork" },
  { name: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop", country: "Japan", href: "/airport-taxi-tokyo" },
  { name: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop", country: "Singapore", href: "/airport-taxi-singapore" },
];

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Popular Destinations</h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
        Explore our global network of destinations. We provide reliable transfers in over 500 cities worldwide.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((city) => (
          <Link key={city.name} href={city.href} className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer block">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
            <Image 
              src={city.image} 
              alt={city.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">{city.country}</p>
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                </div>
                <span className="text-white/90 text-sm flex items-center gap-1 group-hover:underline">
                  Book <ArrowRightLeft className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
