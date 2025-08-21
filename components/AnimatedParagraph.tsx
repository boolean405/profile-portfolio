"use client";

import { motion } from "framer-motion";

export default function AnimatedParagraph({
  children,
  className,
  staggerWords = true,
  ...rest
}: {
  children: string;
  className?: string;
  staggerWords?: boolean;
}) {
  if (!staggerWords || typeof children !== "string") {
    // Simple one-shot reveal
    return (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className={className}
        {...rest}
      >
        {children}
      </motion.p>
    );
  }

  // Word-by-word stagger
  const words = children.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.02, delayChildren: 0.15 },
        },
      }}
      {...rest}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
        >
          {w + (i < words.length - 1 ? " " : "")}
        </motion.span>
      ))}
    </motion.p>
  );
}
