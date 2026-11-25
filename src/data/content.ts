import type { CategoryId } from './services';
import type { PhotoKey } from './photos';

export const STEPS: { n: string; title: string; text: string; photo: PhotoKey; alt: string }[] = [
  { n: '01', title: 'Call or WhatsApp', text: 'Tell us what needs fixing and where you are in Dubai. Photos of the problem help us understand the job before we arrive.', photo: 'step-1', alt: 'Customer holding a phone with WhatsApp open' },
  { n: '02', title: 'Site visit', text: 'Our technician inspects the job at your villa, apartment or office and checks what materials are needed.', photo: 'step-2', alt: 'Two technicians in safety vests inspecting a site' },
  { n: '03', title: 'Clear quote', text: 'You get the price and timing before any work starts. Nothing begins without your approval.', photo: 'step-3', alt: 'Client and contractor shaking hands over a table' },
  { n: '04', title: 'Job done', text: 'Our team completes the work, cleans up after, and checks everything with you before leaving.', photo: 'step-4', alt: 'Finished modern living room with large windows' },
];

export const GALLERY: { photo: PhotoKey; cat: CategoryId; cap: string; alt: string; tall?: boolean; service: string }[] = [
  { photo: 'job-electrical-rewiring', cat: 'mep', cap: 'Electrical rewiring', alt: 'Two electricians rewiring a wall with a hammer and chisel', tall: true, service: 'electrical-works-dubai' },
  { photo: 'job-electrical-board', cat: 'mep', cap: 'Distribution board wiring', alt: 'Electricians wiring a distribution board in a new room', tall: true, service: 'electrical-works-dubai' },
  { photo: 'job-plumbing-sink', cat: 'mep', cap: 'Kitchen sink plumbing', alt: 'Plumber repairing the drain pipe under a kitchen sink', tall: true, service: 'plumbing-works-dubai' },
  { photo: 'job-water-heater', cat: 'mep', cap: 'Water heater installation', alt: 'Water heater installed above a bathroom ceiling', tall: true, service: 'plumbing-works-dubai' },
  { photo: 'job-paint-staircase', cat: 'fit', cap: 'Staircase painting', alt: 'Painter rolling paint on a stairwell wall with floors protected', tall: true, service: 'painting-services-dubai' },
  { photo: 'job-paint-villa-scaffold', cat: 'fit', cap: 'Villa exterior painting', alt: 'Painters on a scaffold painting a villa exterior', tall: true, service: 'painting-services-dubai' },
  { photo: 'job-paint-carport', cat: 'fit', cap: 'Carport painting', alt: 'Painter on a ladder painting a carport wall and ceiling', tall: true, service: 'painting-services-dubai' },
  { photo: 'job-paint-roller', cat: 'fit', cap: 'Interior wall painting', alt: 'Painter using a roller on an interior wall', tall: true, service: 'painting-services-dubai' },
  { photo: 'job-tiling-bathroom', cat: 'fit', cap: 'Bathroom tiling', alt: 'Tiler cutting a floor tile in a bathroom', tall: true, service: 'tiling-works-dubai' },
  { photo: 'job-plastering-ladder', cat: 'fit', cap: 'Wall plastering', alt: 'Mason plastering a boundary wall from a ladder', tall: true, service: 'masonry-works-dubai' },
  { photo: 'job-cement-mixing', cat: 'fit', cap: 'Wall repair', alt: 'Workers mixing cement for an interior wall repair', tall: true, service: 'masonry-works-dubai' },
  { photo: 'job-paving-laying', cat: 'fit', cap: 'Interlock paving', alt: 'Workers laying interlock paving blocks beside a villa', tall: true, service: 'masonry-works-dubai' },
];

export const BEFORE_AFTER: { id: string; label: string; before: PhotoKey; after: PhotoKey }[] = [
  { id: 'paint', label: 'Interior painting', before: 'ba-paint-before', after: 'ba-paint-after' },
  { id: 'tiles', label: 'Bathroom tiling', before: 'ba-tiles-before', after: 'ba-tiles-after' },
  { id: 'glass', label: 'Glass cleaning', before: 'ba-glass-before', after: 'ba-glass-after' },
];
