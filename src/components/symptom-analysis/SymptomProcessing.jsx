import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Activity,
  FileCheck2,
} from 'lucide-react';
import { Button, Badge, Card } from '../common';

const steps = [
  {
    id: 1,
    title: 'Symptoms Received',
    desc: 'Structured symptom vector parsed and categorized by anatomical system',
  },
  {
    id: 2,
    title: 'Assessment Information Validated',
    desc: 'Demographic range, onset chronology, and severity scores validated',
  },
  {
    id: 3,
    title: 'Ready for AI Model Integration',
    desc: 'Input payload formatted for upcoming disease inference pipeline',
  },
];

const SymptomProcessing = ({
  formData,
  onProceedToResults,
  onReset,
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    setActiveStep(1);
    setIsProcessing(true);

    const timer1 = setTimeout(() => {
      setActiveStep(2);
    }, 800);

    const timer2 = setTimeout(() => {
      setActiveStep(3);
      setIsProcessing(false);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface border border-border shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center flex-shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Assessment Ingestion
              </span>
              <Badge variant="primary" size="sm">{formData.symptoms.length} Symptoms</Badge>
            </div>
            <h3 className="text-base font-bold text-text-primary">
              Pre-Inference Processing & Validation Gateway
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isProcessing ? (
            <Badge variant="secondary" dot>Validating Payload</Badge>
          ) : (
            <Badge variant="success" dot>Validation Complete</Badge>
          )}
          <Badge variant="warning">Prototype State — AI Integration Pending</Badge>
        </div>
      </div>

      {/* Main Stepped Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Progress Sequence */}
        <div className="md:col-span-7 space-y-4">
          <Card padding="md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-primary" /> Validation Sequence
            </h4>

            <div className="space-y-3.5">
              {steps.map((step) => {
                const isCompleted = activeStep > step.id || (!isProcessing && activeStep >= step.id);
                const isCurrent = isProcessing && activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-primary-50/40 border-primary/20 text-text-primary'
                        : isCurrent
                        ? 'bg-amber-50/50 border-amber-300 shadow-soft'
                        : 'bg-background border-border text-text-secondary/50'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 size={18} className="text-success" />
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                        />
                      ) : (
                        <Clock size={18} className="text-text-secondary/30" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Step {step.id}: {step.title}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] text-success font-semibold">Done</span>
                        )}
                        {isCurrent && (
                          <span className="text-[10px] text-amber-600 font-semibold animate-pulse">Processing</span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Required Validation Confirmation Notice */}
        <div className="md:col-span-5 space-y-4">
          <Card padding="md" className="border-primary-100 bg-gradient-to-br from-blue-50/60 to-white">
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheck size={22} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  System Status Confirmation
                </h4>
                <p className="text-[11px] text-text-secondary">
                  Phase 5 Frontend Pipeline Execution
                </p>
              </div>
            </div>

            {/* Exact Required Sentence */}
            <div className="p-3.5 rounded-xl bg-white border border-primary/20 shadow-soft mb-3">
              <p className="text-xs text-text-primary leading-relaxed font-medium">
                "Your symptom information has been successfully collected and validated. AI-assisted assessment will become available when the appropriate medical model is integrated."
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                No automated disease predictions, synthetic percentages, or diagnostic recommendations are produced in this phase.
              </span>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex flex-col gap-2.5">
              <Button
                type="button"
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                onClick={onProceedToResults}
                disabled={isProcessing}
                className="w-full"
              >
                Proceed to Results Template
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={RotateCcw}
                onClick={onReset}
                className="w-full text-text-secondary hover:text-text-primary"
              >
                Start New Assessment
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SymptomProcessing;
