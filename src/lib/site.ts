/**
 * Single source of truth for site-level identity and absolute URLs.
 *
 * The deployed origin is derived from the same GitHub Actions variables that
 * `next.config.ts` uses to compute `basePath`, so local dev and the Pages
 * build both resolve correctly without any hardcoded environment switch.
 */

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const owner = process.env.GITHUB_REPOSITORY?.split("/")[0] ?? "";
const isPages = process.env.GITHUB_PAGES === "true";

/**
 * Origin only — no basePath. Next.js prepends `basePath` itself when it
 * resolves file-convention metadata images against `metadataBase`.
 */
export const SITE_ORIGIN =
  isPages && owner ? `https://${owner}.github.io` : "http://localhost:3000";

/** Full public URL of the site, including basePath. Used for canonical + JSON-LD. */
export const SITE_URL =
  isPages && repo ? `${SITE_ORIGIN}/${repo}` : SITE_ORIGIN;

export const SITE_NAME = "Adil Mahroof — Aerospace Engineer";

/**
 * Absolute canonical URL for a route.
 * `path` is the route without basePath, e.g. "/about" or "/projects/vtol-uav".
 * Trailing slash matches `trailingSlash: true` in next.config.ts.
 */
export function canonical(path = "/"): string {
  const clean = path === "/" ? "" : `${path.replace(/^\/|\/$/g, "")}/`;
  return `${SITE_URL}/${clean}`;
}

export const SITE_DESCRIPTION =
  "Aerospace engineer working across rocket propulsion, UAVs and satellite assembly, integration and testing. Projects, research and experience from the UAE.";
