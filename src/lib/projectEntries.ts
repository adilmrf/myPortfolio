import type { IndexEntry } from "../components/ui/IndexList";
import { getProjectYear } from "./projects";
import type { Project } from "./types";

/**
 * Maps projects onto index-list rows.
 *
 * Shared by the home page (server) and the filtered projects page (client) so
 * the two lists cannot drift apart. Order follows the content file, which is
 * newest-first — so [01] is the most recent work, not the earliest. Reorder
 * `PROJECTS` in src/content/projects.ts if you want a different sequence.
 */
export function toIndexEntries(projects: Project[]): IndexEntry[] {
  return projects.map((p) => ({
    id: p.id,
    href: `/projects/${p.id}`,
    title: p.title,
    summary: p.summary,
    meta: getProjectYear(p),
    tags: p.tags,
  }));
}
