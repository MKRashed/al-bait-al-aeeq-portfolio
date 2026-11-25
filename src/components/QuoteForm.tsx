'use client';

import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import { WhatsAppIcon } from './Icons';

/** Builds a WhatsApp message from the form; nothing is sent to a server. */
export default function QuoteForm({ defaultService = '' }: { defaultService?: string }) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const lines = [
      `Hello ${SITE.shortName},`,
      get('service') && `Service: ${get('service')}`,
      get('area') && `Area: ${get('area')}`,
      get('details') && `Details: ${get('details')}`,
      get('name') && `Name: ${get('name')}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3>Request a quote</h3>
      <label>Your name<input name="name" placeholder="Full name" autoComplete="name" /></label>
      <label>Area in Dubai *<input name="area" placeholder="e.g. JLT, Al Barsha, Deira" required /></label>
      <label>Service needed *
        <select name="service" defaultValue={defaultService} required>
          <option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
        </select>
      </label>
      <label>Details<textarea name="details" rows={4} placeholder="Describe the job" /></label>
      <button type="submit" className="btn btn-wa"><WhatsAppIcon />Send on WhatsApp</button>
      <p className="form-note">Opens WhatsApp with your message ready to send.</p>
    </form>
  );
}
