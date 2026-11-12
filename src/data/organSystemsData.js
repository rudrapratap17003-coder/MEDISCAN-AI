import {
  Brain,
  Heart,
  Wind,
  Utensils,
  Droplets,
  Shield,
  Activity,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

export const ORGAN_SYSTEMS_DATA = [
  {
    id: 'nervous',
    name: 'Nervous System',
    icon: Brain,
    color: '#8B5CF6',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-600',
    description: 'Rapid communication network transmitting electrical action potentials and chemical neurotransmitters across central and peripheral pathways.',
    mainOrgans: ['Brain', 'Spinal Cord', 'Peripheral Nerves', 'Sensory Receptors'],
    overview:
      'The nervous system is the body’s prime control and communication matrix. It senses internal and external stimuli, processes environmental data, makes decisions, and coordinates motor responses in fractions of a second.',
    functions: [
      'Gathers sensory information from specialized external and somatic receptors',
      'Integrates, correlates, and stores sensory inputs within cortical neural circuits',
      'Initiates motor effector impulses triggering muscle contractions and glandular secretion',
      'Governs higher cognitive capabilities: abstraction, memory, emotions, and self-awareness',
      'Directs involuntary visceral vital functions via autonomic sympathetic and parasympathetic divisions',
    ],
    howItWorks:
      'Neurons transmit signals as transient depolarizations (action potentials) down axons insulated by myelin sheaths. At axonal terminals, electrical surges trigger chemical neurotransmitter release into synaptic clefts, activating downstream receptors.',
    relationships:
      'Controls rate and contractility of the cardiovascular system; drives breathing cadence via the respiratory center; senses gastrointestinal fullness through the gut-brain axis; and commands skeletal locomotion.',
  },

  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    icon: Heart,
    color: '#EF4444',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    description: 'Closed circulatory loop driven by the heart, distributing oxygenated blood, nutrients, hormones, and immune cells throughout all tissues.',
    mainOrgans: ['Heart', 'Arteries', 'Capillaries', 'Veins', 'Blood'],
    overview:
      'Comprising ~100,000 kilometers of blood vessels powered by a four-chambered muscular heart, this system delivers life-sustaining oxygen and metabolic substrates while whisking away cellular waste products.',
    functions: [
      'Transports oxygen from pulmonary alveoli to peripheral cellular mitochondria',
      'Transfers carbon dioxide and metabolic catabolites to excretory organs (lungs, kidneys)',
      'Distributes absorbed dietary nutrients from the mesenteric vasculature to liver and peripheral tissues',
      'Circulates endocrine hormones to distant target organs and disperses immune surveillance cells',
      'Assists in homeostatic thermoregulation via selective cutaneous vasodilation and constriction',
    ],
    howItWorks:
      'The right heart pumps deoxygenated blood through the pulmonary arterial bed for oxygen uptake and CO2 release. Oxygenated blood returns to the left heart, which exerts high systolic pressure to drive blood into the systemic aorta, distributing it through branching arterioles into capillary exchange beds.',
    relationships:
      'Supplies metabolic perfusion to every living organ; collaborates with kidneys to control systemic arterial pressure (RAAS); and partners with the respiratory system for gas exchange.',
  },

  {
    id: 'respiratory',
    name: 'Respiratory System',
    icon: Wind,
    color: '#0D9488',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-600',
    description: 'Conducting airways and alveolar beds executing pulmonary ventilation, gas diffusion, and physiological acid-base homeostasis.',
    mainOrgans: ['Lungs', 'Trachea', 'Bronchi', 'Diaphragm', 'Pharynx', 'Larynx'],
    overview:
      'The respiratory system provides continuous oxygen uptake to power mitochondrial cellular respiration and expels volatile carbon dioxide waste generated during metabolism.',
    functions: [
      'Inhales atmospheric air, warming, humidifying, and filtering particulates in upper airways',
      'Facilitates rapid diffusion of O2 and CO2 across the extensive alveolar-capillary surface',
      'Maintains systemic arterial pH through the carbonic acid-bicarbonate buffering equilibrium',
      'Provides airstream acoustic vibration across vocal cords for phonation and vocalization',
      'Houses olfactory sensory epithelium in the superior nasal vault for chemical scent perception',
    ],
    howItWorks:
      'Contraction of the muscular diaphragm and external intercostal muscles increases intrathoracic volume, creating sub-atmospheric negative pressure that draws ambient air inward. At the alveoli, passive diffusion moves O2 into capillary hemoglobin while CO2 diffuses outward for expiration.',
    relationships:
      'Provides oxygen required by all somatic cells; operates synchronously with the cardiovascular system; and acts as an immediate physiological pH stabilizer when metabolic acids accumulate.',
  },

  {
    id: 'digestive',
    name: 'Digestive System',
    icon: Utensils,
    color: '#D97706',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    description: 'Continuous gastrointestinal tract and accessory glandular organs executing food ingestion, mechanical and chemical catabolism, nutrient uptake, and waste elimination.',
    mainOrgans: ['Stomach', 'Small Intestine', 'Large Intestine', 'Liver', 'Pancreas', 'Esophagus'],
    overview:
      'A specialized bio-processing tube traversing from mouth to rectum, breaking down complex polymers (proteins, carbohydrates, lipids) into bioavailable monomers for cellular absorption.',
    functions: [
      'Mechanically crushes food boluses and enzymatically hydrolyzes macromolecular nutrients',
      'Secretes specialized digestive enzymes, gastric acid, and hepatic bile salts',
      'Absorbs monosaccharides, amino acids, fatty acids, water, electrolytes, and micronutrients',
      'Compact and eliminates non-digestible dietary residues as solid stool',
      'Harbors the gut microbiome and vast immune surveillance lymphoid aggregates (GALT)',
    ],
    howItWorks:
      'Food travels via peristaltic wave contractions through the esophagus to the stomach for acid and pepsin breakdown. In the duodenum, pancreatic enzymes and bile neutralize acid and hydrolyze lipids. Microscopic villi in the jejunum and ileum absorb nutrients into portal blood or lymphatic lacteals.',
    relationships:
      'Supplies energy fuels for skeletal movement, cardiac work, and brain metabolism; interacts bidirectionally with the nervous system via the enteric nervous system and vagal afferents.',
  },

  {
    id: 'urinary',
    name: 'Urinary System',
    icon: Droplets,
    color: '#0284C7',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-600',
    description: 'Renal filtration apparatus filtering blood plasma, excreting metabolic wastes, regulating osmolarity, and balancing fluid volume.',
    mainOrgans: ['Kidneys', 'Ureters', 'Urinary Bladder', 'Urethra'],
    overview:
      'The urinary system maintains precise chemical balance in body fluids. By altering urine volume and ionic composition, it prevents toxic uremic accumulation and stabilizes hemodynamic pressures.',
    functions: [
      'Filters nitrogenous protein catabolites (urea, creatinine, uric acid) from circulating blood',
      'Regulates total plasma volume, extracellular fluid tonicity, and systemic blood pressure',
      'Controls serum concentrations of critical electrolytes (sodium, potassium, calcium, phosphate)',
      'Adjusts blood pH through targeted hydrogen ion excretion and bicarbonate reabsorption',
      'Produces key hormones: erythropoietin (RBC stimulation), renin (blood pressure), and calcitriol',
    ],
    howItWorks:
      'Renal arterial blood enters glomerular tufts where high hydrostatic pressure forces water and small solutes through filtration slits. Proximal and distal renal tubules actively reabsorb vital nutrients and electrolytes, concentrating waste fluid into urine that flows through ureters into the bladder for voiding.',
    relationships:
      'Works in tandem with the cardiovascular system to manage hemodynamic blood pressure; supports skeletal integrity through vitamin D activation; and detoxifies blood alongside the liver.',
  },

  {
    id: 'integumentary',
    name: 'Integumentary System',
    icon: Sparkles,
    color: '#F43F5E',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-600',
    description: 'Cutaneous external covering including multi-layered epidermis, dermis, subcutaneous tissue, hair, nails, and glandular structures.',
    mainOrgans: ['Skin (Epidermis, Dermis)', 'Hair Follicles', 'Nails', 'Sebaceous & Sweat Glands'],
    overview:
      'Forming the physical interface between body and biosphere, the integumentary system acts as an impenetrable barrier, thermoregulatory radiator, sensory receiver, and endocrine synthesizer.',
    functions: [
      'Shields underlying organs from physical abrasion, UV radiation, and microbial colonization',
      'Regulates core body temperature through dermal vascular flushing and evaporative perspiration',
      'Prevents desiccating fluid and electrolyte loss across internal tissue boundaries',
      'Houses millions of specialized tactile, vibration, thermoreceptive, and pain nerve endings',
      'Synthesizes vitamin D precursors through photochemical conversion of 7-dehydrocholesterol',
    ],
    howItWorks:
      'Basal keratinocytes continuously divide, push outward, keratinize, and form a hydrophobic lipid-protein stratum corneum seal that constantly desquamates. Deep dermal connective tissue provides tensile elasticity and anchors sweat glands and sensory nerves.',
    relationships:
      'Protects every internal body system from environmental insults; collaborates with the immune system via cutaneous dendritic cells; and interfaces directly with the central nervous system.',
  },

  {
    id: 'skeletal',
    name: 'Skeletal System',
    icon: Layers,
    color: '#64748B',
    bgLight: 'bg-slate-50',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-600',
    description: 'Rigid osteological framework of 206 bones, articulating cartilages, ligaments, and marrow cavities providing structural architecture and mineral reserves.',
    mainOrgans: ['Bones (Axial & Appendicular)', 'Articular Cartilages', 'Joints', 'Ligaments', 'Bone Marrow'],
    overview:
      'Far from static scaffolding, the skeleton is an active, metabolically dynamic organ system that supports soft tissues, shields delicate viscera, enables movement, and produces the body’s blood cells.',
    functions: [
      'Provides a sturdy internal scaffolding that resists gravity and preserves anatomical form',
      'Encloses critical viscera in protective bony vaults (brain in cranium, spinal cord in vertebrae)',
      'Acts as rigid biomechanical lever systems pulled by contracting muscular tendons',
      'Stores 99% of total bodily calcium and 85% of phosphorus in hydroxyapatite crystals',
      'Produces erythrocytes, leukocytes, and platelets within active red marrow cavities',
    ],
    howItWorks:
      'Bone consists of a composite matrix of tensile collagen fibers embedded in brittle calcium phosphate mineral crystals. Osteoclasts continuously dissolve aged bone matrix while osteoblasts synthesize new osteoid, constantly remodeling architecture in response to mechanical weight-bearing stresses.',
    relationships:
      'Anchors the muscular system to facilitate locomotion; encloses the central nervous system; and exchanges mineral ions under control of endocrine hormones (PTH, calcitonin).',
  },

  {
    id: 'muscular',
    name: 'Muscular System',
    icon: Zap,
    color: '#EA580C',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
    description: 'Contractile tissue network comprising skeletal, cardiac, and smooth muscle types responsible for locomotion, hemodynamic flow, and visceral peristalsis.',
    mainOrgans: ['Skeletal Muscles (~600+)', 'Tendons', 'Cardiac Muscle', 'Visceral Smooth Muscle'],
    overview:
      'Muscle tissues transform chemical ATP energy into mechanical force. Skeletal muscles pull on bones to generate voluntary actions, while involuntary smooth and cardiac muscles drive circulation, breathing, and digestion.',
    functions: [
      'Powers voluntary locomotion, posture stabilization, and articulate physical gestures',
      'Circulates blood throughout the cardiovascular circuit (cardiac myocardial syncytium)',
      'Propels food, bile, urine, and glandular secretions through internal luminal hollow organs',
      'Generates metabolic heat (thermogenesis) as a byproduct of muscle contraction and shivering',
      'Regulates physiological orifices and sphincters controlling involuntary passage of contents',
    ],
    howItWorks:
      'Muscle fibers contract via sliding filament mechanics: when stimulated by motor neuron action potentials, intracellular calcium floods sarcomeres, allowing myosin cross-bridge heads to bind actin filaments and pull them inward with power strokes fueled by ATP hydrolysis.',
    relationships:
      'Interlocks with the skeletal system to form the musculoskeletal apparatus; relies on the cardiovascular system for immense oxygen delivery; and responds to somatic motor commands from the nervous system.',
  },

  {
    id: 'endocrine',
    name: 'Endocrine System',
    icon: Activity,
    color: '#7C3AED',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: 'Ductless glandular organ network secreting regulatory chemical hormones directly into blood to orchestrate long-term metabolism, growth, and reproduction.',
    mainOrgans: ['Pituitary Gland', 'Thyroid Gland', 'Adrenal Glands', 'Pancreas (Islets)', 'Hypothalamus', 'Gonads'],
    overview:
      'While the nervous system provides instant, localized communication, the endocrine system coordinates systemic, gradual, and enduring adaptations across organs via circulating hormone signals.',
    functions: [
      'Controls basal metabolic rate and cellular energy turnover (thyroid hormones T3 and T4)',
      'Maintains blood glucose concentrations within tight margins (pancreatic insulin and glucagon)',
      'Directs bodily stress responses and electrolyte balances (adrenal cortisol and aldosterone)',
      'Oversees somatic growth, bone elongation, and cellular repair (growth hormone / GH)',
      'Governs sexual maturation, gametogenesis, and reproductive cycles (estrogens, testosterone)',
    ],
    howItWorks:
      'Endocrine cells release peptide, steroid, or amine hormones into surrounding interstitial capillaries. These messengers travel throughout the bloodstream, binding selectively to high-affinity cell-surface or intracellular nuclear receptors on target cells to alter gene transcription and protein synthesis.',
    relationships:
      'Interacts with the nervous system via the neuroendocrine hypothalamus; directs renal tubular electrolyte reabsorption; and orchestrates digestive enzyme secretion and glucose utilization.',
  },

  {
    id: 'immune',
    name: 'Immune & Lymphatic System',
    icon: Shield,
    color: '#059669',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    description: 'Complex cellular and fluid network defending against viral, bacterial, parasitic, and neoplastic threats while draining interstitial fluid.',
    mainOrgans: ['Lymph Nodes', 'Spleen', 'Thymus', 'Bone Marrow', 'Lymphatic Vessels', 'Tonsils'],
    overview:
      'The immune system distinguishes "self" from "non-self", destroying invasive microorganisms and eliminating mutated or malignant host cells. The interconnected lymphatic system filters extracellular lymph and returns it to blood circulation.',
    functions: [
      'Provides innate rapid defense via phagocytic neutrophils, macrophages, and natural killer (NK) cells',
      'Mounts highly specific adaptive immunity utilizing clonal B cells (antibodies) and T cells',
      'Develops enduring immunological memory, enabling accelerated responses upon secondary antigen exposure',
      'Drains excess interstitial fluid from tissue capillary beds, preventing peripheral tissue edema',
      'Transports dietary emulsified lipids (chylomicrons) from intestinal lacteals into venous blood',
    ],
    howItWorks:
      'When barriers are breached, innate immune sentinels detect pathogen-associated molecular patterns (PAMPs) and trigger inflammation. Antigen-presenting dendritic cells migrate via lymphatic ducts to regional lymph nodes, presenting antigens to specific naive T and B lymphocytes to initiate targeted antibody production and cytotoxic killing.',
    relationships:
      'Guards every organ and vascular conduit in the body; cleanses blood within the splenic red pulp; and works with the cardiovascular system to return interstitial fluids back to central venous circulation.',
  },
];

export const getOrganSystemById = (id) =>
  ORGAN_SYSTEMS_DATA.find((s) => s.id === id) || null;
