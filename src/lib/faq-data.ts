// Spec+ FAQ content.
//
// Deliberately NOT inside SpecFaq.tsx. That file is a Client Component, and a
// Server Component importing a plain value across the "use client" boundary
// receives a client reference proxy rather than the array, which broke the
// FAQPage schema build. Shared data lives in its own module so both sides get
// the real value.
export interface FaqItem {
  q: string;
  a: string;
}

export const specFaqs: FaqItem[] = [
  {
    q: "What exactly is included in Spec+?",
    a: "Every Spec+ order includes 25 HDR listing photos, 8 ModelMatch virtually staged images, and 1 wide-format FrameFlow video. Photography is handled on-site by a DIG photographer. Virtual staging and video are produced digitally through digDesk. All three are delivered together within 72 hours of the shoot.",
  },
  {
    q: "How is Spec+ different from just ordering listing photos?",
    a: "Listing photography gets you photos. Spec+ adds ModelMatch staging and a FrameFlow video. The ModelMatch staging uses your builder's own model home photography as the design reference, so every staged image looks on-brand, not generic. The virtual video is built from your photos by our production team. One order, three outputs.",
  },
  {
    q: "What is ModelMatch virtual staging?",
    a: "ModelMatch is virtual staging built from the furniture and decor in your own model homes. We use your approved model home photography as the design reference, so a spec in the listing looks like it belongs in the same community as the model.",
  },
  {
    q: "Do I need to be present at the shoot?",
    a: "No. Provide the address, homesite details, and any access instructions when you place your order. DIG coordinates with your sales team directly and handles the full shoot without requiring you on-site.",
  },
  {
    q: "What if I already have photos and just need staging or video?",
    a: "You can order ModelMatch staging or FrameFlow video by themselves through digDesk. Upload your existing listing photos and our team handles the rest. Spec+ includes the photography, but digDesk digital services are available without a new shoot.",
  },
  {
    q: "How do I receive my finished assets?",
    a: "Finished photos, staged images, and video are delivered directly to your digDesk portal. You will receive an email notification when your order is ready. From there you can preview, download individual files, or use Download All. Each order also includes a shareable delivery link with no login required.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes. Once your order is delivered, a revision request option is available in digDesk. Describe what needs to change, submit the request, and our team will review and return updated assets.",
  },
  {
    q: "How many markets does DIG cover?",
    a: "DIG operates in 26 U.S. markets across four regions: West, Mountain, Central, and East. Offices are in Sacramento and Dallas, with production support in Guadalajara. If you are unsure whether we cover your market, reach out and we will confirm.",
  },
];
