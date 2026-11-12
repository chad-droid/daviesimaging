// The product modules a client showcase deck (/for/[id]) can include, in deck
// order. The admin picks which ones go into each deck; the cover, lineup, and
// digDesk close always show.
//
// `available: false` hides a module everywhere (admin checkbox disabled, deck
// skips it) until its assets are in /public/client-showcase.

export type ModuleKey = "premium" | "cineflow" | "actflow" | "listing" | "specplus" | "planmatch";

export type ShowcaseModule = {
  key: ModuleKey;
  name: string;
  kind: string; // small caps label on the lineup card
  line: string; // one-line description on the lineup card
  available: boolean;
};

export const SHOWCASE_MODULES: ShowcaseModule[] = [
  {
    key: "premium",
    name: "Premium",
    kind: "Photography",
    line: "Model home, amenity, and lifestyle photography, styled and shot by DIG.",
    available: false,
  },
  {
    key: "cineflow",
    name: "CineFlow",
    kind: "Video from your photos",
    line: "A cinematic film of your model, built from the same shoot.",
    available: true,
  },
  {
    key: "actflow",
    name: "ActFlow",
    kind: "Video with people",
    line: "CineFlow with the scenes brought to life by people.",
    available: true,
  },
  {
    key: "listing",
    name: "Listing",
    kind: "Production",
    line: "Spec and community photography, shot and edited by DIG.",
    available: true,
  },
  {
    key: "specplus",
    name: "Spec+",
    kind: "Production + digital",
    line: "Listing photos, ModelMatch staging, and a FrameFlow video.",
    available: true,
  },
  {
    key: "planmatch",
    name: "PlanMatch",
    kind: "3D",
    line: "Finished exterior and interior images for plans with no model.",
    available: true,
  },
];

const ALL_KEYS = SHOWCASE_MODULES.map((m) => m.key);

// Decks saved before the selector existed have no module list. They keep the
// five modules they were sent with, so a deck already in a client's inbox
// never changes underneath them.
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
