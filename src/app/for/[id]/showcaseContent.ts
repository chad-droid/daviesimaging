// Static content for the client showcase deck (/for/[id]). Every client deck
// shows the same products and assets; only the cover/close personalize.
//
// Product names follow the Product Name Hardening sheet (Nov 2026):
// Cinematic -> CineFlow, TalentMatch -> ActFlow. Module order, stages and
// one-liners live in src/lib/showcaseModules.ts and follow the site menu.
//
// Assets live in /public/client-showcase (web-encoded from the "Library Dig"
// Drive folder). Public route, so never point at gated paths.

const A = (f: string) => `/client-showcase/${f}`;

export type Film = { label: string; video: string; poster: string };
export type Still = { src: string; thumb: string; alt: string };

const still = (name: string, alt: string): Still => ({
  src: A(`${name}.webp`),
  thumb: A(`${name}-sm.webp`),
  alt,
});

const film = (name: string, label: string): Film => ({
  label,
  video: A(`${name}.mp4`),
  poster: A(`${name}-poster.webp`),
});

export const CINEFLOW_FILMS: Film[] = [
  film("cineflow-wildrose", "Wildrose"),
  film("cineflow-crestmont", "Crestmont"),
];

export const ACTFLOW_FILMS: Film[] = [
  film("actflow-blueheron", "Blue Heron"),
  film("actflow-kolter", "Kolter Homes"),
];

export const LISTING_STILLS: Still[] = [
  still("listing-22", "Townhome exterior and front walk"),
  still("listing-06", "Kitchen with island and pendant lights"),
  still("listing-11", "Open living area into the kitchen"),
  still("listing-07", "Kitchen with stainless appliances"),
  still("listing-10", "Living room with balcony doors"),
  still("listing-17", "Primary bathroom with double vanity"),
];

export type SpecHome = { label: string; film: Film; stills: Still[] };

export const SPEC_HOMES: SpecHome[] = [
  {
    label: "Artisan Circle",
    film: film("specplus-artisan", "Artisan Circle"),
    stills: [
      still("spec-artisan-01", "Kitchen, virtually staged"),
      still("spec-artisan-02", "Great room, virtually staged"),
      still("spec-artisan-03", "Dining, virtually staged"),
      still("spec-artisan-05", "Breakfast nook, virtually staged"),
      still("spec-artisan-06", "Primary bedroom, virtually staged"),
      still("spec-artisan-08", "Covered patio, virtually staged"),
    ],
  },
  {
    label: "Palatka Street",
    film: film("specplus-palatka", "Palatka Street"),
    stills: [
      still("spec-palatka-01", "Kitchen, virtually staged"),
      still("spec-palatka-02", "Living room, virtually staged"),
      still("spec-palatka-03", "Dining and kitchen, virtually staged"),
      still("spec-palatka-05", "Office, virtually staged"),
      still("spec-palatka-06", "Primary bedroom, virtually staged"),
      still("spec-palatka-08", "Covered patio, virtually staged"),
    ],
  },
  {
    label: "Cresswind DeLand",
    film: film("specplus-cresswind", "Cresswind DeLand"),
    stills: [
      still("spec-cresswind-01", "Living room, virtually staged"),
      still("spec-cresswind-03", "Kitchen, virtually staged"),
      still("spec-cresswind-04", "Kitchen and living, virtually staged"),
      still("spec-cresswind-05", "Family room, virtually staged"),
      still("spec-cresswind-06", "Office, virtually staged"),
      still("spec-cresswind-07", "Primary bedroom, virtually staged"),
    ],
  },
];

// PlanMatch: one tab per builder. The second builder asked not to be named,
// so its tab, plan labels, and file names stay generic ("cc" = confidential
// client). Do not add the builder or plan names anywhere in this repo.
export type PlanSet = { label: string; stills: Still[] };
export type PlanBuilder = { label: string; note?: string; plans: PlanSet[] };

const COVENTRY_STILLS: Still[] = [
  still("planmatch-coventry-ext-twilight", "Front exterior at twilight"),
  still("planmatch-coventry-ext-sunset", "Front exterior at sunset"),
  still("planmatch-coventry-ext-corner", "Corner exterior at sunset"),
  still("planmatch-coventry-ext-day", "Front exterior in daylight"),
  still("planmatch-02-living-dining", "Living and dining"),
  still("planmatch-04-kitchen", "Kitchen"),
  still("planmatch-04-living-dining-kitchen", "Living, dining, and kitchen"),
  still("planmatch-03-kitchen-dining", "Kitchen and dining"),
  still("planmatch-05-master-bedroom", "Primary bedroom"),
  still("planmatch-06-secondary-bedroom", "Secondary bedroom"),
  still("planmatch-07-office", "Office"),
  still("planmatch-08-bathroom", "Bathroom"),
];

const ccPlan = (n: number): PlanSet => ({
  label: `Plan ${n}`,
  stills: [
    still(`planmatch-cc-p${n}-ext`, `Plan ${n} front exterior`),
    ...["01", "02", "03", "04", "05", "06", "07"].map((k, i) =>
      still(`planmatch-cc-p${n}-${k}`, `Plan ${n} interior ${i + 1}`),
    ),
  ],
});

export const PLANMATCH_BUILDERS: PlanBuilder[] = [
  { label: "Coventry", plans: [{ label: "Coventry", stills: COVENTRY_STILLS }] },
  {
    label: "Confidential client",
    note: "Five plans with no model, built in 3D and delivered staged. Builder name withheld.",
    plans: [1, 2, 3, 4, 5].map(ccPlan),
  },
];

// Premium Photography: one tab per set (model home, amenity, lifestyle...).
// Empty until the photos are encoded into /public/client-showcase; the module
// stays switched off in src/lib/showcaseModules.ts until then.
export type PremiumSet = { label: string; stills: Still[] };

export const PREMIUM_SETS: PremiumSet[] = [];

// Moments: the vertical close ups shown on /services/moments (already public).
export const MOMENTS_STILLS: Still[] = [
  { src: "/showcase/moments-hood-2.webp", thumb: "/showcase/moments-hood-2.webp", alt: "Range hood close up" },
  { src: "/showcase/moments-faucet-1.webp", thumb: "/showcase/moments-faucet-1.webp", alt: "Kitchen faucet close up" },
  { src: "/showcase/moments-fireplace-1.webp", thumb: "/showcase/moments-fireplace-1.webp", alt: "Fireplace close up" },
  { src: "/showcase/moments-fridge-1.webp", thumb: "/showcase/moments-fridge-1.webp", alt: "Refrigerator close up" },
  { src: "/showcase/moments-bath-1.webp", thumb: "/showcase/moments-bath-1.webp", alt: "Bathroom close up" },
];

export const DIGDESK_SHOT = "/mm-deck/digdesk-dashboard.jpg";
