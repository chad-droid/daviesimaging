// Shore Summit 2026 event photo galleries. The four fixed sub-galleries and the
// shared image shape. gallery_slug in the DB matches `slug` here.

export const SHORE_GALLERIES = [
  { slug: "welcome-celebration", title: "Tiki Island Welcome Party" },
  { slug: "shore-summit-day-1", title: "Shore Summit Day 1" },
  { slug: "rilla-sunset-cruise", title: "Sunset Cruise" },
  { slug: "shore-summit-day-2", title: "Shore Summit Day 2" },
] as const;

export type GallerySlug = (typeof SHORE_GALLERIES)[number]["slug"];

export function galleryTitle(slug: string): string | null {
  return SHORE_GALLERIES.find((g) => g.slug === slug)?.title ?? null;
}

export function isGallerySlug(slug: string): slug is GallerySlug {
  return SHORE_GALLERIES.some((g) => g.slug === slug);
}

// One image as returned to the client (grid + lightbox).
export type EventImage = {
  id: number;
  thumb_url: string;
  display_url: string;
  download_url: string;
  filename: string | null;
  width: number | null;
  height: number | null;
};
