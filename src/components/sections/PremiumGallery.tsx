"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import { DynamicImage } from "@/components/DynamicImage";

const fields = [
  { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: "Premium Photography" },
  { key: "headline", label: "Headline", type: "text" as const, defaultValue: "Built for builders who demand the **best**." },
  { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: "Explore Premium" },
  { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: "/services/premium" },
];

const regions = [
  { name: "West", href: "/work?region=West" },
  { name: "Mountain", href: "/work?region=Mountain" },
  { name: "Central", href: "/work?region=Central" },
  { name: "East", href: "/work?region=East" },
];

export function PremiumGallery() {
  return (
    <section className="bg-bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <EditableContent slotId="section-premium-gallery" fields={fields}>
              {(v) => (
                <>
                  <Eyebrow>{v.eyebrow}</Eyebrow>
                  <h2 dangerouslySetInnerHTML={{ __html: v.headline }} />
                </>
              )}
            </EditableContent>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={100}>
          {/* 2x2 grid of region cards with swappable images */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {regions.map((region) => (
              <Link key={region.name} href={region.href} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <DynamicImage
                    slotId={`premium-region-${region.name.toLowerCase()}`}
                    className="transition-transform duration-500 group-hover:scale-105"
                    fallbackClass="bg-gradient-to-b from-border-light to-accent-secondary/30"
                    aspectRatio="16/9"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-sm font-semibold uppercase tracking-widest text-text-light">
                      {region.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-10 text-center">
            <EditableContent slotId="section-premium-gallery" fields={fields}>
              {(v) => (
                <>
                  {v.ctaText && (
                    <Link
                      href={v.ctaUrl || "/"}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
                    >
                      {v.ctaText} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </>
              )}
            </EditableContent>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
