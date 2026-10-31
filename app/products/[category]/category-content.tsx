"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight, FileText, ArrowRight } from "lucide-react"
import api from "@/lib/api"
import { MarineLoader } from "@/components/common/marine-loader"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import Breadcrumbs from "@/components/seo/breadcrumbs"

export default function CategoryContent() {
  const params = useParams()
  const categorySlug = params.category as string
  
  const [products, setProducts] = useState<any[]>([])
  const [categoryInfo, setCategoryInfo] = useState<any>(null)
  const [allCategories, setAllCategories] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        setLoading(true)
        // Parallel fetch for lightning speed
        const [categoriesRes, productsRes] = await Promise.all([
          api.get("/categories"),
          api.get(`/products?category=${categorySlug}`)
        ])

        if (!isMounted) return

        let foundCategory: any = null
        if (Array.isArray(categoriesRes.data)) {
          setAllCategories(categoriesRes.data)
          foundCategory = categoriesRes.data.find((c: any) => 
            c.slug === categorySlug || c._id === categorySlug
          )
          setCategoryInfo(foundCategory)
        }
        
        if (Array.isArray(productsRes.data)) {
          setProducts(productsRes.data)
          if (!foundCategory && productsRes.data.length > 0 && productsRes.data[0].category) {
            setCategoryInfo(productsRes.data[0].category)
          }
        }
      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
  }, [categorySlug])

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    return products.filter((product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage])

  const categoryName = categoryInfo?.name || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())

  if (loading) return <MarineLoader />

  return (
    <main className="min-h-screen pb-16">
      {/* Category Hero Header */}
      <div className="pt-8 sm:pt-10 pb-4 text-center relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] uppercase text-accent mb-2"
          >
            <span>Category Scope</span>
            </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-primary uppercase leading-tight mb-2 max-w-4xl mx-auto"
          >
            {categoryName}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            {categoryInfo?.description || `Explore our equipment and spare parts availability for ${categoryName.toLowerCase()}. Quotation and technical sourcing support.`}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <Breadcrumbs items={[
          { label: 'Products', href: '/products' },
          { label: categoryName, href: `/products/${categorySlug}` },
        ]} />

        {/* Search within category */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs mt-4 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder={`Search within ${categoryName.toLowerCase()}...`}
              className="w-full pl-9 pr-3.5 py-2 bg-[#FAF8F5]/60 border border-[#E2E8F0] focus:border-[#008C95] focus:bg-white outline-none text-xs font-medium rounded-xl transition-colors"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <p className="text-xs text-muted-foreground font-semibold">
            {filteredProducts.length} items available in {categoryName}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {currentItems.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl bg-white p-6 sm:p-8 mt-6">
            <h3 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase mb-2">
              No Specific Items Found in {categoryName}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-5">
              We frequently source equipment upon request. Submit your required model or part number directly to our team.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="px-5 py-2.5 bg-[#008C95] hover:bg-[#007077] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors">
                Submit Requirement RFQ
              </Link>
              <Link href="/products" className="px-5 py-2.5 border border-[#E2E8F0] text-[#0B153B] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#FAF8F5] transition-colors">
                All Products
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-[#E2E8F0] text-xs font-bold uppercase rounded-xl hover:bg-[#0B153B] hover:text-white disabled:opacity-30 transition-colors"
            >
              Prev
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
                  className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-xl transition-colors ${
                    currentPage === i + 1 ? "bg-[#008C95] text-white" : "border border-[#E2E8F0] hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-[#E2E8F0] text-xs font-bold uppercase rounded-xl hover:bg-[#0B153B] hover:text-white disabled:opacity-30 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Other Categories Links */}
        {allCategories.length > 1 && (
          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <h3 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-4">
              Other Equipment Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {allCategories
                .filter(c => (c.slug || c._id) !== categorySlug)
                .slice(0, 8)
                .map((cat) => (
                  <Link 
                    key={cat._id} 
                    href={`/products/${cat.slug || cat._id}`}
                    className="flex items-center justify-between p-3.5 bg-white border border-[#E2E8F0] hover:border-[#008C95] rounded-2xl transition-colors group shadow-2xs"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B153B] group-hover:text-[#008C95] transition-colors truncate">
                      {cat.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#008C95] shrink-0 transition-colors" />
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
