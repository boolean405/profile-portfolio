// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { profile } from "@/data/profile";

export function Navbar() {
  const pathname = usePathname();

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={clsx(
        "px-3 py-2 rounded-lg text-sm md:text-base",
        pathname === href && "bg-black/5 dark:bg-white/10"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-[rgb(var(--bg))]/80 backdrop-blur border-b border-black/10">
      <div className="container-max h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          Boolean
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {link("/", "Home")}
          {/* Use an anchor to scroll to the projects section on the same page */}
          <a
            href="#projects"
            className="px-3 py-2 rounded-lg text-sm md:text-base"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="px-3 py-2 rounded-lg text-sm md:text-base"
          >
            Contact
          </a>
          <a
            href={profile.resume}
            className="px-3 py-2 rounded-lg text-sm md:text-base"
          >
            Download Resume
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
