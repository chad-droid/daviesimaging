export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  // Detect "Parent / Child" breadcrumb pattern and render with visual hierarchy
  if (typeof children === "string" && children.includes(" / ")) {
    const slashIndex = children.indexOf(" / ");
    const parent = children.slice(0, slashIndex);
    const child = children.slice(slashIndex + 3);
    return (
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.15em] lg:text-[0.9375rem]">
        <span className={dark ? "text-white/60" : "text-text-muted"}>{parent}</span>
        <span className={dark ? "text-white/35" : "text-border-light"}> / </span>
        <span className={dark ? "text-accent-dark-hover" : "text-accent"}>{child}</span>
      </p>
    );
  }

  return (
    <p className={`mb-4 text-sm font-bold uppercase tracking-[0.15em] lg:text-[0.9375rem] ${dark ? "text-accent-dark-hover" : "text-accent"}`}>
      {children}
    </p>
  );
}
