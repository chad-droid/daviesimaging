import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Eyebrow>404</Eyebrow>
        <h1>
          Page not <strong>found</strong>.
        </h1>
        <p className="mt-5 text-text-body">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
          >
            Back to home <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
          >
            Get in touch <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
