import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] px-5 font-mono text-label font-medium uppercase tracking-[0.12em] transition-colors duration-100";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  ghost: "border border-line-strong text-ink hover:border-accent hover:text-accent",
};

function classes(variant: Variant, className: string) {
  return [BASE, VARIANTS[variant], className].filter(Boolean).join(" ");
}

/** Internal navigation. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={classes(variant, className)}>
      {children}
    </Link>
  );
}

/** External or download links. */
export function ButtonAnchor({
  href,
  children,
  variant = "ghost",
  download = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  download?: boolean;
  className?: string;
}) {
  return (
    <a href={href} download={download || undefined} className={classes(variant, className)}>
      {children}
    </a>
  );
}
