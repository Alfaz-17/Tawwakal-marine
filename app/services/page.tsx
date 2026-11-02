import { Metadata } from 'next'
import ServicesContent from './services-content'

export const metadata: Metadata = {
  title: 'Services & Technical Sourcing | Tawwakal Automation',
  description: 'Technical sourcing, bench testing, marine spare parts reconditioning, and port-side express air dispatch services by Tawwakal Automation. Solving emergency vessel and plant downtime.',
  keywords: [
    'marine equipment supply services',
    'ship automation repair and sourcing',
    'bench testing industrial automation',
    'Alang ship breaking spare parts supply',
    'emergency marine spare delivery',
    'Tawwakal Automation services',
  ],
  alternates: {
    canonical: 'https://tawwakalautomation.com/services',
  },
  openGraph: {
    title: 'Services & Technical Sourcing | Tawwakal Automation',
    description: 'Direct procurement, bench simulation, and port-side express air dispatch for critical marine and industrial components.',
    url: 'https://tawwakalautomation.com/services',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Tawwakal Automation Services & Capabilities',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Technical Sourcing | Tawwakal Automation',
    description: 'Technical sourcing, bench testing, and express air dispatch for marine and industrial automation parts.',
    images: ['https://tawwakalautomation.com/og-image.png'],
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
