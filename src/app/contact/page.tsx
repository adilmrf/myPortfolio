import type { Metadata } from "next";
import { PROFILE } from "../../content/profile";

export const metadata: Metadata = {
  title: "Contact - Adil Mahroof",
  description: "Contact links and socials.",
  openGraph: {
    images: [new URL('../opengraph-image.svg', import.meta.url).toString()],
  } as any,
  twitter: {
    images: [new URL('../twitter-image.svg', import.meta.url).toString()],
  } as any,
};

export default function ContactPage() {
  const links = PROFILE.links ?? {};

  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <div className="mt-4 space-y-2 text-sm">
        {links.email && (
          <div>
            <a href={links.email} className="text-blue-600">Email</a>
          </div>
        )}
        {links.linkedin && (
          <div>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-blue-600">LinkedIn</a>
          </div>
        )}
        {links.github && (
          <div>
            <a href={links.github} target="_blank" rel="noreferrer" className="text-blue-600">GitHub</a>
          </div>
        )}
      </div>
    </section>
  );
}
