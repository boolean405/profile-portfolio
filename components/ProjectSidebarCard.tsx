"use client";

import { motion, easeOut } from "framer-motion";

export default function ProjectSidebarCard({
  live,
  source,
}: {
  live?: string;
  source?: string;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 12 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.35, ease: easeOut },
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-max rounded-2xl border border-[rgb(var(--border))] bg-white p-5 shadow-sm dark:bg-[rgb(var(--card))]"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          {live && (
            <motion.a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.995 }}
              className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))]
                         bg-[rgb(var(--card))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--fg))]
                         shadow-sm transition hover:bg-[rgb(var(--card-strong))]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))]"
            >
              Live ↗
            </motion.a>
          )}

          {source && (
            <motion.a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.995 }}
              className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))]
                         bg-[rgb(var(--card))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--fg))]
                         shadow-sm transition hover:bg-[rgb(var(--card-strong))]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))]"
            >
              Source Code ↗
            </motion.a>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
