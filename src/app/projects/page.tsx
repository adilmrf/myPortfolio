import React from "react";
import type { Metadata } from "next";
import { PROJECTS } from "../../content/projects";
import TagFilter from "../../components/TagFilter";
import TAG_LIST from "../../content/tags";
import { parseTagsFromSearchParams } from "../../lib/tagQuery";
import ProjectsList from "../../components/ProjectsList";
import ProjectListCard from "../../components/ProjectListCard";


export const metadata: Metadata = {
    title: "Projects - Aerospace Portfolio",
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
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Projects</h1>
                    <div className="text-sm text-zinc-600">Showing {PROJECTS.length} projects</div>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    <aside className="sm:col-span-1">
                        <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading filters...</div>}>
                            <TagFilter allTags={TAG_LIST} />
                        </React.Suspense>
                    </aside>

                    <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading projects...</div>}>
                        <ProjectsList projects={PROJECTS} />
                    </React.Suspense>
                </div>
            </div>
        </section>
    );
}
