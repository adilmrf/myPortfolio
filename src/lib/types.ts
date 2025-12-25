/**
 * Project-wide domain types and small helpers.
 * Keep these strict so content files are easy to validate.
 */

export const TAGS = [
  "Propulsion",
  "UAVs",
  "AIT",
  "Systems",
  "Software",
  "Research",
  "GNC",
  "Structures",
  "Manufacturing",
  "Thermal",
  "Controls",
] as const;

export type Tag = typeof TAGS[number];

export type ID = string;

export interface LinkItem {
  label: string;
  url: string;
}

/**
 * Project content shape. `description` may include longer markdown/plain text.
 */
export interface Project {
  id: ID;
  title: string;
  summary: string;
  description?: string;
  tags: Tag[];
  links?: LinkItem[];
  featured?: boolean;
  media?: string[]; // simple array of image paths or urls
}

/**
 * Experience / roles timeline item.
 */
export interface ExperienceItem {
  id: ID;
  role: string;
  organization: string;
  startDate: string; // ISO-ish (YYYY-MM) or human readable
  endDate?: string; // empty for present
  bullets: string[];
  tags?: Tag[];
}

/**
 * Profile for the person / hero section.
 */
export interface Profile {
  name: string;
  headline: string;
  location?: string;
  summary?: string;
  links?: {
    github?: string;
    linkedin?: string;
    email?: string;
    [key: string]: string | undefined;
  };
}

export type { TAGS as ALL_TAGS };
