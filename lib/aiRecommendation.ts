import { Student, FitnessResult } from './types';

export function generateAIRecommendation(student: Student, result: FitnessResult): string {
  const innovationDetail = student.hackathons.length > 0 
    ? `${student.hackathons.length} hackathons, ${student.hackathons.filter(h => h.position && h.position <= 3).length} prizes`
    : "limited hackathon exposure";
    
  const rankSuffix = result.percentile > 90 ? "top 10%" : result.percentile > 80 ? "top 20%" : "upper quartile";
  
  const arrearText = student.academicHistory.reduce((acc, curr) => acc + curr.arrears, 0) === 0 
    ? "zero arrears" 
    : "some academic backlogs";

  const caution = result.redFlags.length > 0 
    ? `Caution: ${result.redFlags[0]}.` 
    : "Record is clean.";

  return `${student.name} is recommended for ${result.badge === 'ELITE' ? 'High-Pressure National Hackathons' : 'Standard Technical Events'}. Reasoning: Innovation score ranks in the ${rankSuffix} of the department (${innovationDetail}), GitHub velocity of ${student.githubCommits} commits in 90 days, and ${arrearText} across 4 semesters. ${caution} Overall fitness: ${Math.round(result.fitnessScore)}/100 (${result.badge.toLowerCase()} tier).`;
}
