import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal | Davies Imaging Group",
  description: "Terms of Service and portal agreement for Davies Imaging Group and the digDesk client portal.",
};

const sections = [
  {
    number: "1",
    title: "Agreement to Terms",
    body: "By creating an account and using the digDesk client portal, you agree to be bound by these Terms of Service on behalf of yourself and the company or organization you represent. If you do not agree, do not create an account.",
  },
  {
    number: "2",
    title: "Portal Access",
    body: "Access to the Portal is granted by Davies Imaging Group LLC on a per-account basis. All accounts are subject to admin approval before access is granted. DIG reserves the right to suspend or terminate access at any time for violation of these terms or for business reasons with reasonable notice.",
  },
  {
    number: "3",
    title: "Account Credits and Balances",
    bullets: [
      "Credits are non-refundable. All purchased or allocated Credits are prepaid service credits and are not redeemable for cash under any circumstances.",
      "Credits are redeemable solely for DIG services. Credits may only be applied toward production services offered by Davies Imaging Group LLC through the Portal. They have no cash value and cannot be transferred to other accounts or applied to third-party services.",
      "Credits do not expire as long as your account remains active and in good standing.",
      "Credits are account-level. All users under a single account share the same credit balance. Individual users do not hold separate balances.",
      "In the event of account termination, unused Credits are forfeited and will not be refunded or transferred.",
    ],
  },
  {
    number: "4",
    title: "Order Submission and Delivery",
    body: "Orders submitted through the Portal are binding requests for production services. DIG will make reasonable efforts to fulfill orders within standard turnaround timelines. Delivery timelines are estimates and are not guaranteed. DIG is not liable for delays caused by incomplete submission information, weather, or circumstances outside its control.",
  },
  {
    number: "5",
    title: "Intellectual Property",
    body: "Upon full payment or credit deduction for a completed order, you retain ownership of the final delivered images and videos. DIG retains the right to use delivered work for portfolio, marketing, and promotional purposes unless you request otherwise in writing prior to delivery. Raw files, editing work products, and intermediate assets remain the property of DIG.",
  },
  {
    number: "6",
    title: "Acceptable Use",
    body: "You agree not to misuse the Portal, including attempting unauthorized access, submitting false or misleading information, or using the Portal for any purpose other than managing production services with DIG. Accounts found to be misused will be suspended immediately.",
  },
  {
    number: "7",
    title: "Privacy",
    body: "Personal information collected through the Portal (name, email, phone, company) is used solely to administer your account and fulfill production orders. DIG does not sell or share personal data with third parties except as required for service delivery. For questions, contact support@daviesimaging.com.",
  },
  {
    number: "8",
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by law, DIG's liability for any claim arising from Portal use is limited to the value of Credits directly associated with the disputed order. DIG is not liable for indirect, incidental, or consequential damages.",
  },
  {
    number: "9",
    title: "Changes to Terms",
    body: "DIG may update these Terms from time to time. Continued use of the Portal after changes are posted constitutes acceptance of the updated Terms. Material changes will be communicated via the Portal or email.",
  },
  {
    number: "10",
    title: "Contact Information",
    body: "For questions about these Terms, contact: Davies Imaging Group LLC, 1100 Melody Lane, Suite 202, Roseville, CA 95678. Email: support@daviesimaging.com.",
  },
  {
    number: "11",
    title: "Governing Law",
    body: "These Terms are governed by the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of the State of Texas.",
  },
];

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-12 border-b border-border-light pb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Davies Imaging Group LLC</p>
          <h1 className="mt-3">Terms of Service</h1>
          <p className="mt-3 text-sm text-text-muted">
            Effective Date: January 1, 2026 &nbsp;&middot;&nbsp; Administrative Offices: 1100 Melody Lane, Suite 202, Roseville, CA 95678
          </p>
          <p className="mt-4 text-text-body">
            This agreement governs access to and use of the digDesk client portal operated by Davies Imaging Group LLC.
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
          Questions about these terms? Email{" "}
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
