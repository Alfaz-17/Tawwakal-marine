import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products',
          '/product/',
          '/brands',
          '/brand/',
          '/about',
          '/contact',
          '/services',
          '/blog',
          '/api/feed/',
        ],
        disallow: [
          '/admin/',
          '/api/auth/',
          '/checkout',
          '/account',
          '/cart',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/*.png$', '/*.jpg$', '/*.webp$', '/*.svg$'],
      },
    ],
    sitemap: [
      'https://tawwakalautomation.com/sitemap.xml',
      'https://tawwakalautomation.com/image-sitemap.xml',
    ],
    host: 'https://tawwakalautomation.com',
  }
}
