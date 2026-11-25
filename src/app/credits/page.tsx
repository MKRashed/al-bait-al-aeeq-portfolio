import type { Metadata } from 'next';
import { CREDITS } from '@/data/photos';

export const metadata: Metadata = {
  title: 'Photo credits',
  robots: { index: false, follow: true },
  alternates: { canonical: '/credits' },
};

export default function Credits() {
  return (
    <section className="section">
      <div className="wrap prose" style={{ maxWidth: 760 }}>
        <h1 className="h2" style={{ marginBottom: 16 }}>Photo credits</h1>
        <p>Some photos on this site are sample images from <a href="https://unsplash.com" rel="noopener">Unsplash</a>, used under the Unsplash License. Thank you to the photographers:</p>
        <ul>
          {CREDITS.map((c) => (
            <li key={c.key} style={{ lineHeight: 1.9 }}>
              <a href={`https://unsplash.com/@${c.user}?utm_source=al_bait_al_ateeq&utm_medium=referral`} rel="noopener">{c.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
