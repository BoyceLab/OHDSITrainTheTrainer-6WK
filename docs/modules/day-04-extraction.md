🚧 **Under Construction** 🚧

This module is currently under development.  
The structure, exercises, and examples are placeholders and may change.  
Please check back later for finalized content.

---

# Week 04 — Extracting Patient Data from Defined Cohorts

In this week, you will learn how to extract patient-level data for the cohorts you defined in **Week 03**. The goal is to move from a cohort definition to analysis-ready datasets by querying the **OMOP Common Data Model (CDM)**.


---

## 🎯 Learning Objectives

By the end of this week, you will be able to:

- Explain how cohort definitions become cohort result tables  
- Identify OMOP CDM tables used for data extraction  
- Write SQL to extract demographic and clinical data  
- Restrict extracted data to relevant time windows  
- Export and document datasets for analysis  

---

## 🧠 Key Concepts

### Cohort Results

When a cohort is generated, each qualifying person is written to a cohort results table (or view). Each record typically includes:

- `cohort_definition_id`
- `subject_id` (the OMOP `person_id`)
- `cohort_start_date`
- `cohort_end_date`

All cohort-based data extraction begins from this table.

---

### Common OMOP Tables Used for Extraction

| Domain | Table |
|------|-------|
| Demographics | `person` |
| Observation Time | `observation_period` |
| Conditions | `condition_occurrence` |
| Drugs | `drug_exposure` |
| Procedures | `procedure_occurrence` |
| Measurements | `measurement` |
| Visits | `visit_occurrence` |

---

## 📘 Required Reading *(Coming Soon)*

- *Book of OHDSI – Working with Cohorts*  
- *OMOP CDM v5.x Specification*  
- *SQL Basics for OMOP CDM*  

---

## 🧪 Exercises

All exercises below assume you are working with the cohort you defined in **Week 03**.

---

### Exercise 1 – Explore Your Cohort

**Objective**  
Understand the size and basic characteristics of your cohort.

**Tasks**

- Locate your cohort results table  
- Identify the cohort definition ID  
- Count the number of unique patients  
- Review the range of cohort start dates  

**Example SQL**

```sql
SELECT
  cohort_definition_id,
  COUNT(DISTINCT subject_id) AS person_count,
  MIN(cohort_start_date) AS first_start_date,
  MAX(cohort_start_date) AS last_start_date
FROM cohort_table
WHERE cohort_definition_id = @cohort_definition_id
GROUP BY cohort_definition_id;
Exercise 2 – Extract Patient Demographics
Objective
Extract demographic and observation period data for patients in your cohort.

Tasks

Join the cohort table to person

Join to observation_period

Export results as a CSV file

Example SQL

sql
Copy code
SELECT
  c.subject_id AS person_id,
  p.gender_concept_id,
  p.year_of_birth,
  p.race_concept_id,
  p.ethnicity_concept_id,
  op.observation_period_start_date,
  op.observation_period_end_date
FROM cohort_table c
JOIN person p
  ON c.subject_id = p.person_id
JOIN observation_period op
  ON p.person_id = op.person_id
WHERE c.cohort_definition_id = @cohort_definition_id;
Exercise 3 – Extract Condition Data
Objective
Retrieve condition occurrence records for patients in your cohort.

Tasks

Join to the condition_occurrence table

Review the number of condition records per patient

Example SQL

sql
Copy code
SELECT
  c.subject_id AS person_id,
  co.condition_concept_id,
  co.condition_start_date,
  co.condition_end_date
FROM cohort_table c
JOIN condition_occurrence co
  ON c.subject_id = co.person_id
WHERE c.cohort_definition_id = @cohort_definition_id;
Exercise 4 – Extract Drug Exposure Data
Objective
Retrieve medication exposure records for cohort members.

Tasks

Extract drug concept IDs and exposure dates

Inspect exposure duration fields

Example SQL

sql
Copy code
SELECT
  c.subject_id AS person_id,
  d.drug_concept_id,
  d.drug_exposure_start_date,
  d.drug_exposure_end_date
FROM cohort_table c
JOIN drug_exposure d
  ON c.subject_id = d.person_id
WHERE c.cohort_definition_id = @cohort_definition_id;
Exercise 5 – Restrict Events to the Cohort Time Window
Objective
Ensure that extracted clinical events occur within the cohort start and end dates.

## Tasks

Filter events using cohort_start_date and cohort_end_date

Compare record counts before and after filtering

Example SQL

sql
Copy code
SELECT
  c.subject_id AS person_id,
  co.condition_concept_id,
  co.condition_start_date
FROM cohort_table c
JOIN condition_occurrence co
  ON c.subject_id = co.person_id
WHERE c.cohort_definition_id = @cohort_definition_id
  AND co.condition_start_date
      BETWEEN c.cohort_start_date AND c.cohort_end_date;
Exercise 6 – Export and Document Your Data
Objective
Prepare extracted data for analysis and reproducibility.

## Tasks
Export all extracted datasets to CSV

Save SQL queries used

Document assumptions, filters, and limitations

📊 Data Validation & Quality Checks
Before proceeding, confirm that:

Patient counts match cohort membership

Key fields are not unexpectedly missing

Dates fall within valid observation periods

Event volumes are clinically reasonable

Record any issues or assumptions.

🤝 Discussion & Collaboration (Coming Soon)
Use the shared collaboration space to:

Ask questions about extraction logic

Share SQL queries and lessons learned

Discuss site-specific challenges

📁 Deliverables
At the end of Week 04, you should have:

SQL scripts for demographic and clinical extraction

CSV files for at least one clinical domain

A brief written summary of validation steps

🧾 Submission Checklist
 Cohort explored and validated

 Demographics extracted

 Clinical events extracted

 Data exported

 Quality checks documented

Copy code
