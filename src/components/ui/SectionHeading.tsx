import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Optional right-aligned link, e.g. "See full experience". */
  action?: { label: string; href: string };
  /** Heading level. Defaults to h2 — only pass h3 for genuinely nested sections. */
  as?: "h2" | "h3";
  className?: string;
};

/**
 * Consistent section header, prefixed with a mono `>` prompt marker.
 *
 * The `eyebrow` prop the previous version carried is gone: with the prompt
 * marker plus the mono/sans split already signalling structure, a second line
 * of label above every heading was noise.
 */
export default function SectionHeading({
  children,
  action,
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 ${className}`}>
      <Tag className="flex items-baseline gap-3 text-h2 font-semibold text-ink">
        <span aria-hidden="true" className="font-mono text-label font-bold text-accent">
          &gt;
        </span>
        {children}
      </Tag>
      {action && (
        <Link href={action.href} className="label transition-colors duration-100 hover:text-accent">
          {action.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
