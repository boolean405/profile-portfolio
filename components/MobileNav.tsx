"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  type Variants,
  useReducedMotion,
  easeOut,
} from "framer-motion";
import { Menu, X } from "lucide-react";

type Item = { href: string; label: string; external?: boolean };

export default function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const orig = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = orig;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  const handleHomeClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      close();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const overlay: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce ? {} : { duration: 0.18, ease: easeOut },
    },
    exit: {
      opacity: 0,
      transition: reduce ? {} : { duration: 0.14, ease: easeOut },
    },
  };

  const panel: Variants = {
    hidden: { opacity: 0, x: 8, scale: 0.99 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: reduce ? {} : { duration: 0.22, ease: easeOut, delay: 0.03 },
    },
    exit: {
      opacity: 0,
      x: 8,
      scale: 0.99,
      transition: reduce ? {} : { duration: 0.14, ease: easeOut },
    },
  };

  const itemCls =
    "block w-full text-right px-3 py-2 rounded-md text-sm font-medium tracking-tight " +
    "bg-[rgb(var(--card))] text-[rgb(var(--fg))] " +
    "border border-[rgb(var(--border))] " +
    "hover:bg-[rgb(var(--card-strong))] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand))] " +
    "transition-colors";

  return (
    <>
      <button
        aria-label="Open navigation"
        className="md:hidden p-2 rounded-md border border-[rgb(var(--border))]"
        onClick={() => setOpen(true)}
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[98] md:hidden bg-black/55 backdrop-blur-sm"
              variants={overlay}
              initial="hidden"
              animate="show"
              exit="exit"
              onMouseDown={() => setOpen(false)}
            />

            <motion.div
              key="panel"
              className="fixed inset-0 z-[99] md:hidden grid place-items-end p-1 pr-2"
              variants={panel}
              initial="hidden"
              animate="show"
              exit="exit"
              onMouseDown={() => setOpen(false)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="relative w-[18rem] max-w-[85vw] rounded-lg
                           bg-[rgb(var(--card))] text-[rgb(var(--fg))]
                           border border-[rgb(var(--border))] shadow-xl p-2"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {/* Header row: "Menu" + Close */}
                <div className="flex items-center justify-end gap-2 pb-2">
                  <span
                    id="mobile-menu-title"
                    className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--muted))]"
                  >
                    Menu
                  </span>
                  <button
                    ref={closeBtnRef}
                    aria-label="Close navigation"
                    className="p-2 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg))]"
                    onClick={() => setOpen(false)}
                  >
                    <X size={16} />
                  </button>
                </div>

                <nav
                  className="flex flex-col gap-1.5"
                  aria-labelledby="mobile-menu-title"
                >
                  <Link href="/" onClick={handleHomeClick} className={itemCls}>
                    Home
                  </Link>
                  {items.map(({ href, label, external }) =>
                    external ? (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setOpen(false)}
                        className={itemCls}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={itemCls}
                      >
                        {label}
                      </Link>
                    )
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
