import React from "react";
import type { Metadata } from "next";
import { PROJECTS } from "../../content/projects";
import TagDropdown from "../../components/TagDropdown";
import TAG_LIST from "../../content/tags";
import ProjectsList from "../../components/ProjectsList";
import { canonical } from "../../lib/site";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Engineering projects by Adil Mahroof — miniaturised rocket propulsion, hydrogen-peroxide microthrusters, a VTOL UAV, and a biomimetic desalination spacer.",
    alternates: { canonical: canonical("/projects") },
};

export default function ProjectsPage() {
    return (
        <section className="py-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <div className="label mb-2">{PROJECTS.length} projects</div>
                    <h1 className="text-h1 font-display font-bold text-ink">Projects</h1>
                </div>
                <TagDropdown allTags={TAG_LIST} />
            </div>

            <div className="mt-8 grid gap-4">
                <React.Suspense
                    fallback={<div className="text-small text-ink-subtle">Loading projects…</div>}
                >
                    <ProjectsList projects={PROJECTS} />
                </React.Suspense>
            </div>
        </section>
    );
}
