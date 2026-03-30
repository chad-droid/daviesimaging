export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-3 text-xs font-bold uppercase tracking-[0.15em] ${dark ? "text-accent-dark-hover" : "text-accent"}`}>
      {children}
    </p>
  );
}
