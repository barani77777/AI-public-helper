import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Eye, 
  Edit3, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Users
} from 'lucide-react';
import { AIClassificationResult, ComplaintRecord } from '../types/complaint';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { Button } from '../components/ui/Button';
import { EvidenceViewer } from '../components/report/EvidenceViewer';
import { StructuredReport } from '../components/report/StructuredReport';
import { updatePageSEO } from '../utils/seo';
import { useTranslation } from '../i18n/LanguageContext';

export interface ResultPageProps {
  analysisData: AIClassificationResult;
  onEditComplaint: () => void;
  onSubmitComplaint: (newComplaint: ComplaintRecord) => void;
  onStartNewComplaint: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  analysisData,
  onEditComplaint,
  onSubmitComplaint,
  onStartNewComplaint,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    updatePageSEO({
      title: `AI Assessment: ${analysisData.id}`,
      description: `AI Classification result for report ${analysisData.id}: ${analysisData.detectedCategory} with ${analysisData.priority} priority.`,
    });
  }, [analysisData.id, analysisData.detectedCategory, analysisData.priority]);

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showFullDossier, setShowFullDossier] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(analysisData.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmSubmit = () => {
    setSubmitting(true);

    setTimeout(() => {
      const record: ComplaintRecord = {
        id: analysisData.id,
        title: analysisData.extractedSummary,
        description: analysisData.extractedSummary,
        category: analysisData.detectedCategory,
        categoryId: analysisData.categoryId,
        confidence: analysisData.confidence,
        severity: analysisData.severity,
        priority: analysisData.priority,
        priorityScore: analysisData.priorityScore,
        priorityReason: analysisData.priorityReason,
        contributingFactors: analysisData.contributingFactors,
        district: analysisData.district,
        location: analysisData.location,
        coords: analysisData.coords || { lat: 13.0827, lng: 80.2707, mapX: 50, mapY: 50 },
        department: analysisData.recommendedDepartment.name,
        departmentInfo: analysisData.recommendedDepartment,
        status: 'Classified',
        imageUrl: analysisData.imageUrl,
        createdAt: analysisData.timestamp,
        reporter: 'Citizen (You)',
        affectedPeople: analysisData.peopleAffected,
        recommendedAction: analysisData.recommendedAction,
        aiSummary: analysisData.extractedSummary,
        timeline: [
          {
            id: `t_${Date.now()}_1`,
            status: 'Submitted',
            label: 'Grievance Submitted via Portal',
            timestamp: analysisData.timestamp,
            actor: 'Citizen Portal',
          },
          {
            id: `t_${Date.now()}_2`,
            status: 'Classified',
            label: `AI Classification (${analysisData.confidence}% Conf) — ${analysisData.priority} Priority`,
            timestamp: new Date().toISOString(),
            actor: 'CivicAI Classifier',
            notes: analysisData.priorityReason,
          },
          {
            id: `t_${Date.now()}_3`,
            status: 'Assigned',
            label: `Routed to ${analysisData.recommendedDepartment.code}`,
            timestamp: new Date().toISOString(),
            actor: 'Municipal Dispatch Router',
          }
        ],
      };

      onSubmitComplaint(record);
    }, 400);
  };

  const recordForReport: ComplaintRecord = {
    id: analysisData.id,
    title: analysisData.extractedSummary,
    description: analysisData.extractedSummary,
    category: analysisData.detectedCategory,
    categoryId: analysisData.categoryId,
    confidence: analysisData.confidence,
    severity: analysisData.severity,
    priority: analysisData.priority,
    priorityScore: analysisData.priorityScore,
    priorityReason: analysisData.priorityReason,
    contributingFactors: analysisData.contributingFactors,
    district: analysisData.district,
    location: analysisData.location,
    coords: analysisData.coords || { lat: 13.0827, lng: 80.2707 },
    department: analysisData.recommendedDepartment.name,
    departmentInfo: analysisData.recommendedDepartment,
    status: 'Classified',
    imageUrl: analysisData.imageUrl,
    createdAt: analysisData.timestamp,
    reporter: 'Citizen (You)',
    affectedPeople: analysisData.peopleAffected,
    recommendedAction: analysisData.recommendedAction,
    aiSummary: analysisData.extractedSummary,
    timeline: [
      {
        id: 't_intake',
        status: 'Submitted',
        label: 'Complaint Lodged',
        timestamp: analysisData.timestamp,
        actor: 'Citizen Portal',
      },
      {
        id: 't_classified',
        status: 'Classified',
        label: 'AI Intake Assessment Complete',
        timestamp: new Date().toISOString(),
        actor: 'Public Helper Classifier Engine',
      },
    ],
  };

  if (showFullDossier) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFullDossier(false)}
          >
            ← Return to Result Dashboard
          </Button>
        </div>
        <StructuredReport complaint={recordForReport} />
      </div>
    );
  }

  const confidence = analysisData.confidence;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Confirmation Header */}
      <div className="rounded-3xl bg-white border border-[#E8E0D8] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E0D8] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs text-teal-700 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Classification Completed</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D2D2D] tracking-tight">
              {t('result_title', 'Grievance Assessment Dashboard')}
            </h1>
            <p className="text-xs text-[#525252]">
              {t('result_subtitle', 'Review AI-assessed category, priority rating, and municipal routing before final confirmation.')}
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-[#FAF8F5] p-2 rounded-xl border border-[#E8E0D8] font-mono text-xs">
            <span className="text-[#525252]">Report ID:</span>
            <span className="font-bold text-teal-700">{analysisData.id}</span>
            <button
              type="button"
              onClick={handleCopyId}
              title="Copy Report ID"
              className="p-1 rounded hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Copy Report ID to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Core AI Classification Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Metric 1: Category with circular gauge */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                {t('result_cat_label', 'Detected Category (AI-Assessed)')}
              </span>
              <p className="font-heading font-bold text-lg text-slate-900">
                {analysisData.detectedCategory}
              </p>
              <span className="text-xs text-slate-600 block">
                Severity: <span className="font-semibold text-slate-900">{analysisData.severity}</span>
              </span>
            </div>

            {/* Circular Confidence Meter */}
            <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-slate-200"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-teal-600 transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xs font-mono font-bold text-[#2D2D2D]">{confidence}%</span>
                <span className="text-[8px] text-[#737373] font-semibold block">CONF</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Priority Badge & Score */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D8] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#737373] block">
              {t('result_urgency_label', 'Urgency Level (AI-Assessed)')}
            </span>
            <div className="flex items-center space-x-2">
              <PriorityBadge priority={analysisData.priority} size="lg" />
            </div>
            <div className="text-xs text-[#525252] flex items-center justify-between pt-1">
              <span>Priority Score:</span>
              <span className="font-mono font-bold text-[#2D2D2D] bg-white px-2 py-0.5 rounded border border-[#E8E0D8]">
                {analysisData.priorityScore}/100
              </span>
            </div>
          </div>

          {/* Metric 3: Population Impact */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D8] space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#737373] block">
              {t('result_impact_label', 'Estimated Population Impact')}
            </span>
            <div className="flex items-center space-x-2 pt-1">
              <Users className="w-5 h-5 text-teal-600" />
              <span className="font-heading font-bold text-xl text-[#2D2D2D]">
                ~{analysisData.peopleAffected.toLocaleString()}
              </span>
              <span className="text-xs text-[#737373]">citizens</span>
            </div>
            <span className="text-[11px] text-[#737373] block pt-1">
              Corridor density: <span className="text-[#2D2D2D] font-medium">{analysisData.district}</span>
            </span>
          </div>

        </div>

        {/* Priority Reasoning Breakdown */}
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D8] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2D2D2D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              {t('result_reason_title', 'AI Priority Rationalization & Factor Breakdown')}
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Deterministic Model</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
            {analysisData.priorityReason}
          </p>

          {/* Factor bars */}
          {analysisData.contributingFactors && analysisData.contributingFactors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {analysisData.contributingFactors.map((f) => (
                <div key={f.factor} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-slate-800">{f.factor}</span>
                    <span className="font-mono text-blue-700 font-bold">{f.score}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{f.description}</p>
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-slate-500 italic pt-1">
            Notice: Priority scores are advisory algorithm recommendations to aid municipal response times and do not constitute legal administrative rulings.
          </p>
        </div>

        {/* Department Dispatch Card */}
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>{t('result_dept_title', 'Assigned Municipal Authority')}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              Target SLA: {analysisData.recommendedDepartment.sla}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-heading font-bold text-slate-900 text-sm">
                {analysisData.recommendedDepartment.name}
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 font-mono">
                Code: {analysisData.recommendedDepartment.code}
              </p>
            </div>
            <div className="space-y-1 text-right sm:text-left">
              <span className="text-slate-500 block">Helpline Contact:</span>
              <span className="font-mono font-bold text-blue-700 text-sm">
                {analysisData.recommendedDepartment.phone}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-blue-200/70 text-xs">
            <span className="text-slate-600">Recommended Field Action: </span>
            <span className="text-slate-900 font-medium">{analysisData.recommendedAction}</span>
          </div>
        </div>

        {/* Location & Evidence Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Field Location &amp; Summary
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-900 font-semibold">{analysisData.location}</span>
              </div>
              <p className="text-slate-600 italic border-l-2 border-slate-300 pl-2.5 mt-2">
                &ldquo;{analysisData.extractedSummary}&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Attached Photographic Evidence
            </h4>
            <EvidenceViewer
              imageUrl={analysisData.imageUrl}
              category={analysisData.detectedCategory}
            />
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="md"
              onClick={onEditComplaint}
              leftIcon={<Edit3 className="w-4 h-4" />}
            >
              {t('result_edit_btn', 'Edit Complaint')}
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowFullDossier(true)}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              {t('result_print_btn', 'View Printable Dossier')}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="md"
              onClick={onStartNewComplaint}
            >
              {t('result_start_new', 'Start Another')}
            </Button>

            <Button
              variant="primary"
              size="md"
              isLoading={submitting}
              onClick={handleConfirmSubmit}
              rightIcon={<Send className="w-4 h-4" />}
            >
              {t('result_confirm_btn', 'Confirm & Dispatch Complaint')}
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};
