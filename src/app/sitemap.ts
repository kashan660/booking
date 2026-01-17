import { MetadataRoute } from 'next';
import { seoPagesData } from '@/lib/seo-data';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Dynamic routes from SEO data
  const seoRoutes = Object.keys(seoPagesData).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Travel package routes
  const travelPackages = [
    'luxury-dubai',
    'turkey-cultural',
    'europe-multi-city',
    'umrah-plus',
    'asian-adventures',
    'honeymoon-specials'
  ].map((slug) => ({
    url: `${baseUrl}/travel-packages/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...seoRoutes, ...blogRoutes, ...travelPackages];
}
