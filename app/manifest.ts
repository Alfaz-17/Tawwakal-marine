import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tawwakal Automation | Marine & Industrial Equipment Supplier',
    short_name: 'Tawwakal',
    description: 'Global stockist and exporter of industrial and marine automation spare parts: PLCs, HMIs, VFD drives, navigation electronics, and genuine surplus components.',
    start_url: '/',
    display: 'standalone',
    background_color: '#04122E',
    theme_color: '#04122E',
    categories: ['business', 'industrial', 'marine', 'engineering'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
