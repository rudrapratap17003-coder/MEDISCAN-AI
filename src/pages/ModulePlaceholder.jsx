import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ScanLine,
  Stethoscope,
  Dna,
  Bot,
  History,
  Settings,
  ArrowLeft,
  Sparkles,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { Button, Card, Badge, PageHeader } from '../components/common';

const moduleMeta = {
  '/image-analysis': {
    title: 'Medical Image Analysis',
    subtitle: 'AI-assisted screening of medical imaging scans',
    icon: ScanLine,
    badge: 'Phase 4 Module',
    description: 'This module will host computer vision models trained for screening dermatological, pulmonary, and hematological microscopy images.',
    features: [
      'Multi-class skin lesion screening with confidence scoring',
      'Chest X-ray opacity and pattern classification',
      'Blood smear cellular analysis for parasite detection',
      'Visual heatmaps highlighting regions of interest',
    ],
  },
  '/symptom-analysis': {
    title: 'Symptom Assessment',
    subtitle: 'AI-guided clinical symptom evaluation',
    icon: Stethoscope,
    badge: 'Phase 4 Module',
    description: 'Interactive symptom intake questionnaire paired with medical knowledge graphs to suggest relevant conditions for clinical discussion.',
    features: [
      'Guided multi-step symptom questionnaire',
      'Severity and duration tracking',
      'Differential overview with educational context',
      'Questions to bring to your physician',
    ],
  },
  '/biological-explorer': {
    title: 'Biological Explorer',
    subtitle: 'Interactive 3D anatomical and pathological visualization',
    icon: Dna,
    badge: 'Phase 4 Module',
    description: 'Explore human body systems, anatomical structures, and cellular mechanisms underlying common diseases with 3D interactive graphics.',
    features: [
      'Interactive 3D human anatomy models',
      'Cellular and molecular pathway explanations',
      'Organ system cross-sections and disease pathology',
      'Educational annotations and medical references',
    ],
  },
  '/ai-assistant': {
    title: 'AI Biology Assistant',
    subtitle: 'Conversational assistant for medical and biological education',
    icon: Bot,
    badge: 'Phase 4 Module',
    description: 'Ask questions about human biology, disease mechanics, laboratory values, and anatomical functions with verified scientific references.',
    features: [
      'Context-aware biological explanations',
      'Plain-language breakdowns of complex terminology',
      'Interactive visual references and citations',
      'Safe, non-diagnostic educational boundaries',
    ],
  },
  '/history': {
    title: 'Analysis History',
    subtitle: 'Review past screening sessions and saved reports',
    icon: History,
    badge: 'Phase 4 Module',
    description: 'A timeline and archive of all your image analyses, symptom assessments, and generated educational reports.',
    features: [
      'Chronological activity timeline',
      'Search and filter by module or date',
      'Downloadable PDF summary reports',
      'Historical comparison across sessions',
    ],
  },
  '/settings': {
    title: 'Workspace Settings',
    subtitle: 'Manage preferences and security configuration',
    icon: Settings,
    badge: 'Configuration',
    description: 'Manage your local workspace, data storage preferences, theme options, and privacy controls.',
    features: [
      'Profile information and preferences',
      'Local storage management and data wipe',
      'Notification controls',
      'Privacy and disclaimer acknowledgments',
    ],
  },
};

const ModulePlaceholder = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const info = moduleMeta[currentPath] || {
    title: 'Workspace Module',
    subtitle: 'Healthcare analysis module',
    icon: Layers,
    badge: 'In Development',
    description: 'This module is scheduled for the upcoming development phase.',
    features: [
      'Interactive AI-assisted screening interface',
      'Real-time processing feedback',
      'Educational references and explanations',
    ],
  };

  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      <PageHeader
        title={info.title}
        description={info.subtitle}
        icon={Icon}
        actions={
          <Link to="/dashboard">
            <Button variant="outline" size="sm" icon={ArrowLeft}>
              Back to Overview
            </Button>
          </Link>
        }
      />

      {/* Main Status Card */}
      <Card padding="lg" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary flex-shrink-0">
              <Icon size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-text-primary">{info.title}</h3>
                <Badge variant="primary" dot>{info.badge}</Badge>
              </div>
              <p className="text-sm text-text-secondary max-w-xl">{info.description}</p>
            </div>
          </div>

          <Link to="/dashboard">
            <Button size="md" icon={ArrowLeft}>Return to Dashboard</Button>
          </Link>
        </div>

        {/* Planned Capabilities */}
        <div className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-secondary" />
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Planned Capabilities (Next Phase)
            </h4>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {info.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-background border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                <span className="text-sm text-text-primary">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 border border-border text-text-secondary text-xs">
        <ShieldCheck size={18} className="text-primary flex-shrink-0" />
        <span>
          MediScan AI is an educational research prototype. AI screening modules do not generate clinical diagnoses or replace evaluation by licensed physicians.
        </span>
      </div>
    </motion.div>
  );
};

export default ModulePlaceholder;
