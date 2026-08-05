"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import TagChip from "./TagChip";
import { parseTagsFromSearchParams, toggleTag } from "../lib/tagQuery";

type Props = {
  allTags: readonly string[];
  selectedTags?: string[];
  onChange?: (next: string[]) => void;
  label?: string;
};

export default function TagFilter({ allTags, selectedTags, onChange, label = "Filter by tags" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname() ?? "/";

  // fallback: derive from URL if selectedTags not provided
  const derived = React.useMemo(() => parseTagsFromSearchParams(searchParams), [searchParams]);
  const selected = selectedTags ?? derived;

  function applyTags(next: string[]) {
    if (onChange) {
      onChange(next);
      return;
    }
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("tags");
    if (next.length) {
      params.set("tags", next.join(","));
    }
    const q = params.toString();
    const href = q ? `${pathname}?${q}` : `${pathname}`;
    router.push(href);
  }

  function handleToggle(tag: string) {
    const next = toggleTag(selected, tag);
    applyTags(next);
  }

  function handleClear() {
    applyTags([]);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-small font-medium text-ink">{label}</p>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-small text-accent underline-offset-4 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((t) => (
          <TagChip
            key={t}
            label={t}
            selected={selected.includes(t)}
            onClick={() => handleToggle(t)}
          />
        ))}
      </div>

      {selected.length > 0 && (
        <p className="mt-2 text-small text-ink-muted">
          <span className="font-medium text-ink">Filtered by:</span>{" "}
          {selected.join(", ")}
        </p>
      )}
    </div>
  );
}
