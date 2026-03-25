"use client";

import { useState } from "react";
import Link from "next/link";

interface DropdownMenu {
  label: string;
  items: { label: string; href: string }[];
}

const dropdowns: DropdownMenu[] = [
  {
    label: "Work",
    items: [
      { label: "Model Homes", href: "/work/model-homes" },
      { label: "Amenities", href: "/work/amenities" },
      { label: "Spec Homes", href: "/work/spec-homes" },
      { label: "Lifestyle", href: "/work/lifestyle" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "Premium Photo", href: "/services/premium" },
      { label: "Listing Photo", href: "/services/listing" },
      { label: "Video Production", href: "/services/video-production" },
      { label: "Virtual Staging", href: "/services/virtual-staging" },
      { label: "Virtual Video", href: "/services/virtual-video" },
      { label: "Matterport", href: "/services/matterport" },
    ],
  },
  {
    label: "Offerings",
    items: [
      { label: "FrameFlow", href: "/offerings/frameflow" },
      { label: "Spec+", href: "/offerings/spec-plus" },
      { label: "Regional Partnerships", href: "/offerings/regional-partnerships" },
    ],
  },
  {
    label: "Markets",
    items: [
      { label: "By Type", href: "/markets/type" },
      { label: "By Role", href: "/markets/role" },
      { label: "By Region", href: "/markets/region" },
    ],
  },
];

const standaloneLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function DesktopDropdown({ menu }: { menu: DropdownMenu }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-text-body transition-colors hover:text-accent"
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
              className="py-1.5 text-sm text-accent-secondary transition-colors hover:text-accent"
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

  return (
    <header className="sticky top-0 z-50 border-b border-border-light bg-bg-surface/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Davies Imaging Group
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {dropdowns.map((menu) => (
            <DesktopDropdown key={menu.label} menu={menu} />
          ))}

          {standaloneLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-text-body transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}

          {/* Primary CTA */}
          <Link
            href="/campaigns/frameflow-sell-faster"
            className="cta-button rounded-full bg-accent px-5 py-2.5 text-text-light transition-colors hover:bg-accent-hover"
          >
            Start FrameFlow
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
            className="h-6 w-6 text-text-body"
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

            <Link
              href="/campaigns/frameflow-sell-faster"
              onClick={() => setMobileOpen(false)}
              className="cta-button mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-text-light"
            >
              Start FrameFlow
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
