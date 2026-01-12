export function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Lugvia",
    url: "https://lugvia.com",
    description:
      "Luxury airport transfers, private chauffeur service, and premium travel bookings worldwide.",
    areaServed: "Worldwide",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-7466-779542",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
