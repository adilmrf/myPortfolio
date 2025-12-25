import type { Profile } from "../lib/types";

export const PROFILE: Profile = {
  name: "Alex Taylor",
  headline: "Aerospace Systems Engineer — propulsion, GNC, and embedded software",
  location: "UAE",
  summary:
    "A multidisciplinary aerospace engineer building flight-proven systems — propulsion subsystems, guidance and control algorithms, and embedded avionics. I focus on practical experimentation, data-driven design, and clear engineering documentation.",
  links: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    email: "mailto:you@example.com",
  },
  highlights: [
    { label: "Research", value: "2+ years", detail: "Propulsion & GNC" },
    { label: "Propulsion", value: "H2O2 microthrusters" },
    { label: "UAV", value: "VTOL design" },
    { label: "Satellite", value: "AIT exposure" },
    { label: "Competitions", value: "Multiple wins" },
    { label: "Leadership", value: "Team lead roles" },
  ],
};

export default PROFILE;
