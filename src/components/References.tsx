import type { Recommendation } from "../content/recommendations";
import Card from "./ui/Card";
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
      {items.map((r) => (
        <Card as="li" key={r.linkedin} className="flex flex-col">
          <div className="text-h3 font-semibold leading-snug text-ink">{r.name}</div>
          <div className="mt-1 text-small text-ink-muted">{r.title}</div>
          <div className="text-small text-ink-muted">{r.affiliation}</div>
          <a
            href={r.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-small font-medium text-accent underline-offset-4 hover:underline"
          >
            <LinkedInIcon />
            <span>
              LinkedIn
              <span className="sr-only"> profile for {r.name}</span>
            </span>
          </a>
        </Card>
      ))}
    </ul>
  );
}
