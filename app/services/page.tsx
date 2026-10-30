import { Metadata } from 'next'
import ServicesContent from './services-content'

export const metadata: Metadata = {
  title: 'Services & Supply Capabilities | Tawwakal Automation',
  description: 'Tawwakal Automation provides marine equipment supply, ship spare parts, industrial automation sourcing, and technical supply assistance for commercial facilities.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services & Supply Capabilities | Tawwakal Automation',
    description: 'Marine equipment supply, ship spare parts, industrial automation products, and requirement-based sourcing assistance.',
    url: 'https://tawwakalautomation.com/services',
  }
}

export default function ServicesPage() {
  return <ServicesContent />
}
