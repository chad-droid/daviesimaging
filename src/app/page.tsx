import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Photography Made for Homebuilders | Davies Imaging Group" },
  description:
    "Model home photography, listing photography, virtual staging and video for home builders in 29 U.S. markets.",
  alternates: { canonical: "/" },
};

// The homepage: film hero, then Lead, Launch and List. Metadata is set here
// because the root layout must not carry a canonical.
// The previous section components remain in src/components/sections/.
export default function Home() {
  return <HomePage />;
}
