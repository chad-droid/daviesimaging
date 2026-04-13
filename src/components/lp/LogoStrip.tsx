interface LogoEntry {
  name: string;
  file?: string;
  h?: number;
  maxW?: number;
}

interface LogoStripProps {
  heading?: string;
  logos: (string | LogoEntry)[];
}

const LOGOS = "/DIG%20Website%202026%20Client%20Logos";

export function LogoStrip({
  heading = "Trusted by leading homebuilders",
  logos,
}: LogoStripProps) {
  const normalized = logos.map((l) =>
    typeof l === "string" ? { name: l } : l,
  );
  return (
    <section className="border-y border-border-light bg-bg-surface py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="meta-text text-center">{heading}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {normalized.map((logo) => (
            <div
              key={logo.name}
              className="flex h-12 items-center justify-center px-4"
              style={logo.maxW ? { width: logo.maxW + 32 } : undefined}
            >
              {logo.file ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`${LOGOS}/${encodeURIComponent(logo.file)}`}
                  alt={logo.name}
                  style={{ height: logo.h ?? 30, maxWidth: logo.maxW ?? 140, width: "auto" }}
                  className="object-contain opacity-60 grayscale"
                />
              ) : (
                <span className="text-sm font-medium tracking-wide text-text-muted">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
