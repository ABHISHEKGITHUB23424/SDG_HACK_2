export function evaluateODRequest(input: {
    avgCGPA: number;
    totalHackathons: number;
    teamSize: number;
    hasGithubActivity: boolean;
}): { status: "RECOMMENDED" | "FLAGGED"; confidence: number; reason: string } {
    // Tree 1: CGPA-based
    const tree1Vote = input.avgCGPA >= 7.5 ? 1 : 0;

    // Tree 2: Hackathon-based
    const tree2Vote = input.totalHackathons >= 2 ? 1 : 0;

    // Tree 3: Github activity-based
    const tree3Vote = input.hasGithubActivity ? 1 : 0;

    // Majority vote
    const recommendedVotes = tree1Vote + tree2Vote + tree3Vote;
    const status = recommendedVotes >= 2 ? "RECOMMENDED" : "FLAGGED";

    const confidence = (recommendedVotes / 3) * 100;

    let reason = status === "RECOMMENDED"
        ? "Team meets acceptable criteria for OD request."
        : "Team flagged under one or more operational thresholds.";

    if (recommendedVotes === 1 || recommendedVotes === 2) {
        if (tree1Vote === 0) reason += " CGPA average is below 7.5.";
        if (tree2Vote === 0) reason += " Insufficient prior hackathon participation.";
        if (tree3Vote === 0) reason += " Limited or no GitHub repository activity.";
    }

    return { status, confidence: Math.round(confidence), reason };
}
