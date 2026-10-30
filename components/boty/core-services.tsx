"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Anchor, Cpu, Zap, ArrowRight, CheckCircle2 } from "lucide-react"
import { SectionDecorations } from "@/components/common/section-decorations"

export function CoreServices() {
  const services = [
    {
      title: "Marine Automation",
      subtitle: "Vessel Propulsion, Navigation & Cargo Systems",
      icon: Anchor,
      image: "/marine-automation-new.png",
      description: "Complete sourcing and hardware supply for ship bridge navigation consoles, propulsion governors, oil mist detection, boiler controls, and ballast tank management.",
      features: [
        "Main & Aux Engine Governors",
        "Oil Mist Detectors (Graviner Mk5/6)",
        "Bridge Navigation & Gyrocompass Spares",
        "Pneumatic & Hydraulic Cargo Valves"
      ],
      link: "/products?division=marine-automation"
    },
    {
      title: "Industrial Automation",
      subtitle: "Factory Floor Control & Process Automation",
      icon: Cpu,
      image: "/industrial-electronics-new.png",
      description: "Direct inventory of programmable logic controllers (PLCs), high-speed communication I/O racks, variable frequency inverters, servo drives, and touchscreen operator interfaces.",
      features: [
        "PLC Processors & Rack Modules",
        "High-Power AC & DC Motor Drives",
        "Touchscreen HMI Displays",
        "Industrial Ethernet & Fieldbus Modules"
      ],
      link: "/products?division=industrial-automation"
    },
    {
      title: "Electrical & Control Systems",
      subtitle: "Switchgear, Instrumentation & Safety Arrays",
      icon: Zap,
      image: "/engine-maintenance-new.png",
      description: "Marine and plant-grade electrical switchgear, molded case circuit breakers, temperature/pressure transmitters, safety relays, and auxiliary power control systems.",
      features: [
        "MCCB & Air Circuit Breakers",
        "Process Instrumentation Transmitters",
        "Safety Interlock Relays & Contactors",
        "Power Monitoring & Metering Modules"
      ],
      link: "/services"
    }
  ]

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-white border-b border-[#E2E8F0]" id="services">
      {/* Decorative Wave Geometry */}
      <SectionDecorations variant="light-wave" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-2">
            <span>CORE ENGINEERING DOMAINS</span>
            </div>

          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
            OUR CORE SERVICES
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Engineered hardware solutions for critical vessel automation and continuous industrial manufacturing processes.
          </p>
        </div>

        {/* 3 Services Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group flex flex-col bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#0095A8] hover:shadow-xl transition-all duration-300 overflow-hidden shadow-2xs hover:-translate-y-1"
              >
                {/* Media Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EDF6FC]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061D45]/70 via-[#061D45]/20 to-transparent" />
                  
                  {/* Floating Icon Pill */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md text-[#0095A8] flex items-center justify-center shadow-xs border border-white/50">
                    <Icon className="w-5 h-5 text-[#0095A8]" />
                  </div>

                  {/* Subtitle tag */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#0095A8]">Core Scope</div>
                    <div className="text-sm font-black uppercase tracking-tight">{item.title}</div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-foreground/80 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="space-y-2 border-t border-[#F1F5F9] pt-3">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-foreground/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#061D45] group-hover:text-[#0095A8] transition-colors"
                    >
                      <span>Explore {item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

