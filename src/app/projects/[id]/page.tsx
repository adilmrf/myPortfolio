// Project detail page (single-source content rendering)
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects, getProjectById } from "../../../lib/projects";
import { withBasePath } from "../../../lib/assetPath";

type Params = { id: string };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = getProjectById(params.id);
  if (!project) return { title: "Project not found" };
  const defaultOg = new URL('../../opengraph-image.svg', import.meta.url).toString();
  const defaultTw = new URL('../../twitter-image.svg', import.meta.url).toString();
  const imageUrl = project.thumbnail?.src ? withBasePath(project.thumbnail.src) : defaultOg;
  return {
    title: `${project.title} \u2014 Adil Mahroof`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [imageUrl],
    } as any,
    twitter: {
      images: [project.thumbnail?.src ? withBasePath(project.thumbnail.src) : defaultTw],
    } as any,
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProjectById(params.id);
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
          <h2 className="text-xl font-medium">Overview</h2>
          <p className="text-sm text-zinc-700">{project.description}</p>

          <h3 className="text-lg font-medium">What I did</h3>
          <p className="text-sm text-zinc-700">Summarize your role, responsibilities, and key contributions here.</p>

          <h3 className="text-lg font-medium">Results</h3>
          <p className="text-sm text-zinc-700">Key outcomes, performance improvements, or metrics.</p>

          {project.links && (
            <div>
              <h4 className="font-medium">Links</h4>
              <ul className="mt-2 list-disc pl-5">
                {project.links.map((l, i) => (
                  <li key={i}><a href={l.url} target="_blank" rel="noreferrer" className="text-blue-600">{l.label}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="md:col-span-1 space-y-4">
          <div className="rounded-md border p-4">
            <h4 className="font-medium">Tools</h4>
            <p className="text-sm text-zinc-700 mt-2">List tools, languages, and processes used (e.g. Python, C, CAD, Hot-fire test rigs).</p>
          </div>

          {project.media && project.media.length > 0 && (
            <div className="rounded-md border p-2">
              <h4 className="font-medium mb-2">Media</h4>
              <div className="space-y-3">
                {project.media.map((m, i) => (
                  <div key={i}>
                    {m.type === "image" ? (
                      <Image src={withBasePath(m.src)} alt={m.alt ?? project.title} width={800} height={500} className="rounded" />
                    ) : (
                      <video controls className="w-full rounded">
                        <source src={withBasePath(m.src)} />
                      </video>
                    )}
                    {m.caption && <div className="text-xs text-zinc-600 mt-1">{m.caption}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>

      <footer className="mt-8 flex items-center justify-between">
        <div className="flex gap-4">
          {prev && <Link href={`/projects/${prev.id}`} className="text-sm text-zinc-600 hover:underline">&larr; {prev.title}</Link>}
        </div>
        <div className="flex gap-4">
          {next && <Link href={`/projects/${next.id}`} className="text-sm text-zinc-600 hover:underline">{next.title} &rarr;</Link>}
        </div>
      </footer>
    </article>
  );
}
