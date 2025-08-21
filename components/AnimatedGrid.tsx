"use client";

import { motion, type Variants, easeOut } from "framer-motion";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  stagger?: number;
  delayChildren?: number;
}>;

export default function AnimatedGrid({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.1,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// 👇 Make this typed and exported
export const gridItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};
