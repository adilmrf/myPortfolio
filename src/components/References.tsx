import type { Recommendation } from "../content/recommendations";
import Panel from "./ui/Panel";
import { LinkedInIcon } from "./icons";

/**
 * Static grid of referees.
 *
 * Replaces the previous auto-playing carousel, which advanced every three
 * seconds with no pause control (a WCAG 2.2.2 failure), hid its arrows below
 * the `md` breakpoint, and called four hooks after two early returns.
 * Five entries fit on one screen, so there was never anything to scroll.
 */
export default function References({ items }: { items: Recommendation[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => (
        <Panel
          as="li"
          key={r.linkedin}
          label="Reference"
          meta={`${String(i + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}
          className="flex flex-col"
        >
          <div className="text-h3 font-display font-semibold leading-snug text-ink">{r.name}</div>
          <div className="mt-1 text-small text-ink-muted">{r.title}</div>
          <div className="label mt-3">{r.affiliation}</div>
          <a
            href={r.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="micro mt-4 inline-flex items-center gap-2 font-medium text-accent transition-colors duration-100 hover:text-accent-hover"
          >
            <LinkedInIcon />
            <span>
              LinkedIn
              <span className="sr-only"> profile for {r.name}</span>
            </span>
          </a>
        </Panel>
      ))}
    </ul>
  );
}
