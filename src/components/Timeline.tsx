import Image from "next/image";
import { withBasePath } from "../lib/assetPath";
import { byRecencyDesc, isOngoing, toLogStamp } from "../lib/dates";
import Status from "./ui/Status";

export type TimelineItem = {
  id: string;
  /** Role or degree. */
  title: string;
  /** Organisation or institution. */
  subtitle: string;
  logo?: string;
  startDate: string;
  endDate?: string;
  /** GPA / grade, shown as a mono chip on the right. */
  meta?: string;
  /**
   * Replaces the word in the status pill while the entry is ongoing, e.g.
   * "Part-time". The indicator stays green because the role IS still running —
   * only the label changes.
   */
  statusLabel?: string;
  bullets?: string[];
};

type Props = {
  items: TimelineItem[];
  /** Cap the number rendered. Use on the home page and link to the full list. */
  limit?: number;
  /** Hide bullet lists for a denser summary view. */
  compact?: boolean;
};

/**
 * A mission log.
 *
 * Entries are stacked newest-first with a fixed-width mono date column on the
 * left. There is no vertical spine: the date column *is* the spine, and unlike
 * a decorative rail it carries information.
 *
 * Still zero JavaScript and plain document flow — no refs, no scroll syncing —
 * so it works at every width and is keyboard- and screen-reader-navigable for
 * free. The date column collapses above the entry below `sm`.
 */
export default function Timeline({ items, limit, compact = false }: Props) {
  const ordered = [...items].sort(byRecencyDesc).slice(0, limit ?? items.length);

  return (
    <ol className="mt-6 border-t border-line">
      {ordered.map((item) => {
        const ongoing = isOngoing(item.endDate);

        return (
          <li
            key={item.id}
            className="grid gap-2 border-b border-line py-5 sm:grid-cols-[8ch_1fr] sm:gap-6"
          >
            <div className="label leading-relaxed">
              <span className="sm:block">{toLogStamp(item.startDate)}</span>
              <span aria-hidden="true" className="sm:hidden">
                {" — "}
              </span>
              <span className="block text-ink-muted sm:inline">
                {ongoing ? "Present" : toLogStamp(item.endDate)}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                {item.logo && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-line bg-surface">
                    <Image
                      src={withBasePath(item.logo)}
                      alt=""
                      width={32}
                      height={32}
                      className="h-full w-full object-contain p-1"
                    />
                  </span>
                )}

                <div className="min-w-0">
                  <h3 className="text-h3 font-display font-semibold uppercase tracking-[0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="text-small text-ink-muted">{item.subtitle}</p>
                </div>

                <span className="ml-auto shrink-0">
                  {item.meta ? (
                    <span className="label text-accent">{item.meta}</span>
                  ) : (
                    <Status
                      // A role that carries a commitment word is ongoing but
                      // not a standard full engagement, so it gets the amber
                      // `partial` treatment rather than the green `active` one.
                      variant={ongoing ? (item.statusLabel ? "partial" : "active") : "complete"}
                      label={ongoing ? item.statusLabel : undefined}
                    />
                  )}
                </span>
              </div>

              {!compact && item.bullets && item.bullets.length > 0 && (
                <ul className="mt-3 flex flex-col gap-2 text-small text-ink-muted">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="relative pl-4">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.7em] h-px w-[5px] bg-line-strong"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
