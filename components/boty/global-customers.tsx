"use client"

import { Star, ShieldCheck, Globe, Anchor, Award, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import TawakkalBackground from "@/components/TawakkalBackground"

export function GlobalCustomers() {
  const stats = [
    { value: "40,000+", label: "Automation Parts Supplied", icon: Award },
    { value: "100+", label: "Global Ports & Countries", icon: Globe },
    { value: "24-48h", label: "Worldwide Express Dispatch", icon: Anchor },
    { value: "100%", label: "Bench Tested & Verified", icon: ShieldCheck }
  ]

  const reviews = [
    {
      name: "Marcus Lindqvist",
      role: "Fleet Technical Superintendent",
      company: "Nordic Marine Logistics, Singapore",
      comment: "Our container vessel was delayed due to a critical Siemens S7-300 CPU failure. Tawwakal Automation verified the exact firmware compatibility and dispatched the tested unit to Jurong Port in less than 36 hours. Flawless commissioning.",
      rating: 5
    },
    {
      name: "Dimitris Stavros",
      role: "Chief Electrical Engineer",
      company: "Aegean Bulk Carriers, Piraeus",
      comment: "Finding discontinued Danfoss VLT 5000 marine drives in clean working condition is nearly impossible in Europe. The unit arrived with bench-test video certification and sealed packaging. Saved us weeks of costly downtime.",
      rating: 5
    },
    {
      name: "Rajesh Kulkarni",
      role: "Plant Maintenance Manager",
      company: "Gujarat Industrial Chemicals, Dahej",
      comment: "Excellent supplier for industrial automation parts. Their Bhavnagar testing lab is top tier. We regularly source Allen-Bradley ControlLogix and Pro-face HMIs with full replacement warranty.",
      rating: 5
    }
  ]

  return (
    <section className="ta-section py-8 sm:py-20 border-b border-[#CBD5E1]" id="testimonials">
      {/* Reusable Tawakkal Light Marine Background */}
      <TawakkalBackground variant="light" />

      <div className="ta-content max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <span>PROVEN WORLDWIDE TRACK RECORD</span>
          </div>
          
          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl tracking-tight text-[#061D45] uppercase">
            40K+ HAPPY CUSTOMERS GLOBALLY
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Here you can find the experience of marine superintendents, vessel engineers, and plant managers who rely on our Alang stockist inventory.
          </p>
        </div>

        {/* 4 Stats Counters - 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="ta-card p-3 sm:p-5 text-center bg-white/90 border border-[#0095A8]/15 rounded-xl sm:rounded-2xl"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0095A8]/10 flex items-center justify-center text-[#0095A8] mx-auto mb-1.5 sm:mb-2">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#061D45] tracking-tight mb-0.5">
                  {s.value}
                </div>
                <div className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-tight">
                  {s.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 3 Review Cards - 2 cols on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-5">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`ta-card p-3 sm:p-5 flex flex-col justify-between bg-white/95 border border-[#0095A8]/15 rounded-xl sm:rounded-2xl shadow-xs ${
                idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
              }`}
            >
              <div>
                {/* 5 Star Rating */}
                <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-[10px] sm:text-xs text-slate-700 leading-relaxed italic mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-none">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#061D45] mb-0.5">
                  <span className="truncate">{rev.name}</span>
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0095A8] shrink-0" />
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#0095A8] font-semibold truncate">{rev.role}</div>
                <div className="text-[8.5px] sm:text-[9.5px] text-slate-500 truncate">{rev.company}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
