import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  PlusCircle, 
  Search, 
  Home, 
  HelpCircle, 
  Menu, 
  X, 
  ArrowRight,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';
import { ActivePage } from '../../types/navigation';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n/LanguageContext';
import { SupportedLanguage } from '../../i18n/translations';

export interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  complaintCount?: number;
  onOpenGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  complaintCount = 0,
}) => {
  const { language, setLanguage, languages, t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activePage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'landing' as ActivePage, label: t('nav_home', 'Home'), icon: Home },
    { id: 'report' as ActivePage, label: t('nav_report', 'Submit Complaint'), icon: PlusCircle },
    { id: 'dashboard' as ActivePage, label: t('nav_track', 'Track'), icon: Search, count: complaintCount },
    { id: 'how-it-works' as ActivePage, label: t('nav_how_it_works', 'How It Works'), icon: HelpCircle },
  ];

  const handleNavClick = (id: ActivePage) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLangInfo = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E0D8] shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand / Logo */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleNavClick('landing')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavClick('landing');
              }
            }}
            className="flex items-center space-x-3 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl p-1"
            aria-label="Public Helper Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-md transition-transform group-hover:scale-105">
              <Shield className="w-5 h-5" aria-hidden="true" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-lg tracking-tight text-[#2D2D2D]">
                  {t('brand_nagrik', 'Public Helper')}
                </span>
              </div>
              <p className="text-[11px] text-[#525252] leading-none mt-0.5 font-medium">
                {t('brand_subtitle', 'Smart Civic Complaint Portal')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center space-x-1"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                    isActive
                      ? 'text-white bg-teal-600 shadow-sm'
                      : 'text-[#525252] hover:text-[#2D2D2D] hover:bg-neutral-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#737373]'}`} />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-teal-700 text-white' : 'bg-neutral-200/70 text-[#2D2D2D]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Language Switcher + CTA */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-[#E8E0D8] bg-white hover:bg-neutral-50 text-[#2D2D2D] text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 shadow-2xs"
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-semibold">{currentLangInfo.nativeName}</span>
                <ChevronDown className={`w-3 h-3 text-[#737373] transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-[#E8E0D8] shadow-lg py-1.5 z-50 animate-slide-up"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      role="option"
                      aria-selected={language === l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        language === l.code
                          ? 'bg-teal-50 text-teal-700 font-bold'
                          : 'text-[#2D2D2D] hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{l.flag}</span>
                        <span>{l.nativeName}</span>
                      </div>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-teal-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('report')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('nav_cta_file', 'File Complaint')}
            </Button>
          </div>

          {/* Mobile: Lang selector + Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Language Switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              aria-label="Language selection"
              className="text-xs bg-white border border-[#E8E0D8] rounded-lg py-1.5 px-2 text-[#2D2D2D] font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-2xs"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 rounded-xl text-[#525252] hover:text-[#2D2D2D] hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="h-[2px] bg-[#FF9933] w-full" />
        <div className="h-[2px] bg-white w-full" />
        <div className="h-[2px] bg-[#138808] w-full" />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="px-4 sm:px-6 w-full absolute left-0 top-full">
          <div
            id="mobile-menu"
            role="region"
            aria-label="Mobile navigation"
            className="md:hidden mt-3 mb-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D8] shadow-xl space-y-2 animate-slide-up"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[42px] ${
                    isActive
                      ? 'text-white bg-teal-600 shadow-sm'
                      : 'text-[#525252] hover:text-[#2D2D2D] hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-xs bg-neutral-200 text-[#2D2D2D] px-2 py-0.5 rounded-full font-mono">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#E8E0D8]">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => handleNavClick('report')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t('nav_cta_file', 'Submit a Complaint Now')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
