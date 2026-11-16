"use client"

import React from "react"
import { ShieldCheck, Compass, Clock, Award, FileSearch, CheckCircle2 } from "lucide-react"
import TawakkalBackground from "@/components/TawakkalBackground"

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Direct Bhavnagar & Alang Warehouse",
      desc: "Large ready stock of genuine surplus equipment, marine spares, and industrial automation components.",
      icon: Compass,
      stat: "Ready Stock"
    },
    {
      title: "Tested Before Dispatch",
      desc: "Every part is inspected and tested by technicians before packing. You receive working parts with real photos.",
      icon: ShieldCheck,
      stat: "Tested Parts"
    },
    {
      title: "Fast Worldwide Shipping",
      desc: "Dispatched within 24 to 48 hours via DHL, FedEx, or air cargo with live tracking directly to your vessel or plant.",
      icon: Clock,
      stat: "24-48h Dispatch"
    },
    {
      title: "1-Year Replacement Warranty",
      desc: "All tested items include a full 1-year replacement warranty so you can install and operate with peace of mind.",
      icon: Award,
      stat: "1-Year Warranty"
    },
    {
      title: "Hard-to-Find & Obsolete Parts",
      desc: "Need a discontinued or legacy model? We maintain a deep stock of rare parts that are out of stock with distributors.",
      icon: FileSearch,
      stat: "Rare Spares"
    },
    {
      title: "Fast Quotes & Actual Photos",
      desc: "Quick turnaround on inquiries with actual part photos, confirmed serial numbers, and clear pricing.",
      icon: CheckCircle2,
      stat: "Fast Response"
    }
  ]

  return (
    <section className="py-8 sm:py-20 bg-[#061D45] text-white border-b border-[#0095A8]/25 relative overflow-hidden" id="why-us">
      {/* Reusable Tawakkal Dark Marine Background */}
      <TawakkalBackground variant="dark" />

      <div className="ta-content relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <span>BUY WITH CONFIDENCE</span>
          </div>

          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            WHY CHOOSE TAWWAKAL MARINE
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Reliable marine and industrial automation spares with verified testing, fast delivery, and guaranteed warranty.
          </p>
        </div>

        {/* 6 Reasons Grid - 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0B1E3F] border border-[#0095A8]/25 hover:border-[#0095A8] hover:bg-[#0E2752] transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4 gap-1">
                    <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#0095A8]/20 border border-[#0095A8]/40 text-[#0095A8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#0095A8]" />
                    </div>
                    <span className="text-[7.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#00C9DB] bg-[#0095A8]/15 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#0095A8]/30 truncate">
                      {item.stat}
                    </span>
                  </div>

                  <h3 className="font-sans text-[11.5px] sm:text-base font-bold text-white uppercase tracking-tight mb-1 sm:mb-2 leading-tight line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-[#0095A8]/20 flex items-center gap-1.5 text-[8.5px] sm:text-[10.5px] font-bold text-[#0095A8] uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-[#0095A8] shrink-0" />
                  <span className="truncate">Guaranteed Service</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
