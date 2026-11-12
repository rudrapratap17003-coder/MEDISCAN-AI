import { Microscope, Wind, Droplets } from 'lucide-react';

export const IMAGE_CATEGORIES = {
  skin: {
    id: 'skin',
    slug: 'skin',
    title: 'Skin Image Analysis',
    shortTitle: 'Skin Lesions',
    purpose: 'Educational exploration of selected skin conditions using medical images.',
    detailedPurpose:
      'Designed for dermoscopic and high-resolution clinical photographs to demonstrate computer vision feature extraction for dermatological lesion patterns.',
    clinicalDomain: 'Dermatology',
    icon: Microscope,
    route: '/image-analysis/skin',
    gradient: 'from-blue-600 to-indigo-700',
    accentColor: 'primary',
    bgLight: 'bg-primary-50',
    borderLight: 'border-primary-100',
    iconColor: 'text-primary',
    acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg'],
    formatExtensions: '.jpg, .jpeg, .png',
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    maxSizeLabel: '10 MB',
    imagingType: 'Dermoscopy / Clinical Close-Up',
    targetConditions: [
      'Melanocytic Nevus (Benign Mole)',
      'Melanoma (Pattern Exploration)',
      'Basal Cell Carcinoma',
      'Actinic Keratosis',
    ],
    qualityGuidelines: [
      'Ensure proper focal distance with centered lesion',
      'Use uniform diffuse lighting without strong surface reflections',
      'Avoid heavy compression, motion blur, or digital zoom artifacts',
      'Crop out non-dermatological objects (rulers, hair, pens) when possible',
    ],
    educationalNotes:
      'Dermatologists evaluate lesions using the ABCDE criteria (Asymmetry, Border irregularity, Color variation, Diameter > 6mm, Evolving morphology). Machine learning models analyze these spatial and chromatic gradients to assist screening workflows.',
  },

  lung: {
    id: 'lung',
    slug: 'lung',
    title: 'Lung Image Analysis',
    shortTitle: 'Chest Radiographs',
    purpose: 'Educational exploration of chest X-ray classification for pneumonia-associated patterns.',
    detailedPurpose:
      'Engineered for thoracic radiographs to demonstrate automated detection of consolidation, interstitial infiltrates, and pleural opacity variations.',
    clinicalDomain: 'Pulmonology & Radiology',
    icon: Wind,
    route: '/image-analysis/lung',
    gradient: 'from-teal-600 to-emerald-700',
    accentColor: 'secondary',
    bgLight: 'bg-secondary-50',
    borderLight: 'border-secondary-100',
    iconColor: 'text-secondary',
    acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg'],
    formatExtensions: '.jpg, .jpeg, .png',
    maxSizeBytes: 10 * 1024 * 1024,
    maxSizeLabel: '10 MB',
    imagingType: 'Chest X-Ray (PA or AP View)',
    targetConditions: [
      'Normal Pulmonary Aeration',
      'Bacterial Lobar Consolidation',
      'Viral Interstitial Pneumonia Patterns',
      'Bronchopneumonia Opacities',
    ],
    qualityGuidelines: [
      'Standard posteroanterior (PA) or anteroposterior (AP) orientation',
      'Ensure full visualization of bilateral costophrenic angles and apices',
      'Maintain adequate radiographic exposure without underexposed lung fields',
      'Exclude extraneous medical artifacts or rotation if possible',
    ],
    educationalNotes:
      'Chest radiograph interpretation involves systematic assessment of the cardiac silhouette, mediastinal contours, pulmonary parenchymal density, and diaphragmatic margins. AI models look for focal or patchy opacification characteristic of alveolar filling processes.',
  },

  blood: {
    id: 'blood',
    slug: 'blood',
    title: 'Blood Smear Analysis',
    shortTitle: 'Microscopy Smear',
    purpose: 'Educational exploration of blood smear images for malaria-associated parasites.',
    detailedPurpose:
      'Focused on high-magnification photomicrographs of Giemsa-stained thin blood films to illustrate cellular segmentation and intracellular parasite identification.',
    clinicalDomain: 'Hematology & Parasitology',
    icon: Droplets,
    route: '/image-analysis/blood',
    gradient: 'from-rose-600 to-red-700',
    accentColor: 'danger',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    iconColor: 'text-rose-600',
    acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg'],
    formatExtensions: '.jpg, .jpeg, .png',
    maxSizeBytes: 10 * 1024 * 1024,
    maxSizeLabel: '10 MB',
    imagingType: 'Giemsa-Stained Thin Smear (100x Oil Immersion)',
    targetConditions: [
      'Uninfected Erythrocytes (RBCs)',
      'Plasmodium Falciparum (Ring / Trophozoite Forms)',
      'Gametocyte Morphology',
      'Platelet & White Blood Cell Artifact Distinctions',
    ],
    qualityGuidelines: [
      'Well-distributed monolayer of red blood cells without overlapping aggregates',
      'Proper Giemsa staining with visible intracellular contrast',
      'High optical magnification (1000x equivalent optical / high-res digital)',
      'Minimal background precipitation, stain dust, or erythrocyte crenation',
    ],
    educationalNotes:
      'Microscopic parasite screening depends on identifying chromatin dots, cytoplasmic rings, and characteristic pigmentation within host erythrocytes. Deep learning approaches segment individual red cells and classify intracellular inclusions against staining artifacts.',
  },
};

export const getCategoryById = (id) => IMAGE_CATEGORIES[id] || null;
