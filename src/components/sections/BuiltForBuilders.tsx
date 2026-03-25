import { RevealOnScroll } from "@/components/RevealOnScroll";

const personas = [
  "Marketing Directors at regional & national builders",
  "Builders doing 300+ homes annually",
  "Teams that need consistency across communities",
  "Sales leaders who want assets that help close",
];

const understandItems = [
  "Launch pressure",
  "Spec inventory timelines",
  "Brand consistency challenges",
  "Sales team alignment",
];

export function BuiltForBuilders() {
  return (
    <section className="bg-zinc-900 py-24 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <h2>Built for Builders Who Want Results</h2>
          <p className="lead-text mt-4 text-zinc-300" style={{ fontStyle: "italic" }}>
            We partner with marketing directors and sales leaders at growing
            homebuilders.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {/* DIG was Built for */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
              <h4 className="text-white">DIG Was Built For</h4>
              <ul className="mt-4 space-y-3">
                {personas.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* We understand */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left">
              <h4 className="text-white">We Understand</h4>
              <ul className="mt-4 space-y-3">
                {understandItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mt-12 text-lg font-medium text-white">
            Our job is simple: Make your marketing work harder.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
