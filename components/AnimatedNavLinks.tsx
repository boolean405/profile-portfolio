"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Item = { href: string; label: string; isExternal?: boolean };

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function AnimatedNavLinks({ items }: { items: Item[] }) {
  return (
    <motion.nav
      className="hidden md:flex items-center gap-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map(({ href, label, isExternal }) => (
        <motion.div key={href} variants={item}>
          {isExternal ? (
            <a
              href={href}
              className="px-3 py-2 rounded-lg text-sm md:text-base relative group"
              target="_blank"
              rel="noreferrer"
            >
              {label}
              {/* animated underline on hover */}
              <span className="pointer-events-none absolute left-3 right-3 -bottom-[2px] h-[2px] origin-left scale-x-0 bg-[rgb(var(--brand))] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ) : (
            <Link
              href={href}
              className="px-3 py-2 rounded-lg text-sm md:text-base relative group"
            >
              {label}
              <span className="pointer-events-none absolute left-3 right-3 -bottom-[2px] h-[2px] origin-left scale-x-0 bg-[rgb(var(--brand))] transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          )}
        </motion.div>
      ))}
    </motion.nav>
  );
}
