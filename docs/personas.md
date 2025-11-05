# Personas & Learning Paths

This *Train-the-Trainer* curriculum supports multiple learner roles within OHDSI.  
Each persona has aligned goals, focus areas, and suggested exercises using materials in this site — including code snippets, cheat sheets, and curated references.

!!! note
    For background on learner personas in **OHDSI** and **Real-World Evidence** education, see the [**STARDUSTT approach**](https://alstdi.github.io/ALS-RWE/stardustt-approach/).

---

## 🧬 Vocabulary / Terminology Experts

**Goal:**  
Strengthen understanding of OMOP standardized vocabularies and mapping workflows; teach others how to interpret concepts and relationships.

**Focus Weeks:**  
- **Week 1:** OMOP CDM and Athena Vocabulary Exploration  
- **Week 2:** Concept Set Development in Atlas  
- **Week 3:** Cohort Characterization (vocabulary influence on cohorts)

**Core Tools:**  
Athena · Atlas Concept Sets and Cohort Definitions  

**Hands-on Materials:**  
- [Vocabulary & SQL Cheat Sheet](common_artifacts/omop-vocab-sql-cheat-sheet.md)  
- [Day 1 Code Snippets](../exercises/code_snippets/day-01-snippets.md)  
- [Athena Vocabulary Exploration Exercise](../exercises/day-01-athena-cdm.md)

**Side Exercise Ideas:**  
- Identify standard vs non-standard concepts in Athena.  
- Create a concept set using both SNOMED and ICD vocabularies.  
- Document “Maps to” and “Is a” relationships using the cheat sheet.  

---

## 📊 Statisticians / Study Design Analysts

**Goal:**  
Relate OHDSI tools to epidemiologic validity, confounding control, and study design transparency.

**Focus Weeks:**  
- **Week 3:** Cohort Definition & Characterization  
- **Week 5:** Treatment Pathway Analysis *(optional)*  
- **Week 6:** Advanced Analytics with HADES *(optional)*

**Core Tools:**  
ATLAS Characterization · Pathway Analysis · HADES (Characterization / Estimation / Prediction)

**Hands-on Materials:**  
- [Cohort Characterization Exercise](../exercises/day-03-cohorts.md)  
- [Treatment Pathway Exercise](../exercises/day-05-pathways-optional.md)  
- [HADES Overview](../exercises/day-06-hades-optional.md)

**Side Exercise Ideas:**  
- Critique a cohort definition for bias or misclassification.  
- Design an analysis plan using HADES packages.  
- Discuss how cohort design choices influence confounding control.  

---

## 🧑‍💻 Data Analysts / Engineers (SQL-Oriented)

**Goal:**  
Emphasize reproducibility and programmatic access to OMOP data.

**Focus Weeks:**  
- **Week 1–2:** Vocabulary and Concept Sets  
- **Week 3–4:** Cohort Creation and SEARCH Extraction  
- **Week 6:** Optional HADES Analytics

**Core Tools:**  
SQL client · Atlas exports · SEARCH · DatabaseConnector · FeatureExtraction

**Hands-on Materials:**  
- [SQL Validation Mini Lab](../common_artifacts/sql-validation-mini-lab.md)  
- [OMOP SQL Examples](../common_artifacts/omop-sql-examples.md)  
- [Code Snippets](../exercises/code_snippets/day-01-snippets.md)

**Side Exercise Ideas:**  
- Recreate a concept-based query from the code snippet file.  
- Automate a cohort export and validation script.  
- Compare query results before and after applying “Maps to” logic.  

---

## 🩺 Clinicians / Clinical Researchers

**Goal:**  
Use Atlas for rapid cohort discovery and interpretation; connect clinical reasoning to standardized data.

**Focus Weeks:**  
- **Week 1:** Understanding OMOP Domains & Vocabulary Concepts  
- **Week 3:** Building and Characterizing Cohorts  
- **Week 4:** Reviewing Extracted Data Summaries

**Core Tools:**  
Athena (concept interpretation) · Atlas Cohort Editor · Characterization reports

**Hands-on Materials:**  
- [Atlas Review Exercise](../exercises/atlas_review_exercise.md)  
- [Cohort Characterization Exercise](../exercises/day-03-cohorts.md)

**Side Exercise Ideas:**  
- Define inclusion/exclusion criteria for a clinical condition cohort.  
- Interpret baseline characteristics from the Characterization report.  
- Reflect on how vocabulary precision affects clinical plausibility.  

---

## 🧑‍🏫 Trainers / Facilitators (Meta-Persona)

**Goal:**  
Integrate technical and clinical perspectives; guide sessions effectively across personas.

**Focus Weeks:**  
All weeks (serve as facilitators and reviewers)

**Core Competencies:**  
Adult learning principles · GitHub workflow for shared materials · Discussion facilitation

**Recommended External Resources:**  
- [ELIXIR-Exelerate Train the Trainer GitHub Repository: Training Guidelines](https://github.com/TrainTheTrainer/ELIXIR-EXCELERATE-TtT) – Best practices for training and FAIR data principles    
- [Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/) – Reference chapters for technical and conceptual grounding  

**Facilitation Ideas:**  
- Lead a group discussion using Day 1 exercises.  
- Invite learners to annotate SQL or vocabulary examples with their domain knowledge.  
- Use collaboration tools to collect questions and reflections, then contribute improvements back to training materials.  
---

*Use these personas as guides for tailoring discussions, weekly exercises, and assignments throughout the six-week OHDSI Train-the-Trainer program.*
