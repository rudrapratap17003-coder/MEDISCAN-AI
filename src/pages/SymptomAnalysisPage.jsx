import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  Clock,
  Sparkles,
  User,
  HeartPulse,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { Button, Badge, Card, PageHeader, Input } from '../components/common';
import { useActivity } from '../context/ActivityContext';
import { ACTIVITY_CATEGORIES, ACTIVITY_STATUS } from '../data/activityTypes';
import SymptomCategorySelector from '../components/symptom-analysis/SymptomCategorySelector';
import SymptomAssessmentReview from '../components/symptom-analysis/SymptomAssessmentReview';
import SymptomProcessing from '../components/symptom-analysis/SymptomProcessing';
import SymptomResults from '../components/symptom-analysis/SymptomResults';
import {
  AGE_RANGES,
  BIOLOGICAL_SEX_OPTIONS,
  ONSET_OPTIONS,
  DURATION_OPTIONS,
  SEVERITY_LEVELS,
  FREQUENCY_OPTIONS,
  COMMON_HISTORY_TAGS,
} from '../data/symptomData';

const initialFormData = {
  ageRange: '',
  biologicalSex: '',
  primaryConcern: '',
  symptomOnset: 'recent',
  symptomDuration: '1 to 3 days',
  symptoms: [],
  severity: 'Mild',
  frequency: 'Constant / Continuous',
  additionalNotes: '',
  medicalHistory: [],
};

const SymptomAnalysisPage = () => {
  const { addActivity } = useActivity();
  // Workflow step: 'form' | 'review' | 'processing' | 'results'
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Form field handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleToggleSymptom = (symptomId) => {
    setFormData((prev) => {
      const exists = prev.symptoms.includes(symptomId);
      const newSymptoms = exists
        ? prev.symptoms.filter((id) => id !== symptomId)
        : [...prev.symptoms, symptomId];
      return { ...prev, symptoms: newSymptoms };
    });
    if (errors.symptoms) {
      setErrors((prev) => ({ ...prev, symptoms: undefined }));
    }
  };

  const handleToggleHistory = (historyTag) => {
    setFormData((prev) => {
      const exists = prev.medicalHistory.includes(historyTag);
      const newHistory = exists
        ? prev.medicalHistory.filter((item) => item !== historyTag)
        : [...prev.medicalHistory, historyTag];
      return { ...prev, medicalHistory: newHistory };
    });
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.primaryConcern.trim()) {
      newErrors.primaryConcern = 'Please state your primary health concern.';
    }

    if (!formData.symptoms || formData.symptoms.length === 0) {
      newErrors.symptoms = 'Please select at least one active symptom from the categories below.';
    }

    if (!formData.severity) {
      newErrors.severity = 'Please select a severity rating.';
    }

    if (!formData.symptomOnset) {
      newErrors.symptomOnset = 'Please indicate when your symptoms began.';
    }

    if (!formData.symptomDuration) {
      newErrors.symptomDuration = 'Please select how long symptoms have persisted.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToReview = (e) => {
    e.preventDefault();
    if (validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStep('review');
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setStep('form');
  };

  const handleSubmitAssessment = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep('processing');
  };

  const handleProceedToResults = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep('results');
    try {
      addActivity({
        category: ACTIVITY_CATEGORIES.SYMPTOM_ASSESSMENT,
        title: `Symptom Intake: ${formData.primaryConcern || 'General Health Concern'}`,
        status: ACTIVITY_STATUS.SYMPTOM_VALIDATED,
        moduleId: 'symptom-analysis',
        data: {
          primaryConcern: formData.primaryConcern || 'General symptoms',
          severity: formData.severity,
          frequency: formData.frequency,
          onset: formData.symptomOnset,
          duration: formData.symptomDuration,
          symptomsCount: formData.symptoms?.length || 0,
        },
      });
    } catch (e) {
      console.warn('Failed to record symptom intake activity:', e);
    }
  };

  const handleResetToNew = () => {
    handleClearForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-14"
    >
      {/* Page Header */}
      <PageHeader
        title="AI-Assisted Symptom Analysis"
        description="Describe your symptoms to explore possible health concerns through an educational AI-assisted screening workflow."
        icon={Stethoscope}
        breadcrumb={
          <div className="flex items-center gap-1.5 text-xs">
            <Link to="/dashboard" className="hover:text-primary transition-colors">
              MediScan
            </Link>
            <ChevronRight size={12} className="text-text-secondary/50" />
            <span className="text-text-primary font-semibold">Symptom Analysis</span>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot>Clinical Intake Module</Badge>
          </div>
        }
      />

      {/* Emergency Notice — Prominently Displayed at Top */}
      <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-3.5 shadow-soft">
        <ShieldAlert size={22} className="text-danger mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <h5 className="font-bold text-red-950 uppercase tracking-wider text-xs">
            Emergency Notice
          </h5>
          <p className="leading-relaxed text-red-900">
            "If you are experiencing severe breathing difficulty, severe chest pain, sudden confusion, loss of consciousness, or another potentially life-threatening emergency, seek immediate medical attention instead of relying on this platform."
          </p>
          <p className="text-[11px] text-red-800/80">
            Note: This notice does not represent a complete or exhaustive list of emergency medical conditions.
          </p>
        </div>
      </div>

      {/* Workflow Views */}
      <AnimatePresence mode="wait">
        {/* Step 1: Intake Form */}
        {step === 'form' && (
          <motion.form
            key="step-form"
            onSubmit={handleProceedToReview}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Introductory Explanation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50/60 border border-border shadow-soft flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-text-primary">
                  Structured Educational Symptom Intake
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Provide details about your primary symptoms and their timeline.
                  This interface structures your information into physiological body systems to prepare for clinical discussion and future AI screening evaluation.
                </p>
              </div>
            </div>

            {/* Section A: Basic Assessment Information */}
            <Card padding="md">
              <div className="border-b border-border/70 pb-3 mb-5">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <User size={16} className="text-primary" /> A. Basic Assessment Information
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  General background to contextualize physiological baseline. Personally identifiable details are excluded.
                </p>
              </div>

              <div className="space-y-5">
                {/* Primary Health Concern */}
                <div>
                  <Input
                    label="Primary Health Concern *"
                    placeholder="e.g., Persistent dry cough with high fever and sudden fatigue"
                    value={formData.primaryConcern}
                    onChange={(e) => handleInputChange('primaryConcern', e.target.value)}
                    error={errors.primaryConcern}
                    hint="Describe the main issue causing discomfort in your own words"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Age Range */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">
                      Age Range <span className="text-text-secondary text-xs font-normal">(Optional)</span>
                    </label>
                    <select
                      value={formData.ageRange}
                      onChange={(e) => handleInputChange('ageRange', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Select age range...</option>
                      {AGE_RANGES.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Biological Sex */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">
                      Biological Sex <span className="text-text-secondary text-xs font-normal">(Optional)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BIOLOGICAL_SEX_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleInputChange('biologicalSex', option)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                            formData.biologicalSex === option
                              ? 'bg-primary-50 border-primary text-primary font-semibold shadow-soft'
                              : 'bg-surface border-border text-text-secondary hover:border-slate-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Symptom Onset & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">
                      Symptom Onset *
                    </label>
                    <select
                      value={formData.symptomOnset}
                      onChange={(e) => handleInputChange('symptomOnset', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      {ONSET_OPTIONS.map((onset) => (
                        <option key={onset.value} value={onset.value}>
                          {onset.label}
                        </option>
                      ))}
                    </select>
                    {errors.symptomOnset && (
                      <p className="text-xs text-danger mt-1">{errors.symptomOnset}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">
                      Total Duration *
                    </label>
                    <select
                      value={formData.symptomDuration}
                      onChange={(e) => handleInputChange('symptomDuration', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      {DURATION_OPTIONS.map((dur) => (
                        <option key={dur} value={dur}>
                          {dur}
                        </option>
                      ))}
                    </select>
                    {errors.symptomDuration && (
                      <p className="text-xs text-danger mt-1">{errors.symptomDuration}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Section B: Symptom Selection */}
            <Card padding="md">
              <div className="border-b border-border/70 pb-3 mb-5">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <HeartPulse size={16} className="text-primary" /> B. Symptom Selection *
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Select all active symptoms from the categorized body systems.
                </p>
              </div>

              <SymptomCategorySelector
                selectedSymptoms={formData.symptoms}
                onToggleSymptom={handleToggleSymptom}
                error={errors.symptoms}
              />
            </Card>

            {/* Section C: Symptom Details */}
            <Card padding="md">
              <div className="border-b border-border/70 pb-3 mb-5">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> C. Symptom Details & Context
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Rate intensity, frequency, and provide additional background.
                </p>
              </div>

              <div className="space-y-6">
                {/* Severity Selector */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Severity Level *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SEVERITY_LEVELS.map((sev) => {
                      const isSelected = formData.severity === sev.level;
                      return (
                        <button
                          key={sev.level}
                          type="button"
                          onClick={() => handleInputChange('severity', sev.level)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            isSelected ? sev.selectedColor : sev.color
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold">{sev.label}</span>
                            {isSelected && <Badge variant="primary" size="sm">Selected</Badge>}
                          </div>
                          <p className={`text-[11px] leading-snug ${isSelected ? 'text-white/90' : 'text-text-secondary'}`}>
                            {sev.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.severity && (
                    <p className="text-xs text-danger mt-1">{errors.severity}</p>
                  )}
                </div>

                {/* Frequency Selector */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Symptom Frequency Pattern
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {FREQUENCY_OPTIONS.map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => handleInputChange('frequency', freq)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                          formData.frequency === freq
                            ? 'bg-primary text-white border-primary shadow-soft'
                            : 'bg-surface border-border text-text-secondary hover:border-slate-300'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Description */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Additional Symptom Description <span className="text-text-secondary text-xs font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any triggers, alleviating factors, localized radiating pain, or associated sensations..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Relevant Medical History */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Relevant Medical Background <span className="text-text-secondary text-xs font-normal">(Optional)</span>
                  </label>
                  <p className="text-xs text-text-secondary mb-2.5">
                    Select any pre-existing health conditions that may help contextualize your symptoms:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_HISTORY_TAGS.map((tag) => {
                      const isSelected = formData.medicalHistory.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleToggleHistory(tag)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-secondary text-white border-secondary shadow-soft'
                              : 'bg-surface border-border text-text-secondary hover:border-secondary/40'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Validation Notice & Proceed to Review */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border shadow-soft">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <AlertCircle size={16} className="text-primary flex-shrink-0" />
                <span>
                  All information is validated in the next step. You can review and revise before final submission.
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={handleClearForm}
                  className="w-full sm:w-auto text-text-secondary hover:text-text-primary"
                >
                  Clear Form
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Review Assessment
                </Button>
              </div>
            </div>
          </motion.form>
        )}

        {/* Step 2: Assessment Review */}
        {step === 'review' && (
          <SymptomAssessmentReview
            formData={formData}
            onEdit={() => setStep('form')}
            onClear={handleClearForm}
            onSubmit={handleSubmitAssessment}
          />
        )}

        {/* Step 3: Analysis Processing */}
        {step === 'processing' && (
          <SymptomProcessing
            formData={formData}
            onProceedToResults={handleProceedToResults}
            onReset={handleResetToNew}
          />
        )}

        {/* Step 4: Results Interface */}
        {step === 'results' && (
          <SymptomResults
            formData={formData}
            onReset={handleResetToNew}
          />
        )}
      </AnimatePresence>

      {/* Global Medical Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldCheck size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-0.5">
          <p className="font-semibold text-amber-800">
            Medical Disclaimer & Research Boundaries
          </p>
          <p className="text-amber-700 leading-relaxed">
            "This platform is an educational research prototype and does not provide medical diagnoses or replace qualified healthcare professionals."
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SymptomAnalysisPage;
