import type { PropsWithChildren, ReactNode } from "react";
import AnimatedSectionHeader from "@/components/AnimatedSectionHeader";

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  align?: "left" | "center";
  animated?: boolean; // 👈 new
}>;

export function Section({
  title,
  subtitle,
  id,
  className,
  align = "center",
  animated = false,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`container-max py-12 sm:py-16 ${className || ""}`}
    >
      {title ? (
        animated ? (
          <AnimatedSectionHeader
            title={title}
            subtitle={subtitle}
            align={align}
            className="mb-8"
          />
        ) : (
          <div
            className={`mb-8 ${align === "left" ? "text-left" : "text-center"}`}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {title}
            </h2>
            {subtitle ? (
              <p className="text-[rgb(var(--muted))] max-w-prose mx-auto">
                {subtitle}
              </p>
            ) : null}
          </div>
        )
      ) : null}

      {children as ReactNode}
    </section>
  );
}
