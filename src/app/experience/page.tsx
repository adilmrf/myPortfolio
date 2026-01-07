import React from "react";
import type { Metadata } from "next";
import { EXPERIENCE } from "../../content/experience";
import TagFilter from "../../components/TagFilter";
import TagDropdown from "../../components/TagDropdown";
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
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">Experience</h1>
          <div className="text-sm text-zinc-600 text-right dark:text-zinc-300">
            <div>Showing {EXPERIENCE.length} roles</div>
            <div className="mt-2">
              <TagDropdown allTags={TAG_LIST} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:-mx-6">
          <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading experiences...</div>}>
            <ExperienceList experiences={EXPERIENCE} />
          </React.Suspense>
        </div>
      </div>
    </section>
  );
}
