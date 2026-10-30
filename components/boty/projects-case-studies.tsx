"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import TawakkalBackground from "@/components/TawakkalBackground"

export function ProjectsCaseStudies() {
  const cases = [
    {
      title: "Container Vessel Main Engine Governor Retrofit",
      category: "Marine Propulsion Automation",
      image: "/engine-maintenance-new.png",
      summary: "Urgent sourcing and bench-testing of Woodward electronic governor assembly for a 4,200 TEU container carrier facing port detention in Dubai.",
      metrics: ["Delivered in 36 Hours", "100% Bench Calibrated", "IMO Compliant"],
      equipment: "Woodward PGA-EG Actuator & Digital Controller"
    },
    {
      title: "Cement Plant Heavy VFD Drive Replacement",
      category: "Industrial Power Conversion",
      image: "/industrial-electronics-new.png",
      summary: "Identified and tested obsolete ABB ACS800 series 400kW frequency inverter module to restore continuous rotary kiln production line.",
      metrics: ["Zero Plant Recabling", "Plug-and-Play Match", "12M Warranty"],
      equipment: "ABB ACS800-04 Inverter Drive Module"
    },
    {
      title: "Oil Tanker Navigation Radar Transceiver Supply",
      category: "Bridge Navigational Systems",
      image: "/marine-automation.png",
      summary: "Supply of tested Furuno X-band radar transceiver unit and antenna gearbox to Greek fleet management superintendent during Fujairah bunkering stop.",
      metrics: ["Portside Express Delivery", "Serial Plate QC Check", "Verified Working"],
      equipment: "Furuno FAR Series X-Band Transceiver Unit"
    }
  ]

  return (
    <section className="ta-section py-8 sm:py-20 border-b border-[#CBD5E1]" id="case-studies">
      {/* Reusable Tawakkal Soft Marine Background */}
      <TawakkalBackground variant="soft" />

      <div className="ta-content relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
              <span>VERIFIED SUPPLY CASES</span>
            </div>

            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
              PROJECTS &amp; SOURCING HIGHLIGHTS
            </h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              Real-world procurement and rapid dispatch cases solving critical downtime across marine fleets and industrial production facilities.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#061D45] hover:bg-[#0095A8] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs self-start md:self-auto shrink-0"
          >
            <span>Submit RFQ Case</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Case Study Cards - 2 cols on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className={`group flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#CBD5E1] hover:border-[#0095A8] hover:shadow-xl transition-all duration-300 overflow-hidden shadow-[0_3px_12px_rgba(6,29,69,0.05)] hover:-translate-y-1 ${
                idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
              }`}
            >
              {/* Media Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EDF6FC]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061D45]/70 via-transparent to-transparent" />
                
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 bg-white/95 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/60 shadow-xs max-w-[85%]">
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#0095A8] block truncate">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                <div>
                  <h3 className="font-sans text-xs sm:text-base font-bold text-[#061D45] group-hover:text-[#0095A8] transition-colors uppercase tracking-tight leading-tight mb-1 sm:mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-foreground/80 leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                    {item.summary}
                  </p>

                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#EDF6FC] border border-[#CBD5E1] text-[9.5px] sm:text-[11px] text-[#061D45] font-semibold mb-2 sm:mb-4">
                    <span className="text-[8px] sm:text-[9.5px] uppercase font-bold text-muted-foreground block truncate">Hardware:</span>
                    <span className="line-clamp-1">{item.equipment}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.metrics.slice(0, 2).map((m, mIdx) => (
                      <span key={mIdx} className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0095A8]/10 text-[#0095A8] text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>{m}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F5F9]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#061D45] group-hover:text-[#0095A8] transition-colors"
                  >
                    <span>Request Sourcing</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
