import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Small mono eyebrow above the heading. */
  eyebrow?: string;
  /** Optional right-aligned link, e.g. "See full experience". */
  action?: { label: string; href: string };
  /** Heading level. Defaults to h2 — only pass h3 for genuinely nested sections. */
  as?: "h2" | "h3";
  className?: string;
};

/**
 * Consistent section header. Using this everywhere keeps the document outline
 * correct (h1 per page, h2 per section) instead of the ad-hoc mix of levels
 * the pages previously used.
 */
export default function SectionHeading({
  children,
  eyebrow,
  action,
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 ${className}`}>
      <div>
        {eyebrow && <div className="label mb-2">{eyebrow}</div>}
        <Tag className="text-h2 font-semibold text-ink">{children}</Tag>
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-small font-medium text-accent underline-offset-4 hover:underline"
        >
          {action.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
