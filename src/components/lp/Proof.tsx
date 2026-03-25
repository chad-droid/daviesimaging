import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

interface ProofStat {
  value: string;
  label: string;
}

interface ProofProps {
  eyebrow?: string;
  headline: React.ReactNode;
  stats: ProofStat[];
  testimonial?: { quote: string; attribution: string };
}

export function Proof({
  eyebrow = "Results",
  headline,
  stats,
  testimonial,
}: ProofProps) {
  return (
    <section className="min-h-[60vh] bg-bg-dark py-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{headline}</h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {stats.map((stat) => (
            <div key={stat.label} className="mt-6 first:mt-14 text-center">
              <p
                className="text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </RevealOnScroll>

        {testimonial && (
          <RevealOnScroll>
            <blockquote className="mx-auto mt-16 max-w-2xl border-l-2 border-text-light/20 pl-6">
              <p
                className="lead-text text-zinc-300"
                style={{ fontStyle: "italic" }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="meta-text mt-4 text-zinc-500">
                {testimonial.attribution}
              </footer>
            </blockquote>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
