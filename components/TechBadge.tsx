// src/components/TechBadge.tsx
import clsx from "clsx";

export function TechBadge({
  label,
  small = false,
}: {
  label: string;
  small?: boolean;
}) {
  return (
    <span
      className={clsx(
        // Surface + border use your CSS vars (globals.css)
        "inline-flex items-center rounded-lg border",
        "border-[rgba(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--fg))]",
        // Spacing & type
        small ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-[13px]",
        // Hover focus polish
        "transition-colors",
        "hover:border-[rgba(3_7_18/.14)] dark:hover:border-[rgba(255_255_255/.16)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]"
      )}
    >
      {label}
    </span>
  );
}
