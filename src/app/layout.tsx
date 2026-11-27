import type { Metadata, Viewport } from 'next';
import { Archivo, Caveat, DM_Sans, Noto_Kufi_Arabic } from 'next/font/google';
import { FloatingWhatsApp, Footer, Header, JsonLd } from '@/components/Chrome';
import { Suspense } from 'react';
import MetaPixel from '@/components/MetaPixel';
import TabBar from '@/components/TabBar';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-archivo' });
const dm = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dm' });
const kufi = Noto_Kufi_Arabic({ subsets: ['arabic'], weight: ['700'], variable: '--font-kufi' });
const caveat = Caveat({ subsets: ['latin'], weight: ['600'], variable: '--font-caveat' });

const description =
  'AC, electrical, plumbing, painting, cleaning and fit-out services for homes and offices in Dubai. Call or WhatsApp 050 352 4571.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Al Bait Al Ateeq | Maintenance & Fit-out in Dubai',
    template: '%s | Al Bait Al Ateeq',
  },
  description,
  keywords: [
    'maintenance company Dubai',
    'AC repair Dubai',
    'electrician Dubai',
    'plumber Dubai',
    'painting services Dubai',
    'villa fit-out Dubai',
    'tiling and masonry Dubai',
    'interlock paving Dubai',
    'cleaning services Dubai',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  applicationName: SITE.shortName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: SITE.name,
    title: 'Al Bait Al Ateeq Technical Services – Dubai',
    description,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
  appleWebApp: { capable: true, title: SITE.shortName, statusBarStyle: 'black-translucent' },
  // Meta (Facebook) domain verification; must be in the server-rendered <head>.
  other: { 'facebook-domain-verification': 'iqg2vu20s7yjuftg594145w8pld6jx' },
};

export const viewport: Viewport = { themeColor: '#141c5c', viewportFit: 'cover' };

// LocalBusiness structured data: helps Google show the business, phone and
// services for local searches ("AC repair Dubai", "painting company Dubai").
const business = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: [SITE.shortName, SITE.arabicName],
  url: SITE.url,
  logo: `${SITE.url}/icon.png`,
  image: `${SITE.url}/opengraph-image.jpg`,
  email: SITE.email,
  telephone: SITE.phones.map((p) => p.tel),
  address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: SITE.countryCode },
  areaServed: { '@type': 'City', name: SITE.city },
  founder: { '@type': 'Person', name: SITE.contactPerson },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Technical services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, url: `${SITE.url}/services/${s.slug}` },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${dm.variable} ${kufi.variable} ${caveat.variable}`}>
      <body>
        <JsonLd data={business} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <TabBar />
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      </body>
    </html>
  );
}
