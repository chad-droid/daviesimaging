"use client";

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export function RevealOnScroll({
  children,
  className = "",
  stagger = 120,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  // "below": waiting under the viewport. "in": on screen. "above": scrolled past.
  // The reveal runs both ways, so text eases in as it arrives and eases back
  // out as it leaves, in whichever direction the page is moving.
  const [phase, setPhase] = useState<"below" | "in" | "above">("below");
  const visible = phase === "in";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPhase("in");
        else setPhase(entry.boundingClientRect.top < 0 ? "above" : "below");
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={isValidElement(child) ? (child.key ?? i) : i}
          className="transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : phase === "above" ? "translateY(-20px)" : "translateY(20px)",
            transitionDelay: visible ? `${i * stagger}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
