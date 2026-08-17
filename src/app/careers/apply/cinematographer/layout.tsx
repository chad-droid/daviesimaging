import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, buildBreadcrumbSchema } from "@/lib/seo";

// The application page is a Client Component and cannot export metadata.
export const metadata: Metadata = {
  title: { absolute: `Cinematographer Jobs | ${SITE_NAME}` },
  description:
    "Shoot community walkthroughs, lifestyle films, and amenity showcases for homebuilders. Crew-based video production across DIG's 28 markets.",
  alternates: { canonical: "/careers/apply/cinematographer" },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Careers", path: "/careers" },
          { name: "Cinematographer", path: "/careers/apply/cinematographer" },
        ])}
      />
      {children}
    </>
  );
}
