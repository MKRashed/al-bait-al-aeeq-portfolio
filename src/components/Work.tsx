'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { GALLERY } from '@/data/content';
import { PHOTOS } from '@/data/photos';
import { CATEGORIES, type CategoryId } from '@/data/services';

const short = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.short]));

export function Gallery() {
  const [filter, setFilter] = useState<'all' | CategoryId>('all');
  const [open, setOpen] = useState<number | null>(null);
  const list = filter === 'all' ? GALLERY : GALLERY.filter((g) => g.cat === filter);
  const nav = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'ArrowLeft') nav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, nav]);

  const cur = open !== null ? list[open] : null;
  const tabs = [{ id: 'all' as const, label: 'All' }, ...CATEGORIES.filter((c) => GALLERY.some((g) => g.cat === c.id))];

  return (
    <>
      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.id} type="button" className="tab" aria-pressed={filter === t.id} onClick={() => { setFilter(t.id); setOpen(null); }}>
            {t.label}<span>{t.id === 'all' ? GALLERY.length : GALLERY.filter((g) => g.cat === t.id).length}</span>
          </button>
        ))}
      </div>
      <div className="grid" key={filter}>
        {list.map((g, i) => (
          <figure key={g.photo} className={`card${g.tall ? ' tall' : ''}`} style={{ animationDelay: `${i * 50}ms` }}>
            <Image src={PHOTOS[g.photo]} alt={g.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 300px" className="cover" placeholder="blur" />
            <figcaption><small>{short[g.cat]}</small><b>{g.cap}</b></figcaption>
            <button type="button" className="zoom" onClick={() => setOpen(i)} aria-label={`View ${g.cap} larger`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            </button>
          </figure>
        ))}
      </div>

      {cur && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={cur.cap} onClick={() => setOpen(null)}>
          <button type="button" className="lb-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
          <div className="lb-img" key={open} onClick={(e) => e.stopPropagation()}>
            <Image src={PHOTOS[cur.photo]} alt={cur.alt} fill sizes="100vw" style={{ objectFit: 'contain' }} />
          </div>
          <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lb-nav" onClick={() => nav(-1)} aria-label="Previous">←</button>
            <div className="lb-cap">
              <small>{short[cur.cat]} · {open! + 1} / {list.length}</small>
              <b>{cur.cap}</b>
              <Link href={`/services/${cur.service}`}>About this service</Link>
            </div>
            <button type="button" className="lb-nav" onClick={() => nav(1)} aria-label="Next">→</button>
          </div>
        </div>
      )}
    </>
  );
}
