import type { CategoryId } from './services';
import type { PhotoKey } from './photos';

export const STEPS: { n: string; title: string; text: string; photo: PhotoKey; alt: string }[] = [
  { n: '01', title: 'Call or WhatsApp', text: 'Tell us what needs fixing and where you are in Dubai. Photos of the problem help us understand the job before we arrive.', photo: 'step-1', alt: 'Customer holding a phone with WhatsApp open' },
  { n: '02', title: 'Site visit', text: 'Our technician inspects the job at your villa, apartment or office and checks what materials are needed.', photo: 'step-2', alt: 'Two technicians in safety vests inspecting a site' },
  { n: '03', title: 'Clear quote', text: 'You get the price and timing before any work starts. Nothing begins without your approval.', photo: 'step-3', alt: 'Client and contractor shaking hands over a table' },
  { n: '04', title: 'Job done', text: 'Our team completes the work, cleans up after, and checks everything with you before leaving.', photo: 'step-4', alt: 'Finished modern living room with large windows' },
];

export const GALLERY: { photo: PhotoKey; cat: CategoryId; cap: string; alt: string; tall?: boolean; service: string }[] = [
  { photo: 'work-1', cat: 'mep', cap: 'AC maintenance', alt: 'Technician servicing an outdoor air conditioning unit', tall: true, service: 'ac-repair-maintenance-dubai' },
  { photo: 'work-2', cat: 'fit', cap: 'Interior painting', alt: 'Painter rolling paint on an interior wall', service: 'painting-services-dubai' },
  { photo: 'work-3', cat: 'fit', cap: 'Gypsum & false ceiling', alt: 'Gypsum false ceiling with chandelier and spotlights', service: 'false-ceiling-dubai' },
  { photo: 'work-4', cat: 'fit', cap: 'Tiles & marble', alt: 'Large-format tiled bathroom floor and glass shower', service: 'tiling-works-dubai' },
  { photo: 'work-5', cat: 'out', cap: 'Landscaping', alt: 'Villa garden with palm trees, lawn and stepping stones', tall: true, service: 'landscaping-dubai' },
  { photo: 'work-6', cat: 'clean', cap: 'Glass cleaning', alt: 'Workers cleaning a glass building facade from a platform', service: 'glass-window-cleaning-dubai' },
  { photo: 'work-7', cat: 'mep', cap: 'Electrical works', alt: 'Electrician testing an electrical panel with a meter', service: 'electrical-works-dubai' },
  { photo: 'work-8', cat: 'clean', cap: 'Apartment cleaning', alt: 'Cleaner vacuuming an upholstered ottoman', tall: true, service: 'apartment-cleaning-dubai' },
  { photo: 'work-9', cat: 'out', cap: 'High pressure blasting', alt: 'Worker in a safety vest pressure washing a floor', service: 'high-pressure-cleaning-dubai' },
];

export const BEFORE_AFTER: { id: string; label: string; before: PhotoKey; after: PhotoKey }[] = [
  { id: 'paint', label: 'Interior painting', before: 'ba-paint-before', after: 'ba-paint-after' },
  { id: 'tiles', label: 'Bathroom tiling', before: 'ba-tiles-before', after: 'ba-tiles-after' },
  { id: 'glass', label: 'Glass cleaning', before: 'ba-glass-before', after: 'ba-glass-after' },
];
