"use client"

import { FileText, SearchCheck, CheckCircle2, Truck, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Testimonials() {
  const steps = [
    {
      step: "01",
      title: "Submit Your Requirement",
      desc: "Share your equipment model, part number, or technical drawings through our online portal or direct email.",
      icon: FileText
    },
    {
      step: "02",
      title: "Technical Review",
      desc: "Our engineers review specifications, compatibility, and availability across our verified inventory and network.",
      icon: SearchCheck
    },
    {
      step: "03",
      title: "Receive Formal Quotation",
      desc: "We provide structured commercial terms detailing price, equipment condition, lead times, and dispatch schedule.",
      icon: CheckCircle2
    },
    {
      step: "04",
      title: "Coordination & Dispatch",
      desc: "Upon confirmation, equipment is inspected, packed securely, and dispatched with full shipping documentation.",
      icon: Truck
    }
  ]

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-4">
            <span>Predictable Procurement</span>
            </div>
          
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-[-0.035em] text-primary uppercase leading-[0.92]">
            QUOTATION PROCESS
          </h2>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            A transparent four-step workflow built to minimize operational downtime and verify compatibility upfront.
          </p>
        </div>

        {/* 4-Step Grid with modern studio cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((st, idx) => {
            const Icon = st.icon

            return (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-[32px] bg-white border border-black/[0.06] hover:border-black/[0.15] p-8 shadow-xs hover:shadow-[0_20px_45px_rgba(11,21,59,0.08)] transition-all duration-500 hover:-translate-y-1 relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-muted/60 text-primary text-[10px] font-bold uppercase tracking-wider">
                    Step {st.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-primary uppercase tracking-tight mb-3">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {st.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="rounded-full bg-primary hover:bg-accent text-white px-8 py-3.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm inline-flex items-center gap-2"
          >
            <span>Start a Quotation Request</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
