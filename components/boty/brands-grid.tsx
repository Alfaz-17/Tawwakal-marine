"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionDecorations } from "@/components/common/section-decorations";
import api from "@/lib/api";

const DEFAULT_BRANDS = [
  { name: "Siemens", logo: "/brands/siemens.svg" },
  { name: "ABB", logo: "/brands/abb.svg" },
  { name: "Schneider Electric", logo: "/brands/schneider.svg" },
  { name: "Mitsubishi Electric", logo: "/brands/mitsubishi.svg" },
  { name: "Omron", logo: "/brands/omron.svg" },
  { name: "Danfoss", logo: "/brands/danfoss.svg" },
  { name: "Allen-Bradley", logo: "/brands/allen-bradley.svg" },
  { name: "Beckhoff", logo: "/brands/beckhoff.svg" },
  { name: "Alfa Laval", logo: "/brands/alfalaval.svg" },
  { name: "Woodward", logo: "/brands/woodward.svg" },
  { name: "Rosemount", logo: "/brands/rosemount.svg" },
  { name: "Furuno", logo: "/brands/furuno.svg" },
  { name: "Consilium", logo: "/brands/consilium.svg" },
  { name: "Graviner", logo: "/brands/graviner.svg" },
  { name: "Sperry Marine", logo: "/brands/sperry.svg" },
];

export function BrandGrid() {
  const [brands, setBrands] = useState<{ name: string; logo: string }[]>(DEFAULT_BRANDS);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await api.get("/brands");
        if (Array.isArray(res.data) && res.data.length > 0) {
          const apiBrands = res.data
            .filter((b: any) => b?.logo)
            .map((b: any) => ({
              name: b.name || "Brand",
              logo: b.logo,
            }));
          if (apiBrands.length >= 4) {
            setBrands(apiBrands);
          }
        }
      } catch (error) {
        // Fallback to DEFAULT_BRANDS seamlessly
      }
    };

    fetchBrands();
  }, []);

  // Duplicate for seamless 50% marquee loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-8 sm:py-16 bg-[#F1F6FA] relative overflow-hidden border-b border-[#CBD5E1]">
      {/* Decorative Wave Geometry */}
      <SectionDecorations variant="teal-lines" />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-4 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#0095A8] mb-1.5 sm:mb-2">
          <span>COMPATIBILITY &amp; SOURCING</span>
        </div>
        <h3 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#061D45] uppercase tracking-tight">
          BRANDS &amp; TECHNOLOGY PLATFORMS
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2 max-w-xl mx-auto leading-relaxed">
          Supporting equipment, modules, and spare parts identification across global marine machinery and automation manufacturers.
        </p>
      </div>

      {/* Infinite Continuous Marquee */}
      <div className="relative z-10 w-full overflow-hidden py-2 sm:py-3">
        {/* Left & Right Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-[#F1F6FA] to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-[#F1F6FA] to-transparent pointer-events-none z-20" />

        <div className="animate-marquee-brands flex gap-2.5 sm:gap-6 items-center">
          {duplicatedBrands.map((brand, index) => (
            <Link
              key={`${brand.name}-${index}`}
              href={`/brand/${encodeURIComponent(brand.name)}`}
              className="group flex-none w-32 sm:w-52 h-14 sm:h-24 bg-white border border-[#CBD5E1] hover:border-[#0095A8] rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 shadow-xs relative overflow-hidden"
              title={brand.name}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain p-1 sm:p-2 filter contrast-125 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 128px, 208px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
