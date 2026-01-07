import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import "./globals.css";
import { PROFILE } from "../content/profile";
import { withBasePath, withBasePathAndSlash } from "../lib/assetPath";

const siteName = PROFILE.name + " — Adil Mahroof";
const description = PROFILE.summary ?? "A concise portfolio highlighting projects and experience in aerospace engineering.";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | " + siteName,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    siteName,
    type: "website",
    images: [new URL("./opengraph-image.svg", import.meta.url).toString()],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: [new URL("./twitter-image.svg", import.meta.url).toString()],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="fixed top-0 left-0 right-0 z-50 hover:bg-white/90 transition-colors duration-200 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center justify-between py-6">
              <Link href={withBasePathAndSlash("/")} className="flex items-center gap-2 text-xl font-semibold">
                <span className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={withBasePath("/media/am.png")}
                    alt="Adil Mahroof"
                    width={28}
                    height={28}
                    className="h-full w-full object-cover object-center scale-125"
                  />
                </span>
                <span>Adil Mahroof</span>
              </Link>
              <HeaderNav />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-6">
          <main className="min-h-[60vh] pb-12 pt-24">
            <div className="mx-4 sm:mx-6 md:mx-[100px]">{children}</div>
          </main>

          <footer className="border-t pt-6 text-sm text-zinc-600 pb-10">
            <div id="contact" className="pt-4 pb-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {PROFILE.links?.linkedin && (
                  <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-zinc-700 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-700">
                      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2h-0a2 2 0 0 0-2 2v6h-4v-12h4v2" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="2" y="8" width="4" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    LinkedIn
                  </a>
                )}

                {PROFILE.links?.email && (
                  <a href={PROFILE.links.email} className="inline-flex items-center gap-2 text-zinc-700 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Email
                  </a>
                )}

                {PROFILE.links?.github && (
                  <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-zinc-700 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2C8.1 2 5 5.1 5 9c0 3.9 2.6 7.2 6.2 8.1.5.1.7-.2.7-.5v-1.8c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-2-.2-4.1-1-4.1-4.4 0-1 .4-1.9 1-2.5-.1-.3-.5-1.2.1-2.6 0 0 .8-.3 2.6 1 .8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c1.8-1.3 2.6-1 2.6-1 .6 1.4.2 2.3.1 2.6.6.6 1 1.5 1 2.5 0 3.4-2.1 4.2-4.1 4.4.3.3.5.8.5 1.6v2.3c0 .3.2.6.7.5C16.4 16.2 19 12.9 19 9c0-3.9-3.1-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Website
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-zinc-600">{PROFILE.location ?? ""}</div>
              <div className="text-right">© {year} Adil Mahroof</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
