'use client';

import { Reveal } from './MMPrimitives';
import { CASE_STUDIES, type CaseStudy } from '@/app/modelmatch-datalibrary/caseStudies';

// The proof pane for the "The Proof" tab on the ModelMatch landing clone.
// Static (non-clickable) win case studies — speaks to the power of the test
// cases without competing with the single CTA. Staged photos live in
// /public/mm-library (the Win Library asset set).

const LIB_IMG = (f: string) => `/mm-library/${f}`;
const WINS = CASE_STUDIES.slice(0, 8);

function statusLabel(c: CaseStudy) {
  return c.closed ? 'Sold' : 'Under contract';
}
function contextLine(c: CaseStudy) {
  return c.story === 'rescue' ? `After ${c.unstaged} days on the market` : 'Brand-new listing';
}
function afterText(c: CaseStudy) {
  return c.afterApprox ? `~${c.after}` : `${c.after}`;
}

export default function MMWinsPane() {
  return (
    <div>
      <Reveal delay={0.1}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            color: '#1C1C1C',
            fontSize: 'clamp(32px, 4vw, 56px)',
            lineHeight: 1.08,
            fontWeight: 500,
            letterSpacing: '-0.015em',
            margin: '0 0 16px',
            maxWidth: 820,
            textWrap: 'balance',
          }}
        >
          The proof is in <strong style={{ fontWeight: 700 }}>the timelines.</strong>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p
          style={{
            margin: '0 0 48px',
            maxWidth: 640,
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-body)',
          }}
        >
          Every home below found a buyer after ModelMatch entered its marketing. From a brand-new
          listing under contract in 3 days, to a home unstuck after 483 days on the market.
        </p>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {WINS.map((c, i) => (
          <Reveal key={c.slug} delay={0.15 + Math.min(i, 5) * 0.07}>
            <div
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 16,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LIB_IMG(c.images[0])}
                alt={`${c.addr} staged by ModelMatch`}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  {statusLabel(c)} · after ModelMatch
                </p>
                <p style={{ margin: '8px 0 0', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 48,
                      fontWeight: 600,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      color: '#6A5ACD',
                    }}
                  >
                    {afterText(c)}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 20,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                    }}
                  >
                    days
                  </span>
                </p>
                <p
                  style={{
                    margin: '10px 0 0',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--text-muted)',
                  }}
                >
                  {contextLine(c)}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 18 }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-heading)',
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: '#1C1C1C',
                      lineHeight: 1.25,
                    }}
                  >
                    {c.addr}
                  </p>
                  <p
                    style={{
                      margin: '2px 0 0',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {c.city}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
