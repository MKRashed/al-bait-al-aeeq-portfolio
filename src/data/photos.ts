// Static imports give next/image the width, height and a blur placeholder.
// Job photos are the company's own. Step, cleaning and outdoor images are still
// Unsplash stock (see CREDITS below).
import catClean from '@/assets/photos/cat-clean.jpg';
import catOut from '@/assets/photos/cat-out.jpg';
import step1 from '@/assets/photos/step-1.jpg';
import step2 from '@/assets/photos/step-2.jpg';
import step3 from '@/assets/photos/step-3.jpg';
import step4 from '@/assets/photos/step-4.jpg';

import electricalRewiring from '@/assets/photos/electrical-rewiring-wall-2.jpeg';
import electricalBoard from '@/assets/photos/electrical-distribution-board-wiring.jpeg';
import plumbingSink from '@/assets/photos/plumbing-kitchen-sink-repair.jpeg';
import waterHeater from '@/assets/photos/water-heater-installation.jpeg';
import paintStaircase from '@/assets/photos/painting-staircase-interior.jpeg';
import paintVillaScaffold from '@/assets/photos/painting-villa-exterior-scaffold.jpeg';
import paintCarport from '@/assets/photos/painting-carport-ceiling.jpeg';
import paintRoller from '@/assets/photos/painting-interior-wall-roller.jpeg';
import tilingBathroom from '@/assets/photos/tiling-bathroom-tile-cutting.jpeg';
import plasteringLadder from '@/assets/photos/wall-plastering-ladder-1.jpeg';
import cementMixing from '@/assets/photos/cement-mixing-wall-repair.jpeg';
import pavingLaying from '@/assets/photos/paving-interlock-laying.jpeg';

export const PHOTOS = {
  'hero-main': paintVillaScaffold, 'hero-a': electricalBoard, 'hero-b': paintStaircase,
  'cat-mep': plumbingSink, 'cat-fit': paintRoller, 'cat-clean': catClean, 'cat-out': catOut,
  'step-1': step1, 'step-2': step2, 'step-3': step3, 'step-4': step4,
  'job-electrical-rewiring': electricalRewiring,
  'job-electrical-board': electricalBoard,
  'job-plumbing-sink': plumbingSink,
  'job-water-heater': waterHeater,
  'job-paint-staircase': paintStaircase,
  'job-paint-villa-scaffold': paintVillaScaffold,
  'job-paint-carport': paintCarport,
  'job-paint-roller': paintRoller,
  'job-tiling-bathroom': tilingBathroom,
  'job-plastering-ladder': plasteringLadder,
  'job-cement-mixing': cementMixing,
  'job-paving-laying': pavingLaying,
};

export type PhotoKey = keyof typeof PHOTOS;

/** Unsplash credits for the stock photos still in use (unsplash.com/license). */
export const CREDITS: { key: PhotoKey; name: string; user: string }[] = [
  { key: 'cat-clean', name: 'Vitaly Gariev', user: 'silverkblack' },
  { key: 'cat-out', name: 'VJ Von Art', user: 'vjvonart' },
  { key: 'step-1', name: 'Mika Baumeister', user: 'kommumikation' },
  { key: 'step-2', name: 'John Kakuk', user: 'lensatic' },
  { key: 'step-3', name: 'Vitaly Gariev', user: 'silverkblack' },
  { key: 'step-4', name: 'Aalo Lens', user: 'aalolens' },
];
