"use client";

import { motion, type Variants, easeOut } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

export default function AnimatedSectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  const alignCls =
    align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <motion.div
      className={`flex flex-col gap-1 ${alignCls} ${className || ""}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        variants={item}
        className="text-2xl sm:text-3xl font-extrabold tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          variants={item}
          className="text-[rgb(var(--muted))] max-w-prose"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
