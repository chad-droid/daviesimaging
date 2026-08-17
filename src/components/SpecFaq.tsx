"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { specFaqs } from "@/lib/faq-data";


export function SpecFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border-light rounded-xl border border-border-light bg-bg-surface">
      {specFaqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-medium text-text-dark transition-colors hover:bg-bg-light"
              >
                <span>{item.q}</span>
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border-light transition-all ${
                    isOpen ? "bg-accent border-accent text-white" : "text-text-muted"
                  }`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    )}
                  </svg>
                </span>
              </button>
            </h3>
            {/*
              The answer stays mounted and collapses to height 0. It used to be
              conditionally rendered, which kept every answer out of the DOM and
              therefore out of Google, ChatGPT, and every other crawler. Animate
              the height instead of unmounting so the text ships in the HTML.
            */}
            <motion.div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-5 pt-1 text-sm leading-relaxed text-text-body">{item.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
