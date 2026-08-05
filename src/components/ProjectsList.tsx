"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { parseTagsFromSearchParams } from "../lib/tagQuery";
import { toIndexEntries } from "../lib/projectEntries";
import IndexList from "./ui/IndexList";
import type { Project } from "../lib/types";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const selected = React.useMemo(() => parseTagsFromSearchParams(searchParams), [searchParams]);

  const filtered = selected.length
    ? projects.filter((p) => (p.tags ?? []).some((t) => selected.includes(t)))
    : projects;

  if (filtered.length === 0) {
    return (
      <p className="text-small text-ink-muted">
        No projects match those tags. Clear a filter to see everything.
      </p>
    );
  }

  return <IndexList entries={toIndexEntries(filtered)} />;
}
