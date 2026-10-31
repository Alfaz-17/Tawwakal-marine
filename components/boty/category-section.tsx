"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Cpu, Anchor, Layers } from "lucide-react"
import api from "@/lib/api"
import { motion } from "framer-motion"
import TawakkalBackground from "@/components/TawakkalBackground"

interface CategoryItem {
  _id?: string
  name: string
  slug?: string
  coreCategory?: string
  description?: string
  image?: string
}

const CORE_SECTORS = [
  { id: "All", label: "All Sectors", icon: Layers },
  { id: "Industrial Automation", label: "Industrial", icon: Cpu },
  { id: "Marine Automation", label: "Marine", icon: Anchor }
]

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { name: "PLC Systems & Modules", slug: "plc-systems", coreCategory: "Industrial Automation", image: "/categories/plc-systems.png" },
  { name: "Variable Frequency Drives (VFD)", slug: "vfd-drives", coreCategory: "Industrial Automation", image: "/categories/vfd-drives.png" },
  { name: "HMI & Operator Panels", slug: "hmi-panels", coreCategory: "Industrial Automation", image: "/categories/hmi-panels.png" },
  { name: "Engine Room Controls & AMS", slug: "engine-room-controls", coreCategory: "Marine Automation", image: "/categories/marine-automation.png" },
  { name: "Bridge Navigation & Telecom", slug: "bridge-navigation", coreCategory: "Marine Automation", image: "/categories/telecom-and-communication.png" },
  { name: "Marine Radar Systems", slug: "marine-radar", coreCategory: "Marine Automation", image: "/categories/radar.png" },
  { name: "Oil Mist Detectors (OMD)", slug: "oil-mist-detectors", coreCategory: "Marine Automation", image: "/categories/oil-mist-detector.png" },
  { name: "Circuit Breakers & Switchgear", slug: "circuit-breakers", coreCategory: "Industrial Automation", image: "/categories/circuit-breakers.png" },
  { name: "Pressure & Level Transmitters", slug: "transmitters", coreCategory: "Marine Automation", image: "/categories/transmitter.png" },
  { name: "Control Valves & Actuators", slug: "control-valves", coreCategory: "Marine Automation", image: "/categories/control-valve.png" },
]

export function CategorySection() {
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES)
  const [loading, setLoading] = useState(false)
  const [selectedSector, setSelectedSector] = useState("All")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories")
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data)
        }
      } catch (err) {
        console.error("Failed to load categories:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const displayList = selectedSector === "All"
    ? categories
    : categories.filter(c => c.coreCategory === selectedSector)

  // Duplicate items for infinite seamless marquee loop
  const marqueeItems = displayList.length > 0
    ? [...displayList, ...displayList, ...displayList]
    : []

  return (
    <section className="ta-section py-8 sm:py-20 border-b border-[#CBD5E1]" id="categories">
      {/* Reusable Tawakkal Light Marine Background */}
      <TawakkalBackground variant="light" />

      <div className="ta-content max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1 sm:mb-1.5">
              <span>PARTS BY CATEGORY</span>
            </div>
            
            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
              SHOP BY CATEGORIES
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              Explore certified automation modules, motor drives, and marine spares organized by sector.
            </p>
          </div>

          {/* Right Controls: Sector Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center p-0.5 sm:p-1 rounded-full bg-white border border-[#CBD5E1] shadow-2xs gap-0.5 sm:gap-1">
              {CORE_SECTORS.map((sector) => {
                const Icon = sector.icon
                const isSelected = selectedSector === sector.id

                return (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector.id)}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 sm:gap-1.5 ${
                      isSelected
                        ? "bg-[#0B153B] text-white shadow-xs"
                        : "text-[#0B153B]/70 hover:text-[#0B153B]"
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0095A8]" />
                    <span>{sector.label}</span>
                  </button>
                )
              })}
            </div>

            <span className="hidden sm:inline-block text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider bg-white/80 border border-[#CBD5E1] px-3 py-1 rounded-full">
              Hover to Pause
            </span>
          </div>
        </div>

        {/* Infinite Marquee Categories Slider with Ambient Edge Fade Masks */}
        <div className="relative w-full overflow-hidden py-2 sm:py-4">
          {/* Left and right gradient fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-20 bg-gradient-to-r from-[#EEF4F9] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-20 bg-gradient-to-l from-[#D7E7F2] to-transparent z-10" />

          <div className="animate-marquee-infinite flex gap-3 sm:gap-7 items-center">
            {marqueeItems.map((cat, index) => {
              const catUrl = `/products?category=${cat.slug || cat._id}`

              return (
                <div
                  key={`${cat.name || cat._id}-${index}`}
                  className="shrink-0 w-24 sm:w-36 md:w-40 flex flex-col items-center text-center group cursor-pointer"
                >
                  <Link
                    href={catUrl}
                    className="flex flex-col items-center w-full"
                  >
                    {/* Cardless Image Container */}
                    <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white border-2 border-[#CBD5E1] shadow-[0_3px_12px_rgba(6,29,69,0.06)] p-2 sm:p-3 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_26px_rgba(0,149,168,0.22)] group-hover:border-[#0095A8]">
                      <Image
                        src={cat.image || "/categories/plc-systems.png"}
                        alt={cat.name}
                        fill
                        className="object-contain p-2.5 sm:p-3.5 transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 80px, 144px"
                      />
                    </div>

                    {/* Clean Cardless Typography */}
                    <div className="mt-1.5 sm:mt-3 w-full px-1">
                      <h3 className="font-sans text-[11px] sm:text-[13px] font-bold text-[#0B153B] group-hover:text-[#0095A8] transition-colors leading-tight line-clamp-2">
                        {cat.name}
                      </h3>

                      {cat.coreCategory && (
                        <span className="text-[8.5px] sm:text-[9.5px] font-semibold text-muted-foreground uppercase tracking-wider block mt-0.5 truncate">
                          {cat.coreCategory.replace(" Automation", "")}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Explore All Categories CTA */}
        <div className="mt-4 sm:mt-8 text-center flex justify-center gap-3 items-center">
          <Link
            href="/products"
            className="rounded-full bg-[#0B153B] hover:bg-[#008C95] text-white px-5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs inline-flex items-center gap-1.5 sm:gap-2"
          >
            <span>Explore All 52 Categories</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
