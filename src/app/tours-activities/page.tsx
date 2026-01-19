
import { Metadata } from "next";
import { Map, Clock, Users, Star, CheckCircle, Globe, Shield, Ticket, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ViatorWidget } from "@/components/features/ViatorWidget";

export const metadata: Metadata = {
  title: "Top Rated Tours & Activities | Guided Excursions Worldwide | Lugvia",
  description: "Book best-selling tours, day trips, and activities worldwide. Skip-the-line tickets for Colosseum, Eiffel Tower, Burj Khalifa & more. Expert local guides and instant confirmation.",
  keywords: "tours, activities, excursions, day trips, guided tours, skip the line tickets, travel experiences, city tours, museum tickets, desert safari",
  openGraph: {
    title: "Top Rated Tours & Activities | Guided Excursions Worldwide",
    description: "Discover the world with our curated experiences. From city tours to desert safaris, create memories that last a lifetime.",
    type: "website",
    url: "https://lugvia.com/tours-activities",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2572&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Tours and Activities",
      },
    ],
  },
};

// Structured Data
const tourSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Lugvia Tours & Activities",
  "description": "Book guided tours, day trips, and tickets for top attractions worldwide.",
  "url": "https://lugvia.com/tours-activities",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lugvia.com/tours-activities?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const popularTours = [
  {
    id: 1,
    title: "Dubai: Premium Red Dunes Desert Safari, BBQ, Camel Ride",
    location: "Dubai, UAE",
    duration: "6-7 Hours",
    rating: "4.9",
    reviews: "15k+",
    price: "$45",
    image: "/images/tours/dubai-desert.jpg",
    externalImage: "https://images.unsplash.com/photo-1451337516015-6b6fcd1c9063?auto=format&fit=crop&q=80",
    category: "Adventure",
    features: ["Dune Bashing", "BBQ Dinner", "Hotel Pickup"]
  },
  {
    id: 2,
    title: "Paris: Eiffel Tower Summit Priority Access with Host",
    location: "Paris, France",
    duration: "2-3 Hours",
    rating: "4.8",
    reviews: "8k+",
    price: "€65",
    image: "/images/tours/paris-eiffel.jpg",
    externalImage: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80",
    category: "Landmarks",
    features: ["Skip-the-line", "Summit Access", "Guide"]
  },
  {
    id: 3,
    title: "Istanbul: Bosphorus Dinner Cruise with Turkish Night Show",
    location: "Istanbul, Turkey",
    duration: "4 Hours",
    rating: "4.7",
    reviews: "5k+",
    price: "€35",
    image: "/images/tours/istanbul-cruise.jpg",
    externalImage: "https://images.unsplash.com/photo-1622587853578-dd1bf9608d26?auto=format&fit=crop&q=80",
    category: "Cultural",
    features: ["Dinner Included", "Live Show", "Unlimited Drinks"]
  },
  {
    id: 4,
    title: "Rome: Colosseum, Roman Forum & Palatine Hill Tour",
    location: "Rome, Italy",
    duration: "3 Hours",
    rating: "4.9",
    reviews: "22k+",
    price: "€55",
    image: "/images/tours/rome-colosseum.jpg",
    externalImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80",
    category: "History",
    features: ["Priority Access", "Headsets", "Expert Guide"]
  },
  {
    id: 5,
    title: "London: Harry Potter Warner Bros. Studio Tour",
    location: "London, UK",
    duration: "7 Hours",
    rating: "4.9",
    reviews: "12k+",
    price: "£95",
    image: "/images/tours/london-harry-potter.jpg",
    externalImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&q=80",
    category: "Entertainment",
    features: ["Round-trip Transport", "Studio Entry", "Digital Guide"]
  },
  {
    id: 6,
    title: "Cappadocia: Hot Air Balloon Flight at Sunrise",
    location: "Cappadocia, Turkey",
    duration: "1 Hour",
    rating: "5.0",
    reviews: "3k+",
    price: "€180",
    image: "/images/tours/cappadocia-balloon.jpg",
    externalImage: "https://images.unsplash.com/photo-1678729358249-1158a4325776?auto=format&fit=crop&q=80",
    category: "Bucket List",
    features: ["Champagne Toast", "Flight Certificate", "Hotel Pickup"]
  }
];

const features = [
  {
    icon: <Ticket className="h-8 w-8 text-blue-500" />,
    title: "Skip-the-Line Access",
    description: "Don't waste time waiting. Get priority access to the world's most famous attractions."
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Free Cancellation",
    description: "Plans change. Cancel up to 24 hours in advance for a full refund on most experiences."
  },
  {
    icon: <Users className="h-8 w-8 text-purple-500" />,
    title: "Expert Local Guides",
    description: "Discover hidden gems and stories you wouldn't find alone with our passionate guides."
  },
  {
    icon: <Globe className="h-8 w-8 text-orange-500" />,
    title: "Millions of Reviews",
    description: "Book with confidence reading verified reviews from fellow travelers worldwide."
  }
];

export default function ToursActivitiesPage() {
  return (
    <div className="pb-20 bg-slate-50">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tourSchema)
        }}
      />

      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80"
              alt="Background"
              fill
              className="object-cover"
              priority
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 z-10" />
        
        <div className="container mx-auto px-4 text-center relative z-20">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
            Explore 300,000+ Experiences
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Unforgettable Tours & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Activities Worldwide
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the world with our curated experiences. 
            From skip-the-line tickets to private guided tours, create memories that last a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
              Find Tours Near Me
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto">
              View Popular Destinations
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-30 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-2">
           <ViatorWidget />
        </div>
      </div>

      <div className="container mx-auto px-4 mb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Trending Experiences</h2>
            <p className="text-slate-600">Top rated tours loved by travelers this week</p>
          </div>
          <Link href="/search" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
            View All <div className="w-4 h-4">→</div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-56 bg-slate-200 overflow-hidden">
                 <Image 
                    src={tour.externalImage}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    {tour.rating} ({tour.reviews})
                 </div>
                 <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {tour.category}
                 </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><Map className="h-3 w-3" /> {tour.location}</span>
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><Clock className="h-3 w-3" /> {tour.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {tour.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.features.map((feature, i) => (
                    <span key={i} className="text-xs text-slate-500 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" /> {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-muted-foreground block">From</span>
                    <span className="text-xl font-bold text-blue-600">{tour.price}</span>
                  </div>
                  <Link href={`/contact?subject=Booking Inquiry: ${tour.title}`}>
                    <Button variant="default" size="sm" className="bg-slate-900 hover:bg-slate-800">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Props */}
      <div className="bg-white py-20 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Book Tours with Lugvia?</h2>
            <p className="text-slate-600 text-lg">
              We partner with the world's leading operators to bring you the best experiences at the best prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="bg-white w-16 h-16 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Discover the Best Things to Do Everywhere You Go</h2>
          <p>
            Whether you're planning a city break in Paris, a desert adventure in Dubai, or a spiritual journey to Makkah, 
            Lugvia connects you with the best things to do. Our curated selection of tours and activities ensures that 
            every moment of your trip is memorable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5" /> City Sightseeing
              </h3>
              <p className="text-blue-800/80">
                Explore the world's most famous cities with expert local guides. From Hop-on Hop-off buses to 
                intimate walking tours, see the sights your way.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Ticket className="h-5 w-5" /> Attraction Tickets
              </h3>
              <p className="text-purple-800/80">
                Secure your spot at must-visit landmarks. Book skip-the-line tickets for the Louvre, 
                Vatican Museums, Burj Khalifa, and more to save time.
              </p>
            </div>
          </div>

          <h3>Popular Tour Categories</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            <li><strong>Guided Walking Tours:</strong> Immerse yourself in local history and culture.</li>
            <li><strong>Day Trips & Excursions:</strong> Explore beyond the city limits.</li>
            <li><strong>Food & Wine Tours:</strong> Taste the authentic flavors of your destination.</li>
            <li><strong>Adventure Activities:</strong> Add some thrill with hiking, biking, or water sports.</li>
            <li><strong>Cruises & Boat Tours:</strong> See the skyline from a different perspective.</li>
            <li><strong>Private Tours:</strong> Customized experiences just for you and your group.</li>
          </ul>

          <p className="mt-8 text-sm text-slate-500 italic">
            *Prices and availability subject to change. Book early to secure the best rates and slots for popular attractions.
          </p>
        </div>
      </div>
    </div>
  );
}
