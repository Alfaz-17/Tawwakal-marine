"use client"

import { useEffect, useRef, useState } from "react"
import { ShieldCheck, Anchor, Globe, Cpu } from "lucide-react"
import { motion } from "framer-motion"

const badges = [
  {
    icon: ShieldCheck,
    title: "Class Approved",
    description: "Certified by major maritime classification societies."
  },
  {
    icon: Anchor,
    title: "Genuine Spares",
    description: "OEM quality parts salvaged from professional vessels."
  },
  {
    icon: Globe,
    title: "Global Export",
    description: "Exporting to over 40 countries with secure logistics."
  },
  {
    icon: Cpu,
    title: "Tech Tested",
    description: "Every electronic component undergoes rigorous testing."
  }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 bg-background border-y border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-white border border-border flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-md">
                 <badge.icon className="w-8 h-8 text-accent group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{badge.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
