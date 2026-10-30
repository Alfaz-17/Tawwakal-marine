"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Image from "next/image"
import { Search, SlidersHorizontal, X, FileText, CheckCircle2 } from "lucide-react"
import api from "@/lib/api"
import { MarineLoader } from "@/components/common/marine-loader"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "@/components/product-card"

export default function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all")
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || "all"
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl)
      setCurrentPage(1)
    }
  }, [searchParams, selectedCategory])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleCategoryChange = (slugOrId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slugOrId === "all") {
      params.delete('category')
    } else {
      params.set('category', slugOrId)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories")
        ]);
        if (Array.isArray(productsRes.data)) setProducts(productsRes.data)
        if (Array.isArray(categoriesRes.data)) setCategories(categoriesRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brandName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        (() => {
          const categoryObj = categories.find(c => c.slug === selectedCategory || c._id === selectedCategory);
          const targetId = categoryObj ? categoryObj._id : selectedCategory;
          
          return (
            product.category?._id === targetId ||
            product.category === targetId ||
            product.category?.slug === selectedCategory ||
            product.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
          );
        })();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory, categories]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, currentPage]);

  if (loading) return <MarineLoader />;

  return (
    <main className="min-h-screen pb-20">
      {/* Page Hero Header */}
      <div className="pt-8 sm:pt-10 pb-4 text-center relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] uppercase text-accent mb-2"
          >
            <span>Supply Inventory &amp; Sourcing</span>
            </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-primary uppercase leading-tight mb-2 max-w-4xl mx-auto"
          >
            EQUIPMENT &amp; PARTS INVENTORY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Browse verified marine machinery, ship spare parts, industrial automation modules, and electrical components.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        
        {/* Search and Filters Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-border shadow-2xs mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search by part number, model, brand, or name..."
              className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border focus:border-accent outline-hidden text-xs sm:text-sm font-medium rounded-xl transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Desktop Categories Filter Chips */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap">
            <button
               onClick={() => handleCategoryChange("all")}
               className={`px-4 py-2 uppercase text-[11px] tracking-wider font-bold rounded-full transition-all ${
                 selectedCategory === "all" 
                   ? "bg-primary text-white shadow-sm" 
                   : "bg-muted/40 text-foreground/80 hover:bg-muted"
               }`}
            >
              All
            </button>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.slug || cat._id)}
                className={`px-4 py-2 uppercase text-[11px] tracking-wider font-bold rounded-full transition-all ${
                  selectedCategory === (cat.slug || cat._id)
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted/40 text-foreground/80 hover:bg-muted"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden w-full py-2.5 px-4 bg-[#F4F7FA] border border-border flex items-center justify-center gap-2 uppercase text-xs tracking-wider font-bold rounded text-[#0B153B]"
          >
            <SlidersHorizontal className="w-4 h-4 text-accent" /> Filter Categories
          </button>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
          <span>Showing <strong>{filteredProducts.length}</strong> equipment records</span>
          {selectedCategory !== "all" && (
            <button 
              onClick={() => handleCategoryChange("all")} 
              className="text-accent hover:underline font-semibold"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {currentItems.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 border border-dashed border-border rounded bg-white p-8">
            <h3 className="text-base font-bold text-[#0B153B] uppercase mb-2">No Matching Products Found</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6">
              If the item or spare part you are seeking is not currently in the catalog, submit your specifications directly. We handle requirement-based sourcing.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Sourcing Requirement</span>
            </a>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-border text-xs font-bold uppercase rounded hover:bg-[#0B153B] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current transition-colors"
            >
              Prev
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
                  className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded transition-colors ${
                    currentPage === i + 1 ? "bg-accent text-white" : "border border-border hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 350, behavior: 'smooth' }); }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-border text-xs font-bold uppercase rounded hover:bg-[#0B153B] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-[#0B153B]/70 z-50"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-[280px] bg-white z-50 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-border">
                  <h3 className="text-sm font-bold uppercase text-[#0B153B]">Filter Categories</h3>
                  <button onClick={() => setShowFilters(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
                </div>
                <div className="space-y-2">
                  <button 
                    onClick={() => { handleCategoryChange("all"); setShowFilters(false); }}
                    className={`w-full text-left py-2 px-3 uppercase text-xs tracking-wider font-bold rounded ${selectedCategory === "all" ? "bg-[#0B153B] text-white" : "hover:bg-muted"}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button 
                      key={cat._id}
                      onClick={() => { handleCategoryChange(cat.slug || cat._id); setShowFilters(false); }}
                      className={`w-full text-left py-2 px-3 uppercase text-xs tracking-wider font-bold rounded ${(selectedCategory === cat.slug || selectedCategory === cat._id) ? "bg-accent text-white" : "hover:bg-muted"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-2.5 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sourcing Guide / Bottom Informational Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 pt-12 border-t border-border">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded border border-border">
            <h3 className="text-base font-bold text-[#0B153B] uppercase tracking-wider mb-2">Technical Sourcing Support</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              When sourcing marine and industrial components, specification fidelity is paramount. Tawwakal Automation assists engineering and procurement teams in reviewing nameplates, manufacturer model codes, and compatibility parameters.
            </p>
          </div>
          <div className="p-6 bg-[#0B153B] text-white rounded">
            <h3 className="text-base font-bold uppercase tracking-wider mb-2 text-white">Quotation Process</h3>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              All listed equipment is available via B2B quotation. Submit your desired items with required quantity and delivery location to receive detailed pricing and availability terms.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
