import Link from "next/link";
import type { Project } from "../lib/types";
import MediaThumb from "./MediaThumb";
import { ArrowRightIcon } from "./icons";

export default function ProjectListCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-lg border border-line bg-surface-raised transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lg hover:shadow-black/5"
    >
      <div className="sm:flex">
        <div className="sm:w-48 sm:shrink-0">
          <MediaThumb project={project} className="h-full w-full" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-5">
          <h3 className="text-h3 font-semibold leading-snug text-ink">{project.title}</h3>
          <p className="mt-2 text-small text-ink-muted">{project.summary}</p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
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
            <span className="inline-flex items-center gap-1.5 text-small font-medium text-accent">
              View more
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
