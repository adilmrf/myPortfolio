import type { Metadata } from "next";
import { PROFILE } from "../content/profile";
import { PROJECTS } from "../content/projects";
import ProjectListCard from "../components/ProjectListCard";
import { TAGS } from "../lib/types";

export const metadata: Metadata = {
  title: "Home - Aerospace Portfolio",
  description: "Home — featured projects and short profile summary.",
  openGraph: {
    images: [new URL('./opengraph-image.svg', import.meta.url).toString()],
  } as any,
  twitter: {
    images: [new URL('./twitter-image.svg', import.meta.url).toString()],
  } as any,
};

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">{PROFILE.name}</h1>
        <p className="text-zinc-700 mt-2 text-lg">{PROFILE.headline} — multidisciplinary systems, propulsion, and embedded software.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold">Highlights</h2>
        <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE.highlights?.map((h) => (
            <div key={h.label} className="rounded-md border p-3 bg-white/90">
              <div className="text-xs text-zinc-500">{h.label}</div>
              <div className="text-lg font-semibold">{h.value}</div>
              {h.detail && <div className="text-sm text-zinc-600">{h.detail}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <ProjectListCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-medium uppercase text-zinc-500">Domains</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <span key={t} className="rounded bg-zinc-100 px-2 py-1 text-xs">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
