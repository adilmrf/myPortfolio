import React from "react";
import type { Metadata } from "next";
import { PROJECTS } from "../../content/projects";
import TagDropdown from "../../components/TagDropdown";
import TAG_LIST from "../../content/tags";
import ProjectsList from "../../components/ProjectsList";
import Rule from "../../components/ui/Rule";
import { canonical } from "../../lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects by Adil Mahroof — miniaturised rocket propulsion, hydrogen-peroxide microthrusters, a VTOL UAV, and a biomimetic desalination spacer.",
  alternates: { canonical: canonical("/projects") },
};

export default function ProjectsPage() {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label mb-2">
            {String(PROJECTS.length).padStart(2, "0")} entries
          </div>
          <h1 className="text-h1 font-display font-bold uppercase text-ink">Projects</h1>
        </div>
        <TagDropdown allTags={TAG_LIST} />
      </div>

      <Rule className="my-8" />

      <React.Suspense
        fallback={<div className="label">Loading projects…</div>}
      >
        <ProjectsList projects={PROJECTS} />
      </React.Suspense>
    </section>
  );
}
