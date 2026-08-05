import React from "react";
import type { Metadata } from "next";
import { EXPERIENCE } from "../../content/experience";
import TagDropdown from "../../components/TagDropdown";
import TAG_LIST from "../../content/tags";
import ExperienceList from "../../components/ExperienceList";
import { canonical } from "../../lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles held by Adil Mahroof across satellite AIT at Orbitworks, rocket propulsion at HALCON (EDGE Group), CubeSat instruction, robotics and AI.",
  alternates: { canonical: canonical("/experience") },
};

export default function ExperiencePage() {
  return (
    <section className="py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label mb-2">{EXPERIENCE.length} roles</div>
          <h1 className="text-h1 font-display font-bold text-ink">Experience</h1>
        </div>
        <TagDropdown allTags={TAG_LIST} />
      </div>

      <React.Suspense
        fallback={<div className="mt-8 text-small text-ink-subtle">Loading experience…</div>}
      >
        <ExperienceList experiences={EXPERIENCE} />
      </React.Suspense>
    </section>
  );
}
