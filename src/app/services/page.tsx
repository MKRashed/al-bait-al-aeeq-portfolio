import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/Chrome';
import { CATEGORIES, SERVICES, servicesIn } from '@/data/services';
import { SITE, waLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'All Technical Services in Dubai',
  description: `${SERVICES.length} home and office services in Dubai: AC repair, electrical, plumbing, painting, gypsum, false ceiling, tiling, carpentry, cleaning, landscaping and pressure washing.`,
  alternates: { canonical: '/services' },
};

export default function ServicesIndex() {
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
    ],
  };
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="deep page-hero">
        <div className="wrap" style={{ display: 'block' }}>
          <ol className="crumbs"><li><Link href="/">Home</Link></li><li>Services</li></ol>
          <h1>Technical services in Dubai</h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            {SERVICES.length} services for villas, apartments, offices and shops, from one company. Choose a service to see what&apos;s included, or send us the job on WhatsApp.
          </p>
          <div className="hero-ctas" style={{ marginTop: 24 }}>
            <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener">WhatsApp us</a>
            <a className="btn btn-ghost" href={`tel:${SITE.phones[0].tel}`}>Call {SITE.phones[0].display}</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="cat-block">
              <h2 className="h2" style={{ fontSize: 'clamp(26px,3vw,34px)' }}>{c.label}</h2>
              <div className="cards">
                {servicesIn(c.id).map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card">
                    <b>{s.name}</b><span>{s.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
