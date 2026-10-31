"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, FileText, CheckCircle2, Shield, Wrench, Globe, X, Mail, MessageCircle, Phone, Sparkles, ShieldCheck } from "lucide-react"
import api from "@/lib/api"
import { MarineLoader } from "@/components/common/marine-loader"
import { OrderForm } from "@/components/order-form"
import { motion } from "framer-motion"
import Breadcrumbs from "@/components/seo/breadcrumbs"
import { ProductCard } from "@/components/product-card"

export default function ProductDetailContent({ slug }: { slug: string }) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openAccordion, setOpenAccordion] = useState<string | null>("specs")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${slug}`);
        setProduct(data);

        if (data?.category?._id || data?.category) {
          const catId = data.category._id || data.category;
          const relatedRes = await api.get(`/products?category=${catId}`);
          if (Array.isArray(relatedRes.data)) {
            const related = relatedRes.data
              .filter((p: any) => p._id !== data._id)
              .slice(0, 4);
            setRelatedProducts(related);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (product && product.slug && slug === product._id) {
      const newPath = `/product/${product.slug}`;
      window.history.replaceState({ ...window.history.state, as: newPath, url: newPath }, '', newPath);
    }
  }, [product, slug]);

  if (loading) return <MarineLoader />;
  if (!product) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 pt-16">
      <h2 className="text-xl font-bold text-[#0B153B]">Equipment Record Not Found</h2>
      <Link href="/products" className="px-5 py-2.5 bg-[#008C95] text-white font-bold uppercase text-xs tracking-wider rounded-xl">
        Return to Products
      </Link>
    </div>
  );

  const totalImages = 1 + (product.images?.length || 0);
  
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const currentDisplayImage = selectedImageIndex === 0 
    ? (product.image || "/placeholder.svg") 
    : (product.images?.[selectedImageIndex - 1] || product.image || "/placeholder.svg");

  const brandName = product.brandName || product.brand?.name || null
  const categoryName = product.category?.name || "Marine & Industrial Equipment"

  return (
    <main className="min-h-screen pb-16 pt-6 sm:pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          items={[
            { label: 'Products', href: '/products' },
            { label: categoryName, href: `/products?category=${product.category?.slug || product.category?._id}` },
            { label: product.title, href: `/product/${slug}` }
          ]} 
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
          
          {/* Left Column: Image Gallery Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Primary Main Image */}
            <div 
              className="relative aspect-square bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden cursor-pointer group"
              onClick={() => {
                const allImages = [product.image, ...(product.images || [])].filter(Boolean);
                setLightboxImage(allImages[selectedImageIndex] || product.image);
              }}
            >
              <Image
                src={currentDisplayImage}
                alt={`${product.title} - Tawwakal Automation`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0B153B] px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs border border-[#E2E8F0]">
                {categoryName}
              </div>
              
              {/* Prev / Next controls */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#0B153B]" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-[#0B153B]" />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2.5 py-1 text-[11px] font-semibold rounded-lg backdrop-blur-sm">
                {selectedImageIndex + 1} / {totalImages}
              </div>
            </div>
            
            {/* Thumbnails Row */}
            {totalImages > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                <div 
                  className={`w-18 h-18 flex-shrink-0 relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${ 
                    selectedImageIndex === 0 
                      ? 'border-[#008C95] ring-2 ring-[#008C95]/20' 
                      : 'border-[#E2E8F0] hover:border-[#008C95]'
                  }`}
                  onClick={() => setSelectedImageIndex(0)}
                >
                  <Image 
                    src={product.image || "/placeholder.svg"} 
                    alt="Thumbnail" 
                    fill 
                    sizes="72px" 
                    className="object-cover" 
                  />
                </div>
                
                {product.images?.map((img: string, i: number) => (
                  <div 
                    key={i} 
                    className={`w-18 h-18 flex-shrink-0 relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${ 
                      selectedImageIndex === i + 1 
                        ? 'border-[#008C95] ring-2 ring-[#008C95]/20' 
                        : 'border-[#E2E8F0] hover:border-[#008C95]'
                    }`}
                    onClick={() => setSelectedImageIndex(i + 1)}
                  >
                    <Image 
                      src={img} 
                      alt={`View ${i + 2}`} 
                      fill 
                      sizes="72px" 
                      className="object-cover" 
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Quick Sourcing Assurance */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] text-xs text-muted-foreground flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008C95] shrink-0" />
                Technical specification verification prior to dispatch
              </span>
              <span className="font-bold text-[#0B153B] uppercase text-[11px] shrink-0">B2B Supply</span>
            </div>
          </motion.div>

          {/* Right Column: Details & RFQ Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div>
              {/* Badges Row: Brand, Condition & Stock Status */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {brandName && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0095A8]/10 text-[#0095A8] border border-[#0095A8]/25 text-[11px] font-extrabold uppercase tracking-wider">
                    {brandName}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-[#061D45]/10 text-[#061D45] border border-[#061D45]/20 text-[11px] font-bold uppercase tracking-wider">
                  {product.condition === 'new' ? 'Brand New' : product.condition === 'refurbished' ? 'Refurbished' : 'Used & Bench Tested'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/25 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {product.availability === 'out-of-stock' ? 'Lead Time on Request' : 'Ready Stock • Alang Hub'}
                </span>
              </div>

              <h1 className="font-sans text-2xl sm:text-3xl font-black text-primary mb-2 uppercase tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Part Number & Price / RFQ Summary */}
              <div className="flex flex-wrap items-center gap-4 py-2 border-y border-[#E2E8F0] my-3">
                {product.sku && (
                  <div className="text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">Part Number: </span>
                    <span className="font-mono font-black text-[#061D45] text-sm bg-slate-100 px-2 py-0.5 rounded">{product.sku}</span>
                  </div>
                )}
                {product.price && product.price > 0 ? (
                  <div className="text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">Commercial Price: </span>
                    <span className="font-sans font-black text-emerald-600 text-base">${product.price.toFixed(2)} USD</span>
                  </div>
                ) : (
                  <div className="text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">Pricing: </span>
                    <span className="font-sans font-bold text-[#0095A8]">B2B Wholesale / Fast Proforma RFQ</span>
                  </div>
                )}
              </div>

              {/* Quick Action Buttons: WhatsApp & Direct Call */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <a
                  href={`https://wa.me/916356547827?text=${encodeURIComponent(`Hello Tawwakal Automation, I need an urgent quotation and availability check for: ${product.title} (Part No: ${product.sku || product.partNumber || slug}). Please share FOB / CIF price and lead time.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp Quote</span>
                </a>

                <a
                  href="tel:+916356547827"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061D45] hover:bg-[#0095A8] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 6356547827</span>
                </a>
              </div>

              {product.description && (
                <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed mb-4 border-l-2 border-[#0095A8] pl-3.5">
                  {product.description}
                </p>
              )}
            </div>

            {/* Request a Quote Form Section */}
            <div className="my-4 p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B153B]">
                    Request a Quotation for this Item
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Submit your details and required quantity for commercial pricing.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#008C95]/10 text-[#008C95] text-[10px] font-bold uppercase tracking-wider">
                  RFQ
                </span>
              </div>
              <OrderForm productId={product._id} productTitle={product.title} />
            </div>

            {/* Technical Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B153B] mb-2.5">
                  Technical Specifications
                </h3>
                <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden text-xs">
                  {Object.entries(product.specifications).map(([key, val]: [string, any], idx) => (
                    <div 
                      key={key} 
                      className={`grid grid-cols-2 p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'} border-b border-[#E2E8F0] last:border-b-0`}
                    >
                      <span className="font-semibold text-muted-foreground uppercase">{key}</span>
                      <span className="font-medium text-[#0B153B]">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Direct Enquiry CTA */}
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-muted-foreground">
              <span>Have a question about this equipment?</span>
              <Link href="/contact" className="text-[#008C95] font-bold hover:underline flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Customer / Installation Verification Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <h3 className="text-base sm:text-lg font-bold text-[#0B153B] uppercase tracking-wider mb-4">
              Verified Operational Feedback
            </h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {product.reviews.map((rev: any, i: number) => (
                <div key={i} className="p-4 sm:p-5 bg-white rounded-2xl border border-[#E2E8F0]">
                  <div className="flex text-[#008C95] mb-2">
                    {[...Array(rev.rating || 5)].map((_, s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed mb-2.5">&ldquo;{rev.comment}&rdquo;</p>
                  <p className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                    {rev.userName || "Verified Client"} &bull; {rev.date ? new Date(rev.date).toLocaleDateString() : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <h3 className="text-base sm:text-lg font-bold text-[#0B153B] uppercase tracking-wider mb-6">
              Related Equipment &amp; Spares
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0B153B]/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-50"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </main>
  );
}
