import Link from 'next/link'
import { ArrowLeft, Search, Layers, Cpu, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Page Not Found (404) | Tawwakal Automation',
  description: 'The requested page could not be found. Explore our catalog of marine equipment, PLCs, drives, and industrial automation spares.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-xl w-full text-center">
        {/* Error Code Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#008C95]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#008C95] mb-6">
          <span>Error 404 · Page Not Found</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B153B] uppercase tracking-tight mb-4">
          Part or Page Unavailable
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          The requested technical specification or product page may have been relocated, archived, or is being updated in our stock database.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0095A8] hover:bg-[#007b8a] text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>Search Catalog</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B153B] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* Quick Links Card */}
        <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 text-left">
          <div className="text-xs font-extrabold text-[#0B153B] uppercase tracking-wider mb-3">
            Popular Navigation Hubs:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <Link href="/products?category=plc-systems" className="hover:text-[#008C95] transition-colors py-1 flex items-center gap-1.5">
              <span>&rarr;</span> PLC Systems &amp; Modules
            </Link>
            <Link href="/products?category=vfd-drives" className="hover:text-[#008C95] transition-colors py-1 flex items-center gap-1.5">
              <span>&rarr;</span> Variable Frequency Drives
            </Link>
            <Link href="/products?category=marine-radar" className="hover:text-[#008C95] transition-colors py-1 flex items-center gap-1.5">
              <span>&rarr;</span> Marine Radar &amp; Telecom
            </Link>
            <Link href="/brands" className="hover:text-[#008C95] transition-colors py-1 flex items-center gap-1.5">
              <span>&rarr;</span> Browse All 300+ Brands
            </Link>
            <Link href="/contact" className="hover:text-[#008C95] transition-colors py-1 flex items-center gap-1.5">
              <span>&rarr;</span> Submit RFQ / Enquiry
            </Link>
            <Link href="/about" className="hover:text-[#008C95] transition-colors py-1 flex items-center gap-1.5">
              <span>&rarr;</span> About Stockist &amp; Facility
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

