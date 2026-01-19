import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Star, MapPin, Phone, ArrowRight, ChevronRight, Home } from "lucide-react";

export interface SEOPageProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  items: {
    title: string;
    description: string;
    image: string;
    rating?: number;
    location?: string;
    price?: string;
    features: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    title: string;
    href: string;
  }[];
  city: string;
  type: "hotel" | "transfer";
  keywords?: string[];
}

export function SEOPageTemplate({
  title,
  subtitle,
  description,
  heroImage,
  items,
  faqs,
  relatedLinks,
  city,
  type,
}: SEOPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-slate-900 text-slate-300 py-3 border-b border-white/10 relative z-20">
        <div className="container mx-auto px-4 flex items-center text-sm">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="h-3 w-3" /> Home
          </Link>
          <ChevronRight className="h-3 w-3 mx-2 text-slate-500" />
          <Link href={type === 'hotel' ? '/hotel-booking' : '/airport-transfers'} className="hover:text-white transition-colors">
            {type === 'hotel' ? 'Hotels' : 'Transfers'}
          </Link>
          <ChevronRight className="h-3 w-3 mx-2 text-slate-500" />
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
            className="object-cover transform scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center z-10 pt-20">
          <div className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium tracking-wide uppercase">
            Premium Experience
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light text-slate-100 drop-shadow-lg leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300 transform hover:-translate-y-1" asChild>
              <Link href={type === 'hotel' ? '/hotel-booking' : '/#booking-widget'}>
                Book Now
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                     <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
              <span className="ml-2">1k+ Happy Travelers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 tracking-tight">
            Why Choose {city} for Your Next {type === "hotel" ? "Stay" : "Trip"}?
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-light">
            {description}
          </p>
        </div>
      </section>

      {/* Main Content List */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Top {items.length} {type === "hotel" ? "Best Hotels" : "Transfer Options"} in {city}
            </h2>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full">All Options</Button>
              <Button variant="outline" size="sm" className="rounded-full">Best Rated</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden transform hover:-translate-y-1">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {index === 0 && (
                     <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Top Choice
                     </div>
                  )}
                  
                  {item.price && (
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {item.price}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    {item.rating && (
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md border border-amber-100 flex-shrink-0 ml-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="ml-1 text-slate-700 font-bold text-sm">{item.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {item.location && (
                    <div className="flex items-center text-slate-500 mb-4 text-sm">
                      <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-primary/60" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}

                  <p className="text-slate-600 mb-6 line-clamp-2 text-sm flex-grow leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {item.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-slate-600">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                           <Check className="w-3 h-3 text-green-600" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-auto rounded-xl py-6 font-semibold shadow-md group-hover:shadow-lg transition-all" asChild>
                    <Link href={type === 'hotel' ? '/hotel-booking' : '/#booking-widget'}>
                      {type === 'hotel' ? 'View Rates' : 'Book This Ride'} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-slate-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-6 border border-slate-100 hover:border-primary/20 transition-colors">
                <h3 className="text-lg font-semibold mb-3 text-slate-900">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your {type === "hotel" ? "Stay" : "Ride"}?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the best of {city} with our premium {type === "hotel" ? "hotel recommendations" : "transfer services"}. 
            Best price guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary font-bold px-8" asChild>
              <Link href={type === 'hotel' ? '/hotel-booking' : '/#booking-widget'}>
                Book Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8">
              <Phone className="w-4 h-4 mr-2" /> Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <section className="py-12 bg-slate-50 border-t">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Explore More in {city}</h3>
            <div className="flex flex-wrap gap-4">
              {relatedLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href}
                  className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
