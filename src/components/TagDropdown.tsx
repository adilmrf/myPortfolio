"use client";
import React from "react";
import TagFilter from "./TagFilter";

type Props = {
  allTags: readonly string[];
  label?: string;
};

export default function TagDropdown({ allTags, label = "Tags" }: Props) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-md border bg-white/90 text-sm hover:shadow-sm"
      >
        {label} ▾
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 sm:w-72 bg-white rounded-md border p-3 shadow-lg">
          <TagFilter allTags={allTags} />
        </div>
      )}
    </div>
  );
}
