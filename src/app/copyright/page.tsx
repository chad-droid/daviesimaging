import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Copyright & Usage | Davies Imaging Group",
  description: "Copyright and usage terms governing all photographs, videos, and media created by Davies Imaging Group LLC in connection with Premium photography and video production services.",
};

const sections = [
  {
    number: "1",
    title: "Purpose",
    body: "These Copyright & Usage Terms govern the ownership and permitted use of all photographs, videos, and related media created by Davies Imaging Group LLC in connection with Premium photography and video production services. These Terms apply to all Premium Work unless otherwise agreed in writing.",
  },
  {
    number: "2",
    title: "Copyright Ownership",
    body: "DIG retains full and exclusive copyright ownership of all assets created as part of Premium Work. No ownership rights are transferred to the Client under any circumstances.",
  },
  {
    number: "3",
    title: "Client License",
    intro: "Upon full payment for Premium Work, DIG grants the Client a perpetual, non-exclusive, non-transferable, and non-assignable license to use the final delivered assets. This license allows the Client to:",
    bullets: [
      "Use the assets across all marketing, advertising, and promotional channels, including but not limited to digital, print, social media, websites, MLS listings, and internal materials.",
      "Use the assets indefinitely, without expiration.",
      "Use the assets without geographic restriction.",
    ],
  },
  {
    number: "4",
    title: "Restrictions on Transfer and Third-Party Use",
    intro: "The Client's license is strictly limited to the Client entity that commissioned the work. The Client may NOT:",
    bullets: [
      "Transfer, sublicense, assign, or distribute the assets to any third party for independent use.",
      "Provide assets to external parties including, but not limited to: architects, designers, engineers, vendors, trades, developers, marketing agencies, or other partners for their own use.",
      "Allow third parties to repurpose, reuse, or publish the assets outside of materials owned and controlled by the Client.",
    ],
  },
  {
    number: "5",
    title: "Permitted Collaboration Use",
    intro: "The Client may share assets with third-party vendors or partners solely for the purpose of supporting the Client's own marketing or project execution, provided that:",
    bullets: [
      "The assets are used only in connection with the Client's business; and",
      "The third party does not obtain independent rights to use, distribute, or republish the assets.",
    ],
  },
  {
    number: "6",
    title: "Third-Party Licensing",
    body: "Any third party seeking to use the assets independently must obtain a separate license directly from DIG. DIG reserves the right to approve or deny such requests and to establish separate pricing, terms, and usage rights for third-party licenses.",
  },
  {
    number: "7",
    title: "Portfolio and Promotional Use by DIG",
    body: "DIG retains the right to use all assets for portfolio, marketing, social media, advertising, and promotional purposes unless otherwise agreed in writing prior to the project.",
  },
  {
    number: "8",
    title: "Alterations and Derivative Works",
    body: "The Client may crop, resize, and format assets as needed for standard marketing use. Material alterations, including but not limited to heavy editing, manipulation, or use in AI training datasets, are not permitted without prior written consent from DIG.",
  },
  {
    number: "9",
    title: "Breach of Terms",
    body: "Any unauthorized transfer, distribution, or third-party use of the assets constitutes a breach of these Terms. DIG reserves the right to pursue all available remedies, including but not limited to licensing fees, damages, and injunctive relief.",
  },
  {
    number: "10",
    title: "Governing Law",
    body: "These Terms are governed by the laws of the State of Texas.",
  },
];

export default function CopyrightPage() {
  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6">

        {/* Header */}
        <div className="mb-12 border-b border-border-light pb-10">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            Davies Imaging Group LLC
          </p>
          <h1 className="mt-3">
            Premium Photography<br />
            <strong>Copyright & Usage Terms</strong>
          </h1>
          <p className="mt-4 text-sm text-text-muted">
            Effective Date: January 1, 2026
          </p>
          <p className="mt-5 text-text-body">
            These terms govern the ownership and permitted use of all photographs, videos, and related media created by DIG in connection with Premium photography and video production services. Questions?{" "}
            <a
              href="mailto:support@daviesimaging.com"
              className="font-medium text-accent hover:underline"
            >
              support@daviesimaging.com
            </a>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.number} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
              {/* Section number */}
              <div className="pt-0.5">
                <span className="font-mono text-xs font-semibold text-text-muted">
                  {s.number.padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-sans text-base font-semibold text-text-dark">
                  {s.title}
                </h3>

                {"intro" in s && s.intro && (
                  <p className="mt-3 text-sm leading-relaxed text-text-body">
                    {s.intro}
                  </p>
                )}

                {"body" in s && s.body && (
                  <p className="mt-3 text-sm leading-relaxed text-text-body">
                    {s.body}
                  </p>
                )}

                {"bullets" in s && s.bullets && (
                  <ul className="mt-3 space-y-2">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-body">
                        <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-border-light" />

        {/* Contact block */}
        <div className="rounded-xl border border-border-light bg-bg-light p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-text-dark">
            Davies Imaging Group LLC
          </p>
          <p className="mt-1 text-sm text-text-body">
            1100 Melody Lane, Suite 202<br />
            Roseville, CA 95678
          </p>
          <a
            href="mailto:support@daviesimaging.com"
            className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
          >
            support@daviesimaging.com
          </a>
        </div>

        {/* Footer nav */}
        <div className="mt-10 flex flex-wrap items-center gap-4 text-xs text-text-muted">
          <Link href="/legal" className="hover:text-accent">
            Terms of Service
          </Link>
          <span>&middot;</span>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
          <span>&middot;</span>
          <Link href="/" className="hover:text-accent">
            &larr; Back to home
          </Link>
        </div>

      </div>
    </section>
  );
}
