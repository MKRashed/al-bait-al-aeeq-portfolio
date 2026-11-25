import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';
import { SITE, waLink } from '@/data/site';
import { CATEGORIES, servicesIn } from '@/data/services';
import { WhatsAppIcon } from './Icons';

export { WhatsAppIcon };

async function currentYear() {
  'use cache';
  return new Date().getFullYear();
}

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/#process', label: 'How we work' },
  { href: '/#work', label: SITE.samplePhotos ? 'Gallery' : 'Our work' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [p1, p2] = SITE.phones;
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="grp">
            <span>{SITE.city}, {SITE.country}</span>
            <a className="mail" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="grp">
            <a href={`tel:${p1.tel}`}>{p1.display}</a>
            <a href={`tel:${p2.tel}`}>{p2.display}</a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="brand" aria-label={`${SITE.shortName} home`}>
            <Image src={logo} alt="" width={48} height={48} preload />
            <span className="brand-text">
              <span className="brand-name">AL BAIT AL ATEEQ</span>
              <span className="brand-sub">TECHNICAL SERVICES CO.</span>
            </span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
            <a className="btn btn-red" href={`tel:${p1.tel}`}>Call {p1.display}</a>
          </nav>
          <a className="hdr-call" href={`tel:${p1.tel}`} aria-label={`Call ${p1.display}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
          </a>
          <details className="menu">
            <summary>Menu</summary>
            <div className="menu-panel">
              {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
              <a href={`tel:${p1.tel}`}>Call {p1.display}</a>
              <a href={waLink()} target="_blank" rel="noopener">WhatsApp us</a>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div>
          <Link href="/" className="brand" style={{ color: '#fff', marginBottom: 14 }}>
            <Image src={logo} alt="" width={40} height={40} />
            <span className="brand-text">
              <span className="brand-name" style={{ color: '#fff', fontSize: 16 }}>AL BAIT AL ATEEQ</span>
              <span className="brand-sub">TECHNICAL SERVICES CO.</span>
            </span>
          </Link>
          <p style={{ lineHeight: 1.6, margin: '14px 0' }}>
            Maintenance, fit-out and cleaning for villas, apartments, offices and shops in {SITE.city}.
          </p>
          <ul>
            {SITE.phones.map((p) => <li key={p.tel}><a href={`tel:${p.tel}`}>{p.display}</a></li>)}
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
        </div>
        {CATEGORIES.map((c) => (
          <div key={c.id}>
            <h2>{c.label}</h2>
            <ul>
              {servicesIn(c.id).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="wrap">
          <span>© {year} {SITE.name} {SITE.city}, UAE</span>
          <span style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            <Link href="/services">All services</Link>
            <Link href="/#contact">Contact</Link>
            <Link href="/credits">Photo credits</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a className="float-wa" href={waLink()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <WhatsAppIcon size={30} />
    </a>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
