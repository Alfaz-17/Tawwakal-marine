"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Sparkles, Cpu, Anchor, Layers } from "lucide-react"
import api from "@/lib/api"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { SectionDecorations } from "@/components/common/section-decorations"
import TawakkalBackground from "@/components/TawakkalBackground"

export function ProductGrid() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"all" | "industrial" | "marine">("all")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let endpoint = "/products?featured=true&limit=8"
        if (activeTab === "industrial") endpoint += "&division=industrial-automation"
        if (activeTab === "marine") endpoint += "&division=marine-automation"

        const prodRes = await api.get(endpoint)
        let list = prodRes.data
        
        if (!Array.isArray(list) || list.length === 0) {
          let fallbackEndpoint = "/products?limit=8"
          if (activeTab === "industrial") fallbackEndpoint += "&division=industrial-automation"
          if (activeTab === "marine") fallbackEndpoint += "&division=marine-automation"
          const fallbackRes = await api.get(fallbackEndpoint)
          list = fallbackRes.data
        }

        if (Array.isArray(list)) {
          setProducts(list.slice(0, 8))
        }
      } catch (err) {
        console.error("Error fetching homepage products:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [activeTab])

  return (
    <section className="ta-section py-8 sm:py-20 border-b border-[#CBD5E1]" id="featured">
      {/* Reusable Tawakkal Soft Marine Background */}
      <TawakkalBackground variant="soft" />

      <div className="ta-content relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <span>VERIFIED HARDWARE STOCK</span>
          </div>
          
          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
            FEATURED PRODUCTS &amp; EQUIPMENT
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Inspect verified industrial automation modules, drives, and marine spares bench-tested and ready for express dispatch.
          </p>

          {/* Interactive Sector Switcher Tabs */}
          <div className="mt-4 sm:mt-6 inline-flex items-center p-1 rounded-full bg-white border border-[#CBD5E1] shadow-2xs gap-0.5 sm:gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 sm:gap-1.5 shrink-0 ${
                activeTab === "all"
                  ? "bg-[#061D45] text-white shadow-xs"
                  : "text-[#061D45]/70 hover:text-[#061D45]"
              }`}
            >
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>All Spares</span>
            </button>

            <button
              onClick={() => setActiveTab("industrial")}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 sm:gap-1.5 shrink-0 ${
                activeTab === "industrial"
                  ? "bg-[#0095A8] text-white shadow-xs"
                  : "text-[#061D45]/70 hover:text-[#0095A8]"
              }`}
            >
              <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Industrial</span>
            </button>

            <button
              onClick={() => setActiveTab("marine")}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 sm:gap-1.5 shrink-0 ${
                activeTab === "marine"
                  ? "bg-[#0095A8] text-white shadow-xs"
                  : "text-[#061D45]/70 hover:text-[#0095A8]"
              }`}
            >
              <Anchor className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Marine Spares</span>
            </button>
          </div>
        </div>

        {/* Loading / Empty / Grid States */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-56 sm:h-72 rounded-2xl bg-white animate-pulse border border-[#E2E8F0]" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-white rounded-2xl border border-[#CBD5E1] p-6 sm:p-8 max-w-md mx-auto shadow-xs">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">No parts currently listed under this sector.</p>
            <Link
              href="/products"
              className="rounded-full bg-[#061D45] text-white px-5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#0095A8] transition-colors inline-block"
            >
              Browse Full Catalog
            </Link>
          </div>
        )}

        {/* Bottom Centered Link */}
        <div className="mt-6 sm:mt-10 text-center">
          <Link
            href="/products"
            className="rounded-full bg-[#061D45] hover:bg-[#0095A8] text-white px-5 sm:px-7 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-2xs inline-flex items-center gap-2"
          >
            <span>Explore All 56 Verified Products</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
