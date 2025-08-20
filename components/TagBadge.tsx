import React from "react";

export default function TagBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-black/10 bg-[rgb(var(--muted))/0.08] px-2.5 py-1 text-xs font-medium text-[rgb(var(--foreground))]">
      {children}
    </span>
  );
}
