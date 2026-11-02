import { Metadata } from 'next'
import { Suspense } from 'react'
import ProductsContent from './products-content'
import { MarineLoader } from '@/components/common/marine-loader'

export const metadata: Metadata = {
  title: 'Industrial & Marine Automation Equipment Catalog | Tawwakal Automation',
  description: 'Browse thousands of verified industrial and marine automation spare parts: PLCs, HMIs, VFD inverters, circuit breakers, power supplies, and marine electronics. 100% bench tested with 12-month warranty.',
  keywords: [
    'industrial automation catalog',
    'marine spare parts catalog',
    'PLC modules in stock',
    'VFD inverters supplier',
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
    title: 'Industrial & Marine Automation Equipment Catalog | Tawwakal Automation',
    description: 'Explore verified automation hardware: PLCs, drives, control units, and marine electronics with express global shipping from Alang hub.',
    url: 'https://tawwakalautomation.com/products',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Tawwakal Automation Product Catalog',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial & Marine Automation Products | Tawwakal Automation',
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
