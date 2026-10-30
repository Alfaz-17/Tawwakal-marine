import { Metadata } from 'next'
import BrandDetailContent from './brand-detail-content'
import api from '@/lib/api'

export const revalidate = 3600

type Props = {
  params: Promise<{ brandName: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandName } = await params
  const decodedBrand = decodeURIComponent(brandName).replace(/-/g, ' ')
  const displayName = decodedBrand.replace(/\b\w/g, l => l.toUpperCase())

  return {
    title: `${displayName} Spare Parts, Drives & Modules - Used & New | Tawwakal Automation`,
    description: `Global stockist and exporter of genuine ${displayName} marine and industrial automation spare parts: PLCs, HMIs, VFD drives, and control modules. 100% bench tested with express worldwide dispatch. Request a quote.`,
    keywords: [
      `${displayName} spare parts`,
      `${displayName} PLC`,
      `${displayName} VFD drive`,
      `${displayName} automation`,
      `${displayName} marine equipment`,
      'Tawwakal Automation',
      'surplus industrial parts',
      'Alang marine spare parts',
    ],
    alternates: {
      canonical: `https://tawwakalautomation.com/brand/${brandName}`,
    },
    openGraph: {
      title: `${displayName} Spare Parts & Industrial Automation | Tawwakal Automation`,
      description: `Tested ${displayName} automation and marine spares in stock in Bhavnagar / Alang. Express worldwide air dispatch.`,
      url: `https://tawwakalautomation.com/brand/${brandName}`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateStaticParams() {
  try {
    const { data: brands } = await api.get('/brands')
    if (!Array.isArray(brands)) return []
    return brands.map((b: any) => ({
      brandName: encodeURIComponent(b.name),
    }))
  } catch {
    return []
  }
}

export default function BrandPage() {
  return <BrandDetailContent />
}
