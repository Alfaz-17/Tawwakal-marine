"use client"

import { Search, ShieldCheck, FileText, Plane, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import TawakkalBackground from "@/components/TawakkalBackground"

export function EasyBuyingProcess() {
  const steps = [
    {
      step: "01",
      title: "Discover & Inquire",
      desc: "Input your exact part number, OEM model, or equipment nameplate from Siemens, ABB, Danfoss, or Woodward.",
      icon: Search
    },
    {
      step: "02",
      title: "Bench-Test Verification",
      desc: "Every electronic module undergoes 100% bench and I/O testing on simulation racks to verify operational readiness.",
      icon: ShieldCheck
    },
    {
      step: "03",
      title: "Instant Commercial RFQ",
      desc: "Receive structured proforma terms detailing condition, exact pricing, customs codes, and dispatch timelines within 2 hours.",
      icon: FileText
    },
    {
      step: "04",
      title: "Express Worldwide Dispatch",
      desc: "Secure shockproof export packaging with express dispatch via DHL, FedEx, or air freight directly to your plant or vessel berth.",
      icon: Plane
    }
  ]

  return (
    <section id="buying-process" className="ta-section py-8 sm:py-20 border-b border-[#CBD5E1]">
      {/* Reusable Tawakkal Light Marine Background */}
      <TawakkalBackground variant="light" />

      <div className="ta-content relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <span>TRANSPARENT PROCUREMENT WORKFLOW</span>
          </div>
          
          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
            OUR WORKING PROCESS
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From technical part identification to bench simulation and port-side express air dispatch in 4 reliable steps.
          </p>
        </div>

        {/* 4-Step Cards Grid - 2 cols on mobile */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {/* Subtle Horizontal Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 border-t border-dashed border-[#0095A8]/30 -z-0" aria-hidden="true" />

          {steps.map((st, idx) => {
            const Icon = st.icon

            return (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="rounded-2xl sm:rounded-3xl bg-white border border-[#CBD5E1] hover:border-[#0095A8] p-3 sm:p-6 shadow-[0_3px_12px_rgba(6,29,69,0.05)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-5">
                    <span className="font-mono text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#061D45] text-white shadow-2xs">
                      {st.step}
                    </span>
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#0095A8]/10 text-[#0095A8] flex items-center justify-center group-hover:bg-[#0095A8] group-hover:text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  <h3 className="font-sans text-xs sm:text-base font-bold text-[#061D45] group-hover:text-[#0095A8] transition-colors uppercase tracking-tight mb-1 sm:mb-2 leading-tight line-clamp-2">
                    {st.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-2 pt-2 sm:mt-4 sm:pt-3 border-t border-[#F1F5F9] flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#0095A8]">
                  <span>Step {st.step} of 04</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 sm:mt-10 text-center">
          <Link
            href="/contact"
            className="rounded-full bg-[#0095A8] hover:bg-[#007b8a] text-white px-5 sm:px-7 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs inline-flex items-center gap-1.5 sm:gap-2"
          >
            <span>Start an Equipment Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
