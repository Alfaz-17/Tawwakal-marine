"use client"

import React from "react"
import { ShieldCheck, Compass, Clock, Award, FileSearch, CheckCircle2 } from "lucide-react"
import TawakkalBackground from "@/components/TawakkalBackground"

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Direct Warehouse Supply",
      icon: Compass,
      stat: "In Stock"
    },
    {
      title: "Tested Before Dispatch",
      icon: ShieldCheck,
      stat: "Quality Check"
    },
    {
      title: "Fast Worldwide Shipping",
      icon: Clock,
      stat: "24-48h Dispatch"
    },
    {
      title: "Secure Export Packaging",
      icon: Award,
      stat: "Safe Transit"
    },
    {
      title: "Hard-to-Find & Obsolete Parts",
      icon: FileSearch,
      stat: "Rare Spares"
    },
    {
      title: "Fast Quotes & Actual Photos",
      icon: CheckCircle2,
      stat: "Fast Response"
    }
  ]

  return (
    <section className="py-8 sm:py-16 bg-[#061D45] text-white border-b border-[#0095A8]/25 relative overflow-hidden" id="why-us">
      {/* Reusable Tawakkal Dark Marine Background */}
      <TawakkalBackground variant="dark" />

      <div className="ta-content relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header - Title only, no description */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <span>BUY WITH CONFIDENCE</span>
          </div>

          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            WHY CHOOSE TAWWAKAL MARINE
          </h2>
        </div>

        {/* 6 Reasons Grid - Clean, Card without text description */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {reasons.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group p-3 sm:p-5 rounded-2xl bg-[#0B1E3F] border border-[#0095A8]/25 hover:border-[#0095A8] hover:bg-[#0E2752] transition-all duration-300 flex flex-col justify-between shadow-md"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3 gap-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#0095A8]/20 border border-[#0095A8]/40 text-[#0095A8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0095A8]" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#00C9DB] bg-[#0095A8]/15 px-2 py-0.5 rounded-full border border-[#0095A8]/30 truncate">
                    {item.stat}
                  </span>
                </div>

                <h3 className="font-sans text-[12px] sm:text-base font-bold text-white uppercase tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
