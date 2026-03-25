import { RevealOnScroll } from "@/components/RevealOnScroll";

const channels = [
  { icon: "🌐", name: "Website conversion" },
  { icon: "✉️", name: "Email campaigns" },
  { icon: "📣", name: "Paid media" },
  { icon: "🏠", name: "Sales center storytelling" },
  { icon: "🔄", name: "Listing refreshes" },
];

export function MarketingEcosystem() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <h2>Designed for the Full Marketing Ecosystem</h2>
          <p className="lead-text mt-4 text-zinc-500" style={{ fontStyle: "italic" }}>
            Every DIG shoot is built for downstream use.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="rounded-xl border border-zinc-200 bg-white p-6 text-center"
              >
                <span className="text-2xl">{ch.icon}</span>
                <p className="mt-3 text-sm font-medium text-zinc-700">{ch.name}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mt-12 text-zinc-600">
            Because modern builder marketing requires velocity, not just visuals.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
