"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  label: string;
};

export default function TagChip({ selected = false, label, className = "", ...rest }: Props) {
  return (
    <button
      {...rest}
      type="button"
      aria-pressed={selected}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-small transition-colors ${
        selected
          ? "bg-accent text-accent-contrast"
          : "border border-line bg-surface-raised text-ink-muted hover:border-line-strong hover:text-ink"
      } ${className}`}
    >
      {label}
    </button>
  );
}
