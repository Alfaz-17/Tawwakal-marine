"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export function SEOIntro() {
  const pillars = [
    {
      num: "01",
      title: "Marine & Ship Spare Parts",
      desc: "Supplying main & auxiliary engine spares, turbochargers, valves, purifiers, and bridge systems."
    },
    {
      num: "02",
      title: "Industrial Automation Spares",
      desc: "Sourcing programmable logic controllers (PLCs), HMIs, variable speed drives, sensors, and legacy automation modules."
    },
    {
      num: "03",
      title: "Rigorous Technical Review",
      desc: "Every enquiry is verified against technical drawings, part numbers, and equipment serials prior to quotation."
    },
    {
      num: "04",
      title: "Streamlined B2B Quotations",
      desc: "Fast, transparent RFQ turnarounds tailored for ship managers, plant engineers, and procurement teams."
    }
  ]

  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden" id="about">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading — Exact match to screenshot "ABOUT US" */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-[-0.035em] text-primary uppercase text-center mb-10 sm:mb-14"
        >
          ABOUT US
        </motion.h2>

        {/* Grand Showcase Card matching the wide card in the screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[36px] bg-white border border-black/[0.08] shadow-[0_10px_35px_rgba(11,21,59,0.06)] overflow-hidden"
        >
          {/* Top Visual Showcase within Card */}
          <div className="relative h-[300px] sm:h-[420px] w-full overflow-hidden">
            <Image
              src="/engine-room.png"
              alt="Marine and Industrial Operations"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-medium tracking-widest uppercase mb-3 inline-block">
                Industrial &amp; Maritime Partner
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                Engineered Supply For Critical Infrastructure
              </h3>
            </div>
          </div>

          {/* Lower Editorial Grid */}
          <div className="p-8 sm:p-12 lg:p-14">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-5 space-y-5">
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-normal">
                  <strong className="text-primary font-semibold">Tawwakal Automation</strong> supports shipowners, engineering contractors, 
                  and manufacturing plants with verified machinery, replacement spares, and automation products.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Our approach begins with a deep technical review of your requirement: checking exact part numbers, 
                  specifications, and operating conditions to supply verified, dependable solutions without delays.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="rounded-full bg-primary hover:bg-accent text-white px-7 py-3 text-xs font-medium tracking-wide uppercase transition-all duration-300 shadow-xs inline-flex items-center gap-2"
                  >
                    <span>Company Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/contact"
                    className="rounded-full bg-[#EAE7DF] hover:bg-primary text-primary hover:text-white px-7 py-3 text-xs font-medium tracking-wide uppercase transition-all duration-300"
                  >
                    Request Quotation
                  </Link>
                </div>
              </div>

              {/* Right Column: 4 Numbered Pillars */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.num}
                    className="rounded-[20px] bg-background border border-black/[0.05] p-5 hover:border-black/[0.12] transition-all duration-300"
                  >
                    <div className="font-display text-2xl font-black text-primary/80 mb-2">
                      {pillar.num}
                    </div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
