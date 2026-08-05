import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "../content/profile";
import { EXPERIENCE } from "../content/experience";
import { EDUCATION } from "../content/education";
import RECOMMENDATIONS from "../content/recommendations";
import References from "../components/References";
import Timeline, { type TimelineItem } from "../components/Timeline";
import Card from "../components/ui/Card";
import SectionHeading from "../components/ui/SectionHeading";
import { ArrowRightIcon, DownloadIcon } from "../components/icons";
import { withBasePath } from "../lib/assetPath";
import { canonical } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Adil Mahroof — Aerospace Engineer | Propulsion, UAVs & Satellite AIT",
  },
  description:
    "Aerospace engineer in Dubai working across rocket propulsion, UAVs and satellite assembly, integration and testing. Selected projects, research and experience.",
  alternates: { canonical: canonical("/") },
};

const EXPERIENCE_ITEMS: TimelineItem[] = EXPERIENCE.map((e) => ({
  id: e.id,
  title: e.role,
  subtitle: e.organization,
  logo: e.logo,
  startDate: e.startDate,
  endDate: e.endDate,
  bullets: e.bullets,
}));

const EDUCATION_ITEMS: TimelineItem[] = EDUCATION.map((e) => ({
  id: e.id,
  title: e.degree,
  subtitle: e.institution,
  logo: e.logo,
  startDate: e.startDate,
  endDate: e.endDate,
  meta: e.grade,
}));

export default function Home() {
  const resume = PROFILE.links?.resume;

  return (
    <>
      <section className="py-10 sm:py-16">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-center md:gap-12">
          <div className="text-center md:flex-1 md:text-left">
            <h1 className="text-display font-display font-bold text-ink">{PROFILE.name}</h1>

            {PROFILE.role && (
              <p className="mt-3 text-lede font-medium text-ink">{PROFILE.role}</p>
            )}
            {PROFILE.focus && (
              <p className="mt-1.5 text-small text-ink-muted">{PROFILE.focus}</p>
            )}
            {PROFILE.location && (
              <p className="label mt-4">{PROFILE.location}</p>
            )}

            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-small font-medium text-paper transition-opacity hover:opacity-85"
              >
                View projects
                <ArrowRightIcon />
              </Link>
              {resume && (
                <a
                  href={withBasePath(resume)}
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-small font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <DownloadIcon />
                  Download CV
                </a>
              )}
            </div>
          </div>

          <Image
            src={withBasePath("/media/headshot.jpeg")}
            alt="Adil Mahroof"
            width={352}
            height={352}
            priority
            sizes="(max-width: 768px) 144px, 176px"
            className="h-36 w-36 rounded-full border border-line object-cover shadow-xl shadow-black/5 md:h-44 md:w-44"
          />
        </div>
      </section>

      <section className="pb-14">
        <SectionHeading eyebrow="At a glance">Highlights</SectionHeading>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE.highlights?.map((h) => (
            <Card key={h.label} className="flex flex-col gap-1.5">
              <div className="label">{h.label}</div>
              <div className="text-h3 font-semibold leading-snug text-ink">{h.value}</div>
              {h.detail && <div className="text-small text-ink-muted">{h.detail}</div>}
            </Card>
          ))}
        </div>
      </section>

      <section className="pb-14">
        <SectionHeading eyebrow="Where I've worked" action={{ label: "See full experience", href: "/experience" }}>
          Experience
        </SectionHeading>
        <Timeline items={EXPERIENCE_ITEMS} limit={4} compact />
      </section>

      <section className="pb-14">
        <SectionHeading eyebrow="Where I studied">Education</SectionHeading>
        <Timeline items={EDUCATION_ITEMS} compact />
      </section>

      <section className="pb-8">
        <SectionHeading eyebrow="Vouched for by">References</SectionHeading>
        <div className="mt-6">
          <References items={RECOMMENDATIONS} />
        </div>
      </section>
    </>
  );
}
