"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, ShieldCheck, Globe } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-[#E2E8F0] min-h-[460px] h-[calc(100svh-5.25rem)] sm:min-h-[520px] sm:h-[calc(100dvh-5.5rem)] lg:h-[calc(100dvh-6rem)] flex items-center">
      {/* Full-Bleed Panoramic Hero Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-marine.png"
          alt="Tawwakal Automation - Global Supplier & Stockist of Industrial & Marine Automation Parts"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-right lg:object-center select-none"
        />

        {/* Soft White Gradient Guaranteeing High-Contrast Readability across all screen sizes */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/75 sm:to-transparent sm:w-[85%] md:w-[65%] lg:w-[50%] xl:w-[46%] z-10" 
          aria-hidden="true"
        />
      </div>

      {/* Foreground Content Container (Fits Cleanly in First Impression / Mobile Viewport) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-8 lg:py-10 flex flex-col justify-center h-full">
        <div className="w-full md:max-w-xl lg:max-w-2xl xl:max-w-[620px] flex flex-col justify-center my-auto">
          
          {/* Top Category Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-[9.5px] sm:text-[11px] font-extrabold tracking-[0.2em] text-[#008C95] uppercase mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2"
          >
            <span>INDUSTRIAL</span>
            <span className="text-[#008C95]/50">•</span>
            <span>MARINE</span>
            <span className="text-[#008C95]/50">•</span>
            <span>AUTOMATION</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-sans font-black text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] text-[#0B153B] uppercase leading-[1.12] tracking-tight mb-2 sm:mb-3"
          >
            GLOBAL SUPPLIER &amp; STOCKIST <br />
            <span className="text-[#008C95]">OF INDUSTRIAL &amp; MARINE</span> <br />
            AUTOMATION PARTS
          </motion.h1>

          {/* Accent Underline Bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="w-10 sm:w-12 h-1 bg-[#008C95] rounded-full mb-2 sm:mb-3 origin-left"
            aria-hidden="true"
          />

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-[11px] sm:text-[13px] text-[#202A3A]/85 max-w-lg leading-relaxed mb-3.5 sm:mb-5 font-normal line-clamp-2 sm:line-clamp-none"
          >
            Explore verified automation modules, control systems, electrical equipment, and genuine marine spare parts sourced directly from Alang hub.
          </motion.p>

          {/* Action Buttons - Compact 2-button row on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-row items-center gap-2 sm:gap-3 mb-3.5 sm:mb-6"
          >
            {/* Primary Button */}
            <Link
              href="/products"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#0095A8] hover:bg-[#007b8a] text-white px-3.5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-[0.98]"
            >
              <span>Explore Parts</span>
              <span aria-hidden="true" className="text-xs sm:text-sm leading-none">&rarr;</span>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-white hover:bg-[#F4F7FA] text-[#0B153B] border border-[#CBD5E1] hover:border-[#0095A8] px-3.5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-2xs active:scale-[0.98]"
            >
              Request Quote
            </Link>
          </motion.div>

          {/* 3 Bottom Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="pt-2 sm:pt-3 border-t border-[#E2E8F0] grid grid-cols-3 gap-1.5 sm:gap-3 text-center sm:text-left"
          >
            {/* Badge 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 bg-white/70 sm:bg-transparent backdrop-blur-2xs sm:backdrop-blur-none p-1 sm:p-0 rounded-md sm:rounded-none border border-slate-200/50 sm:border-0">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#008C95]/10 flex items-center justify-center text-[#008C95] shrink-0">
                <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </div>
              <div>
                <div className="text-[8.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#0B153B]">
                  DISPATCH
                </div>
                <div className="text-[7.5px] sm:text-[9px] font-semibold text-muted-foreground uppercase leading-tight">
                  IN 24-48 HRS
                </div>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 bg-white/70 sm:bg-transparent backdrop-blur-2xs sm:backdrop-blur-none p-1 sm:p-0 rounded-md sm:rounded-none border border-slate-200/50 sm:border-0">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#008C95]/10 flex items-center justify-center text-[#008C95] shrink-0">
                <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </div>
              <div>
                <div className="text-[8.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#0B153B]">
                  VERIFIED
                </div>
                <div className="text-[7.5px] sm:text-[9px] font-semibold text-muted-foreground uppercase leading-tight">
                  BENCH TESTED
                </div>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 bg-white/70 sm:bg-transparent backdrop-blur-2xs sm:backdrop-blur-none p-1 sm:p-0 rounded-md sm:rounded-none border border-slate-200/50 sm:border-0">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#008C95]/10 flex items-center justify-center text-[#008C95] shrink-0">
                <Globe className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </div>
              <div>
                <div className="text-[8.5px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#0B153B]">
                  WORLDWIDE
                </div>
                <div className="text-[7.5px] sm:text-[9px] font-semibold text-muted-foreground uppercase leading-tight">
                  AIR PORTS
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
