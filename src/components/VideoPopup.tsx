'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE, waLink } from '@/data/site';
import { WhatsAppIcon } from './Icons';

const SEEN_KEY = 'promo-video-seen';
const DELAY_MS = 10000;

/** Marketing pop-up: shows one project video once per session, after a short delay. */
export default function VideoPopup({ src, title }: { src: string; title: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="promo" role="dialog" aria-modal="true" aria-labelledby="promo-title" onClick={close}>
      <div className="promo-card" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="promo-close" onClick={close} aria-label="Close video">✕</button>
        <video src={src} autoPlay muted loop playsInline controls aria-label={title} />
        <div className="promo-body">
          <b id="promo-title">See how we work</b>
          <p>Tell us about your job in Dubai and we will arrange a visit.</p>
          <a
            className="btn btn-wa"
            href={waLink('Hello, I watched your video and need a quote.')}
            target="_blank"
            rel="noopener"
            onClick={close}
          >
            <WhatsAppIcon />Get a quote on WhatsApp
          </a>
          <a className="promo-call" href={`tel:${SITE.phones[0].tel}`}>or call {SITE.phones[0].display}</a>
        </div>
      </div>
    </div>
  );
}
