import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/_next/',
          '/checkout/',
        ],
      },
    ],
    sitemap: 'https://lugvia.com/sitemap.xml',
    host: 'https://lugvia.com',
  }
}
