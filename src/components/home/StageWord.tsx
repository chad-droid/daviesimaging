"use client";

import { motion } from "framer-motion";

/**
 * The giant stage word ("Lead.", "Launch.", "List."). Each letter rises out of
 * a mask in sequence as the heading scrolls into view, then the accent period
 * drops in last. Runs both ways: the word sinks back when it leaves the screen
 * and rises again when it returns. Reduced-motion visitors get the word, still.
 */
export function StageWord({ word, dark }: { word: string; dark?: boolean }) {
  const letters = word.split("");
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <motion.p
      aria-label={`${word}.`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: false, amount: 0.5 }}
      transition={{ staggerChildren: 0.06 }}
      className={`mt-3 flex overflow-hidden pb-[0.08em] text-[5.5rem] leading-[0.9] tracking-tight motion-reduce:!transform-none lg:text-[12rem] ${
        dark ? "text-text-light" : "text-text-dark"
      }`}
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{ hidden: { y: "110%", opacity: 0 }, shown: { y: "0%", opacity: 1 } }}
          transition={{ duration: 0.9, ease }}
        >
          {ch}
        </motion.span>
      ))}
      <motion.span
        aria-hidden
        className="inline-block text-accent"
        variants={{ hidden: { y: "-60%", opacity: 0 }, shown: { y: "0%", opacity: 1 } }}
        transition={{ duration: 0.6, ease, delay: 0.25 }}
      >
        .
      </motion.span>
    </motion.p>
  );
}

/** Fades and lifts its children in after the word has landed. */
export function StageBody({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
