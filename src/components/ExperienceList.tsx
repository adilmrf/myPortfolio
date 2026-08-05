"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { parseTagsFromSearchParams } from "../lib/tagQuery";
import type { ExperienceItem as Experience } from "../lib/types";
import Timeline, { type TimelineItem } from "./Timeline";

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const searchParams = useSearchParams();
  const selected = React.useMemo(() => parseTagsFromSearchParams(searchParams), [searchParams]);

  const filtered = selected.length
    ? experiences.filter((e) => (e.tags ?? []).some((t) => selected.includes(t)))
    : experiences;

  if (filtered.length === 0) {
    return (
      <p className="text-small text-ink-muted">
        No roles match those tags. Clear a filter to see everything.
      </p>
    );
  }

  const items: TimelineItem[] = filtered.map((e) => ({
    id: e.id,
    title: e.role,
    subtitle: e.organization,
    logo: e.logo,
    startDate: e.startDate,
    endDate: e.endDate,
    bullets: e.bullets,
  }));

  return <Timeline items={items} />;
}
