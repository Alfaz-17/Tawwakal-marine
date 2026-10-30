"use client"

import { Ship, Factory, Wrench, Cpu, Truck, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function FeatureSection() {
  const industries = [
    {
      num: "01",
      title: "Marine & Shipping",
      icon: Ship,
      desc: "Commercial cargo vessels, container ships, tankers, tugboats, and port support craft requiring operational spare parts and bridge equipment.",
      points: ["Engine room machinery spares", "Deck & cargo handling components", "Bridge navigation & alarm modules"]
    },
    {
      num: "02",
      title: "Industrial Manufacturing",
      icon: Factory,
      desc: "Continuous-process manufacturing plants, chemical processing facilities, textile mills, and production operations requiring reliable pumps, drives, and valves.",
      points: ["Heavy process pumps & valves", "Industrial electric motors", "Hydraulic power packs & cylinders"]
    },
    {
      num: "03",
      title: "Engineering & Maintenance",
      icon: Wrench,
      desc: "Contracting engineering firms, overhaul workshops, and facility maintenance teams managing routine turnarounds and unexpected breakdowns.",
      points: ["Turnaround replacement spares", "Refurbished machinery components", "Sourcing for legacy systems"]
    },
    {
      num: "04",
      title: "Electrical & Automation",
      icon: Cpu,
      desc: "System integrators, panel builders, and industrial automation engineers working with PLCs, HMIs, drives, and control panels.",
      points: ["PLC hardware & I/O cards", "Variable frequency drives (VFDs)", "Instrumentation & telemetry sensors"]
    },
    {
      num: "05",
      title: "Equipment Distribution",
      icon: Truck,
      desc: "Regional distributors, supply houses, and procurement agents looking for reliable wholesale sourcing and trade assistance.",
      points: ["Bulk equipment enquiries", "Export documentation support", "Dependable supplier relationships"]
    }
  ]

  return (
    <section id="industries" className="py-24 sm:py-32 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-4">
            <span>Market Focus</span>
            </div>
          
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-[-0.035em] text-primary uppercase leading-[0.92]">
            INDUSTRIES SERVED
          </h2>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Supporting technical procurement teams across critical commercial sectors where uptime, equipment reliability, and specification accuracy are paramount.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon

            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-[32px] bg-white border border-black/[0.06] hover:border-black/[0.15] p-8 shadow-xs hover:shadow-[0_20px_45px_rgba(11,21,59,0.08)] transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-display text-xl font-bold text-muted-foreground/60">
                      {ind.num}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-primary uppercase tracking-tight mb-3">
                    {ind.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/[0.05] space-y-2">
                  {ind.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}

          {/* 6th Card: Sourcing Callout Card */}
          <div className="rounded-[32px] bg-primary text-white p-8 flex flex-col justify-between shadow-xl">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-accent text-[10px] font-bold tracking-widest uppercase inline-block mb-6">
                Custom Requirements
              </span>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">
                Need Support For Another Sector?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8">
                Our sourcing network handles bespoke requests across power generation, offshore facilities, and heavy industrial applications.
              </p>
            </div>

            <Link
              href="/contact"
              className="rounded-full bg-white text-primary hover:bg-accent hover:text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center inline-flex items-center justify-center gap-2"
            >
              <span>Submit Sourcing RFQ</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
