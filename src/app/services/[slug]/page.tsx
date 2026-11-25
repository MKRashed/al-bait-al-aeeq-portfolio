import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/Chrome';
import { WhatsAppIcon } from '@/components/Icons';
import QuoteForm from '@/components/QuoteForm';
import { SERVICES, categoryById, serviceBySlug, servicesIn } from '@/data/services';
import { SITE, bookLink } from '@/data/site';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  const title = `${s.name} in Dubai`;
  return {
    title,
    description: s.meta,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${title} | ${SITE.shortName}`, description: s.meta, url: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const cat = categoryById(s.cat);
  const related = servicesIn(s.cat).filter((r) => r.slug !== s.slug);
  const url = `${SITE.url}/services/${s.slug}`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      serviceType: s.name,
      description: s.meta,
      url,
      areaServed: { '@type': 'City', name: SITE.city },
      provider: { '@id': `${SITE.url}/#business` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
        { '@type': 'ListItem', position: 3, name: s.name, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <section className="deep page-hero">
        <div className="wrap">
          <div>
            <ol className="crumbs">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li aria-current="page">{s.name}</li>
            </ol>
            <h1>{s.name} in Dubai</h1>
            <p className="hero-lead">{s.desc} For villas, apartments, offices and shops across Dubai.</p>
            <div className="hero-ctas" style={{ marginTop: 24 }}>
              <a className="btn btn-wa" href={bookLink(s.name)} target="_blank" rel="noopener"><WhatsAppIcon />Book on WhatsApp</a>
              <a className="btn btn-ghost" href={`tel:${SITE.phones[0].tel}`}>Call {SITE.phones[0].display}</a>
            </div>
          </div>
          <div className="page-hero-img">
            <Image src={cat.image} alt={cat.imageAlt} fill preload sizes="(max-width: 900px) 100vw, 560px" className="cover" placeholder="blur" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap detail">
          <article className="prose">
            <h2>About our {s.name.toLowerCase()} service</h2>
            <p>{s.intro}</p>
            <h2>What&apos;s included</h2>
            <ul className="ticks">{s.includes.map((x) => <li key={x}>{x}</li>)}</ul>
            <h2>How it works</h2>
            <p>Send us a message or call with your location and a short description. We arrange a visit, check the job and give you the price and timing before any work starts. Nothing begins without your approval, and the team cleans up when the work is done.</p>
            <h2>Frequently asked questions</h2>
            <div className="faq">
              {s.faqs.map((f) => (
                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
              ))}
            </div>
          </article>
          <aside className="aside">
            <div className="cta-card">
              <b>Need {s.name.toLowerCase()}?</b>
              <p>Send a photo of the job on WhatsApp and get a quote faster.</p>
              <a className="btn btn-wa" href={bookLink(s.name)} target="_blank" rel="noopener"><WhatsAppIcon />WhatsApp us</a>
              {SITE.phones.map((p) => <a key={p.tel} className="btn btn-ghost" href={`tel:${p.tel}`}>Call {p.display}</a>)}
            </div>
            {related.length > 0 && (
              <nav className="related" aria-label={`More ${cat.label} services`}>
                <h2>More {cat.label} services</h2>
                <ul>{related.map((r) => <li key={r.slug}><Link href={`/services/${r.slug}`}>{r.name}</Link></li>)}</ul>
              </nav>
            )}
          </aside>
        </div>
      </section>

      <section className="section deep contact" aria-labelledby="quote-title">
        <div className="wrap">
          <div className="head-col">
            <p className="eyebrow">Get a quote</p>
            <h2 id="quote-title" className="h2">Tell us about your {s.name.toLowerCase()} job</h2>
            <p className="lead">Fill in the form and it opens WhatsApp with your message ready to send.</p>
          </div>
          <QuoteForm defaultService={s.name} />
        </div>
      </section>
    </>
  );
}
