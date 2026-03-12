import { Student } from './types';

export interface ParameterDecline {
    parameter: string;
    change: number;
    trend: 'improving' | 'declining' | 'stable';
    reason: string;
    suggestedSolution?: string;
    adminInstruction?: string; // Assertive instruction for staff
}

export interface PaceAnalysis {
    peakParticipation: number;
    currentParticipation: number;
    paceReduction: boolean;
    reductionPercentage: number;
    predictedReason: string;
    recommendation: string;
    confidence: number;
    parameterDecline?: ParameterDecline;
}

export function analyzePaceReduction(student: Student, fromSem: number = 1, toSem: number = 4, targetParam: string = 'General'): PaceAnalysis {
    // 1. General Participation Analysis (Hackathons + Projects)
    const semesterParticipation: Record<number, number> = {};
    student.hackathons.forEach(h => {
        const yr = new Date(h.date).getFullYear();
        semesterParticipation[yr] = (semesterParticipation[yr] || 0) + 1;
    });
    student.projects.forEach(p => {
        const yr = new Date(p.startDate).getFullYear();
        semesterParticipation[yr] = (semesterParticipation[yr] || 0) + 1;
    });

    const counts = Object.values(semesterParticipation);
    const peakParticipation = counts.length > 0 ? Math.max(...counts) : 0;
    const currentYear = new Date().getFullYear();
    const currentParticipation = semesterParticipation[currentYear] || semesterParticipation[currentYear-1] || 0;
    const reductionPercentage = peakParticipation > 0 ? ((peakParticipation - currentParticipation) / peakParticipation) * 100 : 0;
    const paceReduction = reductionPercentage > 40 && peakParticipation >= 2;

    // 2. Specific Parameter Analysis
    let paramDecline: ParameterDecline | undefined;
    
    if (targetParam !== 'General') {
        const fromData = student.academicHistory.find(h => h.semester === fromSem);
        const toData = student.academicHistory.find(h => h.semester === toSem);

        if (fromData && toData) {
            let change = 0;
            let reason = "Data suggests stable progression.";
            let suggestedSolution = "No immediate action required. Continue current learning path.";
            let adminInstruction = "";

            if (targetParam === 'Academic marks') {
                change = toData.cgpa - fromData.cgpa;
                const hackathonsInPeriod = student.hackathons.length;
                const commits = student.githubCommits || 0;

                if (change < -0.3) {
                    if (hackathonsInPeriod > 5) {
                        reason = "Severe academic decline mapped to Hackathon over-engagement. Priority inversion detected: Student is sacrificing semester stability for external trophies.";
                        suggestedSolution = "ML FEEDBACK: The student must immediately cease all competition activity. Success in hackathons is currently detrimental to long-term academic graduation criteria.";
                        adminInstruction = "ADMIN DIRECTIVE: BLOCK ALL ON-DUTY (OD) REQUESTS for this student immediately. Do not permit participation in external events until Semestorial CGPA recovers by at least 0.5 points.";
                    } else if (commits > 300) {
                        reason = "Academic bandwidth redirected to high-velocity Open Source contribution. Technical over-specialization is cannibalizing theoretical mastery.";
                        suggestedSolution = "ML FEEDBACK: Rebalance time distribution. Coding velocity should be capped at 1 hour daily to allow for core theoretical recovery.";
                        adminInstruction = "ADMIN DIRECTIVE: Monitor GitHub activity logs. If velocity doesn't drop, mandate 5:00 PM - 7:00 PM supervised study hall sessions.";
                    } else {
                        reason = "General performance fatigue / Burnout detected. Correlation found with reduced internal engagement and increased absenteeism.";
                        suggestedSolution = "ML FEEDBACK: Initiate academic reboot. The student requires a full reset of internal deliverables and 1:1 behavioral goal alignment.";
                        adminInstruction = "ADMIN DIRECTIVE: Schedule immediate HOD-Student-Parent meeting. Pause all extra-curricular approvals.";
                    }
                } else if (change > 0.5) {
                    reason = "Significant academic recovery observed. Successful balancing of skill development and core theoretical mastery.";
                    suggestedSolution = "ML FEEDBACK: Positive growth trajectory. Student has successfully integrated complex technical learning with academic rigor.";
                    adminInstruction = "ADMIN DIRECTIVE: Approved for High-Value OD requests (National/International Hackathons only).";
                }
            } else if (targetParam === 'Competitions') {
                const countAtFrom = student.hackathons.filter(h => new Date(h.date).getFullYear() <= 2022).length;
                const countAtTo = student.hackathons.length;
                change = countAtTo - countAtFrom;
                
                if (change <= 0) {
                    if (toData.cgpa > 9.0) {
                        reason = "Intentional withdrawal from competitions to maintain High Academic Standing (Academic Titan profile).";
                        suggestedSolution = "ML FEEDBACK: High academic risk-aversion. Suggest low-stakes weekend-only technical events to build industry portfolio.";
                        adminInstruction = "ADMIN DIRECTIVE: Encourage participation in 1 local hackathon per semester to bridge the theory-application gap.";
                    } else {
                        reason = "Dormant competition profile. Student lacks external exposure and industry-aligned technical application.";
                        suggestedSolution = "ML FEEDBACK: Immediate nudge required. Student is at risk of graduating without a practical portfolio.";
                        adminInstruction = "ADMIN DIRECTIVE: Mandate 'Level-1 Regional Hackathon' entry. Assist with team formation if required.";
                    }
                } else {
                    reason = "Active engagement in technical events. Demonstrates strong industry-readiness orientation.";
                    suggestedSolution = "ML FEEDBACK: Strong external momentum. Candidate is suitable for elite-level innovation tracks.";
                    adminInstruction = "ADMIN DIRECTIVE: Provide priority OD and financial support for Tier-1 competitions.";
                }
            } else if (targetParam === 'Leetcode') {
                const leetFrom = student.leetcodeHistory?.find(h => h.semester === fromSem)?.solved || 0;
                const leetTo = student.leetcodeHistory?.find(h => h.semester === toSem)?.solved || 0;
                change = leetTo - leetFrom;
                if (change < 15) {
                    reason = "Coding practice plateaued. Logic-building stamina is at risk of stagnation.";
                    suggestedSolution = "ML FEEDBACK: Critical refresh needed. Current solved-count does not meet minimum industry benchmarks for top-tier placement.";
                    adminInstruction = "ADMIN DIRECTIVE: Enroll in weekend 'Logic Intensive' coding bootcamps. Weekly monitoring required.";
                }
            }

            paramDecline = {
                parameter: targetParam,
                change: Number(change.toFixed(2)),
                trend: change < 0 ? 'declining' : change > 0 ? 'improving' : 'stable',
                reason,
                suggestedSolution,
                adminInstruction
            };
        }
    }

    // Main Reason Prediction
    let predictedReason = "Consistent Performance";
    let recommendation = "Maintain current momentum. Focus on diversifying technical stack.";
    let confidence = 0.95;

    if (paceReduction) {
        const totalArrears = student.academicHistory.reduce((acc, curr) => acc + curr.arrears, 0);
        const ongoingProjects = student.projects.filter(p => p.status === 'ongoing').length;

        if (totalArrears > 0) {
            predictedReason = "Academic Recovery Filter";
            recommendation = "Prioritize internal backlog clearance. Remedial sessions recommended.";
            confidence = 0.88;
        } else if (ongoingProjects >= 3) {
            predictedReason = "Project Load Saturation";
            recommendation = "Optimize bandwidth. Offload minor projects before competition entry.";
            confidence = 0.82;
        } else {
            predictedReason = "Skill Plateau / Fatigue";
            recommendation = "Suggest domain switch (e.g., from Web to CyberSec) to reignite engagement.";
            confidence = 0.65;
        }
    }

    return {
        peakParticipation,
        currentParticipation,
        paceReduction,
        reductionPercentage,
        predictedReason,
        recommendation,
        confidence,
        parameterDecline: paramDecline
    };
}
