import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy | Tawwakal Automation',
  description: 'Privacy Policy and data confidentiality guidelines for commercial inquiries, RFQ submissions, and marine supply orders with Tawwakal Automation.',
  alternates: {
    canonical: 'https://tawwakalautomation.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy' }]} />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#008C95]/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#008C95] mb-4">
            <span>Data Protection &amp; Confidentiality</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#0B153B] uppercase tracking-tight mb-6">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: November 2026 · Tawwakal Automation (Bhavnagar / Alang, Gujarat, India)
          </p>

          <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                1. Commercial Information We Collect
              </h2>
              <p>
                When submitting a Request for Quotation (RFQ), spare parts enquiry, or technical order, Tawwakal Automation collects business information necessary for commercial fulfillment, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                <li>Contact person name, official company name, and vessel / facility identification.</li>
                <li>Corporate email address and direct telephone / WhatsApp numbers.</li>
                <li>Manufacturer part numbers, required technical specifications, and delivery destination ports.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                2. How We Use Your Commercial Data
              </h2>
              <p>
                Your information is used strictly to prepare proforma invoices, verify hardware compatibility, arrange port-side air freight, and communicate order tracking updates. We do not sell, rent, or trade your corporate information to third-party marketing brokers.
              </p>
            </section>

            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                3. Confidentiality &amp; RFQ Security
              </h2>
              <p>
                All vessel machinery specifications, system configuration files, and commercial quotations shared with Tawwakal Automation are treated with strict commercial confidentiality.
              </p>
            </section>

            <section>
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">
                4. Contacting Data Protection Officer
              </h2>
              <p>
                For questions regarding data confidentiality or to request deletion of your commercial enquiry history, contact us directly at:
              </p>
              <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-[#0B153B]">Tawwakal Automation Compliance</p>
                <p className="text-slate-600">Email: <a href="mailto:sales@tawwakalautomation.com" className="text-[#008C95] font-semibold underline">sales@tawwakalautomation.com</a></p>
                <p className="text-slate-600">Phone: <a href="tel:+916356547827" className="text-[#008C95] font-semibold">+91 6356547827</a></p>
                <p className="text-slate-600">Location: Near Alang Ship Breaking Yard, Bhavnagar, Gujarat 364001, India</p>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link href="/" className="text-xs font-bold text-[#008C95] hover:underline flex items-center gap-1">
              &larr; Return to Homepage
            </Link>
            <Link href="/terms" className="text-xs font-bold text-slate-600 hover:text-[#008C95]">
              View Terms of Supply &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

