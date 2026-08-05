// Project detail page (single-source content rendering)
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getProjectById } from "../../../lib/projects";
import { canonical } from "../../../lib/site";
import { withBasePath } from "../../../lib/assetPath";
import Card from "../../../components/ui/Card";
import Gallery from "../../../components/Gallery";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../components/icons";

type Params = { id: string };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: canonical(`/projects/${project.id}`) },
    openGraph: {
      title: project.title,
      description: project.summary,
    },
  };
}

/** Section wrapper so every block on the page gets identical rhythm. */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-h2 font-display font-semibold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-body text-ink-muted">
      {items.map((item, i) => (
        <li key={i} className="relative pl-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);
  if (!project) return notFound();

  const all = getAllProjects();
  const idx = all.findIndex((p) => p.id === project.id);
  const prev = all[idx - 1] ?? null;
  const next = all[idx + 1] ?? null;

  const hasPublications = (project.publications?.length ?? 0) > 0;
  const hasPresentations = project.presentations.length > 0;

  return (
    <article className="py-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-small text-ink-muted transition-colors hover:text-accent"
      >
        <ArrowLeftIcon />
        Projects
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-surface px-2 py-0.5 font-mono text-label text-ink-subtle"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-h1 font-display font-bold text-ink">{project.title}</h1>
        <p className="mt-3 text-lede text-ink-muted">{project.summary}</p>

        {(project.role || project.period) && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {project.role && <span className="label">{project.role}</span>}
            {project.period && <span className="label">{project.period}</span>}
          </div>
        )}
      </header>

      {project.hero && (
        <figure className="mt-8">
          <Image
            src={withBasePath(project.hero.src)}
            alt={project.hero.alt}
            width={project.hero.width}
            height={project.hero.height}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full rounded-lg border border-line object-cover"
          />
          {project.hero.caption && (
            <figcaption className="mt-2 text-small text-ink-subtle">
              {project.hero.caption}
            </figcaption>
          )}
        </figure>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((m) => (
            <Card key={m.label}>
              <dt className="label">{m.label}</dt>
              <dd className="mt-1.5 text-h2 font-display font-semibold text-ink">
                {m.value}
                {m.unit && (
                  <span className="ml-1 text-h3 font-normal text-ink-muted">{m.unit}</span>
                )}
              </dd>
            </Card>
          ))}
        </dl>
      )}

      {project.context && project.context.length > 0 && (
        <Block title="Context">
          <BulletList items={project.context} />
        </Block>
      )}

      <Block title="Approach">
        <BulletList items={project.responsibilities} />
      </Block>

      <Block title="Results">
        <BulletList items={project.results} />
      </Block>

      {project.gallery && project.gallery.length > 0 && (
        <Block title="Gallery">
          <Gallery items={project.gallery} />
        </Block>
      )}

      {project.videos?.map((video) => (
        <Block key={video.src} title="Video">
          <figure>
            <video
              controls
              preload="none"
              poster={withBasePath(video.poster)}
              width={video.width}
              height={video.height}
              className="w-full rounded-lg border border-line"
            >
              <source src={withBasePath(video.src)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {video.caption && (
              <figcaption className="mt-2 text-small text-ink-subtle">{video.caption}</figcaption>
            )}
          </figure>
        </Block>
      ))}

      {(hasPublications || hasPresentations) && (
        <Block title="Publications & presentations">
          <ul className="space-y-3 text-body text-ink-muted">
            {project.publications?.map((p) => {
              const href = p.url ?? (p.doi ? `https://doi.org/${p.doi}` : undefined);
              return (
                <li key={p.title} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
                    >
                      {p.title}
                    </a>
                  ) : (
                    <span className="font-medium text-ink">{p.title}</span>
                  )}
                  <span className="block text-small">
                    {p.venue}, {p.year}
                  </span>
                </li>
              );
            })}
            {project.presentations.map((item, i) => (
              <li key={i} className="relative pl-5">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {project.links && project.links.length > 0 && (
        <Block title="Links">
          <ul className="flex flex-wrap gap-3">
            {project.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-small font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Block>
      )}

      <nav
        aria-label="More projects"
        className="mt-14 grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.id}`}
            className="group flex min-h-[3.5rem] flex-col justify-center rounded-lg border border-line px-4 py-3 transition-colors hover:border-line-strong"
          >
            <span className="label mb-1 flex items-center gap-1.5">
              <ArrowLeftIcon className="h-3 w-3" />
              Previous
            </span>
            <span className="text-small text-ink-muted transition-colors group-hover:text-ink">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/projects/${next.id}`}
            className="group flex min-h-[3.5rem] flex-col justify-center rounded-lg border border-line px-4 py-3 transition-colors hover:border-line-strong sm:text-right"
          >
            <span className="label mb-1 flex items-center gap-1.5 sm:justify-end">
              Next
              <ArrowRightIcon className="h-3 w-3" />
            </span>
            <span className="text-small text-ink-muted transition-colors group-hover:text-ink">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
