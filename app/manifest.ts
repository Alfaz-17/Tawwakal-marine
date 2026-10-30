import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tawwakal Automation',
    short_name: 'Tawwakal',
    description: 'Marine & Industrial Equipment Supplier',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B153B',
    theme_color: '#0B153B',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
