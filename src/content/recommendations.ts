/**
 * Recommendations content for the Home page.
 * Edit this file to add/remove recommenders.
 */
export type Recommendation = {
    name: string;
    title: string;
    affiliation: string;
    email: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
    {
        name: "Dr. Sarah Qureshi",
        title: "Research Advisor",
        affiliation: "Space Systems Lab, University X",
        email: "s.qureshi@univx.edu",
    },
    {
        name: "Dr. Ammar Qureshi",
        title: "Research Advisor",
        affiliation: "Space Systems Lab, University M",
        email: "a.qureshi@univm.edu",
    },
    {
        name: "Prof. Liam Carter",
        title: "Project Supervisor",
        affiliation: "Aerospace Research Group, Institute Y",
        email: "liam.carter@insty.org",
    },
    {
        name: "Eng. Fatima Al-Mansouri",
        title: "Team Lead",
        affiliation: "Orbitworks",
        email: "fatima@orbitworks.ae",
    },
    {
        name: "Eng. Mohamed Al-Mansouri",
        title: "Team Lead",
        affiliation: "Orbitworks",
        email: "mohamed@orbitworks.ae",
    },
];

export default RECOMMENDATIONS;
