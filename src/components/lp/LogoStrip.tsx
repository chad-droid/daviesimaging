interface LogoStripProps {
  heading?: string;
  logos: string[];
}

export function LogoStrip({
  heading = "Trusted by leading homebuilders",
  logos,
}: LogoStripProps) {
  return (
    <section className="border-y border-zinc-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="meta-text text-center">{heading}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((name) => (
            <div
              key={name}
              className="flex h-10 items-center rounded bg-zinc-100 px-6 text-sm font-medium tracking-wide text-zinc-400"
            >
              {/* Replace with <Image> when logo files are available */}
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
