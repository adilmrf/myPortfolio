import React from "react";
import type { Metadata } from "next";
import { EXPERIENCE } from "../../content/experience";
import TagFilter from "../../components/TagFilter";
import TAG_LIST from "../../content/tags";
import { parseTagsFromSearchParams } from "../../lib/tagQuery";

export const metadata: Metadata = {
  title: "Experience - Aerospace Portfolio",
  description: "Professional experience and roles.",
};

export default function ExperiencePage({ searchParams }: { searchParams?: Record<string, any> }) {
  const selected = parseTagsFromSearchParams(searchParams ?? {});

  const filtered = selected.length
    ? EXPERIENCE.filter((e) => (e.tags ?? []).some((t) => selected.includes(t)))
    : EXPERIENCE;

  return (
    <section className="py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Experience</h1>
          <div className="text-sm text-zinc-600">Showing {filtered.length} of {EXPERIENCE.length}</div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <aside className="sm:col-span-1">
            <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading filters...</div>}>
              <TagFilter allTags={TAG_LIST} selectedTags={selected} />
            </React.Suspense>
          </aside>

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
        </div>
      </div>
    </section>
  );
}
