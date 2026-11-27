'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { PIXEL_ID, track } from '@/lib/pixel';

/**
 * Loads the Meta Pixel on every page and tracks:
 * - PageView on first load and on every client-side navigation
 * - Contact when any WhatsApp, phone or email link is clicked (site-wide,
 *   so new buttons are tracked automatically as long as they use wa.me / tel: / mailto:)
 * The quote form fires Lead itself (see QuoteForm).
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  // The base code already sends the first PageView; send one per later route change.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    track('PageView');
  }, [pathname]);

  useEffect(() => {
    if (!PIXEL_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const method = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)
        ? 'whatsapp'
        : href.startsWith('tel:')
          ? 'phone'
          : href.startsWith('mailto:')
            ? 'email'
            : null;
      if (method) track('Contact', { content_name: method, content_category: pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
