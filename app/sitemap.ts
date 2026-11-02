import { MetadataRoute } from 'next'
import connectToDatabase from '@/lib/db'
import { Product, Category, Brand, Blog } from '@/lib/models'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tawwakalautomation.com'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/brands`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  try {
    await connectToDatabase()

    const [products, categories, brands, blogs] = await Promise.all([
      Product.find({}).select('slug _id updatedAt').lean(),
      Category.find({}).select('slug _id updatedAt').lean(),
      Brand.find({}).select('name _id updatedAt').lean(),
      Blog.find({}).select('slug _id date updatedAt').lean(),
    ])

    const productRoutes: MetadataRoute.Sitemap = Array.isArray(products)
      ? products.map((p: any) => ({
          url: `${baseUrl}/product/${p.slug || p._id}`,
          lastModified: new Date(p.updatedAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }))
      : []

    const categoryRoutes: MetadataRoute.Sitemap = Array.isArray(categories)
      ? categories.map((c: any) => ({
          url: `${baseUrl}/products/${c.slug || c._id}`,
          lastModified: new Date(c.updatedAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.88,
        }))
      : []

    const brandRoutes: MetadataRoute.Sitemap = Array.isArray(brands)
      ? brands.map((b: any) => ({
          url: `${baseUrl}/brand/${encodeURIComponent(b.name)}`,
          lastModified: new Date(b.updatedAt || new Date()),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }))
      : []

    const blogRoutes: MetadataRoute.Sitemap = Array.isArray(blogs)
      ? blogs.map((b: any) => ({
          url: `${baseUrl}/blog/${b.slug || b._id}`,
          lastModified: new Date(b.date || b.updatedAt || new Date()),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
      : []

    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...productRoutes,
      ...brandRoutes,
      ...blogRoutes,
    ]
  } catch (error) {
    console.error('Sitemap direct DB generation error:', error)
    return staticRoutes
  }
}
