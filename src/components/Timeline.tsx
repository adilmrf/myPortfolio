import Image from "next/image";
import { withBasePath } from "../lib/assetPath";
import { byRecencyDesc, formatDateRange, isOngoing } from "../lib/dates";

export type TimelineItem = {
  id: string;
  /** Role or degree. */
  title: string;
  /** Organisation or institution. */
  subtitle: string;
  logo?: string;
  startDate: string;
  endDate?: string;
  /** GPA / grade, shown as a mono chip. */
  meta?: string;
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
 * A vertical spine timeline.
 *
 * This deliberately replaces the previous horizontal, absolutely-positioned
 * carousel: that version hid its navigation behind `:hover`, which made it
 * completely unusable on touch devices. This one is plain document flow — no
 * refs, no scroll syncing, no JavaScript — so it works at every width and is
 * navigable by keyboard and screen reader for free.
 */
export default function Timeline({ items, limit, compact = false }: Props) {
  const ordered = [...items].sort(byRecencyDesc).slice(0, limit ?? items.length);

  return (
    <ol className="relative mt-6 space-y-8">
      {/* The spine. Sits behind the markers, inset to align with their centres. */}
      <span
        aria-hidden="true"
        className="absolute left-[15px] top-2 bottom-2 w-px bg-line sm:left-[19px]"
      />

      {ordered.map((item) => {
        const ongoing = isOngoing(item.endDate);

        return (
          <li key={item.id} className="relative flex gap-4 sm:gap-5">
            {/* Marker: the org logo when there is one, otherwise a plain dot. */}
            <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-surface-raised sm:h-10 sm:w-10">
              {item.logo ? (
                <Image
                  src={withBasePath(item.logo)}
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <span className="h-2 w-2 rounded-full bg-accent" />
              )}
            </span>

            <div className="min-w-0 flex-1 pb-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="label">{formatDateRange(item.startDate, item.endDate)}</span>
                {ongoing && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-wash px-2 py-0.5 text-label font-medium text-accent">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Current
                  </span>
                )}
              </div>

              <h3 className="mt-1.5 text-h3 font-semibold text-ink">{item.title}</h3>
              <p className="text-small text-ink-muted">{item.subtitle}</p>

              {item.meta && (
                <p className="mt-1.5 font-mono text-label text-ink-subtle">{item.meta}</p>
              )}

              {!compact && item.bullets && item.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-small text-ink-muted">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="relative pl-4">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-line-strong"
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
