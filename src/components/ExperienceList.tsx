"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { parseTagsFromSearchParams } from "../lib/tagQuery";
import type { ExperienceItem as Experience } from "../lib/types";

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const searchParams = useSearchParams();
  const selected = React.useMemo(() => parseTagsFromSearchParams(searchParams), [searchParams]);

  const filtered = selected.length
    ? experiences.filter((e) => (e.tags ?? []).some((t) => selected.includes(t)))
    : experiences;

  return (
    <div className="sm:col-span-2 grid gap-4">
      {filtered.map((e) => (
        <article key={e.id} className="rounded-md border p-4 hover:shadow-md transition-shadow">
          <h2 className="font-medium text-lg">{e.role} — {e.organization}</h2>
          <p className="text-sm text-zinc-600">{e.startDate} — {e.endDate ?? 'Present'}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
            {e.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
