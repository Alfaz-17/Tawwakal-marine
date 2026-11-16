"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/common/logo"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import TawakkalBackground from "@/components/TawakkalBackground"

const DEFAULT_FOOTER_CATEGORIES = [
  { name: "PLC Systems & Modules", slug: "plc-systems" },
  { name: "Variable Frequency Drives (VFD)", slug: "vfd-drives" },
  { name: "HMI & Operator Panels", slug: "hmi-panels" },
  { name: "Engine Room Controls & AMS", slug: "engine-room-controls" },
  { name: "Bridge Navigation & Telecom", slug: "bridge-navigation" },
  { name: "Marine Radar Systems", slug: "marine-radar" },
]

export function Footer() {
  const pathname = usePathname()
  const [categories, setCategories] = useState<any[]>(DEFAULT_FOOTER_CATEGORIES)
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        if (Array.isArray(res.data)) {
          setCategories(res.data.slice(0, 6))
        }
      } catch (e) {
        // Fallback to static links if API fails
      }
    }
    fetchCategories()
  }, [])
  
  if (pathname?.startsWith("/admin")) return null

  const productLinks = categories.length > 0
    ? [
        ...categories.map(cat => ({
          name: cat.name,
          href: `/products?category=${cat.slug || cat._id}`,
        })),
        { name: "All Products & Equipment", href: "/products" },
      ]
    : [
        { name: "PLC Systems", href: "/products?category=plc-systems" },
        { name: "HMI Panels", href: "/products?category=hmi-panels" },
        { name: "VFD & Inverters", href: "/products?category=vfd-inverters" },
        { name: "Marine Radar Systems", href: "/products?category=marine-radar" },
        { name: "Oil Mist Detectors", href: "/products?category=oil-mist-detectors" },
        { name: "All Products & Equipment", href: "/products" },
      ]

  const companyLinks = [
    { name: "About Tawwakal Marine", href: "/about" },
    { name: "Our Services & Capabilities", href: "/services" },
    { name: "Industries Served", href: "/#industries" },
    { name: "Supported Brands", href: "/brands" },
    { name: "Technical Articles", href: "/blog" },
  ]

  const procurementLinks = [
    { name: "Request a Quotation", href: "/contact" },
    { name: "Spare Parts Enquiry", href: "/contact" },
    { name: "Supply Capabilities", href: "/services" },
    { name: "Buying Workflow", href: "/#buying-process" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ]

  return (
    <footer className="bg-[#04142B] text-white pt-8 sm:pt-12 pb-6 sm:pb-8 rounded-t-3xl relative overflow-hidden mt-6 sm:mt-8 border-t border-[#0095A8]/25">
      {/* Reusable Tawakkal Dark Marine Background */}
      <TawakkalBackground variant="dark" />

      <div className="ta-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Clean 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-3">
            <Logo size="md" variant="white" />
            <p className="text-xs text-white/70 leading-relaxed">
              Global supplier and stockist of marine equipment, ship spares, and industrial automation parts from Bhavnagar and Alang, India.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0095A8] mb-3">
              Direct Contact
            </h3>
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
                <a href="tel:+916356547827" className="hover:text-[#0095A8] transition-colors font-semibold">
                  +91 6356547827
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
                <a href="mailto:sales@tawwakalautomation.com" className="hover:text-[#0095A8] transition-colors font-semibold">
                  sales@tawwakalautomation.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0095A8] shrink-0 mt-0.5" />
                <span>Bhavnagar / Alang, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Column 3: Spares & Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0095A8] mb-3">
              Popular Spares
            </h3>
            <ul className="space-y-1.5 text-xs">
              {productLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors block truncate"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0095A8] mb-3">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-white/70 hover:text-white transition-colors">
                  Brands We Stock
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Supply
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean Bottom Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Tawwakal Marine &amp; Automation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
            <Link href="/admin/login" className="hover:text-white/80 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
