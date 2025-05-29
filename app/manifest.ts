import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MTsN 1 Ciamis | Matsa App',
    short_name: 'Matsa App',
    description: 'Situs resmi MTsN 1 Ciamis untuk transparansi akademik, kepegawaian, dan informasi madrasah.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}