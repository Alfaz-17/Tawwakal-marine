"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { MarineLoader } from '@/components/common/marine-loader';
import { ProductCard } from '@/components/product-card';
import Breadcrumbs from '@/components/seo/breadcrumbs';
import { FileText, ArrowRight } from 'lucide-react';

export default function BrandDetailContent() {
  const params = useParams();
  const brandName = params.brandName as string;
  const [products, setProducts] = useState<any[]>([]);
  const [brandInfo, setBrandInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const displayName = decodeURIComponent(brandName).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        setLoading(true);
        const brandsRes = await api.get('/brands');
        const targetBrand = Array.isArray(brandsRes.data) ? brandsRes.data.find((b: any) => 
          b._id === brandName || 
          b.name.toLowerCase().replace(/\s+/g, '-') === brandName.toLowerCase() ||
          b.name === decodeURIComponent(brandName)
        ) : null;

        if (targetBrand) {
          setBrandInfo(targetBrand);
        }

        const res = await api.get(`/products?brand=${targetBrand ? targetBrand._id : brandName}`);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Error fetching brand products:", error);
      } finally {
        setLoading(false);
      }
    };
    if (brandName) fetchBrandProducts();
  }, [brandName]);

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
            <span>Manufacturer Catalog</span>
            </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-primary uppercase leading-tight mb-2 max-w-4xl mx-auto"
          >
            {displayName} EQUIPMENT &amp; SPARES
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Explore available equipment, modules, and spare parts for <strong>{displayName}</strong>. Submit your specific part number or requirement for commercial review.
          </motion.p>
          <div className="mt-2 text-[11px] font-bold text-[#008C95] uppercase tracking-wider">
            {products.length} item(s) cataloged under this manufacturer
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <Breadcrumbs items={[
          { label: 'Brands', href: '/brands' },
          { label: displayName, href: `/brand/${brandName}` },
        ]} />

        {products.length === 0 ? (
           <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl bg-white p-6 sm:p-8 mt-6">
              <h2 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase mb-2">No Specific Catalog Listings for {displayName}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-5">
                We frequently source {displayName} equipment upon request. Send us your required part number or equipment nameplate.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="px-5 py-2.5 bg-[#008C95] hover:bg-[#007077] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors">
                  Request {displayName} Sourcing
                </Link>
                <Link href="/products" className="px-5 py-2.5 border border-[#E2E8F0] text-[#0B153B] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#FAF8F5] transition-colors">
                  View All Products
                </Link>
              </div>
           </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-6 mt-4 sm:mt-6">
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Brand Procurement Support */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase tracking-wider mb-1.5">
              Looking for a Specific {displayName} Part Number?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              If your required component, card, sensor, or assembly is not shown, share the serial number or equipment plate. Our team will verify availability through our sourcing channels.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="px-5 py-3 bg-[#0B153B] hover:bg-[#008C95] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-sm"
          >
            Submit {displayName} Enquiry
          </Link>
        </div>
      </div>
    </main>
  );
}
