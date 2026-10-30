"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

export function CTABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (bannerRef.current) {
      observer.observe(bannerRef.current)
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={bannerRef}
          className={`overflow-hidden rounded-[40px] transition-all duration-700 ease-out relative shadow-2xl bg-primary text-white text-center p-12 sm:p-20 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/engine-maintenance-new.png"
              alt="Marine and Industrial Equipment Supply"
              fill
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-primary/90 z-10" />
          </div>
          
          <div className="relative z-20 max-w-3xl mx-auto">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-6">
              <span>Requirement-Based Sourcing</span>
              </div>

            {/* Massive Heading */}
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] uppercase leading-[0.92] text-white mb-6">
              LOOKING FOR A SPECIFIC SPARE PART?
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed mb-10 max-w-2xl mx-auto">
              If an item is not currently listed in our online inventory, our sourcing team can check 
              our extended network and provide pricing and availability.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-white hover:bg-accent text-primary hover:text-white px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                <span>Submit Quotation Request</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products"
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300"
              >
                Browse Current Stock
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
