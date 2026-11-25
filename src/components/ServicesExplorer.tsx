'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES, SERVICES, type CategoryId } from '@/data/services';
import { bookLink, waLink } from '@/data/site';

const numbered = SERVICES.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }));
const short = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.short]));

export default function ServicesExplorer() {
  const [cat, setCat] = useState<CategoryId>('mep');
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const visible = query
    ? numbered.filter((s) => `${s.name} ${s.desc} ${short[s.cat]}`.toLowerCase().includes(query))
    : numbered.filter((s) => s.cat === cat);
  const active = CATEGORIES.find((c) => c.id === cat)!;

  return (
    <>
      <div className="head-row">
        <div className="head-col">
          <p className="eyebrow reveal">Our services</p>
          <h2 className="h2 reveal">{SERVICES.length} services under one company</h2>
          <p className="lead reveal">Pick a category or search for the job you need. Every service can be booked directly on WhatsApp.</p>
        </div>
        <label className="search reveal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a7096" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: AC, tiles, cleaning…" aria-label="Search services" type="search" />
          {query && <button type="button" onClick={() => setQ('')} aria-label="Clear search">✕</button>}
        </label>
      </div>

      <div className="explorer">
        <div className="cats">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" className="cat-btn" aria-pressed={!query && cat === c.id} onClick={() => { setCat(c.id); setQ(''); }}>
              <span><b>{c.label}</b><small>{c.blurb}</small></span>
              <span className="count">{String(SERVICES.filter((s) => s.cat === c.id).length).padStart(2, '0')}</span>
            </button>
          ))}
          <a className="ask" href={waLink()} target="_blank" rel="noopener">Don&apos;t see your job? Ask us<span>→</span></a>
        </div>

        <div className="svc-col">
          {!query && (
            <div className="banner">
              {CATEGORIES.map((c) => (
                <div key={c.id} className={`fade-layer${c.id === cat ? ' on' : ''}`}>
                  <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 900px) 100vw, 760px" className="cover" placeholder="blur" />
                </div>
              ))}
              <div className="banner-cap"><b>{active.label}</b><span>{visible.length} services</span></div>
            </div>
          )}
          {query && (
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-2)', margin: '4px 0 10px' }}>
              {visible.length} {visible.length === 1 ? 'result' : 'results'} for &quot;{q.trim()}&quot;
            </p>
          )}
          <ul className="svc-list" key={query || cat}>
            {visible.map((s, i) => (
              <li key={s.slug} className="svc-row" style={{ animationDelay: `${i * 35}ms` }}>
                <span className="svc-num">{s.num}</span>
                <span style={{ minWidth: 0 }}>
                  <Link href={`/services/${s.slug}`} className="svc-name">{s.name}</Link>
                  <span className="svc-desc">{s.desc}</span>
                  {query && <span className="svc-meta">{short[s.cat]}</span>}
                </span>
                <span className="svc-actions">
                  <Link href={`/services/${s.slug}`} className="svc-more">Details</Link>
                  <a href={bookLink(s.name)} target="_blank" rel="noopener" className="svc-book" aria-label={`Book ${s.name} on WhatsApp`}>Book<i>→</i></a>
                </span>
              </li>
            ))}
          </ul>
          {query && visible.length === 0 && (
            <div className="empty">
              <b>No exact match</b>
              <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)' }}>Send us the details. If it&apos;s technical work in a home or office, we can most likely help.</span>
              <a className="btn btn-wa" href={bookLink(q.trim())} target="_blank" rel="noopener">Ask on WhatsApp</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
