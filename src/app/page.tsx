import type { Metadata } from "next";
import { PROFILE } from "../content/profile";
import { PROJECTS } from "../content/projects";

export const metadata: Metadata = {
  title: "Home - Aerospace Portfolio",
  description: "Home — featured projects and short profile summary.",
};

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">{PROFILE.name}</h1>
        <p className="text-zinc-700 mt-1">{PROFILE.headline}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <article key={p.id} className="rounded-md border p-4">
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-zinc-700">{p.summary}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-600">
                {p.tags.map((t) => (
                  <span key={t} className="rounded bg-zinc-100 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
