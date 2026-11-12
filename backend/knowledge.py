"""
MEDISCAN AI — Biological Knowledge Base Context for AI Biology Assistant
Grounding knowledge derived from Phase 6:
- 9 Major Organs
- 10 Organ Systems
- 6 Physiological Processes
- 6 Pathophysiological Disease Case Studies
"""

BIOLOGICAL_KNOWLEDGE_CONTEXT = """
=== MEDISCAN AI BIOLOGICAL KNOWLEDGE BASE ===

[1. NINE MAJOR ORGANS]
1. Brain (Encephalon) - Nervous System (Cranial Cavity)
   Functions: Sensory processing, voluntary motor control, cognition, autonomic vital regulation (brainstem), neuroendocrine secretion (hypothalamus).
   Processes: Synaptic neurotransmission (GABA, glutamate, dopamine), synaptic plasticity, CSF ventricular circulation, cerebral glucose metabolism (~20% resting energy).
   Conditions: Ischemic Stroke, Alzheimer's/Parkinson's, Epilepsy, Migraine.

2. Heart (Cor) - Cardiovascular System (Thoracic Cavity / Mediastinum)
   Functions: 4-chambered muscular pump driving systemic and pulmonary circulation, arterial pressure maintenance, ANP endocrine secretion.
   Processes: Cardiac conduction (SA node -> AV node -> bundle of His -> Purkinje fibers), cardiac cycle (systole/diastole), coronary myocardial perfusion.
   Conditions: Coronary Artery Disease, Myocardial Infarction, Heart Failure, Atrial Fibrillation.

3. Lungs (Pulmones) - Respiratory System (Thoracic Cavity)
   Functions: Gas exchange (O2 uptake & CO2 elimination), acid-base balance via carbonic acid buffering, pulmonary surfactant synthesis, ACE enzyme conversion.
   Processes: Alveolar-capillary diffusion across 0.5-micron membrane, ventilatory mechanics (diaphragm and intercostal contractions), pulmonary perfusion.
   Conditions: Pneumonia, COPD / Emphysema, Asthma, Pulmonary Embolism.

4. Liver (Hepar) - Digestive & Metabolic System (Right Upper Abdomen)
   Functions: Gluconeogenesis, glycogen storage, plasma protein synthesis (albumin, clotting factors), xenobiotic detoxification via Cytochrome P450, bile synthesis.
   Processes: First-pass portal metabolism, bile acid conjugation, urea cycle (ammonia -> urea), cholesterol lipid homeostasis.
   Conditions: Viral Hepatitis, Cirrhosis, Non-Alcoholic Fatty Liver Disease (NAFLD/NASH), Hepatic Encephalopathy.

5. Stomach (Gaster) - Digestive System (Left Upper Abdomen)
   Functions: Food mechanical churning, chemical proteolysis via pepsin & gastric HCl, intrinsic factor secretion for vitamin B12 absorption.
   Processes: Parietal cell H+/K+ ATPase acid secretion, mucosal bicarbonate shielding, gastric motility peristalsis, chyme delivery to duodenum.
   Conditions: Peptic Ulcer Disease, Gastroesophageal Reflux Disease (GERD), Gastritis, Helicobacter pylori infection.

6. Kidneys (Renes) - Urinary System (Retroperitoneal / Posterior Abdomen)
   Functions: Glomerular ultrafiltration (~180 L/day), fluid & electrolyte balance (Na+, K+, HCO3-), acid-base regulation, erythropoietin (EPO) & renin secretion.
   Processes: Glomerular filtration, proximal tubular reabsorption, countercurrent multiplication in loop of Henle, aldosterone/ADH collecting duct water recovery.
   Conditions: Chronic Kidney Disease (CKD), Acute Kidney Injury (AKI), Nephrolithiasis (kidney stones), Glomerulonephritis.

7. Intestines (Small & Large) - Digestive System (Abdominal & Pelvic Cavities)
   Functions: Enzymatic digestion, microvillar nutrient absorption, water/electrolyte reabsorption, gut microbiome fermentation, immune surveillance (Peyer's patches).
   Processes: Enterocyte active/passive transport, segmental segmentation and migrating motor complexes, mucosal secretory IgA immune shielding.
   Conditions: Inflammatory Bowel Disease (Crohn's/Colitis), Celiac Disease, Irritable Bowel Syndrome (IBS), Colorectal Polyps.

8. Skin (Cutis) - Integumentary System (External Surface)
   Functions: Mechanical, microbial, and chemical barrier, thermoregulation (eccrine sweating, dermal perfusion), tactile sensation, Vitamin D3 photolysis.
   Processes: Keratinocyte stratification, melanogenesis UV shielding, transepidermal water barrier maintenance, wound repair re-epithelialization.
   Conditions: Atopic Dermatitis / Eczema, Melanoma & Non-melanoma skin cancer, Psoriasis, Contact Dermatitis.

9. Bones (Skeleton) - Skeletal System (Axial and Appendicular Skeleton)
   Functions: Rigid structural framework, vital organ protection, muscle lever attachment, mineral reservoir (~99% bodily calcium, phosphate), hematopoiesis.
   Processes: Coupled osteoclast resorption and osteoblast bone formation, medullary hematopoiesis producing RBCs/WBCs/platelets, PTH/calcitonin calcium balance.
   Conditions: Osteoporosis, Osteoarthritis, Pathological Fractures, Osteomalacia / Rickets.

[2. TEN ORGAN SYSTEMS]
- Nervous: Rapid electrical and chemical neurotransmitter signal transmission; sensory detection and motor execution.
- Cardiovascular: Closed loop distributing oxygen, nutrients, hormones, and heat to systemic tissues.
- Respiratory: Inhaled O2 distribution and CO2 expiration across alveolar surfaces.
- Digestive: Breakdown of macronutrients into bioavailable amino acids, monosaccharides, and fatty acids.
- Urinary: Continuous blood filtration, nitrogenous waste elimination, fluid volume and electrolyte homeostasis.
- Integumentary: First line of physical and immunological defense, sensory mechanoreception, thermoregulation.
- Skeletal: Mechanical protection, leverage for locomotion, primary mineral reservoir and blood cell manufacturing.
- Muscular: Skeletal, cardiac, and smooth muscle contractile power converting ATP into mechanical force.
- Endocrine: Ductless glandular hormone secretion directing metabolic homeostasis and developmental growth.
- Immune & Lymphatic: Innate cellular defenses, adaptive antibody/T-cell responses, fluid balance and lymph drainage.

[3. SIX BIOLOGICAL PROCESSES]
1. Blood Circulation: Ventricular contraction pumps deoxygenated blood to lungs via pulmonary arteries; re-oxygenated blood returns to left heart and is pumped via the aorta to systemic capillary beds.
2. Respiration & Gas Exchange: Negative intrathoracic pressure draws ambient air into alveoli; passive diffusion drives O2 into pulmonary capillaries bound to hemoglobin while CO2 diffuses out.
3. Digestion & Nutrient Absorption: Enzymatic breakdown (amylases, proteases, lipases) in mouth, stomach, and duodenum, followed by active transport through enterocyte microvilli into portal circulation.
4. Immune Response: Innate pathogen recognition (macrophages, neutrophils) triggers inflammatory cytokines; dendritic cells present antigens to activate specific CD4+/CD8+ T-cells and antibody-producing B-cells.
5. Kidney Filtration: High hydrostatic pressure filters blood in the glomerulus; proximal tubules and loops of Henle reabsorb essential water and ions, excreting urea and waste through the ureters as urine.
6. Action Potential & Nerve Transmission: Stimulus depolarizes axon membrane above threshold (-55 mV), triggering rapid voltage-gated Na+ influx, propagated saltatory conduction, and calcium-mediated neurotransmitter exocytosis at synapses.

[4. SIX DISEASE PATHOLOGY CASE STUDIES]
1. Pneumonia: Microorganisms colonize distal airways; inflammatory leukocyte infiltration and exudative fluid consolidate alveolar airspaces, causing severe ventilation-perfusion mismatch and hypoxemia. Diagnostics: Chest X-ray opacities, pulse oximetry, sputum culture, CRP.
2. Malaria: Plasmodium sporozoites invade hepatocytes, undergoing schizogony before releasing thousands of merozoites that invade and destroy erythrocytes, producing toxic hemozoin and cyclic febrile paroxysms. Diagnostics: Giemsa thin/thick blood smears, antigen RDTs, PCR.
3. Diabetes Mellitus: Absolute insulin deficiency (Type 1) or peripheral insulin receptor resistance with progressive beta-cell dysfunction (Type 2) prevents cellular glucose uptake, leading to hyperglycemia, microvascular damage, and metabolic dysregulation. Diagnostics: Fasting plasma glucose, HbA1c, oral glucose tolerance test.
4. Hypertension: Chronic arterial vasoconstriction, vascular remodeling, and elevated total peripheral resistance force the left ventricle to pump against high afterload, predisposing to hypertrophy, stroke, and nephropathy. Diagnostics: Automated ambulatory blood pressure monitoring (ABPM).
5. Hepatitis: Inflammatory necrosis of hepatocytes caused by viruses (A/B/C) or toxins impairs bile clearance, glycogen storage, and clotting factor synthesis, presenting with jaundice and transaminitis. Diagnostics: Serum ALT/AST transaminases, viral serology (HBsAg, Anti-HCV), liver ultrasound.
6. Dermatitis: Disruption of stratum corneum lipid barrier allows allergen/irritant penetration; dendritic Langerhans cells activate Th2/Th1 immune cytokines, provoking spongiosis, epidermal hyperplasia, erythema, and pruritus. Diagnostics: Clinical dermatological exam, patch allergy testing, skin punch biopsy.
"""
