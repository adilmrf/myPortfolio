import type { Profile } from "../lib/types";

export const PROFILE: Profile = {
    name: "Adil Mahroof",
    headline: "Aerospace Engineer",
    location: "Dubai, United Arab Emirates",
    summary:
        "A multidisciplinary aerospace engineer building flight-proven systems \u2014 propulsion subsystems, guidance and control algorithms, and embedded avionics. I focus on practical experimentation, data-driven design, and clear engineering documentation.",
    links: {
        github: "https://github.com/your-username",
        linkedin: "https://linkedin.com/in/adil-mahroof",
        email: "mailto:you@example.com",
    },
    highlights: [
        { label: "Research", value: "3+ years", detail: "Rocket Propulsion, UAVs, Space Systems" },
        { label: "SMSP", value: "Sheikh Mohamed Bin Zayed Scholar 2023" },
        { label: "Sustainability", value: "Future Sustainability Leader 2024" },
    ],
};

export default PROFILE;
