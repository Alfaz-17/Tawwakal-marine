"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import TawakkalBackground from "@/components/TawakkalBackground"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "Are your products tested before shipping?",
      a: "Yes, we check and test all industrial automation components and marine spare parts on specialized test benches before shipping to verify proper I/O communication, voltage tolerance, and processor load. We also provide recorded video proof upon request and pack each unit securely for international transit."
    },
    {
      q: "How can I search for products by exact part number?",
      a: "Simply enter your exact manufacturer part number (e.g., 6ES7315-2EH14-0AB0, 1756-L73, or ACS800) into our search bar. Our system searches across exact part numbers, model designations, and brand names simultaneously. If a part isn't listed, use our Rapid RFQ bar to request an immediate sourcing check."
    },
    {
      q: "What condition are the parts in (surplus, refurbished, new)?",
      a: "We maintain clear condition grading for all inventory: Brand New Factory Sealed (original packaging), New Surplus / Open Box (unused), and 100% Bench-Tested Refurbished units carefully salvaged from modernized plants and decommissioned vessels at the Alang Ship Breaking Yard."
    },
    {
      q: "How fast can you deliver to vessel berths or global ports?",
      a: "Emergency vessel orders are packed and dispatched within 24 to 48 hours. We partner with DHL Express, FedEx Priority, and air cargo networks to deliver directly to ship berths and factories in Singapore, Rotterdam, Dubai, Houston, Antwerp, and across India."
    },
    {
      q: "Can you source obsolete or discontinued automation modules?",
      a: "Yes, this is our core specialization. Because of our location in the Bhavnagar & Alang ship-recycling hub, we stock thousands of hard-to-find and discontinued PLCs (Siemens S7-200/300/400, Allen-Bradley SLC/PLC-5), legacy HMIs (Pro-face, Hakko), and obsolete Danfoss drives."
    },
    {
      q: "What warranty and replacement support do you provide?",
      a: "All refurbished and tested components carry a 6 to 12-month technical replacement warranty. If any verified defect arises during installation or commissioning, we offer immediate replacement or a full commercial refund."
    }
  ]

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="ta-section py-8 sm:py-20 border-b border-[#CBD5E1]" id="faq">
      {/* Reusable Tawakkal Soft Marine Background */}
      <TawakkalBackground variant="soft" />

      <div className="ta-content relative z-10 max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#0095A8]" />
            <span>TRANSPARENT PROCUREMENT GUIDELINES</span>
          </div>
          
          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Essential information regarding testing protocols, delivery timelines, part number verification, and warranty terms.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <div 
                key={idx}
                className="rounded-xl sm:rounded-2xl bg-white border border-[#CBD5E1] shadow-[0_3px_12px_rgba(6,29,69,0.04)] overflow-hidden transition-all duration-200 hover:border-[#0095A8]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-3 px-3.5 sm:py-5 sm:px-6 text-left flex items-center justify-between gap-3 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-[11.5px] sm:text-sm font-bold text-[#061D45] group-hover:text-[#0095A8] transition-colors leading-tight">
                    {faq.q}
                  </span>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#EDF6FC] border border-[#CBD5E1] flex items-center justify-center text-[#061D45] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 bg-[#0095A8] text-white border-transparent" : ""}`}>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-3.5 pb-3.5 pt-1 sm:px-6 sm:pb-5 text-[11px] sm:text-sm text-muted-foreground leading-relaxed border-t border-[#F1F5F9]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Support Link */}
        <div className="mt-5 sm:mt-8 text-center text-[11px] sm:text-xs text-muted-foreground">
          <span>Still have questions about a specific component? </span>
          <Link href="/contact" className="font-bold text-[#0095A8] hover:underline uppercase tracking-wider inline-flex items-center gap-1">
            <span>Contact Technical Desk</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </section>
  )
}
