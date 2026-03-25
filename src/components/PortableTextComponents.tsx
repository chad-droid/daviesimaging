import Image from "next/image";
import type { PortableTextReactComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";

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
            <figcaption className="mt-2 text-center text-sm text-text-body/60">
              {value.caption}
            </figcaption>
          )}
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
