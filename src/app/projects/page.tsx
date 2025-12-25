import React from "react";
import type { Metadata } from "next";
import { PROJECTS } from "../../content/projects";
import TagFilter from "../../components/TagFilter";
import TagDropdown from "../../components/TagDropdown";
import TAG_LIST from "../../content/tags";
import { parseTagsFromSearchParams } from "../../lib/tagQuery";
import ProjectsList from "../../components/ProjectsList";
import ProjectListCard from "../../components/ProjectListCard";


export const metadata: Metadata = {
    title: "Projects - Adil Mahroof",
    description: "List of projects and short summaries.",
       openGraph: {
           images: [new URL('../opengraph-image.svg', import.meta.url).toString()],
       } as any,
       twitter: {
           images: [new URL('../twitter-image.svg', import.meta.url).toString()],
       } as any,
};
// ensure og image
export default function ProjectsPage() {
    return (
        <section className="py-8">
            <div className="flex flex-col gap-6">
                                <div className="flex items-start justify-between">
                                        <h1 className="text-2xl font-semibold">Projects</h1>
                                        <div className="text-sm text-zinc-600 text-right">
                                            <div>Showing {PROJECTS.length} projects</div>
                                            <div className="mt-2">
                                                <TagDropdown allTags={TAG_LIST} />
                                            </div>
                                        </div>
                                </div>

                <div className="grid gap-6">
                    <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading projects...</div>}>
                        <ProjectsList projects={PROJECTS} />
                    </React.Suspense>
                </div>
            </div>
        </section>
    );
}
