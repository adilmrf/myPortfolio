import { PROJECTS } from "../content/projects";
import type { Project } from "./types";

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectById(id?: string): Project | undefined {
  if (!id) return undefined;
  const normalizedId = id.replace(/\/$/, "");
  return PROJECTS.find((p) => p.id === normalizedId);
}

/**
 * The year a project is dated to, for the index list.
 *
 * Read off the publication or presentation venue rather than stored as a
 * field: "IAC 2024, Milan, Italy" -> 2024. If a project ever gains several
 * venues across years, the latest wins, since that is when the work last
 * stood up in public.
 *
 * Returns undefined rather than guessing when there is nothing to read.
 */
export function getProjectYear(project: Project): string | undefined {
  const years = [
    ...(project.publications?.map((p) => p.year) ?? []),
    ...project.presentations.flatMap((p) => {
      const match = p.match(/\b(19|20)\d{2}\b/);
      return match ? [Number(match[0])] : [];
    }),
  ];

  if (years.length === 0) return undefined;
  return String(Math.max(...years));
}
