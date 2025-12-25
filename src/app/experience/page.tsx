import React from "react";
import type { Metadata } from "next";
import { EXPERIENCE } from "../../content/experience";
import TagFilter from "../../components/TagFilter";
import TAG_LIST from "../../content/tags";
import ExperienceList from "../../components/ExperienceList";

export const metadata: Metadata = {
  title: "Experience - Adil Mahroof",
  description: "Professional experience and roles.",
  openGraph: {
    images: [new URL('../opengraph-image.svg', import.meta.url).toString()],
  } as any,
  twitter: {
    images: [new URL('../twitter-image.svg', import.meta.url).toString()],
  } as any,
};

export default function ExperiencePage() {
  return (
    <section className="py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Experience</h1>
          <div className="text-sm text-zinc-600">Showing {EXPERIENCE.length} roles</div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <aside className="sm:col-span-1">
            <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading filters...</div>}>
              <TagFilter allTags={TAG_LIST} />
            </React.Suspense>
          </aside>

          <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading experiences...</div>}>
            <ExperienceList experiences={EXPERIENCE} />
          </React.Suspense>
        </div>
      </div>
    </section>
  );
}
