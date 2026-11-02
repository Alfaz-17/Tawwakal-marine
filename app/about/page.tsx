import { Metadata } from 'next'
import AboutContent from './about-content'

export const metadata: Metadata = {
  title: 'About Tawwakal Automation | Global Marine & Industrial Automation Stockist',
  description: 'Learn about Tawwakal Automation: established stockist and exporter of genuine industrial and marine automation spares based in Bhavnagar & Alang. Supporting 300+ brands with 100% bench testing and 24-48h worldwide express dispatch.',
  keywords: [
    'About Tawwakal Automation',
    'Alang ship breaking spare parts stockist',
    'Bhavnagar industrial automation exporter',
    'marine equipment supplier India',
    'tested PLC supplier',
    'ship automation sourcing',
    'marine electronics company',
  ],
  alternates: {
    canonical: 'https://tawwakalautomation.com/about',
  },
  openGraph: {
    title: 'About Tawwakal Automation | Global Marine & Industrial Stockist',
    description: 'Verified B2B supply partner for marine fleets, industrial plants, and automation engineers worldwide from Alang hub.',
    url: 'https://tawwakalautomation.com/about',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'About Tawwakal Automation - Global Marine & Industrial Stockist',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Tawwakal Automation | Marine & Industrial Stockist',
    description: 'Direct stockist and exporter of industrial and marine automation parts from Alang & Bhavnagar.',
    images: ['https://tawwakalautomation.com/og-image.png'],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
