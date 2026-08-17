import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, buildBreadcrumbSchema } from "@/lib/seo";

// The application page is a Client Component and cannot export metadata.
export const metadata: Metadata = {
  title: { absolute: `Listing Photographer Jobs | ${SITE_NAME}` },
  description:
    "Shoot spec homes and active inventory for national and regional homebuilders. HDR listing photography, fast turnaround, flexible scheduling across DIG's 28 markets.",
  alternates: { canonical: "/careers/apply/listing-photographer" },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Careers", path: "/careers" },
          { name: "Listing Photographer", path: "/careers/apply/listing-photographer" },
        ])}
      />
      {children}
    </>
  );
}
