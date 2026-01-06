import type { Project } from "../lib/types";

/**
 * Edit or add projects here. Keep each item brief and human-readable.
 */
export const PROJECTS: Project[] = [
  {
    id: "fsl-spacer",
    title: "Design of a Novel Water Desalination Spacer Using Biomimicry Techniques to Reduce Biofouling",
    summary:
      "A novel water desalination spacer inspired by the lotus leaf was designed and 3D printed to reduce biofouling in reverse osmosis membranes.",
    responsibilities: [
      "Conducted in-depth research on water desalination, reverse osmosis membranes and spacers.",
      "Designed the spacer using CAD software and biomimicry principles.",
      "3D printed the prototype.",
    ],
    results: [
      "Produced a conceptual prototype to present in front of experts.",
    ],
    presentations: [
      "ADSW 2025, Abu Dhabi, UAE.",
    ],
    tags: ["Research", "Sustainability", "3D Printing"],
    links: [
      { label: "Report (PDF)", url: "#" },
      { label: "Test Video", url: "#" },
    ],
  },
  {
    id: "vtol-uav",
    title: "Design and Control for Vertical Take-off and Landing (VTOL) UAV",
    summary:
      " A tri-motor vertical take-off and landing UAV with two tilt motors was designed, additively manufactured and flight tested.",
    responsibilities: [
      "Conducted preliminary research on UAVs and VTOL technology.",
      "Performed aerodynamic analysis using XFLR5 and CAD modeling of the UAV structure and VTOL tilt mechanisms.",
      "3D printed the prototype and prepared it for testing.",
    ],
    results: [
      "Produced a fully functional prototype with successful flight tests.",
    ],
    presentations: [
      "IDEX 2025, Abu Dhabi, UAE.",
    ],
    tags: ["Research", "UAVs", "Systems Engineering", "3D Printing", "Control", "AIT"],
    links: [
      { label: "Report (PDF)", url: "#" },
      { label: "Test Video", url: "#" },
    ],
  },
  {
    id: "mbrsc-propulsion",
    title: "Performance Improvement of Chemical Space Propulsion with Thermal Decomposition of Propellant",
    summary:
      "An experimental study on improving the performance of micro-thrusters using Hydrogen Peroxide (H2O2) as propellant by introducing thermal decomposition.",
    responsibilities: [
      "Researched thermal decomposition of H2O2 for micro-thrusters.",
      "Set up experiments, executed test procedures, and recorded data.",
    ],
    results: [
      "Completed 10+ tests confirming feasibility of thermal decomposition to improve H2O2 thruster performance.",
    ],
    presentations: [
      "IAC 2024, Milan, Italy.",
    ],
    tags: ["Propulsion", "Research", "Space"],
  },
  {
    id: "green-propellant",
    title: "Green Propellant Space Propulsion for Mode Changeable Micro Thrust Generation",
    summary:
      "A feasibility study on using Hydrogen Peroxide as a green propellant in chemical and electric microthrust generation.",
    responsibilities: [
      "Led a team of four undergraduate students and managed schedules and proposals.",
      "Designed a 100 mN class thruster using NACA CEA, RPA, and CATIA V5.",
    ],
    results: [
      "Manufactured and tested a micro-thruster for chemical propulsion.",
      "Validated performance across different initial conditions and H2O2 concentrations.",
    ],
    presentations: [
      "IAC 2023, Baku, Azerbaijan.",
    ],
    tags: ["Propulsion", "Research", "Space", "Sustainability"],
  },
  {
    id: "mini-rocket-propulsion",
    title: "Design, Fabrication, and Testing of a Miniaturised Rocket Propulsion System",
    summary: "Design, manufacturing, and testing of a 10 N class thruster.",
    responsibilities: [
      "Conducted research on rocket principles, micro-thrust generation, and propellants.",
      "Manufactured the thruster using traditional workshop machines and prepared test procedures.",
    ],
    results: [
      "Completed multiple successful tests confirming full functionality of the design.",
    ],
    presentations: [
      "UAEU-MUBADALA Aerospace Student Research, 2022.",
    ],
    tags: ["Propulsion", "Research", "Space"],
  },

];

export default PROJECTS;
