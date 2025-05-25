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
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}