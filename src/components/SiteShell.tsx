"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { PageTransition } from "./PageTransition";

const HIDE_NAV_PATHS = ["/sarahpod"];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = HIDE_NAV_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  return (
    <>
      {!hideNav && <Nav />}
      <main className={hideNav ? "flex-1" : "flex-1 pt-16"}>
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
