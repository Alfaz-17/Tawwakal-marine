import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/feed/'],
        disallow: ['/admin/', '/checkout', '/account', '/cart', '/api/auth/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: [
      'https://tawwakalautomation.com/sitemap.xml',
    ],
  }
}
