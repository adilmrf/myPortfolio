/**
 * Project-wide domain types and small helpers.
 * Keep these strict so content files are easy to validate.
 */

export const TAGS = [
  "Propulsion",
  "UAVs",
  "AIT",
  "Systems",
  "Research",
  "GNC",
  "Structures",
  "3D Printing",
  "Controls",
  "Sustainability",
  "Space"
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
  media?: {
    type: "image" | "video";
    src: string;
    alt?: string;
    caption?: string;
  }[]; // media objects (images or videos) served from /public
  // Optional lightweight thumbnail for list views
  thumbnail?: {
    src: string;
    alt?: string;
  };
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
 * Education entries for the Home page.
 */
export interface EducationItem {
  id: ID;
  degree: string;
  institution: string;
  startDate: string; // ISO-ish (YYYY) or human readable
  endDate?: string; // empty for present
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
