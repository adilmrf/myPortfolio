"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  label: string;
};

/**
 * A filter tag.
 *
 * Square-cornered and outlined rather than a filled pill. `rounded-full` was
 * the most generic element on the old site and dropping it does a lot of the
 * work of making the rest read as designed rather than defaulted.
 *
 * Selection changes border AND fill AND text colour, and carries
 * `aria-pressed`, so colour is never the only carrier of state.
 */
export default function TagChip({ selected = false, label, className = "", ...rest }: Props) {
  return (
    <button
      {...rest}
      type="button"
      aria-pressed={selected}
      className={`micro inline-flex min-h-8 items-center rounded-[2px] border px-2.5 py-1 font-medium transition-colors duration-100 ${
        selected
          ? "border-accent bg-accent-wash text-accent"
          : "border-line text-ink-subtle hover:border-line-strong hover:text-ink-muted"
      } ${className}`}
    >
      {label}
    </button>
  );
}
