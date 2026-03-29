"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";

const fields = [
  { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: "Virtual Staging + Virtual Video" },
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Already have photos? We can work with *that*." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "DIG\u2019s virtual staging and virtual video services are available without photography. No shoot required, fast turnaround, assets ready to deploy." },
  { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: "Get started in FrameFlow" },
  { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: "/offerings/frameflow" },
];

export function VirtualServices() {
  return (
    <section className="min-h-[70vh] bg-bg-surface py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Copy side */}
        <RevealOnScroll>
          <EditableContent slotId="section-virtual-services" fields={fields}>
            {(v) => (
              <>
                <Eyebrow>{v.eyebrow}</Eyebrow>
                <h2 dangerouslySetInnerHTML={{ __html: v.headline.replace(/\*([^*]+)\*/g, "<strong>$1</strong>") }} />
                <p className="mt-5 text-text-body">{v.body}</p>
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

        {/* Image-dominant side */}
        <RevealOnScroll>
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-border-light to-accent-secondary/40" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
