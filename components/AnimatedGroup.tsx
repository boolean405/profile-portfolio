"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function AnimatedGroup({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="flex gap-3 flex-wrap"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
