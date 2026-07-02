'use client';

import { useEffect, useRef, useState } from 'react';

// Inline ModelMatch trial wizard. Embeds the digDesk trial flow so ad traffic
// can start the trial without leaving the landing page. The wizard posts its
// height on every step change; we resize the iframe to match so there is no
// inner scrollbar.
const EMBED_SRC = 'https://desk.daviesimaging.com/trial/embed';
const EMBED_ORIGIN = 'https://desk.daviesimaging.com';

export default function MMTrialEmbed() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(640);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      // Only trust height messages from the digDesk origin.
      if (e.origin !== EMBED_ORIGIN) return;
      const data = e.data;
      if (data && data.type === 'dig-trial-embed-height' && data.height) {
        const h = Number(data.height);
        if (Number.isFinite(h) && h > 0) setHeight(h);
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
        width: '100%',
        border: 0,
        minHeight: 640,
        height,
        display: 'block',
      }}
    />
  );
}
