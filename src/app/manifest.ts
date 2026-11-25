import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';

// Lets visitors "Add to Home Screen" and open the site like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: 'Maintenance, fit-out and cleaning services in Dubai. Book on WhatsApp or call.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#141c5c',
    categories: ['business', 'lifestyle'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'All services', url: '/services' },
      { name: 'Get a quote', url: '/#contact' },
    ],
  };
}
