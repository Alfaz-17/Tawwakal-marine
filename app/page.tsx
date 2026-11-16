import { Hero } from "@/components/boty/hero"
import { CategorySection } from "@/components/boty/category-section"
import { ProductGrid } from "@/components/boty/product-grid"
import { WhyChooseUs } from "@/components/boty/why-choose-us"
import { BrandGrid } from "@/components/boty/brands-grid"
import { AboutSection } from "@/components/boty/about-section"
import { GlobalCustomers } from "@/components/boty/global-customers"
import { FAQSection } from "@/components/boty/faq-section"
import { HomeContactSection } from "@/components/boty/home-contact-section"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tawwakal Marine & Automation | Global Marine Equipment, Ship Spares & Industrial Automation',
  description: 'Tawwakal Marine is a leading global supplier and stockist of marine equipment, ship spare parts, and industrial automation based in Bhavnagar/Alang. 100% bench-tested PLCs, HMIs, VFD drives, navigation electronics, and marine spares with 24-48h express worldwide air dispatch.',
  keywords: [
    'Tawwakal Marine',
    'Tawwakal Marine Automation',
    'Tawwakal Marine Bhavnagar',
    'Tawwakal Marine Alang',
    'Tawwakal Automation',
    'marine equipment supplier',
    'ship spare parts',
    'industrial automation products',
    'electrical components',
    'Alang ship breaking spare parts',
    'marine PLC systems',
    'Siemens S7-300',
    'Danfoss VLT drives',
    'Pro-face HMI',
    'marine engineering supplies',
    'B2B automation exporter India'
  ],
  alternates: {
    canonical: 'https://tawwakalautomation.com',
  },
  openGraph: {
    title: 'Tawwakal Marine & Automation | Global Marine Equipment & Ship Spares',
    description: 'Tawwakal Marine: B2B supplier of marine equipment, ship spare parts, industrial automation products, and electrical/mechanical components from Alang.',
    url: 'https://tawwakalautomation.com',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Tawwakal Marine & Automation - Global Marine Equipment & Industrial Automation',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawwakal Marine & Automation | Marine Equipment & Ship Spares',
    description: 'Tested PLCs, HMIs, VFD drives, and marine spares in stock in Bhavnagar / Alang. Express worldwide air dispatch.',
    images: ['https://tawwakalautomation.com/og-image.png'],
  },
}

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Shop by Categories */}
      <CategorySection />

      {/* 3. Featured Products & Equipment */}
      <ProductGrid />

      {/* 4. Why Choose Us (Simple & Clear Benefits) */}
      <WhyChooseUs />

      {/* 5. Brands & Technology Platforms */}
      <BrandGrid />

      {/* 6. About Tawwakal Marine */}
      <AboutSection />

      {/* 7. Client Testimonials & Global Reach */}
      <GlobalCustomers />

      {/* 8. Frequently Asked Questions */}
      <FAQSection />

      {/* 9. Request a Quote / Contact */}
      <HomeContactSection />
    </main>
  )
}
