import type { Metadata } from "next";
import { PROFILE } from "../../content/profile";

export const metadata: Metadata = {
  title: "About - Adil Mahroof",
  description: "Profile and background summary.",
  openGraph: {
    images: [new URL('../opengraph-image.svg', import.meta.url).toString()],
  } as any,
  twitter: {
    images: [new URL('../twitter-image.svg', import.meta.url).toString()],
  } as any,
};

export default function AboutPage() {
  const { skills = [], hobbies = [], languages = [] } = PROFILE;

  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">About</h1>
      <div className="mt-4">
        {/*<h2 className="text-xl font-medium">{PROFILE.name}</h2>*/}
        {/*<p className="text-zinc-700 mt-2">{PROFILE.headline}</p>*/}
        <p className="mt-4 text-sm text-zinc-700">{PROFILE.summary}</p>
        {/* <p className="mt-4 text-sm text-zinc-600">Location: {PROFILE.location}</p> */}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-md border p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Professional Skills</h2>
          {skills.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-zinc-700">
              {skills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-500">Add skills in profile.ts.</p>
          )}
        </div>

        <div className="rounded-md border p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Hobbies</h2>
          {hobbies.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-zinc-700">
              {hobbies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-500">Add hobbies in profile.ts.</p>
          )}
        </div>

        <div className="rounded-md border p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Languages</h2>
          {languages.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-zinc-700">
              {languages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-500">Add languages in profile.ts.</p>
          )}
        </div>
      </div>
    </section>
  );
}
