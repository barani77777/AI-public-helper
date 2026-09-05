import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Search, 
  Camera, 
  AlertTriangle, 
  Trash2, 
  Droplets,
  HelpCircle,
  Minimize2
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { ActivePage } from '../../types/navigation';

export interface CartoonAssistantProps {
  onNavigate: (page: ActivePage) => void;
  onStartReportWithCategory?: (category: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  options?: { label: string; actionKey: string }[];
}

export const CartoonAssistant: React.FC<CartoonAssistantProps> = ({
  onNavigate,
  onStartReportWithCategory,
}) => {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when opened or language changes
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      sender: 'bot',
      text: t('bot_greeting', 'Namaste! I am Gopal, your 3D civic helper. How can I help you today?'),
      options: [
        { label: t('bot_q_file', 'How do I file a complaint?'), actionKey: 'how_to_file' },
        { label: t('bot_q_track', 'How do I track my complaint?'), actionKey: 'how_to_track' },
        { label: t('bot_q_helplines', 'Emergency Municipal Helplines'), actionKey: 'helplines' },
        { label: t('bot_q_pothole', 'Report Pothole / Road Damage'), actionKey: 'cat_roads' },
        { label: t('bot_q_garbage', 'Report Garbage Overflow'), actionKey: 'cat_garbage' },
      ],
    };
    setMessages([welcomeMsg]);
  }, [language, t]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Hide speech bubble after 12 seconds if not interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickAction = (actionKey: string) => {
    if (actionKey === 'how_to_file') {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: t('bot_q_file', 'How do I file a complaint?'),
      };
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: language === 'ta'
          ? 'புகார் அளிக்க 3 எளிய வழிகள்: 1. பிரச்சனை வகையைத் தேர்ந்தெடுக்கவும் 2. புகைப்படச் சான்று இணைக்கவும் 3. இடத்தை உள்ளிட்டு சமர்ப்பிக்கவும்!'
          : language === 'hi'
          ? 'शिकायत दर्ज करना बहुत आसान है: 1. श्रेणी चुनें 2. फोटो अपलोड करें 3. स्थान दर्ज कर AI विश्लेषण हेतु जमा करें!'
          : 'Filing is super simple: 1. Select the issue category 2. Upload photo evidence 3. Enter your street or GPS location and submit for 2-second AI assessment!',
        action: {
          label: t('bot_btn_file_now', 'Go to Complaint Form'),
          onClick: () => {
            onNavigate('report');
            setIsOpen(false);
          },
          icon: <ArrowRight className="w-3.5 h-3.5" />,
        },
      };
      setMessages((prev) => [...prev, userMsg, botResponse]);
    } else if (actionKey === 'how_to_track') {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: t('bot_q_track', 'How do I track my complaint?'),
      };
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: language === 'ta'
          ? 'உங்கள் புகார் எண் (எ.கா: CIV-2026-1042) மூலம் முகப்பிலோ அல்லது கண்காணிப்பு பலகையிலோ நிலையை உடனுக்குடன் சரிபார்க்கலாம்.'
          : language === 'hi'
          ? 'अपनी शिकायत आईडी (उदा: CIV-2026-1042) को होमपेज या ट्रैकिंग डैशबोर्ड पर दर्ज करके स्थिति देखें।'
          : 'Enter your Complaint ID (e.g. CIV-2026-1042) in the homepage search bar or visit the Complaints Registry to see live resolution progress.',
        action: {
          label: t('bot_btn_track_now', 'Go to Tracking Page'),
          onClick: () => {
            onNavigate('dashboard');
            setIsOpen(false);
          },
          icon: <Search className="w-3.5 h-3.5" />,
        },
      };
      setMessages((prev) => [...prev, userMsg, botResponse]);
    } else if (actionKey === 'helplines') {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: t('bot_q_helplines', 'Emergency Municipal Helplines'),
      };
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: '📞 Toll-Free Municipal Helplines:\n• GCC Corporation: 1913\n• Metro Water & Sewage: 1916\n• TNEB Electricity: 1912\n• CM State Helpline: 1100',
      };
      setMessages((prev) => [...prev, userMsg, botResponse]);
    } else if (actionKey === 'cat_roads') {
      if (onStartReportWithCategory) {
        onStartReportWithCategory('roads');
      } else {
        onNavigate('report');
      }
      setIsOpen(false);
    } else if (actionKey === 'cat_garbage') {
      if (onStartReportWithCategory) {
        onStartReportWithCategory('garbage');
      } else {
        onNavigate('report');
      }
      setIsOpen(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim().toLowerCase();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
    };
    setInputValue('');

    let replyText = '';
    let replyAction: ChatMessage['action'] = undefined;

    if (query.includes('pothole') || query.includes('road') || query.includes('சாலை') || query.includes('सड़क')) {
      replyText = 'I can help you lodge a road damage complaint immediately!';
      replyAction = {
        label: 'Report Road Issue Now',
        onClick: () => {
          if (onStartReportWithCategory) onStartReportWithCategory('roads');
          else onNavigate('report');
          setIsOpen(false);
        },
        icon: <ArrowRight className="w-3.5 h-3.5" />
      };
    } else if (query.includes('garbage') || query.includes('waste') || query.includes('குப்பை') || query.includes('कचरा')) {
      replyText = 'Let me take you to report overflowing garbage or dump sites.';
      replyAction = {
        label: 'Report Garbage Issue',
        onClick: () => {
          if (onStartReportWithCategory) onStartReportWithCategory('garbage');
          else onNavigate('report');
          setIsOpen(false);
        },
        icon: <ArrowRight className="w-3.5 h-3.5" />
      };
    } else if (query.includes('water') || query.includes('leak') || query.includes('தண்ணீர்') || query.includes('पानी')) {
      replyText = 'Water pipeline burst or drainage overflow? Report it immediately to alert engineers.';
      replyAction = {
        label: 'Report Water Issue',
        onClick: () => {
          if (onStartReportWithCategory) onStartReportWithCategory('water');
          else onNavigate('report');
          setIsOpen(false);
        },
        icon: <ArrowRight className="w-3.5 h-3.5" />
      };
    } else if (query.includes('track') || query.includes('status') || query.includes('நிலை') || query.includes('स्थिति')) {
      replyText = 'You can track any registered complaint on our live status dashboard using your complaint number.';
      replyAction = {
        label: 'Open Tracker',
        onClick: () => {
          onNavigate('dashboard');
          setIsOpen(false);
        },
        icon: <Search className="w-3.5 h-3.5" />
      };
    } else if (query.includes('help') || query.includes('phone') || query.includes('number') || query.includes('ஹெல்ப்') || query.includes('फोन')) {
      replyText = 'Official Emergency Helplines:\n• City Corp: 1913\n• Metro Water: 1916\n• Power Board: 1912\n• CM Helpline: 1100';
    } else {
      replyText = `I understand! Public Helper is ready to triage your problem. You can report potholes, garbage dumps, dark streetlights, or water leaks in under 30 seconds.`;
      replyAction = {
        label: 'Start New Complaint',
        onClick: () => {
          onNavigate('report');
          setIsOpen(false);
        },
        icon: <ArrowRight className="w-3.5 h-3.5" />
      };
    }

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: replyText,
      action: replyAction,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none print:hidden">
      
      {/* Speech Bubble (when chat closed) */}
      {!isOpen && showSpeechBubble && (
        <div 
          onClick={() => {
            setIsOpen(true);
            setShowSpeechBubble(false);
          }}
          className="cursor-pointer mb-2 mr-2 max-w-[210px] bg-white rounded-2xl p-3 shadow-xl border border-teal-200 text-xs font-semibold text-[#2D2D2D] relative animate-float-3d flex items-start justify-between gap-1.5"
          role="status"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base">👋</span>
            <span className="leading-snug text-[11px]">
              {t('bot_speech_bubble', 'Hi! Need help filing a complaint?')}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowSpeechBubble(false);
            }}
            className="text-neutral-400 hover:text-neutral-700 p-0.5"
            aria-label="Dismiss speech bubble"
          >
            <X className="w-3 h-3" />
          </button>
          {/* Arrow pointing down to character */}
          <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-b border-r border-teal-200 transform rotate-45" />
        </div>
      )}

      {/* Floating 3D Cartoon Character Mascot Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setShowSpeechBubble(false);
          }}
          className="group relative flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50 rounded-full transition-transform active:scale-95"
          aria-label="Open Gopal Chat Assistant"
        >
          {/* Pulsing ring aura */}
          <div className="absolute inset-0 rounded-full bg-teal-500/25 animate-pulse-glow" />

          {/* 3D Cartoon Mascot SVG */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-[#FFF5E9] via-[#FAF8F5] to-teal-50 p-1 border-2 border-teal-500 shadow-2xl animate-mascot-bob group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                {/* 3D Gradients */}
                <radialGradient id="faceGrad" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFEBD4" />
                  <stop offset="70%" stopColor="#F7C8A0" />
                  <stop offset="100%" stopColor="#E2A676" />
                </radialGradient>
                <linearGradient id="capGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="50%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#0F766E" />
                </linearGradient>
                <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#115E59" />
                </linearGradient>
                <filter id="mascotShadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Character Body / Jacket */}
              <path 
                d="M 24 82 C 24 68, 76 68, 76 82 C 76 92, 24 92, 24 82 Z" 
                fill="url(#jacketGrad)" 
                filter="url(#mascotShadow)"
              />
              {/* White collar */}
              <polygon points="50,72 40,82 60,82" fill="#FFFFFF" />
              {/* Gold tie badge */}
              <circle cx="50" cy="81" r="3" fill="#F59E0B" />

              {/* Head */}
              <circle 
                cx="50" 
                cy="48" 
                r="26" 
                fill="url(#faceGrad)" 
                filter="url(#mascotShadow)"
              />

              {/* Rosy Cheeks */}
              <ellipse cx="34" cy="54" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
              <ellipse cx="66" cy="54" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />

              {/* Animated Eyes with Blinking */}
              <g className="animate-eye-blink">
                {/* Left eye */}
                <ellipse cx="39" cy="46" rx="4" ry="5.5" fill="#1E293B" />
                <circle cx="40.5" cy="44" r="1.5" fill="#FFFFFF" />
                {/* Right eye */}
                <ellipse cx="61" cy="46" rx="4" ry="5.5" fill="#1E293B" />
                <circle cx="62.5" cy="44" r="1.5" fill="#FFFFFF" />
              </g>

              {/* Friendly Smiling Mouth */}
              <path 
                d="M 43 56 Q 50 63 57 56" 
                stroke="#831843" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                fill="none" 
              />
              {/* Little cute tongue */}
              <path 
                d="M 47 58 Q 50 62 53 58 Z" 
                fill="#FB7185" 
              />

              {/* Municipal Volunteer Cap */}
              <path 
                d="M 23 38 C 23 20, 77 20, 77 38 C 77 40, 23 40, 23 38 Z" 
                fill="url(#capGrad)" 
              />
              {/* Cap Visor */}
              <path 
                d="M 18 38 C 25 43, 75 43, 82 38 C 76 35, 24 35, 18 38 Z" 
                fill="#0F766E" 
              />
              {/* Cap Gold Emblem Badge */}
              <circle cx="50" cy="28" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              <polygon points="50,25 51.5,29 55,29 52,31 53,34 50,32 47,34 48,31 45,29 48.5,29" fill="#FFFFFF" />

              {/* Animated Waving Hand */}
              <g className="animate-hand-wave">
                <circle cx="82" cy="48" r="8" fill="#FFEBD4" stroke="#E2A676" strokeWidth="1" />
                <path d="M 82 44 Q 85 41 87 44 Q 88 47 85 50" fill="#FFEBD4" />
                <path d="M 85 46 Q 88 44 90 47 Q 89 50 86 52" fill="#FFEBD4" />
              </g>
            </svg>
          </div>

          {/* Online green indicator */}
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
        </button>
      )}

      {/* Expanded Interactive Chat Modal */}
      {isOpen && (
        <div 
          className="w-[330px] sm:w-[380px] h-[520px] rounded-3xl bg-white border border-[#E8E0D8] shadow-2xl flex flex-col overflow-hidden animate-slide-up"
          role="dialog"
          aria-label="Public Helper Gopal Assistant"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-700 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 p-1 flex items-center justify-center border border-white/40 shadow-inner">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm leading-tight flex items-center gap-1.5">
                  <span>{t('bot_name', 'Gopal')}</span>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-teal-100 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('bot_title', 'Public Helper Assistant')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF8F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-[#2D2D2D] rounded-bl-none border border-[#E8E0D8] shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <button
                      type="button"
                      onClick={msg.action.onClick}
                      className="mt-2.5 w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-teal-200 transition-colors shadow-2xs"
                    >
                      <span>{msg.action.label}</span>
                      {msg.action.icon}
                    </button>
                  )}
                </div>

                {/* Optional Quick Action Suggestion Chips */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.actionKey}
                        type="button"
                        onClick={() => handleQuickAction(opt.actionKey)}
                        className="text-[11px] py-1 px-2.5 rounded-full bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 font-semibold shadow-2xs transition-all hover:scale-102 active:scale-98"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-[#E8E0D8] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('bot_input_placeholder', 'Ask me anything or choose an option...')}
              className="flex-1 px-3.5 py-2 text-xs text-[#2D2D2D] bg-[#FAF8F5] border border-[#E8E0D8] rounded-xl placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors flex items-center justify-center shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
