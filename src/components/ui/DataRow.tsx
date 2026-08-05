import type { ReactNode } from "react";

/**
 * Label, dot leader, value.
 *
 * Marked up as <dl>/<dt>/<dd> rather than a table, because these are
 * name/value pairs and not tabular data. The leader is a dotted bottom border
 * on a flexible spacer, nudged up to sit on the baseline.
 */
export function DataRow({
  label,
  children,
  mono = false,
}: {
  label: string;
  children: ReactNode;
  /** Set when the value is data (a date, a count) rather than prose. */
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="label shrink-0">{label}</dt>
      <span
        aria-hidden="true"
        className="min-w-6 flex-1 -translate-y-1 border-b border-dotted border-line-strong"
      />
      {/* Not `shrink-0`: a long value (a full location string, a venue) has to
          be allowed to wrap at narrow widths rather than run past the panel
          edge and get clipped. */}
      <dd
        className={`m-0 min-w-0 text-right text-small text-ink ${mono ? "font-mono tabular" : ""}`}
      >
        {children}
      </dd>
    </div>
  );
}

export function DataRows({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <dl className={`flex flex-col gap-3 ${className}`}>{children}</dl>;
}
