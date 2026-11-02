import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms of Supply & Warranty | Tawwakal Automation',
  description: 'Standard commercial supply terms, bench test verification, 12-month technical warranty, and worldwide air delivery policies with Tawwakal Automation.',
  alternates: {
    canonical: 'https://tawwakalautomation.com/terms',
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Terms of Supply', href: '/terms' }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#008C95]/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#008C95] mb-4">
            <span>Commercial Terms &amp; Warranty Guidelines</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#0B153B] uppercase tracking-tight mb-6">
            Terms of Supply &amp; Technical Warranty
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Effective Date: November 2026 · Tawwakal Automation (Bhavnagar / Alang Hub, India)
          </p>

          <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                1. Quotations, Pricing &amp; Proforma
              </h2>
              <p>
                All commercial quotations are provided in US Dollars (USD) or Euros (EUR) on an Ex-Works (EXW), FOB, or CIF port delivery basis. Quotations remain valid for 14 calendar days from date of issue due to rapid turnover of specialized marine automation stock.
              </p>
            </section>

            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                2. Bench Testing &amp; Quality Guarantee
              </h2>
              <p>
                Every module, PLC rack, drive inverter, and sensor undergoes rigorous simulation testing on specialized test benches prior to release. Live video simulation proof and high-resolution inspection photos are provided to the buyer before final dispatch.
              </p>
            </section>

            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                3. Technical Warranty Policy
              </h2>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                <li><strong className="text-slate-800">Refurbished &amp; Surplus Tested Equipment:</strong> Covered by our 12-Month Technical Replacement / Repair Warranty.</li>
                <li><strong className="text-slate-800">Brand New Sealed Equipment:</strong> Covered by standard factory specifications and original manufacturer seal integrity.</li>
                <li>Warranty covers functional electronic defects under normal operating conditions. Damage caused by improper vessel power surges, incorrect wiring, or moisture ingress is excluded.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                4. Worldwide Air Freight &amp; Customs
              </h2>
              <p>
                Stock items are dispatched within 24 to 48 hours via express international carriers (DHL Express, FedEx Priority, Emirates SkyCargo, Qatar Cargo) directly to major commercial airports and ports worldwide. All items are packed in heavy-duty, anti-static, shock-proof export crating.
              </p>
            </section>

            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                5. Returns &amp; Claims
              </h2>
              <p>
                In the rare event of a transit defect or specification mismatch, notice must be communicated within 7 days of delivery with bench testing logs. Approved returns are promptly replaced with an identical tested unit or issued a commercial credit.
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link href="/" className="text-xs font-bold text-[#008C95] hover:underline flex items-center gap-1">
              &larr; Return to Homepage
            </Link>
            <Link href="/contact" className="text-xs font-bold text-slate-600 hover:text-[#008C95]">
              Request a Commercial Quote &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
