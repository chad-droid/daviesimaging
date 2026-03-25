import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

interface PainPointsProps {
  eyebrow?: string;
  headline: React.ReactNode;
  subtitle?: string;
  points: { title: string; description: string }[];
}

export function PainPoints({
  eyebrow = "The Problem",
  headline,
  subtitle,
  points,
}: PainPointsProps) {
  return (
    <section className="min-h-[60vh] bg-bg-surface py-24">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{headline}</h2>
            {subtitle && (
              <p className="mt-4 text-zinc-600">{subtitle}</p>
            )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {points.map((point) => (
            <div
              key={point.title}
              className="mt-6 first:mt-14 rounded-lg border border-zinc-200 p-6"
            >
              <h4 className="text-text-dark">{point.title}</h4>
              <p className="mt-2 text-sm text-zinc-600">{point.description}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
