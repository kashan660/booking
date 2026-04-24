# Cities Pages Setup Guide

## Overview
This guide explains how to set up and manage city-specific pages for your packers and movers website.

## 🎯 What's Included

### 5 Pre-Built City Pages
1. **Houston, TX** - `/movers/houston`
2. **Austin, TX** - `/movers/austin`
3. **Dallas, TX** - `/movers/dallas`
4. **San Antonio, TX** - `/movers/san-antonio`
5. **Phoenix, AZ** - `/movers/phoenix`

Each city page includes:
- ✅ SEO-optimized title and meta description
- ✅ Comprehensive content about moving services
- ✅ Local neighborhoods and areas served
- ✅ 5 FAQs specific to each city
- ✅ Hero image
- ✅ Keywords for SEO
- ✅ Structured data (JSON-LD) for search engines

## 🚀 Quick Setup

### Step 1: Ensure Database is Running
Make sure your PostgreSQL database is running and connected.

### Step 2: Run the Seed Script
```bash
node prisma/seed-cities.mjs
```

You should see output like:
```
🌱 Seeding cities...
✅ Created/Updated: Houston, TX
✅ Created/Updated: Austin, TX
✅ Created/Updated: Dallas, TX
✅ Created/Updated: San Antonio, TX
✅ Created/Updated: Phoenix, AZ
✅ Cities seeded successfully!

📍 Created city pages:
   - /movers/houston (Houston, TX)
   - /movers/austin (Austin, TX)
   - /movers/dallas (Dallas, TX)
   - /movers/san-antonio (San Antonio, TX)
   - /movers/phoenix (Phoenix, AZ)
```

### Step 3: View the Pages
Visit these URLs in your browser:
- http://localhost:3000/movers
- http://localhost:3000/movers/houston
- http://localhost:3000/movers/austin
- http://localhost:3000/movers/dallas
- http://localhost:3000/movers/san-antonio
- http://localhost:3000/movers/phoenix

## 📄 Page Structure

### Cities Listing Page (`/movers`)
- Shows all published cities in a grid
- Displays placeholder cities if database is empty
- Includes trust signals and reviews
- Links to services and guides

### Individual City Pages (`/movers/[slug]`)
Each city page includes:

#### 1. **Hero Section**
- City name and state
- Brief description
- "Get a Quote" CTA button

#### 2. **Main Content**
- Professional moving services description
- List of services offered
- Why choose us section
- Neighborhoods served

#### 3. **Service Links**
- Quick links to all available services
- Filtered by published services

#### 4. **Contact Information**
- WhatsApp number
- Phone number
- Email address

#### 5. **FAQs**
- 5 city-specific questions and answers
- Structured data for rich snippets

#### 6. **Related Cities**
- Links to other city pages
- Helps with internal linking

## 🎨 Customization

### Adding More Cities

Create a new entry in `prisma/seed-cities.mjs`:

```javascript
{
  name: "Miami",
  slug: "miami",
  state: "FL",
  country: "USA",
  heroImage: "https://images.unsplash.com/photo-...",
  seoTitle: "Packers and Movers in Miami, FL | ...",
  description: "Professional packers and movers in Miami...",
  keywords: ["packers and movers miami", "miami movers", ...],
  content: `
    <h2>Your Content Here</h2>
    <p>Description...</p>
  `,
  faqs: [
    {
      question: "Your question?",
      answer: "Your answer..."
    }
  ],
  published: true,
}
```

Then run:
```bash
node prisma/seed-cities.mjs
```

### Editing Existing Cities

#### Option 1: Via Admin Panel
1. Go to `/admin/moving/cities`
2. Click on the city you want to edit
3. Update the content
4. Save changes

#### Option 2: Via Database
Update the seed file and re-run:
```bash
node prisma/seed-cities.mjs
```

### Unpublishing a City
Set `published: false` in the seed file or admin panel.

## 📊 SEO Features

### Meta Tags
Each city page includes:
- Custom title tag
- Meta description
- Keywords
- Open Graph tags
- Twitter Card tags

### Structured Data
Three types of schema markup:
1. **BreadcrumbList** - Navigation breadcrumbs
2. **FAQPage** - FAQ rich snippets
3. **MovingCompany** - Local business information

### URL Structure
Clean, SEO-friendly URLs:
- `/movers/houston`
- `/movers/austin`
- `/movers/dallas`

## 🖼️ Images

### Hero Images
Each city uses high-quality images from Unsplash:
- Houston: City skyline
- Austin: Downtown view
- Dallas: Urban landscape
- San Antonio: River Walk area
- Phoenix: Desert cityscape

### Changing Images
Update the `heroImage` field with any image URL:
```javascript
heroImage: "https://your-image-url.com/image.jpg"
```

## 📝 Content Guidelines

### Writing City Content

#### 1. **Introduction**
- Welcome visitors
- Mention specific neighborhoods
- Highlight unique city features

#### 2. **Services Section**
- List all available services
- Use bullet points
- Be specific to the city

#### 3. **Why Choose Us**
- Local knowledge
- City-specific challenges
- Unique selling points

#### 4. **Areas Served**
- List neighborhoods
- Include suburbs
- Mention nearby cities

#### 5. **FAQs**
- Address common concerns
- Include pricing information
- Mention local regulations
- Add city-specific details

### Content Best Practices
- ✅ Use local terminology
- ✅ Mention specific landmarks
- ✅ Include neighborhood names
- ✅ Address local challenges (heat, traffic, etc.)
- ✅ Use "we" and "our" for personal touch
- ✅ Keep paragraphs short and scannable
- ✅ Use headers (H2, H3) for structure

## 🔍 SEO Optimization

### Keywords
Each city page targets:
- Primary: "packers and movers [city]"
- Secondary: "[city] movers", "moving company [city]"
- Long-tail: "local movers [city]", "moving services [city]"

### Internal Linking
- Links to services pages
- Links to other city pages
- Links to guides and resources
- Links to quote form

### External Signals
- Encourage reviews
- Build local citations
- Get backlinks from local sites

## 📱 Mobile Optimization

All city pages are fully responsive:
- Mobile-first design
- Touch-friendly buttons
- Readable font sizes
- Optimized images
- Fast loading times

## 🧪 Testing Checklist

Before launching city pages:
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Content is accurate
- [ ] Phone numbers are correct
- [ ] FAQs are relevant
- [ ] SEO tags are present
- [ ] Mobile view looks good
- [ ] Forms work correctly
- [ ] Schema markup validates
- [ ] Page loads quickly

### Testing Tools
- Google Search Console
- Google Rich Results Test
- PageSpeed Insights
- Mobile-Friendly Test
- Schema Markup Validator

## 📈 Analytics

Track these metrics for city pages:
- Page views
- Time on page
- Bounce rate
- Quote form submissions
- Phone clicks
- WhatsApp clicks

## 🔄 Maintenance

### Regular Updates
- Update content quarterly
- Refresh images annually
- Add new FAQs based on customer questions
- Update pricing information
- Add new neighborhoods as you expand

### Monitoring
- Check for broken links monthly
- Monitor search rankings
- Review customer feedback
- Update based on seasonal changes

## 🎯 Next Steps

### Expand Coverage
1. Add more Texas cities (El Paso, Fort Worth, Corpus Christi)
2. Add major cities in other states
3. Add smaller cities in your service area

### Enhance Content
1. Add customer testimonials
2. Include before/after photos
3. Add video content
4. Create city-specific guides

### Improve SEO
1. Build local backlinks
2. Get listed in local directories
3. Encourage customer reviews
4. Create location-specific blog posts

## 📞 Support

### Common Issues

**Issue: Cities not showing**
- Check database connection
- Verify `published: true`
- Run seed script again

**Issue: Images not loading**
- Check image URLs
- Verify internet connection
- Use different image source

**Issue: Content not updating**
- Clear browser cache
- Restart development server
- Check database for changes

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [SEO Best Practices](https://developers.google.com/search/docs)
- [Schema.org](https://schema.org)

## ✅ Summary

You now have:
- ✅ 5 fully-functional city pages
- ✅ SEO-optimized content
- ✅ Structured data for search engines
- ✅ Mobile-responsive design
- ✅ Easy-to-manage system
- ✅ Placeholder support for development
- ✅ Admin panel integration

Your packers and movers website is ready to rank for local searches! 🚀
