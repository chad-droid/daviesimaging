'use client';

import { useState, type ReactElement } from 'react';
import { Reveal, IMG } from './MMPrimitives';
import MMSlider from './MMSlider';

// ──────────────────────────────────────────────────────────────
// Pane: How It Works
// ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps: { label: string; title: string; desc: string; icon: ReactElement }[] = [
    {
      label: 'Step One',
      title: 'Show us your model home.',
      desc: 'Send a full gallery of one finished model.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path
            d="M8 24L28 10L48 24V46H36V34H20V46H8V24Z"
            stroke="#6A5ACD"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M22 16L40 16"
            stroke="#6A5ACD"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="1 4"
          />
        </svg>
      ),
    },
    {
      label: 'Step Two',
      title: 'Upload your spec photos.',
      desc: 'Drag in photos of your empty spec home.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect x="8" y="14" width="40" height="32" rx="3" stroke="#6A5ACD" strokeWidth="1.8" />
          <path
            d="M28 36V22M22 28L28 22L34 28"
            stroke="#6A5ACD"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="20" r="1" fill="#6A5ACD" />
          <circle cx="18" cy="20" r="1" fill="#6A5ACD" />
        </svg>
      ),
    },
    {
      label: 'Step Three',
      title: 'Receive staged results.',
      desc: 'Five high-res images, delivered in 24 hours.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect x="8" y="12" width="40" height="28" rx="2" stroke="#6A5ACD" strokeWidth="1.8" />
          <path
            d="M8 33L20 23L30 32L38 26L48 35"
            stroke="#6A5ACD"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="38" cy="20" r="2.5" stroke="#6A5ACD" strokeWidth="1.8" />
          <path
            d="M38 44L38 50M32 47L44 47"
            stroke="#6A5ACD"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

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
            margin: '0 0 56px',
            maxWidth: 720,
            textWrap: 'balance',
          }}
        >
          Three steps. <strong style={{ fontWeight: 700 }}>Sixty seconds.</strong>
        </h2>
      </Reveal>
      <div className="mm-steps-grid">
        {steps.map((s, i) => (
          <Reveal key={i} delay={0.15 + i * 0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 999,
                  background: 'rgba(106,90,205,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 6,
                }}
              >
                {s.icon}
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#6A5ACD',
                }}
              >
                {s.label}
              </p>
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  fontSize: 24,
                  lineHeight: 1.2,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  color: '#1C1C1C',
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: 'var(--text-body)',
                  maxWidth: 340,
                }}
              >
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Pane: More Examples — additional before/after pairs
// ──────────────────────────────────────────────────────────────
function MoreExamples() {
  const pairs = [
    {
      before: IMG('vacant-great-room.jpg'),
      after: IMG('result-1-great-room.jpg'),
      caption: 'Living Room | Beazer Homes, Houston',
    },
    {
      before: IMG('office-before.jpg'),
      after: IMG('office-after.jpg'),
      caption: 'Bonus Room | Grand Homes, Dallas',
    },
  ];

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
            margin: '0 0 48px',
            maxWidth: 760,
            textWrap: 'balance',
          }}
        >
          Every image crafted from{' '}
          <strong style={{ fontWeight: 700 }}>your own model homes.</strong>
        </h2>
      </Reveal>
      <div className="mm-examples-grid">
        {pairs.map((p, i) => (
          <Reveal key={i} delay={0.15 + i * 0.08}>
            <MMSlider before={p.before} after={p.after} />
            <p
              style={{
                margin: '16px 4px 0',
                fontSize: 12,
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
              }}
            >
              {p.caption}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Pane: FAQs — accordion
// ──────────────────────────────────────────────────────────────
function FAQs() {
  const [open, setOpen] = useState(0);
  const faqs = [
    {
      q: "What if I'm not a homebuilder?",
      a: "ModelMatch was designed for builders and developers that have existing model home images. Without that base to work from, ModelMatch can't work properly. If you aren't sure if you qualify, message us at support@daviesimaging.com.",
    },
    {
      q: 'What exactly do I send you?',
      a: 'Photos of one of your model homes (so we can match your furniture), plus photos of the empty spec home you want staged. Existing listing photos work. No new shoot required. Upload through our portal after you click.',
    },
    {
      q: "What's the turnaround?",
      a: "24 hours from upload on business days. Submit on Friday, you'll have the staged images Monday. The only thing holding up faster delivery is our designers reviewing every frame by hand.",
    },
    {
      q: 'What do I get back?',
      a: 'Five fully-staged photos, delivered as high-resolution files licensed for MLS, paid ads, email, and web.',
    },
    {
      q: 'What happens after the trial?',
      a: 'After the trial, staging is $25 per image. No contract, no monthly minimum, cancel any time.',
    },
    {
      q: 'Will the staging actually match my brand?',
      a: "That's the whole point. We pull furniture, finishes, and styling from your actual model home catalog, not a generic stock library. The staged spec home looks like the model, because it is the model.",
    },
  ];

  return (
    <div style={{ maxWidth: 920 }}>
      <Reveal delay={0.1}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            color: '#1C1C1C',
            fontSize: 'clamp(32px, 4vw, 56px)',
            lineHeight: 1.08,
            fontWeight: 500,
            letterSpacing: '-0.015em',
            margin: '0 0 48px',
            textWrap: 'balance',
          }}
        >
          Questions <strong style={{ fontWeight: 700 }}>worth asking.</strong>
        </h2>
      </Reveal>
      <div>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={0.1 + i * 0.04}>
            <div
              style={{
                borderTop: '1px solid rgba(0,0,0,0.1)',
                borderBottom:
                  i === faqs.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '28px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  gap: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 24,
                    fontWeight: 500,
                    color: '#1C1C1C',
                    lineHeight: 1.3,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {f.q}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    border: '1px solid rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform .25s var(--ease-soft)',
                    background: open === i ? '#1C1C1C' : 'transparent',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke={open === i ? '#fff' : '#1C1C1C'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 400 : 0,
                  overflow: 'hidden',
                  transition: 'max-height .35s var(--ease-soft)',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    padding: '0 64px 28px 8px',
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: 'var(--text-body)',
                    maxWidth: 720,
                  }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Tabbed section — How It Works / More Examples / FAQs
// ──────────────────────────────────────────────────────────────
export default function MMTabbed() {
  const tabs = [
    { id: 'how', label: 'How It Works', Pane: HowItWorks },
    { id: 'examples', label: 'More Examples', Pane: MoreExamples },
    { id: 'faqs', label: 'FAQs', Pane: FAQs },
  ];
  const [active, setActive] = useState('how');
  const ActivePane = tabs.find((t) => t.id === active)!.Pane;

  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: '100px 40px',
        borderTop: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 64,
              flexWrap: 'wrap',
            }}
          >
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  style={{
                    background: isActive ? '#1C1C1C' : 'transparent',
                    color: isActive ? '#fff' : '#1C1C1C',
                    border:
                      '1px solid ' +
                      (isActive ? '#1C1C1C' : 'rgba(0,0,0,0.15)'),
                    padding: '14px 26px',
                    borderRadius: 999,
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all .25s var(--ease-soft)',
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>
        <div key={active}>
          <ActivePane />
        </div>
      </div>
    </section>
  );
}
