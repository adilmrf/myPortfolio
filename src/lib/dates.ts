/**
 * Date helpers for the content files.
 *
 * Content stores dates as `MM.YYYY` (e.g. "08.2025"), with an empty or
 * "Present" end date meaning ongoing. That format is ambiguous to read, so it
 * is parsed here and rendered as "Aug 2025" rather than surfaced raw.
 */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const PRESENT = /^present$/i;

/** Sortable key: year * 12 + month. Ongoing dates sort above everything. */
export function toSortKey(value: string | undefined): number {
  if (!value) return -1;
  if (PRESENT.test(value.trim())) return Number.MAX_SAFE_INTEGER;
  const match = value.trim().match(/^(\d{1,2})\.(\d{4})$/);
  if (!match) {
    const yearOnly = value.trim().match(/^(\d{4})$/);
    return yearOnly ? Number(yearOnly[1]) * 12 : -1;
  }
  return Number(match[2]) * 12 + Number(match[1]);
}

/** "08.2025" -> "Aug 2025". Unrecognised input is returned untouched. */
export function formatDate(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (PRESENT.test(trimmed)) return "Present";
  const match = trimmed.match(/^(\d{1,2})\.(\d{4})$/);
  if (!match) return trimmed;
  const month = MONTHS[Number(match[1]) - 1];
  return month ? `${month} ${match[2]}` : match[2];
}

/** "08.2020" + "12.2024" -> "Aug 2020 – Dec 2024". Empty end means Present. */
export function formatDateRange(start: string, end?: string): string {
  const from = formatDate(start);
  const to = end ? formatDate(end) : "Present";
  if (!from) return to;
  return `${from} – ${to}`;
}

/**
 * "08.2025" -> "2025.08", for the mission-log date column.
 *
 * Year-first so the column sorts and scans vertically: the years line up and
 * the eye reads down them. Unrecognised input is returned untouched.
 */
export function toLogStamp(value: string | undefined): string {
  if (!value) return "Present";
  const trimmed = value.trim();
  if (PRESENT.test(trimmed)) return "Present";
  const match = trimmed.match(/^(\d{1,2})\.(\d{4})$/);
  if (!match) return trimmed;
  return `${match[2]}.${match[1].padStart(2, "0")}`;
}

/** True while the role is ongoing. */
export function isOngoing(end?: string): boolean {
  return !end || PRESENT.test(end.trim());
}

/**
 * Most recent first, by end date, tie-broken by start date.
 *
 * End date rather than start date, so a degree that ran 2020–2024 outranks a
 * programme that ran 2022–2023. Ongoing items share the maximum end key, so
 * the start-date tiebreak orders them among themselves.
 */
export function byRecencyDesc<T extends { startDate: string; endDate?: string }>(
  a: T,
  b: T,
): number {
  const endDelta = endSortKey(b) - endSortKey(a);
  if (endDelta !== 0) return endDelta;
  return toSortKey(b.startDate) - toSortKey(a.startDate);
}

function endSortKey(item: { startDate: string; endDate?: string }): number {
  // An absent end date means ongoing, which sorts above everything.
  if (isOngoing(item.endDate)) return Number.MAX_SAFE_INTEGER;
  return toSortKey(item.endDate);
}
