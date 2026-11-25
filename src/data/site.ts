// Single source of truth for business details. Update here and every page,
// the JSON-LD schema, sitemap and WhatsApp links follow.

export const SITE = {
  // Set NEXT_PUBLIC_SITE_URL to the real domain before going live
  // (used for canonical URLs, sitemap, robots and Open Graph).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  name: 'Al Bait Al Ateeq Technical Services Co.',
  shortName: 'Al Bait Al Ateeq',
  arabicName: 'البيت العتيق للخدمات الفنية',
  contactPerson: 'Muhammad Kiran Nabi',
  email: 'kirannabi6@gmail.com',
  phones: [
    { display: '050 352 4571', tel: '+971503524571' },
    { display: '055 649 8803', tel: '+971556498803' },
  ],
  whatsapp: '971503524571',
  city: 'Dubai',
  country: 'United Arab Emirates',
  countryCode: 'AE',
  defaultWhatsAppMessage: 'Hello, I need a technical service in Dubai.',
  // Shows a small "Sample photo" tag on gallery images and labels the
  // gallery as examples. False now that the gallery uses the company's own job photos.
  samplePhotos: false,
};

export const waLink = (text: string = SITE.defaultWhatsAppMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const bookLink = (serviceName: string) =>
  waLink(`Hello, I need ${serviceName} in Dubai.`);
