import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { FloatingWhatsappButton } from "@/components/common/floating-whatsapp-button"
import { AuthProvider } from "@/components/contexts/auth-context"
import StructuredData from "@/components/seo/structured-data"
import { AiChatWidget } from "@/components/chat/ai-chat-widget"

export const metadata: Metadata = {
  metadataBase: new URL('https://tawwakalautomation.com'),
  title: {
    default: 'Tawwakal Automation | Marine & Industrial Automation Equipment Supplier',
    template: '%s | Tawwakal Automation'
  },
  description: 'Global stockist & exporter of marine and industrial automation spare parts based in Bhavnagar / Alang. Tested PLCs, HMIs, VFD drives, circuit breakers, and navigation electronics with express worldwide dispatch.',
  keywords: [
    'Tawwakal Automation',
    'marine equipment supplier',
    'ship spare parts supplier',
    'industrial automation products',
    'marine automation spare parts',
    'Alang ship breaking spare parts',
    'Siemens PLC spares',
    'ABB drives stockist',
    'Danfoss marine inverters',
    'used tested industrial electronics',
    'ship automation exporter India',
    'Bhavnagar automation stockist',
    'marine navigation equipment'
  ],
  authors: [{ name: 'Tawwakal Automation', url: 'https://tawwakalautomation.com' }],
  creator: 'Tawwakal Automation',
  publisher: 'Tawwakal Automation',
  category: 'Industrial & Marine Automation Equipment',
  alternates: {
    canonical: 'https://tawwakalautomation.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tawwakalautomation.com',
    siteName: 'Tawwakal Automation',
    title: 'Tawwakal Automation | Marine & Industrial Equipment Supplier',
    description: 'B2B stockist & global exporter of marine and industrial automation parts: PLCs, HMIs, VFD drives, sensors, and marine electronics sourced directly from Alang hub.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tawwakal Automation - Global Marine & Industrial Automation Stockist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawwakal Automation | Marine & Industrial Equipment Supplier',
    description: 'Global B2B supplier of verified marine equipment, ship spares, and industrial automation electronics.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0B153B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <StructuredData />
        <AuthProvider>
          <Header />
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <Footer />
          <FloatingWhatsappButton />
          <AiChatWidget />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
