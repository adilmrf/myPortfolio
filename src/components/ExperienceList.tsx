"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { parseTagsFromSearchParams } from "../lib/tagQuery";
import type { ExperienceItem as Experience } from "../lib/types";
import Image from "next/image";
import { withBasePath } from "../lib/assetPath";

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const searchParams = useSearchParams();
  const selected = React.useMemo(() => parseTagsFromSearchParams(searchParams), [searchParams]);

  const filtered = selected.length
    ? experiences.filter((e) => (e.tags ?? []).some((t) => selected.includes(t)))
    : experiences;

  return (
    <div className="grid gap-4">
      {filtered.map((e) => (
        <article key={e.id} className="rounded-md border p-4 bg-white/90 hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            {e.logo && (
              <Image
                src={withBasePath(e.logo)}
                alt={`${e.organization} logo`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-md object-contain bg-white/90 dark:bg-zinc-900"
              />
            )}
            <div className="min-w-0">
              <h2 className="font-medium text-[18px] break-words">{e.role}</h2>
              <p className="text-[18px] text-zinc-600 dark:text-zinc-400 break-words">{e.organization}</p>
              <p className="text-[18px] text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{e.startDate} {"\u2014"} {e.endDate ?? "Present"}</p>
            </div>
          </div>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-200 break-words">
            {e.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
