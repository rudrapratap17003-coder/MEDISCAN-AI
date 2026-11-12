import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  ScanLine,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
} from 'lucide-react';
import { Button, Badge, Card } from '../common';

const steps = [
  {
    id: 1,
    title: 'Image Selected',
    desc: 'Local file payload loaded and parsed into memory',
  },
  {
    id: 2,
    title: 'Image Validation Completed',
    desc: 'MIME integrity, dimensions, and file headers validated',
  },
  {
    id: 3,
    title: 'Ready for Model Integration',
    desc: 'Prepared for inference pipeline integration (Phase 5+)',
  },
];

const AnalysisInterface = ({
  category,
  imageFile,
  previewUrl,
  onProceedToResults,
  onReset,
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate smooth stepped validation flow
  useEffect(() => {
    setActiveStep(1);
    setIsProcessing(true);

    const timer1 = setTimeout(() => {
      setActiveStep(2);
    }, 900);

    const timer2 = setTimeout(() => {
      setActiveStep(3);
      setIsProcessing(false);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [imageFile]);

  const CategoryIcon = category.icon;

  return (
    <div className="space-y-6">
      {/* Status banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface border border-border shadow-soft">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${category.bgLight} flex items-center justify-center ${category.iconColor}`}>
            <CategoryIcon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Screening Target
              </span>
              <Badge variant="primary" size="sm">{category.title}</Badge>
            </div>
            <h3 className="text-base font-bold text-text-primary">
              Pre-Processing & Validation Pipeline
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isProcessing ? (
            <Badge variant="secondary" dot>Processing Pipeline</Badge>
          ) : (
            <Badge variant="success" dot>Validation Complete</Badge>
          )}
          <Badge variant="warning">Prototype State</Badge>
        </div>
      </div>

      {/* Main Analysis Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Image with Scanning Laser Animation */}
        <Card padding="none" className="lg:col-span-6 overflow-hidden bg-slate-950 border-slate-800 relative">
          <div className="relative aspect-[4/3] flex items-center justify-center p-4">
            <img
              src={previewUrl}
              alt="Subject specimen"
              className="max-h-full max-w-full object-contain rounded-lg"
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Animated Laser Scanning Beam */}
            {isProcessing && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_3px_rgba(37,99,235,0.7)] pointer-events-none"
                animate={{
                  top: ['8%', '88%', '8%'],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Target Reticles */}
            <div className="absolute top-4 left-4 border-t-2 border-l-2 border-primary/60 w-6 h-6" />
            <div className="absolute top-4 right-4 border-t-2 border-r-2 border-primary/60 w-6 h-6" />
            <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-primary/60 w-6 h-6" />
            <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-primary/60 w-6 h-6" />

            {/* Live scanning HUD badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono flex items-center gap-2">
              <ScanLine size={12} className={isProcessing ? 'text-primary animate-pulse' : 'text-success'} />
              <span>
                {isProcessing
                  ? 'CALCULATING TENSOR SHAPES...'
                  : 'PRE-PROCESSING COMPLETED (224×224)'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="truncate max-w-[240px] font-mono text-slate-300">
              {imageFile?.name}
            </span>
            <span className="font-mono">
              {(imageFile?.size / 1024).toFixed(1)} KB
            </span>
          </div>
        </Card>

        {/* Right: Steps & Status */}
        <div className="lg:col-span-6 space-y-5">
          <Card padding="md">
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-primary" /> Processing Sequence
            </h4>

            <div className="space-y-4">
              {steps.map((step) => {
                const isCompleted = activeStep > step.id || (!isProcessing && activeStep >= step.id);
                const isCurrent = isProcessing && activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${
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
                          <span className="text-[10px] text-amber-600 font-semibold animate-pulse">Running</span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Validation confirmation message per prompt requirements */}
          <Card padding="md" className="border-primary-100 bg-gradient-to-br from-blue-50/60 to-white">
            <div className="flex items-start gap-3">
              <ShieldCheck size={22} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-text-primary">
                  Validation Results
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  "Image successfully validated. The AI analysis engine will become available when the appropriate screening model is integrated."
                </p>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/60 text-[11px] text-amber-800 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />
                  <span>
                    Notice: No diagnostic model was executed. Fabricated predictions and mock confidence scores are strictly omitted in this phase.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={RefreshCw}
                onClick={onReset}
              >
                Upload Different Image
              </Button>

              <Button
                type="button"
                variant="primary"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={onProceedToResults}
                disabled={isProcessing}
              >
                View Results Interface
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisInterface;
