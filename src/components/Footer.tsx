import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Results: [
    { label: "Model Homes", href: "/work/model-homes" },
    { label: "Amenities", href: "/work/amenities" },
    { label: "Spec Homes", href: "/work/spec-homes" },
    { label: "Lifestyle", href: "/work/lifestyle" },
  ],
  Solutions: [
    { label: "Premium Photography", href: "/services/premium" },
    { label: "Listing Photography", href: "/services/listing" },
    { label: "Video Production", href: "/services/video-production" },
    { label: "Virtual Staging", href: "/services/virtual-staging" },
    { label: "Virtual Video", href: "/services/virtual-video" },
    { label: "Matterport", href: "/services/matterport" },
  ],
  About: [
    { label: "Why We Exist", href: "/about" },
    { label: "How We Do It", href: "/about/how-we-do-it" },
    { label: "Who We Help", href: "/markets/role" },
    { label: "Our Markets", href: "/markets/region" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Links: [
    { label: "digDesk", href: "/programs/digdesk" },
    { label: "FrameFlow Studio", href: "/programs/frameflow" },
    { label: "Spec+", href: "/programs/spec-plus" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Legal", href: "/legal" },
    { label: "Copyright & Usage", href: "/copyright" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border-light bg-bg-light">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Brand column */}
          <div>
            <Image
              src="/dig-logo-dark.png"
              alt="Davies Imaging Group"
              width={120}
              height={73}
              className="h-8 w-auto"
            />
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              Revenue-driving marketing assets designed for homebuilder teams
              that need to sell faster.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="https://www.linkedin.com/company/daviesimaging/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-body transition-colors hover:text-accent">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/daviesimaging/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-body transition-colors hover:text-accent">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.youtube.com/@daviesimaging" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-text-body transition-colors hover:text-accent">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.facebook.com/daviesimaging" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-body transition-colors hover:text-accent">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://share.google/aEECagJCG6GUnhrG0" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="text-text-body transition-colors hover:text-accent">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </a>
            </div>
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
                      className="text-sm text-text-body transition-colors hover:text-accent"
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
            <p className="text-sm text-text-body">
              Builder marketing insights delivered to your inbox.
            </p>
            <form
              action="https://daviesimaging.us17.list-manage.com/subscribe/post?u=de0da4eedef3becab5eb4e4ab&id=418d6a179b"
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
            Get in Touch <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
