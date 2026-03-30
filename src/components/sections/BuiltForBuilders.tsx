"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import { ParallaxBackground } from "@/components/ParallaxBackground";

const fields = [
  { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: "Built For Builders" },
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "We partner with marketing directors and sales leaders who want *results*." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "Builders doing 300+ homes annually. Teams that need consistency across communities. Leaders who understand launch pressure, spec timelines, and sales alignment." },
  { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: "See who we serve" },
  { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: "/markets/role/directors" },
];

export function BuiltForBuilders() {
  return (
    <ParallaxBackground slotId="bg-built-for-builders" overlayOpacity={0.65} className="min-h-[80vh] bg-bg-dark text-text-light">
      <div className="flex min-h-[80vh] items-center py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <EditableContent slotId="section-built-for-builders" fields={fields}>
              {(v) => (
                <>
                  <Eyebrow dark>{v.eyebrow}</Eyebrow>
                  <h2 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
                  <p className="mt-5 text-text-muted" dangerouslySetInnerHTML={{ __html: v.body }} />
                  {v.ctaText && (
                    <Link
                      href={v.ctaUrl || "/"}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
                    >
                      {v.ctaText} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </>
              )}
            </EditableContent>
          </RevealOnScroll>
        </div>
      </div>
    </ParallaxBackground>
  );
}
