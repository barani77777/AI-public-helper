# CivicAI — AI Public Facility Complaint Classifier & Smart Dispatch

CivicAI is a production-quality, responsive web application empowering citizens to report municipal infrastructure grievances (potholes, overflowing garbage, broken streetlights, water pipeline leaks, damaged roads, and drainage blocks) and utilizing automated multimodal AI to classify categories, assess public safety impact, calculate deterministic priority scores, and generate standardized municipal dossiers.

---

## 🌟 Key Product Capabilities

- **Multimodal Citizen Intake**: Accepts complaint descriptions, photographic evidence attachments with live previews, and GPS geolocation coordinates.
- **Automated AI Category Classification**: Instantly categorizes reports across 7 key public facility domains with confidence scoring.
- **Deterministic Priority Assessment Engine**: Computes transparent 4-tier urgency scores (**Low**, **Medium**, **High**, **Critical**) weighing hazard severity, population impact, public safety risk, and corridor criticality.
- **Standardized Grievance Dossier**: Renders clean, print-friendly (`@media print`) and downloadable JSON civic intake reports with SLAs and recommended engineering actions.
- **Central Complaints Registry**: Feature-rich dashboard with real-time search, category/priority/status filters, desktop table / mobile cards view, and interactive 3D City Map.
- **Transparent Governance & FAQ**: Educational 8-stage redressal lifecycle breakdown, clear AI advisory disclaimers, and accessible interactive FAQ.

---

## 🏛 Supported Municipal Domains & Authorities

| Category | Typical Hazard | Assigned Municipal Authority | Target SLA |
| :--- | :--- | :--- | :--- |
| **Pothole / Road Damage** | Deep craters, sunken asphalt | Highways Department & City Corporation Works | 24–48 Hours |
| **Garbage / Solid Waste** | Overflowing dumpsters, trash piles | Municipal Solid Waste Management Bureau | 12–24 Hours |
| **Broken Streetlight** | Dark road corners, burnt fixtures | TANGEDCO / Corporation Electrical Division | 24 Hours |
| **Water Leakage** | Pressurized drinking pipe burst | Metro Water Supply & Sewerage Board (CMWSSB) | 4–8 Hours |
| **Drainage / Sewage Block** | Choked storm grates, sewage backup | Storm Water Drainage & Sewerage Board | 8–16 Hours |
| **Public Infrastructure** | Damaged medians, broken curbs | Public Works Department (PWD) / Bridges | 48–72 Hours |
| **Other Civic Issues** | Encroachments, fallen trees | Chief Minister Special Cell (CM Helpline 1100) | 48 Hours |

---

## 📐 Priority Assessment Engine Formula

The priority model calculates a transparent composite score ($0 - 100$) using pure, deterministic TypeScript functions:

$$\text{Priority Score} = (\text{Safety} \times 0.35) + (\text{Population} \times 0.30) + (\text{Corridor} \times 0.25) + (\text{Evidence} \times 0.10)$$

### Urgency Thresholds:
- **Critical Priority (90–100)**: Immediate hazard to human life or structural collapse (e.g. live electrical wires, high-speed highway sinkholes).
- **High Priority (65–89)**: Elevated accident risk or critical drinking water loss along arterial transit corridors.
- **Medium Priority (40–64)**: Standard urban service disruptions affecting residential neighborhoods.
- **Low Priority (0–39)**: Minor localized civic maintenance scheduled for routine cycles.

---

## 📁 Architecture & Directory Structure

```
src/
├── types/
│   ├── complaint.ts             # Strongly-typed data contracts (Complaint, Priority, Status, AIResult)
│   └── navigation.ts            # Application router & active view types
├── services/
│   ├── aiClassifier.ts          # IAIClassifierService interface + Deterministic Mock Classifier
│   ├── priorityEngine.ts        # Pure, testable Priority Assessment Engine
│   └── complaintStore.ts        # LocalStorage persistence, seed data, filtering, and sorting
├── components/
│   ├── ui/                      # Complete Civic Design System
│   │   ├── Button.tsx           # Accessible buttons with loading states & focus rings
│   │   ├── PriorityBadge.tsx    # Combined Color + Icon + Text priority indicators
│   │   ├── StatusBadge.tsx      # Lifecycle status badges
│   │   ├── Card.tsx             # Surface containers with civic borders
│   │   ├── Input.tsx            # Accessible inputs with error messages & icons
│   │   ├── Textarea.tsx         # Textarea with live character counter
│   │   ├── Select.tsx           # Accessible select controls
│   │   ├── Alert.tsx            # Semantic alert banners
│   │   ├── Modal.tsx            # Accessible modal dialog with focus management
│   │   ├── LoadingState.tsx     # Skeletons and spinners
│   │   └── EmptyState.tsx       # Actionable empty states
│   ├── layout/
│   │   ├── Navbar.tsx           # Desktop and mobile drawer navigation with ARIA landmarks
│   │   └── Footer.tsx           # Civic footer with emergency helplines & SLAs
│   ├── report/
│   │   ├── StructuredReport.tsx # Standardized printable grievance document (@media print)
│   │   ├── StatusTimeline.tsx   # Visual status progression history
│   │   └── EvidenceViewer.tsx   # Evidence photo viewer with zoom modal
│   ├── IsometricCity.jsx        # Interactive 3D city map hotspot visualizer
│   └── ReferencePhotoGuide.jsx  # Citizen photographic reference guide
├── pages/
│   ├── LandingPage.tsx          # Hero, Problem Showcase, AI Pipeline, Categories, Benefits, CTA
│   ├── ReportPage.tsx           # Grievance submission form (upload, location, population impact)
│   ├── AnalysisPage.tsx         # AI processing stepper with live screen-reader announcements
│   ├── ResultPage.tsx           # AI classification dashboard with confidence meter & routing
│   ├── DashboardPage.tsx        # Central grievance registry (table, mobile cards, 3D map)
│   ├── DetailPage.tsx           # Full complaint record view with status timeline
│   └── HowItWorksPage.tsx       # 8-stage workflow & accessible interactive FAQ accordion
├── utils/
│   ├── seo.ts                   # Page title, meta descriptions, OpenGraph, JSON-LD Schema
│   └── formatters.ts            # Safe sanitization and date helpers
├── App.tsx                      # Root application shell & client router
└── index.css                    # Tailwind CSS, civic design tokens, print stylesheet
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- npm 9.0.0 or later

### Installation
```bash
# Clone or navigate to the project directory
cd project1

# Install dependencies
npm install
```

### Development
```bash
# Run local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type-Checking
```bash
# Run TypeScript compilation check
npm run typecheck
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ♿ Accessibility Standards (WCAG 2.1 AA)

- **Semantic HTML**: Landmarks used throughout (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).
- **No Color-Only Communication**: All priority and status indicators combine **icons + color + explicit text labels**.
- **Keyboard Navigation**: Full Tab focus management, Escape key closing for modals, and Enter/Space activation.
- **Visible Focus Rings**: Distinct `focus-visible:ring-2` focus rings across all interactive controls.
- **Screen Reader Support**: `aria-live="polite"` dynamic announcements during AI processing stages.
- **Accessible Skip Link**: Hidden "Skip to main content" link for keyboard users.
- **Reduced Motion**: Complete support for `prefers-reduced-motion: reduce`.

---

## 📄 License & Civic Governance

CivicAI is an open civic-technology initiative designed to assist public municipal authorities and empower citizen participation. All priority scores are algorithmic decision-support recommendations.
