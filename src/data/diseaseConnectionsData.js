export const DISEASE_CONNECTIONS_DATA = [
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    organId: 'lungs',
    organName: 'Lungs & Lower Respiratory Tract',
    systemName: 'Respiratory System',
    category: 'Pulmonary Pathology',
    color: '#0D9488',
    overview:
      'An acute inflammatory condition affecting the deep pulmonary parenchyma, specifically the microscopic alveolar sacs where physiological gas exchange occurs.',
    biologicalMechanism:
      'Pathogenic microorganisms (such as Streptococcus pneumoniae or respiratory viruses) colonize distal bronchioles. The host innate immune response triggers rapid capillary vasodilation and leukocyte extravasation, filling alveolar spaces with exudative inflammatory fluid, neutrophils, and cellular debris (consolidation). This impairs oxygen diffusion and causes ventilation-perfusion mismatch.',
    diagnosticMethods: [
      'Chest Radiography (PA & Lateral X-ray): Identifies characteristic lobar or patchy infiltrative consolidation opacities.',
      'Pulse Oximetry & Blood Gas Analysis: Measures arterial oxygen saturation (SpO2) and partial pressure of oxygen (PaO2).',
      'Microbiological Sputum Gram Stain & Culture: Detects bacterial morphology and antibiotic susceptibility profiles.',
      'Serum Inflammatory Biomarkers: Evaluates C-Reactive Protein (CRP) and Procalcitonin elevation.',
    ],
  },

  {
    id: 'malaria',
    name: 'Malaria',
    organId: 'liver',
    organName: 'Red Blood Cells & Liver',
    systemName: 'Hematologic & Hepatosplenic System',
    category: 'Parasitology',
    color: '#EF4444',
    overview:
      'A mosquito-borne parasitic protozoan infection characterized by cyclic febrile paroxysms, progressive hemolytic anemia, and multi-organ microvascular sequestration.',
    biologicalMechanism:
      'Inoculated Plasmodium sporozoites migrate through the bloodstream into the liver, invading hepatocytes to undergo asexual exoerythrocytic schizogony. After days of intracellular replication, thousands of merozoites burst into the circulation, invading mature erythrocytes. Intracellular trophozoites digest host hemoglobin, producing toxic hemozoin pigment before synchronously lysing red blood cells, releasing pyrogenic antigens that induce severe systemic fever spikes.',
    diagnosticMethods: [
      'Thin & Thick Giemsa-Stained Blood Films: Gold standard light microscopy identifying intracellular ring stages, trophozoites, and species-specific gametocyte morphology.',
      'Rapid Diagnostic Tests (RDTs): Lateral flow immunochromatographic assays detecting parasite antigens (such as HRP2 or pLDH).',
      'Polymerase Chain Reaction (PCR): Molecular amplification of parasite ribosomal DNA for low-density submicroscopic infections.',
      'Complete Blood Count (CBC): Assesses hemolytic normocytic anemia and thrombocytopenia.',
    ],
  },

  {
    id: 'diabetes',
    name: 'Diabetes Mellitus',
    organId: 'stomach', // pancreatic/metabolic
    organName: 'Pancreas & Systemic Vascular Beds',
    systemName: 'Endocrine & Metabolic System',
    category: 'Endocrine Pathology',
    color: '#D97706',
    overview:
      'A chronic metabolic syndrome of disordered carbohydrate, lipid, and protein metabolism stemming from absolute insulin deficiency or peripheral insulin receptor resistance.',
    biologicalMechanism:
      'Insulin is synthesized by pancreatic beta cells within the Islets of Langerhans. In Type 1 diabetes, autoimmune destruction of beta cells causes near-total insulin deficiency. In Type 2 diabetes, peripheral tissues (skeletal muscle, adipocytes, hepatocytes) develop receptor insensitivity, preventing GLUT4 transporter translocation. Blood glucose accumulates in systemic circulation (hyperglycemia), driving non-enzymatic protein glycation, osmotic diuresis, and progressive micro- and macro-angiopathic damage to eyes, kidneys, and peripheral nerves.',
    diagnosticMethods: [
      'Glycated Hemoglobin (HbA1c): Reflects mean glycemic exposure over the circulating lifespan of red blood cells (~90–120 days).',
      'Fasting Plasma Glucose (FPG): Measures venous glucose concentration following an overnight fast of at least 8 hours.',
      'Oral Glucose Tolerance Test (OGTT): Evaluates dynamic plasma clearance 2 hours after ingestion of a standard 75g glucose load.',
      'Urinalysis: Identifies glucosuria, microalbuminuria, and ketone bodies (acetoacetate).',
    ],
  },

  {
    id: 'hypertension',
    name: 'Essential Hypertension',
    organId: 'heart',
    organName: 'Heart & Systemic Arterial Vasculature',
    systemName: 'Cardiovascular System',
    category: 'Cardiovascular Pathology',
    color: '#DC2626',
    overview:
      'A sustained pathological elevation of systemic arterial blood pressure that increases cardiac afterload and accelerates chronic vascular remodeling across vital organs.',
    biologicalMechanism:
      'Arterial blood pressure equals cardiac output multiplied by total peripheral resistance. Chronic hyperactivation of the sympathetic nervous system and the renin-angiotensin-aldosterone system (RAAS), combined with impaired renal sodium excretion and endothelial nitric oxide dysfunction, promotes chronic arteriolar vasoconstriction. Over time, high shear stress induces medial vascular hypertrophy, arterial stiffening, and concentric left ventricular myocardial hypertrophy, increasing long-term risk of stroke, myocardial infarction, and nephrosclerosis.',
    diagnosticMethods: [
      'Automated Sphygmomanometry: Standardized brachial cuff measurements utilizing validated oscillometric protocols.',
      '24-Hour Ambulatory Blood Pressure Monitoring (ABPM): Assesses diurnal circadian variation and nocturnal non-dipping patterns.',
      'Transthoracic Echocardiography: Evaluates left ventricular wall thickness, diastolic relaxation, and ejection fraction.',
      'Serum Creatinine & Estimated GFR: Screens for secondary renal target-organ damage.',
    ],
  },

  {
    id: 'hepatitis',
    name: 'Hepatitis',
    organId: 'liver',
    organName: 'Liver & Biliary Tree',
    systemName: 'Digestive & Hepatic System',
    category: 'Hepatobiliary Pathology',
    color: '#B45309',
    overview:
      'Diffuse inflammation of hepatic parenchyma resulting in hepatocyte necrosis, metabolic impairment, and potential progressive parenchymal fibrosis.',
    biologicalMechanism:
      'Whether triggered by hepatotropic viruses (HAV, HBV, HCV), alcohol metabolites, toxic xenobiotics, or autoimmune autoantibodies, inflammatory infiltrates flood liver lobules. Cytotoxic CD8+ T lymphocytes and natural killer cells target infected hepatocytes, causing ballooning degeneration, apoptotic acidophilic Councilman bodies, and architectural disruption. Swollen hepatocytes compromise bile canalicular excretion, causing conjugated bilirubin to leak into blood (jaundice) while intracellular transaminases pour into plasma.',
    diagnosticMethods: [
      'Hepatic Serum Panel: Quantifies Alanine Aminotransferase (ALT), Aspartate Aminotransferase (AST), Alkaline Phosphatase (ALP), and Total Bilirubin.',
      'Viral Serology Panels: Detects specific antigens and antibodies (HBsAg, anti-HBc IgM, anti-HCV, anti-HAV IgM).',
      'Quantitative Viral Nucleic Acid PCR: Measures circulating viral load (HBV DNA or HCV RNA).',
      'Abdominal Ultrasonography: Visualizes hepatic parenchymal echogenicity, contours, and portal vein flow velocity.',
    ],
  },

  {
    id: 'dermatitis',
    name: 'Dermatitis & Eczema',
    organId: 'skin',
    organName: 'Skin (Epidermis & Dermis)',
    systemName: 'Integumentary System',
    category: 'Dermatological Pathology',
    color: '#F43F5E',
    overview:
      'A polymorphic inflammatory skin disorder characterized by cutaneous epidermal barrier disruption, severe pruritus, and localized immune infiltration.',
    biologicalMechanism:
      'Mutations in structural epidermal proteins (such as filaggrin) or chemical lipid depletion disrupt the stratum corneum barrier. Environmental allergens and microbial antigens penetrate the damaged epidermal barrier, contacting dendritic Langerhans cells. This initiates a Type 2 helper T-cell (Th2) cytokine cascade releasing IL-4, IL-13, and IL-31. IL-31 directly stimulates cutaneous sensory nerve fibers causing intense itch, while inflammatory cytokines cause intercellular epidermal edema (spongiosis), microvesicle formation, and superficial dermal vascular engorgement.',
    diagnosticMethods: [
      'Clinical Dermoscopy: Magnified epiluminescence visualization of characteristic follicular plugs, punctate vascular patterns, and scale.',
      'Skin Patch Testing (Epicutaneous): Identifies delayed-type cell-mediated hypersensitivity reactions to specific chemical contactants.',
      'Serum Total & Specific IgE Testing: Identifies systemic atopic sensitization profiles.',
      'Histopathological Punch Biopsy: Examines spongiosis, acanthosis, and perivascular lymphocytic infiltration in complex cases.',
    ],
  },
];

export const getDiseaseConnectionById = (id) =>
  DISEASE_CONNECTIONS_DATA.find((d) => d.id === id) || null;
