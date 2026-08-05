import type { Metadata } from "next";
import { PROFILE } from "../../content/profile";
import { canonical } from "../../lib/site";
import Card from "../../components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, skills and languages of Adil Mahroof — an aerospace engineering graduate of UAE University with hands-on design, analysis and AIT experience.",
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  const { skills = [], hobbies = [], languages = [] } = PROFILE;

  const LISTS = [
    { heading: "Professional Skills", items: skills },
    { heading: "Hobbies", items: hobbies },
    { heading: "Languages", items: languages },
  ];

  return (
    <section className="py-8">
      <h1 className="text-h1 font-display font-bold text-ink">About</h1>

      <p className="mt-5 max-w-[65ch] text-lede text-ink-muted">{PROFILE.summary}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {LISTS.map(({ heading, items }) =>
          items.length > 0 ? (
            <Card key={heading}>
              <h2 className="label">{heading}</h2>
              <ul className="mt-3 space-y-1.5 text-small text-ink-muted">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ) : null,
        )}
      </div>
    </section>
  );
}
