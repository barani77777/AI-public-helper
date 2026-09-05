// CivicAI — AI Complaint Classification Service Architecture
// Provides a clean abstraction layer decoupling UI from backend AI providers (e.g. Gemini, OpenAI, or local models).

import { 
  AIClassificationResult, 
  CategoryId, 
  ComplaintInput, 
  DepartmentInfo, 
  SeverityLevel 
} from '../types/complaint';
import { assessComplaintPriority } from './priorityEngine';

export interface IAIClassifierService {
  classifyComplaint(input: ComplaintInput): Promise<AIClassificationResult>;
  validateInput(input: ComplaintInput): { isValid: boolean; errors: string[] };
}

// Official civic departments mapping
export const CIVIC_DEPARTMENTS: Record<CategoryId, DepartmentInfo> = {
  pothole: {
    name: 'Tamil Nadu Highways Department & City Corporation Works',
    code: 'TNHIGHWAYS / GCC',
    sla: '24-48 Hours',
    phone: '1913 / 1800-425-1913',
    website: 'https://tnhighways.tn.gov.in',
    emergencyHotline: '1913',
  },
  garbage: {
    name: 'Municipal Solid Waste Management & Health Bureau',
    code: 'SWM-TN',
    sla: '12-24 Hours',
    phone: '1913 (Chennai) / Toll-Free 1800-425-4666',
    website: 'https://chennaicorporation.gov.in',
    emergencyHotline: '1913',
  },
  streetlight: {
    name: 'TANGEDCO (TNEB) & Corporation Electrical Division',
    code: 'TANGEDCO / TNEB',
    sla: '24 Hours',
    phone: '94987 94987 (TNEB Minnagam) / 1912',
    website: 'https://www.tangedco.gov.in',
    emergencyHotline: '1912',
  },
  water_leak: {
    name: 'CMWSSB (Metro Water) & TWAD Board',
    code: 'CMWSSB / TWAD',
    sla: '4-8 Hours (High Urgency)',
    phone: '044-45674567 / 1916',
    website: 'https://chennaimetrowater.tn.gov.in',
    emergencyHotline: '1916',
  },
  drainage: {
    name: 'Storm Water Drainage & Sewerage Board',
    code: 'SWD-TN',
    sla: '8-16 Hours',
    phone: '1916 / 1913',
    website: 'https://chennaicorporation.gov.in',
    emergencyHotline: '1916',
  },
  infrastructure: {
    name: 'Public Works Department (PWD) / Bridges & Structures',
    code: 'TN-PWD',
    sla: '48-72 Hours',
    phone: '044-25671555',
    website: 'https://tn.gov.in',
    emergencyHotline: '1100',
  },
  other: {
    name: 'Chief Minister Special Cell & Municipal Grievance Redressal',
    code: 'CM-1100',
    sla: '48 Hours',
    phone: '1100 (CM Helpline)',
    website: 'https://cmhelpline.tnega.org',
    emergencyHotline: '1100',
  },
};

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  pothole: 'Pothole / Road Damage',
  garbage: 'Garbage / Solid Waste',
  streetlight: 'Broken Streetlight',
  water_leak: 'Water Leakage',
  drainage: 'Drainage / Sewage Block',
  infrastructure: 'Public Infrastructure Damage',
  other: 'Other Civic Issues',
};

/**
 * Deterministic Mock AI Classifier implementation for development & testing.
 * Can be swapped for a real Gemini Multimodal API endpoint in production.
 */
export class MockAIClassifierService implements IAIClassifierService {
  private simulateDelayMs: number;

  constructor(simulateDelayMs = 1200) {
    this.simulateDelayMs = simulateDelayMs;
  }

  validateInput(input: ComplaintInput): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!input.description || input.description.trim().length < 10) {
      errors.push('Complaint description must contain at least 10 characters.');
    }
    if (!input.location || input.location.trim().length < 3) {
      errors.push('A valid location or landmark must be specified.');
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async classifyComplaint(input: ComplaintInput): Promise<AIClassificationResult> {
    const validation = this.validateInput(input);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(' '));
    }

    // Simulate realistic AI network latency
    if (this.simulateDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.simulateDelayMs));
    }

    const text = input.description.toLowerCase();
    
    // Category classification keyword heuristics
    let detectedId: CategoryId = 'other';
    let baseConfidence = 92;

    if (
      text.includes('pothole') ||
      text.includes('crater') ||
      text.includes('asphalt') ||
      text.includes('road broken') ||
      text.includes('hole in road') ||
      text.includes('tarmac')
    ) {
      detectedId = 'pothole';
      baseConfidence = 96;
    } else if (
      text.includes('garbage') ||
      text.includes('waste') ||
      text.includes('trash') ||
      text.includes('dump') ||
      text.includes('bin overflow') ||
      text.includes('smell') ||
      text.includes('litter')
    ) {
      detectedId = 'garbage';
      baseConfidence = 95;
    } else if (
      text.includes('light') ||
      text.includes('lamp') ||
      text.includes('dark') ||
      text.includes('pole') ||
      text.includes('streetlight') ||
      text.includes('bulb')
    ) {
      detectedId = 'streetlight';
      baseConfidence = 94;
    } else if (
      text.includes('water') ||
      text.includes('leak') ||
      text.includes('pipe') ||
      text.includes('burst') ||
      text.includes('gush') ||
      text.includes('drinking water')
    ) {
      detectedId = 'water_leak';
      baseConfidence = 97;
    } else if (
      text.includes('drain') ||
      text.includes('sewage') ||
      text.includes('gutter') ||
      text.includes('clog') ||
      text.includes('stagnant') ||
      text.includes('overflow')
    ) {
      detectedId = 'drainage';
      baseConfidence = 91;
    } else if (
      text.includes('bridge') ||
      text.includes('median') ||
      text.includes('sidewalk') ||
      text.includes('footpath') ||
      text.includes('railing') ||
      text.includes('curb') ||
      text.includes('wall')
    ) {
      detectedId = 'infrastructure';
      baseConfidence = 89;
    }

    // If citizen specified categoryHint, boost confidence if aligned
    if (input.categoryHint && input.categoryHint.toLowerCase().includes(detectedId)) {
      baseConfidence = Math.min(99, baseConfidence + 2);
    }

    // Determine severity
    let severity: SeverityLevel = 'Moderate';
    if (text.includes('accident') || text.includes('hazard') || text.includes('emergency') || text.includes('burst')) {
      severity = 'Critical';
    } else if (text.includes('deep') || text.includes('large') || text.includes('severe') || text.includes('flooding')) {
      severity = 'Severe';
    } else if (text.includes('minor') || text.includes('small') || text.includes('slight')) {
      severity = 'Low';
    }

    // Assess priority with independent priority engine
    const priorityAssessment = assessComplaintPriority({
      category: detectedId,
      description: input.description,
      peopleAffected: input.peopleAffected,
      location: input.location,
      hasImage: !!input.imageUrl,
    });

    // Recommended department
    const dept = CIVIC_DEPARTMENTS[detectedId];

    // Recommended action based on category
    const actions: Record<CategoryId, string> = {
      pothole: 'Dispatch rapid cold-mix / mastic asphalt patching squad with road-work safety cones.',
      garbage: 'Deploy municipal compactor truck and sanitary sweeping crew with disinfectant spray.',
      streetlight: 'Dispatch TANGEDCO aerial bucket truck to replace burnt sodium/LED fixture and fuse.',
      water_leak: 'Isolate municipal section valve to halt potable water loss; excavate and sleeve pipeline.',
      drainage: 'Deploy super-sucker vacuum machine and storm drain de-silting crew to clear blockage.',
      infrastructure: 'Erect structural safety perimeter; schedule civic engineering site assessment.',
      other: 'Route to Ward Grievance Officer for field inspection and inter-departmental triage.',
    };

    // Synthesized summary
    const summary = input.description.length > 90 
      ? input.description.slice(0, 88).trim() + '...' 
      : input.description;

    const reportId = `CIV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      id: reportId,
      detectedCategory: CATEGORY_LABELS[detectedId],
      categoryId: detectedId,
      confidence: baseConfidence,
      severity,
      estimatedImpact: `${input.peopleAffected} citizens affected in ${input.district || 'Metro Area'}`,
      peopleAffected: input.peopleAffected,
      priority: priorityAssessment.level,
      priorityScore: priorityAssessment.score,
      priorityReason: priorityAssessment.reason,
      contributingFactors: priorityAssessment.factors,
      extractedSummary: summary,
      recommendedDepartment: dept,
      recommendedAction: actions[detectedId],
      location: input.location,
      district: input.district || 'Chennai',
      coords: input.coords,
      imageUrl: input.imageUrl,
      timestamp: new Date().toISOString(),
    };
  }
}

// Singleton instance for app usage
export const aiClassifier = new MockAIClassifierService();
