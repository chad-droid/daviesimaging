"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "What exactly is included in Spec+?",
    a: "Every Spec+ order includes 25 HDR listing photos, 8 ModelMatch virtually staged images, and 1 wide-format virtual video. Photography is handled on-site by a DIG photographer. Virtual staging and video are produced digitally through digDesk. All three are delivered together within 72 hours of the shoot.",
  },
  {
    q: "How is Spec+ different from just ordering listing photos?",
    a: "Listing photography gets you photos. Spec+ gets you a complete marketing asset package. The ModelMatch staging uses your builder's own model home photography as the design reference, so every staged image looks on-brand, not generic. The virtual video is built from your photos by our production team. One order, three outputs.",
  },
  {
    q: "What is ModelMatch virtual staging?",
    a: "ModelMatch is DIG's reference-based virtual staging method. Instead of dropping generic furniture into empty rooms, our team uses your builder's approved model home photography as the design reference. The result looks like your community's style, not a furniture catalog.",
  },
  {
    q: "Do I need to be present at the shoot?",
    a: "No. Provide the address, homesite details, and any access instructions when you place your order. DIG coordinates with your sales team directly and handles the full shoot without requiring you on-site.",
  },
  {
    q: "What if I already have photos and just need staging or video?",
    a: "You can order standalone virtual staging or virtual video through digDesk. Upload your existing listing photos and our team handles the rest. Spec+ includes the photography, but digDesk digital services are available without a new shoot.",
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
    a: "DIG operates in 28 U.S. markets across four regions: West, Mountain, Central, and East. Offices are in Sacramento and Dallas, with production support in Guadalajara. If you are unsure whether we cover your market, reach out and we will confirm.",
  },
];

export function SpecFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border-light rounded-xl border border-border-light bg-bg-surface">
      {faqs.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-bg-light"
          >
            <span className="text-sm font-medium text-text-dark">{item.q}</span>
            <span
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border-light transition-all ${
                open === i ? "bg-accent border-accent text-white" : "text-text-muted"
              }`}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                {open === i ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                )}
              </svg>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 pt-1 text-sm leading-relaxed text-text-body">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
