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
    
    const title = `${categoryName} Supplier & Stockist | Tawwakal Automation`
    const description = `Global supplier and stockist of genuine ${categoryName}. Verified surplus, used & new marine & industrial parts with 100% bench testing, technical warranty, and worldwide express air dispatch from Alang hub.`
    const keywords = [
      categoryName,
      `${categoryName} supplier`,
      `${categoryName} stockist`,
      `${categoryName} used`,
      `${categoryName} surplus`,
      `${categoryName} spare parts`,
      'Tawwakal Automation',
      'marine automation spares',
      'industrial equipment India',
      'Alang ship breaking spare parts',
    ]

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `https://tawwakalautomation.com/products/${category}`,
      },
      openGraph: {
        title,
        description,
        url: `https://tawwakalautomation.com/products/${category}`,
        type: 'website',
        siteName: 'Tawwakal Automation',
        images: [{
          url: categoryObj?.image ? (categoryObj.image.startsWith('http') ? categoryObj.image : `https://tawwakalautomation.com${categoryObj.image}`) : 'https://tawwakalautomation.com/og-image.png',
          width: 1200,
          height: 630,
          alt: `${categoryName} - Tawwakal Automation`,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [categoryObj?.image ? (categoryObj.image.startsWith('http') ? categoryObj.image : `https://tawwakalautomation.com${categoryObj.image}`) : 'https://tawwakalautomation.com/og-image.png'],
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
