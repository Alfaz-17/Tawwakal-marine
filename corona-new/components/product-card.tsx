"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react"

interface ProductCardProps {
  product: {
    _id: string
    slug?: string
    title: string
    image?: string
    partNumber?: string
    modelNumber?: string
    sku?: string
    condition?: string
    brandName?: string
    brand?: {
      name: string
    }
    category?: {
      name: string
      slug?: string
    }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.image || "/placeholder.svg")
  const [hasError, setHasError] = useState(false)

  const brandName = product.brandName || product.brand?.name || ''
  const categoryName = product.category?.name || 'Automation Spares'
  const partNumber = product.partNumber || product.sku || product.modelNumber || ''
  const altText = `${product.title}${partNumber ? ` [${partNumber}]` : ''}${brandName ? ` - ${brandName}` : ''} | Tawwakal Automation`

  const formatCondition = (cond?: string) => {
    switch (cond) {
      case 'brand-new-sealed':
        return 'Brand New Factory Sealed'
      case 'new-open-box':
        return 'New Surplus / Open Box'
      case 'used-tested':
        return 'Pre-Owned Tested'
      case 'reconditioned':
        return 'Fully Reconditioned'
      default:
        return '100% Bench Tested'
    }
  }

  return (
    <Link 
      href={`/product/${product.slug || product._id}`} 
      className="group flex flex-col h-full bg-white rounded-xl sm:rounded-2xl border border-[#CBD5E1] hover:border-[#0095A8] hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 shadow-[0_3px_12px_rgba(6,29,69,0.05)]"
    >
      {/* Product Image Canvas - Full width, maximized image display */}
      <div className="aspect-square relative w-full overflow-hidden bg-[#FAF8F5] border-b border-[#E2E8F0]">
        <Image 
          src={imgSrc} 
          alt={altText}
          title={`${product.title} - ${categoryName}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setImgSrc("/placeholder.svg");
            }
          }}
          className="object-contain p-2.5 sm:p-4 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Floating Category Pill */}
        <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 max-w-[65%]">
          <span className="bg-white/95 backdrop-blur-md text-[#0B153B] border border-[#E2E8F0] px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-full shadow-2xs truncate block">
            {categoryName}
          </span>
        </div>

        {/* Condition Verified Pill */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5">
          <span className="bg-[#008C95]/90 backdrop-blur-md text-white px-1.5 sm:px-2 py-0.5 text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider rounded-full shadow-2xs flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span className="hidden xs:inline">Tested</span>
          </span>
        </div>

        {/* Floating Arrow Pill */}
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 backdrop-blur-md text-[#0B153B] flex items-center justify-center shadow-xs group-hover:bg-[#0095A8] group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
      
      {/* Product Information */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Part Number Row */}
          <div className="flex items-center justify-between gap-1 mb-1">
            {brandName ? (
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#0095A8] uppercase truncate">
                {brandName}
              </span>
            ) : (
              <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase">
                OEM Stock
              </span>
            )}

            {partNumber && (
              <span className="font-mono text-[8.5px] sm:text-[9.5px] font-semibold bg-[#F4F7FA] text-[#0B153B] px-1 sm:px-1.5 py-0.5 rounded-xs border border-[#E2E8F0] tracking-tight truncate max-w-[85px] sm:max-w-[130px]">
                {partNumber}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-sans text-[11.5px] sm:text-[13px] font-bold text-[#0B153B] group-hover:text-[#0095A8] transition-colors line-clamp-2 leading-tight mb-1.5 sm:mb-2">
            {product.title}
          </h3>

          {/* Condition Tag */}
          <div className="text-[9px] sm:text-[10px] text-muted-foreground flex items-center gap-1 mb-2 sm:mb-3">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0095A8] shrink-0" />
            <span className="truncate">{formatCondition(product.condition)}</span>
          </div>
        </div>

        {/* Bottom RFQ Trigger */}
        <div className="pt-2 sm:pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] sm:text-[10px]">
          <span className="font-bold text-[#0095A8] uppercase tracking-wide">
            In Stock
          </span>
          <span className="font-bold tracking-wider uppercase text-[#0B153B] group-hover:text-[#0095A8] transition-colors flex items-center gap-0.5 sm:gap-1">
            <span>Quote</span>
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
