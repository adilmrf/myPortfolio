// Project detail page (single-source content rendering)
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProjectById } from "../../../lib/projects";

type Params = { id: string };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);
  if (!project) return { title: "Project not found" };
  const defaultOg = new URL('../../opengraph-image.svg', import.meta.url).toString();
  const defaultTw = new URL('../../twitter-image.svg', import.meta.url).toString();
  return {
    title: `${project.title} \u2014 Adil Mahroof`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [defaultOg],
    } as any,
    twitter: {
      images: [defaultTw],
    } as any,
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);
  if (!project) return notFound();

  const all = getAllProjects();
  const idx = all.findIndex((p) => p.id === project.id);
  const prev = all[idx - 1] ?? null;
  const next = all[idx + 1] ?? null;

  return (
    <article className="py-8">
      <nav className="text-sm text-zinc-600 mb-4">
        <Link href="/projects" className="hover:underline">&larr; Projects</Link>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <p className="mt-2 text-zinc-700">{project.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded bg-zinc-100 px-2 py-1 text-xs">{t}</span>
          ))}
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-medium">Responsibilities</h2>
          <ul className="list-disc pl-5 text-sm text-zinc-700">
            {project.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="text-lg font-medium">Results</h3>
          <ul className="list-disc pl-5 text-sm text-zinc-700">
            {project.results.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="md:col-span-1 space-y-4">
          {project.presentations.length > 0 && (
            <div className="rounded-md border p-4">
              <h4 className="font-medium">Presentations</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
                {project.presentations.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="rounded-md border p-4">
              <h4 className="font-medium">Links</h4>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {project.links.map((l, i) => (
                  <li key={i}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="text-blue-600">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      <footer className="mt-8 flex items-center">
        <div className="flex flex-1 justify-start">
          {prev && (
            <Link
              href={`/projects/${prev.id}`}
              className="inline-flex h-7 w-48 items-center justify-center rounded border border-zinc-200 px-2 text-[11px] text-zinc-600 hover:border-zinc-300 hover:text-zinc-800"
            >
              &larr; {prev.title}
            </Link>
          )}
        </div>
        <div className="flex flex-1 justify-end">
          {next && (
            <Link
              href={`/projects/${next.id}`}
              className="inline-flex h-7 w-48 items-center justify-center rounded border border-zinc-200 px-2 text-[11px] text-zinc-600 hover:border-zinc-300 hover:text-zinc-800"
            >
              {next.title} &rarr;
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
