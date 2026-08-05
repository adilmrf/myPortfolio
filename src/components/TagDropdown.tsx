"use client";

import React from "react";
import TagFilter from "./TagFilter";
import { ChevronDownIcon } from "./icons";

type Props = {
  allTags: readonly string[];
  label?: string;
};

export default function TagDropdown({ allTags, label = "Tags" }: Props) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  // Listeners are attached only while open, and Escape closes and restores
  // focus to the trigger.
  React.useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="tag-filter-panel"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-raised px-3 py-1.5 text-small text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
      >
        {label}
        <ChevronDownIcon
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id="tag-filter-panel"
          className="absolute right-0 z-30 mt-2 w-64 rounded-lg border border-line bg-surface-raised p-4 shadow-xl shadow-black/10 sm:w-72"
        >
          <TagFilter allTags={allTags} />
        </div>
      )}
    </div>
  );
}
