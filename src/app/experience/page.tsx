import React from "react";
import type { Metadata } from "next";
import { EXPERIENCE } from "../../content/experience";
import TagDropdown from "../../components/TagDropdown";
import TAG_LIST from "../../content/tags";
import ExperienceList from "../../components/ExperienceList";
import Rule from "../../components/ui/Rule";
import { canonical } from "../../lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles held by Adil Mahroof across satellite AIT at Orbitworks, rocket propulsion at HALCON (EDGE Group), CubeSat instruction, robotics and AI.",
  alternates: { canonical: canonical("/experience") },
};

export default function ExperiencePage() {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label mb-2">
            {String(EXPERIENCE.length).padStart(2, "0")} entries
          </div>
          <h1 className="text-h1 font-display font-bold uppercase text-ink">Log</h1>
        </div>
        <TagDropdown allTags={TAG_LIST} />
      </div>

      <Rule className="my-8" />

      <React.Suspense fallback={<div className="label">Loading experience…</div>}>
        <ExperienceList experiences={EXPERIENCE} />
      </React.Suspense>
    </section>
  );
}
