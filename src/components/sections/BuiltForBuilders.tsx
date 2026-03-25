import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export function BuiltForBuilders() {
  return (
    <section className="flex min-h-[70vh] items-center bg-bg-dark py-24 text-text-light">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <Eyebrow>Built For Builders</Eyebrow>
          <h2>
            We partner with marketing directors and sales leaders who want{" "}
            <strong>results</strong>.
          </h2>
          <p className="mt-5 text-accent-secondary">
            Builders doing 300+ homes annually. Teams that need consistency
            across communities. Leaders who understand launch pressure, spec
            timelines, and sales alignment.
          </p>
          <Link
            href="/markets/role/directors"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
          >
            See who we serve <span aria-hidden="true">&rarr;</span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
