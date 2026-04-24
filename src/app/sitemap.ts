import { MetadataRoute } from 'next';
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lugvia.com';

  // 1. Fetch dynamic content from database
  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  let dynamicPages: { slug: string; updatedAt: Date }[] = [];
  let movingCities: { slug: string; updatedAt: Date }[] = [];
  let movingServices: { slug: string; updatedAt: Date }[] = [];

  try {
    blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    dynamicPages = await prisma.page.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    movingCities = await prisma.movingCity.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    movingServices = await prisma.movingService.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch (error) {
    console.warn("Database connection failed during sitemap generation:", error);
  }

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

  const movingCityUrls = movingCities.map((c) => ({
    url: `${baseUrl}/movers/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const movingServiceUrls = movingServices.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 4. Define Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/driver-registration',
    '/vehicle-registration',
    '/movers',
    '/services',
    '/guides',
    '/get-a-quote',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 5. Merge all routes
  return [...staticRoutes, ...blogUrls, ...pageUrls, ...movingCityUrls, ...movingServiceUrls];
}
