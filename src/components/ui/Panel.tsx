import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Mono label in the header bar. Omit for a plain bordered surface. */
  label?: string;
  /** Right-aligned mono meta in the header bar, e.g. "01 / 03". */
  meta?: string;
  /** Render as a different element, e.g. `article` or `li`. */
  as?: ElementType;
  /** Border strengthens and the label goes accent. Only when the whole panel is a link. */
  interactive?: boolean;
  className?: string;
  /** Padding on the body. Set false when the child manages its own. */
  padded?: boolean;
};

/**
 * The base container of the system — a hairline-bordered surface with an
 * optional header bar.
 *
 * Structure comes from 1px lines rather than shadows, and the interactive
 * state deliberately does not lift, scale or cast a shadow: instruments do
 * not bounce. See design/flight-deck/SPEC.md §4.1.
 */
export default function Panel({
  children,
  label,
  meta,
  as: Tag = "div",
  interactive = false,
  padded = true,
  className = "",
}: Props) {
  return (
    <Tag
      className={[
        "rounded-[2px] border border-line bg-surface-raised",
        interactive ? "group/panel transition-colors duration-100 hover:border-line-strong" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <div className="flex items-center justify-between gap-4 border-b border-line bg-surface px-4 py-2">
          <span className="label transition-colors duration-100 group-hover/panel:text-accent">
            {label}
          </span>
          {meta && <span className="label">{meta}</span>}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </Tag>
  );
}
