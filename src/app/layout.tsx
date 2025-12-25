import type { Metadata } from "next";
import Link from "next/link";
import HeaderNav from "../components/HeaderNav";
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
            <HeaderNav />
          </header>

          <main className="min-h-[60vh] pb-12">
            <div className="mx-4 sm:mx-6 md:mx-[100px]">{children}</div>
          </main>

          <footer className="border-t pt-6 text-sm text-zinc-600">
            © {year} Adil Mahroof
          </footer>
        </div>
      </body>
    </html>
  );
}
