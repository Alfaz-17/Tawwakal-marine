"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Ship, Factory, Fuel, Anchor, Zap, ArrowRight, ShieldCheck } from "lucide-react"
import { SectionDecorations } from "@/components/common/section-decorations"

export function IndustriesServed() {
  const industries = [
    {
      title: "Commercial Shipping & Fleets",
      desc: "Container carriers, bulk vessels, and chemical tankers requiring IMO-compliant propulsion, auxiliary, and safety automation spares.",
      icon: Ship,
      image: "/global-fleet-new.png",
      tag: "Maritime Marine"
    },
    {
      title: "Shipyards & Vessel Drydocks",
      desc: "Immediate availability of emergency control spares, retrofit replacement modules, and electrical assemblies during repair cycles.",
      icon: Anchor,
      image: "/engine-room.png",
      tag: "Docking & Retrofit"
    },
    {
      title: "Offshore Exploration & Rigs",
      desc: "Hazardous-area certified instrumentation, hydraulic valve controllers, and heavy-duty AC drives for offshore platforms.",
      icon: Fuel,
      image: "/categories-bg.jpg",
      tag: "Offshore Energy"
    },
    {
      title: "Continuous Process Manufacturing",
      desc: "Chemical, cement, paper, and steel production plants utilizing high-reliability PLCs, HMIs, and variable frequency motor drives.",
      icon: Factory,
      image: "/industrial-electronics-new.png",
      tag: "Industrial Plants"
    },
    {
      title: "Power Generation & Utilities",
      desc: "Turbine governor controls, generator protection switchgear, excitation spares, and process telemetry hardware.",
      icon: Zap,
      image: "/spare-parts.png",
      tag: "Energy & Utilities"
    }
  ]

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-white border-b border-[#E2E8F0]" id="industries">
      {/* Decorative Wave Flow */}
      <SectionDecorations variant="light-wave" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-2">
            <span>SECTOR FOCUS</span>
            </div>

          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
            INDUSTRIES WE SERVE
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Delivering mission-critical hardware and procurement intelligence to capital-intensive marine and industrial operations.
          </p>
        </div>

        {/* 5 Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon
            return (
              <div
                key={idx}
                className="group flex flex-col bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#0095A8] hover:shadow-xl transition-all duration-300 overflow-hidden shadow-2xs hover:-translate-y-1"
              >
                {/* Media Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EDF6FC]">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061D45]/70 via-[#061D45]/15 to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md text-[#0095A8] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5 text-[#0095A8]" />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0095A8]">Industry Sector</span>
                    <h3 className="text-sm font-black uppercase tracking-tight">{ind.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-foreground/80 leading-relaxed mb-4">
                    {ind.desc}
                  </p>

                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#0095A8]">
                      {ind.tag}
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#061D45] group-hover:text-[#0095A8] transition-colors"
                    >
                      <span>Supply Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Sourcing Summary Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#061D45] to-[#0A2B66] text-white flex flex-col justify-between shadow-md border border-white/10">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#0095A8]/20 text-[#0095A8] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0095A8] block mb-1">
                B2B Sourcing Network
              </span>
              <h3 className="font-sans text-base sm:text-lg font-black uppercase tracking-tight text-white mb-2">
                Need Fast Marine or Plant Sourcing?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Connect directly with our engineering desk in Bhavnagar for part number verification, alternative models, and port-side express air dispatch.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0095A8] hover:bg-[#007b8a] text-white py-2.5 px-5 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Request B2B Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

