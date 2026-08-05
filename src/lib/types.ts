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
  "3D Printing",
  "Control",
  "Sustainability",
  "Space",
  "AI",
  "Robotics",
  "Laser-cutting",
  "Programming"
] as const;

export type Tag = typeof TAGS[number];

export type ID = string;

export interface LinkItem {
  label: string;
  url: string;
}

/**
 * A single image. `width`/`height` are required: `images.unoptimized` is on for
 * static export, so next/image cannot infer them and would otherwise cause
 * layout shift.
 */
export interface MediaItem {
  /** Path under /public, e.g. "/media/projects/vtol-uav/01-flight-test.jpg". */
  src: string;
  /** Required. Describe what the image shows, not that it is an image. */
  alt: string;
  /** Shown beneath the image in galleries. */
  caption?: string;
  width: number;
  height: number;
  kind?: "photo" | "cad" | "plot" | "diagram";
}

export interface VideoItem {
  src: string;
  /** Required — a video with no poster shows a black rectangle until played. */
  poster: string;
  caption?: string;
  width: number;
  height: number;
}

export interface Publication {
  title: string;
  venue: string;
  year: number;
  url?: string;
  doi?: string;
}

/** A headline number for the project, e.g. { value: "10", unit: "N", label: "Thrust class" }. */
export interface Metric {
  label: string;
  value: string;
  unit?: string;
}

/**
 * A single measurement in the home-page readout bar.
 *
 * Every value MUST be true and traceable to something else in the content —
 * there is no decorative telemetry in this design. If you cannot point at the
 * source, do not put it here.
 */
export interface Readout {
  /** The number. Keep it short: "10", "×2", "3.95". */
  value: string;
  /** Suffix rendered small and baseline-aligned, e.g. "+" or "mN". */
  unit?: string;
  /** Uppercase mono caption, two or three words. */
  label: string;
  /** Optional second caption line giving the source or context. */
  detail?: string;
}

/**
 * Project content shape.
 */
export interface Project {
  id: ID;
  title: string;
  summary: string;
  /** Optional one-liner about the role held, e.g. "Team lead, 4 engineers". */
  role?: string;
  /** Optional human-readable period, e.g. "2023 – 2024". */
  period?: string;
  /** The problem being solved. Rendered before Approach. */
  context?: string[];
  responsibilities: string[];
  results: string[];
  metrics?: Metric[];
  presentations: string[];
  publications?: Publication[];
  /** Card thumbnail. Falls back to `hero` when absent. */
  thumb?: MediaItem;
  /** Lead image on the detail page. */
  hero?: MediaItem;
  gallery?: MediaItem[];
  videos?: VideoItem[];
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
  /**
   * Overrides the status word on an ongoing role, e.g. "Part-time",
   * "Contract", "Volunteer". Keep it to one or two words — it renders in the
   * 10px status pill. Ignored once the role has an end date, since a finished
   * role always reads "Complete".
   */
  commitment?: string;
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
  /** Job title shown under the name in the hero, e.g. "Aerospace Engineer". */
  role?: string;
  /** Short domain line under the role, e.g. "Rocket Propulsion · UAVs · Satellite AIT". */
  focus?: string;
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
    /** Path under /public to a CV PDF. Omit to hide the download button. */
    resume?: string;
    [key: string]: string | undefined;
  };
  // Small highlight/key-stats area for Home
  highlights?: { label: string; value: string; detail?: string }[];
  /** Four measurements for the home-page readout bar. See the Readout docs. */
  readouts?: Readout[];
}

export type { TAGS as ALL_TAGS };
