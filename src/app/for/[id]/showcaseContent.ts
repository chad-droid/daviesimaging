// Static content for the client showcase deck (/for/[id]). Every client deck
// shows the same products and assets; only the cover/close personalize.
//
// Product names follow the Product Name Hardening sheet (Nov 2026):
// Cinematic -> CineFlow, TalentMatch -> ActFlow. Order follows Part 2 of the
// Drees "digDesk and the Asset Cloud" deck.
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

export const ACTFLOW_FILM: Film = film("actflow-shoreline", "Shoreline");

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

export const PLANMATCH_STILLS: Still[] = [
  still("planmatch-02-living-dining", "Living and dining"),
  still("planmatch-04-kitchen", "Kitchen"),
  still("planmatch-04-living-dining-kitchen", "Living, dining, and kitchen"),
  still("planmatch-03-kitchen-dining", "Kitchen and dining"),
  still("planmatch-05-master-bedroom", "Primary bedroom"),
  still("planmatch-06-secondary-bedroom", "Secondary bedroom"),
  still("planmatch-07-office", "Office"),
  still("planmatch-08-bathroom", "Bathroom"),
];

export const DIGDESK_SHOT = "/mm-deck/digdesk-dashboard.jpg";

// The lineup slide. `slide` is the index of the product's slide in the deck.
export const LINEUP = [
  { n: "01", name: "CineFlow", kind: "Video from your photos", line: "A cinematic film of your model, built from the same shoot." },
  { n: "02", name: "ActFlow", kind: "Video with people", line: "CineFlow with the scenes brought to life by people." },
  { n: "03", name: "Listing", kind: "Production", line: "Spec and community photography, shot and edited by DIG." },
  { n: "04", name: "Spec+", kind: "Production + digital", line: "Listing photos, ModelMatch staging, and a FrameFlow video." },
  { n: "05", name: "PlanMatch", kind: "3D", line: "Finished interior images for plans that have no model." },
] as const;
