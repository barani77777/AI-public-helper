// CivicAI — Priority Assessment Engine (Pure, Deterministic, Testable)
// Evaluates Severity, Population Impact, Public Safety, Infrastructure Criticality, and Urgency.

import { 
  PriorityLevel, 
  PriorityAssessment, 
  PriorityFactor, 
  SeverityLevel 
} from '../types/complaint';

export interface PriorityEngineInput {
  category: string;
  description: string;
  peopleAffected: number;
  location?: string;
  hasImage?: boolean;
}

/**
 * Calculates population impact score from estimated citizen count
 */
export function calculatePopulationScore(count: number): { score: number; description: string } {
  if (count >= 1000) {
    return { score: 100, description: 'Over 1,000 citizens impacted across major district corridor' };
  }
  if (count >= 200) {
    return { score: 85, description: '200–1,000 citizens impacted in high-density urban sector' };
  }
  if (count >= 50) {
    return { score: 65, description: '50–200 citizens impacted along commercial or transit avenue' };
  }
  if (count >= 10) {
    return { score: 40, description: '10–50 citizens impacted in residential neighborhood zone' };
  }
  return { score: 20, description: 'Localized issue directly affecting fewer than 10 residents' };
}

/**
 * Evaluates public safety hazard tokens from complaint description
 */
export function evaluateSafetyImpact(text: string, category: string): { score: number; description: string } {
  const lower = text.toLowerCase();
  
  const criticalTokens = [
    'electrocution', 'live wire', 'spark', 'shock', 'accident', 'collision',
    'hospital', 'school', 'sinkhole', 'subside', 'collapse', 'deep hole', 'severe'
  ];
  
  const moderateTokens = [
    'skid', 'brake', 'night', 'dark', 'fall', 'slippery', 'stagnant',
    'smell', 'mosquito', 'choke', 'jam', 'bus stop', 'market'
  ];

  let matchesCritical = criticalTokens.filter(token => lower.includes(token));
  let matchesModerate = moderateTokens.filter(token => lower.includes(token));

  if (matchesCritical.length >= 2) {
    return { score: 95, description: `Extreme hazard detected (${matchesCritical.slice(0, 2).join(', ')}) with severe injury or casualty risk` };
  }
  if (matchesCritical.length === 1) {
    return { score: 80, description: `Elevated hazard flagged (${matchesCritical[0]}) with immediate public safety concern` };
  }
  if (matchesModerate.length >= 2) {
    return { score: 60, description: `Moderate safety risk noted (${matchesModerate.slice(0, 2).join(', ')}) causing pedestrian or traffic friction` };
  }
  if (matchesModerate.length === 1) {
    return { score: 45, description: `Minor safety or visibility nuisance detected (${matchesModerate[0]})` };
  }

  // Category defaults
  if (category === 'pothole' || category === 'water_leak') {
    return { score: 50, description: 'Inherent vehicular road hazard or pressurized pipe rupture' };
  }
  return { score: 25, description: 'Standard non-hazardous civic infrastructure maintenance' };
}

/**
 * Evaluates infrastructure corridor importance
 */
export function evaluateInfrastructureScore(locationText: string): { score: number; description: string } {
  const lower = (locationText || '').toLowerCase();
  
  const arterialKeywords = ['highway', 'arterial', 'main road', 'salai', 'flyover', 'junction', 'expressway', 'avenue'];
  const commercialKeywords = ['market', 'bus stand', 'station', 'hospital', 'square', 'bazaar'];

  if (arterialKeywords.some(kw => lower.includes(kw))) {
    return { score: 90, description: 'High-speed arterial expressway or major public transit arterial corridor' };
  }
  if (commercialKeywords.some(kw => lower.includes(kw))) {
    return { score: 75, description: 'Busy commercial market square or municipal transit node' };
  }
  return { score: 40, description: 'Local municipal street or residential feeder lane' };
}

/**
 * Main Priority Assessment Engine
 * Transparent, deterministic score calculation
 */
export function assessComplaintPriority(input: PriorityEngineInput): PriorityAssessment {
  const pop = calculatePopulationScore(input.peopleAffected);
  const safety = evaluateSafetyImpact(input.description, input.category);
  const infra = evaluateInfrastructureScore(input.location || '');
  
  // Image verification adds 5% confidence to urgency
  const evidenceScore = input.hasImage ? 80 : 40;
  const evidenceDesc = input.hasImage 
    ? 'Visual photographic evidence provided for verification' 
    : 'No photographic evidence provided (requires field confirmation)';

  // Weighted formula:
  // Safety: 35% | Population: 30% | Infrastructure: 25% | Evidence: 10%
  const safetyWeight = 0.35;
  const popWeight = 0.30;
  const infraWeight = 0.25;
  const evidenceWeight = 0.10;

  const totalScore = Math.round(
    safety.score * safetyWeight +
    pop.score * popWeight +
    infra.score * infraWeight +
    evidenceScore * evidenceWeight
  );

  let level: PriorityLevel;
  let baseReason: string;

  if (totalScore >= 85) {
    level = 'Critical';
    baseReason = 'Immediate public safety or structural collapse risk affecting significant population. Urgent dispatch required.';
  } else if (totalScore >= 65) {
    level = 'High';
    baseReason = 'High civic disruption or notable road accident hazard. Scheduled for priority 24-hour response.';
  } else if (totalScore >= 40) {
    level = 'Medium';
    baseReason = 'Moderate urban service disruption affecting daily neighborhood commute. Slated for standard department SLA.';
  } else {
    level = 'Low';
    baseReason = 'Minor civic concern with minimal public safety impact. Scheduled for routine maintenance cycle.';
  }

  const factors: PriorityFactor[] = [
    { factor: 'Public Safety Impact', score: safety.score, weight: safetyWeight, description: safety.description },
    { factor: 'Affected Population', score: pop.score, weight: popWeight, description: pop.description },
    { factor: 'Infrastructure Corridor', score: infra.score, weight: infraWeight, description: infra.description },
    { factor: 'Evidence Verification', score: evidenceScore, weight: evidenceWeight, description: evidenceDesc },
  ];

  return {
    level,
    score: totalScore,
    reason: baseReason,
    factors,
    disclaimer: 'AI-Assessed Advisory Priority — Calculated deterministically from description semantics, population impact, and infrastructure corridor. Subject to official municipal engineer review.',
  };
}
