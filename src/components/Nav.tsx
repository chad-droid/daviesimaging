"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-page" },
];

const builtForLinks = [
  { label: "Marketing Directors", href: "/built-for/marketing-directors" },
  { label: "Sales Leaders", href: "/built-for/sales-leaders" },
  { label: "Regional & National Builders", href: "/built-for/regional-builders" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [builtForOpen, setBuiltForOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Davies Imaging Group
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}

          {/* Built for dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setBuiltForOpen(true)}
            onMouseLeave={() => setBuiltForOpen(false)}
          >
            <button
              type="button"
              className="text-sm font-medium uppercase tracking-widest text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Built For
            </button>
            {builtForOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-zinc-200 bg-white py-2 shadow-lg">
                {builtForLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <Link
            href="/frameflow-sell-faster-challenge-0210"
            className="cta-button rounded-full bg-zinc-900 px-5 py-2.5 text-white transition-colors hover:bg-zinc-700"
          >
            Start FrameFlow
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-zinc-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium uppercase tracking-widest text-zinc-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-zinc-100 pt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                Built For
              </p>
              {builtForLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-1.5 text-sm text-zinc-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/frameflow-sell-faster-challenge-0210"
              onClick={() => setMobileOpen(false)}
              className="cta-button mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-center text-white"
            >
              Start FrameFlow
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
