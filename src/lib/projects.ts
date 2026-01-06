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

export function getFeaturedProjects(): Project[] {
  return PROJECTS;
}
