export function SchemaMarkup() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      "@id": "https://lugvia.com/#organization",
      name: "Lugvia Movers",
      legalName: "Lugvia Movers",
      url: "https://lugvia.com",
      logo: {
        "@type": "ImageObject",
        "url": "https://lugvia.com/logo.svg",
        "width": 512,
        "height": 512
      },
      image: [
        "https://lugvia.com/images/hero/dubai.jpg"
      ],
      description:
        "Lugvia Movers is a reseller-based moving platform connecting customers with discounted partner rates for local, long-distance, and commercial moving services.",
      areaServed: [
        { "@type": "Country", "name": "United States" }
      ],
      sameAs: [
        "https://facebook.com/lugvia",
        "https://instagram.com/lugvia",
        "https://twitter.com/lugvia"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+1-646-719-7124",
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: ["en"],
          email: "support@lugvia.com"
        },
      ],
      priceRange: "$$",
      paymentAccepted: "Cash, Credit Card",
      currenciesAccepted: "USD",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Moving Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Local Moving",
              description: "Residential and apartment moves with optional packing services."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Long-Distance Moving",
              description: "Intercity and interstate relocation coordination with partner carriers."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Packing and Storage",
              description: "Optional full/partial packing, supplies, and short-term storage."
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
      name: "Lugvia Movers",
      alternateName: ["Lugvia Packers and Movers"],
      publisher: {
        "@id": "https://lugvia.com/#organization"
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
