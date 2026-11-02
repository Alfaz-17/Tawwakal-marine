import { Metadata } from 'next'
import BlogContent from './blog-content'

export const metadata: Metadata = {
  title: 'Marine & Industrial Automation Blog | Tawwakal Automation',
  description: 'Technical insights, troubleshooting guides, PLC replacement articles, and marine automation maintenance guidelines from Tawwakal Automation engineering team.',
  keywords: [
    'marine automation blog',
    'industrial automation guides',
    'PLC troubleshooting',
    'VFD drive maintenance',
    'Alang ship breaking insights',
    'ship automation maintenance',
  ],
  alternates: {
    canonical: 'https://tawwakalautomation.com/blog',
  },
  openGraph: {
    title: 'Marine & Industrial Automation Blog | Tawwakal Automation',
    description: 'Technical guides, maintenance insights, and spare parts sourcing articles for marine fleets and industrial plants.',
    url: 'https://tawwakalautomation.com/blog',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Tawwakal Automation Technical Blog & Guides',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marine & Industrial Automation Blog | Tawwakal Automation',
    description: 'Expert technical guides on marine and industrial automation equipment maintenance and sourcing.',
    images: ['https://tawwakalautomation.com/og-image.png'],
  },
}

export default function BlogPage() {
  return <BlogContent />
}
