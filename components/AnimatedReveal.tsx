"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function AnimatedReveal({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
