import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  AlertTriangle, 
  Building2, 
  Cpu, 
  Camera, 
  FileText, 
  Sliders, 
  Users, 
  Eye, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';
import { useTranslation } from '../i18n/LanguageContext';

export interface HowItWorksPageProps {
  onStartReport: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onStartReport,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    updatePageSEO({
      title: 'How It Works & FAQ',
      description: 'Learn how CivicAI classifies civic grievances, determines objective priority, and transparently routes reports to municipal engineers.',
    });
  }, []);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const workflowSteps = [
    {
      step: 1,
      title: 'Citizen Reports Issue',
      desc: 'Citizen encounters broken infrastructure (pothole, burst pipe, dark streetlight, garbage dump) and opens the portal.',
      icon: Users,
    },
    {
      step: 2,
      title: 'Text & Evidence Submitted',
      desc: 'Citizen inputs a brief description, uploads a street photo, and confirms geographic location.',
      icon: Camera,
    },
    {
      step: 3,
      title: 'Multimodal AI Analysis',
      desc: 'The AI model processes the natural language text and scans visual features in the photograph.',
      icon: Cpu,
    },
    {
      step: 4,
      title: 'Category Identified',
      desc: 'Grievance is classified into road, water, electrical, sanitation, or structural domains with a confidence score.',
      icon: FileText,
    },
    {
      step: 5,
      title: 'Severity & Impact Evaluated',
      desc: 'Evaluates public safety risk (electrocution, collision) and multiplies by estimated citizens affected.',
      icon: Eye,
    },
    {
      step: 6,
      title: 'Priority Calculated',
      desc: 'Deterministic algorithm assigns a 4-tier urgency score (Critical, High, Medium, Low).',
      icon: Sliders,
    },
    {
      step: 7,
      title: 'Structured Report Generated',
      desc: 'A standardized civic grievance dossier is compiled with official codes, SLA, and engineering protocols.',
      icon: Layers,
    },
    {
      step: 8,
      title: 'Municipal Routing & Dispatch',
      desc: 'Complaint is immediately dispatched to the specific municipal ward engineer and tracked to resolution.',
      icon: Building2,
    },
  ];

  const faqs = [
    {
      question: 'What types of complaints can I submit?',
      answer: 'CivicAI accepts public infrastructure grievances across major municipal domains: road potholes, asphalt fractures, overflowing garbage bins and massive open dumps, broken streetlights, drinking water pipeline leaks, blocked storm water drains, sewage overflows, and broken curbs or center medians.',
    },
    {
      question: 'Can I upload images and what file formats are supported?',
      answer: 'Yes! Uploading photographic evidence significantly enhances the accuracy of our AI classification engine. We support JPEG, PNG, and WebP images up to 10MB in size. You can snap a photo directly from your mobile camera or upload from your device.',
    },
    {
      question: 'How is complaint priority determined?',
      answer: 'Priority is calculated deterministically through an objective formula combining four core factors: Public Safety Hazard (e.g. electrocution or collision risk), Estimated Affected Population (commuters or residents), Infrastructure Criticality (arterial corridor vs residential alley), and Evidence Verification. Scores map to 4 tiers: Low, Medium, High, and Critical.',
    },
    {
      question: 'How does AI classify complaints?',
      answer: 'The platform employs a multimodal classification pipeline. It parses the semantic tokens and keywords within the citizen’s narrative (e.g., “crater”, “gushing water”, “dark corner”, “garbage dump”) and correlates them with computer vision damage pattern heuristics to identify the appropriate municipal domain.',
    },
    {
      question: 'What happens after submission?',
      answer: 'Once confirmed, your complaint receives a unique civic tracking identifier (e.g. CIV-2026-1042). It is logged in the public grievance registry and routed to the designated division (such as GCC Highways, Metro Water, or TANGEDCO) alongside a target Service Level Agreement (SLA).',
    },
    {
      question: 'Can I correct a complaint after the AI analyzes it?',
      answer: 'Yes! On the AI Assessment Result screen, you can click "Edit Complaint" to update your description, change the location, or attach a different photograph before final dispatch.',
    },
    {
      question: 'What information is stored and is my privacy protected?',
      answer: 'We only store the complaint narrative, uploaded photograph, landmark location, and generated audit timestamps necessary for municipal field remediation. We do not sell or track personal identifying data.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
          <span>{t('nav_how_it_works', 'How It Works & FAQ')}</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#2D2D2D] tracking-tight">
          How Public Helper Works
        </h1>
        <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
          Transparent, automated public facility complaint triage designed to eliminate bureaucratic delay and prioritize public safety.
        </p>
      </div>

      {/* 8-Step Visual Workflow */}
      <section className="space-y-8">
        <div className="border-b border-[#E8E0D8] pb-4">
          <h2 className="font-heading font-bold text-xl text-[#2D2D2D]">
            The 8-Stage Redressal Lifecycle
          </h2>
          <p className="text-xs text-[#737373] mt-1">
            Follow the journey of a citizen report from discovery to municipal field repair.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.map((ws) => {
            const Icon = ws.icon;
            return (
              <div
                key={ws.step}
                className="card-3d rounded-2xl bg-white border border-[#E8E0D8] p-5 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-teal-400/80 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="depth-layer-2 w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                      0{ws.step}
                    </span>
                    <Icon className="w-5 h-5 text-teal-600/70" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#2D2D2D]">
                    {ws.title}
                  </h3>
                  <p className="text-xs text-[#525252] mt-1 leading-relaxed">
                    {ws.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Limitations & Governance Disclosures */}
      <section className="rounded-3xl bg-amber-50/70 border border-amber-200 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-slate-900">
              AI Transparency &amp; Operational Limitations
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              CivicAI is an algorithmic decision-support tool created to assist municipal departments with triage. To ensure fair and accountable governance, please note:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-5 pt-1">
              <li>
                <strong>Advisory Assessment:</strong> Priority ratings (Low to Critical) and category tags are automated statistical inferences, not official government administrative orders.
              </li>
              <li>
                <strong>Potential for Misclassification:</strong> In ambiguous lighting or poor photos, the AI model may assign lower confidence. Human municipal engineers review edge cases before field mobilization.
              </li>
              <li>
                <strong>Citizen Responsibility:</strong> Accurate location landmarks and clear photographs are essential for timely field response.
              </li>
              <li>
                <strong>Emergency Protocols:</strong> In life-threatening emergencies (e.g. fallen high-voltage power lines or building collapse), always call the direct emergency helpline (<strong>112 / 1912 / 1913</strong>) immediately.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessible Interactive FAQ Accordion */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="font-heading font-bold text-xl text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clear answers on complaint handling, evidence criteria, and municipal dispatch.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-sm text-[#2D2D2D] hover:text-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#737373] transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-slate-200 space-y-4">
        <h3 className="font-heading font-bold text-xl text-slate-900">
          Ready to Lodge Your Grievance?
        </h3>
        <Button
          variant="primary"
          size="lg"
          onClick={onStartReport}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {t('hero_cta_submit', 'Submit a Complaint Now')}
        </Button>
      </div>

    </div>
  );
};
