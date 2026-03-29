"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";

const fields = [
  { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: "Full Ecosystem" },
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Every shoot is built for downstream *velocity*." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "Website conversion, email campaigns, paid media, sales center storytelling, listing refreshes. Modern builder marketing requires velocity, not just visuals." },
  { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: "Explore our work" },
  { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: "/work" },
];

export function MarketingEcosystem() {
  return (
    <section className="flex min-h-[60vh] items-center bg-bg-light py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <EditableContent slotId="section-marketing-ecosystem" fields={fields}>
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
