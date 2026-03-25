import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "FrameFlow", href: "/services/frameflow" },
    { label: "Premium", href: "/services/premium" },
    { label: "Spec+", href: "/services/spec" },
  ],
  Company: [
    { label: "About", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-page" },
  ],
  "Built For": [
    { label: "Marketing Directors", href: "/built-for/marketing-directors" },
    { label: "Sales Leaders", href: "/built-for/sales-leaders" },
    { label: "Regional Builders", href: "/built-for/regional-builders" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Davies Imaging Group
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Revenue-driving marketing assets designed for homebuilder teams
              that need to sell faster.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h6 className="mb-4">{heading}</h6>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row">
          <p className="meta-text">
            &copy; {new Date().getFullYear()} Davies Imaging Group. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/contact-page"
              className="cta-button rounded-full bg-zinc-900 px-5 py-2.5 text-white transition-colors hover:bg-zinc-700"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
