"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function AnimatedCTA({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
    >
      <motion.div whileTap={{ scale: 0.98 }}>{children}</motion.div>
    </motion.div>
  );
}
