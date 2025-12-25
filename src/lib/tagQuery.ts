/**
 * Small helpers to parse/serialize tag list in URL query params.
 * Keep these functions pure and framework-agnostic so they can be tested.
 */

export function normalizeTags(list: Iterable<string> | undefined): string[] {
  if (!list) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of list) {
    const s = String(t).trim();
    if (!s) continue;
    if (!seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  }
  return out;
}

export function serializeTagsToQuery(tags: Iterable<string> | undefined): string {
  const list = normalizeTags(tags);
  return encodeURIComponent(list.join(","));
}

/**
 * Accepts either a SearchParams-like object or a raw string and returns array of tags.
 * - If `searchParams` is an object with a `tags` key, it supports string or string[].
 */
export function parseTagsFromSearchParams(searchParams: any): string[] {
  if (!searchParams) return [];

  // Guard against a Promise-like value (some Next internals may present a thenable)
  if (typeof searchParams.then === "function") return [];

  // If SearchParams instance (browser URLSearchParams or similar)
  try {
    if (typeof searchParams.get === "function") {
      const raw = searchParams.get("tags");
      if (!raw) return [];
      return normalizeTags(raw.split(","));
    }
  } catch (e) {
    // ignore and continue to object handling
  }

  // If plain object ({ tags?: string | string[] })
  const raw = searchParams.tags ?? searchParams.get?.("tags");
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return normalizeTags(raw.flatMap((r) => String(r).split(",")));
  }
  return normalizeTags(String(raw).split(","));
}

export function toggleTag(list: string[] | undefined, tag: string): string[] {
  const current = new Set(normalizeTags(list));
  if (current.has(tag)) {
    current.delete(tag);
  } else {
    current.add(tag);
  }
  return Array.from(current);
}
