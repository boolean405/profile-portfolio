"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function AnimatedHeader({ children }: PropsWithChildren) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[rgb(var(--bg))]/80 backdrop-blur border-b border-black/10"
    >
      {children}
    </motion.header>
  );
}
