const REVIEWS = [
  {
    name: "Sarah M.",
    city: "Houston, TX",
    rating: 5,
    text: "Quote was clear, pickup was on time, and the team handled fragile furniture carefully.",
  },
  {
    name: "Daniel R.",
    city: "Austin, TX",
    rating: 5,
    text: "The reseller pricing was better than direct calls I made. Communication stayed consistent end-to-end.",
  },
  {
    name: "Priya K.",
    city: "Boise, ID",
    rating: 5,
    text: "Fast response, no hidden surprises, and helpful support on WhatsApp when we changed our move date.",
  },
];

export function ReviewHighlights() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lugvia Movers",
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
    })),
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <h2 className="text-2xl font-bold text-slate-900">What customers say</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {REVIEWS.map((review) => (
          <div key={`${review.name}-${review.city}`} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-amber-500 text-sm">{"★★★★★"}</div>
            <p className="mt-2 text-sm text-slate-700">{review.text}</p>
            <div className="mt-3 text-xs text-slate-500">
              {review.name} - {review.city}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
