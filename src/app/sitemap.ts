import { MetadataRoute } from 'next';
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lugvia.com';

  // 1. Fetch dynamic content from database
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const dynamicPages = await prisma.page.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  // 2. Generate Blog URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Generate Dynamic Page URLs
  const pageUrls = dynamicPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 4. Define Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/destinations',
    '/airport-transfers',
    '/city-to-city',
    '/hourly-booking',
    '/chauffeur-service',
    '/hotel-booking',
    '/flights-booking',
    '/tours-activities',
    '/travel-packages',
    '/blog',
    // Landing pages (keep these if they are hardcoded files)
    '/airport-taxi-london',
    '/airport-taxi-newyork',
    '/airport-taxi-tokyo',
    '/airport-taxi-singapore',
    '/airport-taxi-paris',
    '/airport-taxi-dubai',
    '/airport-taxi-istanbul',
    '/airport-taxi-antalya',
    '/jeddah-to-makkah-taxi',
    '/city-transfers-makkah-madina',
    '/best-hotels-paris',
    '/best-hotels-istanbul',
    '/best-hotels-dubai',
    '/best-hotels-antalya',
    '/best-hotels-makkah',
    '/best-hotels-madina',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 5. Merge all routes
  return [...staticRoutes, ...blogUrls, ...pageUrls];
}
