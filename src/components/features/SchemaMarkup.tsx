export function SchemaMarkup() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": "https://lugvia.com/#organization",
      name: "Lugvia",
      url: "https://lugvia.com",
      logo: "https://lugvia.com/logo.svg",
      image: "https://lugvia.com/images/hero/dubai.jpg",
      description:
        "Luxury airport transfers, private chauffeur service, and premium travel bookings worldwide.",
      areaServed: "Worldwide",
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
        },
      ],
      priceRange: "$$",
      paymentAccepted: "Cash, Credit Card, PayPal",
      currenciesAccepted: "USD, EUR, GBP, SAR, AED, TRY",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://lugvia.com/#website",
      url: "https://lugvia.com",
      name: "Lugvia Premium Travel",
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
