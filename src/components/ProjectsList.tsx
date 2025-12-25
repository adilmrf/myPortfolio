"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { parseTagsFromSearchParams } from "../lib/tagQuery";
import ProjectListCard from "./ProjectListCard";
import type { Project } from "../lib/types";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const selected = React.useMemo(() => parseTagsFromSearchParams(searchParams), [searchParams]);

  const filtered = selected.length
    ? projects.filter((p) => (p.tags ?? []).some((t) => selected.includes(t)))
    : projects;

  return (
    <div className="sm:col-span-2 grid gap-4">
      {filtered.map((p) => (
        <ProjectListCard key={p.id} project={p} />
      ))}
    </div>
  );
}
