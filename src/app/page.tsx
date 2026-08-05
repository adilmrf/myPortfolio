import type { Metadata } from "next";
import Image from "next/image";
import { PROFILE } from "../content/profile";
import { EXPERIENCE } from "../content/experience";
import { EDUCATION } from "../content/education";
import RECOMMENDATIONS from "../content/recommendations";
import References from "../components/References";
import Timeline, { type TimelineItem } from "../components/Timeline";
import IndexList from "../components/ui/IndexList";
import Panel from "../components/ui/Panel";
import ReadoutBar from "../components/ui/Readout";
import SectionHeading from "../components/ui/SectionHeading";
import Status from "../components/ui/Status";
import Rule from "../components/ui/Rule";
import CornerMarks from "../components/ui/CornerMarks";
import { DataRow, DataRows } from "../components/ui/DataRow";
import { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import { ArrowRightIcon, DownloadIcon } from "../components/icons";
import { toIndexEntries } from "../lib/projectEntries";
import { getAllProjects } from "../lib/projects";
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
  statusLabel: e.commitment,
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

const PROJECT_ENTRIES = toIndexEntries(getAllProjects());

export default function Home() {
  const resume = PROFILE.links?.resume;
  const readouts = PROFILE.readouts ?? [];

  return (
    <>
      {/* Hero. The only framed panel and the only pulsing status on the page. */}
      <section className="relative overflow-hidden rounded-[2px] border border-line bg-surface-raised">
        <CornerMarks />
        <div aria-hidden="true" className="grid-wash pointer-events-none absolute inset-0" />

        <div className="relative px-6 pb-8 pt-10 md:px-12 md:pb-12 md:pt-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="label">Portfolio</span>
            <Status variant="active" label="Open to opportunities" pulse />
          </div>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            <div className="min-w-0 flex-1">
              <h1 className="text-callsign font-display font-bold uppercase text-ink">
                {PROFILE.name}
              </h1>

              {PROFILE.role && (
                <p className="mt-3 font-display text-h2 font-semibold text-accent">{PROFILE.role}</p>
              )}
              {PROFILE.focus && <p className="label mt-2 text-ink-muted">{PROFILE.focus}</p>}

              <p className="mt-6 max-w-[56ch] text-lede text-ink-muted">
                Hands-on experience in engineering design, analysis, and assembly, integration and
                testing across rocket propulsion, aerodynamics, satellite systems and system design.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/projects">
                  Selected work
                  <ArrowRightIcon />
                </ButtonLink>
                {resume && (
                  <ButtonAnchor href={withBasePath(resume)} download>
                    <DownloadIcon />
                    Download CV
                  </ButtonAnchor>
                )}
              </div>

              <DataRows className="mt-8 max-w-[26rem]">
                {PROFILE.location && (
                  <DataRow label="Location" mono>
                    {PROFILE.location}
                  </DataRow>
                )}
                <DataRow label="Discipline" mono>
                  Aerospace
                </DataRow>
              </DataRows>
            </div>

            <Image
              src={withBasePath("/media/headshot.jpeg")}
              alt="Adil Mahroof"
              width={352}
              height={352}
              priority
              sizes="(max-width: 768px) 128px, 176px"
              className="h-32 w-32 shrink-0 rounded-[2px] border border-line object-cover md:h-44 md:w-44"
            />
          </div>
        </div>
      </section>

      {readouts.length > 0 && <ReadoutBar items={readouts} className="mt-6" />}

      <Rule className="my-14" />

      <section>
        <SectionHeading>Recognition</SectionHeading>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE.highlights?.map((h) => (
            <Panel key={h.label} label={h.label}>
              <div className="text-h3 font-display font-semibold leading-snug text-ink">
                {h.value}
              </div>
              {h.detail && <div className="mt-1 text-small text-ink-muted">{h.detail}</div>}
            </Panel>
          ))}
        </div>
      </section>

      <Rule className="my-14" />

      <section>
        <SectionHeading>Selected work</SectionHeading>
        <div className="mt-5">
          <IndexList entries={PROJECT_ENTRIES} />
        </div>
      </section>

      <Rule className="my-14" />

      <section>
        <SectionHeading action={{ label: "Full log", href: "/experience" }}>Log</SectionHeading>
        <Timeline items={EXPERIENCE_ITEMS} limit={4} compact />
      </section>

      <Rule className="my-14" />

      <section>
        <SectionHeading>Education</SectionHeading>
        <Timeline items={EDUCATION_ITEMS} compact />
      </section>

      <Rule className="my-14" />

      <section>
        <SectionHeading>References</SectionHeading>
        <div className="mt-6">
          <References items={RECOMMENDATIONS} />
        </div>
      </section>
    </>
  );
}
