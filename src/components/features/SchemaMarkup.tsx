export function SchemaMarkup() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": "https://lugvia.com/#organization",
      name: "Lugvia",
      legalName: "Lugvia Travel Ltd",
      url: "https://lugvia.com",
      logo: {
        "@type": "ImageObject",
        "url": "https://lugvia.com/logo.svg",
        "width": 512,
        "height": 512
      },
      image: [
        "https://lugvia.com/images/hero/dubai.jpg",
        "https://lugvia.com/images/hero/london.jpg",
        "https://lugvia.com/images/hero/paris.jpg"
      ],
      description:
        "Lugvia is a premium travel agency specializing in luxury airport transfers, private chauffeur services, and exclusive hotel bookings worldwide. We operate in over 150 countries including Dubai, London, Paris, Istanbul, and Makkah.",
      areaServed: [
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Turkey" },
        { "@type": "Country", "name": "France" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Place", "name": "Worldwide" }
      ],
      sameAs: [
        "https://facebook.com/lugvia",
        "https://instagram.com/lugvia",
        "https://twitter.com/lugvia",
        "https://linkedin.com/company/lugvia"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+44-7466-779542",
          contactType: "customer service",
          areaServed: "Worldwide",
          availableLanguage: ["en", "ar", "tr", "fr"],
          email: "support@lugvia.com"
        },
      ],
      priceRange: "$$",
      paymentAccepted: "Cash, Credit Card, PayPal, Stripe",
      currenciesAccepted: "USD, EUR, GBP, SAR, AED, TRY",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Travel Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Airport Transfers",
              description: "Reliable and luxury airport pickup and drop-off services."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Chauffeur Service",
              description: "Professional private drivers for hourly or daily hire."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "City to City Transfer",
              description: "Comfortable long-distance transfers between cities."
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://lugvia.com/#website",
      url: "https://lugvia.com",
      name: "Lugvia Premium Travel",
      alternateName: ["Lugvia Travel", "Lugvia Transfers"],
      publisher: {
        "@id": "https://lugvia.com/#organization"
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://lugvia.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
