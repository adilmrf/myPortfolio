import type { Metadata } from "next";
import { PROFILE } from "../../content/profile";
import { canonical } from "../../lib/site";
import Panel from "../../components/ui/Panel";
import Rule from "../../components/ui/Rule";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, skills and languages of Adil Mahroof — an aerospace engineering graduate of UAE University with hands-on design, analysis and AIT experience.",
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  const { skills = [], hobbies = [], languages = [] } = PROFILE;

  const LISTS = [
    { heading: "Professional skills", items: skills },
    { heading: "Hobbies", items: hobbies },
    { heading: "Languages", items: languages },
  ];

  return (
    <section>
      <h1 className="text-h1 font-display font-bold uppercase text-ink">About</h1>

      {/* Prose stays capped at 62ch regardless of the 1120px page width. */}
      <p className="mt-5 max-w-[62ch] text-lede text-ink-muted">{PROFILE.summary}</p>

      <Rule className="my-10" />

      <div className="grid gap-4 md:grid-cols-3">
        {LISTS.map(({ heading, items }) =>
          items.length > 0 ? (
            <Panel key={heading} label={heading}>
              <ul className="flex flex-col gap-2 text-small text-ink-muted">
                {items.map((item) => (
                  <li key={item} className="relative pl-4">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.7em] h-px w-[5px] bg-line-strong"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null,
        )}
      </div>
    </section>
  );
}
