import React from "react";
import type { Metadata } from "next";
import { PROJECTS } from "../../content/projects";
import TagFilter from "../../components/TagFilter";
import TAG_LIST from "../../content/tags";
import { parseTagsFromSearchParams } from "../../lib/tagQuery";
import ProjectListCard from "../../components/ProjectListCard";


export const metadata: Metadata = {
    title: "Projects - Aerospace Portfolio",
    description: "List of projects and short summaries.",
};

export default function ProjectsPage({ searchParams }: { searchParams?: Record<string, any> }) {
    const selected = parseTagsFromSearchParams(searchParams ?? {});

    const filtered = selected.length
        ? PROJECTS.filter((p) => p.tags.some((t) => selected.includes(t)))
        : PROJECTS;

    return (
        <section className="py-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Projects</h1>
                    <div className="text-sm text-zinc-600">Showing {filtered.length} of {PROJECTS.length}</div>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    <aside className="sm:col-span-1">
                        {/* TagFilter uses next/navigation hooks; wrap in Suspense for CSR bailout */}
                        <React.Suspense fallback={<div className="text-sm text-zinc-500">Loading filters...</div>}>
                            <TagFilter allTags={TAG_LIST} selectedTags={selected} />
                        </React.Suspense>
                    </aside>

                    <div className="sm:col-span-2 grid gap-4">
                        {filtered.map((p) => (
                            <ProjectListCard key={p.id} project={p} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
