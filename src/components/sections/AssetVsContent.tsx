import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import Link from "next/link";

export function AssetVsContent() {
  return (
    <section className="flex min-h-[70vh] items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <Eyebrow>The DIG Difference</Eyebrow>
          <h2>
            Stop creating content. Start building <strong>assets</strong>.
          </h2>
          <p className="mt-5 text-zinc-600">
            Most builder marketing teams invest in photography that lives in one
            place. DIG builds assets designed for website conversion, paid media,
            sales centers, email, and listing refreshes.
          </p>
          <Link
            href="/offerings/frameflow"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
          >
            See how it works <span aria-hidden="true">&rarr;</span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
