import type { Project } from "../lib/types";

/**
 * Edit or add projects here. Keep each item brief and human-readable.
 */
export const PROJECTS: Project[] = [
  {
    id: "rp-1",
    title: "Regeneratively Cooled Rocket Motor (RCRM)",
    summary:
      "Designed and tested a 1kN regeneratively-cooled liquid rocket engine demonstrator.",
    description:
      "End-to-end design of a regeneratively-cooled thrust chamber, integrated feed system, and hot-fire testing campaign with instrumentation and data analysis.",
    tags: ["Propulsion", "Manufacturing", "Research"],
    links: [
      { label: "Report (PDF)", url: "#" },
      { label: "Test Video", url: "#" },
    ],
    thumbnail: { src: "/media/placeholder-1.svg", alt: "RCRM thrust chamber" },
    featured: true,
  },
  {
    id: "uav-vision",
    title: "Autonomous VTOL UAV — Perception & GNC",
    summary: "Onboard computer vision and guidance system for urban VTOL operations.",
    description:
      "Developed sensor fusion pipeline with inertial+camera inputs and a real-time GNC stack for waypoint following and obstacle avoidance.",
    tags: ["UAVs", "GNC", "Software"],
    media: [
      { type: "image", src: "/uav-flight.jpg", alt: "VTOL UAV in flight", caption: "Flight test of perception stack" },
    ],
    featured: true,
    thumbnail: { src: "/media/placeholder-2.svg", alt: "VTOL UAV" },
  },
  {
    id: "ait-pipeline",
    title: "Automated Integration & Test (AIT) Pipeline",
    summary: "CI-style AIT for avionics boards with hardware-in-the-loop checks.",
    description:
      "Built reproducible test benches, defined pass/fail criteria, and automated test runners to accelerate pre-flight checks.",
    tags: ["AIT", "Software", "Systems"],
    thumbnail: { src: "/media/placeholder-3.svg", alt: "AIT bench" },
  },
  {
    id: "structure-lite",
    title: "Lightweight Composite Wing Spar",
    summary: "Optimized composite layups to reduce mass while meeting stiffness targets.",
    description:
      "Performed laminate-level analysis, made tooling, and validated with static test rigs. Delivered manufacturing drawings and BOM.",
    tags: ["Structures", "Manufacturing"],
  },
  {
    id: "thermal-control",
    title: "Thermal Control for Small Satellite",
    summary: "Passive + active thermal design for a 6U CubeSat payload.",
    description:
      "Modeled thermal environment, selected heaters and insulation, and validated via thermal-vacuum testing.",
    tags: ["Thermal", "Systems"],
    media: [
      { type: "image", src: "/thermal-chamber.jpg", alt: "Thermal vacuum chamber", caption: "Thermal-vac validation" },
    ],
  },
  {
    id: "test-automation",
    title: "Embedded Test Automation",
    summary: "Test harness and dashboard for flight hardware telemetry.",
    description:
      "Created an embedded logger, host-side parsers, and a small dashboard to visualize telemetry and run automated acceptance tests.",
    tags: ["Software", "AIT"],
  },
];

export default PROJECTS;
