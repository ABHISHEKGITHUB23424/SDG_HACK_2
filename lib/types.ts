export type HackathonRecord = {
  name: string;
  date: string; // ISO date
  position: number | null; // null = participated only
  prizeMoney?: number;
};

export type ProjectRecord = {
  title: string;
  startDate: string;
  endDate: string | null; // null = ongoing
  status: 'completed' | 'ongoing' | 'abandoned';
  domain: string;
};

export type AcademicRecord = {
  semester: number;
  cgpa: number;
  internalAssessmentScore: number; // 0–100
  arrears: number;
};

export type DisciplinaryRecord = {
  date: string;
  type: string; // e.g., "Attendance Warning", "Misconduct"
  severity: 'minor' | 'major';
};

export type AttendanceRecord = {
  month: string; // "2024-01"
  percentage: number;
};

export type InterventionRecord = {
  id: string;
  date: string;
  type: 'Remedial' | 'Re-skilling' | 'Counseling';
  action: string;
  status: 'Nudge Sent' | 'Under Intervention' | 'Resolved';
};

export type Student = {
  id: string;
  registerNumber: string;
  name: string;
  department: string;
  section?: string;
  year: number;
  photoInitials: string;
  email: string;
  hackathons: HackathonRecord[];
  projects: ProjectRecord[];
  academicHistory: AcademicRecord[]; // last 4 semesters
  disciplinaryRecords: DisciplinaryRecord[];
  attendanceHistory: AttendanceRecord[]; // last 18 months
  skills: string[];
  teamworkScore: number; // 0–100, peer-rated
  githubCommits: number; // last 90 days
  leetcodeScore?: number; // Current solved
  leetcodeHistory?: { semester: number, solved: number }[]; // Monthly/Semester growth
  contestsThisYear: number;
  interventionHistory?: InterventionRecord[];
  currentStatus?: 'Normal' | 'Under Intervention' | 'High Risk' | 'Resolved';
};

export type FitnessResult = {
  fitnessScore: number;
  innovationScore: number;
  academicScore: number;
  consistencyScore: number;
  technicalLoadScore: number;
  riskPenalty: number;
  badge: 'ELITE' | 'ELIGIBLE' | 'HIGH_RISK' | 'REMEDIAL';
  redFlags: string[];
  aiRecommendation: string;
  isBurnoutRisk: boolean;
  isHighPotentialRisk: boolean;
  classRank: number;
  percentile: number;
};
