import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Clock,
  Activity,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Compass,
  BookOpen,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Button, Badge, Card } from '../common';
import { SYMPTOM_CATEGORIES } from '../../data/symptomData';

const SymptomResults = ({
  formData,
  onReset,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border shadow-soft">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-secondary flex items-center justify-center flex-shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Assessment Results Specification
              </span>
              <Badge variant="primary" size="sm">{formData.symptoms.length} Symptoms Reported</Badge>
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              AI Symptom Analysis Summary
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" dot>AI Integration Pending</Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={onReset}
          >
            New Intake
          </Button>
        </div>
      </div>

      {/* Grid: Assessment Summary + AI Prediction Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Assessment Summary, Selected Symptoms, Duration & Severity */}
        <div className="lg:col-span-5 space-y-5">
          {/* Section 1: Assessment Summary */}
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
              <Clock size={15} className="text-primary" /> Assessment Summary
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/60">
                <span className="text-text-secondary">Primary Concern:</span>
                <span className="font-semibold text-text-primary text-right max-w-[180px] truncate">
                  {formData.primaryConcern}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/60">
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
              <div className="flex justify-between py-1.5 border-b border-border/60">
                <span className="text-text-secondary">Symptom Duration:</span>
                <span className="font-semibold text-text-primary">
                  {formData.symptomDuration}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/60">
                <span className="text-text-secondary">Symptom Onset:</span>
                <span className="font-semibold text-text-primary">
                  {formData.symptomOnset}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-text-secondary">Demographics:</span>
                <span className="font-medium text-text-primary">
                  {formData.ageRange || 'Age unspecified'} &middot; {formData.biologicalSex || 'Sex unspecified'}
                </span>
              </div>
            </div>
          </Card>

          {/* Section 2: Selected Symptoms Grouped */}
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
              <Layers size={15} className="text-secondary" /> Selected Symptoms ({formData.symptoms.length})
            </h4>

            <div className="space-y-3">
              {groupedSelectedSymptoms.map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.category} className="p-3 rounded-xl bg-background border border-border">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary mb-1.5">
                      <Icon size={13} className="text-primary" />
                      <span>{group.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {group.symptoms.map((s) => (
                        <span
                          key={s.id}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-surface border border-border text-text-primary font-medium"
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Possible Health Conditions & Model Confidence (Pending Empty State) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Section 3 & 4: Possible Health Conditions & Model Confidence */}
          <Card padding="md">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Differential Screening Model Status
                </h4>
              </div>
              <Badge variant="warning">Integration Pending</Badge>
            </div>

            {/* Empty State requirement per Section 6 */}
            <div className="p-5 rounded-2xl bg-background border border-border text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center mx-auto">
                <Sparkles size={22} />
              </div>
              <div>
                <h5 className="text-base font-bold text-text-primary">
                  AI symptom assessment model integration pending.
                </h5>
                <p className="text-xs text-text-secondary max-w-md mx-auto mt-1 leading-relaxed">
                  The clinical inference engine has not been connected in this prototype phase.
                  No condition rankings, probabilities, or treatment pathways are generated.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                <div className="p-3 rounded-xl bg-surface border border-border text-xs">
                  <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider block mb-1">
                    Possible Health Conditions
                  </span>
                  <span className="text-xs text-text-secondary italic">
                    AI symptom assessment model integration pending.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border text-xs">
                  <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider block mb-1">
                    Model Confidence
                  </span>
                  <span className="text-xs text-text-secondary italic">
                    — % (Integration Pending)
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 5: Important Observations (Red-Flag Educational Guidance) */}
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
              <Info size={15} className="text-secondary" /> Important Clinical Observations
            </h4>
            <div className="p-3.5 rounded-xl bg-background border border-border text-xs text-text-secondary space-y-2">
              <p className="leading-relaxed text-text-primary">
                Symptom profiles that involve multi-system interactions (e.g. respiratory and systemic fever)
                require holistic clinical evaluation rather than single-disease matching.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 bg-surface rounded-lg border border-border">
                  &bull; Symptom clustering: {groupedSelectedSymptoms.length} distinct systems
                </div>
                <div className="p-2 bg-surface rounded-lg border border-border">
                  &bull; Chronological onset: {formData.symptomDuration}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Section 6: Biological Explanation & Suggested Medical Evaluation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biological Explanation */}
        <Card padding="md">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary">
              <BookOpen size={18} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">
              Educational Biological Explanation
            </h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            Symptoms reflect localized physiological responses or immune defense activations.
            For instance, fever and systemic fatigue arise from circulating inflammatory cytokines (such as IL-1, IL-6, and TNF-alpha)
            signaling hypothalamic temperature resetting and metabolic reallocation during infectious or inflammatory episodes.
          </p>
          <div className="p-3 rounded-xl bg-primary-50/50 border border-primary-100/60 text-xs text-primary leading-snug">
            <strong>Educational Context:</strong> Symptom checkers synthesize these correlated cytokine and neuro-endocrine cascades to guide educational dialogue rather than replace differential diagnostics.
          </div>
        </Card>

        {/* Suggested Medical Evaluation */}
        <Card padding="md">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-secondary">
              <Compass size={18} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">
              Suggested Medical Evaluation
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-text-secondary">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                <strong>Schedule a Clinical Consultation:</strong> Share this chronological symptom intake summary with your primary care provider.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                <strong>Document Pattern Changes:</strong> Note if symptoms worsen after meals, exertion, or specific times of day.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                <strong>Maintain Medication Records:</strong> Keep a clear list of all over-the-counter and prescription medications taken.
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Section 7: Separate Emergency Notice (Required by Prompt) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-3.5">
        <ShieldAlert size={22} className="text-danger mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <h5 className="font-bold text-red-950 uppercase tracking-wider text-xs">
            Emergency Notice
          </h5>
          <p className="leading-relaxed text-red-900">
            "If you are experiencing severe breathing difficulty, severe chest pain, sudden confusion, loss of consciousness, or another potentially life-threatening emergency, seek immediate medical attention instead of relying on this platform."
          </p>
          <p className="text-[11px] text-red-800/80 pt-0.5">
            Note: This notice does not represent an exhaustive or complete list of acute emergency symptoms.
          </p>
        </div>
      </div>

      {/* Section 7: Visible Medical Disclaimer (Required by Prompt) */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldCheck size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-0.5">
          <p className="font-bold text-amber-950">Medical Research Prototype Notice</p>
          <p className="text-amber-800 leading-relaxed">
            "This platform is an educational research prototype and does not provide medical diagnoses or replace qualified healthcare professionals."
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          icon={RotateCcw}
          onClick={onReset}
        >
          Perform Another Assessment
        </Button>

        <div className="flex items-center gap-3">
          <Link to="/image-analysis">
            <Button variant="ghost" size="md">
              Medical Image Analysis
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="primary" size="md">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SymptomResults;
