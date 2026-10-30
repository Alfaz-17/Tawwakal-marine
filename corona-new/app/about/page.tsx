import { Metadata } from 'next'
import AboutContent from './about-content'

export const metadata: Metadata = {
  title: 'About Tawwakal Automation | Marine & Industrial Equipment Supplier',
  description: 'Learn about Tawwakal Automation, a B2B supplier of marine equipment, ship spare parts, industrial automation systems, and electrical components.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Tawwakal Automation',
    description: 'B2B supply partner for marine, shipping, engineering, and industrial operations.',
    url: 'https://tawwakalautomation.com/about',
  }
}

export default function AboutPage() {
  return <AboutContent />
}
