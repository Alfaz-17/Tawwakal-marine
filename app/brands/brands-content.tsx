"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { MarineLoader } from '@/components/common/marine-loader';
import Breadcrumbs from '@/components/seo/breadcrumbs';
import { ArrowRight, Layers } from 'lucide-react';

export default function BrandsContent() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await api.get("/brands");
        if (Array.isArray(res.data)) {
          setBrands(res.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) return <MarineLoader />;

  return (
    <main className="min-h-screen pb-16">
      {/* Page Hero Header */}
      <div className="pt-8 sm:pt-10 pb-4 text-center relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] uppercase text-accent mb-2"
          >
            <span>Component Manufacturers</span>
            </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-primary uppercase leading-tight mb-2 max-w-4xl mx-auto"
          >
            SUPPORTED EQUIPMENT BRANDS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            We handle parts identification, specification review, and sourcing for leading marine and industrial automation manufacturers.
          </motion.p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <Breadcrumbs items={[
          { label: 'Brands', href: '/brands' },
        ]} />
      </div>

      {/* Brands Grid */}
      <section className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B153B] uppercase tracking-tight mb-1.5">
            Manufacturers &amp; OEM Platforms
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Browse brands handled within our supply and sourcing scope. Select a brand to explore compatible spare parts or submit your part number directly.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <Link 
              key={brand._id}
              href={`/brand/${encodeURIComponent(brand.name)}`}
              className="group block"
            >
              <motion.div
                className="relative aspect-square bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#008C95] transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col items-center justify-center p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={`${brand.name} - Equipment & Spare Parts`}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-85 group-hover:opacity-100"
                  />
                ) : (
                  <span className="text-xs font-bold text-[#0B153B] text-center uppercase tracking-wider">
                    {brand.name}
                  </span>
                )}
                
                <div className="absolute inset-x-0 bottom-0 bg-[#0B153B]/95 text-white py-2 px-3 text-center opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center justify-center gap-1">
                    View Parts <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {brands.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl bg-[#F4F7FA]">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
              Brand records are being synchronized.
            </p>
          </div>
        )}
      </section>

      {/* Sourcing Notice */}
      <section className="py-8 bg-[#FAF8F5] border-t border-[#E2E8F0] mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h3 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-1.5">
              Need Sourcing for Another Manufacturer?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
              Our sourcing network handles components across a broad range of legacy and active OEMs. If your required equipment manufacturer is not listed, send us your equipment data plate or part numbers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-[#0B153B]"
            >
              <span>Submit Custom Requirement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
