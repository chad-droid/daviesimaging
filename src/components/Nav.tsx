"use client";

import { useState, useEffect, useRef } from "react";
import type React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ─── Nav data ────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  description?: string;
  /** Key of the stage column this item belongs to (Solutions only). */
  stage?: string;
  /** Key of the service line this product belongs to (Solutions only). */
  line?: string;
}

interface NavColumn {
  key: string;
  label: string;
  tagline: string;
}

interface NavGroup {
  label: string;
  basePath?: string; // used for active-state detection
  /** When set, the desktop panel lays items out in one column per stage. */
  stages?: NavColumn[];
  /** The second way to browse the same products: by how DIG makes them. */
  lines?: NavColumn[];
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Solutions",
    basePath: "/services",
    // Two views of the same products. Stage answers "what am I trying to do"
    // (Lead, Launch, List). Line answers "what kind of work is it"
    // (Production, Flow, Match). The panel switches between them.
    stages: [
      { key: "lead", label: "Lead", tagline: "Pre-sell before it's built" },
      { key: "launch", label: "Launch", tagline: "Model homes and amenities" },
      { key: "list", label: "List", tagline: "Spec homes for sale" },
    ],
    lines: [
      { key: "production", label: "Production", tagline: "Listing and Premium services" },
      { key: "flow", label: "Flow", tagline: "Video from your still images" },
      { key: "match", label: "Match", tagline: "Extend your merchandising" },
    ],
    // A product that serves more than one stage is listed under each of them
    // (CineFlow and ActFlow sit in both Lead and Launch). In the line view each
    // product appears once.
    items: [
      { stage: "lead", line: "match", label: "PlanMatch", href: "/services/planmatch", description: "Photography made from your plans" },
      { stage: "lead", line: "flow", label: "CineFlow", href: "/services/cineflow", description: "Cinematic sequences without a photo shoot" },
      { stage: "lead", line: "flow", label: "ActFlow", href: "/services/actflow", description: "Virtual talent brings your spaces to life" },
      { stage: "launch", line: "production", label: "Premium Photography", href: "/services/premium", description: "Model homes, amenities and lifestyle" },
      { stage: "launch", line: "production", label: "Premium Video", href: "/services/video-production", description: "Crew-based community and lifestyle film" },
      { stage: "launch", line: "flow", label: "CineFlow", href: "/services/cineflow", description: "Cinematic sequences from your model photography" },
      { stage: "launch", line: "flow", label: "ActFlow", href: "/services/actflow", description: "Virtual talent in your models and amenities" },
      { stage: "launch", line: "match", label: "Moments", href: "/services/moments", description: "Vertical close ups for social" },
      { stage: "list", line: "production", label: "Spec+", href: "/programs/spec-plus", description: "Photography, staging, and video, $600 flat" },
      { stage: "list", line: "production", label: "Listing Photography", href: "/services/listing", description: "HDR spec home photos, MLS-ready" },
      { stage: "list", line: "match", label: "ModelMatch", href: "/services/virtual-staging", description: "Staging built from your own model homes" },
      { stage: "list", line: "flow", label: "FrameFlow", href: "/services/virtual-video", description: "Lifelike video from your existing images" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Why We Exist", href: "/about", description: "How DIG was built inside the industry" },
      { label: "How We Do It", href: "/about/how-we-do-it", description: "Our specialization model and philosophy" },
      { label: "Our Markets", href: "/markets/region", description: "26 markets across four U.S. regions" },
      { label: "Builder Photo Blog", href: "/blog", description: "Photography, strategy, and builder insights" },
    ],
  },
];

// Links that appear BEFORE the dropdown groups in the desktop nav
const leadLinks: NavItem[] = [
  { label: "digDesk", href: "/programs/digdesk" },
];

const standaloneLinks: NavItem[] = [
  { label: "Contact", href: "/contact" },
];

// ─── Dropdown panel ───────────────────────────────────────────────────────────

function DesktopDropdown({
  group,
  active,
}: {
  group: NavGroup;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"stage" | "line">("stage");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  function handleMouseEnter() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`group relative flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors 2xl:text-[14px] ${
          active
            ? "text-text-dark"
            : "text-text-body hover:text-text-dark"
        }`}
      >
        {group.label}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        {/* Active underline */}
        {active && (
          <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
        )}
      </button>

      <AnimatePresence>
        {open && group.stages && (
          // Wide panel: centred under the header, one column per stage or line.
          <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="pointer-events-auto relative w-full max-w-4xl rounded-2xl border border-border-light bg-bg-surface shadow-xl shadow-black/50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Invisible bridge so the menu survives the trip down from the button */}
              <div className="absolute -top-8 left-0 h-8 w-full" />
              {group.lines && (
                <div className="flex items-center gap-3 border-b border-border-light px-6 py-3">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-text-muted">Browse</span>
                  <div role="tablist" aria-label="Browse solutions" className="flex gap-1 rounded-full bg-bg-light p-1">
                    {(["stage", "line"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        role="tab"
                        aria-selected={view === v}
                        onClick={() => setView(v)}
                        className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                          view === v ? "bg-bg-dark text-text-light" : "text-text-body hover:text-text-dark"
                        }`}
                      >
                        {v === "stage" ? "By stage" : "By service line"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 divide-x divide-border-light">
                {(view === "line" && group.lines ? group.lines : group.stages).map((col, i) => {
                  const byLine = view === "line" && !!group.lines;
                  // In the line view a product listed under two stages shows once.
                  const seen = new Set<string>();
                  const colItems = group.items.filter((item) => {
                    if ((byLine ? item.line : item.stage) !== col.key) return false;
                    if (!byLine) return true;
                    if (seen.has(item.label)) return false;
                    seen.add(item.label);
                    return true;
                  });
                  return (
                    <div key={col.key} className="p-3">
                      <div className="px-3 pb-3 pt-2">
                        <p className="flex items-baseline gap-2">
                          {!byLine && (
                            <span className="text-[0.65rem] font-bold tracking-[0.15em] text-accent">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          )}
                          <span className="text-[1.6rem] leading-none text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                            {col.label}
                          </span>
                        </p>
                        <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-text-muted">{col.tagline}</p>
                      </div>
                      {colItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group/item flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-bg-light"
                        >
                          <span className="text-sm font-medium text-text-dark transition-colors group-hover/item:text-accent">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="mt-0.5 text-[11px] leading-snug text-text-muted transition-colors group-hover/item:text-text-body">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
        {open && !group.stages && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border-light bg-bg-surface shadow-xl shadow-black/50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Invisible bridge to prevent mouse gap from closing menu */}
            <div className="absolute -top-2 left-0 h-2 w-full" />
            <div className="py-2">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group/item flex flex-col px-4 py-2.5 transition-colors hover:bg-bg-light ${
                      isActive ? "bg-bg-light" : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-medium transition-colors group-hover/item:text-accent ${
                        isActive ? "text-accent" : "text-text-dark"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 text-[11px] leading-snug text-text-muted transition-colors group-hover/item:text-text-body">
                        {item.description}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
            className="theme-dark fixed right-0 top-0 z-50 flex h-full w-[min(360px,90vw)] flex-col shadow-2xl lg:hidden"
            style={{ "--bg-surface": "#18181A", "--bg-light": "#26262A", background: "#18181A" } as React.CSSProperties}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-light px-6 py-4">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/dig-logo-light.png"
                  alt="Davies Imaging Group"
                  width={120}
                  height={73}
                  className="h-6 w-auto"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-bg-light hover:text-text-dark"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {/* Lead links (digDesk) */}
              {leadLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center py-3 text-sm font-medium transition-colors hover:text-accent ${
                    pathname === link.href || pathname.startsWith(link.href + "/") ? "text-accent" : "text-text-body"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Dropdown groups */}
              {navGroups.map((group) => (
                <MobileGroup key={group.label} group={group} pathname={pathname} onNavigate={onClose} />
              ))}

              {/* Trailing standalone links (Contact) */}
              {standaloneLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center py-3 text-sm font-medium transition-colors hover:text-accent ${
                    pathname === link.href ? "text-accent" : "text-text-body"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="border-t border-border-light px-4 py-4">
              <Link
                href="/get-started"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-[12px] font-semibold tracking-wide text-white transition-colors hover:bg-accent-hover"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileGroup({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  const isGroupActive = group.basePath
    ? pathname.startsWith(group.basePath)
    : group.items.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"));

  const [open, setOpen] = useState(isGroupActive);

  return (
    <div className="border-b border-border-light/60 py-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between py-2.5 text-sm font-medium transition-colors ${
          isGroupActive ? "text-text-dark" : "text-text-body"
        }`}
      >
        <span>{group.label}</span>
        <svg
          className={`h-3.5 w-3.5 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-2 pl-2">
              {group.items.map((item, i) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const stage =
                  item.stage && item.stage !== group.items[i - 1]?.stage
                    ? group.stages?.find((st) => st.key === item.stage)
                    : undefined;
                return (
                  <div key={`${item.stage ?? ""}-${item.href}`}>
                  {stage && (
                    <p className="pb-1 pl-2 pt-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent">
                      {stage.label} <span className="font-medium normal-case tracking-normal text-text-muted">· {stage.tagline}</span>
                    </p>
                  )}
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex flex-col py-2 pl-2 transition-colors hover:text-accent ${
                      isActive ? "text-accent" : "text-text-body"
                    }`}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.description && (
                      <span className="mt-0.5 text-[11px] text-text-muted">{item.description}</span>
                    )}
                  </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Nav ─────────────────────────────────────────────────────────────────

// The bar and its menus are charcoal, matching the footer. theme-dark flips the
// text and border tokens; these override the surface tokens so the dropdowns
// sit on the same charcoal instead of the page's near-black.
const NAV_VARS = { "--bg-surface": "#18181A", "--bg-light": "#26262A" } as React.CSSProperties;
const NAV_DARK = { ...NAV_VARS, background: "rgba(24, 24, 26, 0.94)" } as React.CSSProperties;

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="theme-dark fixed left-0 right-0 top-0 z-40 border-b border-border-light backdrop-blur-sm" style={NAV_DARK}>
        <nav className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-3.5 lg:px-8 2xl:px-12 2xl:py-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/dig-logo-light.png"
              alt="Davies Imaging Group"
              width={120}
              height={73}
              className="h-[26px] w-auto 2xl:h-8"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            {/* Lead links (digDesk) */}
            {leadLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] font-medium tracking-wide transition-colors 2xl:text-[14px] ${
                    isActive
                      ? "text-text-dark"
                      : "text-text-body hover:text-text-dark"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent" />
                  )}
                </Link>
              );
            })}

            {/* Dropdown groups (Solutions | About) */}
            {navGroups.map((group) => {
              const isActive = group.basePath
                ? pathname.startsWith(group.basePath)
                : group.items.some(
                    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
                  );
              return (
                <DesktopDropdown
                  key={group.label}
                  group={group}
                  active={isActive}
                />
              );
            })}

            {/* Trailing standalone links (Contact) */}
            {standaloneLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] font-medium tracking-wide transition-colors 2xl:text-[14px] ${
                    isActive
                      ? "text-text-dark"
                      : "text-text-body hover:text-text-dark"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent" />
                  )}
                </Link>
              );
            })}

            {/* Divider */}
            <span className="h-4 w-px bg-border-light" />

            {/* CTAs */}
            <a
              href="https://desk.daviesimaging.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 px-4 py-1.5 text-[12px] font-semibold tracking-wide text-text-body transition-all hover:border-accent hover:text-accent"
            >
              Log In
            </a>
            <Link
              href="/get-started"
              className="rounded-full bg-accent px-4 py-1.5 text-[12px] font-semibold tracking-wide text-white transition-colors hover:bg-accent-hover"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile right — Get Started + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/get-started"
              className="rounded-full bg-accent px-4 py-1.5 text-[12px] font-semibold tracking-wide text-white transition-colors hover:bg-accent-hover"
            >
              Get Started
            </Link>
            <button
              type="button"
              className="rounded-lg p-1.5"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5 text-text-dark"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer — rendered outside header so it can be full-height */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
