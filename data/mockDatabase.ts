export const mockStudents = [
    { id: "S1", name: "Arjun Kumar", status: "Joined", rollNo: "24CS0012" },
    { id: "S2", name: "Priya Sharma", status: "Joined", rollNo: "24CS0045" },
    { id: "S3", name: "Rahul Verma", status: "Not Joined", rollNo: "24CS0102" },
    { id: "S4", name: "Neha Gupta", status: "Joined", rollNo: "24CS0150" },
    { id: "S5", name: "Vikram Singh", status: "Joined", rollNo: "24CS0199" }
];

export const mockTeams = [
    {
        id: "T1",
        name: "CodeBrewers",
        github_commits: 15,
        past_hackathon_rank: 45,
        attendance: 85,
        status: "Standard",
        hackathon_status: "Registered"
    },
    {
        id: "T2",
        name: "BugSquashers",
        github_commits: 42,
        past_hackathon_rank: 0, // First hackathon
        attendance: 98,
        status: "Rising Star", // Trigger special logic
        hackathon_status: "Selected for Round 2"
    },
    {
        id: "T3",
        name: "SyntaxErrors",
        github_commits: 5,
        past_hackathon_rank: 120,
        attendance: 60,
        status: "At Risk",
        hackathon_status: "Round 1"
    }
];
