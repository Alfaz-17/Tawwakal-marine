"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, BookOpen, Calendar } from "lucide-react"
import api from "@/lib/api"
import { motion } from "framer-motion"

export function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([])

  const defaultBlogs = [
    {
      _id: "1",
      slug: "sourcing-marine-automation-alang-guide",
      title: "Sourcing Marine & Industrial Automation from Alang: Technical Quality & Testing Guide",
      excerpt: "How ship recycling surplus inventories provide identical replacement parts for critical factory lines and vessel machinery.",
      image: "/categories/plc-systems.png",
      date: "Technical Guide"
    },
    {
      _id: "2",
      slug: "oil-mist-detector-preventive-maintenance-solas",
      title: "Oil Mist Detector (OMD) Preventive Maintenance & SOLAS Regulation Compliance",
      excerpt: "Essential guidelines for Graviner Mark 6 and Schaller Visatron OMD calibration and sensor cleanliness on deep-sea vessels.",
      image: "/categories/oil-mist-detector.png",
      date: "SOLAS Compliance"
    }
  ]

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs")
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data.slice(0, 3))
        } else {
          setBlogs(defaultBlogs)
        }
      } catch (err) {
        setBlogs(defaultBlogs)
      }
    }
    fetchBlogs()
  }, [])

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs

  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden border-b border-[#E2E8F0]" id="blogs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#008C95] mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#008C95]" />
              <span>TECHNICAL SOURCING INSIGHTS</span>
            </div>
            
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#0B153B] uppercase">
              BLOG POSTS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Read technical analysis on marine automation maintenance, obsolete PLC replacement, and variable speed drive commissioning.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#CBD5E1] hover:border-[#008C95] text-[#0B153B] hover:text-[#008C95] px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs self-start md:self-end"
          >
            <span>Explore All Articles</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayBlogs.map((b, idx) => (
            <motion.div
              key={b._id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <Link
                href={`/blog/${b.slug || b._id}`}
                className="group flex flex-col h-full bg-[#FAF8F5] rounded-2xl border border-[#E2E8F0] hover:border-[#008C95]/50 hover:shadow-md transition-all duration-300 overflow-hidden p-4 hover:-translate-y-0.5 shadow-2xs"
              >
                <div className="aspect-16/10 relative overflow-hidden rounded-xl bg-white mb-3 border border-black/[0.04]">
                  <Image
                    src={b.image || "/categories/plc-systems.png"}
                    alt={b.title}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between px-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-wider text-[#008C95] mb-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{b.date || "Technical Guide"}</span>
                    </div>

                    <h3 className="font-sans text-xs sm:text-sm font-bold text-[#0B153B] group-hover:text-[#008C95] transition-colors line-clamp-2 leading-snug mb-1.5">
                      {b.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {b.excerpt}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[#E2E8F0]/70 flex items-center justify-between text-[10.5px] font-bold text-[#0B153B] group-hover:text-[#008C95] uppercase tracking-wider">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
