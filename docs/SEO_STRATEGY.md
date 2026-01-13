# Lugvia SEO & Backlink Strategy

## 1. Keywords Strategy
We have implemented a robust keyword strategy targeting high-intent transactional keywords ("Book", "Transfer", "Taxi") and informational keywords ("Best hotels", "Guide").

### Core Keywords (Transactional)
- **Primary**: "Airport Transfer", "Chauffeur Service", "Luxury Travel"
- **Secondary (Geo-specific)**: 
  - "Jeddah to Makkah Taxi"
  - "Istanbul Airport Transfer"
  - "Paris Private Chauffeur"
  - "Dubai VIP Transport"
- **Long-tail**: "Luxury van hire for families in Istanbul", "Best price Umrah taxi Jeddah"

### Implementation
- **Global**: Updated `layout.tsx` with expanded keyword list.
- **On-Page**: Ensure every landing page (`/airport-taxi-istanbul`, etc.) has unique `title` and `description` in `page.tsx`.
- **Content**: Blog posts should target questions (e.g., "How to get from Jeddah Airport to Makkah?").

## 2. On-Page SEO Checklist
- [x] **Title Tags**: Unique, < 60 chars, includes primary keyword.
- [x] **Meta Descriptions**: Unique, < 160 chars, includes Call-to-Action.
- [x] **H1 Tags**: One per page, includes primary keyword (Verified in `Hero.tsx`).
- [x] **Schema Markup**: Implemented `TravelAgency` and `WebSite` JSON-LD.
- [x] **URL Structure**: Clean, descriptive URLs (e.g., `/airport-taxi-dubai` instead of `/p?id=123`).
- [ ] **Image Alt Text**: Ensure all images in `public/images` have descriptive alt text when used.
- [ ] **Internal Linking**: Link related city pages (e.g., "Best Hotels in Paris" should link to "Airport Taxi Paris").

## 3. Backlink Strategy (Off-Page SEO)
Since we cannot directly "build" links via code, use this strategy to acquire them:

### A. The "Link Magnet" Approach
Create high-value resources that others *want* to link to.
1.  **"Ultimate Guide to Umrah Transport 2024"**: A comprehensive PDF/Page with maps, prices, and tips.
2.  **"Istanbul Airport Cheat Sheet"**: Infographic showing gates, meeting points, and transport options.
3.  **"Global Chauffeur Etiquette Guide"**: A fun article for business travelers.

### B. Partnerships & Affiliates
1.  **Travel Bloggers**: Offer a 10% discount code for their readers in exchange for a review/link.
2.  **Local Hotels**: Ask partner hotels to list Lugvia on their "How to get here" page.
    *   *Pitch*: "Add a link to our trusted transfer service so your guests don't get scammed by local taxis."
3.  **Business Directories**: Submit to high-quality directories:
    *   TripAdvisor
    *   Trustpilot
    *   Local business listings in target cities (Dubai, Istanbul).

### C. Digital PR
- **Press Releases**: Announce expansion to new cities (e.g., "Lugvia Launches VIP Service in Paris").
- **HARO (Help A Reporter Out)**: Respond to journalists looking for travel experts.

## 4. Technical SEO
- **Sitemap**: `sitemap.xml` is auto-generated at `/sitemap.xml`. Submit this to Google Search Console.
- **Robots.txt**: Optimized to allow indexing while protecting admin routes.
- **Speed**: Images are using `next/image` for optimization.

## Next Steps for You
1.  **Content**: Write 1 blog post per week using the "Blog" section in Admin.
2.  **Outreach**: Contact 5 travel bloggers this week.
3.  **Social**: Share every new landing page on LinkedIn/Twitter.
