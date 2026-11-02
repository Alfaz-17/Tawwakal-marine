import { Metadata } from 'next'
import BrandsContent from './brands-content'

export const metadata: Metadata = {
  title: 'All 300+ Industrial & Marine Brands | Tawwakal Automation',
  description: 'Stockist of genuine spare parts for 300+ industrial and marine automation brands: Siemens, ABB, Schneider Electric, Danfoss, Omron, Mitsubishi, Consilium, Furuno, Woodward, and Yokogawa. 100% bench tested.',
  keywords: [
    'marine equipment brands',
    'industrial automation manufacturers',
    'Siemens PLC spares',
    'ABB drives stockist',
    'Danfoss VLT distributor India',
    'Schneider Modicon modules',
    'Omron automation stockist',
    'Consilium marine alarm spares',
    'Furuno radar spares',
    'Tawwakal Automation brands',
  ],
  alternates: {
    canonical: 'https://tawwakalautomation.com/brands',
  },
  openGraph: {
    title: 'All 300+ Industrial & Marine Automation Brands | Tawwakal Automation',
    description: 'Global stockist of verified spare parts across 300+ automation manufacturers. Ready for express worldwide air dispatch.',
    url: 'https://tawwakalautomation.com/brands',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: '300+ Industrial & Marine Automation Brands - Tawwakal Automation',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '300+ Industrial & Marine Automation Brands | Tawwakal Automation',
    description: 'Direct stockist of genuine spares from Siemens, ABB, Danfoss, Schneider, Omron, and marine manufacturers.',
    images: ['https://tawwakalautomation.com/og-image.png'],
  },
}

export default function BrandsPage() {
  return <BrandsContent />
}
