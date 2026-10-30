"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Package, Cpu, Gauge, Zap, ChevronRight, CheckCircle2, Search, FileText, ArrowRight } from "lucide-react"

export default function ServicesContent() {
  const services = [
    {
      title: "Marine Equipment Supply",
      description: "Supplying deck machinery, bridge instrumentation, propulsion accessories, and navigation hardware for commercial shipping fleets.",
      icon: Package,
      features: ["Deck Machinery Spares", "Bridge Consoles & Nav Units", "Propulsion Accessories", "Emergency & Safety Spares"]
    },
    {
      title: "Ship Spare Parts Supply",
      description: "Providing critical replacement components for main and auxiliary marine engines, purifiers, pumps, heat exchangers, and separators.",
      icon: Gauge,
      features: ["Main & Auxiliary Engine Parts", "Centrifugal & Screw Pump Spares", "Oil Purifier & Separator Kits", "High-Pressure Valves & Seals"]
    },
    {
      title: "Industrial Automation Products",
      description: "Supply of programmable logic controllers (PLCs), HMIs, variable frequency drives (VFDs), and process instrumentation for industrial facilities.",
      icon: Cpu,
      features: ["PLC Processors & I/O Modules", "Operator Interface Panels (HMI)", "Industrial VFDs & Servo Drives", "Temperature & Pressure Transmitters"]
    },
    {
      title: "Product Sourcing Assistance",
      description: "Assisting technical buyers and superintendents in locating hard-to-find, discontinued, or legacy model parts across global procurement networks.",
      icon: Search,
      features: ["Obsolete Part Matching", "Nameplate & Serial Identification", "Alternative Sourcing Options", "BOM & Requisition Reviews"]
    },
    {
      title: "Electrical & Mechanical Components",
      description: "Supplying industrial switchgear, circuit breakers, contactors, pneumatic valves, and mechanical couplings for plant maintenance.",
      icon: Zap,
      features: ["Molded Case Circuit Breakers", "Magnetic Contactors & Overloads", "Pneumatic Control Valves", "Flexible Shaft Couplings"]
    },
    {
      title: "Technical Equipment Support",
      description: "Requirement-based verification, datasheet confirmation, and coordination of installation or commissioning support through qualified technicians where available.",
      icon: FileText,
      features: ["Specification Verification", "Datasheet Validation", "Delivery Logistics Coordination", "Installation Support (upon arrangement)"]
    }
  ]

  return (
    <div className="bg-background pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-10 pb-4 flex items-center justify-center bg-background overflow-hidden">
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#008C95] mb-2">
              <span>Core Capabilities</span>
              </div>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#0B153B] uppercase tracking-tight leading-tight mb-2">
              OUR SERVICES &amp; CAPABILITIES
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Tawwakal Automation supports marine and industrial businesses with targeted equipment supply, requirement-based sourcing, and specification reviews.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] hover:border-[#008C95] hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0B153B]/5 border border-[#E2E8F0] flex items-center justify-center text-[#0B153B] mb-4">
                  <service.icon className="w-5 h-5 text-[#008C95]" />
                </div>
                
                <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-tight mb-2">
                  {service.title}
                </h2>
                
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground/85 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008C95] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E2E8F0]">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#008C95] hover:text-[#0B153B] transition-colors"
                >
                  <span>Enquire Regarding Scope</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-[#0B153B] rounded-2xl p-6 sm:p-10 text-center text-white relative overflow-hidden border border-white/10 shadow-lg">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[#008C95] text-[11px] font-extrabold uppercase tracking-[0.2em] block">
              Direct Technical Collaboration
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Have a Specific BOM or Spare Parts List?
            </h2>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-lg mx-auto">
              Email your equipment requirements, part numbers, or vessel requisition lists directly to our technical desk for prompt commercial review.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <Link 
                href="/contact" 
                className="px-5 py-2.5 bg-[#008C95] hover:bg-[#007077] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-colors shadow-sm"
              >
                Submit RFQ / Enquiry
              </Link>
              <Link 
                href="/products" 
                className="px-5 py-2.5 border border-white/20 hover:bg-white hover:text-[#0B153B] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-colors"
              >
                Browse Inventory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
