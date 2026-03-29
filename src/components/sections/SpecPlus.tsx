"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import { DynamicImage } from "@/components/DynamicImage";

const fields = [
  { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: "Spec+" },
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Your inventory needs to move. Spec+ delivers *everything*." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "Virtual staging, virtual video, and photography in one package built for standing inventory. Stop managing multiple vendors." },
  { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: "Order via FrameFlow" },
  { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: "/offerings/spec-plus" },
];

export function SpecPlus() {
  return (
    <section className="min-h-[70vh] bg-bg-light py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Image-dominant side */}
        <RevealOnScroll>
          <DynamicImage slotId="section-spec-plus-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-border-light to-accent-secondary/40" />
        </RevealOnScroll>

        {/* Copy side — no competing imagery */}
        <RevealOnScroll>
          <EditableContent slotId="section-spec-plus" fields={fields}>
            {(v) => (
              <>
                <Eyebrow>{v.eyebrow}</Eyebrow>
                <h2 dangerouslySetInnerHTML={{ __html: v.headline }} />
                <p className="mt-5 text-text-body" dangerouslySetInnerHTML={{ __html: v.body }} />
                {v.ctaText && (
                  <Link
                    href={v.ctaUrl || "/"}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
                  >
                    {v.ctaText} <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </>
            )}
          </EditableContent>
        </RevealOnScroll>
      </div>
    </section>
  );
}
