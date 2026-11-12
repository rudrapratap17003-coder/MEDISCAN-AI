import {
  Activity,
  Wind,
  Utensils,
  Brain,
  Sparkles,
} from 'lucide-react';

export const SYMPTOM_CATEGORIES = [
  {
    id: 'general',
    name: 'General',
    description: 'Systemic, whole-body symptoms and constitutional signs',
    icon: Activity,
    color: 'primary',
    symptoms: [
      { id: 'fever', label: 'Fever', description: 'Elevated body temperature above 38°C (100.4°F)' },
      { id: 'fatigue', label: 'Fatigue', description: 'Persistent feeling of tiredness or low energy' },
      { id: 'weakness', label: 'Weakness', description: 'Generalized reduction in physical muscle strength' },
      { id: 'chills', label: 'Chills', description: 'Involuntary shivering sensation with cold sensitivity' },
      { id: 'weight_changes', label: 'Unexplained weight changes', description: 'Rapid, unintended loss or gain of body mass' },
    ],
  },
  {
    id: 'respiratory',
    name: 'Respiratory',
    description: 'Airway, lung, and chest breathing mechanics',
    icon: Wind,
    color: 'secondary',
    symptoms: [
      { id: 'cough', label: 'Cough', description: 'Dry, persistent, or productive reflex expulsion of air' },
      { id: 'shortness_of_breath', label: 'Shortness of breath', description: 'Dyspnea or difficulty drawing a full breath' },
      { id: 'chest_discomfort', label: 'Chest discomfort', description: 'Tightness, pressure, or soreness across thoracic area' },
      { id: 'sore_throat', label: 'Sore throat', description: 'Pharyngeal irritation, pain, or scratchiness when swallowing' },
      { id: 'nasal_congestion', label: 'Nasal congestion', description: 'Obstruction, inflammation, or rhinorrhea in nasal passages' },
    ],
  },
  {
    id: 'digestive',
    name: 'Digestive',
    description: 'Gastrointestinal tract, stomach, and bowel symptoms',
    icon: Utensils,
    color: 'amber',
    symptoms: [
      { id: 'nausea', label: 'Nausea', description: 'Uneasy stomach sensation with urge to vomit' },
      { id: 'vomiting', label: 'Vomit', description: 'Emesis or forceful expulsion of gastric contents' },
      { id: 'abdominal_pain', label: 'Abdominal pain', description: 'Cramping, sharp, or dull aching throughout abdomen' },
      { id: 'diarrhea', label: 'Diarrhea', description: 'Frequent, loose, or watery bowel movements' },
      { id: 'loss_of_appetite', label: 'Loss of appetite', description: 'Anorexia or noticeable reduction in desire to eat' },
    ],
  },
  {
    id: 'neurological',
    name: 'Neurological',
    description: 'Central nervous system, sensory, and cognitive indicators',
    icon: Brain,
    color: 'violet',
    symptoms: [
      { id: 'headache', label: 'Headache', description: 'Cephalea, throbbing, tension, or localized head pain' },
      { id: 'dizziness', label: 'Dizziness', description: 'Lightheadedness, unsteadiness, or sensation of spinning' },
      { id: 'tingling', label: 'Tingling', description: 'Paresthesia, pins-and-needles sensation in extremities' },
      { id: 'confusion', label: 'Confusion', description: 'Disorientation, difficulty focusing, or cognitive haze' },
    ],
  },
  {
    id: 'skin',
    name: 'Skin',
    description: 'Integumentary system, cutaneous surfaces, and dermal signs',
    icon: Sparkles,
    color: 'rose',
    symptoms: [
      { id: 'rash', label: 'Rash', description: 'Noticeable eruption, bumps, or textural changes on skin' },
      { id: 'itching', label: 'Itching', description: 'Pruritus, persistent urge to scratch skin surfaces' },
      { id: 'redness', label: 'Redness', description: 'Erythema or localized skin discoloration' },
      { id: 'swelling', label: 'Swelling', description: 'Edema or fluid accumulation in cutaneous tissues' },
    ],
  },
];

export const AGE_RANGES = [
  'Under 18',
  '18–29',
  '30–44',
  '45–59',
  '60–74',
  '75+',
];

export const BIOLOGICAL_SEX_OPTIONS = [
  'Female',
  'Male',
  'Intersex',
  'Prefer not to say',
];

export const ONSET_OPTIONS = [
  { value: 'sudden', label: 'Sudden (hours)', desc: 'Started abruptly within the past few hours' },
  { value: 'recent', label: 'Recent (1–3 days)', desc: 'Began over the last couple of days' },
  { value: 'gradual', label: 'Gradual (1–2 weeks)', desc: 'Developed slowly over a week or two' },
  { value: 'chronic', label: 'Chronic (longer than a month)', desc: 'Ongoing or recurrent over several weeks or months' },
];

export const DURATION_OPTIONS = [
  'Less than 24 hours',
  '1 to 3 days',
  '4 to 7 days',
  '1 to 2 weeks',
  'More than 2 weeks',
];

export const SEVERITY_LEVELS = [
  {
    level: 'Mild',
    label: 'Mild',
    desc: 'Noticeable but easily tolerated; does not disrupt everyday routines',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400',
    selectedColor: 'bg-emerald-600 text-white border-emerald-600 shadow-soft',
  },
  {
    level: 'Moderate',
    label: 'Moderate',
    desc: 'Uncomfortable; interferes with some normal tasks or work activity',
    color: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400',
    selectedColor: 'bg-amber-600 text-white border-amber-600 shadow-soft',
  },
  {
    level: 'Severe',
    label: 'Severe',
    desc: 'Debilitating; prevents regular daily activities and rest',
    color: 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-400',
    selectedColor: 'bg-rose-600 text-white border-rose-600 shadow-soft',
  },
];

export const FREQUENCY_OPTIONS = [
  'Constant / Continuous',
  'Intermittent / Comes and goes',
  'Worsening over time',
  'Improving with rest',
];

export const COMMON_HISTORY_TAGS = [
  'Hypertension (High Blood Pressure)',
  'Asthma / Chronic Respiratory Condition',
  'Type 1 or Type 2 Diabetes',
  'Cardiovascular Disease',
  'Known Drug / Environmental Allergies',
  'Immunocompromised Status',
  'None / No Significant History',
];
