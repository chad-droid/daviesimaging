"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EditableContent } from "@/components/EditableContent";

const fields = [
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Let\u2019s build assets that move *homes*." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "If your content isn\u2019t driving momentum, it\u2019s time to rethink the strategy." },
  { key: "cta1Text", label: "CTA 1 Text", type: "text" as const, defaultValue: "Book a Strategy Call" },
  { key: "cta1Url", label: "CTA 1 URL", type: "url" as const, defaultValue: "/contact" },
  { key: "cta2Text", label: "CTA 2 Text", type: "text" as const, defaultValue: "Explore FrameFlow" },
  { key: "cta2Url", label: "CTA 2 URL", type: "url" as const, defaultValue: "/offerings/frameflow" },
];

export function FinalCta() {
  return (
    <section className="flex min-h-[60vh] items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <EditableContent slotId="section-final-cta" fields={fields}>
            {(v) => (
              <>
                <h2 dangerouslySetInnerHTML={{ __html: v.headline.replace(/\*([^*]+)\*/g, "<strong>$1</strong>") }} />
                <p className="mt-5 text-text-body">{v.body}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  {v.cta1Text && (
                    <Link
                      href={v.cta1Url || "/"}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
                    >
                      {v.cta1Text} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                  {v.cta2Text && (
                    <Link
                      href={v.cta2Url || "/"}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
                    >
                      {v.cta2Text} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </>
            )}
          </EditableContent>
        </RevealOnScroll>
      </div>
    </section>
  );
}
