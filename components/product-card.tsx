"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowRight } from "lucide-react"

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
  const partNumber = product.partNumber || product.sku || product.modelNumber || ''
  const altText = `${product.title}${partNumber ? ` [${partNumber}]` : ''}${brandName ? ` - ${brandName}` : ''} | Tawwakal Marine`

  const formatCondition = (cond?: string) => {
    switch (cond) {
      case 'brand-new-sealed':
        return 'Brand New (Sealed)'
      case 'new-open-box':
        return 'New Surplus'
      case 'used-tested':
        return 'Tested & Working'
      case 'reconditioned':
        return 'Reconditioned'
      default:
        return 'Tested & Working'
    }
  }

  return (
    <Link 
      href={`/product/${product.slug || product._id}`} 
      className="group flex flex-col h-full bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-[#0095A8] hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Product Image - Clean, uncluttered canvas */}
      <div className="aspect-square relative w-full overflow-hidden bg-slate-50/70 border-b border-slate-100 flex items-center justify-center">
        <Image 
          src={imgSrc} 
          alt={altText}
          title={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setImgSrc("/placeholder.svg");
            }
          }}
          className="object-contain p-3.5 sm:p-5 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Brand & Part Number Row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold tracking-wider text-[#0095A8] uppercase truncate">
              {brandName || 'OEM GENUINE'}
            </span>
            {partNumber && (
              <span className="font-mono text-[10px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/70 truncate max-w-[120px]">
                {partNumber}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-sans text-[12.5px] sm:text-[13.5px] font-semibold text-slate-900 group-hover:text-[#0095A8] transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>

          {/* Condition */}
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate">{formatCondition(product.condition)}</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
          <span className="text-xs font-semibold text-[#0095A8] group-hover:text-[#061D45] flex items-center gap-1 transition-colors">
            Get Quote
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
