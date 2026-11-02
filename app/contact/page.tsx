import { Metadata } from 'next'
import ContactFormSection from './contact-form-section'

export const metadata: Metadata = {
  title: 'Request a Quote & Contact Us | Tawwakal Automation',
  description: 'Submit technical RFQ enquiries for industrial & marine automation spare parts: PLCs, drives, HMIs, and circuit breakers. Rapid commercial quotes within 2 hours with worldwide air freight options from Bhavnagar / Alang.',
  keywords: [
    'Tawwakal Automation contact',
    'marine parts quote request',
    'industrial automation RFQ',
    'ship spare parts inquiry',
    'Alang automation parts contact',
    'buy PLC spare parts',
    'sales@tawwakalautomation.com',
  ],
  alternates: {
    canonical: 'https://tawwakalautomation.com/contact',
  },
  openGraph: {
    title: 'Request a Quote & Technical Enquiry | Tawwakal Automation',
    description: 'B2B equipment enquiries, quotation requests, and rapid spare parts sourcing assistance worldwide.',
    url: 'https://tawwakalautomation.com/contact',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Contact Tawwakal Automation - Fast B2B Quotes',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Tawwakal Automation | Instant RFQ',
    description: 'Get verified pricing and dispatch timelines for marine and industrial automation spares.',
    images: ['https://tawwakalautomation.com/og-image.png'],
  },
}

export default function ContactPage() {
  return <ContactFormSection />
}
