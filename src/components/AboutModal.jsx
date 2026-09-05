import React from 'react';
import { X, ShieldCheck, Cpu, Building2, PhoneCall, Camera, Layers } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fade-in">
      <div className="civic-card w-full max-w-xl rounded-card border border-navy-700 shadow-civic overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-navy-700 bg-navy-900">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-civic-blue text-white flex items-center justify-center font-bold text-xs">
              CA
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-heading font-bold text-text-primary">
                About CivicAI — Public Facility Complaint Classifier
              </h3>
              <p className="text-[11px] text-text-secondary">Smart City Automated Grievance Dispatch System</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-text-secondary hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-text-secondary max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold text-text-primary mb-1">
              Automated Civic Resolution:
            </h4>
            <p className="leading-relaxed">
              CivicAI is an intelligent grievance classifier that empowers citizens to report public infrastructure issues—such as road potholes, waste dumps, broken streetlights, water pipeline bursts, and drainage blocks—with instant multi-label classification and direct routing to certified municipal departments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-navy-950 border border-navy-700 space-y-1">
              <span className="font-bold text-blue-300 block">Assigned Departments</span>
              <p className="text-[11px]">Greater Chennai Corporation (GCC), TANGEDCO / TNEB Electricity Board, CMWSSB Metro Water, and Tamil Nadu Highways Department.</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-950 border border-navy-700 space-y-1">
              <span className="font-bold text-civic-gold block">Google Reference Photos</span>
              <p className="text-[11px]">Real-world sample photos illustrating optimal framing, lighting, and context to ensure maximum computer vision accuracy.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-900 border border-navy-700 text-[11px] space-y-1">
            <strong className="text-text-primary block">Official Civic Helplines:</strong>
            <div>Greater Chennai Corporation: <span className="text-blue-300 font-mono">1913</span></div>
            <div>TANGEDCO Minnagam (Power Helpline): <span className="text-blue-300 font-mono">94987 94987</span></div>
            <div>Metro Water (CMWSSB): <span className="text-blue-300 font-mono">044-45674567 / 1916</span></div>
            <div>Chief Minister Helpline: <span className="text-civic-gold font-mono">1100</span></div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-navy-900 border-t border-navy-700 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-civic-blue text-white font-bold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
