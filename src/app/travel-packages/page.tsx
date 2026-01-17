"use client";

import { Package, Calendar, Users, MapPin, Star, CheckCircle, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useLanguageCurrency } from "@/contexts/LanguageCurrencyContext";

// Structured data for SEO
const travelPackageSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Lugvia Travel Packages",
  "description": "Complete travel packages with flights, hotels, transfers and tours. Save up to 40% on all-inclusive vacation deals worldwide.",
  "url": "https://lugvia.com/travel-packages",
  "telephone": "+1-800-LUGVIA",
  "email": "support@lugvia.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Travel Street",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10001",
    "addressCountry": "US"
  },
  "serviceType": [
    "Complete Travel Packages",
    "All-Inclusive Vacations",
    "Flight Hotel Packages",
    "Tours & Activities",
    "Airport Transfers"
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Luxury Dubai Package",
      "description": "5-star hotels, business class flights, desert safaris, Burj Khalifa tickets",
      "priceRange": "$1299+",
      "availability": "InStock",
      "validFrom": "2024-01-01",
      "validThrough": "2024-12-31"
    },
    {
      "@type": "Offer",
      "name": "Turkey Cultural Tour",
      "description": "Istanbul, Cappadocia, Pamukkale with historical sites and hot air balloons",
      "priceRange": "$899+",
      "availability": "InStock",
      "validFrom": "2024-01-01",
      "validThrough": "2024-12-31"
    },
    {
      "@type": "Offer",
      "name": "Europe Multi-City Package",
      "description": "Paris, Rome, Barcelona, Amsterdam with city tours and museums",
      "priceRange": "$1599+",
      "availability": "InStock",
      "validFrom": "2024-01-01",
      "validThrough": "2024-12-31"
    }
  ]
};

export default function TravelPackagesPage() {
  const { convertAndFormatPrice, currentCurrency, currencyCode } = useLanguageCurrency();

  // Convert prices to user's currency
  const basePrices = {
    dubai: 1299,
    turkey: 899,
    europe: 1599,
    umrah: 1199,
    asian: 1099,
    honeymoon: 1499
  };

  // Generate dynamic schema data
  const dynamicSchema = {
    ...travelPackageSchema,
    offers: [
      {
        "@type": "Offer",
        "name": "Luxury Dubai Package",
        "description": "5-star hotels, business class flights, desert safaris, Burj Khalifa tickets",
        "priceRange": convertAndFormatPrice(basePrices.dubai) + "+",
        "availability": "InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31"
      },
      {
        "@type": "Offer",
        "name": "Turkey Cultural Tour",
        "description": "Istanbul, Cappadocia, Pamukkale with historical sites and hot air balloons",
        "priceRange": convertAndFormatPrice(basePrices.turkey) + "+",
        "availability": "InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31"
      },
      {
        "@type": "Offer",
        "name": "Europe Multi-City Package",
        "description": "Paris, Rome, Barcelona, Amsterdam with city tours and museums",
        "priceRange": convertAndFormatPrice(basePrices.europe) + "+",
        "availability": "InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31"
      }
    ]
  };

  const packageData = [
    {
      title: "Luxury Dubai Packages",
      description: "5-star hotels, business class flights, desert safaris, Burj Khalifa tickets, private transfers.",
      duration: "5-7 days",
      price: convertAndFormatPrice(basePrices.dubai),
      savings: `Save ${convertAndFormatPrice(500)}`,
      highlights: ["Burj Khalifa VIP", "Desert Safari", "Luxury Hotels", "Private Transfers"],
      image: "/images/dubai-luxury.jpg",
      slug: "luxury-dubai"
    },
    {
      title: "Turkey Cultural Tours",
      description: "Istanbul, Cappadocia, Pamukkale. Historical sites, hot air balloons, Turkish cuisine.",
      duration: "8-10 days", 
      price: convertAndFormatPrice(basePrices.turkey),
      savings: `Save ${convertAndFormatPrice(350)}`,
      highlights: ["Hot Air Balloon", "Historical Sites", "Turkish Bath", "Local Cuisine"],
      image: "/images/turkey-cultural.jpg",
      slug: "turkey-cultural"
    },
    {
      title: "Europe Multi-City",
      description: "Paris, Rome, Barcelona, Amsterdam. City tours, museums, local experiences.",
      duration: "10-14 days",
      price: convertAndFormatPrice(basePrices.europe),
      savings: `Save ${convertAndFormatPrice(700)}`,
      highlights: ["Eiffel Tower", "Colosseum", "Sagrada Familia", "Canal Cruise"],
      image: "/images/europe-multi.jpg",
      slug: "europe-multi-city"
    },
    {
      title: "Umrah Plus Packages",
      description: "Makkah & Madina pilgrimage with Istanbul/Dubai stopover. Spiritual + leisure.",
      duration: "7-10 days",
      price: convertAndFormatPrice(basePrices.umrah),
      savings: `Save ${convertAndFormatPrice(400)}`,
      highlights: ["Near Haram Hotels", "Guided Pilgrimage", "Ziyarat Tours", "Shopping Time"],
      image: "/images/umrah-plus.jpg",
      slug: "umrah-plus"
    },
    {
      title: "Asian Adventures",
      description: "Tokyo, Bangkok, Singapore. Temples, street food, modern cities, cultural shows.",
      duration: "8-12 days",
      price: convertAndFormatPrice(basePrices.asian),
      savings: `Save ${convertAndFormatPrice(450)}`,
      highlights: ["Temple Tours", "Street Food", "Cultural Shows", "Modern Cities"],
      image: "/images/asian-adventure.jpg",
      slug: "asian-adventures"
    },
    {
      title: "Honeymoon Specials",
      description: "Romantic destinations, couple activities, private tours, special amenities.",
      duration: "6-10 days",
      price: convertAndFormatPrice(basePrices.honeymoon),
      savings: `Save ${convertAndFormatPrice(600)}`,
      highlights: ["Romantic Dinners", "Couple Spa", "Private Tours", "Special Amenities"],
      image: "/images/honeymoon-special.jpg",
      slug: "honeymoon-specials"
    }
  ];

  return (
    <div className="pb-20">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dynamicSchema)
        }}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Complete Travel Packages
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Everything in one booking: Flights ✈️ + Hotels 🏨 + Transfers 🚗 + Tours 🎯 
            Save up to 40% with our all-inclusive travel packages. Customizable worldwide travel deals with 24/7 support.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              Prices shown in {currentCurrency} ({currencyCode})
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
              View All Packages
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Build Custom Package
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Why Choose Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">All-In-One</h3>
            <p className="text-muted-foreground">Flights, hotels, transfers & tours in single booking</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Save 40%</h3>
            <p className="text-muted-foreground">Bundle pricing saves more than individual bookings</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flexible Dates</h3>
            <p className="text-muted-foreground">Customize travel dates and duration</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-muted-foreground">Round-the-clock assistance during your trip</p>
          </div>
        </div>

        {/* Popular Package Categories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Package Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packageData.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-48 bg-slate-200">
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                    {pkg.savings}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-lg font-bold">{pkg.title}</h3>
                    <p className="text-sm">{pkg.duration}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Package Includes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((highlight, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground">per person</span>
                  </div>
                  
                  <Link href={`/travel-packages/${pkg.slug}`} className="w-full mb-2">
                    <Button className="w-full">View Details</Button>
                  </Link>
                  <Button variant="outline" className="w-full">Customize</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Dream Trip?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Save hundreds of dollars with our all-inclusive packages. 
            Customizable itineraries, 24/7 support, and best price guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
              Browse All Packages
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Complete Travel Packages - Everything in One Booking</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Planning a perfect vacation can be overwhelming with multiple bookings, different providers, and 
              coordinating schedules. Our complete travel packages eliminate the stress by bundling flights, hotels, 
              transfers, and tours into one seamless booking experience. Save up to 40% compared to individual bookings 
              while enjoying the convenience of having everything arranged for you.
            </p>
            
            <h3 className="text-xl font-bold mb-4">What's Included in Our Travel Packages?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-2">✈️ Flight Arrangements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Best price comparison across 1000+ airlines</li>
                  <li>• Flexible dates and times</li>
                  <li>• Seat selection and meal preferences</li>
                  <li>• 24-hour cancellation policy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏨 Hotel Accommodations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 2M+ properties worldwide</li>
                  <li>• Budget to luxury options</li>
                  <li>• Best location guarantees</li>
                  <li>• Free cancellation on most bookings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🚗 Airport Transfers</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Professional chauffeur service</li>
                  <li>• Flight monitoring included</li>
                  <li>• Meet & greet service</li>
                  <li>• Fixed pricing, no surprises</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Tours & Activities</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Skip-the-line attraction tickets</li>
                  <li>• Professional local guides</li>
                  <li>• Cultural experiences</li>
                  <li>• Adventure activities</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Popular Destinations for Complete Packages</h3>
            <p className="text-muted-foreground mb-6">
              Our most popular package destinations include Dubai for luxury experiences, Turkey for cultural 
              immersion, Europe for multi-city adventures, and Saudi Arabia for spiritual journeys. Each 
              destination offers unique experiences tailored to different travel preferences and budgets.
            </p>

            <h3 className="text-xl font-bold mb-4">Why Book Complete Travel Packages?</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>✅ <strong>Cost Savings:</strong> Bundle pricing saves 20-40% compared to individual bookings</li>
              <li>✅ <strong>Convenience:</strong> One booking covers your entire trip</li>
              <li>✅ <strong>Time Saving:</strong> No need to research multiple providers</li>
              <li>✅ <strong>Support:</strong> Single point of contact for all services</li>
              <li>✅ <strong>Flexibility:</strong> Customize dates, hotels, and activities</li>
              <li>✅ <strong>Peace of Mind:</strong> Everything coordinated and guaranteed</li>
            </ul>

            <h3 className="text-xl font-bold mb-4">How to Book Your Perfect Package</h3>
            <p className="text-muted-foreground">
              Browse our curated packages or contact our travel experts to create a custom itinerary. 
              We offer flexible payment options, instant confirmation, and 24/7 support throughout your journey. 
              Book your complete travel package today and experience stress-free vacation planning with 
              guaranteed savings and exceptional service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}