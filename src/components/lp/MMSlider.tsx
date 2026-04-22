'use client';

import { useEffect, useRef, useState } from 'react';

// ──────────────────────────────────────────────────────────────
// BeforeAfter slider — full-bleed 16:9, large handle
// Ported 1:1 from desktop.jsx `DesktopSlider`.
// ──────────────────────────────────────────────────────────────
export default function MMSlider({
  before,
  after,
  label = 'After · ModelMatch',
}: {
  before: string;
  after: string;
  label?: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const update = (x: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };

  useEffect(() => {
    if (!dragging) return;
    const m = (e: MouseEvent | TouchEvent) => {
      const x =
        'touches' in e && e.touches.length
          ? e.touches[0].clientX
          : (e as MouseEvent).clientX;
      update(x);
    };
    const u = () => setDragging(false);
    window.addEventListener('mousemove', m as EventListener);
    window.addEventListener('mouseup', u);
    window.addEventListener('touchmove', m as EventListener, { passive: true });
    window.addEventListener('touchend', u);
    return () => {
      window.removeEventListener('mousemove', m as EventListener);
      window.removeEventListener('mouseup', u);
      window.removeEventListener('touchmove', m as EventListener);
      window.removeEventListener('touchend', u);
    };
  }, [dragging]);

  return (
    <div
      ref={wrapRef}
      onMouseDown={(e) => {
        setDragging(true);
        update(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        update(e.touches[0].clientX);
      }}
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0,0,0,0.18), 0 10px 24px rgba(0,0,0,0.08)',
        aspectRatio: '16 / 9',
        background: '#eee',
        cursor: 'ew-resize',
        userSelect: 'none',
        touchAction: 'pan-y',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt="After ModelMatch staging"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: dragging ? 'none' : 'clip-path .15s var(--ease-soft)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Before staging"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* labels */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          background: 'rgba(18,18,18,0.85)',
          backdropFilter: 'blur(8px)',
          padding: '8px 14px',
          borderRadius: 999,
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#fff',
          opacity: pos > 15 ? 1 : 0,
          transition: 'opacity .2s',
        }}
      >
        Before
      </div>
      <div
        style={{
          position: 'absolute',
          top: 18,
          right: 18,
          background: 'rgba(106,90,205,0.95)',
          padding: '8px 14px',
          borderRadius: 999,
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#fff',
          opacity: pos < 85 ? 1 : 0,
          transition: 'opacity .2s',
        }}
      >
        {label}
      </div>

      {/* divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: '#fff',
          boxShadow:
            '0 0 0 1px rgba(0,0,0,0.15), 0 2px 14px rgba(0,0,0,0.3)',
          transform: 'translateX(-1px)',
          transition: dragging ? 'none' : 'left .15s var(--ease-soft)',
          pointerEvents: 'none',
        }}
      />
      {/* handle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: `${pos}%`,
          transform: 'translate(-50%, -50%)',
          width: 58,
          height: 58,
          borderRadius: 999,
          background: '#fff',
          boxShadow:
            '0 6px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: dragging ? 'none' : 'left .15s var(--ease-soft)',
          pointerEvents: 'none',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
          <path
            d="M7 5l-4 5 4 5M13 5l4 5-4 5"
            stroke="#1C1C1C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* drag hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(18,18,18,0.8)',
          backdropFilter: 'blur(6px)',
          padding: '8px 14px',
          borderRadius: 999,
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#fff',
          opacity: dragging || pos !== 50 ? 0 : 0.95,
          transition: 'opacity .25s',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        ← Drag to compare →
      </div>
    </div>
  );
}
