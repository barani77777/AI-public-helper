import React, { useState } from 'react';
import { ZoomIn, Image as ImageIcon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { getAssetUrl } from '../../utils/assets';

export interface EvidenceViewerProps {
  imageUrl?: string | null;
  caption?: string;
  category?: string;
  className?: string;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  imageUrl,
  caption,
  category = 'Complaint Evidence',
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <div className={`rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center ${className}`}>
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
          <ImageIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-xs text-slate-500 font-medium">
          {hasError ? 'Image could not be loaded' : 'No photographic evidence submitted'}
        </p>
        <span className="text-[11px] text-slate-400 mt-0.5">
          {hasError ? 'The link or file was corrupted' : 'Field officer manual verification required'}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className={`group relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm ${className}`}>
        <img
          src={getAssetUrl(imageUrl)}
          alt={`Visual evidence of ${category}`}
          onError={() => setHasError(true)}
          className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Zoom into evidence photo"
            className="px-3 py-2 rounded-lg bg-white/90 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 shadow hover:bg-teal-600 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
            <span>Enlarge Photo</span>
          </button>
        </div>

        {caption && (
          <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-2 text-[11px] text-slate-600 truncate border-t border-slate-200">
            {caption}
          </div>
        )}
      </div>

      {/* Modal Zoom View */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Photographic Evidence Record"
        description={`Evidence image captured for ${category}`}
        maxWidth="3xl"
      >
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
            <img
              src={getAssetUrl(imageUrl)}
              alt={`High resolution evidence for ${category}`}
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>
          {caption && (
            <p className="text-xs text-slate-500 italic">
              {caption}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};
