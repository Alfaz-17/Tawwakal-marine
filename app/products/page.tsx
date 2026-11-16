import { Metadata } from 'next'
import { Suspense } from 'react'
import ProductsContent from './products-content'
import { MarineLoader } from '@/components/common/marine-loader'

export const metadata: Metadata = {
  title: 'Marine & Industrial Automation Equipment Catalog | Tawwakal Marine & Automation',
  description: 'Browse thousands of verified marine and industrial automation spare parts by Tawwakal Marine: PLCs, HMIs, VFD inverters, marine radars, and ship spares. 100% bench tested with 12-month warranty and express global air dispatch.',
  keywords: [
    'Tawwakal Marine',
    'Tawwakal Marine Automation',
    'marine spare parts catalog',
    'industrial automation catalog',
    'PLC modules in stock',
    'VFD inverters supplier',
    'marine radar systems',
    'HMI operator panels',
    'circuit breakers',
    'marine electronics stockist',
    'Alang ship breaking spare parts',
    'Tawwakal Automation inventory',
  ],
  alternates: {
    canonical: 'https://tawwakalautomation.com/products',
  },
  openGraph: {
    title: 'Marine & Industrial Automation Equipment Catalog | Tawwakal Marine',
    description: 'Explore verified automation hardware: PLCs, drives, control units, and marine electronics with express global shipping from Alang hub.',
    url: 'https://tawwakalautomation.com/products',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Tawwakal Marine & Automation Product Catalog',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marine & Industrial Automation Products | Tawwakal Marine',
    description: 'Browse tested PLCs, drives, and marine spares ready for immediate worldwide dispatch.',
    images: ['https://tawwakalautomation.com/og-image.png'],
  },
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<MarineLoader />}>
      <ProductsContent />
    </Suspense>
  )
}
