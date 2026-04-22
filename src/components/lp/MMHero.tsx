'use client';

import { useEffect, useState } from 'react';
import { Reveal, TRIAL_URL, IMG } from './MMPrimitives';
import MMSlider from './MMSlider';

// ──────────────────────────────────────────────────────────────
// Sticky header — fades in after scroll, CTA pill on right
// ──────────────────────────────────────────────────────────────
function MMHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '16px 40px',
        background: scrolled ? 'rgba(248,246,243,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(0,0,0,0.06)'
          : '1px solid transparent',
        transition: 'all .3s var(--ease-soft)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 20,
          fontWeight: 600,
          color: '#1C1C1C',
          letterSpacing: '-0.01em',
        }}
      >
        Model
        <strong style={{ color: '#6A5ACD', fontWeight: 700 }}>Match</strong>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginLeft: 14,
          }}
          className="mm-header-tagline"
        >
          BY DAVIES IMAGING GROUP
        </span>
      </div>
      <a
        href={TRIAL_URL}
        style={{
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          transform: scrolled ? 'translateY(0)' : 'translateY(-4px)',
          transition: 'all .3s var(--ease-soft)',
          background: '#6A5ACD',
          color: '#fff',
          textDecoration: 'none',
          padding: '12px 22px',
          borderRadius: 999,
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(106,90,205,0.25)',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Claim My Five Free Images
      </a>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────
// Hero — eyebrow + headline + CTA + slider + stat row
// ──────────────────────────────────────────────────────────────
function MMHero() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '140px 40px 80px',
        background: '#F8F6F3',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#6A5ACD',
              margin: '0 0 24px',
            }}
          >
            FOR BRAND-FOCUSED HOMEBUILDERS
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mm-hero-grid">
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#1C1C1C',
                fontSize: 'clamp(40px, 5.6vw, 80px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                margin: 0,
                textWrap: 'balance',
              }}
            >
              Virtual staging for Builders,{' '}
              <strong style={{ fontWeight: 700 }}>not realtors.</strong>
            </h1>
            <div className="mm-hero-cta">
              <a
                href={TRIAL_URL}
                style={{
                  background: '#6A5ACD',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '22px 38px',
                  borderRadius: 999,
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 12px 34px rgba(106,90,205,0.32)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  whiteSpace: 'nowrap',
                }}
              >
                Claim My Five Free Images
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: 20,
                  lineHeight: 1.45,
                  fontWeight: 400,
                  color: 'var(--text-body)',
                  margin: 0,
                  maxWidth: 420,
                  textAlign: 'center',
                }}
              >
                Takes 60 seconds to submit.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3} style={{ marginTop: 44 }}>
          <MMSlider
            before={IMG('shane-before.jpg')}
            after={IMG('shane-after.jpg')}
          />
        </Reveal>

        <Reveal delay={0.4}>
          <div
            style={{
              marginTop: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 40,
              flexWrap: 'wrap',
            }}
          >
            <a
              href={TRIAL_URL}
              style={{
                background: '#6A5ACD',
                color: '#fff',
                textDecoration: 'none',
                padding: '20px 38px',
                borderRadius: 999,
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(106,90,205,0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              Claim My Five Free Images
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M7 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 28,
                fontFamily: 'var(--font-heading)',
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    color: '#1C1C1C',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    fontSize: 32,
                  }}
                >
                  24 hr
                </p>
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  Next-day turnaround
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 32,
                    fontWeight: 600,
                    color: '#1C1C1C',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 400,
                      color: 'var(--text-muted)',
                      textDecoration: 'line-through',
                      textDecorationColor: 'rgba(0,0,0,0.45)',
                      fontSize: 24,
                    }}
                  >
                    $25
                  </span>
                  <span style={{ color: '#6A5ACD' }}>Free</span>
                </p>
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  First five images
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function MMHeroSection() {
  return (
    <>
      <MMHeader />
      <MMHero />
    </>
  );
}
