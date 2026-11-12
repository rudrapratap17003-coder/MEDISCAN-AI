import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ArrowLeft,
  ScanLine,
  FileCheck2,
  ShieldCheck,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button, Badge, Card, PageHeader } from '../components/common';
import { useActivity } from '../context/ActivityContext';
import { ACTIVITY_CATEGORIES, ACTIVITY_STATUS } from '../data/activityTypes';
import ImageUpload from '../components/image-analysis/ImageUpload';
import AnalysisInterface from '../components/image-analysis/AnalysisInterface';
import ResultsInterface from '../components/image-analysis/ResultsInterface';
import { IMAGE_CATEGORIES, getCategoryById } from '../data/imageAnalysisCategories';

const ImageAnalysisModule = ({ defaultCategory }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Resolve category from route param or prop (defaults to 'skin')
  const activeCategoryId = categoryId || defaultCategory || 'skin';
  const category = getCategoryById(activeCategoryId) || IMAGE_CATEGORIES.skin;

  // Analysis workflow states: 'upload' | 'analyzing' | 'results'
  const [currentStep, setCurrentStep] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Reset file and state when switching categories
  useEffect(() => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setPreviewUrl('');
  }, [activeCategoryId]);

  const handleImageSelected = (file, url) => {
    setSelectedFile(file);
    setPreviewUrl(url);
  };

  const handleImageRemoved = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    setCurrentStep('upload');
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) return;
    setCurrentStep('analyzing');
  };

  const { addActivity } = useActivity();

  const handleProceedToResults = () => {
    setCurrentStep('results');
    try {
      addActivity({
        category: ACTIVITY_CATEGORIES.IMAGE_ANALYSIS,
        title: `${category.title} Validation`,
        status: ACTIVITY_STATUS.IMAGE_VALIDATED,
        moduleId: category.id,
        data: {
          screeningType: category.title,
          fileName: selectedFile?.name || 'Uploaded medical scan',
          fileSize: selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Verified',
        },
      });
    } catch (e) {
      console.warn('Failed to record image validation activity:', e);
    }
  };

  const handleReset = () => {
    handleImageRemoved();
    setCurrentStep('upload');
  };

  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-12"
    >
      {/* Dynamic Breadcrumbs & Page Header */}
      <PageHeader
        title={category.title}
        description={category.purpose}
        icon={CategoryIcon}
        breadcrumb={
          <div className="flex items-center gap-1.5 text-xs">
            <Link to="/dashboard" className="hover:text-primary transition-colors">
              MediScan
            </Link>
            <ChevronRight size={12} className="text-text-secondary/50" />
            <Link to="/image-analysis" className="hover:text-primary transition-colors">
              Image Analysis
            </Link>
            <ChevronRight size={12} className="text-text-secondary/50" />
            <span className="text-text-primary font-semibold">{category.shortTitle}</span>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Link to="/image-analysis">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                All Categories
              </Button>
            </Link>
            <Badge variant="primary" dot>{category.clinicalDomain}</Badge>
          </div>
        }
      />

      {/* Category Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-surface border border-border shadow-soft">
        {Object.values(IMAGE_CATEGORIES).map((cat) => {
          const isActive = cat.id === category.id;
          const Icon = cat.icon;
          return (
            <Link key={cat.id} to={cat.route} className="flex-1 min-w-[140px]">
              <button
                type="button"
                className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                <span>{cat.shortTitle}</span>
              </button>
            </Link>
          );
        })}
      </div>

      {/* Main Workflow View */}
      <AnimatePresence mode="wait">
        {currentStep === 'upload' && (
          <motion.div
            key="step-upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Clinical Overview Card */}
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-soft relative overflow-hidden`}>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                    Modality: {category.imagingType}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {category.title} Specimen Intake
                  </h3>
                  <p className="text-xs text-white/85 max-w-2xl leading-relaxed">
                    {category.detailedPurpose}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 self-start md:self-auto">
                  <ShieldCheck size={16} /> Client-Side Verification
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 size={18} className="text-primary" />
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Upload & Validation Interface
                  </h3>
                </div>
                <span className="text-xs text-text-secondary">
                  Formats: <span className="font-semibold text-text-primary">{category.formatExtensions}</span>
                </span>
              </div>

              <ImageUpload
                category={category}
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                onImageSelected={handleImageSelected}
                onImageRemoved={handleImageRemoved}
              />

              {/* Bottom Analyze Button */}
              {previewUrl && (
                <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-text-secondary flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-success" />
                    <span>File validated. Ready to trigger preprocessing pipeline.</span>
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    icon={ScanLine}
                    onClick={handleStartAnalysis}
                    className="w-full sm:w-auto"
                  >
                    Analyze Image
                  </Button>
                </div>
              )}
            </Card>

            {/* Quality Guidelines & Target Classes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quality Standards */}
              <Card padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle size={16} className="text-secondary" />
                  <h4 className="text-sm font-bold text-text-primary">
                    Imaging Quality Standards
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-text-secondary">
                  {category.qualityGuidelines.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Target Conditions */}
              <Card padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-primary" />
                  <h4 className="text-sm font-bold text-text-primary">
                    Screening Focus Areas
                  </h4>
                </div>
                <div className="space-y-2">
                  {category.targetConditions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-background border border-border text-xs flex items-center justify-between"
                    >
                      <span className="font-medium text-text-primary">{item}</span>
                      <span className="text-[10px] text-text-secondary font-mono">
                        Target Class {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 2: Animated Analysis / Scanning View */}
        {currentStep === 'analyzing' && (
          <motion.div
            key="step-analyzing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <AnalysisInterface
              category={category}
              imageFile={selectedFile}
              previewUrl={previewUrl}
              onProceedToResults={handleProceedToResults}
              onReset={handleReset}
            />
          </motion.div>
        )}

        {/* Step 3: Formal Results Template Interface */}
        {currentStep === 'results' && (
          <motion.div
            key="step-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <ResultsInterface
              category={category}
              imageFile={selectedFile}
              previewUrl={previewUrl}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Medical Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldCheck size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-0.5">
          <p className="font-semibold text-amber-800">
            Educational Research Prototype Notice
          </p>
          <p className="text-amber-700 leading-relaxed">
            "This platform is an educational research prototype and is not intended to diagnose diseases or replace professional medical evaluation."
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageAnalysisModule;
