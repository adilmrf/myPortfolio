import type { Profile } from "../lib/types";

export const PROFILE: Profile = {
    name: "Adil Mahroof",
    headline: "Aerospace Engineer",
    location: "Dubai, United Arab Emirates",
    summary:
        "Adil Mahroof is an aerospace engineering graduate with hands-on experience in engineering design, analysis, and assembly, integration, and testing (AIT)." +
        " Exposure across rocket propulsion, aerodynamics, satellite systems, and system design through academic projects, multidisciplinary teamwork, and internships within the Aerospace and Defense sector." +
        " Known for adaptability and a strong learning mindset, with a practical interest in applying theory to real engineering challenges." +
        " Actively seeking opportunities to contribute to technically driven teams and cutting-edge aerospace programs.",
    skills: ["Leadership", "Teamwork", "Problem Solving", "Innovation", "Adaptability", "Inquisitive Curiousity"],
    hobbies: ["3D Printing", "Astronomy", "Football", "Reading"],
    languages: ["English: IELTS 8.5", "Arabic", "Malayalam"],
    links: {
        github: "https://github.com/adilmrf",
        linkedin: "https://linkedin.com/in/adil-mahroof",
        email: "mailto:adilmrf@outlook.com",
    },
    highlights: [
        { label: "Research", value: "3+ years", detail: "Rocket Propulsion, UAVs, Space Systems" },
        { label: "SMSP", value: "Sheikh Mohamed Bin Zayed Scholar 2023" },
        { label: "Sustainability", value: "Future Sustainability Leader 2024", detail: "Y4S Masdar" },
        { label: "Excellence", value: "UAE Golden Visa", detail: "Exceptional University Graduates" },
    ],
};

export default PROFILE;
