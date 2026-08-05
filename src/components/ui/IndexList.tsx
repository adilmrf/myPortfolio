import Link from "next/link";
import type { ReactNode } from "react";

export type IndexEntry = {
  id: string;
  href: string;
  title: string;
  summary?: string;
  /** Mono meta shown on the right, e.g. a year. */
  meta?: string;
  /** Rendered under the right-hand meta. Usually a <Status />. */
  status?: ReactNode;
  tags?: string[];
};

/**
 * A numbered list of entries — projects, missions, publications.
 *
 * Replaces the previous card grid. A table scans better than cards at five
 * items and would still scan well at fifty. Rows are separated by hairlines
 * rather than gaps, and the whole row is the link target at a 56px minimum
 * height for touch.
 *
 * The bracketed index is decorative and aria-hidden, so a screen reader hears
 * the title rather than "left bracket zero one right bracket".
 */
export default function IndexList({ entries }: { entries: IndexEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <ol className="border-t border-line">
      {entries.map((entry, i) => (
        <li key={entry.id} className="border-b border-line">
          <Link
            href={entry.href}
            className="group grid min-h-14 grid-cols-[auto_1fr] gap-x-4 gap-y-2 px-3 py-4 transition-colors duration-100 hover:bg-surface md:grid-cols-[auto_1fr_auto] md:items-start"
          >
            <span
              aria-hidden="true"
              className="pt-[3px] font-mono text-label font-medium tracking-[0.08em] tabular text-accent transition-colors duration-100 group-hover:text-accent-hover"
            >
              [{String(i + 1).padStart(2, "0")}]
            </span>

            <div className="min-w-0">
              <h3 className="text-h3 font-display font-semibold text-balance text-ink">
                {entry.title}
              </h3>
              {entry.summary && (
                <p className="mt-1 text-small text-ink-muted">{entry.summary}</p>
              )}
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.tags.map((t) => (
                    <span
                      key={t}
                      className="micro rounded-[2px] border border-line px-1.5 py-[3px] text-ink-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {(entry.meta || entry.status) && (
              <div className="col-span-full mt-2 flex items-center gap-3 md:col-auto md:mt-0 md:justify-end md:pt-[3px]">
                {entry.meta && <span className="label">{entry.meta}</span>}
                {entry.status}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ol>
  );
}
