import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ScanLine,
  Microscope,
  Wind,
  Droplets,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button, Badge, Card, PageHeader } from '../components/common';
import { IMAGE_CATEGORIES } from '../data/imageAnalysisCategories';

const categoriesList = Object.values(IMAGE_CATEGORIES);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ImageAnalysisHub = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12"
    >
      {/* Page Header */}
      <PageHeader
        title="Medical Image Analysis"
        description="Explore AI-assisted screening through selected medical image categories."
        icon={ScanLine}
        breadcrumb={
          <div className="flex items-center gap-1.5 text-xs">
            <Link to="/dashboard" className="hover:text-primary transition-colors">
              MediScan
            </Link>
            <ChevronRight size={12} className="text-text-secondary/50" />
            <span className="text-text-primary font-semibold">Image Analysis</span>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot>3 Screening Categories</Badge>
          </div>
        }
      />

      {/* Educational Notice Banner */}
      <motion.div variants={cardVariants}>
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-teal-50/50 to-indigo-50/50 border border-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary">
                Multi-Modality Computer Vision Architecture
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mt-0.5 max-w-2xl">
                Each category utilizes a dedicated image processing pipeline tailored to specific clinical imaging modalities:
                high-resolution dermoscopy, digital chest radiographs, or high-magnification thin blood smears.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <FileCheck size={16} className="text-success" />
            <span>Client-Side File Preprocessing</span>
          </div>
        </div>
      </motion.div>

      {/* Three Visually Distinct Screening Modules */}
      <motion.div variants={cardVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">
            Screening Categories
          </h2>
          <span className="text-xs text-text-secondary">
            Select a module to initiate upload & screening validation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group flex flex-col justify-between bg-surface rounded-2xl border border-border shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Category Header with distinct clinical gradient */}
                  <div className={`p-6 bg-gradient-to-br ${cat.gradient} text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                        {cat.clinicalDomain}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1.5">{cat.title}</h3>
                    <p className="text-xs text-white/80 leading-relaxed font-normal">
                      {cat.purpose}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary block mb-2">
                        Targeted Conditions
                      </span>
                      <ul className="space-y-1.5">
                        {cat.targetConditions.slice(0, 3).map((target) => (
                          <li
                            key={target}
                            className="text-xs text-text-primary flex items-center gap-2"
                          >
                            <CheckCircle2 size={13} className="text-success flex-shrink-0" />
                            <span className="truncate">{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-background border border-border text-[11px] text-text-secondary space-y-1">
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span className="font-semibold text-text-primary">JPG, PNG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modality:</span>
                        <span className="font-medium text-text-primary truncate max-w-[170px]">
                          {cat.imagingType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link to={cat.route} className="block w-full">
                    <Button
                      variant="primary"
                      size="md"
                      icon={ArrowRight}
                      iconPosition="right"
                      className="w-full"
                    >
                      Open {cat.shortTitle}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Guidelines Section */}
      <motion.div variants={cardVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card padding="md">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary">
              <FileCheck size={16} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">Supported Formats</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            All screening categories accept JPEG, JPG, and PNG images up to 10 MB. Preprocessing scales and normalizes tensors directly in your web browser.
          </p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-secondary">
              <ShieldCheck size={16} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">Local & Private</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Images selected in this phase remain stored only in your local browser memory for preview and schema specification. No external network transmissions occur.
          </p>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Info size={16} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">Educational Framework</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Designed to demonstrate multi-step machine learning inference gateways before linking neural network weights in future development phases.
          </p>
        </Card>
      </motion.div>

      {/* Medical Disclaimer */}
      <motion.div variants={cardVariants}>
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
          <ShieldCheck size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-amber-900">
              Medical Research Disclaimer
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              "This platform is an educational research prototype and is not intended to diagnose diseases or replace professional medical evaluation.
              Always consult a licensed physician or board-certified healthcare professional for medical diagnoses and treatment plans."
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageAnalysisHub;
