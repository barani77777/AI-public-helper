import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  MapPin, 
  Info,
  ChevronRight 
} from 'lucide-react';
import { REFERENCE_PHOTOS_GUIDE } from '../data/complaintsData';

export default function ReferencePhotoGuide({ isOpen, onClose, onSelectReference }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const filtered = selectedCategory === 'all' 
    ? REFERENCE_PHOTOS_GUIDE 
    : REFERENCE_PHOTOS_GUIDE.filter(item => item.id.includes(selectedCategory));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 border border-blue-200">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                  Citizen Reference Photos Guide
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono font-semibold">
                  Sample Gallery
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-world reference photos for public facility complaints in India
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="px-5 py-3 bg-blue-50/70 border-b border-blue-100 flex items-center space-x-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Photography Guidelines:</strong> Take clear photos showing the issue and surrounding street context. Click <strong>"Use as Sample Photo"</strong> on any reference image to automatically test the AI classifier!
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo container */}
                  <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold text-slate-800 border border-slate-200 shadow-xs">
                      {item.category}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 text-slate-700 text-[10px] px-2 py-0.5 rounded flex items-center space-x-1 border border-slate-200">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span>{item.district}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
                      <strong className="text-amber-800 block mb-0.5 font-semibold">Photography Tip:</strong>
                      {item.tips}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-3 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectReference(item);
                      onClose();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Use as Sample Photo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Citizen Grievance Photographic Reference Standards
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
