import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import ThemeToggle from "../components/ThemeToggle";
import Container from "../components/ui/Container";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../components/icons";
import "./globals.css";
import { PROFILE } from "../content/profile";
import { withBasePath } from "../lib/assetPath";
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN, SITE_URL } from "../lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Origin only. Next.js prepends `basePath` itself when resolving the
  // file-convention images (opengraph-image.png / twitter-image.png), so a
  // metadataBase that already contains the basePath would duplicate it.
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_NAME,
    template: "%s · Adil Mahroof",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

/**
 * Applies the stored (or system) theme before first paint. Runs blocking and
 * ahead of the body so there is no flash of the wrong theme.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adil Mahroof",
  jobTitle: "Aerospace Engineer",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "United Arab Emirates University" },
    { "@type": "CollegeOrUniversity", name: "New York University Abu Dhabi" },
  ],
  knowsAbout: [
    "Rocket propulsion",
    "Unmanned aerial vehicles",
    "Satellite assembly, integration and testing",
    "Systems engineering",
  ],
  sameAs: [PROFILE.links?.linkedin, PROFILE.links?.github].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-accent-contrast"
        >
          Skip to content
        </a>

        <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
          <Container width="wide">
            <div className="flex items-center justify-between py-3.5">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-display text-[0.95rem] font-bold tracking-tight"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <Image
                    src={withBasePath("/media/am.png")}
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full scale-125 object-cover object-center"
                  />
                </span>
                <span>Adil Mahroof</span>
              </Link>
              <div className="flex items-center gap-1">
                <HeaderNav />
                <ThemeToggle />
              </div>
            </div>
          </Container>
        </header>

        <Container>
          <main id="main" className="min-h-[60vh] pt-24 pb-16">
            {children}
          </main>

          <footer className="border-t border-line pb-12 pt-10 text-small text-ink-muted">
            <div id="contact" className="scroll-mt-24">
              <h2 className="font-display text-h3 font-semibold text-ink">Contact</h2>
              <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
                {PROFILE.links?.linkedin && (
                  <a
                    href={PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                )}

                {PROFILE.links?.email && (
                  <a
                    href={PROFILE.links.email}
                    className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent"
                  >
                    <MailIcon />
                    Email
                  </a>
                )}

                {PROFILE.links?.github && (
                  <a
                    href={PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-ink-subtle">
              <span>{PROFILE.location ?? ""}</span>
              <span>&copy; {year} Adil Mahroof</span>
            </div>
          </footer>
        </Container>
      </body>
    </html>
  );
}
