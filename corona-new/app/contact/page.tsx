import { Metadata } from 'next'
import ContactFormSection from './contact-form-section'

export const metadata: Metadata = {
  title: 'Contact Us & Request a Quote | Tawwakal Automation',
  description: 'Submit your marine equipment, ship spare parts, and industrial automation enquiries to Tawwakal Automation. Request technical reviews and commercial quotations.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Tawwakal Automation',
    description: 'B2B equipment enquiries, quotation requests, and spare parts sourcing assistance.',
    url: 'https://tawwakalautomation.com/contact',
  }
}

export default function ContactPage() {
  return <ContactFormSection />
}
