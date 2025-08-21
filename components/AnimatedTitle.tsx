"use client";

import { motion, type Variants, easeOut } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export default function AnimatedTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Convert children (string) into words so we can animate each
  const text =
    typeof children === "string"
      ? children.split(" ")
      : [children as React.ReactNode];

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {text.map((wordText, i) => (
        <motion.span key={i} variants={word} className="inline-block mr-2">
          {wordText}
        </motion.span>
      ))}
    </motion.h1>
  );
}
