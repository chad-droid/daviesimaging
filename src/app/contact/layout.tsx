import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, buildBreadcrumbSchema } from "@/lib/seo";

// contact/page.tsx is a Client Component and cannot export metadata, so it
// lives here. Without this the page silently inherited the homepage's title
// and description, leaving four pages competing for one identity.
export const metadata: Metadata = {
  title: { absolute: `Contact DIG | ${SITE_NAME}` },
  description:
    "Book a strategy call, schedule a digDesk demo, or get a quote for photography, virtual staging, and video across 28 U.S. markets.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `Contact Davies Imaging Group`,
    description:
      "Book a strategy call, schedule a digDesk demo, or get a quote for builder photography, staging, and video.",
    siteName: SITE_NAME,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      {children}
    </>
  );
}
