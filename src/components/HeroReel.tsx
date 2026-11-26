'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';

export type ReelCard = { href: string; label: string; image: StaticImageData; alt: string };

// Geometry is in frame units (u). Desktop frame = 1440u wide, phones = 640u.
const PITCH = 196; // even spacing between card centres before the outward push
const SPEED = 50; // auto-scroll, u per second (right → left)
const BAND = 390; // band height in u
const DECAY = 0.05; // momentum left after one second (95% decay)

/** Rounded quad: left edge height hl, right edge height hr, both centred on `mid`. */
function quadPath(w: number, hl: number, hr: number, mid: number, r: number) {
  const tl = mid - hl / 2, bl = mid + hl / 2, tr = mid - hr / 2, br = mid + hr / 2;
  return `path('M ${r} ${tl + (tr - tl) * (r / w)} L ${w - r} ${tr - (tr - tl) * (r / w)} Q ${w} ${tr} ${w} ${tr + r} L ${w} ${br - r} Q ${w} ${br} ${w - r} ${br - (br - bl) * (r / w)} L ${r} ${bl + (br - bl) * (r / w)} Q 0 ${bl} 0 ${bl - r} L 0 ${tl + r} Q 0 ${tl} ${r} ${tl + (tr - tl) * (r / w)} Z')`;
}

export default function HeroReel({ cards }: { cards: ReelCard[] }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  // Two copies so the loop is always wider than the screen, even with small cards on wide monitors.
  const all = useMemo(() => [...cards, ...cards], [cards]);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const n = all.length;
    const loop = n * PITCH;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let u = 1, half = 720, radius = 706;
    let scroll = 0, velocity = 0, hoverSlow = 1, hovering = false;
    let dragging = false, dragMoved = 0, lastX = 0, lastT = 0;
    let visible = true, raf = 0, prev = performance.now();

    const measure = () => {
      const w = band.clientWidth;
      // Shrink the cards on short screens so the whole row fits above the fold
      // (on phones, above the bottom tab bar too).
      const phone = w <= 820;
      const base = phone ? w / 640 : Math.max(w / 1440, 0.8);
      const top = band.getBoundingClientRect().top + window.scrollY;
      const fit = (window.innerHeight - top - (phone ? 80 : 12)) / BAND;
      u = Math.min(base, Math.max(fit, phone ? 0.42 : 0.55));
      half = w / u / 2;
      radius = half - 14;
      band.style.height = `${BAND * u}px`;
      band.style.setProperty('--u', String(u));
    };

    const layout = () => {
      const mid = BAND / 2;
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        // Unpushed offset from the centre, wrapped into [-loop/2, loop/2).
        let t = (i * PITCH - scroll) % loop;
        if (t < -loop / 2) t += loop;
        if (t >= loop / 2) t -= loop;
        const x = half + t * (1 + 0.083 * (t / radius) ** 2);
        const d = Math.min(Math.abs(x - half) / radius, 1.4);
        const w = 170 + 48 * d * d;
        const xl = x - w / 2, xr = x + w / 2;
        if (xr < -40 || xl > half * 2 + 40) { el.style.visibility = 'hidden'; continue; }
        const ql = Math.min(Math.abs(xl - half) / radius, 1.4);
        const qr = Math.min(Math.abs(xr - half) / radius, 1.4);
        const hl = 280 + 92 * ql ** 2.6, hr = 280 + 92 * qr ** 2.6;
        const h = Math.max(hl, hr);
        const cy = mid - 12 * d * d;
        el.style.visibility = 'visible';
        el.style.width = `${w * u}px`;
        el.style.height = `${h * u}px`;
        el.style.transform = `translate3d(${xl * u}px, ${(cy - h / 2) * u}px, 0)`;
        el.style.clipPath = quadPath(w * u, hl * u, hr * u, (h / 2) * u, 15 * u);
        // Keep the label inside the shorter edge.
        el.style.setProperty('--inset', `${((h - Math.min(hl, hr)) / 2 + 14) * u}px`);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!dragging) {
        hoverSlow += ((hovering ? 0.15 : 1) - hoverSlow) * Math.min(dt * 4, 1);
        scroll += (reduce ? 0 : SPEED * hoverSlow) * dt + velocity * dt;
        velocity *= DECAY ** dt;
        if (Math.abs(velocity) < 1) velocity = 0;
      }
      layout();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => { if (!raf) { prev = performance.now(); raf = requestAnimationFrame(tick); } };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true; dragMoved = 0; velocity = 0;
      lastX = e.clientX; lastT = e.timeStamp;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (e.pointerType === 'mouse' && e.buttons === 0) { onUp(e); return; } // released outside the band
      const dx = (e.clientX - lastX) / u;
      const dt = Math.max((e.timeStamp - lastT) / 1000, 0.001);
      scroll -= dx;
      dragMoved += Math.abs(dx * u);
      // Capture only once it is a real drag, so a plain tap still opens the card's link.
      if (dragMoved > 6 && !band.hasPointerCapture(e.pointerId)) {
        band.setPointerCapture(e.pointerId);
        band.classList.add('is-dragging');
      }
      velocity = velocity * 0.6 + (-dx / dt) * 0.4;
      lastX = e.clientX; lastT = e.timeStamp;
      layout();
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (e.timeStamp - lastT > 80) velocity = 0; // held still before release: no fling
      band.classList.remove('is-dragging');
    };
    // A drag should not count as a click on the card under the pointer.
    const onClick = (e: MouseEvent) => { if (dragMoved > 6) { e.preventDefault(); e.stopPropagation(); } };
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    measure();
    layout();
    band.classList.add('is-ready');
    let lastW = band.clientWidth;
    const onResize = () => {
      const w = band.clientWidth;
      // Phones resize on every scroll as the address bar hides; only re-fit when the width changes.
      if (w <= 820 && w === lastW) return;
      lastW = w;
      measure(); layout();
    };
    const ro = new ResizeObserver(onResize);
    window.addEventListener('resize', onResize);
    ro.observe(band);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(band);
    band.addEventListener('pointerdown', onDown);
    band.addEventListener('pointermove', onMove);
    band.addEventListener('pointerup', onUp);
    band.addEventListener('pointercancel', onUp);
    band.addEventListener('click', onClick, true);
    const fine = window.matchMedia('(hover: hover)').matches;
    if (fine) { band.addEventListener('pointerenter', onEnter); band.addEventListener('pointerleave', onLeave); }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('resize', onResize);
      band.removeEventListener('pointerdown', onDown);
      band.removeEventListener('pointermove', onMove);
      band.removeEventListener('pointerup', onUp);
      band.removeEventListener('pointercancel', onUp);
      band.removeEventListener('click', onClick, true);
      band.removeEventListener('pointerenter', onEnter);
      band.removeEventListener('pointerleave', onLeave);
    };
  }, [all]);

  return (
    <div className="reel" ref={bandRef} aria-label="Our services" role="region">
      {all.map((c, i) => (
        <Link
          key={c.href + i}
          href={c.href}
          className="reel-card"
          ref={(el) => { cardRefs.current[i] = el; }}
          draggable={false}
          aria-hidden={i >= cards.length || undefined}
          tabIndex={i >= cards.length ? -1 : undefined}
        >
          <Image src={c.image} alt={c.alt} fill sizes="(max-width: 820px) 110px, 300px" className="cover" placeholder="blur" draggable={false} loading={i < 8 ? 'eager' : 'lazy'} />
          <span className="reel-label">{c.label}</span>
        </Link>
      ))}
    </div>
  );
}
