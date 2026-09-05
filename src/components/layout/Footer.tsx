import React from 'react';
import { Shield, Phone } from 'lucide-react';
import { ActivePage } from '../../types/navigation';
import { useTranslation } from '../../i18n/LanguageContext';

export interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onOpenGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActivePage: _setActivePage,
  onOpenGuide: _onOpenGuide,
}) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E0D8] mt-20 text-xs text-[#525252] print:hidden">
      {/* Indian Tricolor Strip */}
      <div className="w-full flex flex-col" aria-hidden="true">
        <div className="h-[2px] w-full bg-[#FF9933]" />
        <div className="h-[2px] w-full bg-white" />
        <div className="h-[2px] w-full bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Brand Section */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-emerald-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-heading font-extrabold text-base tracking-tight text-[#2D2D2D]">
              {t('brand_nagrik', 'Public Helper')}
            </span>
          </div>
          <p className="text-[#525252] max-w-xl text-xs leading-relaxed">
            {t('footer_tagline', 'AI-Powered Public Facility Grievance Classifier & Smart Municipal Dispatch Platform for transparent civic accountability.')}
          </p>
        </div>

        {/* Helpline Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#525252]">
          <div className="flex items-center space-x-1.5 font-medium text-[#2D2D2D] mr-1">
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold">{t('footer_helplines_title', 'Municipal Helplines')}:</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8E0D8] text-[#2D2D2D] shadow-2xs">
            <span>GCC</span>
            <strong className="font-mono text-teal-700">1913</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8E0D8] text-[#2D2D2D] shadow-2xs">
            <span>Metro Water</span>
            <strong className="font-mono text-teal-700">1916</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8E0D8] text-[#2D2D2D] shadow-2xs">
            <span>TNEB</span>
            <strong className="font-mono text-teal-700">1912</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8E0D8] text-[#2D2D2D] shadow-2xs">
            <span>CM Helpline</span>
            <strong className="font-mono text-teal-700">1100</strong>
          </span>
        </div>

        {/* Simplified Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#737373] pt-4 border-t border-[#E8E0D8]">
          <span className="hover:text-teal-700 cursor-pointer transition-colors">{t('footer_about', 'About')}</span>
          <span className="text-[#D4C9BE] select-none">|</span>
          <span className="hover:text-teal-700 cursor-pointer transition-colors">{t('footer_contact', 'Contact')}</span>
          <span className="text-[#D4C9BE] select-none">|</span>
          <span className="hover:text-teal-700 cursor-pointer transition-colors">{t('footer_faq', 'FAQs')}</span>
          <span className="text-[#D4C9BE] select-none">|</span>
          <span className="hover:text-teal-700 cursor-pointer transition-colors">{t('footer_disclaimer', 'Disclaimer')}</span>
        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] text-[#A3A3A3]">
          <p>{t('footer_copyright', '© 2026 Public Helper — Civic AI Platform')}</p>
        </div>
      </div>
    </footer>
  );
};
