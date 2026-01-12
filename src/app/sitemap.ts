import { Metadata, Route } from 'next';
import { seoPagesData } from '@/lib/seo-data';

export default function sitemap(): Metadata['sitemap'] {
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

  return [...routes, ...seoRoutes];
}
