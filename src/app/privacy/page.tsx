import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Davies Imaging Group",
  description:
    "How Davies Imaging Group LLC collects, uses, and protects your information when you visit our sites, submit a form, or respond to an advertisement.",
};

const sections = [
  {
    number: "1",
    title: "Overview",
    body: "Davies Imaging Group LLC (\"DIG,\" \"we,\" \"us,\" or \"our\") respects your privacy. This Privacy Policy explains what information we collect when you visit our websites, submit a form, request a free trial, or respond to one of our advertisements, and how we use and protect that information. By using our sites or submitting your information, you agree to the practices described here.",
  },
  {
    number: "2",
    title: "Information We Collect",
    bullets: [
      "Information you provide. When you submit a form, request a trial, or contact us, we collect the details you share, such as your name, business email address, company or builder name, job title, phone number, and any message content.",
      "Information from advertising forms. If you respond to one of our advertisements using a lead form on a platform such as LinkedIn, that platform shares the contact details you chose to submit (typically name, email, company, and job title) with us.",
      "Information collected automatically. When you visit our sites, we automatically collect technical data such as your IP address, browser and device type, referring page, and how you navigate the site. We collect this through cookies and similar technologies.",
    ],
  },
  {
    number: "3",
    title: "How We Use Your Information",
    bullets: [
      "To respond to your inquiry, set up your free trial, and deliver the services you request.",
      "To send you service updates and, where permitted, marketing emails about DIG products and offers. You can opt out at any time.",
      "To measure and improve our advertising, understand which campaigns lead to signups, and improve our sites and services.",
      "To protect our sites, prevent fraud or abuse, and comply with our legal obligations.",
    ],
  },
  {
    number: "4",
    title: "Advertising and Analytics Technologies",
    body: "We use cookies and tracking tags from third-party providers to understand site traffic and measure advertising performance. These include the LinkedIn Insight Tag, the Meta (Facebook) Pixel, Google Analytics, and Microsoft Clarity. These providers may set their own cookies and process data under their own privacy policies. You can control cookies through your browser settings, and you can opt out of interest-based advertising through the providers' own tools and through industry pages such as optout.aboutads.info.",
  },
  {
    number: "5",
    title: "How We Share Information",
    body: "We do not sell your personal information. We share it only with trusted service providers who help us operate our business, such as email delivery, customer relationship management, hosting, and analytics providers, and only to the extent needed to perform those services. We may also disclose information if required by law or to protect our rights, safety, or property.",
  },
  {
    number: "6",
    title: "Data Retention",
    body: "We keep your information for as long as needed to provide our services, maintain your account or trial, comply with our legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we take reasonable steps to delete or de-identify it.",
  },
  {
    number: "7",
    title: "Your Privacy Rights",
    body: "Depending on where you live, you may have the right to request access to the personal information we hold about you, ask us to correct or delete it, and opt out of marketing or the sale or sharing of personal information. California residents have these rights under the California Consumer Privacy Act. To exercise any right, email us at support@daviesimaging.com and we will respond as required by law. We will not discriminate against you for exercising your rights.",
  },
  {
    number: "8",
    title: "Marketing Communications",
    body: "If you receive marketing emails from us, you can unsubscribe at any time using the link in any email or by contacting support@daviesimaging.com. We may still send you non-marketing messages related to a trial or service you have requested.",
  },
  {
    number: "9",
    title: "Data Security",
    body: "We use reasonable administrative, technical, and physical safeguards to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we work to protect your information and limit access to those who need it.",
  },
  {
    number: "10",
    title: "Third-Party Links",
    body: "Our sites and advertisements may link to third-party websites and platforms that we do not control. This Privacy Policy does not apply to those sites. We encourage you to review the privacy policies of any third party before providing your information.",
  },
  {
    number: "11",
    title: "Children's Privacy",
    body: "Our sites and services are intended for businesses and professionals and are not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us information, contact us and we will delete it.",
  },
  {
    number: "12",
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. When we do, we will revise the effective date above. Your continued use of our sites after an update takes effect means you accept the revised policy.",
  },
  {
    number: "13",
    title: "Contact Us",
    body: "For any question about this Privacy Policy or your information, contact: Davies Imaging Group LLC, 1100 Melody Lane, Suite 202, Roseville, CA 95678. Email: support@daviesimaging.com.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-12 border-b border-border-light pb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Davies Imaging Group LLC</p>
          <h1 className="mt-3">Privacy Policy</h1>
          <p className="mt-3 text-sm text-text-muted">
            Effective Date: July 3, 2026 &nbsp;&middot;&nbsp; Administrative Offices: 1100 Melody Lane, Suite 202, Roseville, CA 95678
          </p>
          <p className="mt-4 text-text-body">
            This Privacy Policy explains how Davies Imaging Group LLC collects, uses, and protects your information when you visit our websites, submit a form, request a free trial, or respond to one of our advertisements.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.number}>
              <h4 className="flex items-baseline gap-2 text-sm font-semibold uppercase tracking-wider text-text-dark">
                <span className="font-mono text-text-muted">{section.number}.</span>
                {section.title}
              </h4>
              {section.body && (
                <p className="mt-3 text-sm leading-relaxed text-text-body">{section.body}</p>
              )}
              {section.bullets && (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-body">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-text-muted" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 rounded-xl border border-border-light bg-bg-light p-6 text-sm text-text-muted">
          Questions about your privacy? Email{" "}
          <a href="mailto:support@daviesimaging.com" className="font-medium text-text-dark hover:text-accent">
            support@daviesimaging.com
          </a>{" "}
          and our team will respond during business hours.
        </div>

        <div className="mt-6 text-xs text-text-muted">
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
