"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import Link from "next/link";

const fields = [
  { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: "The DIG Difference" },
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Stop creating content. Start building assets." },
  { key: "body", label: "Body", type: "textarea" as const, defaultValue: "Most builder marketing teams invest in photography that lives in one place. DIG builds assets designed for website conversion, paid media, sales centers, email, and listing refreshes." },
  { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: "See how it works" },
  { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: "/offerings/frameflow" },
];

export function AssetVsContent() {
  return (
    <section className="flex min-h-[70vh] items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <EditableContent slotId="section-asset-vs-content" fields={fields}>
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
      </div>
    </section>
  );
}
