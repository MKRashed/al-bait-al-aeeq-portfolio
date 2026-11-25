// Static imports give next/image the width, height and a blur placeholder.
// To use the company's own photos, replace the files in src/assets/photos
// with the same names and set SITE.samplePhotos to false.
import heroMain from '@/assets/photos/hero-main.jpg';
import heroA from '@/assets/photos/hero-a.jpg';
import heroB from '@/assets/photos/hero-b.jpg';
import catMep from '@/assets/photos/cat-mep.jpg';
import catFit from '@/assets/photos/cat-fit.jpg';
import catClean from '@/assets/photos/cat-clean.jpg';
import catOut from '@/assets/photos/cat-out.jpg';
import step1 from '@/assets/photos/step-1.jpg';
import step2 from '@/assets/photos/step-2.jpg';
import step3 from '@/assets/photos/step-3.jpg';
import step4 from '@/assets/photos/step-4.jpg';
import work1 from '@/assets/photos/work-1.jpg';
import work2 from '@/assets/photos/work-2.jpg';
import work3 from '@/assets/photos/work-3.jpg';
import work4 from '@/assets/photos/work-4.jpg';
import work5 from '@/assets/photos/work-5.jpg';
import work6 from '@/assets/photos/work-6.jpg';
import work7 from '@/assets/photos/work-7.jpg';
import work8 from '@/assets/photos/work-8.jpg';
import work9 from '@/assets/photos/work-9.jpg';
import baPaintBefore from '@/assets/photos/ba-paint-before.jpg';
import baPaintAfter from '@/assets/photos/ba-paint-after.jpg';
import baTilesBefore from '@/assets/photos/ba-tiles-before.jpg';
import baTilesAfter from '@/assets/photos/ba-tiles-after.jpg';
import baGlassBefore from '@/assets/photos/ba-glass-before.jpg';
import baGlassAfter from '@/assets/photos/ba-glass-after.jpg';

export const PHOTOS = {
  'hero-main': heroMain, 'hero-a': heroA, 'hero-b': heroB,
  'cat-mep': catMep, 'cat-fit': catFit, 'cat-clean': catClean, 'cat-out': catOut,
  'step-1': step1, 'step-2': step2, 'step-3': step3, 'step-4': step4,
  'work-1': work1, 'work-2': work2, 'work-3': work3, 'work-4': work4, 'work-5': work5,
  'work-6': work6, 'work-7': work7, 'work-8': work8, 'work-9': work9,
  'ba-paint-before': baPaintBefore, 'ba-paint-after': baPaintAfter,
  'ba-tiles-before': baTilesBefore, 'ba-tiles-after': baTilesAfter,
  'ba-glass-before': baGlassBefore, 'ba-glass-after': baGlassAfter,
};

export type PhotoKey = keyof typeof PHOTOS;

/** Unsplash credits (unsplash.com/license; credit appreciated, not required). */
export const CREDITS: { key: PhotoKey; name: string; user: string }[] = [
  { key: 'hero-main', name: 'Emmanuel Ikwuegbu', user: 'emmages' },
  { key: 'hero-a', name: 'Raze Solar', user: 'razesolar' },
  { key: 'hero-b', name: 'Callum Hill', user: 'inkyhills' },
  { key: 'cat-mep', name: 'Timur Shakerzianov', user: 'shaker_jpg' },
  { key: 'cat-fit', name: 'Maverick Frame', user: 'maverickframe' },
  { key: 'cat-clean', name: 'Vitaly Gariev', user: 'silverkblack' },
  { key: 'cat-out', name: 'VJ Von Art', user: 'vjvonart' },
  { key: 'step-1', name: 'Mika Baumeister', user: 'kommumikation' },
  { key: 'step-2', name: 'John Kakuk', user: 'lensatic' },
  { key: 'step-3', name: 'Vitaly Gariev', user: 'silverkblack' },
  { key: 'step-4', name: 'Aalo Lens', user: 'aalolens' },
  { key: 'work-1', name: 'Joel Muniz', user: 'jmuniz' },
  { key: 'work-2', name: 'Ernys', user: 'ernys' },
  { key: 'work-3', name: 'apryan widodo', user: 'apryan_cahyo' },
  { key: 'work-4', name: 'Point3D Commercial Imaging Ltd.', user: '3dottawa' },
  { key: 'work-5', name: 'Sanju Pandita', user: 'spxclicks' },
  { key: 'work-6', name: 'Priscilla Du Preez', user: 'priscilladupreez' },
  { key: 'work-7', name: 'Toolmash Expo', user: 'toolmash' },
  { key: 'work-8', name: 'Giorgio Trovato', user: 'giorgiotrovato' },
  { key: 'work-9', name: 'The Graphic Space', user: 'thegraphicspace' },
  { key: 'ba-paint-before', name: 'Krakograff Textures', user: 'krakograff' },
  { key: 'ba-paint-after', name: 'Prydumano Design', user: 'prydumanodesign' },
  { key: 'ba-tiles-before', name: 'Tsuyoshi Kozu', user: 'tsuyoshikozu' },
  { key: 'ba-tiles-after', name: 'Clay Banks', user: 'claybanks' },
  { key: 'ba-glass-before', name: 'Denny Müller', user: 'redaquamedia' },
  { key: 'ba-glass-after', name: 'Ismail Merad', user: 'ismail_fwcr' },
];
