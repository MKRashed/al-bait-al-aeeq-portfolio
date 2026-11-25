'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE, waLink } from '@/data/site';
import { WhatsAppIcon } from './Icons';

const SEEN_KEY = 'promo-video-seen';
const DELAY_MS = 10000;

/** Marketing pop-up: shows one project video once per session, after a short delay. */
export default function VideoPopup({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const unmute = () => {
    const msg = JSON.stringify({ event: 'command', func: 'unMute', args: [] });
    frameRef.current?.contentWindow?.postMessage(msg, '*');
    setMuted(false);
  };

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
        <div className="promo-media">
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0&autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3`}
            title={title}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {muted && (
            <button type="button" className="promo-sound" onClick={unmute}>
              🔊 Tap for sound
            </button>
          )}
        </div>
        <div className="promo-body">
          <span className="promo-badge">Free site visit in Dubai</span>
          <b id="promo-title">See how we work</b>
          <a
            className="btn btn-wa"
            href={waLink('Hello, I watched your video and need a quote.')}
            target="_blank"
            rel="noopener"
            onClick={close}
          >
            <WhatsAppIcon />Get a quote on WhatsApp
          </a>
          <div className="promo-links">
            <a className="promo-call" href={`tel:${SITE.phones[0].tel}`}>Call {SITE.phones[0].display}</a>
            <button type="button" className="promo-later" onClick={close}>Maybe later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
