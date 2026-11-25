import type { StaticImageData } from 'next/image';
import { PHOTOS } from './photos';

export type CategoryId = 'mep' | 'fit' | 'clean' | 'out';

export type Category = {
  id: CategoryId;
  label: string;
  short: string;
  blurb: string;
  image: StaticImageData;
  imageAlt: string;
};

export const CATEGORIES: Category[] = [
  { id: 'mep', label: 'AC & MEP', short: 'AC & MEP', blurb: 'AC, electrical, plumbing, CCTV', image: PHOTOS['cat-mep'], imageAlt: 'Plumber repairing pipes under a sink' },
  { id: 'fit', label: 'Fit-out & finishing', short: 'FIT-OUT', blurb: 'Paint, gypsum, tiles, carpentry', image: PHOTOS['cat-fit'], imageAlt: 'Bright living room with marble floor and large windows' },
  { id: 'clean', label: 'Cleaning', short: 'CLEANING', blurb: 'Apartments, glass, carpets', image: PHOTOS['cat-clean'], imageAlt: 'Cleaner mopping the floor of a bright modern apartment' },
  { id: 'out', label: 'Outdoor & blasting', short: 'OUTDOOR', blurb: 'Gardens, car wash, blasting', image: PHOTOS['cat-out'], imageAlt: 'White modern villa with landscaped garden and palm trees' },
];

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  cat: CategoryId;
  name: string;
  /** One line used in lists and cards. */
  desc: string;
  /** Meta description for search results (~150 chars). */
  meta: string;
  intro: string;
  includes: string[];
  faqs: Faq[];
};

const visitFaq: Faq = {
  q: 'How do I book?',
  a: 'Call or send a WhatsApp message with your location in Dubai and, if possible, a few photos of the job. We arrange a visit, inspect the work and give you the price before anything starts.',
};

export const SERVICES: Service[] = [
  // ───────────── AC & MEP ─────────────
  {
    slug: 'ac-repair-maintenance-dubai', cat: 'mep', name: 'AC Repairing & Maintenance',
    desc: 'Servicing, gas top-up, repairs and cleaning for split and central units.',
    meta: 'AC repair and maintenance in Dubai for split, window and central units: servicing, gas top-up, cleaning and fault repair for homes and offices.',
    intro: 'In Dubai the air conditioning runs almost all year, so small faults turn into big bills quickly. Our technicians service, clean and repair split, window and central AC units in villas, apartments, offices and shops, and explain what was wrong before any work starts.',
    includes: ['Routine AC servicing and filter cleaning', 'Gas leak checks and gas top-up', 'Fixing units that are not cooling, leaking water or making noise', 'Thermostat, fan motor and capacitor replacement', 'Indoor and outdoor unit deep cleaning'],
    faqs: [
      { q: 'How often should an AC be serviced in Dubai?', a: 'Because units run most of the year, most homes benefit from a service before the summer and again later in the year. Dusty areas and units that run all day may need cleaning more often.' },
      { q: 'Do you service central AC as well as split units?', a: 'Yes. We work on split, window and central systems in homes and commercial spaces. Tell us the type of unit when you contact us so the technician brings the right equipment.' },
      visitFaq,
    ],
  },
  {
    slug: 'ac-ducting-dubai', cat: 'mep', name: 'AC Ducting',
    desc: 'Duct installation, repair and cleaning.',
    meta: 'AC duct installation, repair and duct cleaning in Dubai for villas, apartments and offices. Better airflow and cleaner air from your central AC.',
    intro: 'Leaking or dirty ducts make a central AC work harder and spread dust around the room. We install new ductwork, repair damaged sections and clean existing ducts in homes, offices and shops across Dubai.',
    includes: ['New duct installation for fit-outs and extensions', 'Repair of leaking joints and damaged insulation', 'Duct and diffuser cleaning', 'Grille and diffuser replacement', 'Airflow checks after the work'],
    faqs: [
      { q: 'How do I know if my ducts need cleaning?', a: 'Common signs are dust coming from the vents, a musty smell when the AC starts, or rooms that cool unevenly. A technician can inspect the ducts and tell you if cleaning or repair is needed.' },
      visitFaq,
    ],
  },
  {
    slug: 'electrical-works-dubai', cat: 'mep', name: 'Electrical Works',
    desc: 'Wiring, DB boards, sockets, lights and fault finding.',
    meta: 'Electrician services in Dubai: wiring, DB boards, sockets, switches, light fitting and electrical fault finding for homes, offices and shops.',
    intro: 'From a tripping breaker to rewiring a room, our electricians handle electrical work in villas, apartments, offices and shops in Dubai. We find the fault first, then fix it safely and tidily.',
    includes: ['Electrical fault finding and tripping breakers', 'Socket, switch and light fitting installation', 'DB board repairs and upgrades', 'New wiring for renovations and fit-outs', 'Chandelier, spotlight and outdoor lighting installation'],
    faqs: [
      { q: 'Can you fix a breaker that keeps tripping?', a: 'Yes. A breaker usually trips because of a faulty appliance, a short circuit or an overloaded line. The electrician tests the circuits to find the cause before replacing anything.' },
      visitFaq,
    ],
  },
  {
    slug: 'plumbing-works-dubai', cat: 'mep', name: 'Plumbing Works',
    desc: 'Leaks, blockages, heaters, mixers and new lines.',
    meta: 'Plumber in Dubai for leaks, blocked drains, water heaters, mixers, toilets and new water lines in villas, apartments and offices.',
    intro: 'A small leak can damage walls, ceilings and the neighbour downstairs. Our plumbers fix leaks and blockages, replace mixers and heaters, and run new water lines for kitchens and bathrooms across Dubai.',
    includes: ['Leak detection and repair', 'Blocked sinks, toilets and drains', 'Water heater repair and replacement', 'Mixer, shower and sanitary ware installation', 'New water supply and drainage lines'],
    faqs: [
      { q: 'Do you replace water heaters?', a: 'Yes. We repair or replace water heaters and can advise on the right size for your bathroom or kitchen.' },
      visitFaq,
    ],
  },
  {
    slug: 'fridge-motor-repair-dubai', cat: 'mep', name: 'Fridge & Motors Working',
    desc: 'Repair of fridges, water pumps and motors.',
    meta: 'Fridge repair, water pump and motor repair in Dubai for homes, villas and buildings. Diagnosis and repair by experienced technicians.',
    intro: 'A fridge that stops cooling or a water pump that fails can stop a household. We diagnose and repair fridges, water pumps and electric motors for villas, apartments and small buildings in Dubai.',
    includes: ['Fridge and freezer not cooling', 'Gas and thermostat problems', 'Water pump repair and replacement', 'Electric motor checks and repair', 'Pressure pump installation'],
    faqs: [visitFaq],
  },
  {
    slug: 'cctv-camera-installation-dubai', cat: 'mep', name: 'CCTV Camera Fixing',
    desc: 'Camera installation, cabling and DVR setup.',
    meta: 'CCTV camera installation in Dubai for villas, shops and offices: camera fixing, cabling, DVR/NVR setup and mobile viewing.',
    intro: 'We install and fix CCTV cameras for villas, shops, warehouses and offices in Dubai, including neat cabling, recorder setup and viewing on your phone.',
    includes: ['Indoor and outdoor camera installation', 'Concealed or trunked cabling', 'DVR / NVR setup and storage', 'Mobile app viewing setup', 'Repair and relocation of existing cameras'],
    faqs: [visitFaq],
  },
  {
    slug: 'doorbell-repair-installation-dubai', cat: 'mep', name: 'Calling Bell Repair & New Fixing',
    desc: 'Doorbell repair and new installation.',
    meta: 'Doorbell and calling bell repair and new installation in Dubai for apartments, villas and offices, wired and wireless.',
    intro: 'A doorbell that does not ring is easy to ignore until a delivery is missed. We repair existing calling bells and fit new wired or wireless doorbells in apartments, villas and offices.',
    includes: ['Calling bell fault repair', 'New wired doorbell installation', 'Wireless doorbell setup', 'Replacing old bell buttons and chimes'],
    faqs: [visitFaq],
  },
  {
    slug: 'door-lock-fixing-dubai', cat: 'mep', name: 'Door Lock Fixing',
    desc: 'Lock replacement and repair.',
    meta: 'Door lock repair and replacement in Dubai for apartments, villas and offices: handles, cylinders, mortise locks and smart locks.',
    intro: 'We repair stiff or broken locks and fit new locks and handles on wooden, metal and glass doors in homes and offices across Dubai.',
    includes: ['Lock and cylinder replacement', 'Door handle repair and replacement', 'Mortise lock fitting', 'Smart lock installation', 'Door alignment so the lock closes properly'],
    faqs: [visitFaq],
  },

  // ───────────── Fit-out & finishing ─────────────
  {
    slug: 'painting-services-dubai', cat: 'fit', name: 'Painting Works',
    desc: 'Interior and exterior painting for villas, flats and offices.',
    meta: 'Painting services in Dubai: interior and exterior painting for villas, apartments and offices, including wall repairs, primer and clean finishing.',
    intro: 'Fresh paint changes a space faster than anything else. Our painters prepare the walls properly, repair cracks and patches, protect your floors and furniture, and finish cleanly in villas, apartments and offices across Dubai, including move-in and move-out painting.',
    includes: ['Interior wall and ceiling painting', 'Exterior villa and boundary wall painting', 'Crack filling, putty and surface preparation', 'Move-in and move-out repainting', 'Doors, frames and metal work painting'],
    faqs: [
      { q: 'Do you paint apartments before moving out?', a: 'Yes. Move-out painting is a common request in Dubai. Tell us the size of the apartment and your handover date and we will plan the work around it.' },
      { q: 'Do I need to move my furniture?', a: 'Our team covers and moves furniture where needed and protects floors before painting. Fragile or valuable items are best moved by you beforehand.' },
      visitFaq,
    ],
  },
  {
    slug: 'gypsum-works-dubai', cat: 'fit', name: 'Gypsum Works',
    desc: 'Gypsum boards, partitions and decorative work.',
    meta: 'Gypsum board works in Dubai: gypsum partitions, wall cladding, decorative cornices and TV walls for villas, apartments and offices.',
    intro: 'Gypsum lets you reshape a room without heavy construction. We build gypsum partitions, feature and TV walls, cornices and decorative details for homes and offices in Dubai.',
    includes: ['Gypsum board partitions and walls', 'TV walls and feature walls', 'Cornices and decorative mouldings', 'Repair of cracked or damaged gypsum', 'Finishing ready for paint'],
    faqs: [visitFaq],
  },
  {
    slug: 'false-ceiling-dubai', cat: 'fit', name: 'False Ceiling',
    desc: 'Gypsum and tile ceilings with lighting cut-outs.',
    meta: 'False ceiling installation in Dubai: gypsum and ceiling tile systems with spotlight and cove lighting cut-outs for homes, offices and shops.',
    intro: 'A false ceiling hides pipes and wiring and gives you clean lines for lighting. We install gypsum and tile false ceilings with spotlights, cove lighting and AC grille cut-outs in villas, apartments, offices and shops.',
    includes: ['Gypsum false ceilings', 'Ceiling tile (grid) systems for offices', 'Cove and spotlight lighting cut-outs', 'AC diffuser and access panel openings', 'Repair of sagging or water-damaged ceilings'],
    faqs: [visitFaq],
  },
  {
    slug: 'partition-works-dubai', cat: 'fit', name: 'Partition Works',
    desc: 'Office and room partitions.',
    meta: 'Partition works in Dubai: gypsum, glass and board partitions to divide offices, shops and rooms in apartments and villas.',
    intro: 'Need an extra room, a private office or a separate storage area? We build gypsum and board partitions for offices, shops and homes in Dubai, finished and ready to use.',
    includes: ['Office partitions and cabins', 'Room dividers in apartments and villas', 'Insulated partitions for better sound control', 'Doors and frames within partitions'],
    faqs: [visitFaq],
  },
  {
    slug: 'carpentry-works-dubai', cat: 'fit', name: 'Carpenter Works',
    desc: 'Doors, cabinets, wardrobes and repairs.',
    meta: 'Carpenter in Dubai for doors, kitchen cabinets, wardrobes, shelves and furniture repair in villas, apartments and offices.',
    intro: 'Our carpenters fit and repair doors, kitchen cabinets, wardrobes and shelving, and fix the hinges, drawers and handles that wear out in daily use.',
    includes: ['Door fitting and repair', 'Kitchen cabinet repair and installation', 'Wardrobes and built-in storage', 'Shelves, TV units and furniture assembly', 'Hinge, drawer channel and handle replacement'],
    faqs: [visitFaq],
  },
  {
    slug: 'finishing-carpentry-dubai', cat: 'fit', name: 'Finishing Carpenter',
    desc: 'Skirting, trims and final joinery.',
    meta: 'Finishing carpentry in Dubai: skirting, door trims, architraves and final joinery for renovations and fit-outs.',
    intro: 'The final joinery is what makes a fit-out look finished. We fit skirting, door trims, architraves and other finishing details for renovation and fit-out projects in Dubai.',
    includes: ['Skirting boards', 'Door frames, trims and architraves', 'Wall panelling details', 'Final adjustments before handover'],
    faqs: [visitFaq],
  },
  {
    slug: 'tiling-works-dubai', cat: 'fit', name: 'Tiles Works',
    desc: 'Floor and wall tiling, grouting and repairs.',
    meta: 'Tiling services in Dubai: floor and wall tiles for bathrooms, kitchens and living areas, re-grouting and broken tile replacement.',
    intro: 'We lay floor and wall tiles in bathrooms, kitchens, balconies and living areas, replace cracked tiles and re-grout old joints so they look new again.',
    includes: ['Floor tiling and wall tiling', 'Bathroom and kitchen tiling', 'Broken or hollow tile replacement', 'Re-grouting and sealing', 'Balcony and outdoor tiling'],
    faqs: [
      { q: 'Can you replace just a few broken tiles?', a: 'Yes. If you still have matching spare tiles we can replace the damaged ones. If not, send us a photo and we can help find a close match.' },
      visitFaq,
    ],
  },
  {
    slug: 'marble-works-dubai', cat: 'fit', name: 'Marble Works',
    desc: 'Marble fixing, polishing and repairs.',
    meta: 'Marble works in Dubai: marble fixing, polishing, crack repair and restoration for floors, stairs and countertops in villas and offices.',
    intro: 'Marble is common in Dubai homes and offices, and it needs the right care. We fix new marble, repair chips and cracks, and polish dull floors, stairs and countertops back to a shine.',
    includes: ['Marble floor and wall fixing', 'Marble polishing and restoration', 'Chip and crack repair', 'Stairs, thresholds and countertops'],
    faqs: [visitFaq],
  },
  {
    slug: 'masonry-works-dubai', cat: 'fit', name: 'Mason Works',
    desc: 'Block work, plastering and civil repairs.',
    meta: 'Masonry and civil works in Dubai: block work, plastering, wall repairs and small civil jobs for villas, apartments and shops.',
    intro: 'Our masons handle block work, plastering and civil repairs, from closing an opening to repairing cracked plaster before painting.',
    includes: ['Block work and new walls', 'Plastering and render', 'Crack and wall repairs', 'Small civil modifications'],
    faqs: [visitFaq],
  },

  // ───────────── Cleaning ─────────────
  {
    slug: 'cleaning-services-dubai', cat: 'clean', name: 'Cleaning Works',
    desc: 'General and deep cleaning.',
    meta: 'Cleaning services in Dubai: general cleaning, deep cleaning and after-construction cleaning for villas, apartments, offices and shops.',
    intro: 'From a regular clean to a full deep clean after renovation, our cleaning team works in villas, apartments, offices and shops across Dubai.',
    includes: ['General and deep cleaning', 'After-construction and after-painting cleaning', 'Kitchen and bathroom deep cleaning', 'Office and shop cleaning'],
    faqs: [visitFaq],
  },
  {
    slug: 'apartment-cleaning-dubai', cat: 'clean', name: 'Apartment Cleaning',
    desc: 'Move-in, move-out and regular cleaning.',
    meta: 'Apartment cleaning in Dubai: move-in and move-out cleaning, deep cleaning and regular home cleaning for studios, flats and villas.',
    intro: 'Moving in, moving out or just need a proper clean? We clean studios, apartments and villas in Dubai, including kitchens, bathrooms, balconies and windows.',
    includes: ['Move-in and move-out cleaning', 'Kitchen degreasing', 'Bathroom descaling', 'Balcony and window cleaning', 'Regular home cleaning'],
    faqs: [
      { q: 'Can you clean before I hand back my apartment?', a: 'Yes. Move-out cleaning is often combined with painting before handover. Tell us your handover date and we can plan both.' },
      visitFaq,
    ],
  },
  {
    slug: 'glass-window-cleaning-dubai', cat: 'clean', name: 'Glass Cleaning',
    desc: 'Windows and glass facades.',
    meta: 'Glass and window cleaning in Dubai for apartments, villas, shops and office glass facades. Streak-free windows, doors and partitions.',
    intro: 'Dust settles on glass quickly in Dubai. We clean windows, glass doors, shopfronts, partitions and glass facades for homes and businesses.',
    includes: ['Window cleaning inside and outside', 'Shopfront and glass door cleaning', 'Glass partition cleaning', 'Glass facade cleaning'],
    faqs: [visitFaq],
  },
  {
    slug: 'carpet-cleaning-dubai', cat: 'clean', name: 'Carpet Wash',
    desc: 'Carpet and rug shampoo and drying.',
    meta: 'Carpet and rug cleaning in Dubai: shampoo washing, stain treatment and drying for homes and offices.',
    intro: 'Carpets and rugs hold dust and sand. We shampoo, treat stains and dry carpets and rugs for homes and offices in Dubai.',
    includes: ['Carpet shampoo cleaning', 'Rug washing', 'Stain and odour treatment', 'Office carpet cleaning'],
    faqs: [visitFaq],
  },

  // ───────────── Outdoor & blasting ─────────────
  {
    slug: 'landscaping-dubai', cat: 'out', name: 'Landscaping',
    desc: 'Grass laying, planting and garden upkeep.',
    meta: 'Landscaping in Dubai: grass laying, planting, garden design and regular garden maintenance for villas and compounds.',
    intro: 'A green garden in the Dubai climate needs the right plants and regular care. We lay grass, plant trees and shrubs, and maintain villa and compound gardens.',
    includes: ['Natural and artificial grass laying', 'Planting trees, palms and shrubs', 'Garden clean-up and trimming', 'Regular garden maintenance'],
    faqs: [visitFaq],
  },
  {
    slug: 'car-wash-dubai', cat: 'out', name: 'Car Wash',
    desc: 'Exterior and interior car cleaning.',
    meta: 'Car wash in Dubai: exterior washing and interior cleaning for cars at your villa, building or office.',
    intro: 'We wash and clean cars inside and out for homes, buildings and offices in Dubai.',
    includes: ['Exterior wash', 'Interior vacuum and wipe-down', 'Seat and mat cleaning'],
    faqs: [visitFaq],
  },
  {
    slug: 'sand-blasting-dubai', cat: 'out', name: 'Sand Blasting',
    desc: 'Surface preparation and rust removal.',
    meta: 'Sand blasting in Dubai for rust removal, paint stripping and surface preparation on steel, metal and concrete.',
    intro: 'Sand blasting strips rust, old paint and coatings so a new finish lasts. We prepare steel, metal and concrete surfaces for repainting and coating.',
    includes: ['Rust removal on steel and metal', 'Old paint and coating removal', 'Surface preparation before painting', 'Concrete surface cleaning'],
    faqs: [visitFaq],
  },
  {
    slug: 'high-pressure-cleaning-dubai', cat: 'out', name: 'High Pressure Blasting',
    desc: 'Pressure washing for floors, walls and facades.',
    meta: 'High pressure cleaning in Dubai for driveways, floors, walls, facades and parking areas at villas, buildings and shops.',
    intro: 'High pressure washing removes dust, oil and stains from driveways, walls, facades and parking areas quickly, without harsh scrubbing.',
    includes: ['Driveway and interlock cleaning', 'Wall and boundary wall washing', 'Building facade washing', 'Parking area and floor cleaning'],
    faqs: [visitFaq],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const servicesIn = (cat: CategoryId) => SERVICES.filter((s) => s.cat === cat);
export const categoryById = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
