"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Cpu, Monitor, Activity, Gauge, Radio, Server, ArrowUpRight } from "lucide-react"
import { SectionDecorations } from "@/components/common/section-decorations"

export function SolutionsCapabilities() {
  const solutions = [
    {
      title: "Programmable Logic Controllers (PLC)",
      desc: "Simatic S7-300/400/1200/1500, Allen-Bradley ControlLogix, Omron CJ/CS, Mitsubishi Q series CPUs & racks.",
      icon: Cpu,
      tag: "Process & Logic",
      image: "/categories/plc-systems.png",
      href: "/products?category=plc-systems"
    },
    {
      title: "Human-Machine Interfaces (HMI)",
      desc: "Industrial touchscreens, keypad display panels, Beijer, Pro-face, Siemens Comfort, and Hakko monitors.",
      icon: Monitor,
      tag: "Visualization",
      image: "/categories/hmi.png",
      href: "/products?category=hmi-panels"
    },
    {
      title: "Variable Frequency Drives (VFD)",
      desc: "Danfoss VLT, ABB ACS800/880, Yaskawa, and Siemens Sinamics frequency inverters for motors & pumps.",
      icon: Activity,
      tag: "Speed Control",
      image: "/categories/vfd.png",
      href: "/products?category=vfd-inverters"
    },
    {
      title: "Navigation & Bridge Electronics",
      desc: "Commercial marine radar parts, Sperry gyrocompasses, GPS heading sensors, and Furuno communication sets.",
      icon: Radio,
      tag: "Maritime Bridge",
      image: "/categories/navigation-radar.png",
      href: "/products?category=navigation-radar"
    },
    {
      title: "Marine & Plant Instrumentation",
      desc: "Pressure transmitters, level probes, 4-20mA smart sensors, and temperature RTDs from Rosemount and Danfoss.",
      icon: Gauge,
      tag: "Sensors & Transmitters",
      image: "/categories/pressure-transmitters.png",
      href: "/products?category=pressure-transmitters"
    },
    {
      title: "Servo Drives & Precision Motion",
      desc: "Multi-axis servo packs, high-resolution rotary encoders, and servo controllers for automated packaging & cranes.",
      icon: Server,
      tag: "Precision Motion",
      image: "/categories/servo-drive.png",
      href: "/products?category=servo-drives"
    }
  ]

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#EDF6FC]/70 via-[#FFFFFF] to-[#EDF6FC]/50 border-b border-[#E2E8F0]" id="solutions">
      {/* Decorative Dotted Matrix & Curves */}
      <SectionDecorations variant="grid-dots" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-2">
            <span>SYSTEM ARCHITECTURE</span>
            </div>

          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
            SOLUTIONS &amp; TECHNICAL CAPABILITIES
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            High-reliability components engineered for critical control loops, marine propulsion oversight, and factory automation.
          </p>
        </div>

        {/* 6-Grid Solutions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {solutions.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex flex-col justify-between p-5 sm:p-6 bg-white/90 backdrop-blur-xs rounded-3xl border border-[#E2E8F0] hover:border-[#0095A8] hover:shadow-lg transition-all duration-300 shadow-2xs hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Bar with Icon & Hardware Category Thumbnail */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#061D45]/5 text-[#0095A8] flex items-center justify-center group-hover:bg-[#0095A8] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-black/[0.04] p-1.5 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="object-contain max-h-full"
                      />
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0095A8] block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="font-sans text-sm sm:text-base font-bold text-[#061D45] group-hover:text-[#0095A8] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#061D45] group-hover:text-[#0095A8] transition-colors">
                  <span>View Specifications</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}

