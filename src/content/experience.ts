import type { ExperienceItem } from "../lib/types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-5",
    role: "AI Tutor",
    organization: "xAI",
    logo: "/media/logos/xai.png",
    startDate: "01.2026",
    endDate: "Present",
    bullets: [
      "Trained Grok in Gulf Arabic",
      "Completed more than 1000 tasks, including L1 reviews",
    ],
    tags: ["AI"],
  },
  {
    id: "exp-4",
    role: "CubeSat Development Instructor",
    organization: "SpacePoint (Space.)",
    logo: "/media/logos/spacepoint.jpg",
    startDate: "04.2025",
    endDate: "Present",
    bullets: [
      "Led 10+ lectures on Introduction to Space, satellites, and space technology",
      "Led 10+ workshops on hands-on CubeSat assembly, integration and testing with 100+ students.",
    ],
    tags: ["Space", "AIT"],
  },
  {
    id: "exp-3",
    role: "Satellite AIT Intern",
    organization: "Orbitworks",
    logo: "/media/logos/orbitworks.jfif",
    startDate: "08.2025",
    endDate: "11.2025",
    bullets: [
      "Designed and manufactured a mechanical ground support equipment (MGSE) to store 40 solar array modules",
      "Created work and build procedures for MGSEs and Satellite AIT steps.",
      "Assisted with AIT processes and builds in the clean room.",
      "Worked on 10 Longbow satellites including storage, functional tests, solar array deployment, and propulsion module removal"
    ],
    tags: ["Space", "AIT"],
  },
  {
    id: "exp-2",
    role: "Future Sustainability Leader",
    organization: " Youth4Sustainability Masdar",
    logo: "/media/logos/y4s.png",
    startDate: "01.2024",
    endDate: "01.2025",
    bullets: [
      "Attended 20+ workshops, lectures and discussion sessions about sustainability.",
      "Competed in 3 SkillUp competitions solving real-life sustainability challenges.",
      "Won 1st place in the Innovate4Climate challenge, in collaboration with MBZ Water Initiative, for a novel design for a water desalination spacer inspired by the lotus leaf."
    ],
    tags: ["Sustainability", "Research"],
  },
  {
    id: "exp-1",
    role: "Rocket Propulsion Intern",
    organization: "HALCON, EDGE Group",
    logo: "/media/logos/halcon.png",
    startDate: "05.2024",
    endDate: "12.2024",
    bullets: [
      "Attended on-boarding sessions on missiles developments and subsystems at different departments.",
      "Researched liquid rocket engines (LRE) and testing setups.",
      "Led the design of an LRE using NASA CEA, RPA, statistical and experimental data, and PTC Creo for CAD modeling. The model was manufactured using SLM 3D printing (Firing tests conducted in Q2-2025).",
      "Participated in test campaigns for rocket motor qualifications."
    ],
    tags: ["Propulsion", "Research", "3D Printing"],
  },
];

export default EXPERIENCE;
