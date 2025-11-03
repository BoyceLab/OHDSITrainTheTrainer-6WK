# 🧪 SQL Validation Mini Lab (Weeks 2–4)

This mini lab guides you through **validating Atlas outputs in your SQL client** (Databricks or DBeaver).  
You’ll export SQL from Atlas, run it yourself, and compare results — reinforcing transparency and reproducibility.

> Use this lab in **Week 2 (Concept Sets)**, **Week 3 (Cohorts)**, and **Week 4 (SEARCH/Extraction)**.  
> Keep your screenshots and notes; you’ll discuss them at the beginning of the following session.

---

## 🎯 Objectives
- Bridge **Atlas** actions to **OMOP SQL** you can read and run.
- Confirm concept set and cohort logic by **replicating counts** in Databricks/DBeaver.
- Capture **evidence of reproducibility** (exports, SQL, counts, timestamps).

## ✅ Prerequisites
- Read access to your **OMOP training database**.
- Atlas account with access to the training environment.
- A configured SQL client (**Databricks** or **DBeaver**).  
- The reference: **[OMOP SQL Examples](../common_artifacts/omop-sql-examples.md)**.

---

## 🗂️ Lab Artifacts (what you’ll submit)
- **Atlas export(s)** (JSON/SQL) for your concept set and/or cohort.
- **SQL script** you ran in Databricks/DBeaver (with comments).
- **Result summary**: row counts, sample IDs, and any differences observed.
- **Screenshots**: Atlas page(s) + SQL client output(s).

> Tip: save all artifacts in your repo under a dated folder, e.g. `labs/week2_sql_validation/`.

---

## Week 2 — Validate Concept Sets in SQL

### 1) Export Concept Set from Atlas
1. In Atlas, open your **Concept Set**.
2. Click **Export** → **SQL** (and/or **JSON**).
3. Save as `conceptset_<name>_v1.sql` in your repo.

> **Screenshot Placeholder**: Atlas Concept Set Export

### 2) Run in Your SQL Client
1. Open **Databricks** (SQL Warehouse) or **DBeaver**.
2. Paste the exported SQL OR recreate logic with `concept` + `concept_ancestor` (see examples).
3. **Run** and record: `N` concepts returned, any non-standard concepts, domain distribution.

```sql
-- Quick check for standard flags in your concept set list
SELECT c.concept_id, c.concept_name, c.domain_id, c.vocabulary_id, c.standard_concept
FROM omop.concept c
WHERE c.concept_id IN ( /* paste IDs from Atlas export */ );
```

### 3) Compare & Interpret
- Do counts in SQL match the number of concepts expected from Atlas?
- Any **non-standard** concepts? If yes, how did they appear?
- Save results and a brief note to `labs/week2_sql_validation/notes.md`.

---

## Week 3 — Validate Cohort SQL in Your Client

### 1) Export Cohort SQL from Atlas
1. Open your **Cohort Definition**.
2. Click **Export** → **SQL** (choose dialect closest to your DB).
3. Save as `cohort_<name>_v1.sql`.

> **Screenshot Placeholder**: Atlas Cohort Export

### 2) Identify Key Tables and Joins
- Scan the SQL and **comment** where the entry events and inclusion rules are applied.
- Find the primary domain table(s): `condition_occurrence`, `drug_exposure`, etc.

```sql
-- Example: simple condition-based entry events
SELECT person_id, condition_concept_id, condition_start_date
FROM omop.condition_occurrence
WHERE condition_concept_id IN ( /* concept set IDs */ );
```

### 3) Run & Compare Counts
- Execute cohort SQL (or a reduced version) in your SQL client.
- Compare **row counts** (and distinct person counts) with Atlas results.
- Note any differences and hypotheses (date windows, null handling, observation periods).

> Save an annotated version of your SQL with comments explaining each step.

---

## Week 4 — Validate SEARCH / Extraction Output

### 1) Build & Export an Extraction Spec
- In SEARCH (or Atlas if applicable), configure a cohort-aligned extraction.
- Export or obtain the **SQL / spec** used to pull rows.

### 2) Re-run Manually in SQL Client
- Paste the extraction SQL into Databricks/DBeaver and run.
- Capture **patient counts**, **date windows**, **visit types**, and sample rows.

```sql
-- Manual count reproduction for extraction
SELECT COUNT(DISTINCT person_id) AS patient_count
FROM omop.condition_occurrence
WHERE condition_concept_id IN ( /* concept set IDs */ )
  AND condition_start_date >= DATE '2018-01-01';
```

### 3) Compare & Document
- Do your manual counts match tool outputs?
- If not, list potential causes (filters, join cardinality, missing links).
- Save screenshots + a short summary to `labs/week4_sql_validation/summary.md`.

---

## 🔍 Troubleshooting Checklist
- **Schema:** Are you querying the correct schema (`omop.` vs site-specific)?
- **Dialect:** Did you export SQL in a dialect close to your DB (Postgres/SQL Server/SparkSQL)?
- **Filters:** Check date windows, `observation_period`, and null handling.
- **Joins:** Verify keys (`person_id`, `visit_occurrence_id`, `condition_concept_id`).

---

## 📦 Submission Checklist
- [ ] Atlas export(s) (SQL/JSON) saved
- [ ] SQL scripts (with comments) saved
- [ ] Counts & differences documented
- [ ] 2–3 screenshots included
- [ ] Folder committed to repo: `labs/week2_sql_validation/`, `labs/week3_sql_validation/`, `labs/week4_sql_validation/`

---

## 📚 References
- [OMOP SQL Examples](../common_artifacts/omop-sql-examples.md)
- [Book of OHDSI – Data Quality Concepts](https://ohdsi.github.io/TheBookOfOhdsi/DataQuality.html)
- [Book of OHDSI – Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
- [Book of OHDSI – Common Data Model](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)

---

*This lab strengthens the habit of validating GUI-driven logic in a familiar SQL environment — a core skill for OMOP analysts and trainers.*
