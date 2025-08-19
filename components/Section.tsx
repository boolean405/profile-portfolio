// src/components/Section.tsx
export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-max my-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && (
          <p className="text-[rgb(var(--muted))] mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
