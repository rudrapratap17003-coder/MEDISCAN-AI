import {
  ImageIcon,
  Stethoscope,
  Compass,
  Bot,
  Layers,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const ACTIVITY_CATEGORIES = {
  IMAGE_ANALYSIS: 'image_analysis',
  SYMPTOM_ASSESSMENT: 'symptom_assessment',
  BIOLOGICAL_EXPLORATION: 'biological_exploration',
  AI_CONVERSATION: 'ai_conversation',
};

export const CATEGORY_CONFIG = {
  [ACTIVITY_CATEGORIES.IMAGE_ANALYSIS]: {
    id: ACTIVITY_CATEGORIES.IMAGE_ANALYSIS,
    label: 'Medical Image Analysis',
    shortLabel: 'Image Analysis',
    icon: ImageIcon,
    color: '#2563EB', // Medical Blue
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    badgeVariant: 'primary',
    nature: 'Technical Image Validation (AI Screening Pending)',
  },
  [ACTIVITY_CATEGORIES.SYMPTOM_ASSESSMENT]: {
    id: ACTIVITY_CATEGORIES.SYMPTOM_ASSESSMENT,
    label: 'Symptom Assessment',
    shortLabel: 'Symptoms',
    icon: Stethoscope,
    color: '#0D9488', // Teal
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-600',
    badgeVariant: 'teal',
    nature: 'Intake Information Validation (AI Assessment Pending)',
  },
  [ACTIVITY_CATEGORIES.BIOLOGICAL_EXPLORATION]: {
    id: ACTIVITY_CATEGORIES.BIOLOGICAL_EXPLORATION,
    label: 'Biological Explorer Activity',
    shortLabel: 'Biological Study',
    icon: Compass,
    color: '#8B5CF6', // Violet
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-600',
    badgeVariant: 'secondary',
    nature: 'Educational Biological Study (Non-Clinical)',
  },
  [ACTIVITY_CATEGORIES.AI_CONVERSATION]: {
    id: ACTIVITY_CATEGORIES.AI_CONVERSATION,
    label: 'AI Biology Assistant',
    shortLabel: 'AI Assistant',
    icon: Bot,
    color: '#D97706', // Amber
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    badgeVariant: 'warning',
    nature: 'Interactive Educational Inquiry',
  },
};

export const ACTIVITY_STATUS = {
  IMAGE_VALIDATED: 'Image Validated — AI Integration Pending',
  SYMPTOM_VALIDATED: 'Symptom Information Validated — AI Integration Pending',
  EXPLORATION_COMPLETED: 'Educational Exploration Completed',
  CONVERSATION_SAVED: 'Assistant Inquiry Session',
  MODEL_ANALYSIS_COMPLETED: 'AI Model Analysis Completed', // Only when genuinely connected
};

export const STATUS_CONFIG = {
  [ACTIVITY_STATUS.IMAGE_VALIDATED]: {
    label: 'Image Validated — AI Integration Pending',
    badgeVariant: 'warning',
    isAiComplete: false,
    description: 'Image format, resolution, and anatomical boundaries were successfully validated. No diagnostic AI prediction formulated.',
  },
  [ACTIVITY_STATUS.SYMPTOM_VALIDATED]: {
    label: 'Symptom Information Validated — AI Integration Pending',
    badgeVariant: 'warning',
    isAiComplete: false,
    description: 'Symptom characteristics and physiological categories were validated. AI diagnostic assessment pending model deployment.',
  },
  [ACTIVITY_STATUS.EXPLORATION_COMPLETED]: {
    label: 'Educational Exploration',
    badgeVariant: 'teal',
    isAiComplete: false,
    description: 'Interactive anatomical model and physiological pathway study session.',
  },
  [ACTIVITY_STATUS.CONVERSATION_SAVED]: {
    label: 'Educational AI Dialogue',
    badgeVariant: 'primary',
    isAiComplete: true, // Assistant formulated educational answers
    description: 'Conversational biology inquiry grounded on verified biological data.',
  },
  [ACTIVITY_STATUS.MODEL_ANALYSIS_COMPLETED]: {
    label: 'AI Model Analysis Completed',
    badgeVariant: 'success',
    isAiComplete: true,
    description: 'Automated screening analysis completed by an active AI model.',
  },
};
