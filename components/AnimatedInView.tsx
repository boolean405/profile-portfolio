"use client";

import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  className?: string;
  variants?: Variants; // no 'any'
  delay?: number; // applied via component-level transition
}>;

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AnimatedInView({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -20% 0px", amount: 0.25 }}
      variants={variants}
      transition={{ delay }}
    >
      {children as ReactNode}
    </motion.div>
  );
}
