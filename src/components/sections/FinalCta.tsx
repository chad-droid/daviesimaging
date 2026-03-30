"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import { ParallaxBackground } from "@/components/ParallaxBackground";

const fields = [
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Let\u2019s build assets that move **homes**." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "If your content isn\u2019t driving momentum, it\u2019s time to rethink the strategy." },
  { key: "cta1Text", label: "CTA 1 Text", type: "text" as const, defaultValue: "Book a Strategy Call" },
  { key: "cta1Url", label: "CTA 1 URL", type: "url" as const, defaultValue: "/contact" },
  { key: "cta2Text", label: "CTA 2 Text", type: "text" as const, defaultValue: "Explore FrameFlow" },
  { key: "cta2Url", label: "CTA 2 URL", type: "url" as const, defaultValue: "/offerings/frameflow" },
];

export function FinalCta() {
  return (
    <ParallaxBackground slotId="bg-final-cta" overlayOpacity={0.7} className="min-h-[70vh] bg-bg-dark text-text-light">
      <div className="flex min-h-[70vh] items-center py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableContent slotId="section-final-cta" fields={fields}>
              {(v) => (
                <>
                  <Eyebrow dark>Ready?</Eyebrow>
                  <h2 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
                  <p className="mt-5 text-text-muted" dangerouslySetInnerHTML={{ __html: v.body }} />
                  <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {v.cta1Text && (
                      <Link
                        href={v.cta1Url || "/"}
                        className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:bg-accent-hover"
                      >
                        {v.cta1Text}
                      </Link>
                    )}
                    {v.cta2Text && (
                      <Link
                        href={v.cta2Url || "/"}
                        className="rounded-full border border-text-light/25 px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:border-text-light/50"
                      >
                        {v.cta2Text}
                      </Link>
                    )}
                  </div>
                </>
              )}
            </EditableContent>
          </RevealOnScroll>
        </div>
      </div>
    </ParallaxBackground>
  );
}
