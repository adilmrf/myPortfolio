/**
 * Recommendations content for the Home page.
 * Edit this file to add/remove recommenders.
 */
export type Recommendation = {
    name: string;
    title: string;
    affiliation: string;
    email: string;
    linkedin: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
    {
        name: "Dr. Jeongmoo Huh",
        title: "Assistant Professor",
        affiliation: "United Arab Emirates University",
        email: "j.huh@uaeu.ac.ae",
        linkedin: "https://www.linkedin.com/in/jeongmoo-huh-15648ab9/",
    },
    {
        name: "Dr. Tarek Dief",
        title: "Associate Professor",
        affiliation: "United Arab Emirates University",
        email: "tndief@uaeu.ac.ae",
        linkedin: "https://linkedin.com/in/tarek-dief-a0765010a",
    },
    {
        name: "Eng. Mohamed Alkarbi",
        title: "AIT Director",
        affiliation: "Orbitworks",
        email: "mohamed.alkarbi@orbitworks.ae",
        linkedin: "https://www.linkedin.com/in/mohamed-alkarbi-850b53270/",
    },
    {
        name: "Dr. Mohamed Al Azizi",
        title: "Rocket Propulsion Manager",
        affiliation: "HALCON",
        email: "mohammed.alazizi@halcon.ae",
        linkedin: "https://linkedin.com/in/mohammed-al-azizi-ph-d-1b851a4b",
    },
    {
        name: "Dr. Aysha Aljaberi",
        title: "Assistant Vice Provost",
        affiliation: "NYU Abu Dhabi",
        email: "aa10600@nyu.edu",
        linkedin: "https://www.linkedin.com/in/aysha-aljaberi-51297480/",
    },
];

export default RECOMMENDATIONS;
