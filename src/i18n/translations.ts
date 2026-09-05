// CivicAI — Multi-Language Translations (English, Tamil, Hindi)

export type SupportedLanguage = 'en' | 'ta' | 'hi';

export interface LanguageInfo {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🌐' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Brand
    brand_name: 'Public Helper',
    brand_subtitle: 'Smart Public Facility Complaint Redressal',
    badge_smart_city: 'AI Smart Classifier',

    // Navigation
    nav_home: 'Home',
    nav_report: 'Submit Complaint',
    nav_dashboard: 'Complaints / Reports',
    nav_how_it_works: 'How It Works',
    nav_photo_guide: 'Photo Guide',
    nav_cta_file: 'File Complaint',

    // Hero Section
    hero_badge: 'Next-Gen Civic Technology Infrastructure',
    hero_title: 'AI-Powered Civic Complaint Classification & Dispatch',
    hero_desc: 'Empowering citizens to report broken infrastructure in seconds. CivicAI automatically classifies grievances, calculates priority based on safety and population impact, and routes standardized reports directly to municipal engineers.',
    hero_cta_submit: 'Submit a Complaint',
    hero_cta_learn: 'Learn How It Works',
    hero_accuracy: 'AI Category Accuracy',
    hero_triage_time: 'Intake & Triage Time',
    hero_urgency_model: 'Urgency Model',

    // Problems
    prob_header_sub: 'Supported Civic Issues',
    prob_header_title: 'Common Public Facility Grievances',
    prob_header_desc: 'Report any urban infrastructure failure. Our classification engine recognizes complex damage patterns across six core domains.',

    // Categories
    cat_pothole: 'Pothole / Road Damage',
    cat_garbage: 'Garbage / Solid Waste',
    cat_streetlight: 'Broken Streetlight',
    cat_water_leak: 'Water Leakage',
    cat_drainage: 'Drainage / Sewage Block',
    cat_infrastructure: 'Public Infrastructure',
    cat_other: 'Other Civic Issues',

    // Priorities
    priority_critical: 'Critical Priority',
    priority_high: 'High Priority',
    priority_medium: 'Medium Priority',
    priority_low: 'Low Priority',

    // Statuses
    status_submitted: 'Submitted',
    status_ai_processing: 'AI Processing',
    status_classified: 'Classified',
    status_assigned: 'Assigned',
    status_in_progress: 'In Progress',
    status_resolved: 'Resolved',

    // Submission Form
    form_header_title: 'Report a Public Facility Grievance',
    form_header_desc: 'Provide details of the civic problem. Our multimodal AI will classify the category, evaluate safety priority, and route the complaint to the designated municipal department.',
    form_sec_desc_title: '1. Incident Description',
    form_sec_desc_sub: 'Explain the civic problem clearly. Mention depth, size, hazard conditions, or vehicle disruption.',
    form_desc_label: 'Describe the issue',
    form_desc_placeholder: 'e.g. Deep 3-foot pothole on outer arterial lane causing severe traffic slowdowns and bike accidents during peak evening rush...',
    form_desc_help: 'Minimum 10 characters. Clear keywords help the AI classifier assess urgency accurately.',

    form_sec_photo_title: '2. Photographic Evidence',
    form_sec_photo_sub: 'Upload a clear photo of the site to increase classification confidence and priority accuracy.',
    form_photo_drop: 'Click to upload or drag and drop photo',
    form_photo_hint: 'Supports JPEG, PNG, or WebP (Max file size 10MB)',
    form_photo_choose: 'Choose From Device',
    form_photo_success: 'Evidence Attached Successfully',
    form_photo_replace: 'Replace Photo',

    form_sec_location_title: '3. Location & Jurisdiction',
    form_sec_location_sub: 'Specify the street landmark, ward, and district so the complaint routes to the right municipal division.',
    form_district_label: 'Municipal District',
    form_location_label: 'Location / Landmark / Street Name',
    form_location_placeholder: 'e.g. Anna Salai near Thousand Lights Mosque, Ward 112',
    form_location_help: 'Include nearby landmarks, cross streets, or pole numbers if available.',

    form_sec_impact_title: '4. Estimated Population Impact',
    form_sec_impact_sub: 'Approximate how many citizens or commuters are affected daily. This directly informs the AI Priority Engine.',
    form_impact_label: 'Estimated Citizens Impacted:',
    form_notes_label: 'Optional Additional Context / Hazard Notes',
    form_notes_placeholder: 'e.g. Near school crosswalk, heavy night bus traffic, active sparking',
    form_notes_help: 'Any details on vulnerable populations or compounding hazards.',

    form_submit_btn: 'Submit for AI Analysis',

    // Analysis Page
    analysis_title: 'AI Classification In Progress',
    analysis_desc: 'Evaluating complaint semantics, evidence image, and civic impact...',
    analysis_step1: 'Parsing Syntactic Structure',
    analysis_step2: 'Flagging Safety Hazard Tokens',
    analysis_step3: 'Analyzing Photographic Context',
    analysis_step4: 'Mapping Municipal Authority',
    analysis_step5: 'Computing Priority Model',
    analysis_step6: 'Compiling Structured Dossier',

    // Results Dashboard
    result_title: 'Grievance Assessment Dashboard',
    result_subtitle: 'Review AI-assessed category, priority rating, and municipal routing before final confirmation.',
    result_cat_label: 'Detected Category (AI-Assessed)',
    result_urgency_label: 'Urgency Level (AI-Assessed)',
    result_impact_label: 'Estimated Population Impact',
    result_reason_title: 'AI Priority Rationalization & Factor Breakdown',
    result_dept_title: 'Assigned Municipal Authority',
    result_confirm_btn: 'Confirm & Dispatch Complaint',
    result_edit_btn: 'Edit Complaint',
    result_print_btn: 'View Printable Dossier',
    result_start_new: 'Start Another',

    // Registry Dashboard
    dash_title: 'Complaints & Reports Dashboard',
    dash_desc: 'Monitor real-time infrastructure intake, AI priority classification, and field dispatch operations.',
    dash_kpi_total: 'Total Registered',
    dash_kpi_urgent: 'Urgent (High / Critical)',
    dash_kpi_mobilized: 'Squads Mobilized',
    dash_kpi_resolved: 'Resolved Grievances',
    dash_tab_registry: 'Complaints Registry',
    dash_tab_map: 'Interactive 3D City Map',
    dash_search_placeholder: 'Search ID, landmark, keywords...',
    dash_filter_all_cats: 'All Categories',
    dash_filter_all_priorities: 'All Priorities',
    dash_filter_all_statuses: 'All Statuses',

    // Footer
    footer_tagline: 'AI-Powered Public Facility Grievance Classifier & Smart Municipal Dispatch Platform for transparent civic accountability.',
    footer_helplines_title: 'Municipal Helplines',
    footer_slas_title: 'Target Response SLAs',
    footer_rights: 'CivicAI Open Infrastructure. Built with Next.js, React, TypeScript, and Tailwind CSS.',

    // Public Helper Branding
    brand_nagrik: 'Public Helper',
    brand_nagrik_sub_ta: 'மக்கள் உதவியாளர்',
    brand_nagrik_sub_hi: 'जन सहायक',

    // Landing Page - Hero
    landing_hero_title: 'Report a Problem in Your Area',
    landing_hero_subtitle: 'Your voice makes your city better',
    landing_hero_cta: 'File a Complaint',

    // Landing Page - Category Cards
    card_roads: 'Roads & Potholes',
    card_garbage: 'Garbage & Waste',
    card_streetlights: 'Street Lights',
    card_water: 'Water Supply',
    card_drainage: 'Drainage & Sewage',
    card_others: 'Others',

    // Landing Page - Tracker
    tracker_title: 'Track Your Complaint',
    tracker_placeholder: 'Enter Your Complaint ID',
    tracker_btn: 'Track',

    // Landing Page - Real Problems
    real_problems_title: 'Real Problems in Your Area',
    real_problems_subtitle: 'These are real complaints from citizens like you',

    // Simplified Nav
    nav_track: 'Track',

    // Footer updates
    footer_about: 'About',
    footer_contact: 'Contact',
    footer_faq: 'FAQs',
    footer_disclaimer: 'Disclaimer',
    footer_helpline: 'Toll Free Helpline',
    footer_copyright: 'Public Helper — Civic AI Platform. All rights reserved.',

    // Cartoon Chatbot Assistant
    bot_name: 'Gopal',
    bot_title: 'Public Helper Assistant',
    bot_greeting: 'Namaste! I am Gopal, your 3D civic helper. How can I help you today?',
    bot_speech_bubble: 'Hi! Need help filing a complaint?',
    bot_q_file: 'How do I file a complaint?',
    bot_q_track: 'How do I track my complaint?',
    bot_q_helplines: 'Emergency Municipal Helplines',
    bot_q_photo: 'Tips for photo evidence',
    bot_q_pothole: 'Report Pothole / Road Damage',
    bot_q_garbage: 'Report Garbage Overflow',
    bot_input_placeholder: 'Ask me anything or choose an option...',
    bot_btn_file_now: 'Go to Complaint Form',
    bot_btn_track_now: 'Go to Tracking Page',
  },

  ta: {
    // Brand
    brand_name: 'பப்ளிக் ஹெல்பர்',
    brand_subtitle: 'பொது வசதிகள் குறைதீர்ப்பு & தன்னியக்க பகுப்பாய்வு',
    badge_smart_city: 'AI ஸ்மார்ட் வகைப்படுத்தி',

    // Navigation
    nav_home: 'முகப்பு',
    nav_report: 'புகார் பதிவு செய்க',
    nav_dashboard: 'புகார்கள் / அறிக்கைகள்',
    nav_how_it_works: 'எவ்வாறு செயல்படுகிறது?',
    nav_photo_guide: 'புகைப்பட வழிகாட்டி',
    nav_cta_file: 'புகார் அளிக்கவும்',

    // Hero Section
    hero_badge: 'அதிநவீன குடிமக்கள் தொழில்நுட்ப கட்டமைப்பு',
    hero_title: 'AI மூலம் பொது வசதி புகார்கள் வகைப்பாடு & தீர்வு',
    hero_desc: 'சேதமடைந்த சாலைகள், குப்பைகள் மற்றும் தெருவிளக்கு பிரச்சனைகளை நொடிகளில் புகாரளிக்கவும். செயற்கை நுண்ணறிவு மூலம் உடனடி வகைப்பாடு செய்து, முன்னுரிமை நிர்ணயித்து நகராட்சி பொறியாளர்களுக்கு நேரிடையாக அனுப்புகிறது.',
    hero_cta_submit: 'புகார் பதிவு செய்க',
    hero_cta_learn: 'எவ்வாறு செயல்படுகிறது?',
    hero_accuracy: 'AI துல்லிய வீதம்',
    hero_triage_time: 'மதிப்பீட்டு நேரம்',
    hero_urgency_model: 'முன்னுரிமை நிலை',

    // Problems
    prob_header_sub: 'ஆதரிக்கப்படும் பொதுப் பிரச்சனைகள்',
    prob_header_title: 'அடிக்கடி ஏற்படும் பொது வசதி குறைகள்',
    prob_header_desc: 'உங்கள் பகுதியில் உள்ள எந்தவொரு உள்கட்டமைப்பு குறைபாட்டையும் எளிதாகப் புகாரளிக்கவும்.',

    // Categories
    cat_pothole: 'சாலை பள்ளம் / சாலை சேதம்',
    cat_garbage: 'குப்பைக் குவியல் / திடக்கழிவு',
    cat_streetlight: 'பழுதடைந்த தெருவிளக்கு',
    cat_water_leak: 'குடிநீர் குழாய் கசிவு',
    cat_drainage: 'வடிகால் அடைப்பு / கழிவுநீர்',
    cat_infrastructure: 'பொது உள்கட்டமைப்பு சேதம்',
    cat_other: 'இதர பொதுப் பிரச்சனைகள்',

    // Priorities
    priority_critical: 'அவசரம் (Critical)',
    priority_high: 'அதி முக்கியம் (High)',
    priority_medium: 'நடுத்தர முன்னுரிமை',
    priority_low: 'குறைந்த முன்னுரிமை',

    // Statuses
    status_submitted: 'சமர்ப்பிக்கப்பட்டது',
    status_ai_processing: 'AI ஆய்வு செய்கிறது',
    status_classified: 'வகைப்படுத்தப்பட்டது',
    status_assigned: 'ஒதுக்கப்பட்டது',
    status_in_progress: 'பணியில் உள்ளது',
    status_resolved: 'சரிசெய்யப்பட்டது',

    // Submission Form
    form_header_title: 'பொது வசதி குறைபாடு பதிவு படிவம்',
    form_header_desc: 'பிரச்சனையின் விவரங்களை உள்ளிடவும். AI தானாகவே வகைப்படுத்தி சம்பந்தப்பட்ட நகராட்சி துறைக்கு உடனடியாக அனுப்பும்.',
    form_sec_desc_title: '1. பிரச்சனை விளக்கம்',
    form_sec_desc_sub: 'சிக்கலை தெளிவாக விளக்குங்கள். பள்ளத்தின் ஆழம், அளவு அல்லது போக்குவரத்து இடையூறுகளைக் குறிப்பிடவும்.',
    form_desc_label: 'பிரச்சனையை விவரிக்கவும்',
    form_desc_placeholder: 'உதாரணமாக: பிரதான சாலையில் 3 அடி ஆழமான பள்ளம் ஏற்பட்டு இருசக்கர வாகனங்கள் விபத்துக்குள்ளாகின்றன...',
    form_desc_help: 'குறைந்தது 10 எழுத்துக்கள். தெளிவான வார்த்தைகள் AI விரைவாகக் கணிக்க உதவும்.',

    form_sec_photo_title: '2. புகைப்பட சான்று',
    form_sec_photo_sub: 'நேரில் எடுத்த புகைப்படத்தை பதிவேற்றுவது துல்லியமான ஆய்வுக்கு மிகவும் உதவும்.',
    form_photo_drop: 'புகைப்படத்தை பதிவேற்ற இங்கே கிளிக் செய்யவும்',
    form_photo_hint: 'JPEG, PNG, அல்லது WebP (அதிகபட்சம் 10MB)',
    form_photo_choose: 'மொபைல் / கணினியிலிருந்து தேர்வு செய்',
    form_photo_success: 'புகைப்படம் வெற்றிகரமாக இணைக்கப்பட்டது',
    form_photo_replace: 'மாற்று புகைப்படம் பதிவேற்று',

    form_sec_location_title: '3. இடம் & மாவட்டம்',
    form_sec_location_sub: 'சரியான துறைக்கு புகார் செல்ல குறிப்பிட்ட தெரு, வார்டு மற்றும் மாவட்டத்தை உள்ளிடவும்.',
    form_district_label: 'மாவட்டம்',
    form_location_label: 'இடம் / மைல்கல் / தெரு பெயர்',
    form_location_placeholder: 'எ.கா: அண்ணா சாலை, ஆயிரம் விளக்கு அருகில், வார்டு 112',
    form_location_help: 'அருகிலுள்ள கடைகள் அல்லது விளக்குக் கம்ப எண்களைக் குறிப்பிடலாம்.',

    form_sec_impact_title: '4. பாதிக்கப்பட்ட மக்களின் எண்ணிக்கை',
    form_sec_impact_sub: 'தினசரி பாதிக்கப்படும் பொதுமக்களின் தோராய எண்ணிக்கை. இது முன்னுரிமையை நிர்ணயிக்க உதவும்.',
    form_impact_label: 'பாதிக்கப்பட்ட குடிமக்கள்:',
    form_notes_label: 'கூடுதல் குறிப்புகள் (விருப்பத்தேர்வு)',
    form_notes_placeholder: 'எ.கா: பள்ளிக்கு அருகில், இரவு நேர வெளிச்சமின்மை',
    form_notes_help: 'பொதுமக்கள் பாதுகாப்பு குறித்த கூடுதல் தகவல்கள்.',

    form_submit_btn: 'AI ஆய்வுக்காக சமர்ப்பிக்கவும்',

    // Analysis Page
    analysis_title: 'AI மதிப்பீடு நடைபெறுகிறது',
    analysis_desc: 'விளக்கம், புகைப்படம் மற்றும் பாதுகாப்புத் தாக்கத்தை கணிக்கிறது...',
    analysis_step1: 'விளக்கச் சொற்களை ஆய்வு செய்கிறது',
    analysis_step2: 'விபத்து மற்றும் பாதுகாப்பு அபாயத்தை சரிபார்க்கிறது',
    analysis_step3: 'புகைப்பட சான்றை ஸ்கேன் செய்கிறது',
    analysis_step4: 'சம்பந்தப்பட்ட நகராட்சி துறையைத் தேர்ந்தெடுக்கிறது',
    analysis_step5: 'முன்னுரிமை மதிப்பீட்டை கணக்கிடுகிறது',
    analysis_step6: 'அதிகாரப்பூர்வ அறிக்கையை உருவாக்குகிறது',

    // Results Dashboard
    result_title: 'AI பகுப்பாய்வு முடிவு அறிக்கை',
    result_subtitle: 'இறுதி உறுதிப்படுத்தலுக்கு முன் AI கணித்த துறை மற்றும் முன்னுரிமையை சரிபார்க்கவும்.',
    result_cat_label: 'கண்டறியப்பட்ட பிரிவு (AI கணிப்பு)',
    result_urgency_label: 'முன்னுரிமை நிலை',
    result_impact_label: 'பாதிக்கப்பட்ட மக்கள்',
    result_reason_title: 'AI முன்னுரிமை நிர்ணயக் காரணம்',
    result_dept_title: 'ஒதுக்கப்பட்ட அரசுத் துறை',
    result_confirm_btn: 'உறுதிசெய்து புகாரை அனுப்புக',
    result_edit_btn: 'புகாரை மாற்றியமைக்க',
    result_print_btn: 'அச்சு அறிக்கையைப் பார்',
    result_start_new: 'புதிய புகார் தொடங்குக',

    // Registry Dashboard
    dash_title: 'புகார்கள் மற்றும் தீர்வுப் பலகை',
    dash_desc: 'நிகழ்நேர உள்கட்டமைப்பு புகார்கள் மற்றும் களப் பணிகளின் தற்போதைய நிலை.',
    dash_kpi_total: 'மொத்த புகார்கள்',
    dash_kpi_urgent: 'அவசரப் பணிகள்',
    dash_kpi_mobilized: 'களப்பணியில் உள்ளவை',
    dash_kpi_resolved: 'தீர்க்கப்பட்டவை',
    dash_tab_registry: 'புகார் பதிவேடு',
    dash_tab_map: 'முப்பரிமாண நகர வரைபடம்',
    dash_search_placeholder: 'எண், இடம் அல்லது சொல் மூலம் தேடவும்...',
    dash_filter_all_cats: 'அனைத்துப் பிரிவுகள்',
    dash_filter_all_priorities: 'அனைத்து முன்னுரிமைகள்',
    dash_filter_all_statuses: 'அனைத்து நிலைகள்',

    // Footer
    footer_tagline: 'நகராட்சி வெளிப்படைத்தன்மை மற்றும் பொதுமக்களின் நன்மைக்கான AI அடிப்படையிலான குறைதீர்ப்பு தளம்.',
    footer_helplines_title: 'அவசர உதவி எண்கள்',
    footer_slas_title: 'தீர்வு காலக்கெடு (SLA)',
    footer_rights: 'சிவிக் AI திறந்தநிலை கட்டமைப்பு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

    // Public Helper Branding
    brand_nagrik: 'பப்ளிக் ஹெல்பர்',
    brand_nagrik_sub_ta: 'மக்கள் உதவியாளர்',
    brand_nagrik_sub_hi: 'जन सहायक',

    // Landing Page - Hero
    landing_hero_title: 'உங்கள் பகுதியில் ஒரு பிரச்சனையை புகாரளிக்கவும்',
    landing_hero_subtitle: 'உங்கள் குரல் உங்கள் நகரை சிறப்பாக மாற்றும்',
    landing_hero_cta: 'புகார் அளிக்கவும்',

    // Landing Page - Category Cards
    card_roads: 'சாலைகள் & பள்ளங்கள்',
    card_garbage: 'குப்பை & கழிவுகள்',
    card_streetlights: 'தெரு விளக்குகள்',
    card_water: 'குடிநீர் வழங்கல்',
    card_drainage: 'வடிகால் & கழிவுநீர்',
    card_others: 'மற்றவை',

    // Landing Page - Tracker
    tracker_title: 'உங்கள் புகாரை கண்காணிக்கவும்',
    tracker_placeholder: 'உங்கள் புகார் எண்ணை உள்ளிடவும்',
    tracker_btn: 'கண்காணி',

    // Landing Page - Real Problems
    real_problems_title: 'உங்கள் பகுதியில் உண்மையான பிரச்சனைகள்',
    real_problems_subtitle: 'உங்களைப் போன்ற குடிமக்களின் உண்மையான புகார்கள்',

    // Simplified Nav
    nav_track: 'கண்காணிப்பு',

    // Footer updates
    footer_about: 'எங்களை பற்றி',
    footer_contact: 'தொடர்பு',
    footer_faq: 'கேள்வி பதில்',
    footer_disclaimer: 'மறுப்பு',
    footer_helpline: 'இலவச உதவி எண்',
    footer_copyright: 'பப்ளிக் ஹெல்பர் — AI நகர்ப்புற தளம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

    // Cartoon Chatbot Assistant
    bot_name: 'கோபால்',
    bot_title: 'மக்கள் உதவி உதவியாளர்',
    bot_greeting: 'வணக்கம்! நான் கோபால். பொது வசதி பிரச்சனைகளை புகாரளிக்க நான் உங்களுக்கு வழிகாட்டுகிறேன். என்ன உதவி வேண்டும்?',
    bot_speech_bubble: 'வணக்கம்! புகார் அளிக்க உதவி வேண்டுமா?',
    bot_q_file: 'புகார் அளிப்பது எப்படி?',
    bot_q_track: 'புகாரை கண்காணிப்பது எப்படி?',
    bot_q_helplines: 'அவசர உதவி எண்கள்',
    bot_q_photo: 'புகைப்படம் எடுப்பதற்கான குறிப்புகள்',
    bot_q_pothole: 'சாலை பள்ளத்தை புகாரளி',
    bot_q_garbage: 'குப்பை பிரச்சனையை புகாரளி',
    bot_input_placeholder: 'ஏதேனும் கேளுங்கள்...',
    bot_btn_file_now: 'படிவத்திற்கு செல்லவும்',
    bot_btn_track_now: 'கண்காணிப்பு பலகைக்கு செல்லவும்',
  },

  hi: {
    // Brand
    brand_name: 'पब्लिक हेल्पर',
    brand_subtitle: 'स्मार्ट नागरिक शिकायत निवारण पोर्टल',
    badge_smart_city: 'AI स्मार्ट क्लासिफायर',

    // Navigation
    nav_home: 'होम',
    nav_report: 'शिकायत दर्ज करें',
    nav_dashboard: 'शिकायतें / रिपोर्ट',
    nav_how_it_works: 'यह कैसे काम करता है?',
    nav_photo_guide: 'फोटो गाइड',
    nav_cta_file: 'शिकायत करें',

    // Hero Section
    hero_badge: 'आधुनिक नागरिक प्रौद्योगिकी प्रणाली',
    hero_title: 'AI-संचालित जन शिकायत वर्गीकरण एवं त्वरित समाधान',
    hero_desc: 'टूटी सड़कों, कचरे और स्ट्रीटलाइट समस्याओं की रिपोर्ट सेकंडों में दर्ज करें। AI स्वचालित रूप से समस्या का वर्गीकरण करता है, प्राथमिकता तय करता है और सीधे संबंधित नगर निगम अधिकारियों को भेजता है।',
    hero_cta_submit: 'शिकायत दर्ज करें',
    hero_cta_learn: 'प्रक्रिया समझें',
    hero_accuracy: 'AI सटीकता दर',
    hero_triage_time: 'जांच समय',
    hero_urgency_model: 'प्राथमिकता स्तर',

    // Problems
    prob_header_sub: 'समस्या श्रेणियां',
    prob_header_title: 'नागरिक सुविधाएं एवं समस्याएं',
    prob_header_desc: 'सड़कों, जल निकासी और कचरे से संबंधित समस्याओं की तुरंत रिपोर्ट करें।',

    // Categories
    cat_pothole: 'सड़क गड्ढे / क्षति',
    cat_garbage: 'कचरा ढेर / ठोस अपशिष्ट',
    cat_streetlight: 'खराब स्ट्रीटलाइट',
    cat_water_leak: 'पेयजल पाइपलाइन लीकेज',
    cat_drainage: 'नाली जाम / सीवरेज',
    cat_infrastructure: 'सार्वजनिक ढांचा क्षति',
    cat_other: 'अन्य नागरिक मुद्दे',

    // Priorities
    priority_critical: 'अति-आवश्यक (Critical)',
    priority_high: 'उच्च प्राथमिकता (High)',
    priority_medium: 'मध्यम प्राथमिकता',
    priority_low: 'सामान्य प्राथमिकता',

    // Statuses
    status_submitted: 'दर्ज किया गया',
    status_ai_processing: 'AI विश्लेषण जारी',
    status_classified: 'वर्गीकृत',
    status_assigned: 'अधिकारी को सौंपा गया',
    status_in_progress: 'कार्य प्रगति पर',
    status_resolved: 'समस्या हल हुई',

    // Submission Form
    form_header_title: 'सार्वजनिक सुविधा शिकायत प्रपत्र',
    form_header_desc: 'समस्या का विवरण भरें। हमारा AI स्वचालित रूप से प्राथमिकता तय करेगा और संबंधित नगर निगम विभाग को भेजेगा।',
    form_sec_desc_title: '1. समस्या का विवरण',
    form_sec_desc_sub: 'समस्या का स्पष्ट विवरण दें। गड्ढे का आकार या यातायात बाधा का उल्लेख करें।',
    form_desc_label: 'समस्या का विवरण लिखें',
    form_desc_placeholder: 'उदाहरण: मुख्य मार्ग पर गहरा गड्ढा जिससे दुर्घटना की संभावना है...',
    form_desc_help: 'न्यूनतम 10 अक्षर। स्पष्ट शब्दों से AI सटीक वर्गीकरण करता है।',

    form_sec_photo_title: '2. फोटो साक्ष्य',
    form_sec_photo_sub: 'समस्या स्थल की स्पष्ट फोटो अपलोड करें जिससे त्वरित समाधान हो सके।',
    form_photo_drop: 'फोटो अपलोड करने के लिए क्लिक करें या ड्रैग करें',
    form_photo_hint: 'JPEG, PNG, या WebP (अधिकतम 10MB)',
    form_photo_choose: 'डिवाइस से चुनें',
    form_photo_success: 'फोटो सफलतापूर्वक संलग्न की गई',
    form_photo_replace: 'फोटो बदलें',

    form_sec_location_title: '3. स्थान एवं जिला',
    form_sec_location_sub: 'सटीक पता या वार्ड लिखें ताकि टीम सही जगह पहुंच सके।',
    form_district_label: 'जिला',
    form_location_label: 'स्थान / लैंडमार्क / सड़क का नाम',
    form_location_placeholder: 'उदा. स्टेशन रोड, मुख्य चौराहे के पास, वार्ड 14',
    form_location_help: 'निकटवर्ती प्रसिद्ध दुकान या बिजली के खंभे का नंबर लिखें।',

    form_sec_impact_title: '4. प्रभावित लोगों की संख्या',
    form_sec_impact_sub: 'अनुमानित नागरिक जिन्हें इस समस्या से परेशानी हो रही है।',
    form_impact_label: 'प्रभावित नागरिक:',
    form_notes_label: 'अतिरिक्त जानकारी (वैकल्पिक)',
    form_notes_placeholder: 'उदा. स्कूल के पास, रात में अत्यधिक अंधेरा',
    form_notes_help: 'सार्वजनिक सुरक्षा से जुड़ा कोई भी महत्वपूर्ण बिंदु।',

    form_submit_btn: 'AI जांच हेतु जमा करें',

    // Analysis Page
    analysis_title: 'AI विश्लेषण प्रगति पर है',
    analysis_desc: 'विवरण, फोटो और नागरिक प्रभाव की गणना की जा रही है...',
    analysis_step1: 'विवरण के शब्दों का विश्लेषण',
    analysis_step2: 'सुरक्षा खतरे के संकेत की पहचान',
    analysis_step3: 'फोटो साक्ष्य की जांच',
    analysis_step4: 'संबंधित नगर निगम विभाग का चयन',
    analysis_step5: 'प्राथमिकता स्कोर का निर्धारण',
    analysis_step6: 'आधिकारिक शिकायत रिपोर्ट तैयार करना',

    // Results Dashboard
    result_title: 'AI विश्लेषण परिणाम डैशबोर्ड',
    result_subtitle: 'अंतिम पुष्टि से पहले AI द्वारा निर्धारित श्रेणी और विभाग की जांच करें।',
    result_cat_label: 'पहचानी गई श्रेणी (AI अनुमानित)',
    result_urgency_label: 'प्राथमिकता स्तर',
    result_impact_label: 'प्रभावित नागरिक',
    result_reason_title: 'प्राथमिकता निर्धारण का कारण',
    result_dept_title: 'आवंटित नगर पालिका विभाग',
    result_confirm_btn: 'पुष्टि करें और शिकायत भेजें',
    result_edit_btn: 'विवरण संशोधित करें',
    result_print_btn: 'प्रिंट योग्य रिपोर्ट देखें',
    result_start_new: 'नई शिकायत दर्ज करें',

    // Registry Dashboard
    dash_title: 'शिकायत एवं रिपोर्ट डैशबोर्ड',
    dash_desc: 'नागरिक शिकायतों, AI प्राथमिकताओं और समाधान की लाइव स्थिति देखें।',
    dash_kpi_total: 'कुल शिकायतें',
    dash_kpi_urgent: 'अति-आवश्यक मामले',
    dash_kpi_mobilized: 'टीम स्थल पर तैनात',
    dash_kpi_resolved: 'निपटाई गई शिकायतें',
    dash_tab_registry: 'शिकायत पंजी',
    dash_tab_map: '3D शहर नक्शा',
    dash_search_placeholder: 'आईडी, स्थान या शब्द खोजें...',
    dash_filter_all_cats: 'सभी श्रेणियां',
    dash_filter_all_priorities: 'सभी प्राथमिकताएं',
    dash_filter_all_statuses: 'सभी स्थितियां',

    // Footer
    footer_tagline: 'नागरिक जवाबदेही और पारदर्शी शासन के लिए AI-संचालित जन शिकायत समाधान मंच।',
    footer_helplines_title: 'नगर पालिका हेल्पलाइन',
    footer_slas_title: 'समाधान समयसीमा (SLA)',
    footer_rights: 'सिविक AI खुला नागरिक मंच। सर्वाधिकार सुरक्षित।',

    // Public Helper Branding
    brand_nagrik: 'पब्लिक हेल्पर',
    brand_nagrik_sub_ta: 'மக்கள் உதவியாளர்',
    brand_nagrik_sub_hi: 'जन सहायक',

    // Landing Page - Hero
    landing_hero_title: 'अपने क्षेत्र की समस्या दर्ज करें',
    landing_hero_subtitle: 'आपकी आवाज़ आपके शहर को बेहतर बनाती है',
    landing_hero_cta: 'शिकायत दर्ज करें',

    // Landing Page - Category Cards
    card_roads: 'सड़कें और गड्ढे',
    card_garbage: 'कचरा और अपशिष्ट',
    card_streetlights: 'स्ट्रीट लाइट',
    card_water: 'जल आपूर्ति',
    card_drainage: 'नाली और सीवरेज',
    card_others: 'अन्य',

    // Landing Page - Tracker
    tracker_title: 'अपनी शिकायत ट्रैक करें',
    tracker_placeholder: 'अपना शिकायत नंबर दर्ज करें',
    tracker_btn: 'ट्रैक करें',

    // Landing Page - Real Problems
    real_problems_title: 'आपके क्षेत्र की वास्तविक समस्याएं',
    real_problems_subtitle: 'ये आप जैसे नागरिकों की वास्तविक शिकायतें हैं',

    // Simplified Nav
    nav_track: 'ट्रैक',

    // Footer updates
    footer_about: 'हमारे बारे में',
    footer_contact: 'संपर्क',
    footer_faq: 'सामान्य प्रश्न',
    footer_disclaimer: 'अस्वीकरण',
    footer_helpline: 'टोल फ्री हेल्पलाइन',
    footer_copyright: 'पब्लिक हेल्पर — AI नागरिक मंच। सर्वाधिकार सुरक्षित।',

    // Cartoon Chatbot Assistant
    bot_name: 'गोपाल',
    bot_title: 'पब्लिक हेल्पर सहायक',
    bot_greeting: 'नमस्ते! मैं गोपाल हूँ। नागरिक समस्याओं की शिकायत दर्ज करने में मैं आपकी मदद करूँगा। आप क्या जानना चाहते हैं?',
    bot_speech_bubble: 'नमस्ते! शिकायत दर्ज करने में मदद चाहिए?',
    bot_q_file: 'शिकायत कैसे दर्ज करें?',
    bot_q_track: 'शिकायत कैसे ट्रैक करें?',
    bot_q_helplines: 'आपातकालीन नगर निगम हेल्पलाइन',
    bot_q_photo: 'फोटो साक्ष्य के लिए टिप्स',
    bot_q_pothole: 'सड़क गड्ढे की रिपोर्ट करें',
    bot_q_garbage: 'कचरा समस्या की रिपोर्ट करें',
    bot_input_placeholder: 'मुझसे कुछ भी पूछें...',
    bot_btn_file_now: 'शिकायत फॉर्म पर जाएं',
    bot_btn_track_now: 'ट्रैकिंग पेज पर जाएं',
  },
};
