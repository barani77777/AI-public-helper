// CivicAI — Public Facility Complaint Classifier Types & Data Models

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type ComplaintStatus = 
  | 'Submitted' 
  | 'AI Processing' 
  | 'Classified' 
  | 'Assigned' 
  | 'In Progress' 
  | 'Resolved';

export type SeverityLevel = 'Low' | 'Moderate' | 'Severe' | 'Critical';

export type CategoryId = 
  | 'pothole' 
  | 'garbage' 
  | 'streetlight' 
  | 'water_leak' 
  | 'drainage' 
  | 'infrastructure' 
  | 'other';

export interface CategoryDefinition {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
  description: string;
  keywords: string[];
}

export interface DepartmentInfo {
  name: string;
  code: string;
  sla: string;
  phone: string;
  website: string;
  email?: string;
  emergencyHotline?: string;
}

export interface PriorityFactor {
  factor: string;
  score: number; // 0 - 100
  weight: number; // e.g. 0.35
  description: string;
}

export interface PriorityAssessment {
  level: PriorityLevel;
  score: number; // 0 - 100
  reason: string;
  factors: PriorityFactor[];
  disclaimer: string;
}

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  label: string;
  timestamp: string;
  actor: string;
  notes?: string;
}

export interface LocationCoords {
  lat: number;
  lng: number;
  mapX?: number; // Normalized coordinate (0-100) for isometric / SVG map
  mapY?: number;
}

export interface ComplaintInput {
  description: string;
  imageUrl?: string | null;
  location: string;
  district?: string;
  coords?: LocationCoords;
  peopleAffected: number; // Estimated count of people affected
  additionalNotes?: string;
  categoryHint?: string;
}

export interface AIClassificationResult {
  id: string;
  detectedCategory: string;
  categoryId: CategoryId;
  confidence: number; // 0 - 100
  severity: SeverityLevel;
  estimatedImpact: string;
  peopleAffected: number;
  priority: PriorityLevel;
  priorityScore: number;
  priorityReason: string;
  contributingFactors: PriorityFactor[];
  extractedSummary: string;
  recommendedDepartment: DepartmentInfo;
  recommendedAction: string;
  location: string;
  district: string;
  coords?: LocationCoords;
  imageUrl?: string | null;
  timestamp: string;
}

export interface ComplaintRecord {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: CategoryId;
  confidence: number;
  severity: SeverityLevel;
  priority: PriorityLevel;
  priorityScore: number;
  priorityReason: string;
  contributingFactors?: PriorityFactor[];
  district: string;
  location: string;
  coords: LocationCoords;
  department: string;
  departmentInfo?: DepartmentInfo;
  status: ComplaintStatus;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt?: string;
  reporter: string;
  affectedPeople: number;
  recommendedAction?: string;
  aiSummary?: string;
  timeline: TimelineEvent[];
}

export interface ComplaintFilterOptions {
  searchQuery?: string;
  category?: CategoryId | 'all';
  priority?: PriorityLevel | 'all';
  status?: ComplaintStatus | 'all';
  district?: string | 'all';
  sortBy?: 'newest' | 'oldest' | 'priority' | 'affected';
}
