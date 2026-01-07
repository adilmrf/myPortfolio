"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import TagChip from "./TagChip";
import { parseTagsFromSearchParams, serializeTagsToQuery, toggleTag } from "../lib/tagQuery";

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
        <h3 className="text-sm font-medium">{label}</h3>
        {selected.length > 0 && (
          <button onClick={handleClear} className="text-sm text-blue-600 dark:text-blue-400">Clear</button>
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
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          <strong className="mr-1">Filtered by:</strong>
          <span className="inline-block max-w-full truncate">{selected.join(", ")}</span>
        </div>
      )}
    </div>
  );
}
