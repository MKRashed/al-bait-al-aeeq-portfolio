'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type GalleryVideo = { title: string } & (
  | { source: 'youtube'; id: string; format: 'short' | 'video' }
  | { source: 'file'; src: string; format: 'video'; portrait?: boolean }
);

const isPortrait = (v: GalleryVideo) => v.format === 'short' || (v.source === 'file' && !!v.portrait);
const keyOf = (v: GalleryVideo) => (v.source === 'youtube' ? v.id : v.src);
const externalUrl = (v: GalleryVideo) =>
  v.source === 'file' ? v.src : v.format === 'short' ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;

function Thumb({ video }: { video: GalleryVideo }) {
  if (video.source === 'youtube') {
    return <span className="vg-thumb" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)` }} />;
  }
  return (
    <span className="vg-thumb">
      <video src={`${video.src}#t=0.5`} preload="metadata" muted playsInline tabIndex={-1} aria-hidden="true" />
    </span>
  );
}

function Row({ title, videos, onOpen }: { title: string; videos: GalleryVideo[]; onOpen: (v: GalleryVideo) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => trackRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });

  return (
    <div className="vg-row">
      <div className="vg-row-head">
        <h3 className="video-group-title">{title}</h3>
        <div className="vg-arrows">
          <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}>‹</button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}>›</button>
        </div>
      </div>
      <div className="vg-track" ref={trackRef}>
        {videos.map((v) => (
          <button
            type="button"
            key={keyOf(v)}
            className={`vg-card${isPortrait(v) ? ' vg-card--portrait' : ''}`}
            onClick={() => onOpen(v)}
            aria-label={`Play ${v.title}`}
          >
            <Thumb video={v} />
            <span className="vg-shade" aria-hidden="true" />
            <span className="vg-play" aria-hidden="true" />
            <span className="vg-meta">
              <span className="vg-tag">{v.format === 'short' ? 'Short' : 'Video'}</span>
              <span className="vg-title">{v.title}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function VideoGallery({ videos }: { videos: GalleryVideo[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnRef = useRef<HTMLElement | null>(null);

  const longVideos = videos.filter((v) => v.format === 'video');
  const shorts = videos.filter((v) => v.format === 'short');
  const order = [...longVideos, ...shorts];

  const open = (v: GalleryVideo) => {
    returnRef.current = document.activeElement as HTMLElement | null;
    setActive(order.findIndex((o) => keyOf(o) === keyOf(v)));
  };
  const close = useCallback(() => {
    setActive(null);
    returnRef.current?.focus();
  }, []);
  const step = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + order.length) % order.length)),
    [order.length],
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, step]);

  const current = active === null ? null : order[active];

  return (
    <>
      {longVideos.length > 0 && <Row title="Videos" videos={longVideos} onOpen={open} />}
      {shorts.length > 0 && <Row title="Shorts" videos={shorts} onOpen={open} />}

      {current && (
        <div className="vg-modal" role="dialog" aria-modal="true" aria-label={current.title} onClick={close}>
          <div className="vg-top" onClick={(e) => e.stopPropagation()}>
            <span className="vg-count">{(active ?? 0) + 1} / {order.length}</span>
            <button ref={closeRef} type="button" className="vg-close" onClick={close} aria-label="Close video">✕</button>
          </div>
          <div className="vg-stage" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="vg-nav vg-nav--prev" onClick={() => step(-1)} aria-label="Previous video">‹</button>
            <div className={`vg-player${isPortrait(current) ? ' vg-player--portrait' : ''}`} key={keyOf(current)}>
              {current.source === 'youtube' ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${current.id}?playsinline=1&rel=0&autoplay=1`}
                  title={current.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video src={current.src} controls autoPlay playsInline />
              )}
            </div>
            <button type="button" className="vg-nav vg-nav--next" onClick={() => step(1)} aria-label="Next video">›</button>
          </div>
          <div className="vg-bottom" onClick={(e) => e.stopPropagation()}>
            <b>{current.title}</b>
            <a href={externalUrl(current)} target="_blank" rel="noopener noreferrer">
              {current.source === 'youtube' ? 'Watch on YouTube' : 'Open video'}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
