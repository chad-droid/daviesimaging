"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 48,
    suffix: " hrs",
    prefix: "",
    label: "Spec+ Delivery",
    sublabel: "Shoot to published assets",
  },
  {
    value: 14,
    suffix: " days",
    prefix: "",
    label: "Faster to Sold",
    sublabel: "Avg. DOM reduction with DIG assets",
  },
  {
    value: 600,
    suffix: "",
    prefix: "$",
    label: "Complete Package",
    sublabel: "Photography, staging, and video",
  },
];

function AnimatedCounter({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-bg-dark py-20">
      <p className="mb-14 text-center text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
        By the Numbers
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-white/8 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center px-8 py-8 text-center sm:py-0 first:pt-0 last:pb-0 sm:first:pt-0 sm:last:pb-0"
          >
            {/* Large editorial numeral */}
            <p
              className="text-[4.5rem] font-semibold leading-none tracking-tight text-text-light lg:text-[5.5rem] 2xl:text-[6.5rem]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </p>

            {/* Accent rule */}
            <div className="mt-5 h-px w-12 bg-accent" />

            {/* Label */}
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-text-light">
              {stat.label}
            </p>

            {/* Descriptor */}
            <p className="mt-1.5 text-xs leading-snug text-text-muted">
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
