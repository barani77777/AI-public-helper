import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  Check, 
  AlertCircle, 
  Navigation, 
  Camera, 
  Trash2,
  Users
} from 'lucide-react';
import { ComplaintInput, LocationCoords } from '../types/complaint';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Alert } from '../components/ui/Alert';
import { updatePageSEO } from '../utils/seo';
import { PRESET_TEST_SCENARIOS, TN_DISTRICTS } from '../data/complaintsData';
import ReferencePhotoGuide from '../components/ReferencePhotoGuide';
import { useTranslation } from '../i18n/LanguageContext';

export interface ReportPageProps {
  onStartAnalysis: (formData: ComplaintInput) => void;
  initialDraft?: ComplaintInput | null;
  selectedCategory?: string;
  onOpenGuide?: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  onStartAnalysis,
  initialDraft = null,
  selectedCategory,
  onOpenGuide,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    updatePageSEO({
      title: 'Submit Public Facility Complaint',
      description: 'Lodge a civic complaint with photographic evidence and location details. AI automatically assesses urgency and routes to the correct authority.',
    });
  }, []);

  // Form states
  const [description, setDescription] = useState(initialDraft?.description || '');
  const [location, setLocation] = useState(initialDraft?.location || '');
  const [district, setDistrict] = useState(initialDraft?.district || 'Chennai');
  const [coords, setCoords] = useState<LocationCoords | undefined>(initialDraft?.coords || { lat: 13.0827, lng: 80.2707 });
  const [peopleAffected, setPeopleAffected] = useState<number>(initialDraft?.peopleAffected || 50);
  const [additionalNotes, setAdditionalNotes] = useState(initialDraft?.additionalNotes || '');
  
  // Image Upload states
  const [imageUrl, setImageUrl] = useState<string | null>(initialDraft?.imageUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Geolocation state
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ description?: string; location?: string; image?: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  // Character counter
  const descLength = description.length;
  const maxDescLength = 500;

  // File validation & preview handler
  const handleFileProcess = (file: File) => {
    setUploadError('');

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image (JPEG, PNG, or WebP format).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
    };
    reader.onerror = () => {
      setUploadError('Failed reading image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Browser Geolocation
  const handleGetLocation = () => {
    setLocating(true);
    setGeoError('');

    if (!('geolocation' in navigator)) {
      setLocating(false);
      setGeoError('Geolocation is not supported by your browser. Please type your location manually.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng, mapX: 50, mapY: 50 });
        setLocation(`${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E (GPS auto-detected)`);
      },
      () => {
        setLocating(false);
        setCoords({ lat: 13.0520, lng: 80.2510, mapX: 68, mapY: 34 });
        setLocation('Anna Salai near Gemini Flyover, Chennai (GPS Simulated)');
      },
      { timeout: 5000 }
    );
  };

  // Preset Scenario loader
  const handleLoadScenario = (scenario: typeof PRESET_TEST_SCENARIOS[0]) => {
    setDescription(scenario.description);
    setLocation(scenario.location);
    if (scenario.district) setDistrict(scenario.district);
    setImageUrl(scenario.imageUrl);
    setPeopleAffected(scenario.name.includes('Water') ? 1200 : scenario.name.includes('Landfill') ? 2000 : scenario.name.includes('Canal') ? 850 : 150);
    setErrors({});
  };

  // Select reference from guide
  const handleSelectReferencePhoto = (refItem: any) => {
    setImageUrl(refItem.imageUrl);
    setDescription(refItem.sampleText);
    setLocation(refItem.location);
    if (refItem.district) setDistrict(refItem.district);
    setGuideModalOpen(false);
  };

  // Form submission validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { description?: string; location?: string } = {};

    if (!description.trim()) {
      newErrors.description = 'Please describe the public facility issue.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters so AI can analyze it properly.';
    }

    if (!location.trim()) {
      newErrors.location = 'Please provide a street address, ward, or landmark.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setErrors({});

    const payload: ComplaintInput = {
      description: description.trim(),
      imageUrl,
      location: location.trim(),
      district,
      coords,
      peopleAffected,
      additionalNotes: additionalNotes.trim() || undefined,
    };

    onStartAnalysis(payload);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center sm:text-left space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>{t('badge_smart_city', 'AI Intake & Classification Portal')}</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
          {t('form_header_title', 'Report a Public Facility Grievance')}
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
          {t('form_header_desc', 'Provide details of the civic problem. Our multimodal AI will classify the category, evaluate safety priority, and route the complaint to the designated municipal department.')}
        </p>
      </div>

      {/* Category Pre-selection Banner */}
      {selectedCategory && (
        <div className="rounded-xl bg-teal-50 border border-teal-200 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-teal-900">
              {t(`card_${selectedCategory}`, selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1))}
            </p>
            <p className="text-xs text-teal-700">Category pre-selected. Describe the specific problem below.</p>
          </div>
        </div>
      )}

      {/* Preset Quick Fill Bar with Real Images */}
      <div className="rounded-2xl bg-white border border-[#E8E0D8] p-4 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#2D2D2D] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Quick Test Scenarios (One-Click Pre-fill):
          </span>
          <button
            type="button"
            onClick={() => setGuideModalOpen(true)}
            className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1 font-semibold"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t('nav_photo_guide', 'Photo Reference Guide')}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {PRESET_TEST_SCENARIOS.map((sc) => (
            <button
              key={sc.name}
              type="button"
              onClick={() => handleLoadScenario(sc)}
              className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-teal-50 text-[#2D2D2D] hover:text-teal-800 text-xs font-medium border border-[#E8E0D8] hover:border-teal-300 transition-colors flex items-center gap-2"
            >
              {sc.imageUrl && (
                <img
                  src={sc.imageUrl}
                  alt=""
                  className="w-4 h-4 rounded object-cover border border-slate-300"
                />
              )}
              <span>{sc.name.split(':')[1] || sc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Complaint Submission Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        
        {/* Field 1: Complaint Description */}
        <Card>
          <CardHeader>
            <CardTitle>{t('form_sec_desc_title', '1. Incident Description')}</CardTitle>
            <CardDescription>
              {t('form_sec_desc_sub', 'Explain the civic problem clearly. Mention depth, size, hazard conditions, or vehicle disruption.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="complaint-description"
              label={t('form_desc_label', 'Describe the issue')}
              required
              rows={4}
              maxLength={maxDescLength}
              currentLength={descLength}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              placeholder={t('form_desc_placeholder', 'e.g. Deep 3-foot pothole on outer arterial lane causing severe traffic slowdowns...')}
              error={errors.description}
              helperText={t('form_desc_help', 'Minimum 10 characters. Clear keywords help the AI classifier assess urgency accurately.')}
            />
          </CardContent>
        </Card>

        {/* Field 2: Evidence Image Upload */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('form_sec_photo_title', '2. Photographic Evidence')}</CardTitle>
              <CardDescription>
                {t('form_sec_photo_sub', 'Upload a clear photo of the site to increase classification confidence and priority accuracy.')}
              </CardDescription>
            </div>
            <button
              type="button"
              onClick={() => setGuideModalOpen(true)}
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="sr-only"
              id="evidence-file-input"
            />

            {!imageUrl ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    fileInputRef.current?.click();
                  }
                }}
                aria-label="Upload evidence photo by clicking or dragging and dropping"
                className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-teal-500 bg-teal-50/50 scale-[1.01]'
                    : 'border-[#E8E0D8] bg-[#FAF8F5] hover:border-teal-400 hover:bg-teal-50/20'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8E0D8] flex items-center justify-center text-teal-600 shadow-xs">
                  <UploadCloud className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2D2D2D]">
                    {t('form_photo_drop', 'Click to upload or drag and drop photo')}
                  </p>
                  <p className="text-xs text-[#525252] mt-1">
                    {t('form_photo_hint', 'Supports JPEG, PNG, or WebP (Max file size 10MB)')}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  leftIcon={<Camera className="w-4 h-4 text-teal-600" />}
                >
                  {t('form_photo_choose', 'Choose From Device')}
                </Button>
              </div>
            ) : (
              /* Uploaded Preview State */
              <div className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-emerald-700 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{t('form_photo_success', 'Evidence Attached Successfully')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-teal-600 hover:text-teal-700 font-semibold px-2 py-1 rounded hover:bg-white transition-colors"
                    >
                      {t('form_photo_replace', 'Replace Photo')}
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      aria-label="Remove uploaded image"
                      className="p-1 rounded text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden max-h-72 border border-slate-200 bg-white flex items-center justify-center p-2">
                  <img
                    src={imageUrl}
                    alt="Uploaded complaint preview"
                    className="max-h-64 w-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            )}

            {uploadError && (
              <Alert variant="danger" title="Upload Error" onClose={() => setUploadError('')}>
                {uploadError}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Field 3: Location & Jurisdiction */}
        <Card>
          <CardHeader>
            <CardTitle>{t('form_sec_location_title', '3. Location & Jurisdiction')}</CardTitle>
            <CardDescription>
              {t('form_sec_location_sub', 'Specify the street landmark, ward, and district so the complaint routes to the right municipal division.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Select
                  id="complaint-district"
                  label={t('form_district_label', 'Municipal District')}
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {TN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Input
                  id="complaint-location"
                  label={t('form_location_label', 'Location / Landmark / Street Name')}
                  required
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                  }}
                  placeholder={t('form_location_placeholder', 'e.g. Anna Salai near Thousand Lights Mosque, Ward 112')}
                  error={errors.location}
                  helperText={t('form_location_help', 'Include nearby landmarks, cross streets, or pole numbers if available.')}
                  rightIcon={
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={locating}
                      title="Auto-detect current GPS location"
                      className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-50 transition-colors"
                      aria-label="Use GPS to detect location"
                    >
                      <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
                    </button>
                  }
                />
              </div>
            </div>

            {geoError && (
              <p className="text-xs text-amber-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{geoError}</span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Field 4: Population Impact & Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>{t('form_sec_impact_title', '4. Estimated Population Impact')}</CardTitle>
            <CardDescription>
              {t('form_sec_impact_sub', 'Approximate how many citizens or commuters are affected daily. This directly informs the AI Priority Engine.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="people-affected-range" className="text-xs font-semibold text-[#2D2D2D]">
                  {t('form_impact_label', 'Estimated Citizens Impacted:')}
                </label>
                <span className="font-mono text-sm font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {peopleAffected >= 1000 ? '1,000+ Citizens' : `~${peopleAffected} Citizens`}
                </span>
              </div>

              <input
                id="people-affected-range"
                type="range"
                min="5"
                max="1000"
                step="25"
                value={peopleAffected}
                onChange={(e) => setPeopleAffected(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>&lt;10 (Isolated)</span>
                <span>50 (Street)</span>
                <span>200 (Neighborhood)</span>
                <span>500 (Avenue)</span>
                <span>1,000+ (Expressway/Arterial)</span>
              </div>
            </div>

            <div className="pt-2">
              <Input
                id="additional-notes"
                label={t('form_notes_label', 'Optional Additional Context / Hazard Notes')}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder={t('form_notes_placeholder', 'e.g. Near school crosswalk, heavy night bus traffic, active sparking')}
                helperText={t('form_notes_help', 'Any details on vulnerable populations or compounding hazards.')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submission Action CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-900 block mb-0.5">
              Ready for AI Assessment
            </span>
            <span>Multimodal analysis takes approx 2–3 seconds to categorize &amp; assign priority.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            {t('form_submit_btn', 'Submit for AI Analysis')}
          </Button>
        </div>

      </form>

      {/* Reference Photo Guide Modal */}
      <ReferencePhotoGuide
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        onSelectReference={handleSelectReferencePhoto}
      />

    </div>
  );
};
