/**
 * Four 8px L-brackets at the corners of a frame — registration marks.
 *
 * Hero panel and media figures ONLY: three or four instances per page is the
 * ceiling. Past that the device stops reading as precision and starts reading
 * as decoration. See design/flight-deck/SPEC.md §4.9.
 *
 * The parent must be `relative`.
 */
export default function CornerMarks() {
  return (
    <span aria-hidden="true">
      <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-accent" />
      <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t border-accent" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l border-accent" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-accent" />
    </span>
  );
}
