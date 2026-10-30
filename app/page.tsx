import { Hero } from "@/components/boty/hero"
import { AboutSection } from "@/components/boty/about-section"
import { CategorySection } from "@/components/boty/category-section"
import { ProductGrid } from "@/components/boty/product-grid"
import { BrandGrid } from "@/components/boty/brands-grid"
import { WhyChooseUs } from "@/components/boty/why-choose-us"
import { ProjectsCaseStudies } from "@/components/boty/projects-case-studies"
import { EasyBuyingProcess } from "@/components/boty/easy-buying-process"
import { GlobalCustomers } from "@/components/boty/global-customers"
import { FAQSection } from "@/components/boty/faq-section"
import { HomeContactSection } from "@/components/boty/home-contact-section"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tawwakal Automation | Marine & Industrial Equipment Supplier',
  description: 'Global supplier and stockist of industrial and marine automation parts based in Bhavnagar/Alang. PLCs, HMIs, VFD drives, navigation electronics, and marine spares.',
  keywords: [
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
    'marine engineering supplies'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tawwakal Automation | Global Supplier & Stockist of Industrial & Marine Automation Parts',
    description: 'B2B supplier of marine equipment, ship spare parts, industrial automation products, and electrical/mechanical components.',
    url: 'https://tawwakalautomation.com',
    type: 'website',
    images: [{
      url: 'https://tawwakalautomation.com/hero-marine.png',
      width: 1200,
      height: 630,
      alt: 'Tawwakal Automation - Global Supplier & Stockist of Industrial & Marine Automation Parts',
    }],
  },
}

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Tawwakal */}
      <AboutSection />

      {/* 3. Shop by Categories */}
      <CategorySection />

      {/* 4. Featured Products & Equipment */}
      <ProductGrid />

      {/* 5. Brands & Technology Platforms */}
      <BrandGrid />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Projects & Case Studies */}
      <ProjectsCaseStudies />

      {/* 8. Our Working Process */}
      <EasyBuyingProcess />

      {/* 9. Client Testimonials & Global Reach */}
      <GlobalCustomers />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />

      {/* 11. Request a Quote / Contact */}
      <HomeContactSection />
    </main>
  )
}
