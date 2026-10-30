"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, CheckCircle2, ShieldCheck } from "lucide-react"

export function QuickRFQBar() {
  const router = useRouter()
  const [partNumber, setPartNumber] = useState("")
  const [brand, setBrand] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [destination, setDestination] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!partNumber.trim()) return

    const params = new URLSearchParams()
    if (partNumber) params.set("partNumber", partNumber.trim())
    if (brand) params.set("brand", brand)
    if (quantity) params.set("quantity", quantity)
    if (destination) params.set("destination", destination)

    router.push(`/contact?${params.toString()}`)
  }

  const handleSearchInventory = () => {
    if (!partNumber.trim()) return
    router.push(`/products?q=${encodeURIComponent(partNumber.trim())}`)
  }

  return (
    <div className="relative z-30 -mt-5 sm:-mt-6 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(11,21,59,0.08)] border border-[#E2E8F0]">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008C95] animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0B153B]">
              RAPID RFQ &amp; PART NUMBER INVENTORY SEARCH
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10.5px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#008C95]" />
              Quotes in &lt; 2 Hours
            </span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008C95]" />
              Alang Direct Stock
            </span>
          </div>
        </div>

        {/* 4-Field Fast Procurement Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          
          {/* Field 1: Part Number / Model */}
          <div className="lg:col-span-4">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B153B] mb-1">
              Part Number or Model <span className="text-[#008C95]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
                placeholder="e.g. 6ES7315-2EH14-0AB0 / ACS800"
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#008C95] focus:bg-white text-xs sm:text-sm font-mono text-[#0B153B] placeholder:text-muted-foreground/60 rounded-xl py-2 pl-3 pr-8 outline-hidden transition-all"
              />
              <button
                type="button"
                onClick={handleSearchInventory}
                title="Search live stock catalog"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#008C95] transition-colors p-1"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Field 2: OEM Brand */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B153B] mb-1">
              OEM Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#008C95] focus:bg-white text-xs sm:text-sm text-[#0B153B] rounded-xl py-2 px-3 outline-hidden transition-all"
            >
              <option value="">Any Brand</option>
              <option value="Siemens">Siemens</option>
              <option value="Allen-Bradley">Allen-Bradley</option>
              <option value="ABB">ABB</option>
              <option value="Danfoss">Danfoss</option>
              <option value="Schneider Electric">Schneider</option>
              <option value="Omron">Omron</option>
              <option value="Woodward">Woodward</option>
              <option value="Graviner">Graviner</option>
              <option value="Furuno">Furuno</option>
            </select>
          </div>

          {/* Field 3: Target Port or City */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B153B] mb-1">
              Delivery Port or City
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Singapore / Rotterdam"
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#008C95] focus:bg-white text-xs sm:text-sm text-[#0B153B] placeholder:text-muted-foreground/60 rounded-xl py-2 px-3 outline-hidden transition-all"
            >
            </input>
          </div>

          {/* Field 4: Submit Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#008C95] hover:bg-[#00767E] text-white rounded-xl py-2 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.98] flex items-center justify-center gap-1.5 min-h-[38px]"
            >
              <span>Instant RFQ</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}
