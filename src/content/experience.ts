import type { ExperienceItem } from "../lib/types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Propulsion Engineer",
    organization: "AeroLab Research",
    startDate: "2021-06",
    endDate: "2023-09",
    bullets: [
      "Led hot-fire test campaigns for liquid rocket demonstrators.",
      "Authored test procedures and coordinated instrumentation setups.",
      "Reduced chamber thermal gradients through redesign of cooling paths.",
    ],
    tags: ["Propulsion", "Research"],
  },
  {
    id: "exp-2",
    role: "Controls & Autonomy Engineer",
    organization: "SkyTech Systems",
    startDate: "2019-01",
    endDate: "2021-05",
    bullets: [
      "Implemented guidance algorithms for waypoint navigation.",
      "Integrated vision-based detection into the navigation stack.",
    ],
    tags: ["UAVs", "GNC", "Software"],
  },
  {
    id: "exp-3",
    role: "Manufacturing Engineer (Intern)",
    organization: "CompositeWorks",
    startDate: "2018-06",
    endDate: "2018-12",
    bullets: ["Supported composite layup and curing processes.", "Produced tooling and inspection reports."],
    tags: ["Manufacturing", "Structures"],
  },
  {
    id: "exp-4",
    role: "Embedded Software Engineer",
    organization: "Orbital Stack",
    startDate: "2023-10",
    bullets: [
      "Develop firmware for flight computers and telemetry logging.",
      "Built host-side tools for automated test benches.",
    ],
    tags: ["Software", "AIT"],
  },
];

export default EXPERIENCE;
