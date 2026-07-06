'use client';

import { useEffect, useRef, useState } from 'react';

// Inline ModelMatch trial wizard. Embeds the digDesk trial flow so ad traffic
// can start the trial without leaving the landing page. Two-way postMessage
// contract with desk.daviesimaging.com/trial/embed:
//   parent <- { type: 'dig-trial-embed-height', height }     (resize the iframe)
//   parent <- { type: 'dig-trial-embed-converted', email? }  (a signup happened)
//   parent <- { type: 'trial_link_submitted' | 'trial_upload_fallback_opened'
//             | 'trial_submitted' | 'trial_email_only' }     (funnel steps)
const EMBED_SRC = 'https://desk.daviesimaging.com/trial/embed';
const EMBED_ORIGIN = 'https://desk.daviesimaging.com';

// LinkedIn conversion id from Campaign Manager (Analyze -> Conversion tracking).
// Stays null until the CM conversion is created; lintrk is skipped while null,
// so nothing fires against an undefined id. Swap in the number once Chad has it.
const LINKEDIN_CONVERSION_ID: number | null = null;

// The ad-tag globals installed in src/app/layout.tsx. Optional because a tag
// may be blocked by an ad blocker; every call below is null-guarded.
type TrackWindow = Window & {
  lintrk?: (action: string, data?: Record<string, unknown>) => void;
  fbq?: (action: string, event?: string, params?: Record<string, unknown>) => void;
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  clarity?: (action: string, ...args: unknown[]) => void;
};

// Granular funnel steps relayed by the link-first embed (brief v2.2 D2). Each
// fires an analytics event (GA4 + Clarity) once, so drop-off is measurable per
// step. The completed-signup steps additionally fire the ad-tag conversion,
// same as the legacy converted message.
const FUNNEL_EVENTS = [
  'trial_link_submitted',
  'trial_upload_fallback_opened',
  'trial_submitted',
  'trial_email_only',
] as const;
type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

// Which milestones count as a completed trial signup and fire the ad-tag
// conversion (once, guarded). A no-link email (trial_email_only) enrolls in
// nurture and is tracked as analytics, but is deliberately NOT counted as the
// paid conversion so LinkedIn keeps optimizing toward real link submits.
// Opening the legacy upload fallback is a step, not a conversion.
const CONVERSION_EVENTS: readonly FunnelEvent[] = ['trial_link_submitted', 'trial_submitted'];

export default function MMTrialEmbed() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(640);
  const converted = useRef(false);
  const seenSteps = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Fire the trial-signup conversion across every installed ad tag, exactly
    // once. Guarded so a repeated message can't double-count.
    function fireConversion() {
      if (converted.current) return;
      converted.current = true;
      const w = window as TrackWindow;
      try {
        if (LINKEDIN_CONVERSION_ID != null) {
          w.lintrk?.('track', { conversion_id: LINKEDIN_CONVERSION_ID });
        }
        w.fbq?.('track', 'Lead');
        w.gtag?.('event', 'generate_lead', { method: 'modelmatch_trial' });
      } catch {
        // A blocked tag shouldn't break the page.
      }
    }

    function onMessage(e: MessageEvent) {
      // Only trust messages from the digDesk origin.
      if (e.origin !== EMBED_ORIGIN) return;
      const data = e.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'dig-trial-embed-height' && data.height) {
        const h = Number(data.height);
        if (Number.isFinite(h) && h > 0) setHeight(h);
      } else if (data.type === 'dig-trial-embed-converted') {
        fireConversion();
      } else if (FUNNEL_EVENTS.includes(data.type as FunnelEvent)) {
        const step = data.type as FunnelEvent;
        if (!seenSteps.current.has(step)) {
          seenSteps.current.add(step);
          const w = window as TrackWindow;
          try {
            w.gtag?.('event', step, { method: 'modelmatch_trial' });
            w.clarity?.('event', step);
          } catch {
            // A blocked tag shouldn't break the page.
          }
        }
        if (CONVERSION_EVENTS.includes(step)) fireConversion();
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      src={EMBED_SRC}
      title="Start your free model home trial"
      scrolling="no"
      allow="clipboard-write"
      style={{
        // No min-height: a CSS minimum overrides the posted inline height and
        // leaves an empty void when the form is shorter than the fallback. The
        // `height` state (default 640 as a pre-load placeholder) is the single
        // source of truth once desk posts dig-trial-embed-height.
        width: '100%',
        border: 0,
        height,
        display: 'block',
      }}
    />
  );
}
