import Link from 'next/link';
import HeroReel, { type ReelCard } from '@/components/HeroReel';
import { WhatsAppIcon } from '@/components/Icons';
import Process from '@/components/Process';
import QuoteForm from '@/components/QuoteForm';
import ServicesExplorer from '@/components/ServicesExplorer';
import VideoPopup from '@/components/VideoPopup';
import VideoGallery, { type GalleryVideo } from '@/components/VideoGallery';
import { Gallery } from '@/components/Work';
import { PHOTOS } from '@/data/photos';
import { SERVICES } from '@/data/services';
import { SITE, waLink } from '@/data/site';

const VIDEOS: GalleryVideo[] = [
  { source: 'youtube', id: 'KGLAw0lkHec', format: 'short', title: 'Project highlights' },
  { source: 'youtube', id: '_7v536tyKvo', format: 'short', title: 'Project highlights 2' },
  // Both files are portrait (478x850): `portrait` gives them a 9:16 box without letterboxing.
  { source: 'file', src: '/videos/project-1.mp4', format: 'video', portrait: true, title: 'Project video 1' },
  { source: 'file', src: '/videos/project-2.mp4', format: 'video', portrait: true, title: 'Project video 2' },
];

const svc = (slug: string) => `/services/${slug}`;
// Hero carousel: our own job photos, each linking to its service page.
const REEL: ReelCard[] = [
  { href: svc('ac-repair-maintenance-dubai'), label: 'AC installation', image: PHOTOS['job-ac-split'], alt: 'Team fixing a split AC unit to a wall' },
  { href: svc('painting-services-dubai'), label: 'Painting', image: PHOTOS['job-paint-villa-scaffold'], alt: 'Painters on a scaffold painting a villa exterior' },
  { href: svc('electrical-works-dubai'), label: 'Electrical works', image: PHOTOS['job-electrical-board-open'], alt: 'Wired electrical distribution board' },
  { href: svc('gypsum-works-dubai'), label: 'Gypsum works', image: PHOTOS['job-gypsum-board'], alt: 'Worker fixing a gypsum ceiling board' },
  { href: svc('plumbing-works-dubai'), label: 'Plumbing', image: PHOTOS['job-plumbing-roof-pipes'], alt: 'Plumbers fitting water pipes on a roof' },
  { href: svc('tiling-works-dubai'), label: 'Tiling', image: PHOTOS['job-tiling-floor'], alt: 'Tilers laying large floor tiles' },
  { href: svc('marble-works-dubai'), label: 'Marble works', image: PHOTOS['job-marble-stairs'], alt: 'Worker cladding entrance steps in stone' },
  { href: svc('false-ceiling-dubai'), label: 'False ceiling', image: PHOTOS['job-gypsum-hall'], alt: 'Ceiling work from scaffolding in a large hall' },
  { href: svc('masonry-works-dubai'), label: 'Mason works', image: PHOTOS['job-masonry-mix'], alt: 'Mason mixing mortar with a drill' },
  { href: svc('electrical-works-dubai'), label: 'Outdoor lighting', image: PHOTOS['job-electrical-outdoor-light'], alt: 'Electrician fitting an outdoor wall light' },
  { href: svc('landscaping-dubai'), label: 'Interlock paving', image: PHOTOS['job-paving-team'], alt: 'Crew laying interlock paving blocks' },
  { href: svc('painting-services-dubai'), label: 'Interior painting', image: PHOTOS['job-paint-staircase'], alt: 'Painter rolling paint in a stairwell' },
  { href: svc('plumbing-works-dubai'), label: 'Bathroom plumbing', image: PHOTOS['job-plumbing-bath-drain'], alt: 'Plumber fitting a bathroom floor drain' },
  { href: svc('cleaning-services-dubai'), label: 'Cleaning', image: PHOTOS['cat-clean'], alt: 'Cleaner mopping the floor of a bright apartment' },
];

export default function Home() {
  const [p1, p2] = SITE.phones;
  return (
    <>
      <VideoPopup ids={['klLKXbG3Dew', 'xf_9j191lQ4']} title="Al Bait Al Aeeq promotional video" />
      <section className="hero deep" aria-labelledby="hero-title">
        <div className="hero-corner" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-copy">
            <p className="hero-ar" lang="ar" dir="rtl">{SITE.arabicName}</p>
            <h1 id="hero-title">Maintenance, <span className="nowrap">fit-out</span> and cleaning <span className="dim">for homes and offices in Dubai.</span></h1>
            <p className="hero-lead">
              <span className="lead-full">One team for AC, electrical, plumbing, painting, gypsum, tiling, carpentry, cleaning and more. Call or send a WhatsApp message and we will arrange a visit.</span>
              <span className="lead-short">One team for every job. Call or WhatsApp us.</span>
            </p>
            <div className="hero-ctas">
              <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener"><WhatsAppIcon />WhatsApp us</a>
              <a className="btn btn-ghost" href={`tel:${p1.tel}`}>Call {p1.display}</a>
            </div>
          </div>
        </div>
        <div className="hero-reel">
          <p className="hero-note" aria-hidden="true">
            {SERVICES.length}+ services,<br />one call
            <svg viewBox="0 0 120 90" fill="none"><path d="M10 8 C 60 6, 104 30, 92 78" /><path d="M78 66 L 92 80 L 102 62" /></svg>
          </p>
          <HeroReel cards={REEL} />
        </div>
        <ul className="hero-tags wrap">
          <li>Villas &amp; apartments</li>
          <li>Offices &amp; shops</li>
          <li>All areas of Dubai</li>
        </ul>
      </section>

      <div className="ticker">
        <a className="ticker-cta" href="#contact">Get a quote →</a>
        <div className="ticker-track-wrap">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div key={copy} style={{ display: 'flex' }} aria-hidden={copy === 1 || undefined}>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="ticker-item" tabIndex={copy === 1 ? -1 : undefined}>
                    {s.name}<span aria-hidden="true">◆</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="services" className="section" aria-label="Services">
        <div className="wrap"><ServicesExplorer /></div>
      </section>

      <section id="process" className="section dark" aria-labelledby="process-title">
        <div className="wrap">
          <div className="head-row">
            <div className="head-col">
              <p className="eyebrow reveal">How we work</p>
              <h2 id="process-title" className="h2 reveal">From first call to finished job</h2>
            </div>
            <a className="btn btn-wa reveal" href={waLink()} target="_blank" rel="noopener">Start with step 01 →</a>
          </div>
          <Process />
        </div>
      </section>

      <section id="work" className="section" aria-labelledby="work-title">
        <div className="wrap">
          <div className="head-row">
            <div className="head-col">
              <p className="eyebrow reveal">Our work</p>
              <h2 id="work-title" className="h2 reveal">Recent jobs</h2>
            </div>
            <a className="reveal" href={waLink('Hello, can you send me photos of your recent work?')} target="_blank" rel="noopener" style={{ fontWeight: 700, borderBottom: '2px solid var(--blue)', paddingBottom: 2 }}>Ask for more photos on WhatsApp</a>
          </div>
          <Gallery />
          <a className="btn btn-outline gallery-video-link" href="#videos">View video gallery</a>
        </div>
      </section>

      <section id="videos" className="section video-gallery" aria-labelledby="videos-title">
        <div className="wrap">
          <div className="head-col">
            <p className="eyebrow">Video gallery</p>
            <h2 id="videos-title" className="h2">A closer look at our work</h2>
            <p className="lead">Watch videos and Shorts from our projects. Select a video to play.</p>
          </div>
          <VideoGallery videos={VIDEOS} />
        </div>
      </section>

      <section id="contact" className="section deep contact" aria-labelledby="contact-title">
        <div className="contact-corner" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="head-col">
              <p className="eyebrow reveal">Contact</p>
              <h2 id="contact-title" className="h2 reveal">Tell us about the job</h2>
              <p className="lead">Call, WhatsApp or email. A photo of the problem helps us quote faster.</p>
            </div>
            <dl className="facts reveal">
              <div><dt>CONTACT PERSON</dt><dd>{SITE.contactPerson}</dd></div>
              <div><dt>MOBILE / WHATSAPP</dt><dd><a href={`tel:${p1.tel}`}>{p1.display}</a><a href={`tel:${p2.tel}`}>{p2.display}</a></dd></div>
              <div><dt>EMAIL</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
              <div><dt>LOCATION</dt><dd>{SITE.city}, {SITE.country}</dd></div>
            </dl>
          </div>
          <div className="reveal"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
