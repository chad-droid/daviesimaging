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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
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
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: visible ? `${i * stagger}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
