import Link from "next/link";

const footerLinks = {
  Work: [
    { label: "Model Homes", href: "/work/model-homes" },
    { label: "Amenities", href: "/work/amenities" },
    { label: "Spec Homes", href: "/work/spec-homes" },
    { label: "Lifestyle", href: "/work/lifestyle" },
  ],
  Services: [
    { label: "Premium Photo", href: "/services/premium" },
    { label: "Listing Photo", href: "/services/listing" },
    { label: "Video Production", href: "/services/video-production" },
    { label: "Virtual Staging", href: "/services/virtual-staging" },
    { label: "Virtual Video", href: "/services/virtual-video" },
    { label: "Matterport", href: "/services/matterport" },
  ],
  Offerings: [
    { label: "FrameFlow", href: "/services/frameflow" },
    { label: "Spec+", href: "/services/spec" },
    { label: "Regional Partnerships", href: "/offerings/regional-partnerships" },
  ],
  Markets: [
    { label: "By Type", href: "/markets/by-type" },
    { label: "By Role", href: "/markets/by-role" },
    { label: "By Region", href: "/markets/by-region" },
  ],
  Company: [
    { label: "About", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-page" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
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
