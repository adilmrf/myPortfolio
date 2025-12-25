import type { Metadata } from "next";
import { PROJECTS } from "../../content/projects";

export const metadata: Metadata = {
  title: "Projects - Aerospace Portfolio",
  description: "List of projects and short summaries.",
};

export default function ProjectsPage() {
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="mt-4 grid gap-4">
        {PROJECTS.map((p) => (
          <article key={p.id} className="rounded-md border p-4">
            <h2 className="font-medium text-lg">{p.title}</h2>
            <p className="text-sm text-zinc-700">{p.summary}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-600">
              {p.tags.map((t) => (
                <span key={t} className="rounded bg-zinc-100 px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
