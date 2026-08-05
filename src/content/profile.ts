import type { Profile } from "../lib/types";

export const PROFILE: Profile = {
    name: "Adil Mahroof",
    role: "Aerospace Engineer",
    focus: "Rocket Propulsion · UAVs · Satellite AIT",
    headline: "Curious. Multidisciplinary. Adaptable.",
    location: "Dubai, United Arab Emirates",
    summary:
        "Adil Mahroof is an aerospace engineering graduate with hands-on experience in engineering design, analysis, and assembly, integration, and testing (AIT)." +
        " Exposure across rocket propulsion, aerodynamics, satellite systems, and system design through academic projects, multidisciplinary teamwork, and internships within the Aerospace and Defense sector." +
        " Known for adaptability and a strong learning mindset, with a practical interest in applying theory to real engineering challenges." +
        " Actively seeking opportunities to contribute to technically driven teams and cutting-edge aerospace programs.",
    skills: ["Leadership", "Teamwork", "Problem Solving", "Innovation", "Adaptability", "Inquisitive Curiosity"],
    hobbies: ["3D Printing", "Astronomy", "Football", "Reading"],
    languages: ["English: IELTS 8.5", "Arabic", "Malayalam"],
    links: {
        github: "https://github.com/adilmrf",
        linkedin: "https://linkedin.com/in/adil-mahroof",
        email: "mailto:adilmrf@outlook.com",
        // Drop a PDF at public/adil-mahroof-cv.pdf and uncomment to show the
        // "Download CV" button in the hero.
        // resume: "/adil-mahroof-cv.pdf",
    },
    /**
     * The home-page readout bar. Every value here is already stated elsewhere
     * in this repo — nothing is invented. Sources:
     *
     *   10+  hot-fire tests  -> projects.ts, mbrsc-propulsion.results[0]
     *   ×2   IAC papers      -> projects.ts, IAC 2023 Baku + IAC 2024 Milan
     *   3.95 GPA             -> education.ts, edu-1.grade
     *   100+ students taught -> experience.ts, exp-4 (SpacePoint) bullets[1]
     *
     * Deliberately NOT used: "3+ years research" from highlights[0] below. It
     * is on the content-accuracy list, and a figure you plan to revise should
     * not sit in the largest type on the page. Swap it back in if you want it.
     *
     * Other true figures available if you would rather trade one out:
     *   10 satellites (Orbitworks Longbow) · 10 N class · 100 mN class
     */
    readouts: [
        { value: "10", unit: "+", label: "Hot-fire tests", detail: "H₂O₂ micro-thruster" },
        { value: "×2", label: "IAC papers", detail: "Baku 2023 · Milan 2024" },
        { value: "3.95", label: "GPA", detail: "UAEU · 4.0 scale" },
        { value: "100", unit: "+", label: "Students taught", detail: "CubeSat AIT" },
    ],
    highlights: [
        { label: "Research", value: "3+ years", detail: "Rocket Propulsion, UAVs, Space Systems" },
        { label: "SMSP", value: "Sheikh Mohamed Bin Zayed Scholar 2023" },
        { label: "Sustainability", value: "Future Sustainability Leader 2024", detail: "Y4S Masdar" },
        { label: "Excellence", value: "UAE Golden Visa", detail: "Exceptional University Graduates" },
    ],
};

export default PROFILE;
