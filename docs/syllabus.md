# 📚 Syllabus — OHDSI Train-the-Trainer (6-Week Core + Optional Modules)

This master syllabus outlines the **required readings, tools, and assignments** for the six-week OHDSI Train-the-Trainer program, along with **optional advanced modules** for continued professional development.  
The program bridges Epic Clarity experience with OMOP/OHDSI skills through both GUI-based (Atlas, Athena) and SQL-based (Databricks, DBeaver) learning.

---

## A) Core Six-Week Syllabus (Required)

> 💡 Tip: Chapters refer to the [Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/).  
> For broader context on data sources and study design, see the [RWD Guide](https://rwd.guide/).

| **Week / Day** | **Focus** | **Primary Readings / Viewings** | **Tools & Docs** | **Homework / Follow-up** |
|-----------------|------------|---------------------------------|------------------|---------------------------|
| **Day 0 – Environment Setup** | Verify access and installations | OHDSI.org – [Who We Are](https://www.ohdsi.org/who-we-are/) · OHDSI Forum “Introduce Yourself” | [Environment Checklist Template](common_artifacts/environment-checklist-template.md) · ATLAS login · SQL client setup (Databricks / DBeaver) | Complete environment checklist · Test CDM connection and ATLAS login |
| **Week 1 – OMOP CDM & Athena Vocabulary Exploration** | Understand CDM structure and vocabularies | *Book of OHDSI* Ch. 4 **The Common Data Model** (§ 4.1 Design Principles · 4.2 Data Model Conventions · 4.3 CDM Standardized Tables); Ch. 5 **Standardized Vocabularies** (§ 5.1 Why Vocabularies and Why · 5.2 Concepts · 5.3 Relationships · 5.4 Hierarchy) | [Athena Browser](https://athena.ohdsi.org/) · Example CDM ERD | Identify standard and non-standard concepts in Athena · Document mappings (`Maps to`, `Is a`, `Has ancestor`) |
| **Week 2 – Concept Sets in Atlas & Introduction to Data Quality Concepts (with SQL Validation)** | Build concept sets in Atlas and validate them using SQL tools | *Book of OHDSI* Ch. 4 (Data Quality Concepts Overview) | Atlas Concept Sets · SQL Clients (Databricks / DBeaver) · [OMOP SQL Examples](common_artifacts/omop-sql-examples.md) | Export Atlas SQL for concept sets · Run and validate logic in Databricks/DBeaver · Reflect on vocabulary mapping and data quality concepts |
| **Week 3 – Cohort Definition & Characterization with ATLAS (SQL Exploration)** | Design and characterize cohorts; explore cohort SQL | *Book of OHDSI* Ch. 19 (Study Steps) | ATLAS Cohort Editor · Characterization Module · SQL Clients | Export cohort SQL from Atlas · Annotate key joins and logic in SQL client · Compare table usage across OMOP domains |
| **Week 4 – Data Extraction with SEARCH & SQL Validation** | Retrieve OMOP data for analysis and cross-check results | *Book of OHDSI* Ch. 3 (ETL Processes) | SEARCH Tool · Databricks / DBeaver · [OMOP SQL Examples](common_artifacts/omop-sql-examples.md) | Re-run SEARCH extraction SQL manually in Databricks/DBeaver · Validate counts and compare results |
| **Week 5 – Treatment Pathway Analysis (Optional)** | Sequence treatments and visualize pathways | *Book of OHDSI* Ch. 12 (Estimation) | ATLAS Pathways · Pathway Analysis Docs | Generate and interpret pathway plots · Summarize one analytical insight |
| **Week 6 – Advanced Analytics with HADES (Optional)** | Characterization / Estimation / Prediction pipelines | *Book of OHDSI* Ch. 13 (Prediction) & Ch. 14 (HADES) | [HADES R Packages](https://ohdsi.github.io/Hades/) | Execute a small HADES workflow and report diagnostics |

---

## B) Optional / Advanced Modules (Beyond 6 Weeks)

These modules are not part of the six-week course but can be assigned for continued self-study.

| **Module #** | **Topic** | **Primary Readings** | **Key Tools / Docs** | **Optional Context / Use Case** |
|---------------|-----------|----------------------|----------------------|----------------------------------|
| **7. Team Building & Project Management** | Cross-functional teamwork in OHDSI | *Book of OHDSI* Ch. 15 (Community) | GitHub best practices · Agile boards | Managing multi-site collaborations |
| **8. Advanced Topics** | ML, NLP, FHIR, unstructured data | *Book of OHDSI* Ch. 14 (HADES) | NOTE_NLP · FHIR mapping guides | Extending OMOP to AI and interoperability |
| **9. Train-the-Trainer Skills** | Adult learning and facilitation | Adult learning primers · Presentation skills | EXCELERATE TtT materials | Designing your own institutional training program |
| **10. Capstone Project** | End-to-end practice study | Revisit Ch. 12, 13, 19 | ATLAS export → SQL / R | Present a mini reproducible study |
| **11. Wrap-Up & Next Steps** | Sustaining engagement | *Book of OHDSI* Ch. 15 (Community) | OHDSI Workgroups Directory | Join or lead community workgroups |
| **12. Refresher (3-Month Post-Course)** | Review and updates | *Book of OHDSI* Ch. 19 (Study Steps) | Latest OHDSI release notes | Continuing learning & updates |

---

## C) Persona-Based Study Paths (Quick Reference)

| **Persona** | **Core Modules** | **Key Tools** | **Suggested Extras** |
|--------------|------------------|---------------|----------------------|
| **Vocabulary / Terminology Experts** | Weeks 1–3 | Athena · Atlas Concept Sets · SQL Clients (Databricks/DBeaver) | White Rabbit / Rabbit-in-a-Hat |
| **Statisticians / Design Analysts** | Weeks 3–6 (optional) | Atlas Pathways · HADES · SQL review of outputs | RWD Guide (bias/confounding) |
| **Data Analysts / Engineers (SQL-first)** | Weeks 2–4 | Databricks · DBeaver · SEARCH · DatabaseConnector | Build reproducible pipelines in GitHub |
| **Clinicians / Analysts** | Weeks 1–3 | Athena · Atlas Cohort Editor | Explore cohort outputs and characterization summaries |

---

## D) Key Supplemental Resources

| **Resource** | **Purpose / Description** |
|---------------|---------------------------|
| [Environment Checklist Template](common_artifacts/environment-checklist-template.md) | Validate all required system access before Week 1. |
| [OMOP SQL Examples](common_artifacts/omop-sql-examples.md) | Common SQL patterns for exploring concepts, ancestors, and cohort logic in Databricks or DBeaver. |
| [SQL Validation Mini Lab](common_artifacts/sql-validation-mini-lab.md) | Step-by-step guide to export Atlas SQL, run validation queries, and compare outputs. |
| [Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/) | Core text for OMOP CDM and OHDSI methods. |
| [RWD Guide](https://rwd.guide/) | Companion text for understanding bias, confounding, and data quality. |

---

## E) How to Use

- **Before class:** Read the assigned *Book of OHDSI* chapters and open the listed tools.  
- **During class:** Use both **Atlas/Athena** and your **SQL client** for guided exercises.  
- **After class:** Complete weekly homework and optional SQL validation tasks.  
- **As a trainer:** Bookmark these core references and update your repo with local connection instructions.

---

*This syllabus supports the revised six-week OHDSI Train-the-Trainer program and provides a bridge between graphical and SQL-based workflows.*
