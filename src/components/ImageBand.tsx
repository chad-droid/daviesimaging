import { DynamicImage } from "@/components/DynamicImage";

interface ImageBandProps {
  slotId: string;
  /** Local image shown until one is assigned in admin. Omit to keep the band hidden until then. */
  defaultSrc?: string;
  alt?: string;
  /** Sits on the dark background, directly under a dark hero. */
  dark?: boolean;
  aspectRatio?: string;
}

/**
 * One wide image between two sections. With no image assigned and no default,
 * visitors see nothing at all: the whole band collapses. Admins see the empty
 * slot so they can fill it.
 */
export function ImageBand({ slotId, defaultSrc, alt, dark = false, aspectRatio = "21/9" }: ImageBandProps) {
  return (
    <section
      className={`${dark ? "bg-bg-dark pb-24" : "pb-24"} [&:not(:has([data-slot]))]:hidden`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <DynamicImage
          slotId={slotId}
          defaultSrc={defaultSrc}
          defaultAlt={alt}
          hideWhenEmpty
          aspectRatio={aspectRatio}
          className={`rounded-2xl ${dark ? "ring-1 ring-white/10" : ""}`}
        />
      </div>
    </section>
  );
}
