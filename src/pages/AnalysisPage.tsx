import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Eye, 
  FileText, 
  Sliders, 
  Building2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ComplaintInput, AIClassificationResult } from '../types/complaint';
import { aiClassifier } from '../services/aiClassifier';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';
import { useTranslation } from '../i18n/LanguageContext';

export interface AnalysisPageProps {
  draftReport: ComplaintInput;
  onAnalysisComplete: (result: AIClassificationResult) => void;
  onCancel: () => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  draftReport,
  onAnalysisComplete,
  onCancel,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    updatePageSEO({
      title: 'AI Analyzing Grievance...',
      description: 'AI Multimodal classification engine processing complaint text, image evidence, and population impact.',
    });
  }, []);

  const steps = [
    { 
      id: 1, 
      label: t('analysis_step1', 'Parsing Syntactic Structure'), 
      icon: FileText, 
      detail: 'Extracting tokens, road names, and incident description' 
    },
    { 
      id: 2, 
      label: t('analysis_step2', 'Flagging Safety Hazard Tokens'), 
      icon: Cpu, 
      detail: 'Scanning collision risk, electrocution, and road blockage markers' 
    },
    { 
      id: 3, 
      label: t('analysis_step3', 'Analyzing Photographic Context'), 
      icon: Eye, 
      detail: 'Evaluating visual evidence & verifying damage severity patterns' 
    },
    { 
      id: 4, 
      label: t('analysis_step4', 'Mapping Municipal Authority'), 
      icon: Building2, 
      detail: 'Assigning to Highways, Solid Waste, TANGEDCO, or Metro Water' 
    },
    { 
      id: 5, 
      label: t('analysis_step5', 'Computing Priority Model'), 
      icon: Sliders, 
      detail: 'Evaluating population impact multiplier & infrastructure corridor' 
    },
    { 
      id: 6, 
      label: t('analysis_step6', 'Compiling Structured Dossier'), 
      icon: CheckCircle2, 
      detail: 'Assembling official report ID, SLA target, and routing payload' 
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<number[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIClassificationResult | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const runClassification = async () => {
      try {
        const result = await aiClassifier.classifyComplaint(draftReport);
        if (!isCancelled) {
          setAnalysisResult(result);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setErrorState(err?.message || 'AI Classification failed to process this complaint.');
        }
      }
    };

    runClassification();

    return () => {
      isCancelled = true;
    };
  }, [draftReport]);

  useEffect(() => {
    if (errorState) return;

    if (currentStepIndex < steps.length) {
      const stepInterval = 450;
      const timer = setTimeout(() => {
        setCompletedStepIds((prev) => [...prev, steps[currentStepIndex].id]);
        setCurrentStepIndex((prev) => prev + 1);
      }, stepInterval);

      return () => clearTimeout(timer);
    } else if (currentStepIndex >= steps.length && analysisResult) {
      const completionTimer = setTimeout(() => {
        onAnalysisComplete(analysisResult);
      }, 500);

      return () => clearTimeout(completionTimer);
    }
  }, [currentStepIndex, steps.length, analysisResult, errorState, onAnalysisComplete]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 mx-auto flex items-center justify-center shadow-xs">
            <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D2D2D] tracking-tight">
              {t('analysis_title', 'AI Classification In Progress')}
            </h1>
            <p className="text-xs sm:text-sm text-[#525252] mt-1">
              {t('analysis_desc', 'Evaluating complaint semantics, evidence image, and civic impact...')}
            </p>
          </div>
        </div>

        {/* Live Screen Reader Announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {currentStepIndex < steps.length
            ? `Step ${currentStepIndex + 1} of ${steps.length}: ${steps[currentStepIndex].label}`
            : 'AI Classification complete. Generating report dashboard.'}
        </div>

        {/* Stepper Checklist */}
        <div className="space-y-3 bg-[#FAF8F5] rounded-2xl p-4 sm:p-6 border border-[#E8E0D8]">
          {steps.map((step, idx) => {
            const isCompleted = completedStepIds.includes(step.id);
            const isCurrent = currentStepIndex === idx;

            return (
              <div
                key={step.id}
                className={`flex items-start space-x-3.5 p-3 rounded-xl transition-all duration-200 ${
                  isCurrent
                    ? 'bg-teal-50 border border-teal-200 shadow-xs'
                    : isCompleted
                    ? 'bg-white/80 border border-[#E8E0D8] opacity-90'
                    : 'opacity-40'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-[10px] font-mono">
                      {step.id}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isCurrent ? 'text-teal-900' : isCompleted ? 'text-[#2D2D2D]' : 'text-[#737373]'}`}>
                      {step.label}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">DONE</span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-teal-700 font-bold animate-pulse">ACTIVE</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#525252] mt-0.5 truncate">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Error Fallback */}
        {errorState && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-3">
            <div className="flex items-center space-x-2 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Classification Error</span>
            </div>
            <p>{errorState}</p>
            <div className="flex items-center space-x-2 pt-2">
              <Button variant="danger" size="sm" onClick={() => window.location.reload()}>
                Retry Analysis
              </Button>
              <Button variant="secondary" size="sm" onClick={onCancel}>
                Edit Complaint
              </Button>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, ((currentStepIndex + 1) / steps.length) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono font-medium">
            <span>Analyzing Complaint Data</span>
            <span>{Math.round(Math.min(100, ((currentStepIndex + 1) / steps.length) * 100))}%</span>
          </div>
        </div>

        {/* Cancel Action */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors underline"
          >
            Cancel and Return to Form
          </button>
        </div>

      </div>
    </div>
  );
};
