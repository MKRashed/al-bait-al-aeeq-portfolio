// Meta (Facebook) Pixel helpers. The Pixel ID is public (it appears in the page
// HTML), so it lives here; NEXT_PUBLIC_META_PIXEL_ID can override it, and
// setting that env variable to an empty string turns the Pixel off.

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1819166502680940';

type Fbq = (cmd: 'track' | 'trackCustom' | 'init', event: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Standard events used for a service business: PageView, Lead, Contact, Schedule. */
export function track(event: 'PageView' | 'Lead' | 'Contact' | 'Schedule', params?: Record<string, unknown>) {
  if (!PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', event, params);
}
