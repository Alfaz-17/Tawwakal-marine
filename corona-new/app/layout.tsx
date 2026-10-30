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
    default: 'Tawwakal Automation | Marine & Industrial Equipment Supplier',
    template: '%s | Tawwakal Automation'
  },
  description: 'Tawwakal Automation supports marine, shipping, engineering, and industrial businesses with marine equipment, ship spare parts, industrial automation products, electrical and mechanical components, and supply assistance.',
  keywords: [
    'Tawwakal Automation',
    'marine equipment supplier',
    'ship spare parts',
    'industrial automation products',
    'electrical and mechanical components',
    'industrial control systems',
    'marine spare parts supplier',
    'ship automation systems',
    'industrial equipment sourcing',
    'marine engineering supplies',
    'commercial vessel parts',
    'PLC automation spares'
  ],
  authors: [{ name: 'Tawwakal Automation' }],
  creator: 'Tawwakal Automation',
  publisher: 'Tawwakal Automation',
  alternates: {
    canonical: '/',
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
    description: 'B2B supplier of marine equipment, ship spare parts, industrial automation systems, and electrical/mechanical components.',
    images: [
      {
        url: '/hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'Tawwakal Automation - Marine & Industrial Equipment Supply',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawwakal Automation | Marine & Industrial Equipment Supplier',
    description: 'B2B supply partner for marine equipment, ship spares, and industrial automation.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png' },
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
