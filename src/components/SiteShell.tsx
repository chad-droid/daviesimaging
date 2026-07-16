"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

// Hides Nav but keeps Footer.
const HIDE_NAV_PATHS = ["/sarahpod"];
// Hides Nav, Footer, and the pt-16 gap under Nav.
const CHROMELESS_PREFIXES = ["/campaigns/modelmatch-trial-info", "/campaigns/sales-cycle-shrinkage", "/capabilities", "/modelmatch-deck", "/modelmatch-datalibrary", "/modelmatch-cinematic", "/shore2026"];

function matchesPrefix(pathname: string, list: string[]): boolean {
  return list.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const chromeless = matchesPrefix(pathname, CHROMELESS_PREFIXES);
  const hideNav = chromeless || matchesPrefix(pathname, HIDE_NAV_PATHS);

  return (
    <>
      {!hideNav && <Nav />}
      <main className={hideNav ? "flex-1" : "flex-1 pt-16"}>
        <PageTransition>{children}</PageTransition>
      </main>
      {!chromeless && <Footer />}
    </>
  );
}
