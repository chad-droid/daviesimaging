"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";

const fields = [
  { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: "FrameFlow Challenge" },
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Before you overhaul everything, *test* it." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "The FrameFlow Challenge lets you see how strategic visual sequencing increases engagement and drives faster buyer decisions. Risk-free, built for builders." },
  { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: "Start the challenge" },
  { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: "/campaigns/frameflow-sell-faster" },
];

export function TryFrameFlow() {
  return (
    <section className="flex min-h-[60vh] items-center bg-bg-dark py-24 text-text-light">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <EditableContent slotId="section-try-frameflow" fields={fields}>
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
    </section>
  );
}
