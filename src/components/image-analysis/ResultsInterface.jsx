import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileImage,
  Layers,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  FileCheck2,
  Stethoscope,
  Microscope,
  Compass,
} from 'lucide-react';
import { Button, Badge, Card } from '../common';

const ResultsInterface = ({
  category,
  imageFile,
  previewUrl,
  onReset,
}) => {
  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border shadow-soft">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-xl ${category.bgLight} flex items-center justify-center ${category.iconColor}`}>
            <CategoryIcon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Analysis Workspace
              </span>
              <Badge variant="primary" size="sm">{category.title}</Badge>
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              Screening Results Specification
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" dot>AI Model Integration Pending</Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={onReset}
          >
            New Screening
          </Button>
        </div>
      </div>

      {/* Main Grid: Specimen + Classification Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Section 1: Uploaded Medical Image */}
        <Card padding="none" className="lg:col-span-5 overflow-hidden bg-slate-950 border-slate-800">
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <FileImage size={14} className="text-primary" /> Uploaded Medical Specimen
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
              LOCAL FILE
            </span>
          </div>

          <div className="p-4 flex items-center justify-center aspect-[4/3] bg-slate-950 relative">
            <img
              src={previewUrl}
              alt="Uploaded specimen"
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>

          <div className="p-4 bg-slate-900/80 border-t border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Filename:</span>
              <span className="font-mono text-slate-200 truncate max-w-[200px]">
                {imageFile?.name || 'specimen.jpg'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>File Size:</span>
              <span className="font-mono text-slate-200">
                {(imageFile?.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Modality:</span>
              <span className="text-slate-200 font-medium">{category.imagingType}</span>
            </div>
          </div>
        </Card>

        {/* Section 2: Model Status, Predicted Class & Confidence (Pending Empty State) */}
        <div className="lg:col-span-7 space-y-5">
          <Card padding="md">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Model Prediction Status
                </h4>
              </div>
              <Badge variant="warning">AI model integration pending.</Badge>
            </div>

            {/* Model Status Metrics (Prepared Schema with Explicit Empty States) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Predicted Class */}
              <div className="p-4 rounded-xl bg-background border border-border">
                <span className="text-xs font-semibold text-text-secondary block mb-1">
                  Predicted Class
                </span>
                <p className="text-base font-bold text-text-secondary italic">
                  AI model integration pending.
                </p>
                <p className="text-[11px] text-text-secondary/70 mt-1">
                  Classification head will map feature vectors to candidate conditions when the model is linked.
                </p>
              </div>

              {/* Model Confidence */}
              <div className="p-4 rounded-xl bg-background border border-border">
                <span className="text-xs font-semibold text-text-secondary block mb-1">
                  Model Confidence
                </span>
                <p className="text-2xl font-extrabold text-text-secondary">
                  — %
                </p>
                <p className="text-[11px] text-text-secondary/70 mt-1">
                  Software confidence metrics are withheld in this prototype phase to avoid synthetic claims.
                </p>
              </div>
            </div>

            {/* Candidate Condition Classes Scheduled for this Model */}
            <div className="mt-4 pt-4 border-t border-border">
              <span className="text-xs font-semibold text-text-secondary block mb-2">
                Targeted Classes For This Pipeline:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {category.targetConditions.map((cond) => (
                  <span
                    key={cond}
                    className="text-xs px-2.5 py-1 rounded-lg bg-surface border border-border text-text-primary font-medium"
                  >
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 3: Important Image Observations */}
          <Card padding="md">
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers size={16} className="text-secondary" /> Important Image Observations
            </h4>
            <div className="p-4 rounded-xl bg-background border border-border text-xs text-text-secondary space-y-2">
              <div className="flex items-center gap-2 text-text-primary font-semibold">
                <Info size={14} className="text-secondary flex-shrink-0" />
                <span>Feature Extraction Architecture (Pending Execution)</span>
              </div>
              <p className="leading-relaxed">
                When activated, the feature extraction layer will generate Class Activation Maps (Grad-CAM)
                and segment anatomical regions of interest matching {category.clinicalDomain} screening standards.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 pt-2 text-[11px] text-text-secondary">
                <div className="p-2 bg-surface rounded-lg border border-border">
                  &bull; Spatial gradient normalization: Validated
                </div>
                <div className="p-2 bg-surface rounded-lg border border-border">
                  &bull; ROI bounding coordinates: Awaiting Model
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Section 4: Educational Explanation & Section 5: Recommended Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Educational Explanation */}
        <Card padding="md">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary">
              <Microscope size={18} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">
              Educational Biological Explanation
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3">
            {category.educationalNotes}
          </p>
          <div className="p-3 rounded-xl bg-primary-50/50 border border-primary-100/60 text-xs text-primary leading-snug">
            <strong>Key Mechanism:</strong> Machine learning image classifiers operate on high-frequency pixel textures and macroscopic contrast gradients, mirroring the initial perceptual steps taken in clinical triage.
          </div>
        </Card>

        {/* Recommended Next Steps */}
        <Card padding="md">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-50 flex items-center justify-center text-secondary">
              <Compass size={18} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">
              Recommended Next Steps
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-text-secondary">
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                <strong>Consult a Medical Provider:</strong> Any suspicious or unresolved symptom requires clinical examination by a board-certified specialist.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                <strong>Bring Quality Imaging:</strong> Retain the original DICOM, dermoscopic, or microscopy files for professional diagnostic review.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                <strong>Document Timeline:</strong> Track any temporal changes in size, color, respiratory discomfort, or systemic symptoms.
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Mandatory Visible Medical Disclaimer Note */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="font-bold">Medical Disclaimer & Educational Use Notice</p>
          <p className="leading-relaxed">
            "This platform is an educational research prototype and is not intended to diagnose diseases or replace professional medical evaluation."
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={onReset}
        >
          Select Another Image
        </Button>

        <div className="flex items-center gap-3">
          <Link to="/image-analysis">
            <Button variant="ghost" size="md">
              Switch Category
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

export default ResultsInterface;
