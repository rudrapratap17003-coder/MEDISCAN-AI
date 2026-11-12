export const ORGANS_DATA = {
  brain: {
    id: 'brain',
    name: 'Brain',
    latinName: 'Encephalon',
    system: 'Nervous System',
    systemId: 'nervous',
    color: '#8B5CF6', // violet
    region: 'Cranial Cavity',
    view: 'both',
    summary: 'The central command hub of the nervous system, coordinating sensory perception, motor control, cognition, emotion, and autonomic homeostasis.',
    functions: [
      'Processes sensory inputs from visual, auditory, tactile, and chemical receptors',
      'Generates voluntary motor commands via motor cortex and pyramidal tracts',
      'Coordinates executive functions, reasoning, memory retention, and language',
      'Regulates essential autonomic vitals (heart rate, respiration) via the brainstem',
      'Secretes regulatory neurohormones through the hypothalamic-pituitary axis',
    ],
    systemConnection:
      'Directly links to the spinal cord and peripheral nervous system through cranial nerves and descending motor pathways, communicating instantaneously via electrical action potentials and chemical neurotransmitters.',
    biologicalProcesses: [
      'Synaptic transmission and neurotransmitter cycling (GABA, glutamate, dopamine)',
      'Neuroplastic synaptic remodeling and long-term potentiation (memory formation)',
      'Cerebrospinal fluid (CSF) ventricular circulation and metabolic glymphatic clearance',
      'Cerebral glucose metabolism consuming ~20% of resting bodily energy',
    ],
    conditions: [
      'Ischemic Stroke & Transient Ischemic Attack (cerebral arterial occlusion)',
      'Neurodegenerative Disorders (Alzheimer\'s disease, Parkinson\'s disease)',
      'Epilepsy & Seizure Disorders (paroxysmal hypersynchronous cortical firing)',
      'Migraine & Tension Cephalalgia (neurovascular trigeminal sensory sensitization)',
    ],
  },

  heart: {
    id: 'heart',
    name: 'Heart',
    latinName: 'Cor',
    system: 'Cardiovascular System',
    systemId: 'cardiovascular',
    color: '#EF4444', // red
    region: 'Thoracic Cavity (Mediastinum)',
    view: 'front',
    summary: 'A four-chambered muscular pump producing continuous hydrostatic pressure to circulate oxygenated and deoxygenated blood through closed vascular networks.',
    functions: [
      'Pumps deoxygenated systemic venous blood into the pulmonary circulation for gas exchange',
      'Propels newly oxygenated pulmonary venous blood through the aorta into systemic tissues',
      'Maintains physiological arterial blood pressure across systemic vascular beds',
      'Secretes endocrine peptides (such as Atrial Natriuretic Peptide / ANP) to balance fluid volume',
    ],
    systemConnection:
      'Acts as the hydraulic nucleus of the cardiovascular system, receiving autonomic inputs from sympathetic and parasympathetic (vagus) nerve fibers to dynamically adjust cardiac output to metabolic demands.',
    biologicalProcesses: [
      'Cardiac conduction cycle initiated spontaneously by the sinoatrial (SA) pacemaker node',
      'Myocardial excitation-contraction coupling driven by intracellular calcium transients',
      'Systolic ventricular ejection against systemic vascular resistance',
      'Diastolic coronary arterial perfusion during ventricular relaxation',
    ],
    conditions: [
      'Coronary Artery Disease & Myocardial Infarction (atherosclerotic plaque rupture)',
      'Hypertensive Cardiomyopathy (concentric left ventricular hypertrophy)',
      'Heart Failure with reduced or preserved ejection fraction (HFpEF / HFrEF)',
      'Arrhythmias (such as Atrial Fibrillation and Ventricular Tachycardia)',
    ],
  },

  lungs: {
    id: 'lungs',
    name: 'Lungs',
    latinName: 'Pulmones',
    system: 'Respiratory System',
    systemId: 'respiratory',
    color: '#0D9488', // teal
    region: 'Thoracic Cavity (Pleural Spaces)',
    view: 'front',
    summary: 'Paired spongy respiratory organs containing hundreds of millions of microscopic alveoli specialized for rapid diffusion of oxygen into blood and carbon dioxide clearance.',
    functions: [
      'Facilitates passive passive oxygen diffusion across thin alveolar-capillary membranes',
      'Eliminates carbon dioxide (CO2), regulating whole-body acid-base balance (blood pH)',
      'Produces pulmonary surfactant to decrease alveolar surface tension and prevent atelectasis',
      'Houses pulmonary vascular endothelium converting Angiotensin I to Angiotensin II (ACE)',
    ],
    systemConnection:
      'Tightly coupled with the right ventricle via the pulmonary trunk and with the brainstem respiratory centers that continuously adjust ventilation rate based on arterial blood gas chemo-detection.',
    biologicalProcesses: [
      'Negative pressure thoracic ventilation driven by diaphragmatic contraction',
      'Fickian gas diffusion across a 0.2–0.5 micrometer respiratory blood-air barrier',
      'Mucociliary clearance sweeping inhaled particulates toward the oropharynx',
      'Ventilation-perfusion (V/Q) matching optimizing blood oxygen saturation',
    ],
    conditions: [
      'Pneumonia (alveolar consolidation from bacterial, viral, or fungal pathogens)',
      'Chronic Obstructive Pulmonary Disease (COPD: chronic bronchitis & emphysema)',
      'Asthma (bronchial hyperreactivity, mucosal edema, and smooth muscle bronchospasm)',
      'Pulmonary Embolism (thromboembolic obstruction of pulmonary arterial branches)',
    ],
  },

  liver: {
    id: 'liver',
    name: 'Liver',
    latinName: 'Hepar',
    system: 'Digestive System',
    systemId: 'digestive',
    color: '#B45309', // amber/brown
    region: 'Right Upper Abdomen (Right Hypochondrium)',
    view: 'front',
    summary: 'The primary metabolic and biochemical processing organ, executing hundreds of enzymatic functions including macronutrient metabolism, bile synthesis, and toxic substance biotransformation.',
    functions: [
      'Synthesizes bile acids and alkaline secretions essential for intestinal lipid emulsification',
      'Metabolizes and buffers blood glucose into glycogen storage (glycogenesis/glycogenolysis)',
      'Synthesizes essential plasma proteins (albumin, fibrinogen, prothrombin, clotting factors)',
      'Detoxifies xenobiotics, alcohol, and ammonia (converted to urea via the ornithine cycle)',
      'Stores fat-soluble vitamins (A, D, E, K), vitamin B12, and ferritin (iron storage)',
    ],
    systemConnection:
      'Receives dual blood supplies: nutrient-rich venous blood directly from intestines via the hepatic portal vein, and oxygenated blood via the hepatic artery, filtering through liver sinusoids before returning to the heart.',
    biologicalProcesses: [
      'Cytochrome P450 phase I oxidation and phase II conjugation xenobiotic breakdown',
      'Hepatic gluconeogenesis generating glucose from amino acids and lactate',
      'Bile excretion into biliary canaliculi for gall bladder storage',
      'Kupffer cell reticuloendothelial phagocytosis clearing senescent cells and endotoxins',
    ],
    conditions: [
      'Viral Hepatitis (types A, B, C causing inflammatory hepatocyte necrosis)',
      'Non-Alcoholic Fatty Liver Disease (NAFLD / MASH steatohepatitis)',
      'Cirrhosis & Portal Hypertension (end-stage fibrous architectural remodeling)',
      'Toxic Drug-Induced Liver Injury (such as acetaminophen-mediated oxidative toxicity)',
    ],
  },

  stomach: {
    id: 'stomach',
    name: 'Stomach',
    latinName: 'Gaster',
    system: 'Digestive System',
    systemId: 'digestive',
    color: '#D97706', // orange/amber
    region: 'Left Upper Abdomen (Epigastrium)',
    view: 'front',
    summary: 'A muscular J-shaped digestive reservoir that initiates protein catabolism and mechanical maceration using hydrochloric acid and proteolytic pepsin enzymes.',
    functions: [
      'Mechanically mixes and grinds swallowed food boluses into liquid chyme',
      'Secretes concentrated hydrochloric acid (HCl, pH ~1.5–2.0) to denature proteins and kill ingested microbes',
      'Secretes pepsinogen, activated by acid into pepsin for initial protein peptide cleavage',
      'Produces gastric intrinsic factor, indispensable for distal ileal absorption of Vitamin B12',
    ],
    systemConnection:
      'Connects the esophagus to the duodenum, receiving parasympathetic vagal stimulation that drives gastric motility and acid secretion while communicating satiety signals to the hypothalamus.',
    biologicalProcesses: [
      'Parietal cell proton pumping (H+/K+ ATPase) producing hydrochloric acid',
      'Mucus-bicarbonate cytoprotective gel layer defending epithelial mucosa against autodigestion',
      'Peristaltic mixing waves propelling chyme through the regulated pyloric sphincter',
      'Neurohormonal gastrin and histamine signaling modulating digestive tempo',
    ],
    conditions: [
      'Peptic Ulcer Disease (gastric mucosal ulcerations frequently linked to H. pylori or NSAIDs)',
      'Gastroesophageal Reflux Disease (acid regurgitation across lower esophageal sphincter)',
      'Acute and Chronic Gastritis (mucosal inflammation from chemical, auto-immune, or stress triggers)',
      'Gastric Motility Disorders (such as diabetic gastroparesis)',
    ],
  },

  kidneys: {
    id: 'kidneys',
    name: 'Kidneys',
    latinName: 'Renes',
    system: 'Urinary System',
    systemId: 'urinary',
    color: '#0284C7', // sky blue
    region: 'Retroperitoneal Abdomen (T12–L3 Levels)',
    view: 'both',
    summary: 'Paired bean-shaped filtering organs that continuously cleanse blood of nitrogenous wastes, regulate systemic fluid balance, maintain electrolyte equilibrium, and stabilize arterial blood pressure.',
    functions: [
      'Filters ~180 liters of blood plasma daily through 2 million functional nephron units',
      'Excretes nitrogenous metabolic wastes (urea, creatinine, uric acid) and foreign toxins in urine',
      'Maintains extracellular volume, systemic osmolarity, and electrolyte levels (Na+, K+, Cl-, HCO3-)',
      'Secretes erythropoietin (EPO) to stimulate bone marrow red blood cell production',
      'Activates 25-hydroxyvitamin D into calcitriol (1,25-(OH)2D3) to govern calcium homeostasis',
      'Secretes renin to drive the renin-angiotensin-aldosterone system (RAAS) for blood pressure control',
    ],
    systemConnection:
      'Receives approximately 20–25% of total resting cardiac output through renal arteries; drains filtered waste as urine via bilateral ureters into the urinary bladder.',
    biologicalProcesses: [
      'Glomerular ultrafiltration driven by renal arteriolar hydrostatic and oncotic pressures',
      'Proximal tubular active reabsorption recovering glucose, amino acids, and bicarbonate',
      'Countercurrent multiplication in the Loop of Henle establishing medullary osmotic gradients',
      'Distal tubule and collecting duct fine-tuning guided by Antidiuretic Hormone (ADH) and Aldosterone',
    ],
    conditions: [
      'Acute Kidney Injury (rapid decline in glomerular filtration rate / GFR)',
      'Chronic Kidney Disease (progressive glomerulosclerosis and tubular atrophy)',
      'Nephrolithiasis (kidney stone formation from calcium oxalate, uric acid, or struvite crystals)',
      'Glomerulonephritis (immune complex deposition and glomerular basement membrane injury)',
    ],
  },

  intestines: {
    id: 'intestines',
    name: 'Intestines',
    latinName: 'Intestina',
    system: 'Digestive System',
    systemId: 'digestive',
    color: '#F59E0B', // amber
    region: 'Abdominal and Pelvic Cavities',
    view: 'front',
    summary: 'Comprising the small intestine (duodenum, jejunum, ileum) and large intestine (colon, cecum, rectum), responsible for enzymatic hydrolysis, nutrient uptake, water reabsorption, and microbiome symbiosis.',
    functions: [
      'Small Intestine: Finishes enzymatic breakdown and absorbs carbohydrates, peptides, lipids, and vitamins',
      'Dramatically expands absorptive surface area (~30 m²) through microscopic circular folds, villi, and microvilli',
      'Large Intestine: Reabsorbs water, sodium, and potassium, compacting indigestible matter into solid stool',
      'Houses trillions of commensal gut microbes that ferment fibers and produce Vitamin K and short-chain fatty acids',
      'Presents the largest immune surface in the body (Gut-Associated Lymphoid Tissue / GALT and Peyer’s patches)',
    ],
    systemConnection:
      'Connected upstream to the stomach and downstream to the rectum; communicates with the brain via the "gut-brain axis" through the vagus nerve, enteric nervous system (ENS), and circulating microbiome metabolites.',
    biologicalProcesses: [
      'Brush-border enzyme hydrolysis of disaccharides and oligopeptides',
      'Micellar passive and active lipid transport into lymphatic lacteals (chylomicrons)',
      'Segmental contractions and migrating motor complex (MMC) peristalsis propelling luminal contents',
      'Colonic microbial anaerobic fermentation yielding butyrate, propionate, and acetate',
    ],
    conditions: [
      'Inflammatory Bowel Disease (Crohn’s disease & Ulcerative Colitis)',
      'Irritable Bowel Syndrome (IBS: visceral hypersensitivity and altered motility)',
      'Celiac Disease (autoimmune enteropathy triggered by dietary gluten)',
      'Gastrointestinal Infections (bacterial enteritis, viral gastroenteritis, parasitic amoebiasis)',
    ],
  },

  skin: {
    id: 'skin',
    name: 'Skin',
    latinName: 'Cutis',
    system: 'Integumentary System',
    systemId: 'integumentary',
    color: '#F43F5E', // rose
    region: 'External Anatomical Boundary (Whole Body)',
    view: 'both',
    summary: 'The human body\'s largest organ, serving as a dynamic multi-layered protective barrier between internal physiological systems and the external environment.',
    functions: [
      'Mechanical and microbial defense against physical abrasion, pathogens, and chemical irritants',
      'Thermoregulation via dermal vasodilation/vasoconstriction and eccrine sweat evaporative cooling',
      'Prevents lethal dehydration by minimizing transepidermal water loss (TEWL)',
      'Sensory perception of touch, vibration, temperature, and nociceptive pain via cutaneous receptors',
      'Initiates cholecalciferol (Vitamin D3) photochemical synthesis upon solar UV-B exposure',
    ],
    systemConnection:
      'Constantly interacts with the immune system through epidermal Langerhans cells, the nervous system via dense sensory afferents, and the cardiovascular system via expansive dermal capillary loops.',
    biologicalProcesses: [
      'Epidermal keratinocyte differentiation and continuous stratum corneum desquamation (~28-day turnover)',
      'Melanocyte melanin synthesis and supranuclear cap transfer shielding nuclear DNA from UV radiation',
      'Cutaneous wound healing stages: hemostasis, inflammation, fibroblastic proliferation, and remodeling',
      'Sebaceous gland lipid secretion producing protective acidic antimicrobial surface films (acid mantle)',
    ],
    conditions: [
      'Atopic Dermatitis & Contact Eczema (cutaneous barrier breakdown and pruritic immune infiltration)',
      'Psoriasis (accelerated keratinocyte proliferation driven by IL-17/IL-23 cytokine signaling)',
      'Skin Neoplasms (Basal Cell Carcinoma, Squamous Cell Carcinoma, Melanoma)',
      'Acne Vulgaris (follicular hyperkeratinization, sebum excess, and Cutibacterium acnes inflammation)',
    ],
  },

  bones: {
    id: 'bones',
    name: 'Bones & Skeleton',
    latinName: 'Systema Skeleton',
    system: 'Skeletal System',
    systemId: 'skeletal',
    color: '#64748B', // slate
    region: 'Axial and Appendicular Skeleton',
    view: 'both',
    summary: 'A dynamic, living osteological framework comprising 206 bones that provides mechanical rigidity, shields vital organs, anchors skeletal muscle levers, and acts as a major mineral reservoir.',
    functions: [
      'Provides structural framework defining bodily contours and opposing gravity',
      'Shields vulnerable internal organs (cranium protects brain; ribcage protects heart and lungs)',
      'Enables coordinated locomotion by providing lever attachments for contracting skeletal muscles',
      'Serves as the body\'s primary reservoir for calcium (~99%) and phosphate ions',
      'Accommodates red bone marrow where continuous hematopoiesis generates all blood cell lineages',
    ],
    systemConnection:
      'Articulates with skeletal muscles across synovial joints; hormonal endocrine cross-talk involves parathyroid hormone (PTH) and calcitonin directing continuous osteoclast and osteoblast remodeling.',
    biologicalProcesses: [
      'Continuous bone remodeling: osteoclastic bone resorption coupled with osteoblastic bone formation',
      'Medullary hematopoiesis producing erythrocytes, leukocytes, and platelets',
      'Endochondral and intramembranous ossification during skeletal growth and fracture repair',
      'Endocrine signaling via osteocalcin influencing glucose metabolism and energy expenditure',
    ],
    conditions: [
      'Osteoporosis (diminished bone mineral density and microarchitectural deterioration)',
      'Osteoarthritis (progressive degenerative degradation of articular synovial cartilage)',
      'Traumatic and Pathological Fractures (structural discontinuity under excessive mechanical strain)',
      'Osteomalacia & Rickets (inadequate bone mineralization due to severe Vitamin D or calcium deficiency)',
    ],
  },
};

export const getOrganById = (id) => ORGANS_DATA[id] || null;
export const getAllOrgans = () => Object.values(ORGANS_DATA);
export const ANATOMY_ORGANS_DATA = ORGANS_DATA;
