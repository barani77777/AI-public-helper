import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Printer, 
  Copy, 
  Check, 
  User
} from 'lucide-react';
import { ComplaintRecord, ComplaintStatus } from '../types/complaint';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { StatusTimeline } from '../components/report/StatusTimeline';
import { EvidenceViewer } from '../components/report/EvidenceViewer';
import { StructuredReport } from '../components/report/StructuredReport';
import { updatePageSEO } from '../utils/seo';

export interface DetailPageProps {
  complaint: ComplaintRecord;
  onBack: () => void;
  onStatusChange?: (id: string, newStatus: ComplaintStatus) => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  complaint,
  onBack,
  onStatusChange,
}) => {
  useEffect(() => {
    updatePageSEO({
      title: `Complaint #${complaint.id} - ${complaint.category}`,
      description: `Civic complaint record ${complaint.id}: ${complaint.category} in ${complaint.district}. Current status: ${complaint.status}.`,
    });
  }, [complaint.id, complaint.category, complaint.district, complaint.status]);

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ComplaintStatus>(complaint.status);

  const handleCopyId = () => {
    navigator.clipboard.writeText(complaint.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateStatus = (newStatus: ComplaintStatus) => {
    setCurrentStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(complaint.id, newStatus);
    }
  };

  if (showPrintModal) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => setShowPrintModal(false)}>
            ← Back to Complaint Record
          </Button>
        </div>
        <StructuredReport complaint={{ ...complaint, status: currentStatus }} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs text-slate-600 hover:text-slate-900 transition-colors group font-semibold"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Complaints Dashboard</span>
        </button>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyId}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'ID Copied' : 'Copy ID'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowPrintModal(true)}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print Dossier
          </Button>
        </div>
      </div>

      {/* Main Record Card */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        
        {/* Title & Metadata Header */}
        <div className="border-b border-slate-100 pb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <span className="font-mono text-sm font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
                {complaint.id}
              </span>
              <StatusBadge status={currentStatus} size="md" />
            </div>

            <PriorityBadge priority={complaint.priority} size="md" />
          </div>

          <h1 className="font-heading font-extrabold text-xl sm:text-3xl text-[#2D2D2D] tracking-tight">
            {complaint.title || complaint.category}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#525252]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              {complaint.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              Lodged: {new Date(complaint.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-600" />
              {complaint.reporter}
            </span>
          </div>
        </div>

        {/* Visual Lifecycle Timeline */}
        <div className="rounded-2xl bg-[#FAF8F5] border border-[#E8E0D8] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-sm text-[#2D2D2D]">
              Processing &amp; Dispatch Timeline
            </h2>
            <span className="text-[11px] font-mono text-[#737373]">
              Target SLA: {complaint.departmentInfo?.sla || '24-48 Hours'}
            </span>
          </div>

          <StatusTimeline timeline={complaint.timeline} currentStatus={currentStatus} />
        </div>

        {/* Citizen Statement vs AI Classification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Citizen Provided Information */}
          <div className="rounded-2xl bg-[#FAF8F5] border border-[#E8E0D8] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E0D8] pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                Citizen Statement
              </span>
              <span className="text-[10px] font-mono bg-white text-[#2D2D2D] px-2 py-0.5 rounded border border-[#E8E0D8] font-semibold">
                Verified Citizen Input
              </span>
            </div>

            <blockquote className="text-sm italic text-[#2D2D2D] leading-relaxed pl-3 border-l-3 border-teal-600">
              &ldquo;{complaint.description}&rdquo;
            </blockquote>

            <div className="pt-2 text-xs text-[#525252] space-y-1">
              <div>District: <strong className="text-[#2D2D2D]">{complaint.district}</strong></div>
              <div>Estimated Population Affected: <strong className="text-[#2D2D2D]">{complaint.affectedPeople.toLocaleString()} citizens</strong></div>
            </div>
          </div>

          {/* Right: AI-Assessed Metadata */}
          <div className="rounded-2xl bg-teal-50/50 border border-teal-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-teal-200 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                AI Assessment &amp; Priority Logic
              </span>
              <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded border border-teal-200 font-bold">
                AI Advisory ({complaint.confidence}% Conf)
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Detected Category:</span>
                <span className="font-bold text-slate-900">{complaint.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Urgency Score:</span>
                <span className="font-mono font-bold text-blue-700">{complaint.priorityScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Severity Rating:</span>
                <span className="font-semibold text-slate-900">{complaint.severity}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Priority Rationalization:</strong>
              {complaint.priorityReason}
            </div>
          </div>

        </div>

        {/* Evidence Image Viewer */}
        <div className="space-y-3">
          <h2 className="font-heading font-bold text-sm text-slate-900">
            Attached Photographic Evidence
          </h2>
          <EvidenceViewer
            imageUrl={complaint.imageUrl}
            category={complaint.category}
            caption={`Photographic record for Complaint #${complaint.id} at ${complaint.location}`}
          />
        </div>

        {/* Assigned Department & Actions */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Assigned Authority:</span>
              <h3 className="font-heading font-bold text-base text-slate-900 mt-0.5">
                {complaint.department}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Recommended Action: {complaint.recommendedAction}
              </p>
            </div>

            {/* Quick Status Toggling */}
            <div className="flex items-center space-x-2">
              {currentStatus !== 'In Progress' && currentStatus !== 'Resolved' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus('In Progress')}
                >
                  Mark In Progress
                </Button>
              )}

              {currentStatus !== 'Resolved' && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleUpdateStatus('Resolved')}
                >
                  Mark Resolved
                </Button>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
