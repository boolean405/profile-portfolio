// src/components/Button.tsx
"use client";
import Link from "next/link";
import { forwardRef } from "react";
import clsx from "clsx";

type ButtonAs = typeof Link | "a";

type Props = {
  as?: ButtonAs;
  href?: string;
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(
    { className, as: As, href, variant = "primary", ...props },
    ref
  ) {
    const base =
      "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium";
    const styles =
      variant === "secondary"
        ? "bg-transparent border border-black/10"
        : "bg-[rgb(var(--brand))] text-white";

    // Anchor or Next Link
    if (As && href) {
      if (As === "a") {
        return (
          <a
            href={href}
            className={clsx(base, styles, className)}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          >
            {props.children}
          </a>
        );
      }
      const L = As as typeof Link;
      return (
        <L href={href} className={clsx(base, styles, className)}>
          {props.children}
        </L>
      );
    }

    // Plain button
    return (
      <button
        ref={ref as unknown as React.Ref<HTMLButtonElement>}
        className={clsx(base, styles, className)}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);
