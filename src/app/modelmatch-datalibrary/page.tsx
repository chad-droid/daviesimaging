import type { Metadata } from "next";
import { DataLibrary } from "./DataLibrary";

export const metadata: Metadata = {
  title: "ModelMatch Data Library | Davies Imaging Group",
  description:
    "Real ModelMatch listings: how long each home sat unstaged, and how fast it found a buyer after staging. Verified MLS timelines with staged before-and-afters.",
  // Test build — not for indexing yet.
  robots: { index: false, follow: false },
};

export default function ModelMatchDataLibraryPage() {
  return <DataLibrary />;
}
