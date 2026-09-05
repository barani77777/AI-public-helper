import React, { useState } from 'react';
import { 
  Building2, 
  Printer, 
  Download, 
  Check, 
  FileText 
} from 'lucide-react';
import { ComplaintRecord } from '../../types/complaint';
import { PriorityBadge } from '../ui/PriorityBadge';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { getAssetUrl } from '../../utils/assets';

export interface StructuredReportProps {
  complaint: ComplaintRecord;
  onClose?: () => void;
}

export const StructuredReport: React.FC<StructuredReportProps> = ({
  complaint,
  onClose,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      system: 'CivicAI — Public Facility Complaint Classification Platform',
      documentType: 'Official Civic Grievance Intake Report',
      generatedAt: new Date().toISOString(),
      reportId: complaint.id,
      status: complaint.status,
      timestamp: complaint.createdAt,
      incident: {
        category: complaint.category,
        categoryId: complaint.categoryId,
        description: complaint.description,
        aiSummary: complaint.aiSummary || complaint.title,
        location: complaint.location,
        district: complaint.district,
        coords: complaint.coords,
      },
      assessment: {
        aiConfidence: `${complaint.confidence}%`,
        severityLevel: complaint.severity,
        priorityLevel: complaint.priority,
        priorityScore: complaint.priorityScore,
        priorityReason: complaint.priorityReason,
        estimatedAffectedPopulation: complaint.affectedPeople,
        factors: complaint.contributingFactors || [],
      },
      routing: {
        assignedDepartment: complaint.department,
        departmentCode: complaint.departmentInfo?.code || 'MUNICIPAL',
        targetSLA: complaint.departmentInfo?.sla || '24-48 Hours',
        recommendedAction: complaint.recommendedAction,
        helpline: complaint.departmentInfo?.phone || '1913',
      },
      audit: {
        reporterId: complaint.reporter,
        timelineEvents: complaint.timeline,
      },
      disclaimer: 'This document reflects an AI-assisted intake assessment. Priority rating is an algorithmic advisory recommendation subject to municipal authority verification.',
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${complaint.id}_CivicAI_Report.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs print:hidden">
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Standardized Civic Grievance Document</span>
          <span>·</span>
          <span className="font-mono text-blue-700 font-bold">{complaint.id}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadJSON}
            leftIcon={downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
          >
            {downloadSuccess ? 'Downloaded' : 'Download JSON'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print Document
          </Button>
        </div>
      </div>

      {/* Printable Document Sheet */}
      <article
        className="civic-print-document bg-white text-slate-900 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none"
        aria-label={`Structured Complaint Report for ${complaint.id}`}
      >
        {/* Document Header */}
        <header className="border-b-2 border-slate-200 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-slate-900">
                  Civic<span className="text-blue-600">AI</span> Grievance Dossier
                </h1>
                <p className="text-xs text-slate-500">
                  Automated Public Facility Classification &amp; Municipal Dispatch Document
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="text-xs uppercase tracking-wider text-slate-500 block">
                Record Identifier
              </span>
              <span className="text-lg font-bold text-blue-700">
                {complaint.id}
              </span>
              <div className="mt-1">
                <StatusBadge status={complaint.status} />
              </div>
            </div>
          </div>

          {/* Subheader Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-500 block">Lodged Timestamp</span>
              <span className="font-semibold text-slate-800">
                {new Date(complaint.createdAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Jurisdiction / District</span>
              <span className="font-semibold text-slate-800">
                {complaint.district || 'Tamil Nadu'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Reporter</span>
              <span className="font-semibold text-slate-800">
                {complaint.reporter || 'Verified Citizen'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">SLA Commitment</span>
              <span className="font-semibold text-slate-800">
                {complaint.departmentInfo?.sla || '24-48 Hours'}
              </span>
            </div>
          </div>
        </header>

        {/* Section 1: AI Classification & Urgency Assessment */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
            1. Automated AI Grievance Assessment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Classified Category</span>
              <p className="text-base font-bold text-slate-900 mt-1">
                {complaint.category}
              </p>
              <span className="text-[11px] text-blue-700 font-mono mt-0.5 block font-semibold">
                Confidence: {complaint.confidence}%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Assessed Priority</span>
              <div className="mt-1 flex items-center space-x-2">
                <PriorityBadge priority={complaint.priority} size="md" />
                <span className="text-xs font-mono text-slate-600 font-bold">
                  ({complaint.priorityScore}/100)
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Severity: <span className="font-semibold text-slate-800">{complaint.severity}</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block">Estimated Population Impact</span>
              <p className="text-base font-bold text-slate-900 mt-1">
                ~{complaint.affectedPeople.toLocaleString()} Citizens
              </p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Density: {complaint.affectedPeople > 500 ? 'High Corridor' : 'Local Zone'}
              </span>
            </div>
          </div>

          {/* Priority Rationalization */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-900 block mb-1">
              AI Priority Rationalization:
            </span>
            <p className="text-slate-600 leading-relaxed">
              {complaint.priorityReason}
            </p>
          </div>
        </section>

        {/* Section 2: Citizen Description & Incident Details */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
            2. Citizen Incident Description &amp; Field Location
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div>
              <span className="text-xs text-slate-500 block mb-1">
                Original Citizen Narrative:
              </span>
              <blockquote className="text-sm italic text-slate-800 border-l-3 border-blue-600 pl-3 py-0.5">
                &ldquo;{complaint.description}&rdquo;
              </blockquote>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Geographic Location / Landmark:</span>
                <span className="font-semibold text-slate-800">
                  {complaint.location}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">GPS Coordinates:</span>
                <span className="font-mono text-slate-800">
                  {complaint.coords ? `${complaint.coords.lat.toFixed(4)}° N, ${complaint.coords.lng.toFixed(4)}° E` : 'Not geocoded'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Evidence Photograph */}
        {complaint.imageUrl && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
              3. Visual Evidence Record
            </h2>
            <div className="rounded-xl overflow-hidden border border-slate-200 max-w-md bg-white">
              <img
                src={getAssetUrl(complaint.imageUrl)}
                alt={`Photographic evidence for complaint ${complaint.id}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-2.5 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-200">
                Timestamped citizen photographic attachment submitted during complaint intake.
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Recommended Dispatch & Municipal Routing */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
            4. Dispatch Routing &amp; Remediation Protocol
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Assigned Authority:</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {complaint.department}
                </p>
                <span className="text-[11px] font-mono text-slate-500">
                  Code: {complaint.departmentInfo?.code || 'CIVIC-DEPT'}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">Control Helpline / Escalation:</span>
                <p className="text-sm font-bold text-blue-700 mt-0.5">
                  {complaint.departmentInfo?.phone || '1913'}
                </p>
                <span className="text-[11px] text-slate-500">
                  Target SLA: {complaint.departmentInfo?.sla || '24-48 Hours'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs">
              <span className="text-slate-500 block">Recommended Engineering Action:</span>
              <p className="font-semibold text-slate-800 mt-0.5">
                {complaint.recommendedAction || 'Schedule on-site inspection and deploy remedial maintenance crew.'}
              </p>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer Footer */}
        <footer className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong>Advisory Notice:</strong> This dossier was compiled with AI-assisted decision-support software. Category classifications, priority levels, and affected population figures represent statistical inferences from submitted citizen input and photographic metadata. Final operational dispatch decisions remain the prerogative of the respective municipal authority.
          </p>
        </footer>
      </article>
    </div>
  );
};
