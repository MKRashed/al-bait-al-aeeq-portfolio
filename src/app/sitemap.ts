import type { MetadataRoute } from 'next';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
