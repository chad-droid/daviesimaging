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
    { label: "FrameFlow", href: "/offerings/frameflow" },
    { label: "Spec+", href: "/offerings/spec-plus" },
    { label: "Regional Partnerships", href: "/offerings/regional-partnerships" },
  ],
  Markets: [
    { label: "By Type", href: "/markets/type" },
    { label: "By Role", href: "/markets/role" },
    { label: "By Region", href: "/markets/region" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border-light bg-bg-light">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-6 lg:gap-12">
          {/* Brand column */}
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Davies Imaging Group
            </p>
            <p className="mt-3 text-sm leading-relaxed text-accent-secondary">
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
                      className="text-sm text-accent-secondary transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 border-t border-border-light pt-10">
          <div className="mx-auto max-w-md text-center">
            <h6 className="mb-2">Stay in the Loop</h6>
            <p className="text-sm text-accent-secondary">
              Builder marketing insights delivered to your inbox.
            </p>
            <form
              action="https://mailchi.mp/daviesimaging/sign-up-for-updates"
              method="post"
              target="_blank"
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                name="EMAIL"
                placeholder="Email address"
                required
                className="flex-1 rounded-full border border-border-light px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
              />
              <button
                type="submit"
                className="cta-button rounded-full bg-accent px-6 py-2.5 text-text-light transition-colors hover:bg-accent-hover"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-light pt-8 sm:flex-row">
          <p className="meta-text">
            &copy; {new Date().getFullYear()} Davies Imaging Group. All rights
            reserved.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
          >
            Book a Strategy Call <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
