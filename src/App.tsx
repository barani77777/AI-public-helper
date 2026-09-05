import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { ReportPage } from './pages/ReportPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ResultPage } from './pages/ResultPage';
import { DashboardPage } from './pages/DashboardPage';
import { DetailPage } from './pages/DetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import ReferencePhotoGuide from './components/ReferencePhotoGuide';
import { CartoonAssistant } from './components/chat/CartoonAssistant';
import { 
  ComplaintRecord, 
  ComplaintInput, 
  AIClassificationResult, 
  ComplaintStatus 
} from './types/complaint';
import { ActivePage } from './types/navigation';
import { ComplaintStore } from './services/complaintStore';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';
import { injectStructuredData } from './utils/seo';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';

function AppContent() {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  
  // Complaints loaded from store
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(() => {
    return ComplaintStore.getComplaints();
  });

  // Keep store synchronized
  useEffect(() => {
    ComplaintStore.saveComplaints(complaints);
  }, [complaints]);

  // Inject Schema.org JSON-LD once
  useEffect(() => {
    injectStructuredData({
      '@context': 'https://schema.org',
      '@type': 'GovernmentService',
      name: 'Public Helper — AI Public Facility Complaint Portal',
      serviceType: 'Civic Infrastructure Grievance Reporting',
      provider: {
        '@type': 'GovernmentOrganization',
        name: 'Municipal Administration and Water Supply Department',
      },
      areaServed: 'India',
      description: 'AI-assisted civic grievance intake and prioritization platform for road potholes, waste dumps, water leaks, and streetlights.',
      url: 'https://publichelper.org',
    });
  }, []);

  // Form & view state
  const [draftReport, setDraftReport] = useState<ComplaintInput | null>(null);
  const [activeResult, setActiveResult] = useState<AIClassificationResult | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintRecord | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Modals & toasts
  const [guideOpen, setGuideOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; subtitle: string; type?: 'success' | 'error' } | null>(null);

  const showToast = (title: string, subtitle: string, type: 'success' | 'error' = 'success') => {
    setToast({ title, subtitle, type });
    setTimeout(() => setToast(null), 5000);
  };

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Citizen completes form -> Start AI analysis
  const handleStartAnalysis = (formData: ComplaintInput) => {
    setDraftReport(formData);
    navigateTo('analysis');
  };

  // 2. AI analysis finishes -> show result dashboard
  const handleAnalysisComplete = (result: AIClassificationResult) => {
    setActiveResult(result);
    navigateTo('result');
  };

  // 3. Citizen wants to edit from result screen
  const handleEditComplaint = () => {
    navigateTo('report');
  };

  // 4. Citizen confirms complaint -> save to store, show toast, go to dashboard
  const handleConfirmComplaint = (newComplaint: ComplaintRecord) => {
    setComplaints((prev) => [newComplaint, ...prev]);
    showToast(
      'Grievance Registered Successfully!',
      `Complaint #${newComplaint.id} has been dispatched to ${newComplaint.department}.`
    );
    navigateTo('dashboard');
  };

  // 5. Citizen clicks a complaint row in dashboard
  const handleSelectComplaint = (complaint: ComplaintRecord) => {
    setSelectedComplaint(complaint);
    navigateTo('detail');
  };

  // 6. User updates complaint status in detail view
  const handleStatusChange = (id: string, newStatus: ComplaintStatus) => {
    ComplaintStore.updateStatus(id, newStatus);
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint((prev) => prev ? { ...prev, status: newStatus } : null);
    }
    showToast(
      'Status Updated',
      `Complaint #${id} is now marked as "${newStatus}".`
    );
  };

  // 7. Reference photo selection
  const handleSelectReference = (refItem: any) => {
    setDraftReport({
      description: refItem.sampleText,
      district: refItem.district || 'Chennai',
      location: refItem.location,
      imageUrl: refItem.imageUrl,
      peopleAffected: 50,
    });
    setGuideOpen(false);
    navigateTo('report');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2D2D] flex flex-col font-sans relative selection:bg-teal-600/20">
      
      {/* Skip to Content Accessibility Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Global Application Header */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        complaintCount={complaints.length}
        onOpenGuide={() => setGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" role="main" className="flex-1">
        
        {activePage === 'landing' && (
          <LandingPage
            onStartReport={(category?: string) => {
              setDraftReport(null);
              setSelectedCategory(category);
              navigateTo('report');
            }}
            onViewDashboard={(searchId?: string) => navigateTo('dashboard')}
            onOpenHowItWorks={() => navigateTo('how-it-works')}
            onOpenGuide={() => setGuideOpen(true)}
          />
        )}

        {activePage === 'report' && (
          <ReportPage
            onStartAnalysis={handleStartAnalysis}
            initialDraft={draftReport}
            selectedCategory={selectedCategory}
            onOpenGuide={() => setGuideOpen(true)}
          />
        )}

        {activePage === 'analysis' && draftReport && (
          <AnalysisPage
            draftReport={draftReport}
            onAnalysisComplete={handleAnalysisComplete}
            onCancel={() => navigateTo('report')}
          />
        )}

        {activePage === 'result' && activeResult && (
          <ResultPage
            analysisData={activeResult}
            onEditComplaint={handleEditComplaint}
            onSubmitComplaint={handleConfirmComplaint}
            onStartNewComplaint={() => {
              setDraftReport(null);
              setSelectedCategory(undefined);
              navigateTo('report');
            }}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            complaints={complaints}
            onAddNewComplaint={() => {
              setDraftReport(null);
              setSelectedCategory(undefined);
              navigateTo('report');
            }}
            onSelectComplaint={handleSelectComplaint}
          />
        )}

        {activePage === 'detail' && selectedComplaint && (
          <DetailPage
            complaint={selectedComplaint}
            onBack={() => navigateTo('dashboard')}
            onStatusChange={handleStatusChange}
          />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage
            onStartReport={() => {
              setDraftReport(null);
              navigateTo('report');
            }}
          />
        )}

      </main>

      {/* Accessible Global Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 max-w-md flex items-start space-x-3.5 animate-slide-up text-slate-900"
        >
          <div className={`p-2 rounded-xl flex-shrink-0 ${toast.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-slate-900 truncate">{toast.title}</h5>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">{toast.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Close notification"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Reference Photo Guide Modal */}
      <ReferencePhotoGuide
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        onSelectReference={handleSelectReference}
      />

      {/* Global Responsive Civic Footer */}
      <Footer
        setActivePage={navigateTo}
        onOpenGuide={() => setGuideOpen(true)}
      />

      {/* 3D Animated Cartoon Character Chatbot Assistant */}
      <CartoonAssistant
        onNavigate={navigateTo}
        onStartReportWithCategory={(cat: string) => {
          setSelectedCategory(cat);
          setDraftReport(null);
          navigateTo('report');
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
