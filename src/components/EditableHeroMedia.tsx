"use client";

import { EditableContent } from "./EditableContent";
import { DynamicImage } from "./DynamicImage";

interface EditableHeroMediaProps {
  slotId: string;
  /** Optional separate slot ID for the image fallback. Defaults to `${slotId}-img`. */
  imageSlotId?: string;
}

const mediaFields = [
  {
    key: "videoUrl",
    label: "YouTube URL (leave blank to use image below)",
    type: "url" as const,
    defaultValue: "",
  },
];

function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/
  );
  return match ? match[1] : null;
}

/**
 * Hero media slot for inner pages.
 * — If a YouTube URL is set (via admin), renders an autoplaying, muted iframe at 16:9.
 * — If no video URL is set, falls back to a DynamicImage slot at 4:3 (assignable via admin overlay).
 * — When neither is set, shows a labeled placeholder.
 *
 * Safe to import from Server Component pages — all props are serializable strings.
 */
export function EditableHeroMedia({
  slotId,
  imageSlotId,
}: EditableHeroMediaProps) {
  const imgSlotId = imageSlotId ?? `${slotId}-img`;

  return (
    <EditableContent slotId={slotId} fields={mediaFields}>
      {(v) => {
        const ytId = v.videoUrl ? extractYoutubeId(v.videoUrl) : null;

        if (ytId) {
          return (
            <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl bg-bg-dark">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&modestbranding=1&playsinline=1`}
                className="pointer-events-none absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media"
                tabIndex={-1}
                title="Hero video"
              />
            </div>
          );
        }

        return (
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
            <DynamicImage
              slotId={imgSlotId}
              className="h-full w-full object-cover"
              fallbackClass="h-full w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
              <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
                Add video or image
              </span>
            </div>
          </div>
        );
      }}
    </EditableContent>
  );
}
