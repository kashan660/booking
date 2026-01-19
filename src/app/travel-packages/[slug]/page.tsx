"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Star, CheckCircle, Globe, Shield, Package, Plane, Hotel, ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Package data - in a real app, this would come from a database or API
const packages = {
  "luxury-dubai": {
    title: "Luxury Dubai Package",
    description: "Experience the ultimate luxury in Dubai with 5-star hotels, business class flights, and exclusive experiences",
    duration: "5-7 days",
    price: "From $1,299",
    savings: "Save $500",
    highlights: ["Burj Khalifa VIP", "Desert Safari", "Luxury Hotels", "Private Transfers"],
    image: "/images/dubai-luxury.jpg",
    includes: [
      "Round-trip business class flights",
      "5-star hotel accommodation (4 nights)",
      "Private airport transfers",
      "Burj Khalifa VIP tickets (Level 148)",
      "Desert safari with BBQ dinner",
      "Dubai Marina luxury cruise",
      "Private city tour",
      "Shopping assistance",
      "24/7 concierge service"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Check-in", description: "Private transfer to 5-star hotel, welcome dinner" },
      { day: 2, title: "Burj Khalifa & Dubai Mall", description: "VIP access to world's tallest building, shopping" },
      { day: 3, title: "Desert Safari", description: "Dune bashing, camel rides, BBQ dinner, entertainment" },
      { day: 4, title: "Marina Cruise & City Tour", description: "Luxury yacht cruise, city sightseeing" },
      { day: 5, title: "Departure", description: "Private transfer to airport" }
    ]
  },
  "turkey-cultural": {
    title: "Turkey Cultural Tour",
    description: "Discover the rich culture and history of Turkey with Istanbul, Cappadocia, and Pamukkale",
    duration: "8-10 days",
    price: "From $899",
    savings: "Save $350",
    highlights: ["Hot Air Balloon", "Historical Sites", "Turkish Bath", "Local Cuisine"],
    image: "/images/turkey-cultural.jpg",
    includes: [
      "Round-trip economy flights",
      "Boutique hotel accommodation (7 nights)",
      "All domestic transfers",
      "Hot air balloon ride in Cappadocia",
      "Guided tours of historical sites",
      "Traditional Turkish bath experience",
      "Cooking class",
      "Museum entrances",
      "Local guide services"
    ],
    itinerary: [
      { day: 1, title: "Istanbul Arrival", description: "Check-in, orientation tour" },
      { day: 2, title: "Istanbul Historical Tour", description: "Hagia Sophia, Blue Mosque, Topkapi Palace" },
      { day: 3, title: "Bosphorus Cruise", description: "Strait cruise, Asian side exploration" },
      { day: 4, title: "Cappadocia", description: "Flight to Cappadocia, fairy chimneys tour" },
      { day: 5, title: "Hot Air Balloon & Underground City", description: "Sunrise balloon ride, underground exploration" },
      { day: 6, title: "Pamukkale", description: "Cotton terraces, ancient Hierapolis" },
      { day: 7, title: "Ephesus", description: "Ancient city tour, Temple of Artemis" },
      { day: 8, title: "Turkish Bath & Shopping", description: "Traditional experience, souvenir shopping" },
      { day: 9, title: "Departure", description: "Transfer to airport" }
    ]
  },
  "europe-multi-city": {
    title: "Europe Multi-City Package",
    description: "Visit Paris, Rome, Barcelona, and Amsterdam with city tours and museum passes",
    duration: "10-14 days",
    price: "From $1,599",
    savings: "Save $700",
    highlights: ["Eiffel Tower", "Colosseum", "Sagrada Familia", "Canal Cruise"],
    image: "/images/europe-multi.jpg",
    includes: [
      "Inter-Europe flights and trains",
      "Central hotel accommodation (10 nights)",
      "City-to-city transfers",
      "Eiffel Tower summit tickets",
      "Colosseum skip-the-line access",
      "Sagrada Familia tour",
      "Amsterdam canal cruise",
      "Museum passes",
      "Local metro cards"
    ],
    itinerary: [
      { day: 1, title: "Paris Arrival", description: "Check-in, Seine river cruise" },
      { day: 2, title: "Eiffel Tower & Louvre", description: "Summit access, museum tour" },
      { day: 3, title: "Versailles", description: "Palace of Versailles day trip" },
      { day: 4, title: "Rome", description: "Train to Rome, check-in" },
      { day: 5, title: "Colosseum & Roman Forum", description: "Ancient Rome tour" },
      { day: 6, title: "Vatican City", description: "Sistine Chapel, St. Peter's Basilica" },
      { day: 7, title: "Barcelona", description: "Flight to Barcelona, Gothic Quarter" },
      { day: 8, title: "Sagrada Familia & Park Güell", description: "Gaudi architecture tour" },
      { day: 9, title: "Amsterdam", description: "Flight to Amsterdam, canal district" },
      { day: 10, title: "Canal Cruise & Museums", description: "Van Gogh Museum, canal tour" },
      { day: 11, title: "Free Day", description: "Shopping, local exploration" },
      { day: 12, title: "Departure", description: "Transfer to airport" }
    ]
  },
  "umrah-plus": {
    title: "Umrah Plus Package",
    description: "Makkah & Madina pilgrimage with Istanbul/Dubai stopover. Spiritual + leisure experience",
    duration: "7-10 days",
    price: "From $1,199",
    savings: "Save $400",
    highlights: ["Near Haram Hotels", "Guided Pilgrimage", "Ziyarat Tours", "Shopping Time"],
    image: "/images/umrah-plus.jpg",
    includes: [
      "Round-trip economy flights",
      "Hotels within walking distance of Haram",
      "All ground transfers",
      "Guided Umrah rituals",
      "Ziyarat tours in both cities",
      "Religious scholar guidance",
      "Ihram garments",
      "Prayer mats and guides",
      "24/7 support during pilgrimage"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Jeddah", description: "Transfer to Makkah hotel, preparation" },
      { day: 2, title: "Umrah Rituals", description: "Guided Umrah with scholar" },
      { day: 3, title: "Makkah Ziyarat", description: "Historical sites tour" },
      { day: 4, title: "Travel to Madina", description: "Check-in near Prophet's Mosque" },
      { day: 5, title: "Madina Ziyarat", description: "Prophet's Mosque and historical sites" },
      { day: 6, title: "Shopping & Rest", description: "Local markets, rest day" },
      { day: 7, title: "Optional Stopover", description: "Istanbul or Dubai (if selected)" },
      { day: 8, title: "Return Journey", description: "Departure preparation" },
      { day: 9, title: "Departure", description: "Transfer to airport" }
    ]
  },
  "asian-adventures": {
    title: "Asian Adventures",
    description: "Tokyo, Bangkok, Singapore. Temples, street food, modern cities, cultural shows",
    duration: "8-12 days",
    price: "From $1,099",
    savings: "Save $450",
    highlights: ["Temple Tours", "Street Food", "Cultural Shows", "Modern Cities"],
    image: "/images/asian-adventure.jpg",
    includes: [
      "Round-trip economy flights",
      "Central hotel accommodation (9 nights)",
      "Inter-city transfers",
      "Temple tours with guides",
      "Street food tours",
      "Cultural show tickets",
      "City metro passes",
      "Local SIM cards",
      "Emergency support"
    ],
    itinerary: [
      { day: 1, title: "Tokyo Arrival", description: "Check-in, Shibuya crossing" },
      { day: 2, title: "Tokyo Temples", description: "Senso-ji Temple, traditional districts" },
      { day: 3, title: "Tokyo Modern", description: "Tokyo Tower, Harajuku, technology districts" },
      { day: 4, title: "Bangkok", description: "Flight to Bangkok, Grand Palace" },
      { day: 5, title: "Bangkok Temples", description: "Wat Pho, Wat Arun, floating markets" },
      { day: 6, title: "Bangkok Food Tour", description: "Street food experience, cooking class" },
      { day: 7, title: "Singapore", description: "Flight to Singapore, Marina Bay" },
      { day: 8, title: "Singapore Gardens", description: "Gardens by the Bay, Orchard Road" },
      { day: 9, title: "Cultural Shows", description: "Traditional performances, Chinatown" },
      { day: 10, title: "Shopping & Leisure", description: "Last minute shopping, relaxation" },
      { day: 11, title: "Departure", description: "Transfer to airport" }
    ]
  },
  "honeymoon-specials": {
    title: "Honeymoon Specials",
    description: "Romantic destinations, couple activities, private tours, special amenities",
    duration: "6-10 days",
    price: "From $1,499",
    savings: "Save $600",
    highlights: ["Romantic Dinners", "Couple Spa", "Private Tours", "Special Amenities"],
    image: "/images/honeymoon-special.jpg",
    includes: [
      "Round-trip economy flights",
      "Romantic hotel suites (5 nights)",
      "Private airport transfers",
      "Romantic dinner reservations",
      "Couple spa treatments",
      "Private guided tours",
      "Special room decorations",
      "Champagne welcome",
      "Honeymoon gift basket"
    ],
    itinerary: [
      { day: 1, title: "Romantic Arrival", description: "Champagne welcome, suite decorations" },
      { day: 2, title: "Private City Tour", description: "Personal guide, romantic lunch" },
      { day: 3, title: "Couple Spa Day", description: "Relaxing treatments, couple massage" },
      { day: 4, title: "Romantic Dinner", description: "Beachfront or rooftop dining" },
      { day: 5, title: "Adventure Together", description: "Hot air balloon, snorkeling, or local experience" },
      { day: 6, title: "Shopping & Photos", description: "Local markets, professional photo session" },
      { day: 7, title: "Sunset Experience", description: "Private sunset viewing, romantic evening" },
      { day: 8, title: "Leisure & Memories", description: "Free time, souvenir shopping" },
      { day: 9, title: "Farewell Dinner", description: "Special final evening together" },
      { day: 10, title: "Departure", description: "Private transfer, farewell gifts" }
    ]
  }
};

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let { slug } = resolvedParams;

  // Handle incorrect slug redirection (fix for turkey-cultural-cultural-tours)
  if (slug === 'turkey-cultural-cultural-tours') {
    slug = 'turkey-cultural';
  }

  const pkg = packages[slug as keyof typeof packages];
  
  if (!pkg) {
    notFound();
  }

  return (
    <>
      {/* Custom CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 2000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
      `}</style>
    <div className="pb-20">
      {/* Hero Section with Premium Animation */}
      <div className="relative h-[500px] bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-float">
                <Plane className="h-6 w-6" />
              </div>
              <span className="text-white/80 text-sm font-medium tracking-wider uppercase animate-float" style={{animationDelay: '0.5s'}}>Premium Travel Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {pkg.title}
              <span className="block text-3xl md:text-4xl font-light text-purple-200 mt-2 animate-float" style={{animationDelay: '1s'}}>{pkg.duration}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {pkg.description}
            </p>
            
            <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 animate-float" style={{animationDelay: '1.5s'}}>
                <Calendar className="h-5 w-5 text-yellow-300" />
                <span className="font-medium">{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 animate-float" style={{animationDelay: '1.7s'}}>
                <Users className="h-5 w-5 text-blue-300" />
                <span className="font-medium">Up to 4 people</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 animate-float" style={{animationDelay: '1.9s'}}>
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="font-medium">4.9/5 (248 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Highlights with Premium Cards */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Exclusive Package Highlights
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 animate-float">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Itinerary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Your Journey Timeline
                </h2>
              </div>
              <div className="space-y-6">
                {pkg.itinerary.map((day, index) => (
                  <div key={index} className="flex gap-6 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:shadow-xl transition-all duration-300 group animate-fade-in-up" style={{animationDelay: `${index * 0.15}s`}}>
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="font-bold text-white text-xl">{day.day}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">{day.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{day.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-purple-600 font-medium">
                        <MapPin className="h-4 w-4" />
                        <span>Location details available</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Includes */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Everything Included
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Sidebar */}
          <div className="space-y-8">
            {/* Premium Price Card */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sticky top-6 transform hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    {pkg.price}
                  </div>
                  <div className="text-sm text-gray-500">per person</div>
                  <div className="absolute -top-2 -right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {pkg.savings}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Plane className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Flights included</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Hotel className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Hotel accommodation</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <ArrowRightLeft className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Airport transfers</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Tours & activities</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <Link href={`/contact?subject=Booking Inquiry: ${pkg.title}`} className="w-full block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group" size="lg">
                    <span className="absolute inset-0 bg-white/20 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="text-lg relative z-10">Book Now</span>
                  </Button>
                </Link>
                <Link href={`/contact?subject=Customize Inquiry: ${pkg.title}`} className="w-full block">
                  <Button variant="outline" className="w-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400 font-semibold py-4 rounded-xl transition-all duration-300 relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Customize Package</span>
                  </Button>
                </Link>
                <Link href={`/contact?subject=Quote Inquiry: ${pkg.title}`} className="w-full block">
                  <Button variant="ghost" className="w-full text-gray-600 hover:text-purple-700 hover:bg-purple-50 font-semibold py-4 rounded-xl transition-all duration-300">
                    Get Quote
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-700">Secure booking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">24/7 support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Trust Badges */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Why Book With Us?
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 animate-float" style={{animationDelay: '0.3s'}}>
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Best price guarantee</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Flexible cancellation</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 animate-float" style={{animationDelay: '0.5s'}}>
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Trusted by 50,000+ travelers</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 animate-float" style={{animationDelay: '0.7s'}}>
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">ATOL protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}