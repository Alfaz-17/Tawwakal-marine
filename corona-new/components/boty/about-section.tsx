"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, Anchor, Cpu, ArrowRight, Award, Compass } from "lucide-react"
import TawakkalBackground from "@/components/TawakkalBackground"

export function AboutSection() {
  const verifiedStats = [
    { label: "Subcategories Handled", value: "52+" },
    { label: "OEM Brands Supported", value: "15+" },
    { label: "Bench Tested QC", value: "100%" },
    { label: "Express Dispatch", value: "24-48h" },
  ]

  return (
    <section className="ta-section py-8 sm:py-20 border-b border-[#CBD5E1]" id="about">
      {/* Reusable Tawakkal Marine Background System */}
      <TawakkalBackground variant="light" />

      <div className="ta-content relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Visual Industrial Imagery Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image: Automation Parts Stock */}
              <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#CBD5E1] shadow-xl bg-white group">
                <Image
                  src="/automation-parts-stock.webp"
                  alt="Tawwakal Automation Direct Automation Parts Stock & Inventory"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061D45]/60 via-transparent to-transparent" />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-[#061D45]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/15 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0095A8]" />
                    <span>Direct Warehouse Stock &amp; Testing Desk</span>
                  </div>
                </div>
              </div>

              {/* Floating Small Accent Card: Industrial Electronics Hardware Inspection */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-8 sm:-right-6 w-[45%] sm:w-1/2 aspect-video rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-white">
                <Image
                  src="/industrial-electronics-new.png"
                  alt="Industrial Automation Hardware Inspection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 130px, 240px"
                />
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-3 -left-2 sm:-top-6 sm:-left-6 bg-[#061D45] text-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-white/10 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#0095A8] text-white flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-[#0095A8] uppercase tracking-wider">Located at</div>
                  <div className="text-[11px] sm:text-sm font-extrabold uppercase">Alang / Bhavnagar Hub</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Strengths */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-5">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8]">
              <span>ABOUT TAWWAKAL AUTOMATION</span>
            </div>

            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight leading-tight">
              PRECISION SOURCING &amp; AUTOMATION FOR MARINE &amp; INDUSTRY
            </h2>

            <p className="text-[11px] sm:text-sm text-foreground/80 leading-relaxed">
              Based at the world-renowned maritime trade corridor of Bhavnagar and Alang, <strong>Tawwakal Automation</strong> specializes in technical identification, bench-testing, and global supply of marine control equipment and industrial automation spares.
            </p>

            <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed">
              We eliminate costly downtime for commercial vessel operators and automated manufacturing plants through dependable supply chains, verified OEM specifications, and rapid international airfreight logistics.
            </p>

            {/* 4 Stats Grid - 2 cols on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 sm:pt-2">
              {verifiedStats.map((stat, idx) => (
                <div key={idx} className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white border border-[#CBD5E1] text-center shadow-[0_2px_8px_rgba(6,29,69,0.04)]">
                  <div className="font-sans font-black text-lg sm:text-2xl text-[#061D45]">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs - 2 buttons side-by-side on mobile */}
            <div className="pt-2 sm:pt-3 flex flex-row gap-2 sm:gap-3">
              <Link
                href="/about"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#061D45] hover:bg-[#0095A8] text-white px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs text-center"
              >
                <span>Company Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-white hover:bg-[#EDF6FC] text-[#061D45] border border-[#CBD5E1] px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs text-center"
              >
                <span>Consultation</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
