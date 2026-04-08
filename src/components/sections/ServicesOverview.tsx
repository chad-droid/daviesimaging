"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

const services = [
  {
    tag: "Flagship",
    tagColor: "bg-accent text-white",
    name: "Premium Photography",
    headline: "Model homes done right.",
    description:
      "Full-service, award-winning photography for model homes and lifestyle shoots. 15 images, unlimited retouching, 7-day delivery. DIG's signature offering.",
    from: "$4,000",
    unit: "per home",
    includes: [
      "15 curated images",
      "7-day delivery",
      "Unlimited retouching",
      "Sky replacement & digital fence removal",
      "Matterport & video add-ons available",
    ],
    cta: "Explore Premium",
    href: "/services/premium",
    accent: "border-accent/30 bg-accent/3",
    badge: null,
  },
  {
    tag: "Volume",
    tagColor: "bg-bg-dark text-text-light",
    name: "Spec+ Bundle",
    headline: "Every spec home, covered.",
    description:
      "25 MLS-ready photos + 8 ModelMatch-staged images + 1 FrameFlow video. One price, 72-hour delivery. Built for standing inventory.",
    from: "$600",
    unit: "per home, all sizes",
    includes: [
      "25 MLS-ready listing images",
      "8 ModelMatch virtually staged images",
      "1 wide FrameFlow virtual video",
      "72-hour delivery after photography",
      "Blue tape & construction retouching",
    ],
    cta: "Order via digDesk",
    href: "/programs/spec-plus",
    accent: "border-bg-dark/20 bg-bg-dark/[0.03]",
    badge: "Best Value",
  },
  {
    tag: "Fast-turn",
    tagColor: "bg-green-600 text-white",
    name: "Listing Photography",
    headline: "Spec homes, MLS-ready in 24 hours.",
    description:
      "25 HDR listing photos for vacant spec and QMI homes. Fast-turn, professionally retouched, MLS-ready. Add Matterport, drone, or virtual staging.",
    from: "$400",
    unit: "under 3,000 sqft",
    includes: [
      "25 MLS-ready images",
      "24-hour delivery",
      "Sky replacement & retouching",
      "Construction blue tape removal",
      "Matterport & drone available as add-ons",
    ],
    cta: "Order via digDesk",
    href: "/programs/digdesk",
    accent: "border-green-200 bg-green-50/40",
    badge: null,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="bg-bg-light py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Services &amp; Pricing</Eyebrow>
          <h2>
            One platform. Every service your{" "}
            <strong>marketing team needs</strong>.
          </h2>
          <p className="mt-4 text-text-body">
            From flagship model home photography to 72-hour spec bundles, every
            DIG service is now orderable through digDesk — one portal, one team,
            consistent results.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`relative flex flex-col rounded-2xl border p-8 ${s.accent}`}
            >
              {/* Best value badge */}
              {s.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-bg-dark px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-text-light shadow">
                    {s.badge}
                  </span>
                </div>
              )}

              {/* Service tag */}
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${s.tagColor}`}
              >
                {s.tag}
              </span>

              {/* Name & headline */}
              <h3 className="mt-4 text-[1.25rem] font-semibold leading-tight text-text-dark">
                {s.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">{s.headline}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-body">
                {s.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className="text-4xl font-semibold tracking-tight text-text-dark"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.from}
                </span>
                <span className="text-xs text-text-muted">{s.unit}</span>
              </div>

              {/* Includes */}
              <ul className="mt-5 flex-1 space-y-2.5">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-body">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        d="M3 8l3 3.5 7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={s.href}
                className="mt-7 inline-flex items-center justify-center gap-1.5 rounded-full border border-current px-5 py-2.5 text-sm font-medium text-text-dark transition-all hover:bg-accent hover:border-accent hover:text-white"
              >
                {s.cta} <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional services footnote */}
        <p className="mt-10 text-center text-xs text-text-muted">
          Additional services available:{" "}
          <Link href="/services/matterport" className="underline decoration-dotted hover:text-accent">
            Matterport
          </Link>
          {" · "}
          <Link href="/services/video-production" className="underline decoration-dotted hover:text-accent">
            Video Production
          </Link>
          {" · "}
          Drone · Amenities · Sales Centers · Twilight —{" "}
          <Link href="/contact" className="underline decoration-dotted hover:text-accent">
            request a custom quote
          </Link>
        </p>
      </div>
    </section>
  );
}
