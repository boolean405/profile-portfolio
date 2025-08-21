// src/components/Navbar.tsx
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
// import { getProfile } from "@/services/profile";

export default async function Navbar() {
  // const profile = await getProfile();

  return (
    <header className="sticky top-0 z-50 bg-[rgb(var(--bg))]/80 backdrop-blur border-b border-black/10">
      <div className="container-max h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          Boolean
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/" className="px-3 py-2 rounded-lg text-sm md:text-base">
            Home
          </Link>
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
