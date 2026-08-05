import type { Readout as ReadoutData } from "../../lib/types";

/**
 * A single measurement — the signature component of the system.
 *
 * Every value shown here must be true and traceable to a content file. There
 * is no decorative telemetry in this design; see the anti-gimmick rules in
 * design/flight-deck/SPEC.md §1.
 */
function Readout({ item, accent = false }: { item: ReadoutData; accent?: boolean }) {
  return (
    <div className="border-b border-line px-4 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div
        className={`font-mono text-readout font-bold tabular ${accent ? "text-accent" : "text-ink"}`}
      >
        {item.value}
        {item.unit && (
          <span className="ml-0.5 text-label tracking-[0.06em] text-ink-subtle">{item.unit}</span>
        )}
      </div>
      <div className="label mt-3">{item.label}</div>
      {item.detail && <span className="micro mt-0.5 block text-ink-subtle">{item.detail}</span>}
    </div>
  );
}

/**
 * A row of readouts, separated by hairlines rather than gaps.
 *
 * Two columns at mobile, four from `sm`. At most one item may take the accent
 * treatment — usually none.
 */
export default function ReadoutBar({
  items,
  accentIndex,
  className = "",
}: {
  items: ReadoutData[];
  /** Index of the single readout allowed to use the accent colour. */
  accentIndex?: number;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-2 overflow-hidden rounded-[2px] border border-line bg-surface-raised sm:grid-cols-4 ${className}`}
    >
      {items.map((item, i) => (
        <Readout key={item.label} item={item} accent={i === accentIndex} />
      ))}
    </div>
  );
}
