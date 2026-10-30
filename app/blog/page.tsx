import { Metadata } from 'next'
import BlogContent from './blog-content'

export const metadata: Metadata = {
  title: 'Technical Articles & Industry Insights | Tawwakal Automation',
  description: 'Read technical insights, maintenance guidelines, and equipment sourcing articles from Tawwakal Automation.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Technical Insights | Tawwakal Automation',
    description: 'Articles and guides covering marine equipment, ship spare parts, and industrial automation.',
    url: 'https://tawwakalautomation.com/blog',
  }
}

export default function BlogPage() {
  return <BlogContent />
}
