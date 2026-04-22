'use client';

import { Reveal, TRIAL_URL, IMG } from './MMPrimitives';

// ──────────────────────────────────────────────────────────────
// Final CTA — dark editorial section
// ──────────────────────────────────────────────────────────────
function MMFinalCTA() {
  return (
    <section
      style={{
        background: '#121212',
        color: '#F5F5F5',
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          width: 700,
          height: 700,
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(106,90,205,0.2), transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#857AE0',
              margin: '0 0 24px',
            }}
          >
            ModelMatch Virtual Staging
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#F5F5F5',
              fontSize: 'clamp(44px, 5.6vw, 80px)',
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              margin: '0 0 28px',
              textWrap: 'balance',
            }}
          >
            Your first five images.{' '}
            <strong style={{ fontWeight: 700 }}>Free.</strong>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              fontSize: 20,
              lineHeight: 1.5,
              color: 'rgba(245,245,245,0.78)',
              margin: '0 auto 44px',
              maxWidth: 620,
            }}
          >
            Send us one model home and one vacant spec.
            <br />
            We&apos;ll stage the first five photos for free.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href={TRIAL_URL}
            style={{
              background: '#6A5ACD',
              color: '#fff',
              textDecoration: 'none',
              padding: '22px 42px',
              borderRadius: 999,
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 14px 40px rgba(106,90,205,0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            Claim My Five Free Images
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
        <Reveal delay={0.4}>
          <p
            style={{
              margin: '22px 0 0',
              fontSize: 12,
              color: 'rgba(245,245,245,0.5)',
              letterSpacing: '0.04em',
            }}
          >
            Delivered in 24 hours. For homebuilders only.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Footer — page-local, minimal
// ──────────────────────────────────────────────────────────────
function MMFooter() {
  return (
    <footer
      style={{
        background: '#0E0E0E',
        color: 'rgba(245,245,245,0.5)',
        padding: '36px 40px 44px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG('dig-logo-light.png')}
        alt="Davies Imaging Group"
        style={{ height: 22, opacity: 0.7 }}
      />
      <p style={{ margin: 0, fontSize: 11, letterSpacing: '0.05em' }}>
        © 2026 Davies Imaging Group · Est. 2016 · ModelMatch is a service of
        DIG for homebuilder marketing teams.
      </p>
    </footer>
  );
}

export default function MMFooterCTA() {
  return (
    <>
      <MMFinalCTA />
      <MMFooter />
    </>
  );
}
