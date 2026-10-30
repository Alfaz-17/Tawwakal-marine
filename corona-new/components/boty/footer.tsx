"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/common/logo"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import TawakkalBackground from "@/components/TawakkalBackground"

export function Footer() {
  const pathname = usePathname()
  const [categories, setCategories] = useState<any[]>([])
  
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
    { name: "About Tawwakal", href: "/about" },
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
    <footer className="bg-[#04142B] text-white pt-8 sm:pt-14 pb-8 sm:pb-10 rounded-t-3xl relative overflow-hidden mt-6 sm:mt-8 border-t border-[#0095A8]/25">
      {/* Reusable Tawakkal Dark Marine Background */}
      <TawakkalBackground variant="dark" />

      <div className="ta-content max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Highlights - 2 cols on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-[#0095A8]/20">
          <div className="flex items-start gap-2.5 sm:gap-3.5 p-3 sm:p-5 rounded-2xl bg-[#0B1E3F] border border-[#0095A8]/20 shadow-xs">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#0095A8]/20 flex items-center justify-center shrink-0 text-[#0095A8]">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">B2B Sourcing</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Dedicated equipment supply and parts identification for marine fleets and plants.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:gap-3.5 p-3 sm:p-5 rounded-2xl bg-[#0B1E3F] border border-[#0095A8]/20 shadow-xs">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#0095A8]/20 flex items-center justify-center shrink-0 text-[#0095A8]">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">Spec Review</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                We review technical drawings, part numbers, and serials for exact fit.
              </p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-start gap-2.5 sm:gap-3.5 p-3 sm:p-5 rounded-2xl bg-[#0B1E3F] border border-[#0095A8]/20 shadow-xs">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#0095A8]/20 flex items-center justify-center shrink-0 text-[#0095A8]">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">Fast Quotations</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Submit your BOM or urgent part requirement for structured commercial terms.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns - 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10">
          
          {/* Brand & Overview */}
          <div className="col-span-2 space-y-3 sm:space-y-4">
            <Logo size="md" variant="white" />
            <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed max-w-sm">
              Tawwakal Automation supports marine, shipping, engineering, manufacturing, and industrial facilities with verified equipment, ship spare parts, automation components, and supply assistance.
            </p>
            <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
                <a href="tel:+916356547827" className="hover:text-[#0095A8] transition-colors font-medium">
                  +91 6356547827
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
                <a href="mailto:sales@tawwakalautomation.com" className="hover:text-[#0095A8] transition-colors font-medium">
                  sales@tawwakalautomation.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
                <span>Bhavnagar / Alang &amp; Global Supply Hub</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="col-span-1">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0095A8] mb-2 sm:mb-4">
              Products
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs">
              {productLinks.map((link) => (
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

          {/* Company Column */}
          <div className="col-span-1">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0095A8] mb-2 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs">
              {companyLinks.map((link) => (
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

          {/* Procurement Column */}
          <div className="col-span-2 lg:col-span-1 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-white/10 lg:border-t-0">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0095A8] mb-2 sm:mb-4">
              Procurement
            </h3>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              {procurementLinks.map((link) => (
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
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] text-white/50 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Tawwakal Automation. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Supply
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
