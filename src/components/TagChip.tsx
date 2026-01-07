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
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        selected
          ? "bg-blue-600 text-white shadow-sm"
          : "border border-zinc-200 bg-white text-zinc-700 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
      } ${className}`}
    >
      {label}
    </button>
  );
}
