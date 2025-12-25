import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { PROFILE } from "../content/profile";

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
      <body className="antialiased min-h-screen bg-white text-zinc-900">
        <div className="mx-auto max-w-5xl px-6">
          <header className="flex items-center justify-between py-6">
            <Link href="/" className="text-xl font-semibold">
              Adil Mahroof
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/experience">Experience</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </header>

          <main className="min-h-[60vh] pb-12">{children}</main>

          <footer className="border-t pt-6 text-sm text-zinc-600">
            © {year} Adil Mahroof
          </footer>
        </div>
      </body>
    </html>
  );
}
