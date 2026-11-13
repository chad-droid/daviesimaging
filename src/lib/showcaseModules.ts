// The product modules a client showcase deck (/for/[id]) can include, in deck
// order. The admin picks which ones go into each deck; the cover, lineup, and
// digDesk close always show.
//
// Order, stages, lines, and one-line descriptions follow the site's Solutions
// menu (src/components/Nav.tsx): Lead (pre-sell before it's built), Launch
// (model homes and amenities), List (spec homes for sale). Keep them in step
// when the menu changes.
//
// `available: false` hides a module everywhere (admin checkbox disabled, deck
// skips it) until its assets are in /public/client-showcase.

export type ModuleKey =
  | "planmatch"
  | "cineflow"
  | "actflow"
  | "premium"
  | "moments"
  | "listing"
  | "specplus";

export type Stage = "Lead" | "Launch" | "List";
export type Line = "Production" | "Flow" | "Match";

export type ShowcaseModule = {
  key: ModuleKey;
  name: string;
  stages: Stage[];
  line: Line;
  blurb: string; // one line on the lineup card, matches the site menu
  href: string; // the product's page on the site
  available: boolean;
};

export const SHOWCASE_MODULES: ShowcaseModule[] = [
  {
    key: "planmatch",
    name: "PlanMatch",
    stages: ["Lead"],
    line: "Match",
    blurb: "Photography made from your plans.",
    href: "/services/planmatch",
    available: true,
  },
  {
    key: "cineflow",
    name: "CineFlow",
    stages: ["Lead", "Launch"],
    line: "Flow",
    blurb: "Cinematic sequences without a photo shoot.",
    href: "/services/cineflow",
    available: true,
  },
  {
    key: "actflow",
    name: "ActFlow",
    stages: ["Lead", "Launch"],
    line: "Flow",
    blurb: "Virtual talent brings your spaces to life.",
    href: "/services/actflow",
    available: true,
  },
  {
    key: "premium",
    name: "Premium Photography",
    stages: ["Launch"],
    line: "Production",
    blurb: "Model homes, amenities and lifestyle.",
    href: "/services/premium",
    available: false,
  },
  {
    key: "moments",
    name: "Moments",
    stages: ["Launch"],
    line: "Match",
    blurb: "Vertical close ups for social.",
    href: "/services/moments",
    available: true,
  },
  {
    key: "listing",
    name: "Listing Photography",
    stages: ["List"],
    line: "Production",
    blurb: "HDR spec home photos, MLS-ready.",
    href: "/services/listing",
    available: true,
  },
  {
    key: "specplus",
    name: "Spec+",
    stages: ["List"],
    line: "Production",
    blurb: "Photography, staging, and video, $600 flat.",
    href: "/programs/spec-plus",
    available: true,
  },
];

const ALL_KEYS = SHOWCASE_MODULES.map((m) => m.key);

// Decks saved before the selector existed have no module list. They keep the
// five modules they were sent with, so a deck already in a client's inbox
// never loses a product.
const LEGACY_DEFAULT: ModuleKey[] = ["cineflow", "actflow", "listing", "specplus", "planmatch"];

/** Every module that can currently be shown; the default for a new deck. */
export const DEFAULT_MODULES: ModuleKey[] = SHOWCASE_MODULES.filter((m) => m.available).map((m) => m.key);

/** Validates stored or submitted input into a clean list (null = not set). */
export function cleanModules(input: unknown): ModuleKey[] | null {
  if (!Array.isArray(input)) return null;
  const set = new Set(input.filter((k): k is ModuleKey => ALL_KEYS.includes(k as ModuleKey)));
  return ALL_KEYS.filter((k) => set.has(k));
}

/** The modules a deck actually renders, in deck order. */
export function resolveModules(stored: ModuleKey[] | null): ShowcaseModule[] {
  const keys = new Set(stored ?? LEGACY_DEFAULT);
  return SHOWCASE_MODULES.filter((m) => m.available && keys.has(m.key));
}

/** The stage and line taglines the site's Solutions menu uses. */
export const STAGE_TAGLINES: Record<Stage, string> = {
  Lead: "Pre-sell before it's built",
  Launch: "Model homes and amenities",
  List: "Spec homes for sale",
};
export const LINE_TAGLINES: Record<Line, string> = {
  Production: "Listing and Premium services",
  Flow: "Video from your still images",
  Match: "Extend your merchandising",
};
