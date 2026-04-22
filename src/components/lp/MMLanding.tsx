'use client';

import MMHeroSection from './MMHero';
import MMTabbed from './MMTabbed';
import MMFooterCTA from './MMFooterCTA';

// ──────────────────────────────────────────────────────────────
// Responsive rules — scoped to .mm-landing
// Matches how desktop.jsx used `minmax()` + `clamp()` and keeps
// the mobile layout working on LinkedIn-ad viewports.
// ──────────────────────────────────────────────────────────────
const responsiveCSS = `
.mm-landing .mm-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 1fr);
  gap: 64px;
  align-items: center;
}
.mm-landing .mm-hero-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.mm-landing .mm-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}
.mm-landing .mm-examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
  gap: 32px;
}

/* Tablet */
@media (max-width: 900px) {
  .mm-landing .mm-hero-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .mm-landing .mm-hero-cta {
    align-items: flex-start;
  }
  .mm-landing .mm-steps-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .mm-landing .mm-examples-grid {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .mm-landing section {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .mm-landing header {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .mm-landing .mm-header-tagline {
    display: none;
  }
  .mm-landing footer {
    padding-left: 20px !important;
    padding-right: 20px !important;
    flex-direction: column;
    align-items: flex-start !important;
    text-align: left;
  }
}
`;

export default function MMLanding() {
  return (
    <div className="mm-landing" data-screen-label="ModelMatch Trial Info">
      <style dangerouslySetInnerHTML={{ __html: responsiveCSS }} />
      <MMHeroSection />
      <MMTabbed />
      <MMFooterCTA />
    </div>
  );
}
