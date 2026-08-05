/**
 * References content for the Home page.
 * Edit this file to add/remove referees.
 *
 * Do not store referees' email addresses here — this file is bundled into the
 * public JavaScript payload and published to a public repository.
 */
export type Recommendation = {
    name: string;
    title: string;
    affiliation: string;
    linkedin: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
    {
        name: "Dr. Jeongmoo Huh",
        title: "Assistant Professor",
        affiliation: "United Arab Emirates University",
        linkedin: "https://www.linkedin.com/in/jeongmoo-huh-15648ab9/",
    },
    {
        name: "Dr. Tarek Dief",
        title: "Associate Professor",
        affiliation: "United Arab Emirates University",
        linkedin: "https://linkedin.com/in/tarek-dief-a0765010a",
    },
    {
        name: "Eng. Mohamed Alkarbi",
        title: "AIT Director",
        affiliation: "Orbitworks",
        linkedin: "https://www.linkedin.com/in/mohamed-alkarbi-850b53270/",
    },
    {
        name: "Dr. Mohammed Al Azizi",
        title: "Rocket Propulsion Manager",
        affiliation: "HALCON",
        linkedin: "https://linkedin.com/in/mohammed-al-azizi-ph-d-1b851a4b",
    },
    {
        name: "Dr. Aysha Aljaberi",
        title: "Assistant Vice Provost",
        affiliation: "NYU Abu Dhabi",
        linkedin: "https://www.linkedin.com/in/aysha-aljaberi-51297480/",
    },
];

export default RECOMMENDATIONS;
