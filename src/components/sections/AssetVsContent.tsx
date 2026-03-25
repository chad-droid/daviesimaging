import { RevealOnScroll } from "@/components/RevealOnScroll";

const benefits = [
  "Website conversion",
  "Paid ad performance",
  "Sales center storytelling",
  "Email engagement",
  "Listing refresh velocity",
];

export function AssetVsContent() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <h2>Stop Creating Content. Start Building Assets.</h2>
          <p className="mt-6 text-zinc-600">
            Most builder marketing teams invest in photography that lives in one
            place. DIG builds assets designed for:
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {benefits.map((b) => (
              <li
                key={b}
                className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700"
              >
                {b}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
