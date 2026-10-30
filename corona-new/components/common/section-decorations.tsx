"use client"

import React from "react"

interface SectionDecorationProps {
  variant?: "light-wave" | "navy-curves" | "teal-lines" | "grid-dots" | "industrial-subtle"
  className?: string
}

export function SectionDecorations({ variant = "light-wave", className = "" }: SectionDecorationProps) {
  if (variant === "navy-curves") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`} aria-hidden="true">
        {/* Subtle Navy Geometric Wave Shapes in Corners */}
        <svg
          className="absolute -top-24 -right-24 w-96 h-96 opacity-[0.07] text-[#061D45]"
          viewBox="0 0 400 400"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 310,40 400,200 L400,0 Z" />
        </svg>

        <svg
          className="absolute -bottom-24 -left-24 w-96 h-96 opacity-[0.06] text-[#0095A8]"
          viewBox="0 0 400 400"
          fill="currentColor"
        >
          <path d="M0,200 C90,310 250,350 400,400 L0,400 Z" />
        </svg>

        {/* Floating Teal Curved Flow Line */}
        <svg
          className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-25"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          fill="none"
        >
          <path
            d="M0,60 C300,120 600,0 900,70 C1050,100 1150,30 1200,50"
            stroke="#0095A8"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        </svg>
      </div>
    )
  }

  if (variant === "teal-lines") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`} aria-hidden="true">
        {/* Thin Teal/Cyan Curved Geometry */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          preserveAspectRatio="none"
          viewBox="0 0 1440 600"
          fill="none"
        >
          <path
            d="M-100,120 C320,380 780,-80 1200,240 C1380,360 1500,200 1600,180"
            stroke="#0095A8"
            strokeWidth="1.2"
          />
          <path
            d="M-50,180 C360,430 820,-30 1240,290 C1410,400 1520,250 1620,230"
            stroke="#061D45"
            strokeWidth="1"
            strokeOpacity="0.15"
          />
        </svg>

        {/* Dotted Grid Pattern in Top Corner */}
        <div 
          className="absolute top-4 right-8 w-44 h-44 opacity-25"
          style={{
            backgroundImage: "radial-gradient(#0095A8 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px"
          }}
        />
      </div>
    )
  }

  if (variant === "grid-dots") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`} aria-hidden="true">
        {/* Subtle Technical Dot Matrix */}
        <div 
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(#061D45 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Corner Cyan Glow Accent */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#0095A8]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#061D45]/5 blur-3xl" />
      </div>
    )
  }

  // Default: Light Wave Gradient
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`} aria-hidden="true">
      {/* Soft Waveform Flow Line */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-24 opacity-20 text-[#0095A8]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        fill="none"
      >
        <path
          d="M0,0 C150,80 350,110 500,60 C650,10 900,90 1200,20 L1200,120 L0,120 Z"
          fill="currentColor"
          fillOpacity="0.08"
        />
        <path
          d="M0,40 C200,95 400,20 600,70 C800,120 1000,45 1200,65"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      {/* Subtle Dotted Cluster */}
      <div 
        className="absolute bottom-6 left-8 w-32 h-20 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#0095A8 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px"
        }}
      />
    </div>
  )
}

