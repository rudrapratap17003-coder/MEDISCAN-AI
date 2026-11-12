import { motion } from 'framer-motion';
import {
  FileText,
  User,
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  FileCheck,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { Button, Badge, Card } from '../common';
import { SYMPTOM_CATEGORIES, ONSET_OPTIONS } from '../../data/symptomData';

const SymptomAssessmentReview = ({
  formData,
  onEdit,
  onClear,
  onSubmit,
}) => {
  // Find selected symptom objects grouped by category
  const groupedSelectedSymptoms = SYMPTOM_CATEGORIES.map((cat) => {
    const matching = cat.symptoms.filter((s) => formData.symptoms.includes(s.id));
    return {
      category: cat.name,
      icon: cat.icon,
      symptoms: matching,
    };
  }).filter((group) => group.symptoms.length > 0);

  const onsetObj = ONSET_OPTIONS.find((o) => o.value === formData.symptomOnset);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Review Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50 border border-border shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-soft">
            <FileCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Step 2 of 3
              </span>
              <Badge variant="primary" size="sm">Pre-Submission Review</Badge>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              Verify Assessment Information
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={onEdit}
          >
            Edit Details
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={onClear}
            className="text-text-secondary hover:text-danger hover:bg-red-50"
          >
            Clear Form
          </Button>
        </div>
      </div>

      {/* Structured Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Basic Demographics & Temporal Context */}
        <div className="md:col-span-5 space-y-5">
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3.5 flex items-center gap-2">
              <User size={15} className="text-primary" /> Profile & Baseline
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-border/60">
                <span className="text-text-secondary">Age Range:</span>
                <span className="font-semibold text-text-primary">
                  {formData.ageRange || 'Not specified'}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-border/60">
                <span className="text-text-secondary">Biological Sex:</span>
                <span className="font-semibold text-text-primary">
                  {formData.biologicalSex || 'Prefer not to say'}
                </span>
              </div>

              <div className="py-2">
                <span className="text-text-secondary block mb-1">Primary Health Concern:</span>
                <p className="p-2.5 rounded-xl bg-background border border-border text-text-primary font-medium leading-relaxed">
                  {formData.primaryConcern}
                </p>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3.5 flex items-center gap-2">
              <Clock size={15} className="text-secondary" /> Chronology & Severity
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-border/60">
                <span className="text-text-secondary">Symptom Onset:</span>
                <span className="font-semibold text-text-primary">
                  {onsetObj?.label || formData.symptomOnset}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-border/60">
                <span className="text-text-secondary">Total Duration:</span>
                <span className="font-semibold text-text-primary">
                  {formData.symptomDuration}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-border/60">
                <span className="text-text-secondary">Reported Severity:</span>
                <Badge
                  variant={
                    formData.severity === 'Severe'
                      ? 'danger'
                      : formData.severity === 'Moderate'
                      ? 'warning'
                      : 'success'
                  }
                  size="sm"
                >
                  {formData.severity}
                </Badge>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-text-secondary">Frequency Pattern:</span>
                <span className="font-semibold text-text-primary">
                  {formData.frequency || 'Constant'}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Selected Symptoms & Detailed Observations */}
        <div className="md:col-span-7 space-y-5">
          <Card padding="md">
            <div className="flex items-center justify-between mb-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                <Activity size={15} className="text-primary" /> Active Symptoms ({formData.symptoms.length})
              </h4>
              <Badge variant="primary" size="sm">
                {groupedSelectedSymptoms.length} Systems Involved
              </Badge>
            </div>

            <div className="space-y-3.5">
              {groupedSelectedSymptoms.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.category}
                    className="p-3 rounded-xl bg-background border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-text-primary">
                      <Icon size={14} className="text-primary" />
                      <span>{group.category} System</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {group.symptoms.map((s) => (
                        <span
                          key={s.id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface border border-border text-xs text-text-primary font-medium"
                        >
                          <CheckCircle2 size={12} className="text-success" />
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Context Notes & History */}
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
              <FileText size={15} className="text-secondary" /> Context & Relevant History
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-text-secondary block mb-1">Additional Observations:</span>
                <p className="p-2.5 rounded-xl bg-background border border-border text-text-secondary leading-relaxed">
                  {formData.additionalNotes || 'No additional narrative provided.'}
                </p>
              </div>

              <div>
                <span className="text-text-secondary block mb-1">Reported Medical Background:</span>
                {formData.medicalHistory && formData.medicalHistory.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {formData.medicalHistory.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-text-secondary/80 italic">None reported.</span>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
        <ShieldCheck size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="leading-relaxed">
          <strong>Review Notice:</strong> Submitting this assessment will validate your input schema against the AI screening pipeline. No automated medical diagnosis is rendered.
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          icon={ArrowLeft}
          onClick={onEdit}
          className="w-full sm:w-auto"
        >
          Back to Edit
        </Button>

        <Button
          type="button"
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          onClick={onSubmit}
          className="w-full sm:w-auto"
        >
          Submit Assessment
        </Button>
      </div>
    </motion.div>
  );
};

export default SymptomAssessmentReview;
