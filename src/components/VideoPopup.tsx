'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE, waLink } from '@/data/site';
import { WhatsAppIcon } from './Icons';

const SEEN_KEY = 'promo-video-seen';
const DELAY_MS = 10000;

function shuffle(ids: string[]) {
  const list = [...ids];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/** Marketing pop-up: shows promo videos in random order, one after another, once per session. */
export default function VideoPopup({ ids, title }: { ids: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [firstId, setFirstId] = useState<string | null>(null);
  const queueRef = useRef<string[]>([]);
  const lastRef = useRef<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const send = (func: string, args: unknown[] = []) =>
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');

  const nextId = () => {
    if (queueRef.current.length === 0) {
      let list = shuffle(ids);
      if (ids.length > 1 && list[0] === lastRef.current) list = [...list.slice(1), list[0]];
      queueRef.current = list;
    }
    const id = queueRef.current.shift() as string;
    lastRef.current = id;
    return id;
  };

  const unmute = () => {
    send('playVideo');
    send('unMute');
    setMuted(false);
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}
    const timer = window.setTimeout(() => {
      setFirstId(nextId());
      setOpen(true);
    }, DELAY_MS);
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

  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow || typeof e.data !== 'string') return;
      try {
        const data = JSON.parse(e.data);
        const ended = data.event === 'onStateChange' ? data.info === 0 : data.info?.playerState === 0;
        if (ended) send('loadVideoById', [nextId()]);
      } catch {}
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [open]);

  const startListening = () =>
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), '*');

  if (!open || !firstId) return null;

  return (
    <div className="promo" role="dialog" aria-modal="true" aria-label={title} onClick={close}>
      <div className="promo-card" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="promo-close" onClick={close} aria-label="Close video">✕</button>
        <div className="promo-media">
          <iframe
            ref={frameRef}
            onLoad={startListening}
            src={`https://www.youtube-nocookie.com/embed/${firstId}?playsinline=1&rel=0&autoplay=1&mute=1&controls=0&modestbranding=1&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3`}
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
