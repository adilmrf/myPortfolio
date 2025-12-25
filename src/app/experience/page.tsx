import type { Metadata } from "next";
import { EXPERIENCE } from "../../content/experience";

export const metadata: Metadata = {
  title: "Experience - Aerospace Portfolio",
  description: "Professional experience and roles.",
};

export default function ExperiencePage() {
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">Experience</h1>
      <div className="mt-4 grid gap-4">
        {EXPERIENCE.map((e) => (
          <article key={e.id} className="rounded-md border p-4">
            <h2 className="font-medium text-lg">{e.role} — {e.organization}</h2>
            <p className="text-sm text-zinc-600">{e.startDate} — {e.endDate ?? 'Present'}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
