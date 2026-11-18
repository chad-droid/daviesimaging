import Image from "next/image";
import type { PortableTextReactComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import { youTubeId } from "@/sanity/youtube";
import { BeforeAfterSlider } from "@/components/blog/BeforeAfterSlider";
import { LiteYouTube } from "@/components/blog/LiteYouTube";

// Sanity image ids carry the original size: image-<hash>-2000x1323-jpg.
// Reading it from the ref reserves the aspect ratio without a metadata query.
function refDimensions(ref?: string): { width: number; height: number } | null {
  const m = ref?.match(/-(\d+)x(\d+)-[a-z]+$/);
  return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
}

const caption = (text?: string) =>
  text ? (
    <figcaption className="mt-2 text-center text-sm text-text-muted">{text}</figcaption>
  ) : null;

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    beforeAfter: ({ value }) => {
      if (!value?.before?.asset || !value?.after?.asset) return null;
      const dims =
        refDimensions(value.after.asset._ref) ??
        refDimensions(value.before.asset._ref) ?? { width: 3, height: 2 };
      const src = (img: unknown) => urlFor(img).width(2000).fit("max").auto("format").url();
      return (
        <figure className="my-8">
          <BeforeAfterSlider
            beforeSrc={src(value.before)}
            afterSrc={src(value.after)}
            width={dims.width}
            height={dims.height}
            beforeLabel={value.beforeLabel || "Empty"}
            afterLabel={value.afterLabel || "Staged with ModelMatch"}
            alt={value.alt || value.caption || ""}
          />
          {caption(value.caption)}
        </figure>
      );
    },
    youtube: ({ value }) => {
      const id = value?.url ? youTubeId(value.url) : null;
      if (!id) return null;
      return (
        <figure className="my-8">
          <LiteYouTube id={id} title={value.caption || "Video"} start={value.start} />
          {caption(value.caption)}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-6 text-text-body marker:text-accent">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 text-text-body marker:text-accent">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  block: {
    h2: ({ children }) => <h2 className="mb-4 mt-10">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-8">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-2 mt-6">{children}</h4>,
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-text-body">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-accent pl-6 italic text-text-body/80">
        {children}
      </blockquote>
    ),
  },
};
