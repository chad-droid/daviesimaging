import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

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
    <DarkSection className="min-h-[60vh] py-24 text-text-light">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow dark>{eyebrow}</Eyebrow>
            <h2 className="text-white">{headline}</h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {stats.map((stat) => (
            <div key={stat.label} className="mt-6 first:mt-14 text-center">
              <p
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </RevealOnScroll>

        {testimonial && (
          <RevealOnScroll>
            <blockquote className="mx-auto mt-16 max-w-2xl border-l-2 border-text-light/30 pl-6">
              <p
                className="lead-text text-white"
                style={{ fontStyle: "italic" }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="meta-text mt-4 text-white/70">
                {testimonial.attribution}
              </footer>
            </blockquote>
          </RevealOnScroll>
        )}
      </div>
    </DarkSection>
  );
}
