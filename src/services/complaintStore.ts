// CivicAI — Complaint Store & Persistence Layer

import { 
  ComplaintRecord, 
  ComplaintFilterOptions, 
  ComplaintStatus 
} from '../types/complaint';
import { CIVIC_DEPARTMENTS } from './aiClassifier';
import { getAssetUrl } from '../utils/assets';

const STORAGE_KEY = 'civic_ai_complaints_v4';

export const INITIAL_COMPLAINTS: ComplaintRecord[] = [
  {
    id: 'CIV-2026-1042',
    title: 'Severe crater pothole near Gemini Flyover, Anna Salai',
    description: 'Deep 3-foot pothole on outer arterial lane causing severe traffic slowdowns and bike accidents during peak evening rush.',
    category: 'Pothole / Road Damage',
    categoryId: 'pothole',
    confidence: 97,
    severity: 'Critical',
    priority: 'High',
    priorityScore: 88,
    priorityReason: 'Critical two-wheeler collision risk on busy Chennai arterial highway (NH 45 / Anna Salai). Immediate repair needed.',
    location: 'Anna Salai near Gemini Flyover, Chennai (Ward 112)',
    district: 'Chennai',
    coords: { lat: 13.0520, lng: 80.2510, mapX: 68, mapY: 34 },
    department: 'Tamil Nadu Highways Department & City Corporation Works',
    departmentInfo: CIVIC_DEPARTMENTS.pothole,
    status: 'In Progress',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02T16:30:00Z',
    reporter: 'Citizen #8412',
    affectedPeople: 450,
    aiSummary: 'Dangerous crater pothole on major expressway requiring rapid cold-patch asphalt.',
    recommendedAction: 'Dispatch rapid cold-mix / mastic asphalt patching squad with road-work safety cones.',
    timeline: [
      { id: 't1', status: 'Submitted', label: 'Complaint Lodged', timestamp: '2026-09-02T16:30:00Z', actor: 'Citizen Portal' },
      { id: 't2', status: 'Classified', label: 'AI Classification Completed (97% Conf)', timestamp: '2026-09-02T16:30:05Z', actor: 'CivicAI Classifier Engine' },
      { id: 't3', status: 'Assigned', label: 'Routed to GCC Ward 112 Highways Squad', timestamp: '2026-09-02T17:15:00Z', actor: 'GCC Smart City Dispatch' },
      { id: 't4', status: 'In Progress', label: 'Repair Squad Mobilized On-Site', timestamp: '2026-09-03T09:00:00Z', actor: 'Divisional Engineer' },
    ],
  },
  {
    id: 'CIV-2026-1039',
    title: 'Drinking water pipeline rupture flooding Cross Cut Road',
    description: 'High-pressure clean water gushing from underground rupture. Drinking water being wasted and commercial shops facing road water stagnation.',
    category: 'Water Leakage',
    categoryId: 'water_leak',
    confidence: 98,
    severity: 'Severe',
    priority: 'Critical',
    priorityScore: 94,
    priorityReason: 'Treated drinking water loss and potential road foundation sinking under heavy commercial bus traffic.',
    location: 'Cross Cut Road, Gandhipuram, Coimbatore (Ward 54)',
    district: 'Coimbatore',
    coords: { lat: 11.0168, lng: 76.9672, mapX: 36, mapY: 62 },
    department: 'CMWSSB (Metro Water) & TWAD Board',
    departmentInfo: CIVIC_DEPARTMENTS.water_leak,
    status: 'In Progress',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02T14:15:00Z',
    reporter: 'Citizen #6921',
    affectedPeople: 1200,
    aiSummary: 'Pressurized municipal drinking water main rupture flooding road lane.',
    recommendedAction: 'Isolate section valve; deploy pipe excavation squad.',
    timeline: [
      { id: 't1', status: 'Submitted', label: 'Complaint Lodged', timestamp: '2026-09-02T14:15:00Z', actor: 'Citizen Portal' },
      { id: 't2', status: 'Classified', label: 'AI Classification Completed (98% Conf)', timestamp: '2026-09-02T14:15:04Z', actor: 'CivicAI Classifier Engine' },
      { id: 't3', status: 'Assigned', label: 'Routed to Metro Water Zone 4', timestamp: '2026-09-02T14:40:00Z', actor: 'TWAD Control Room' },
      { id: 't4', status: 'In Progress', label: 'Pressure Valve Isolated, Excavation Active', timestamp: '2026-09-02T16:00:00Z', actor: 'Emergency Pipeline Crew' },
    ],
  },
  {
    id: 'CIV-2026-1035',
    title: 'Overflowing garbage bin near Mattuthavani Bus Stand',
    description: 'Solid waste container overflowing for 4 days near wholesale flower market. Waste spilling across walkway causing foul odor.',
    category: 'Garbage / Solid Waste',
    categoryId: 'garbage',
    confidence: 94,
    severity: 'Moderate',
    priority: 'Medium',
    priorityScore: 62,
    priorityReason: 'Sanitation concern near major public transit terminal. Scheduled for rapid compactor truck pickup.',
    location: 'Mattuthavani Bus Stand Road, Madurai (Ward 28)',
    district: 'Madurai',
    coords: { lat: 9.9390, lng: 78.1560, mapX: 52, mapY: 78 },
    department: 'Municipal Solid Waste Management & Health Bureau',
    departmentInfo: CIVIC_DEPARTMENTS.garbage,
    status: 'Assigned',
    imageUrl: getAssetUrl('/images/garbage_landfill.jpg'),
    createdAt: '2026-09-02T11:20:00Z',
    reporter: 'Citizen #1029',
    affectedPeople: 850,
    aiSummary: 'Massive open garbage dump overflow with heavy machinery operating.',
    recommendedAction: 'Deploy compactor truck and sanitary sweeping crew.',
    timeline: [
      { id: 't1', status: 'Submitted', label: 'Complaint Lodged', timestamp: '2026-09-02T11:20:00Z', actor: 'Citizen Portal' },
      { id: 't2', status: 'Classified', label: 'AI Classification Completed (94% Conf)', timestamp: '2026-09-02T11:20:05Z', actor: 'CivicAI Classifier Engine' },
      { id: 't3', status: 'Assigned', label: 'Routed to SWM Madurai East Depot', timestamp: '2026-09-02T13:00:00Z', actor: 'Sanitary Inspector' },
    ],
  },
  {
    id: 'CIV-2026-1028',
    title: 'Streetlamp non-functional near Thillai Nagar Cross Road',
    description: 'Streetlight #SL-204 is dark since last Friday. Women and school students face difficulty crossing at night.',
    category: 'Broken Streetlight',
    categoryId: 'streetlight',
    confidence: 92,
    severity: 'Moderate',
    priority: 'Medium',
    priorityScore: 56,
    priorityReason: 'Residential security and pedestrian visibility reduced; scheduled for TNEB lineworker inspection.',
    location: 'Thillai Nagar 11th Cross, Tiruchirappalli',
    district: 'Tiruchirappalli',
    coords: { lat: 10.8260, lng: 78.6880, mapX: 48, mapY: 48 },
    department: 'TANGEDCO (TNEB) & Corporation Electrical Division',
    departmentInfo: CIVIC_DEPARTMENTS.streetlight,
    status: 'Assigned',
    imageUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02T08:50:00Z',
    reporter: 'Citizen #4511',
    affectedPeople: 85,
    aiSummary: 'Non-functional street fixture creating dark pedestrian corner.',
    recommendedAction: 'Dispatch TANGEDCO bucket truck to replace fixture.',
    timeline: [
      { id: 't1', status: 'Submitted', label: 'Complaint Lodged', timestamp: '2026-09-02T08:50:00Z', actor: 'Citizen Portal' },
      { id: 't2', status: 'Classified', label: 'AI Classification Completed (92% Conf)', timestamp: '2026-09-02T08:50:06Z', actor: 'CivicAI Classifier Engine' },
      { id: 't3', status: 'Assigned', label: 'Dispatched to TNEB Trichy West Squad', timestamp: '2026-09-02T10:15:00Z', actor: 'Minnagam Helpline' },
    ],
  },
  {
    id: 'CIV-2026-1015',
    title: 'Residential drain canal choked with plastic waste & silt',
    description: 'Colony open drainage canal completely blocked with plastic waste and mud silt; foul wastewater stagnating adjacent to homes.',
    category: 'Drainage / Sewage Block',
    categoryId: 'drainage',
    confidence: 95,
    severity: 'Severe',
    priority: 'High',
    priorityScore: 82,
    priorityReason: 'Open residential drainage canal choke with plastic debris creating mosquito breeding hazard and monsoon flooding risk.',
    location: 'Anuppanadi Canal Bank Road, Madurai (Ward 46)',
    district: 'Madurai',
    coords: { lat: 9.9120, lng: 78.1410, mapX: 42, mapY: 28 },
    department: 'Storm Water Drainage & Sewerage Board',
    departmentInfo: CIVIC_DEPARTMENTS.drainage,
    status: 'In Progress',
    imageUrl: getAssetUrl('/images/drainage_waste_canal.jpg'),
    createdAt: '2026-09-01T15:30:00Z',
    reporter: 'Citizen #7723',
    affectedPeople: 40,
    aiSummary: 'Surface storm drain grate blocked with silt and debris.',
    recommendedAction: 'Deploy storm drain silt sweep.',
    timeline: [
      { id: 't1', status: 'Submitted', label: 'Complaint Lodged', timestamp: '2026-09-01T15:30:00Z', actor: 'Citizen Portal' },
      { id: 't2', status: 'Classified', label: 'AI Classification Completed (89% Conf)', timestamp: '2026-09-01T15:30:04Z', actor: 'CivicAI Classifier Engine' },
      { id: 't3', status: 'Assigned', label: 'Assigned to Ward 19 Desilting Gang', timestamp: '2026-09-01T17:00:00Z', actor: 'SWD Board' },
      { id: 't4', status: 'In Progress', label: 'Grates Cleared and Silt Bagged', timestamp: '2026-09-02T08:00:00Z', actor: 'Field Supervisor' },
      { id: 't5', status: 'Resolved', label: 'Clearance Inspected and Closed', timestamp: '2026-09-02T12:00:00Z', actor: 'Ward Engineer' },
    ],
  },
];

export class ComplaintStore {
  static getComplaints(): ComplaintRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load complaints from localStorage', e);
    }
    return INITIAL_COMPLAINTS;
  }

  static saveComplaints(complaints: ComplaintRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.warn('Failed to save complaints to localStorage', e);
    }
  }

  static getById(id: string): ComplaintRecord | undefined {
    const list = this.getComplaints();
    return list.find((c) => c.id === id);
  }

  static addComplaint(complaint: ComplaintRecord): void {
    const list = this.getComplaints();
    const updated = [complaint, ...list];
    this.saveComplaints(updated);
  }

  static updateStatus(id: string, newStatus: ComplaintStatus, actor = 'Municipal Officer'): void {
    const list = this.getComplaints();
    const index = list.findIndex((c) => c.id === id);
    if (index !== -1) {
      const item = list[index];
      const newTimelineItem = {
        id: `t_${Date.now()}`,
        status: newStatus,
        label: `Status updated to ${newStatus}`,
        timestamp: new Date().toISOString(),
        actor,
      };
      item.status = newStatus;
      item.timeline = [...item.timeline, newTimelineItem];
      item.updatedAt = new Date().toISOString();
      list[index] = item;
      this.saveComplaints(list);
    }
  }

  static filterComplaints(
    complaints: ComplaintRecord[],
    options: ComplaintFilterOptions
  ): ComplaintRecord[] {
    return complaints.filter((item) => {
      if (options.searchQuery) {
        const query = options.searchQuery.toLowerCase();
        const matchesQuery = 
          item.id.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      if (options.category && options.category !== 'all') {
        if (item.categoryId !== options.category) return false;
      }

      if (options.priority && options.priority !== 'all') {
        if (item.priority !== options.priority) return false;
      }

      if (options.status && options.status !== 'all') {
        if (item.status !== options.status) return false;
      }

      if (options.district && options.district !== 'all') {
        if (item.district !== options.district) return false;
      }

      return true;
    }).sort((a, b) => {
      if (options.sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (options.sortBy === 'priority') {
        return (b.priorityScore || 0) - (a.priorityScore || 0);
      }
      if (options.sortBy === 'affected') {
        return (b.affectedPeople || 0) - (a.affectedPeople || 0);
      }
      // default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
}
