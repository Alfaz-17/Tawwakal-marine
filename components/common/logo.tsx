import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = "", variant = 'dark', size = 'md' }: LogoProps) {
  const isWhite = variant === 'white'

  const sizeHeights = {
    sm: 'h-20 sm:h-24',
    md: 'h-28 sm:h-32',
    lg: 'h-36 sm:h-44',
  }[size]

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <div 
        className={`relative flex items-center justify-center overflow-hidden rounded-lg transition-all duration-200 ${
          isWhite 
            ? 'bg-white/95 px-2.5 py-1 shadow-xs border border-white/20' 
            : 'mix-blend-multiply'
        }`}
      >
        <Image
          src="/logo.gif"
          alt="Tawwakal Automation - Industrial & Marine Automation"
          width={240}
          height={135}
          unoptimized
          priority
          className={`${sizeHeights} w-auto object-contain`}
        />
      </div>
    </div>
  )
}
