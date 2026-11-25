import Image from 'next/image';
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/Icons';
import Process from '@/components/Process';
import QuoteForm from '@/components/QuoteForm';
import ServicesExplorer from '@/components/ServicesExplorer';
import VideoPopup from '@/components/VideoPopup';
import YouTubeFacade from '@/components/YouTubeFacade';
import { Gallery } from '@/components/Work';
import { PHOTOS } from '@/data/photos';
import { SERVICES } from '@/data/services';
import { SITE, waLink } from '@/data/site';

type GalleryVideo = { title: string } & (
  | { source: 'youtube'; id: string; format: 'short' | 'video' }
  | { source: 'file'; src: string; format: 'video'; portrait?: boolean }
);

const VIDEOS: GalleryVideo[] = [
  { source: 'youtube', id: 'KGLAw0lkHec', format: 'short', title: 'Project highlights' },
  { source: 'youtube', id: '_7v536tyKvo', format: 'short', title: 'Project highlights 2' },
  // Both files are portrait (478x850): `portrait` gives them a 9:16 box without letterboxing.
  { source: 'file', src: '/videos/project-1.mp4', format: 'video', portrait: true, title: 'Project video 1' },
  { source: 'file', src: '/videos/project-2.mp4', format: 'video', portrait: true, title: 'Project video 2' },
];

const LONG_VIDEOS = VIDEOS.filter((v) => v.format === 'video');
const SHORTS = VIDEOS.filter((v) => v.format === 'short');

function VideoCard({ video }: { video: GalleryVideo }) {
  return (
    <figure className={`video-card video-card--${video.format}${video.source === 'file' && video.portrait ? ' video-card--portrait' : ''}`}>
      {video.source === 'youtube' ? (
        <YouTubeFacade id={video.id} title={video.title} />
      ) : (
        <video controls playsInline preload="metadata" aria-label={video.title}>
          <source src={video.src} type="video/mp4" />
          Your browser does not support embedded video. <a href={video.src}>Open {video.title}</a>.
        </video>
      )}
      <figcaption>
        <div>
          <span className="video-format">{video.format === 'short' ? 'Shorts' : 'Video'}</span>
          <h3>{video.title}</h3>
        </div>
        <a
          href={video.source === 'youtube'
            ? video.format === 'short' ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`
            : video.src}
          target="_blank" rel="noopener noreferrer"
        >{video.source === 'youtube' ? 'Watch on YouTube' : 'Open video'}</a>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const [p1, p2] = SITE.phones;
  return (
    <>
      <VideoPopup src="/videos/project-1.mp4" title="Project video 1" />
      <section className="hero deep" aria-labelledby="hero-title">
        <div className="hero-corner" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-copy">
            <p className="hero-ar" lang="ar" dir="rtl" style={{ textAlign: 'left' }}>{SITE.arabicName}</p>
            <h1 id="hero-title">Maintenance, fit-out and cleaning for homes and offices in Dubai.</h1>
            <p className="hero-lead">One team for AC, electrical, plumbing, painting, gypsum, tiling, carpentry, cleaning and more. Call or send a WhatsApp message and we will arrange a visit.</p>
            <div className="hero-ctas">
              <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener"><WhatsAppIcon />WhatsApp us</a>
              <a className="btn btn-ghost" href={`tel:${p1.tel}`}>Call {p1.display}</a>
            </div>
            <ul className="hero-tags">
              <li>Villas &amp; apartments</li>
              <li>Offices &amp; shops</li>
              <li>All areas of Dubai</li>
            </ul>
          </div>
          <div className="collage">
            <div className="tile"><Image src={PHOTOS['hero-main']} alt="Painters on a scaffold painting a villa exterior" fill preload sizes="(max-width: 900px) 60vw, 330px" className="cover" placeholder="blur" /></div>
            <div className="tile"><Image src={PHOTOS['hero-a']} alt="Electricians wiring a distribution board" fill sizes="(max-width: 900px) 40vw, 230px" className="cover" placeholder="blur" /></div>
            <div className="tile"><Image src={PHOTOS['hero-b']} alt="Painter rolling paint in a stairwell" fill sizes="(max-width: 900px) 40vw, 230px" className="cover" placeholder="blur" /></div>
          </div>
        </div>
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
          {LONG_VIDEOS.length > 0 && (
            <>
              <h3 className="video-group-title">Videos</h3>
              <div className="video-grid video-grid--long">
                {LONG_VIDEOS.map((video) => (
                  <VideoCard video={video} key={video.source === 'youtube' ? video.id : video.src} />
                ))}
              </div>
            </>
          )}
          {SHORTS.length > 0 && (
            <>
              <h3 className="video-group-title">Shorts</h3>
              <div className="video-grid video-grid--shorts">
                {SHORTS.map((video) => (
                  <VideoCard video={video} key={video.source === 'youtube' ? video.id : video.src} />
                ))}
              </div>
            </>
          )}
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
