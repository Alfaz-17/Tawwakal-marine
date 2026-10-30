"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Sparkles, Clock, ShieldCheck } from "lucide-react"
import api from "@/lib/api"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"

export function NewArrivals() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await api.get("/products?limit=8")
        if (Array.isArray(res.data)) {
          setProducts(res.data.slice(0, 8))
        }
      } catch (err) {
        console.error("Error fetching new arrivals:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchNewArrivals()
  }, [])

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-[#E6E2D8]/60" id="new-arrivals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with UrbanEura style kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#008C95] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#008C95]" />
              <span>JUST CATALOGED FROM ALANG HUB</span>
            </div>
            
            <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#0B153B] uppercase leading-[1.05]">
              NEW ARRIVALS
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Recently sourced marine surplus and industrial automation hardware, bench-tested, verified, and packaged for urgent air dispatch.
            </p>
          </div>

          <Link
            href="/products?sort=newest"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#0B153B]/20 hover:border-[#008C95] text-[#0B153B] hover:text-[#008C95] px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-2xs self-start md:self-end"
          >
            <span>View All New Arrivals</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 rounded-[26px] bg-[#F4F7FA] animate-pulse border border-[#E2E8F0]" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14 bg-[#F4F7FA] rounded-[28px] border border-[#CBD5E1]/60 p-8 max-w-md mx-auto shadow-xs">
            <p className="text-sm text-muted-foreground mb-4">No new arrivals loaded yet.</p>
            <Link
              href="/products"
              className="rounded-full bg-[#0B153B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#008C95] transition-colors inline-block"
            >
              Browse Full Catalog
            </Link>
          </div>
        )}

        {/* Mobile View All button */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/products?sort=newest"
            className="inline-flex items-center gap-2 rounded-full bg-[#0B153B] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider"
          >
            <span>View All New Arrivals</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}
