"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Render a stable placeholder until mounted
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-lg border border-black/10"
        aria-hidden
      >
        <Moon size={18} />
      </button>
    );
  }

  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      className="p-2 rounded-lg border border-black/10"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      suppressHydrationWarning
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
