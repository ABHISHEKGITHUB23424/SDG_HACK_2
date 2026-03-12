import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalize(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function calculateSlope(values: number[]): number {
  if (values.length < 2) return 0;
  const n = values.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += values[i];
    sumXY += i * values[i];
    sumX2 += i * i;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  return slope;
}

export function getBadgeColor(badge: string): string {
  switch (badge) {
    case 'ELITE': return '#ca8a04'; // Gold
    case 'ELIGIBLE': return '#059669'; // Emerald
    case 'HIGH_RISK': return '#d97706'; // Amber
    case 'REMEDIAL': return '#dc2626'; // Red
    default: return '#94a3b8';
  }
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function getDepartmentColor(dept: string): string {
  const colors: Record<string, string> = {
    'CSE': '#3b82f6',
    'ECE': '#8b5cf6',
    'IT': '#06b6d4',
    'MECH': '#f59e0b',
  };
  return colors[dept] || '#64748b';
}

export function calculatePercentile(score: number, allScores: number[]): number {
  if (!allScores.length) return 0;
  const lowerThan = allScores.filter(s => s < score).length;
  return (lowerThan / allScores.length) * 100;
}

