// CivicAI — Public Facility Complaint Classifier (Tamil Nadu Infrastructure)

export const TN_DISTRICTS = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Tirunelveli',
  'Tiruppur',
  'Erode',
  'Vellore',
  'Thoothukudi',
  'Dindigul',
  'Thanjavur',
  'Kanchipuram',
  'Chengalpattu'
];

export const CATEGORIES = [
  { 
    id: 'pothole', 
    label: 'Pothole', 
    icon: 'AlertTriangle', 
    color: '#DC2626',
    description: 'Road craters, sunken asphalt, or deep holes causing vehicle hazards.'
  },
  { 
    id: 'garbage', 
    label: 'Garbage Dump', 
    icon: 'Trash2', 
    color: '#D97706',
    description: 'Overflowing street bins, roadside trash piles, or uncollected commercial waste.'
  },
  { 
    id: 'streetlight', 
    label: 'Streetlight', 
    icon: 'Lightbulb', 
    color: '#2563EB',
    description: 'Flickering lamps, burnt sodium vapor bulbs, or dark neighborhood roads.'
  },
  { 
    id: 'water_leak', 
    label: 'Water Leak', 
    icon: 'Droplets', 
    color: '#0284C7',
    description: 'Underground drinking water pipeline rupture or pressurized street pipe leak.'
  },
  { 
    id: 'road_damage', 
    label: 'Road Damage', 
    icon: 'Construction', 
    color: '#EA580C',
    description: 'Damaged speed breakers, cracked asphalt edges, or broken center medians.'
  },
  { 
    id: 'drainage', 
    label: 'Drainage Block', 
    icon: 'Waves', 
    color: '#7C3AED',
    description: 'Clogged storm water drains, overflowing sewage grates, or stagnant water.'
  },
  { 
    id: 'sanitation', 
    label: 'Sanitation', 
    icon: 'Sparkles', 
    color: '#059669',
    description: 'Public toilet maintenance, open drains, or unsanitary community spaces.'
  },
  { 
    id: 'other', 
    label: 'Other Issues', 
    icon: 'HelpCircle', 
    color: '#64748B',
    description: 'Fallen trees, encroachments, or miscellaneous civic concerns.'
  }
];

// Official Municipal & State Authorities in Tamil Nadu
export const DEPARTMENTS = {
  pothole: { 
    name: 'Tamil Nadu Highways Department & City Corporation Works', 
    code: 'TNHIGHWAYS / GCC', 
    sla: '24-48 Hours', 
    phone: '1913 / 1800-425-1913',
    website: 'https://tnhighways.tn.gov.in'
  },
  garbage: { 
    name: 'Municipal Solid Waste Management & Health Bureau', 
    code: 'SWM-TN', 
    sla: '12-24 Hours', 
    phone: '1913 (Chennai) / Toll-Free 1800-425-4666',
    website: 'https://chennaicorporation.gov.in'
  },
  streetlight: { 
    name: 'TANGEDCO (TNEB) & Corporation Electrical Division', 
    code: 'TANGEDCO / TNEB', 
    sla: '24 Hours', 
    phone: '94987 94987 (TNEB Minnagam) / 1912',
    website: 'https://www.tangedco.gov.in'
  },
  water_leak: { 
    name: 'CMWSSB (Metro Water) & TWAD Board', 
    code: 'CMWSSB / TWAD', 
    sla: '4-8 Hours (High Urgency)', 
    phone: '044-45674567 / 1916',
    website: 'https://chennaimetrowater.tn.gov.in'
  },
  road_damage: { 
    name: 'Public Works Department (PWD) / Municipal Engineering', 
    code: 'TN-PWD', 
    sla: '48-72 Hours', 
    phone: '044-25671555',
    website: 'https://tn.gov.in'
  },
  drainage: { 
    name: 'Storm Water Drainage & Sewerage Board', 
    code: 'SWD-TN', 
    sla: '8-16 Hours', 
    phone: '1916 / 1913',
    website: 'https://chennaicorporation.gov.in'
  },
  sanitation: { 
    name: 'Directorate of Public Health & City Hygiene', 
    code: 'DPH-TN', 
    sla: '24 Hours', 
    phone: '104 (Health Helpline)',
    website: 'https://stopcorona.tn.gov.in'
  },
  other: { 
    name: 'CMDA & Chief Minister Special Cell (CM Helpline)', 
    code: 'CM-1100', 
    sla: '48 Hours', 
    phone: '1100 (CM Helpline)',
    website: 'https://cmhelpline.tnega.org'
  }
};

// Google Reference Photos Guide for Tamil Nadu Infrastructure
// Real-world sample photos illustrating how citizens should photograph public facility complaints
export const REFERENCE_PHOTOS_GUIDE = [
  {
    id: 'ref-pothole',
    category: 'Pothole',
    title: 'Deep Road Pothole Reference',
    description: 'Capture the depth of the pothole with clear road context and nearby landmark.',
    tips: 'Include surrounding road lane so engineers know the vehicle collision risk.',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    sampleText: 'Deep 2-foot pothole on main road causing sudden brake jams and bike skids.',
    location: 'Anna Salai near Thousand Lights, Chennai',
    district: 'Chennai'
  },
  {
    id: 'ref-garbage',
    category: 'Garbage Dump',
    title: 'Massive Open Landfill & Waste Reference',
    description: 'Capture active heavy machinery, overflowing dumping terrain, or roadside waste piles.',
    tips: 'Show earthmovers or waste depth encroaching into surrounding settlement paths.',
    imageUrl: '/images/garbage_landfill.jpg',
    sampleText: 'Massive open garbage dump overflowing with tractor scrapers operating; pungent stench and plastic pollution in surrounding area.',
    location: 'Perungudi / Pallikaranai Dump Yard Corridor, Chennai',
    district: 'Chennai'
  },
  {
    id: 'ref-water',
    category: 'Water Leak',
    title: 'Drinking Water Pipeline Burst',
    description: 'Photograph the active water flow and puddle spreading onto asphalt or pavement.',
    tips: 'Shows clean drinking water loss so Metro Water can isolate the pressure valve quickly.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
    sampleText: 'High pressure drinking water pipeline leaking onto road, wasting supply.',
    location: 'Goripalayam Main Junction, Madurai',
    district: 'Madurai'
  },
  {
    id: 'ref-light',
    category: 'Streetlight',
    title: 'Dark / Broken Streetlamp Reference',
    description: 'Photograph the pole number or unlit fixture in low ambient evening light.',
    tips: 'Mention pole ID number painted in yellow/black on the pole base if visible.',
    imageUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80',
    sampleText: 'Streetlight #SL-409 non-functional for past week; crosswalk completely dark.',
    location: 'Thillai Nagar 11th Cross, Tiruchirappalli',
    district: 'Tiruchirappalli'
  },
  {
    id: 'ref-drain',
    category: 'Drainage Block',
    title: 'Residential Silt & Sewage Canal Blockage',
    description: 'Capture open storm drain clogged with plastic debris, mud silt, and domestic refuse.',
    tips: 'Highlight if wastewater is stagnating near colony houses or pedestrian walkways.',
    imageUrl: '/images/drainage_waste_canal.jpg',
    sampleText: 'Colony open drainage canal completely blocked with plastic waste and mud silt; foul wastewater stagnating adjacent to homes.',
    location: 'Anuppanadi Canal Bank Road, Madurai',
    district: 'Madurai'
  },
  {
    id: 'ref-road',
    category: 'Road Damage',
    title: 'Damaged Median & Curbstones',
    description: 'Photograph broken concrete curbs, broken center medians, or fractured speed breakers.',
    tips: 'Shows tripping hazards for elderly pedestrians and night drivers.',
    imageUrl: 'https://images.unsplash.com/photo-1584463699039-383e200bf495?auto=format&fit=crop&w=800&q=80',
    sampleText: 'Damaged concrete median pieces lying scattered across road lane.',
    location: 'Tirunelveli Town Arch Road, Tirunelveli',
    district: 'Tirunelveli'
  }
];

// Seed Complaints in English
export const SAMPLE_COMPLAINTS = [
  {
    id: 'CIV-2026-1042',
    title: 'Severe crater pothole near Gemini Flyover, Anna Salai',
    description: 'Deep 3-foot pothole on outer arterial lane causing severe traffic slowdowns and bike accidents during peak evening rush.',
    category: 'Pothole',
    categoryId: 'pothole',
    confidence: 97,
    priority: 'High',
    priorityScore: 94,
    priorityReason: 'Critical two-wheeler collision risk on busy Chennai arterial highway (NH 45 / Anna Salai). Immediate repair needed.',
    location: 'Anna Salai near Gemini Flyover, Chennai (Ward 112)',
    district: 'Chennai',
    coords: { lat: 13.0520, lng: 80.2510, mapX: 68, mapY: 34 },
    department: 'Tamil Nadu Highways Department & GCC Works',
    status: 'In Progress',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02T16:30:00Z',
    reporter: 'Citizen #8412'
  },
  {
    id: 'CIV-2026-1039',
    title: 'Drinking water pipeline rupture flooding Cross Cut Road',
    description: 'High-pressure clean water gushing from underground rupture. Drinking water being wasted and commercial shops facing road water stagnation.',
    category: 'Water Leak',
    categoryId: 'water_leak',
    confidence: 98,
    priority: 'High',
    priorityScore: 96,
    priorityReason: 'Treated drinking water loss and potential road foundation sinking under commercial traffic.',
    location: 'Cross Cut Road, Gandhipuram, Coimbatore (Ward 54)',
    district: 'Coimbatore',
    coords: { lat: 11.0168, lng: 76.9672, mapX: 36, mapY: 62 },
    department: 'CMWSSB (Metro Water) & TWAD Board',
    status: 'In Progress',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02T14:15:00Z',
    reporter: 'Citizen #6921'
  },
  {
    id: 'CIV-2026-1035',
    title: 'Overflowing garbage bin near Mattuthavani Bus Stand',
    description: 'Solid waste container overflowing for 4 days near wholesale flower market. Waste spilling across walkway causing foul odor.',
    category: 'Garbage Dump',
    categoryId: 'garbage',
    confidence: 94,
    priority: 'Medium',
    priorityScore: 68,
    priorityReason: 'Sanitation concern near major public transit terminal. Scheduled for rapid compactor truck pickup.',
    location: 'Mattuthavani Bus Stand Road, Madurai (Ward 28)',
    district: 'Madurai',
    coords: { lat: 9.9390, lng: 78.1560, mapX: 52, mapY: 78 },
    department: 'Municipal Solid Waste Management & Health Bureau',
    status: 'Pending Dispatch',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02T11:20:00Z',
    reporter: 'Citizen #1029'
  },
  {
    id: 'CIV-2026-1028',
    title: 'Streetlamp non-functional near Thillai Nagar Cross Road',
    description: 'Streetlight #SL-204 is dark since last Friday. Women and school students face difficulty crossing at night.',
    category: 'Streetlight',
    categoryId: 'streetlight',
    confidence: 92,
    priority: 'Medium',
    priorityScore: 60,
    priorityReason: 'Residential security and pedestrian visibility reduced; scheduled for TNEB lineworker inspection.',
    location: 'Thillai Nagar 11th Cross, Tiruchirappalli',
    district: 'Tiruchirappalli',
    coords: { lat: 10.8260, lng: 78.6880, mapX: 48, mapY: 48 },
    department: 'TANGEDCO (TNEB) & Corporation Electrical Division',
    status: 'Pending Dispatch',
    imageUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-02T08:50:00Z',
    reporter: 'Citizen #4511'
  },
  {
    id: 'CIV-2026-1015',
    title: 'Storm water drain silt block near Fairlands Market',
    description: 'Storm drain grates covered in plastic bags and sand. Water taking hours to drain after rainfall.',
    category: 'Drainage Block',
    categoryId: 'drainage',
    confidence: 89,
    priority: 'Low',
    priorityScore: 35,
    priorityReason: 'Localized runoff delay with no building flooding risk. Assigned to routine ward desilting sweep.',
    location: 'Fairlands Main Road, Salem (Ward 19)',
    district: 'Salem',
    coords: { lat: 11.6780, lng: 78.1340, mapX: 42, mapY: 28 },
    department: 'Storm Water Drainage & Sewerage Board',
    status: 'Resolved',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-01T15:30:00Z',
    reporter: 'Citizen #7723'
  }
];

export const PRESET_TEST_SCENARIOS = [
  {
    name: 'Chennai: Perungudi Landfill Waste Pile',
    description: 'Massive open garbage dump overflowing with tractor scrapers operating; pungent stench and plastic pollution blowing into adjacent roads.',
    category: 'Garbage Dump',
    location: 'Perungudi / Pallikaranai Dump Yard Corridor, Chennai',
    district: 'Chennai',
    imageUrl: '/images/garbage_landfill.jpg',
    confidence: 97,
    priority: 'Critical',
    priorityScore: 92,
    reason: 'Massive unmanaged solid waste accumulation with heavy equipment active; high risk of airborne pollutants and leachate contamination.'
  },
  {
    name: 'Madurai: Clogged Drainage Canal',
    description: 'Colony open drainage canal completely choked with plastic garbage, polythene bags, and thick silt; foul wastewater stagnating adjacent to homes.',
    category: 'Drainage Block',
    location: 'Anuppanadi Canal Bank Road, Madurai (Ward 46)',
    district: 'Madurai',
    imageUrl: '/images/drainage_waste_canal.jpg',
    confidence: 95,
    priority: 'High',
    priorityScore: 84,
    reason: 'Major residential stormwater drain choked with non-biodegradable waste; severe mosquito breeding and imminent flood risk during rainfall.'
  },
  {
    name: 'Chennai: Anna Salai Pothole',
    description: 'Deep 3-foot pothole on outer arterial lane causing severe traffic slowdowns and bike accidents during peak evening rush.',
    category: 'Pothole',
    location: 'Anna Salai near Gemini Flyover, Chennai',
    district: 'Chennai',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    confidence: 96,
    priority: 'High',
    priorityScore: 94,
    reason: 'Critical vehicle & two-wheeler hazard on high-speed arterial Chennai expressway; immediate collision risk.'
  },
  {
    name: 'Coimbatore: Water Main Burst',
    description: 'High-pressure clean water gushing from underground rupture. Drinking water wasted and flooding pedestrian sidewalk.',
    category: 'Water Leak',
    location: 'Cross Cut Road, Gandhipuram, Coimbatore',
    district: 'Coimbatore',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
    confidence: 98,
    priority: 'High',
    priorityScore: 96,
    reason: 'Active pressurized pipeline burst wasting municipal drinking water; risk of road sub-base collapse.'
  },
  {
    name: 'Trichy: Dark Streetlight Crosswalk',
    description: 'Streetlight pole #SL-204 dark for past week; pedestrian crosswalk unsafe for women and children at night.',
    category: 'Streetlight',
    location: 'Thillai Nagar Main Road, Tiruchirappalli',
    district: 'Tiruchirappalli',
    imageUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80',
    confidence: 91,
    priority: 'Medium',
    priorityScore: 58,
    reason: 'Substandard illumination on busy crosswalk; routed to TNEB / Corporation electrical division.'
  }
];
