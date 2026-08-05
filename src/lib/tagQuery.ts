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

/** Minimal shape of the `get`-style search params returned by `useSearchParams()`. */
interface SearchParamsLike {
  get(name: string): string | null;
}

/** Server-component `searchParams` prop shape. */
type SearchParamsObject = Record<string, string | string[] | undefined>;

function isSearchParamsLike(value: object): value is SearchParamsLike {
  return typeof (value as SearchParamsLike).get === "function";
}

/**
 * Reads the `tags` query parameter and returns it as a normalised array.
 *
 * Accepts either the `ReadonlyURLSearchParams` returned by `useSearchParams()`
 * or the plain object a server component receives as its `searchParams` prop.
 */
export function parseTagsFromSearchParams(
  searchParams: SearchParamsLike | SearchParamsObject | null | undefined,
): string[] {
  if (!searchParams) return [];

  if (isSearchParamsLike(searchParams)) {
    const raw = searchParams.get("tags");
    return raw ? normalizeTags(raw.split(",")) : [];
  }

  const raw = searchParams.tags;
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return normalizeTags(raw.flatMap((r) => r.split(",")));
  }
  return normalizeTags(raw.split(","));
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
