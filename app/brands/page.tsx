import { Metadata } from 'next'
import BrandsContent from './brands-content'

export const metadata: Metadata = {
  title: 'Supported Equipment Brands | Tawwakal Automation',
  description: 'Explore the marine and industrial automation equipment brands supported by Tawwakal Automation. Sourcing, spare parts identification, and quotation assistance.',
  keywords: [
    'marine equipment brands',
    'industrial automation manufacturers',
    'ship spare parts brands',
    'Tawwakal Automation',
    'marine equipment sourcing',
  ],
  alternates: {
    canonical: '/brands',
  },
  openGraph: {
    title: 'Supported Equipment Brands | Tawwakal Automation',
    description: 'We handle equipment sourcing and spare parts identification for leading marine and industrial manufacturers.',
    url: 'https://tawwakalautomation.com/brands',
    type: 'website',
  },
}

export default function BrandsPage() {
  return <BrandsContent />
}
