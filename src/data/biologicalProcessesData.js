import {
  Heart,
  Wind,
  Utensils,
  Shield,
  Droplets,
  Zap,
} from 'lucide-react';

export const BIOLOGICAL_PROCESSES_DATA = [
  {
    id: 'circulation',
    name: 'Blood Circulation',
    icon: Heart,
    category: 'Cardiovascular Dynamics',
    color: '#EF4444',
    bgLight: 'bg-red-50',
    summary: 'The continuous hydrodynamic transit of blood through pulmonary and systemic vascular loops driven by synchronized ventricular contractions.',
    relevantOrgans: ['Heart', 'Lungs', 'Systemic Arteries', 'Capillaries', 'Veins'],
    keyTerms: [
      { term: 'Systole', def: 'Ventricular contraction phase ejecting blood into the aorta and pulmonary trunk.' },
      { term: 'Diastole', def: 'Ventricular relaxation and filling phase during which coronary perfusion occurs.' },
      { term: 'Systemic Circuit', def: 'High-pressure vascular loop transporting oxygenated blood to somatic organs.' },
      { term: 'Pulmonary Circuit', def: 'Low-pressure vascular loop carrying deoxygenated blood through the lungs for gas exchange.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Right Atrial Inflow & Ventricular Filling',
        description: 'Deoxygenated venous blood from superior/inferior venae cavae enters the right atrium and flows across the tricuspid valve into the right ventricle.',
      },
      {
        step: 2,
        title: 'Pulmonary Ejection & Gas Recharging',
        description: 'The right ventricle contracts, pumping blood across the pulmonary semilunar valve into pulmonary arteries toward alveolar capillaries for oxygen uptake and CO2 release.',
      },
      {
        step: 3,
        title: 'Left Atrial Collection',
        description: 'Freshly oxygenated blood returns via four pulmonary veins into the left atrium, passing through the bicuspid (mitral) valve into the thick-walled left ventricle.',
      },
      {
        step: 4,
        title: 'Systemic High-Pressure Ejection',
        description: 'The left ventricle contracts with strong systolic pressure (~120 mmHg), driving blood across the aortic valve into the systemic arterial tree.',
      },
      {
        step: 5,
        title: 'Capillary Micro-Exchange & Venous Return',
        description: 'Blood flows through microvascular exchange beds delivering oxygen and glucose to cells, then collects into systemic venules and veins returning to the right heart.',
      },
    ],
  },

  {
    id: 'respiration',
    name: 'Breathing & Gas Exchange',
    icon: Wind,
    category: 'Pulmonary Mechanics',
    color: '#0D9488',
    bgLight: 'bg-teal-50',
    summary: 'The biomechanical intake of ambient air and molecular diffusion of oxygen into pulmonary blood matched with carbon dioxide excretion.',
    relevantOrgans: ['Lungs', 'Diaphragm', 'Alveoli', 'Pulmonary Capillaries', 'Trachea'],
    keyTerms: [
      { term: 'Alveolus', def: 'Microscopic spherical air sac (~0.2 mm) bounded by a single-cell capillary membrane.' },
      { term: 'Partial Pressure (pO2/pCO2)', def: 'Individual gas pressure gradient driving passive molecular diffusion across membranes.' },
      { term: 'Surfactant', def: 'Dipalmitoylphosphatidylcholine lipoprotein film lowering alveolar surface tension.' },
      { term: 'Diaphragm', def: 'The primary dome-shaped inspiratory muscle separating thoracic and abdominal cavities.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Diaphragmatic Contraction (Inhalation)',
        description: 'The muscular diaphragm contracts and flattens while external intercostals elevate the ribs, expanding thoracic volume and lowering intrathoracic pressure below atmospheric level (-1 to -3 mmHg).',
      },
      {
        step: 2,
        title: 'Airway Inflow & Humidification',
        description: 'Atmospheric air rushes through the nasal cavity, trachea, and branching bronchial tree, becoming warmed, 100% humidified, and filtered by mucociliary elevators.',
      },
      {
        step: 3,
        title: 'Alveolar Capillary Diffusion',
        description: 'In the alveolar sacs, high alveolar pO2 (~104 mmHg) forces oxygen molecules across the 0.5 µm respiratory membrane to bind hemoglobin in red blood cells.',
      },
      {
        step: 4,
        title: 'Carbon Dioxide Clearance',
        description: 'Concurrently, higher venous pCO2 (~45 mmHg) causes carbon dioxide to diffuse out of blood plasma into alveolar air down its concentration gradient (~40 mmHg).',
      },
      {
        step: 5,
        title: 'Passive Recoil (Exhalation)',
        description: 'Inspiratory muscles relax; elastic recoil of lung parenchyma increases alveolar pressure above atmospheric level (+1 to +3 mmHg), expelling CO2-enriched air.',
      },
    ],
  },

  {
    id: 'digestion',
    name: 'Digestion & Nutrient Absorption',
    icon: Utensils,
    category: 'Metabolic Assimilation',
    color: '#D97706',
    bgLight: 'bg-amber-50',
    summary: 'The sequential mechanical breakdown, enzymatic cleavage, and mucosal transport of dietary molecules into blood and lymphatic circulations.',
    relevantOrgans: ['Stomach', 'Small Intestine', 'Liver & Gallbladder', 'Pancreas', 'Colon'],
    keyTerms: [
      { term: 'Chyme', def: 'Semi-fluid acidic mass of partially digested food expelled by the stomach into the duodenum.' },
      { term: 'Microvilli / Brush Border', def: 'Dense microscopic cellular membrane projections magnifying intestinal absorptive surface area.' },
      { term: 'Peristalsis', def: 'Radially symmetrical wave-like smooth muscle contractions propagating contents down the gut.' },
      { term: 'Hepatic Portal System', def: 'Venous network directly conveying absorbed intestinal water-soluble nutrients straight to the liver.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Oral Maceration & Amylase Cleavage',
        description: 'Mastication breaks food into smaller particles while salivary alpha-amylase and lingual lipase initiate carbohydrate and lipid breakdown.',
      },
      {
        step: 2,
        title: 'Gastric Acid Hydrolysis & Pepsin Digestion',
        description: 'The stomach churns food in concentrated HCl (pH ~1.5) that denatures proteins, enabling pepsin to cleave complex proteins into polypeptide chains.',
      },
      {
        step: 3,
        title: 'Duodenal Neutralization & Bile Emulsification',
        description: 'Acidic chyme enters the duodenum, triggering pancreatic bicarbonate secretion to neutralize pH, while hepatic bile acids emulsify dietary fats into soluble micelles.',
      },
      {
        step: 4,
        title: 'Jejunal Brush-Border Absorption',
        description: 'Pancreatic and mucosal enzymes degrade oligomers into monosaccharides and amino acids, actively transported across enterocytes into portal capillaries, while lipids enter lymphatic lacteals.',
      },
      {
        step: 5,
        title: 'Colonic Reabsorption & Microbiome Fermentation',
        description: 'The colon reabsorbs ~90% of residual water and electrolytes, while trillions of commensal bacteria ferment non-digestible fiber, producing Vitamin K and short-chain fatty acids.',
      },
    ],
  },

  {
    id: 'immune-response',
    name: 'Immune Response',
    icon: Shield,
    category: 'Defensive Immunology',
    color: '#059669',
    bgLight: 'bg-emerald-50',
    summary: 'The coordinated detection of pathogenic non-self invaders and orchestration of inflammatory, phagocytic, and targeted antibody-mediated neutralization.',
    relevantOrgans: ['Lymph Nodes', 'Spleen', 'Bone Marrow', 'Thymus', 'Blood Leukocytes'],
    keyTerms: [
      { term: 'Antigen', def: 'Any molecular structure recognized specifically by immune receptors or circulating antibodies.' },
      { term: 'Phagocytosis', def: 'Cellular engulfment and lysosomal enzymatic destruction of microbes by neutrophils and macrophages.' },
      { term: 'Cytokines', def: 'Signaling peptide molecules (e.g. interferons, interleukins) orchestrating inflammation and immune cell recruitment.' },
      { term: 'Antibodies (Immunoglobulins)', def: 'Y-shaped proteins produced by clonal plasma B cells that neutralize pathogens and flag them for destruction.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Pathogen Breaching & Sentinel Detection',
        description: 'When physical skin or mucosal barriers are breached, resident tissue macrophages and dendritic cells recognize foreign molecular patterns (PAMPs) via toll-like receptors.',
      },
      {
        step: 2,
        title: 'Acute Inflammation & Vascular Permeability',
        description: 'Activated sentinels release histamine, leukotrienes, and chemokines, dilating local capillaries and recruiting flowing neutrophils out of blood vessels into tissue (diapedesis).',
      },
      {
        step: 3,
        title: 'Antigen Presentation & Lymphatic Migration',
        description: 'Dendritic cells phagocytose pathogens, process antigen fragments, and migrate through lymphatic vessels to regional lymph nodes.',
      },
      {
        step: 4,
        title: 'Adaptive Clonal Selection (T & B Cells)',
        description: 'In the lymph nodes, presented antigens bind to complementary naive T helper cells, which clonally expand and stimulate specific B cells to transform into antibody-secreting plasma cells.',
      },
      {
        step: 5,
        title: 'Pathogen Elimination & Memory Cell Persistence',
        description: 'Specific antibodies neutralize toxins and opsonize microbes for destruction by cytotoxic T cells and macrophages. A subset of activated cells persists as long-lived memory cells.',
      },
    ],
  },

  {
    id: 'kidney-filtration',
    name: 'Kidney Filtration & Osmoregulation',
    icon: Droplets,
    category: 'Renal Nephrology',
    color: '#0284C7',
    bgLight: 'bg-sky-50',
    summary: 'High-pressure plasma ultrafiltration across glomerular capillaries coupled with selective tubular reabsorption and waste concentration into urine.',
    relevantOrgans: ['Kidneys', 'Nephrons', 'Glomeruli', 'Collecting Ducts', 'Ureters'],
    keyTerms: [
      { term: 'Nephron', def: 'The microscopic functional filtering unit of the kidney, with ~1 million per kidney.' },
      { term: 'Glomerular Filtration Rate (GFR)', def: 'Total volume of filtrate formed by all renal corpuscles per minute (~120 mL/min in healthy adults).' },
      { term: 'Podocytes', def: 'Specialized visceral epithelial cells wrapping glomerular capillaries with interdigitating filtration slits.' },
      { term: 'Antidiuretic Hormone (ADH / Vasopressin)', def: 'Pituitary hormone inserting aquaporin channels to retain water in collecting ducts.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Glomerular High-Pressure Ultrafiltration',
        description: 'Renal arterial blood flows into glomerular capillary tufts under high hydrostatic pressure (~55 mmHg). Water and solutes smaller than albumin filter across fenestrated endothelium and podocyte slits into Bowman\'s capsule.',
      },
      {
        step: 2,
        title: 'Proximal Tubular Obligatory Reabsorption',
        description: 'The proximal convoluted tubule rapidly reabsorbs 100% of filtered glucose and amino acids, ~65% of water and sodium, and valuable bicarbonate via active sodium-coupled co-transporters.',
      },
      {
        step: 3,
        title: 'Countercurrent Loop of Henle Concentration',
        description: 'The descending loop passively diffuses water into hypertonic renal medulla; the thick ascending limb actively pumps out sodium and chloride without water permeability, creating a steep osmotic gradient.',
      },
      {
        step: 4,
        title: 'Distal Hormonal Fine-Tuning',
        description: 'Aldosterone stimulates sodium reabsorption and potassium excretion in distal convoluted tubules, while Parathyroid Hormone (PTH) increases tubular calcium recovery.',
      },
      {
        step: 5,
        title: 'Collecting Duct Osmotic Water Recovery',
        description: 'Under the influence of ADH, aquaporin water channels open in collecting ducts, concentrating metabolic wastes (urea, creatinine) into final hypertonic urine for excretion via ureters.',
      },
    ],
  },

  {
    id: 'nerve-transmission',
    name: 'Nerve Signal Transmission',
    icon: Zap,
    category: 'Electrophysiology',
    color: '#8B5CF6',
    bgLight: 'bg-violet-50',
    summary: 'The generation of electrical action potentials along neuronal axons and chemical neurotransmitter release across synaptic junctions.',
    relevantOrgans: ['Brain', 'Spinal Cord', 'Axonal Nerve Fibers', 'Synapses', 'Neuromuscular Junctions'],
    keyTerms: [
      { term: 'Resting Membrane Potential', def: 'Electrical voltage difference (~-70 mV) across a neuronal membrane maintained by the Na+/K+ ATPase pump.' },
      { term: 'Action Potential', def: 'Rapid, all-or-none electrochemical depolarization and repolarization wave traversing axonal membranes.' },
      { term: 'Saltatory Conduction', def: 'High-speed signal leaping between unmyelinated Nodes of Ranvier in insulated axons (~100 m/s).' },
      { term: 'Synaptic Cleft', def: 'Microscopic 20 nm extracellular gap across which chemical neurotransmitters diffuse.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Resting Membrane Potential Polarized State',
        description: 'The Na+/K+ ATPase pump exports 3 Na+ ions for every 2 K+ imported, maintaining a resting intracellular charge of approximately -70 mV relative to extracellular fluid.',
      },
      {
        step: 2,
        title: 'Threshold Depolarization & Na+ Influx',
        description: 'Dendritic excitatory inputs depolarize the membrane to threshold (~-55 mV), triggering voltage-gated sodium channels to snap open and flood Na+ inward, surging potential up to +30 mV.',
      },
      {
        step: 3,
        title: 'Repolarization & K+ Efflux',
        description: 'Sodium channels inactivate while voltage-gated potassium channels open, allowing K+ to rapidly exit the cell, restoring the negative intracellular potential.',
      },
      {
        step: 4,
        title: 'Saltatory Axonal Propagation',
        description: 'In myelinated neurons, the electrical depolarization currents jump rapidly from one Node of Ranvier to the next, propagating downstream at speeds up to 100 meters per second.',
      },
      {
        step: 5,
        title: 'Synaptic Vesicle Exocytosis',
        description: 'Arrival of the action potential at the axon terminal triggers voltage-gated calcium channels to open. Ca2+ influx causes synaptic vesicles to fuse with the presynaptic membrane, releasing neurotransmitters into the synaptic cleft.',
      },
    ],
  },
];

export const getBiologicalProcessById = (id) =>
  BIOLOGICAL_PROCESSES_DATA.find((p) => p.id === id) || null;
