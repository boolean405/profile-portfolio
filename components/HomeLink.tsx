"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeLink({
  className,
  children = "Home",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      // Already on Home: smoothly scroll to top instead of re-navigating
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // else: allow normal client-side navigation to "/"
  }

  return (
    <Link href="/" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
