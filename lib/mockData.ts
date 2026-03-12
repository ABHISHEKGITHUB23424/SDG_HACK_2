import { Student } from './types';

// Profile types to ensure diversity in mapping
const PROFILES = [
  'ELITE_HACKER',      // High Hackathons, High Coding, Avg Academics
  'ACADEMIC_TITAN',    // High CGPA, Low Hackathons, Low Coding
  'CONSISTENT_RISE',   // Improving all parameters
  'BURNOUT_RISK',      // High initial, declining later
  'LATE_BLOOMER',      // Low initial, improving significantly
  'TECHNICAL_GHOST',   // High CGPA, Zero GitHub/LeetCode
  'COMPETITION_ADDICT' // High Hackathons, Low Attendance, Low CGPA
];

export const mockStudents: Student[] = [];

// Seeded random for consistency
let seed = 12345;
function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Generate 1000 students
for (let i = 1; i <= 1000; i++) {
    const profile = PROFILES[i % PROFILES.length];
    const dept = ['CSE', 'ECE', 'IT', 'MECH', 'AIDS'][i % 5];
    const year = (i % 4) + 1;
    
    // Base parameters
    let baseCgpa = 7.5 + (random() * 2);
    let baseHackathons = Math.floor(random() * 5);
    let baseLeetcode = 50 + Math.floor(random() * 200);

    // Apply Profile Logic
    const academicHistory = [];
    const leetcodeHistory = [];
    
    for (let sem = 1; sem <= 4; sem++) {
        let semCgpa = baseCgpa + (random() * 0.4 - 0.2);
        let semLeetcode = baseLeetcode + (sem * 20) + (random() * 30);

        if (profile === 'ACADEMIC_TITAN') {
            semCgpa = 9.0 + (random() * 0.8);
            semLeetcode = 10 + (random() * 50);
        } else if (profile === 'BURNOUT_RISK' && sem > 2) {
            semCgpa -= 1.5;
            semLeetcode -= 40;
        } else if (profile === 'LATE_BLOOMER') {
            semCgpa = sem < 3 ? 6.5 : 8.5;
        }

        academicHistory.push({
            semester: sem,
            cgpa: Math.min(10, Math.max(0, semCgpa)),
            internalAssessmentScore: 70 + (random() * 25),
            arrears: (profile === 'BURNOUT_RISK' && sem > 2) ? 2 : 0
        });

        leetcodeHistory.push({
            semester: sem,
            solved: Math.max(0, Math.floor(semLeetcode))
        });
    }

    const hackathons = [];
    const hackathonCount = profile === 'COMPETITION_ADDICT' ? 8 : (profile === 'ACADEMIC_TITAN' ? 0 : 3);
    for (let h = 0; h < hackathonCount; h++) {
        hackathons.push({
            name: `Hackathon ${h + 1}`,
            date: `202${2 + Math.floor(h/3)}-${String((h % 12) + 1).padStart(2, '0')}-15`,
            position: random() > 0.7 ? (h % 3) + 1 : null
        });
    }

    mockStudents.push({
        id: i.toString(),
        registerNumber: `${21 + (i%3)}${dept}${String(i).padStart(3, '0')}`,
        name: `Student ${i}`,
        department: dept,
        year,
        photoInitials: `S${i%10}`,
        email: `student${i}@college.edu`,
        hackathons,
        projects: [
            { title: 'Project 1', startDate: '2023-01-01', endDate: '2023-04-01', status: 'completed', domain: 'Web' }
        ],
        academicHistory,
        leetcodeHistory,
        disciplinaryRecords: profile === 'COMPETITION_ADDICT' ? [{ date: '2023-10-10', type: 'Attendance Warning', severity: 'minor' }] : [],
        attendanceHistory: Array.from({ length: 18 }, (_, j) => ({
            month: `2023-${String((j % 12) + 1).padStart(2, '0')}`,
            percentage: profile === 'COMPETITION_ADDICT' ? 65 + (random() * 10) : 85 + (random() * 10)
        })),
        skills: ['React', 'Node.js', 'Python'],
        teamworkScore: 70 + (random() * 30),
        githubCommits: profile === 'ELITE_HACKER' ? 400 + Math.floor(random() * 200) : Math.floor(random() * 100),
        contestsThisYear: Math.floor(random() * 10),
        interventionHistory: [],
        currentStatus: 'Normal'
    });
}

// Ensure first few students are specific examples for demo
mockStudents[0].name = "Aditya Verma";
mockStudents[0].disciplinaryRecords = [{ date: '2023-11-20', type: 'Lab Misconduct', severity: 'minor' }];

mockStudents[1] = {
    ...mockStudents[1],
    id: '2',
    name: 'Priya Subramaniam',
    registerNumber: '21CSE087',
    academicHistory: [
        { semester: 1, cgpa: 9.5, internalAssessmentScore: 98, arrears: 0 },
        { semester: 2, cgpa: 9.3, internalAssessmentScore: 92, arrears: 0 },
        { semester: 3, cgpa: 8.4, internalAssessmentScore: 80, arrears: 1 },
        { semester: 4, cgpa: 7.2, internalAssessmentScore: 70, arrears: 2 }
    ],
    githubCommits: 550, // High activity causing academic drop
    hackathons: Array(12).fill(0).map((_, i) => ({ name: `Mega Hack ${i}`, date: '2023-01-01', position: 1 }))
};
