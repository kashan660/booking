import { Metadata } from "next";
import { Search, ShieldCheck, Handshake, Globe, CheckCircle2, Users, Target } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Lugvia | Connecting Travelers to Trusted Service Providers",
  description: "Lugvia is not a service provider; we are a global travel connector. We use deep search technology to verify and connect you with the most trusted airport transfer, hotel, and tour providers worldwide.",
  keywords: "Lugvia, travel connector, trusted travel providers, verified airport transfers, safe travel booking, deep search travel, travel aggregator",
  alternates: {
    canonical: "https://lugvia.com/about",
  },
  openGraph: {
    title: "About Lugvia | Your Trusted Travel Connector",
    description: "We verify. You travel. Lugvia connects you with screened and trusted local service providers.",
    type: "website",
    url: "https://lugvia.com/about",
  }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lugvia",
    "url": "https://lugvia.com",
    "logo": "https://lugvia.com/logo.svg",
    "description": "Lugvia connects travelers to trusted, verified service providers for airport transfers, hotels, and tours worldwide.",
    "slogan": "Connecting You to Trusted Service Providers",
    "knowsAbout": ["Airport Transfers", "Hotel Booking", "Travel Safety", "Global Travel Connections"]
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Lugvia Global Travel Connector" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connecting You to <br className="hidden md:block" />
            <span className="text-blue-400">Trusted</span> Travel Providers
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Lugvia is not just another booking site. We are the bridge between you and the world's most reliable local experts. 
            We screen, we verify, and we connect.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Core Identity Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              It's important to understand what Lugvia is—and what we are not. 
              <strong> We are not a transportation company. We do not own hotels. We are not a tour operator.</strong>
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Lugvia is a <strong>Global Travel Connector</strong>. Our mission is to solve the biggest problem in modern travel: 
              <span className="italic"> "Who can I trust in a foreign city?"</span>. 
              We use proprietary deep search technology and human verification to filter through thousands of providers, 
              connecting you only with those who have a proven track record of safety, reliability, and excellence.
            </p>
          </div>
        </div>

        {/* How It Works - The "Deep Search" Methodology */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Lugvia Methodology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our value lies in our rigorous selection process. We do the hard work so you don't have to.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Search className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Deep Search</h3>
              <p className="text-slate-600">
                We don't just scrape the web. We analyze provider history, verify licenses, check local reputations, and aggregate real user data across multiple platforms to identify the true market leaders in every city.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Strict Verification</h3>
              <p className="text-slate-600">
                Being listed on Lugvia is a badge of honor. We verify insurance, vehicle standards, and service quality. Only providers who consistently meet our high standards make the cut.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Handshake className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Seamless Connection</h3>
              <p className="text-slate-600">
                Once vetted, we build a direct digital bridge. When you book through Lugvia, you are connecting directly with a trusted professional, ensuring you get the best local price with global quality assurance.
              </p>
            </div>
          </div>
        </div>

        {/* Our Aim / Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Aim</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Target className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Eliminate Travel Anxiety</h4>
                  <p className="text-slate-600">
                    We aim to remove the uncertainty of arriving in a new country. No scams, no unsafe vehicles, no language barriers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Globe className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Global Standards, Local Charm</h4>
                  <p className="text-slate-600">
                    We aim to bring you the consistency of a global brand while supporting excellent local businesses that deserve your patronage.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Users className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Empower Trusted Providers</h4>
                  <p className="text-slate-600">
                    By connecting quality providers directly with travelers, we help honest local businesses thrive against mediocre competition.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
             <Image 
               src="/images/destinations/london.jpg" 
               alt="Lugvia Connecting World" 
               fill 
               className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
               <p className="text-white font-medium text-lg">
                 "Lugvia bridges the gap between expectation and reality."
               </p>
             </div>
          </div>
        </div>

        {/* SEO Keywords Block (Contextual) */}
        <div className="bg-slate-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Search for "Lugvia"?</h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            When you search for <strong>Lugvia</strong>, you are searching for quality assurance. 
            We are the preferred <strong>airport transfer connector</strong> for travelers going to 
            London, Dubai, Paris, Istanbul, and beyond. We are the trusted source for 
            <strong>verified hotel comparisons</strong> and <strong>safe family travel</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
