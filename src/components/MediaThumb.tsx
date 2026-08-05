import Image from "next/image";
import type { Project } from "../lib/types";
import { withBasePath } from "../lib/assetPath";

/**
 * Card thumbnail for a project.
 *
 * Falls back to a deliberate, labelled placeholder when a project has no
 * imagery yet — previously this rendered the project title in grey next to the
 * same title in black, which read as a failed image load.
 */
export default function MediaThumb({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const media = project.thumb ?? project.hero;

  if (media) {
    return (
      <div className={`relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-auto ${className}`}>
        <Image
          src={withBasePath(media.src)}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(max-width: 640px) 100vw, 192px"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex aspect-[4/3] items-center justify-center bg-surface sm:aspect-auto sm:min-h-[9rem] ${className}`}
    >
      <span className="font-mono text-label uppercase tracking-[0.08em] text-ink-subtle">
        {project.tags[0] ?? "Project"}
      </span>
    </div>
  );
}
