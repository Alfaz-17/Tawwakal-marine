import { Metadata } from 'next'
import { Suspense } from 'react'
import ProductsContent from './products-content'
import { MarineLoader } from '@/components/common/marine-loader'

export const metadata: Metadata = {
  title: 'Marine & Industrial Equipment Products | Tawwakal Automation',
  description: 'Explore our catalog of marine equipment, ship spare parts, industrial automation systems, electrical and mechanical components. Sourcing assistance and B2B quotations.',
  keywords: [
    'Tawwakal Automation products',
    'marine spare parts',
    'ship spare parts',
    'industrial automation products',
    'ship engine parts',
    'marine electronics',
    'marine equipment supplier',
    'industrial pumps and valves',
    'PLC modules',
    'electrical components',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Marine & Industrial Equipment Products | Tawwakal Automation',
    description: 'B2B catalog of marine equipment, ship spare parts, industrial automation systems, and electrical/mechanical components.',
    url: 'https://tawwakalautomation.com/products',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/products-hero.png',
      width: 1200,
      height: 630,
      alt: 'Tawwakal Automation - Product Catalog',
    }],
  },
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<MarineLoader />}>
      <ProductsContent />
    </Suspense>
  )
}
