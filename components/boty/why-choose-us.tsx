"use client"

import React from "react"
import { ShieldCheck, Compass, Clock, Award, FileSearch, CheckCircle2 } from "lucide-react"
import TawakkalBackground from "@/components/TawakkalBackground"

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Strategic Maritime Corridor",
      desc: "Direct physical presence at the world-renowned Bhavnagar and Alang hub, unlocking genuine marine machinery and heavy industrial surplus.",
      icon: Compass,
      stat: "Direct Stock"
    },
    {
      title: "100% Bench Tested & QC Verified",
      desc: "Every electronic board, drive, and PLC module undergoes static and live electrical testing on dedicated simulation racks prior to dispatch.",
      icon: ShieldCheck,
      stat: "Zero Failure QC"
    },
    {
      title: "24–48h Rapid Seaport Dispatch",
      desc: "Urgent marine requisition fulfillment with international air courier tracking to ports in Singapore, Rotterdam, Dubai, and Houston.",
      icon: Clock,
      stat: "Priority Airfreight"
    },
    {
      title: "12-Month Replacement Warranty",
      desc: "Standard 1-year warranty on all pre-owned tested modules, providing superintendents and engineers complete commercial peace of mind.",
      icon: Award,
      stat: "12M Assurance"
    },
    {
      title: "Legacy & Obsolete Matching",
      desc: "Specialized engineering desk capable of cross-referencing discontinued part numbers, firmware versions, and pinout-compatible replacements.",
      icon: FileSearch,
      stat: "BOM Solving"
    },
    {
      title: "B2B Commercial Reliability",
      desc: "Fully structured quotation dossiers with photographic documentation, verified serial plates, and formal commercial invoicing.",
      icon: CheckCircle2,
      stat: "Full Audit Trail"
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
            <span>ENGINEERING INTEGRITY</span>
          </div>

          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            WHY INDUSTRY LEADERS TRUST TAWWAKAL
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Delivering uncompromised quality, verified specifications, and technical accountability to marine and industrial operators worldwide.
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0095A8] animate-pulse shrink-0" />
                  <span className="truncate">Verified Capability</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
