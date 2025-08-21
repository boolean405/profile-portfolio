// src/components/AnimatedFooter.tsx
"use client";

import {
  motion,
  type Variants,
  easeOut,
  useReducedMotion,
} from "framer-motion";
import { SiGithub, SiLinkedin, SiGmail, SiX } from "react-icons/si";
import { IoDocument } from "react-icons/io5";

type IconKey = "github" | "linkedin" | "x" | "email" | "resume";

type SocialLite = {
  _id: string;
  label: string;
  href: string;
  external?: boolean;
  icon: IconKey; // <-- serializable
};

type Props = {
  brand: string;
  year: number;
  socials: SocialLite[];
};

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
  email: SiGmail,
  resume: IoDocument,
};

const container: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
};

export default function AnimatedFooter({ brand, year, socials }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-16 border-t border-[rgb(var(--border))]"
    >
      <div className="container-max py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div variants={item} className="text-sm text-[rgb(var(--muted))] text-center md:text-left">
          <p className="font-medium text-[rgb(var(--fg))]">{brand}</p>
          <p>© {year} All rights reserved.</p>
        </motion.div>

        <motion.nav aria-label="Social links" className="flex items-center gap-3 md:gap-4" variants={container}>
          {socials.map(({ _id, label, href, external, icon }) => {
            const Icon = ICONS[icon];
            return (
              <motion.a
                key={_id}
                href={href}
                variants={item}
                whileHover={reduce ? undefined : { y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm
                           text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]
                           ring-1 ring-transparent hover:ring-[rgb(var(--border))]
                           transition"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <motion.span
                  className="inline-flex"
                  whileHover={
                    reduce
                      ? undefined
                      : { scale: 1.12, rotate: -2, transition: { type: "spring", stiffness: 220, damping: 14 } }
                  }
                >
                  <Icon className="h-4 w-4 flex-none opacity-80 group-hover:opacity-100" aria-hidden />
                </motion.span>
                <span className="sr-only">{label}</span>
                <span className="hidden sm:inline">{label}</span>
              </motion.a>
            );
          })}
        </motion.nav>
      </div>
    </motion.footer>
  );
}
