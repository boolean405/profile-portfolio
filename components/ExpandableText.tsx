"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type Props = {
  text: string;
  /** collapsed height in px (visual lines depend on font size/line-height) */
  collapsedHeight?: number;
  /** optional className for outer wrapper */
  className?: string;
};

export default function ExpandableText({
  text,
  collapsedHeight = 160,
  className,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // If content is taller than collapsed height, show the toggle
    setNeedsToggle(el.scrollHeight > collapsedHeight + 8);
  }, [text, collapsedHeight]);

  return (
    <div className={clsx("relative", className)}>
      <div
        ref={contentRef}
        className={clsx(
          "transition-[max-height] duration-300 ease-in-out overflow-hidden prose max-w-none prose-p:leading-relaxed",
          expanded ? "max-h-[2000px]" : `max-h-[${collapsedHeight}px]`
        )}
        style={!expanded ? { maxHeight: collapsedHeight } : undefined}
      >
        <p className="text-[rgb(var(--muted))] whitespace-pre-line">{text}</p>
      </div>

      {/* gradient fade at bottom when collapsed */}
      {needsToggle && !expanded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-10 h-16 bg-gradient-to-b from-transparent to-white/90 dark:to-[rgb(var(--background))]/90" />
      )}

      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex select-none items-center gap-1 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--foreground))] shadow-sm transition hover:bg-[rgb(var(--muted))/0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]/40"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
          <span aria-hidden>{expanded ? "↑" : "↓"}</span>
        </button>
      )}
    </div>
  );
}
