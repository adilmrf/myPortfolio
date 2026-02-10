/**
 * Project-wide domain types and small helpers.
 * Keep these strict so content files are easy to validate.
 */

export const TAGS = [
  "Propulsion",
  "UAVs",
  "AIT",
  "Systems Engineering",
  "Research",
  "GNC",
  "3D Printing",
  "Control",
  "Sustainability",
  "Space",
  "AI"
] as const;

export type Tag = typeof TAGS[number];

export type ID = string;

export interface LinkItem {
  label: string;
  url: string;
}

/**
 * Project content shape.
 */
export interface Project {
  id: ID;
  title: string;
  summary: string;
  responsibilities: string[];
  results: string[];
  presentations: string[];
  tags: Tag[];
  links?: LinkItem[];
}

/**
 * Experience / roles timeline item.
 */
export interface ExperienceItem {
  id: ID;
  role: string;
  organization: string;
  logo?: string; // /public path for organization logo
  startDate: string; // ISO-ish (YYYY-MM) or human readable
  endDate?: string; // empty for present
  bullets: string[];
  tags?: Tag[];
}

/**
 * Education entries for the Home page.
 */
export interface EducationItem {
  id: ID;
  degree: string;
  institution: string;
  logo?: string; // /public path for institution logo
  startDate: string; // ISO-ish (YYYY) or human readable
  endDate?: string; // empty for present
  grade?: string; // GPA or grade
  notes?: string;
}

/**
 * Profile for the person / hero section.
 */
export interface Profile {
  name: string;
  headline: string;
  location?: string;
  summary?: string;
  skills?: string[];
  hobbies?: string[];
  languages?: string[];
  links?: {
    github?: string;
    linkedin?: string;
    email?: string;
    [key: string]: string | undefined;
  };
  // Small highlight/key-stats area for Home
  highlights?: { label: string; value: string; detail?: string }[];
}

export type { TAGS as ALL_TAGS };
