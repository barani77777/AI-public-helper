import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Search,
  Trash2,
  AlertTriangle,
  Lightbulb,
  Droplets,
  Waves,
  FileText,
  MapPin,
  Camera,
  Clock,
  Sparkles,
  Building,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';
import { useTranslation } from '../i18n/LanguageContext';
import { getAssetUrl } from '../utils/assets';

export interface LandingPageProps {
  onStartReport: (category?: string) => void;
  onViewDashboard: (searchId?: string) => void;
  onOpenHowItWorks: () => void;
  onOpenGuide: () => void;
}

// Category card definitions with warm styling and charcoal text
const CATEGORIES = [
  {
    id: 'roads',
    translationKey: 'card_roads',
    defaultLabel: 'Roads & Potholes',
    icon: AlertTriangle,
    bgColor: 'bg-amber-50/80',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-700',
    hoverBg: 'hover:bg-amber-100',
    image: getAssetUrl('/images/pothole_road.jpg'),
  },
  {
    id: 'garbage',
    translationKey: 'card_garbage',
    defaultLabel: 'Garbage & Waste',
    icon: Trash2,
    bgColor: 'bg-emerald-50/80',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-700',
    hoverBg: 'hover:bg-emerald-100',
    image: getAssetUrl('/images/garbage_landfill.jpg'),
  },
  {
    id: 'streetlights',
    translationKey: 'card_streetlights',
    defaultLabel: 'Street Lights',
    icon: Lightbulb,
    bgColor: 'bg-yellow-50/80',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-700',
    hoverBg: 'hover:bg-yellow-100',
    image: null,
  },
  {
    id: 'water',
    translationKey: 'card_water',
    defaultLabel: 'Water Supply',
    icon: Droplets,
    bgColor: 'bg-teal-50/80',
    borderColor: 'border-teal-200',
    iconColor: 'text-teal-700',
    hoverBg: 'hover:bg-teal-100',
    image: getAssetUrl('/images/water_pipeline_burst.jpg'),
  },
  {
    id: 'drainage',
    translationKey: 'card_drainage',
    defaultLabel: 'Drainage & Sewage',
    icon: Waves,
    bgColor: 'bg-cyan-50/80',
    borderColor: 'border-cyan-200',
    iconColor: 'text-cyan-800',
    hoverBg: 'hover:bg-cyan-100',
    image: getAssetUrl('/images/drainage_waste_canal.jpg'),
  },
  {
    id: 'others',
    translationKey: 'card_others',
    defaultLabel: 'Others',
    icon: FileText,
    bgColor: 'bg-stone-50/80',
    borderColor: 'border-stone-200',
    iconColor: 'text-stone-700',
    hoverBg: 'hover:bg-stone-100',
    image: null,
  },
];

// Real evidence photos for the bottom gallery
const REAL_PROBLEMS = [
  {
    image: getAssetUrl('/images/pothole_road.jpg'),
    fallbackImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    caption: { en: 'Pothole-riddled road', ta: 'பள்ளம் நிறைந்த சாலை', hi: 'गड्ढों से भरी सड़क' },
    location: 'Tamil Nadu',
  },
  {
    image: getAssetUrl('/images/garbage_landfill.jpg'),
    fallbackImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    caption: { en: 'Open garbage landfill', ta: 'திறந்தவெளி குப்பைக்கிடங்கு', hi: 'खुला कचरा भराव' },
    location: 'India',
  },
  {
    image: getAssetUrl('/images/garbage_canal.jpg'),
    fallbackImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    caption: { en: 'Canal choked with plastic waste', ta: 'பிளாஸ்டிக் கழிவுகளால் அடைத்த கால்வாய்', hi: 'प्लास्टिक कचरे से भरी नाली' },
    location: 'India',
  },
  {
    image: getAssetUrl('/images/drainage_waste_canal.jpg'),
    fallbackImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    caption: { en: 'Blocked drainage canal', ta: 'அடைபட்ட வடிகால் கால்வாய்', hi: 'அவர்ुद्ध जल निकासी नाली' },
    location: 'India',
  },
  {
    image: getAssetUrl('/images/water_pipeline_burst.jpg'),
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
    caption: { en: 'Water pipeline burst', ta: 'குடிநீர் குழாய் வெடிப்பு', hi: 'पानी की पाइपलाइन फटना' },
    location: 'India',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartReport,
  onViewDashboard,
  onOpenHowItWorks,
}) => {
  const { t, language } = useTranslation();
  const [trackId, setTrackId] = useState('');
  
  // 3D Parallax Tilt state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    updatePageSEO({
      title: 'Public Helper — Report Civic Problems | AI Public Facility Complaint Portal',
      description: 'Public Helper empowers citizens to report public facility grievances such as potholes, garbage dumps, broken streetlights, and water pipeline leaks.',
    });
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleTrack = () => {
    if (trackId.trim()) {
      onViewDashboard(trackId.trim());
    } else {
      onViewDashboard();
    }
  };

  const handleTrackKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2D2D] font-sans">

      {/* ============ SECTION A: 3D Interactive Hero with Crystal-Clear City Showcase ============ */}
      <section 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[600px] sm:min-h-[660px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden perspective-2000 select-none border-b border-[#E8E0D8] bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#FAF8F5]"
        aria-label="Welcome Hero"
      >
        {/* Ambient background glow & subtle city backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-xs mix-blend-multiply"
          style={{ backgroundImage: `url(${getAssetUrl('/images/city_hero_bg.jpg')})` }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: 3D Interactive Main Glass Card */}
          <div 
            className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/80 transition-transform duration-200 ease-out preserve-3d"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg) translateZ(10px)`,
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>Public Helper Civic Network</span>
              <Sparkles className="w-3.5 h-3.5 text-teal-600 ml-0.5" />
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#2D2D2D] tracking-tight leading-tight">
              {t('landing_hero_title', 'Report a Problem in Your Area')}
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-[#525252] max-w-2xl font-normal leading-relaxed">
              {t('landing_hero_subtitle', 'Your voice makes your city better')}
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onStartReport()}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto text-base px-8 py-3.5 bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-700/25 text-white font-semibold transition-all hover:scale-105 active:scale-95"
              >
                {t('landing_hero_cta', 'File a Complaint')}
              </Button>
              <button
                type="button"
                onClick={onOpenHowItWorks}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#E8E0D8] bg-white hover:bg-neutral-50 text-[#2D2D2D] text-sm font-semibold hover:border-teal-500 transition-all shadow-xs hover:scale-105 active:scale-95"
              >
                {t('hero_cta_learn', 'Learn How It Works')}
              </button>
            </div>

            {/* Quick stats floating bar */}
            <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#525252]">
              <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#E8E0D8] shadow-2xs transition-transform hover:scale-105">
                <Clock className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-[#2D2D2D]">2-3 sec</span>
                <span>AI Triage</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#E8E0D8] shadow-2xs transition-transform hover:scale-105">
                <Camera className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-[#2D2D2D]">Photo</span>
                <span>Evidence</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#E8E0D8] shadow-2xs transition-transform hover:scale-105">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-[#2D2D2D]">GPS</span>
                <span>Location</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Crystal-Clear 3D Interactive Framed Photo Showcase */}
          <div 
            className="lg:col-span-5 flex justify-center perspective-1000"
          >
            <div 
              className="relative rounded-3xl p-3 bg-white/90 shadow-2xl border-2 border-white transition-transform duration-300 ease-out preserve-3d group cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * -12}deg) rotateX(${mousePos.y * 12}deg) translateZ(25px)`,
                boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
              }}
              onClick={() => onStartReport()}
            >
              {/* Ultra High Clarity Photo - Displayed in natural crisp aspect ratio without pixel stretching */}
              <div className="w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden relative shadow-inner bg-neutral-900">
                <img 
                  src={getAssetUrl('/images/city_hero_bg.jpg')} 
                  alt="City Landmark - Gateway of India Mumbai with sunrise and pigeons" 
                  className="w-full h-full object-cover object-center image-crisp transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to high-res CDN if local path is obstructed
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
                
                {/* 3D Glass Light Sheen Reflection */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" 
                  aria-hidden="true"
                />

                {/* Floating 3D Badge: Top */}
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/80 shadow-md flex items-center gap-1.5 text-[11px] font-bold text-[#2D2D2D]">
                  <Building className="w-3.5 h-3.5 text-teal-600" />
                  <span>Public Facility Care</span>
                </div>

                {/* Floating 3D Badge: Bottom */}
                <div className="absolute bottom-3.5 inset-x-3.5 bg-neutral-900/80 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold leading-tight">Preserving Our Cities & Heritage</p>
                    <p className="text-[10px] text-neutral-300 mt-0.5">Empowering citizens to report civic damage</p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============ SECTION B: 3D Category Cards Grid ============ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2D2D]">
              {t('prob_header_title', 'What would you like to report?')}
            </h2>
            <p className="text-sm text-[#525252] mt-1.5">
              Select a category to immediately pre-fill your complaint report
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onStartReport(cat.id)}
                  className={`group relative rounded-2xl border ${cat.borderColor} ${cat.bgColor} ${cat.hoverBg} p-6 sm:p-7 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 min-h-[140px] sm:min-h-[160px] shadow-sm`}
                  aria-label={t(cat.translationKey, cat.defaultLabel)}
                >
                  {/* Subtle 3D Depth Indicator Line */}
                  <div className="absolute top-0 inset-x-4 h-1 bg-white/60 rounded-b-full" />

                  {/* Background image overlay on hover (desktop) */}
                  {cat.image && (
                    <div
                      className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                      style={{ backgroundImage: `url(${cat.image})` }}
                    />
                  )}

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.iconColor} mb-3.5 relative z-10 bg-white/90 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#2D2D2D] relative z-10 group-hover:text-teal-900 transition-colors">
                    {t(cat.translationKey, cat.defaultLabel)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SECTION C: Track Your Complaint ============ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E8E0D8]">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-200/80 shadow-2xs">
            <Search className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2D2D] mb-2">
            {t('tracker_title', 'Track Your Complaint')}
          </h2>
          <p className="text-sm text-[#525252] mb-6 leading-relaxed">
            {t('tracker_placeholder', 'Enter Your Complaint ID (e.g. CIV-2026-1042) to check live status')}
          </p>

          <div className="flex items-center gap-2 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <input
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                onKeyDown={handleTrackKeyDown}
                placeholder="CIV-2026-XXXX"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#E8E0D8] bg-[#FAF8F5] text-sm text-[#2D2D2D] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-2xs"
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleTrack}
              className="px-7 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-transform hover:scale-105 active:scale-95"
            >
              {t('tracker_btn', 'Track')}
            </Button>
          </div>
        </div>
      </section>

      {/* ============ SECTION D: Real Problems Photo Gallery ============ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2D2D]">
              {t('real_problems_title', 'Real Problems in Your Area')}
            </h2>
            <p className="text-sm text-[#525252] mt-1.5">
              {t('real_problems_subtitle', 'These are real complaints from citizens like you')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {REAL_PROBLEMS.map((problem, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden border border-[#E8E0D8] bg-white shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100">
                  <img
                    src={problem.image}
                    alt={problem.caption[language as keyof typeof problem.caption] || problem.caption.en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      if (problem.fallbackImage && e.currentTarget.src !== problem.fallbackImage) {
                        e.currentTarget.src = problem.fallbackImage;
                      }
                    }}
                  />
                </div>
                <div className="p-3.5">
                  <p className="text-xs font-bold text-[#2D2D2D] leading-tight group-hover:text-teal-700 transition-colors">
                    {problem.caption[language as keyof typeof problem.caption] || problem.caption.en}
                  </p>
                  <p className="text-[11px] text-[#737373] mt-1.5 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{problem.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ How It Works CTA ============ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E8E0D8]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-[#525252] mb-3">
            Want to understand how Public Helper routes complaints to municipal officers?
          </p>
          <button
            type="button"
            onClick={onOpenHowItWorks}
            className="text-teal-700 hover:text-teal-800 text-sm font-bold inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>{t('nav_how_it_works', 'How It Works')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

    </div>
  );
};
