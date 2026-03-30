"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface DropdownMenu {
  label: string;
  items: { label: string; href: string }[];
}

const dropdowns: DropdownMenu[] = [
  {
    label: "Results",
    items: [
      { label: "Model Homes", href: "/work/model-homes" },
      { label: "Amenities and Clubhouses", href: "/work/amenities" },
      { label: "Spec Homes", href: "/work/spec-homes" },
      { label: "Lifestyle Productions", href: "/work/lifestyle" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Premium Photography", href: "/services/premium" },
      { label: "Listing Photography", href: "/services/listing" },
      { label: "Video Production", href: "/services/video-production" },
      { label: "Virtual Staging", href: "/services/virtual-staging" },
      { label: "Virtual Video", href: "/services/virtual-video" },
      { label: "Matterport", href: "/services/matterport" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Who We Help", href: "/markets/role" },
      { label: "What We Do", href: "/services" },
      { label: "Where We Serve", href: "/markets/region" },
      { label: "Our History", href: "/about" },
    ],
  },
];

const standaloneLinks = [
  { label: "FrameFlow", href: "/offerings/frameflow" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function DesktopDropdown({ menu, transparent }: { menu: DropdownMenu; transparent?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors hover:text-accent ${
          transparent ? "text-white" : "text-text-body"
        }`}
      >
        {menu.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full w-52 rounded-lg border border-border-light bg-bg-surface py-2 pt-4 shadow-lg before:absolute before:-top-4 before:left-0 before:h-4 before:w-full">
          {menu.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-text-body transition-colors hover:bg-bg-light hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({
  menu,
  onNavigate,
}: {
  menu: DropdownMenu;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-light pb-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-medium uppercase tracking-widest text-text-body"
      >
        {menu.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-1 pl-4">
          {menu.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="py-1.5 text-sm text-text-body transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border-light bg-bg-surface/95 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={transparent ? "/dig-logo-light.png" : "/dig-logo-dark.png"}
            alt="Davies Imaging Group"
            width={120}
            height={73}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          {dropdowns.map((menu) => (
            <DesktopDropdown key={menu.label} menu={menu} transparent={transparent} />
          ))}

          {standaloneLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium tracking-wide transition-colors hover:text-accent ${
                transparent ? "text-white" : "text-text-body"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTAs */}
          <a
            href="https://app.daviesimaging.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
              transparent
                ? "border border-white/40 text-white hover:border-white/70"
                : "border border-border-light text-text-body hover:border-accent"
            }`}
          >
            Client Login
          </a>
          <Link
            href="/campaigns/frameflow-sell-faster"
            className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold tracking-wide text-text-light transition-colors hover:bg-accent-hover"
          >
            Fix My Listings
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={`h-6 w-6 ${transparent ? "text-white" : "text-text-body"}`}
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
        <div className="border-t border-border-light bg-bg-surface px-6 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {dropdowns.map((menu) => (
              <MobileDropdown
                key={menu.label}
                menu={menu}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}

            {standaloneLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium uppercase tracking-widest text-text-body"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://app.daviesimaging.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full border border-border-light px-4 py-2 text-center text-[12px] font-semibold text-text-body"
            >
              Client Login
            </a>
            <Link
              href="/campaigns/frameflow-sell-faster"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-accent px-4 py-2 text-center text-[12px] font-semibold text-text-light"
            >
              Fix My Listings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
