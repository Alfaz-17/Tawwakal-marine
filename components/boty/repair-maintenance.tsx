"use client"

import React from "react"
import Link from "next/link"
import { Wrench, Settings, RefreshCw, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react"
import { SectionDecorations } from "@/components/common/section-decorations"

export function RepairMaintenance() {
  const capabilities = [
    {
      title: "Bench Testing & Diagnostics",
      desc: "Full hardware component-level test on dedicated simulation rigs before packing, verifying I/O channels, communications, and power integrity.",
      icon: Settings,
      tag: "Pre-Dispatch QC"
    },
    {
      title: "Legacy System Retrofit Support",
      desc: "Engineering support to replace discontinued or phased-out PLC and VFD units with compatible active models without recabling entire panels.",
      icon: RefreshCw,
      tag: "Obsolescence Management"
    },
    {
      title: "Instrumentation Verification",
      desc: "Static and dynamic signal checking of marine transmitters, pressure switches, level sensors, and oil mist detectors.",
      icon: Wrench,
      tag: "Specification Matching"
    },
    {
      title: "Urgent Vessel Sourcing Desk",
      desc: "Rapid location of hard-to-find marine spares with priority packing and express courier dispatch directly to major global seaports.",
      icon: AlertTriangle,
      tag: "Vessel Support"
    }
  ]

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-[#061D45] text-white border-b border-white/10" id="maintenance">
      {/* Decorative Wave & Contrast Curves for Navy Background */}
      <SectionDecorations variant="navy-curves" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-2">
            <span>ENGINEERING ASSURANCE</span>
            </div>

          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            REPAIR, TESTING &amp; RETROFIT SOURCING
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            Reliability-driven processes ensuring every component meets stringent operational standards prior to shipment.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#0095A8] hover:bg-white/10 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0095A8]/15 border border-[#0095A8]/30 text-[#0095A8] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-[#0095A8]" />
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0095A8] block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="font-sans text-base font-bold text-white uppercase tracking-tight leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-white/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-[#0095A8] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>QC Verified Standard</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner inside section */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
              Need assistance identifying an obsolete or damaged card?
            </h4>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Send our technical team a photograph of your equipment nameplate, serial number, or wiring diagram.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-[#0095A8] hover:bg-[#007b8a] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs flex items-center gap-2"
          >
            <span>Send Part Nameplate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}

