'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE, waLink } from '@/data/site';
import { WhatsAppIcon } from './Icons';

const I = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  photo: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
};
const Icon = ({ d }: { d: React.ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

/** App-style bottom navigation, shown on phones only (see .tabbar in globals.css). */
export default function TabBar() {
  const path = usePathname();
  const on = (match: boolean) => (match ? 'page' : undefined);
  return (
    <nav className="tabbar" aria-label="Quick actions">
      <Link href="/" aria-current={on(path === '/')}><Icon d={I.home} />Home</Link>
      <Link href="/services" aria-current={on(path.startsWith('/services'))}><Icon d={I.grid} />Services</Link>
      <a href={waLink()} target="_blank" rel="noopener" className="tab-wa" aria-label="WhatsApp us">
        <span><WhatsAppIcon size={28} /></span>WhatsApp
      </a>
      <Link href="/#work"><Icon d={I.photo} />Gallery</Link>
      <a href={`tel:${SITE.phones[0].tel}`}><Icon d={I.phone} />Call</a>
    </nav>
  );
}
