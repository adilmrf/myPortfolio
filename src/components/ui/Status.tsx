type Props = {
  /** `active` = ongoing. `complete` = finished or past. Semantic, never decorative. */
  variant: "active" | "complete";
  /** Overrides the default word. Keep it to one or two words. */
  label?: string;
  /**
   * Adds the 2s opacity pulse. AT MOST ONE PER PAGE — it belongs on the hero
   * and nowhere else. Disabled by the reduced-motion block in globals.css.
   */
  pulse?: boolean;
  className?: string;
};

/**
 * A status indicator: a 6px square (not a circle — there are no pills in this
 * system) plus a word.
 *
 * Colour is never the only carrier of meaning here: the square is decorative
 * and aria-hidden, and the word does the work for assistive tech.
 */
export default function Status({ variant, label, pulse = false, className = "" }: Props) {
  const isActive = variant === "active";
  const text = label ?? (isActive ? "Active" : "Complete");

  return (
    <span
      className={[
        "micro inline-flex items-center gap-2 rounded-[2px] px-1.5 py-0.5 font-medium",
        isActive ? "bg-status-active-wash text-status-active" : "text-status-idle",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-[1px] bg-current ${pulse ? "status-pulse" : ""}`}
      />
      {text}
    </span>
  );
}
