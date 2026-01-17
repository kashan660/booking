import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lugvia.com';

  // Static routes
  const routes = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic routes from database
  try {
    // Check if prisma is available
    if (!prisma || !prisma.page) {
      console.warn('Prisma not available during build, using static routes only');
      return routes;
    }

    // Get dynamic pages from database
    const dynamicPages = await prisma.page.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    });

    const dynamicRoutes = dynamicPages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt.toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    // Get blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    });

    const blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt.toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...routes, ...dynamicRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Fallback to static routes if database is not available
    return routes;
  }
}