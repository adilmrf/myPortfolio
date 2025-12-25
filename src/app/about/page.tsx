import type { Metadata } from "next";
import { PROFILE } from "../../content/profile";

export const metadata: Metadata = {
  title: "About - Aerospace Portfolio",
  description: "Profile and background summary.",
  openGraph: {
    images: [new URL('../opengraph-image.svg', import.meta.url).toString()],
  } as any,
  twitter: {
    images: [new URL('../twitter-image.svg', import.meta.url).toString()],
  } as any,
};

export default function AboutPage() {
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">About</h1>
      <div className="mt-4">
        <h2 className="text-xl font-medium">{PROFILE.name}</h2>
        <p className="text-zinc-700 mt-2">{PROFILE.headline}</p>
        <p className="mt-4 text-sm text-zinc-700">{PROFILE.summary}</p>
        <p className="mt-4 text-sm text-zinc-600">Location: {PROFILE.location}</p>
      </div>
    </section>
  );
}
