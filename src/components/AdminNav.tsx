"use client";

import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/admin/assets",
    label: "Deal Pipeline",
    sub: "Zoho deals",
  },
  {
    href: "/admin/digital",
    label: "Digital Pipeline",
    sub: "Virtual staging orders",
  },
  {
    href: "/admin/media",
    label: "Media Library",
    sub: "Imported images",
  },
  {
    href: "/admin/gallery",
    label: "Gallery Curation",
    sub: "Public gallery pages",
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-16 z-[39] border-b border-[#2C2C2C] bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* Logo / back link */}
        <a
          href="/"
          className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] transition-colors hover:text-[#A8A2D0]"
        >
          ← daviesimaging.com
        </a>

        {/* Workflow nav */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item, i) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={item.href} className="flex items-center">
                {i > 0 && (
                  <span className="mx-1 text-[#333] text-xs select-none">→</span>
                )}
                <a
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-[#6A5ACD]/20 text-[#A8A2D0]"
                      : "text-[#555] hover:text-[#A8A2D0]"
                  }`}
                  title={item.sub}
                >
                  {item.label}
                </a>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
