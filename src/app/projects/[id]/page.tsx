// Project detail page (single-source content rendering)
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getProjectById, getProjectYear } from "../../../lib/projects";
import { canonical } from "../../../lib/site";
import { withBasePath } from "../../../lib/assetPath";
import Panel from "../../../components/ui/Panel";
import ReadoutBar from "../../../components/ui/Readout";
import Status from "../../../components/ui/Status";
import Rule from "../../../components/ui/Rule";
import CornerMarks from "../../../components/ui/CornerMarks";
import { DataRow, DataRows } from "../../../components/ui/DataRow";
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
    <section className="mt-4">
      <Panel label={title}>{children}</Panel>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 text-body text-ink-muted">
      {items.map((item, i) => (
        <li key={i} className="relative max-w-[62ch] pl-4">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.72em] h-px w-[5px] bg-line-strong"
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
  const year = getProjectYear(project);

  const hasPublications = (project.publications?.length ?? 0) > 0;
  const hasPresentations = project.presentations.length > 0;

  return (
    <article>
      <Link
        href="/projects"
        className="label inline-flex items-center gap-1.5 transition-colors duration-100 hover:text-accent"
      >
        <ArrowLeftIcon className="h-3 w-3" />
        All projects
      </Link>

      <header className="mt-6">
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-label font-medium tracking-[0.08em] tabular text-accent"
          >
            [{String(idx + 1).padStart(2, "0")}]
          </span>
          <h1 className="text-h1 font-display font-bold text-balance text-ink">{project.title}</h1>
        </div>

        <p className="mt-5 max-w-[62ch] text-lede text-ink-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="micro rounded-[2px] border border-line px-1.5 py-[3px] text-ink-subtle"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <DataRows className="mt-8 max-w-[34rem]">
        {project.role && <DataRow label="Role">{project.role}</DataRow>}
        {(project.period || year) && (
          <DataRow label="Period" mono>
            {project.period ?? year}
          </DataRow>
        )}
        {hasPresentations && (
          <DataRow label="Presented" mono>
            {project.presentations[0].replace(/\.$/, "")}
          </DataRow>
        )}
        <DataRow label="Status">
          <Status variant="complete" />
        </DataRow>
      </DataRows>

      {project.metrics && project.metrics.length > 0 && (
        <ReadoutBar
          className="mt-8"
          items={project.metrics.map((m) => ({
            value: m.value,
            unit: m.unit,
            label: m.label,
          }))}
        />
      )}

      {project.hero && (
        <figure className="relative mt-8">
          <CornerMarks />
          <Image
            src={withBasePath(project.hero.src)}
            alt={project.hero.alt}
            width={project.hero.width}
            height={project.hero.height}
            priority
            sizes="(max-width: 1120px) 100vw, 1056px"
            className="w-full rounded-[2px] border border-line object-cover"
          />
          {project.hero.caption && (
            <figcaption className="label mt-3">{project.hero.caption}</figcaption>
          )}
        </figure>
      )}

      <Rule className="my-10" />

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
              className="w-full rounded-[2px] border border-line"
            >
              <source src={withBasePath(video.src)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {video.caption && <figcaption className="label mt-3">{video.caption}</figcaption>}
          </figure>
        </Block>
      ))}

      {(hasPublications || hasPresentations) && (
        <Block title="Publications & presentations">
          <ul className="flex flex-col gap-3 text-body text-ink-muted">
            {project.publications?.map((p) => {
              const href = p.url ?? (p.doi ? `https://doi.org/${p.doi}` : undefined);
              return (
                <li key={p.title} className="relative pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.72em] h-px w-[5px] bg-line-strong"
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
                  <span className="label mt-1 block">
                    {p.venue}, {p.year}
                  </span>
                </li>
              );
            })}
            {project.presentations.map((item, i) => (
              <li key={i} className="relative pl-4">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.72em] h-px w-[5px] bg-line-strong"
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
                  className="label inline-flex min-h-11 items-center rounded-[2px] border border-line-strong px-4 text-ink transition-colors duration-100 hover:border-accent hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Block>
      )}

      <nav aria-label="More projects" className="mt-14 border-t border-line">
        {prev && (
          <Link
            href={`/projects/${prev.id}`}
            className="group flex min-h-14 items-center gap-4 border-b border-line px-3 py-4 transition-colors duration-100 hover:bg-surface"
          >
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-label font-medium tabular text-accent"
            >
              [{String(idx).padStart(2, "0")}]
            </span>
            <span className="min-w-0">
              <span className="label flex items-center gap-1.5">
                <ArrowLeftIcon className="h-3 w-3" />
                Previous
              </span>
              <span className="mt-1 block text-small text-ink-muted transition-colors duration-100 group-hover:text-ink">
                {prev.title}
              </span>
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={`/projects/${next.id}`}
            className="group flex min-h-14 items-center gap-4 border-b border-line px-3 py-4 transition-colors duration-100 hover:bg-surface"
          >
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-label font-medium tabular text-accent"
            >
              [{String(idx + 2).padStart(2, "0")}]
            </span>
            <span className="min-w-0">
              <span className="label flex items-center gap-1.5">
                Next
                <ArrowRightIcon className="h-3 w-3" />
              </span>
              <span className="mt-1 block text-small text-ink-muted transition-colors duration-100 group-hover:text-ink">
                {next.title}
              </span>
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
