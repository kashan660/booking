import { MapPin, Users, Clock, Award, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Structured data for SEO
const tourGuideSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Lugvia Tour Guide Services",
  "description": "Professional tour guide services worldwide with certified local experts in 150+ cities",
  "url": "https://lugvia.com/tour-guide-services",
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
    "Private Tour Guide",
    "Group Tours",
    "Cultural Tours",
    "City Tours",
    "Historical Tours",
    "Food Tours"
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Dubai"
    },
    {
      "@type": "City", 
      "name": "Istanbul"
    },
    {
      "@type": "City",
      "name": "Paris"
    },
    {
      "@type": "City",
      "name": "London"
    },
    {
      "@type": "City",
      "name": "Tokyo"
    }
  ],
  "offers": {
    "@type": "Offer",
    "name": "Professional Tour Guide Services",
    "description": "Expert local guides in 150+ cities worldwide",
    "priceRange": "$50-$200",
    "availability": "InStock",
    "validFrom": "2024-01-01",
    "validThrough": "2024-12-31"
  }
};

export const metadata = {
  title: "Professional Tour Guide Services Worldwide | Lugvia",
  description: "Expert local tour guides in 150+ cities. Private tours, group excursions, cultural experiences. Book certified guides for authentic travel experiences.",
  keywords: "tour guide services, private tour guides, local guides, city tours, cultural tours, professional guides, worldwide tours",
  openGraph: {
    title: "Professional Tour Guide Services Worldwide",
    description: "Discover destinations with expert local guides. Private tours, cultural experiences, and authentic local insights.",
    images: ["/images/tour-guides-og.jpg"],
  }
};

export default function TourGuideServicesPage() {
  return (
    <div className="pb-20">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tourGuideSchema)
        }}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Expert Tour Guides Worldwide
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover destinations through the eyes of local experts. Our certified tour guides provide 
            authentic experiences, cultural insights, and unforgettable memories in 150+ cities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              Find Your Guide
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Become a Guide
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">150+ Cities</h3>
            <p className="text-muted-foreground">Global network of professional guides</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Certified Guides</h3>
            <p className="text-muted-foreground">Licensed experts with local knowledge</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flexible Timing</h3>
            <p className="text-muted-foreground">Customizable tour schedules</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Private & Group</h3>
            <p className="text-muted-foreground">Personalized experiences for any size</p>
          </div>
        </div>

        {/* Tour Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Tour Types We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "City Walking Tours",
                description: "Explore historic centers, hidden gems, and local neighborhoods with expert commentary.",
                duration: "2-4 hours",
                group: "1-15 people",
                icon: MapPin
              },
              {
                title: "Cultural Experiences",
                description: "Immerse in local traditions, cuisine, art, and authentic cultural activities.",
                duration: "3-6 hours",
                group: "1-10 people",
                icon: Users
              },
              {
                title: "Historical Tours",
                description: "Discover ancient sites, museums, and historical landmarks with expert historians.",
                duration: "4-8 hours",
                group: "1-20 people",
                icon: Calendar
              },
              {
                title: "Food & Wine Tours",
                description: "Taste local specialties, visit markets, and learn about regional cuisine.",
                duration: "3-5 hours",
                group: "1-12 people",
                icon: Clock
              },
              {
                title: "Adventure Tours",
                description: "Outdoor activities, hiking, cycling, and nature exploration with safety experts.",
                duration: "Full day",
                group: "1-8 people",
                icon: MapPin
              },
              {
                title: "Night Tours",
                description: "Experience cities after dark with illuminated landmarks and nightlife scenes.",
                duration: "2-3 hours",
                group: "1-15 people",
                icon: Users
              }
            ].map((tour, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <tour.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold">{tour.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{tour.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>⏱ {tour.duration}</span>
                  <span>👥 {tour.group}</span>
                </div>
                <Button className="w-full" variant="outline">Learn More</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Tour Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: "Paris", country: "France", tours: 45, image: "/images/paris-tour.jpg" },
              { city: "Rome", country: "Italy", tours: 38, image: "/images/rome-tour.jpg" },
              { city: "London", country: "UK", tours: 52, image: "/images/london-tour.jpg" },
              { city: "Tokyo", country: "Japan", tours: 29, image: "/images/tokyo-tour.jpg" },
              { city: "Barcelona", country: "Spain", tours: 33, image: "/images/barcelona-tour.jpg" },
              { city: "Dubai", country: "UAE", tours: 41, image: "/images/dubai-tour.jpg" },
              { city: "New York", country: "USA", tours: 48, image: "/images/ny-tour.jpg" },
              { city: "Istanbul", country: "Turkey", tours: 35, image: "/images/istanbul-tour.jpg" }
            ].map((destination, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                    <h3 className="text-lg font-bold">{destination.city}</h3>
                    <p className="text-sm opacity-90">{destination.country}</p>
                    <p className="text-xs mt-1">{destination.tours} tours available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your perfect tour guide today and discover destinations like never before. 
            Professional, knowledgeable, and passionate about sharing their city with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Browse Available Guides
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Why Choose Professional Tour Guide Services?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Professional tour guide services transform your travel experience from ordinary to extraordinary. 
              Our certified local guides provide insider knowledge, cultural context, and access to hidden gems that 
              independent travelers often miss. With expertise in history, culture, and local customs, they create 
              meaningful connections between visitors and destinations.
            </p>
            
            <h3 className="text-xl font-bold mb-4">Benefits of Hiring Local Tour Guides</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>✅ Expert local knowledge and historical context</li>
              <li>✅ Skip-the-line access to popular attractions</li>
              <li>✅ Cultural insights and etiquette guidance</li>
              <li>✅ Language assistance and translation support</li>
              <li>✅ Safety and security in unfamiliar areas</li>
              <li>✅ Customized itineraries based on your interests</li>
              <li>✅ Hidden gems and off-the-beaten-path experiences</li>
            </ul>

            <h3 className="text-xl font-bold mb-4">Our Tour Guide Network</h3>
            <p className="text-muted-foreground mb-6">
              Lugvia partners with licensed tour guides in over 150 cities worldwide. Each guide undergoes rigorous 
              vetting, including license verification, background checks, and customer feedback evaluation. Our network 
              includes specialists in art history, architecture, food culture, religious studies, and adventure tourism.
            </p>

            <h3 className="text-xl font-bold mb-4">Booking Your Perfect Tour Experience</h3>
            <p className="text-muted-foreground">
              Whether you're seeking a private walking tour of historic Rome, a culinary adventure in Tokyo, 
              or an architectural exploration of Barcelona, our tour guide services connect you with the perfect 
              local expert. Book online in minutes and receive instant confirmation with meeting details and 
              guide contact information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}