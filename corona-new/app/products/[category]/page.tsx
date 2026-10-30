import { Metadata } from 'next'
import { Suspense } from 'react'
import CategoryContent from './category-content'
import { MarineLoader } from '@/components/common/marine-loader'
import api from '@/lib/api'

export const revalidate = 3600

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  
  try {
    const { data: categories } = await api.get('/categories')
    const categoryObj = Array.isArray(categories) ? categories.find((c: any) => 
      c.slug === decodedCategory || c._id === decodedCategory || c.name.toLowerCase().replace(/\s+/g, '-') === decodedCategory
    ) : null

    const categoryName = categoryObj?.name || decodedCategory.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    
    const title = `${categoryName} | Tawwakal Automation`
    const description = `B2B supply and sourcing for ${categoryName}. Review specifications, equipment availability, and request a quotation from Tawwakal Automation.`
    const keywords = [categoryName, 'Tawwakal Automation', `${categoryName} supplier`, 'marine equipment', 'industrial equipment']

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `/products/${category}`,
      },
      openGraph: {
        title,
        description,
        url: `https://tawwakalautomation.com/products/${category}`,
        type: 'website',
        images: [{
          url: categoryObj?.image || 'https://tawwakalautomation.com/products-hero.png',
          width: 1200,
          height: 630,
          alt: `${categoryName} - Tawwakal Automation`,
        }],
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch {
    const categoryName = decodedCategory.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    return {
      title: `${categoryName} | Tawwakal Automation`,
      description: `Equipment and spare parts for ${categoryName} from Tawwakal Automation.`,
    }
  }
}

export async function generateStaticParams() {
  try {
    const { data: categories } = await api.get('/categories')
    if (!Array.isArray(categories)) return []
    return categories.map((c: any) => ({
      category: c.slug || c._id,
    }))
  } catch {
    return []
  }
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<MarineLoader />}>
      <CategoryContent />
    </Suspense>
  )
}
