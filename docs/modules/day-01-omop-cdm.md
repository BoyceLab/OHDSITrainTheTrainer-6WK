# 🗓️ Day 1 · OMOP Common Data Model

Welcome to **Day 1 of the OHDSI Training Series**!  
Today we introduce the **OMOP Common Data Model (CDM)** — the foundation for all OHDSI analytics.  
You’ll learn how data are organized, standardized, and queried using the OMOP vocabulary tables.

---

## 🎯 Objectives
By the end of this session, you should be able to:
- Explain the purpose of the OMOP CDM and its standardized structure.  
- Identify and describe **core CDM tables** (`person`, `condition_occurrence`, `drug_exposure`, etc.).  
- Understand the **role of vocabulary tables** (`concept`, `concept_relationship`, `concept_ancestor`).  
- Distinguish between **standard vs non-standard concepts**.  
- Write basic **SQL queries** to explore OMOP data.  
- Use the **Athena vocabulary browser** to find standard concepts.

---

## 🧩 Agenda

| Time | Topic |
|:--|:--|
| 09:00 – 09:30 | Welcome & Overview of OMOP CDM |
| 09:30 – 10:30 | Core Tables & Relationships |
| 10:30 – 11:00 | Break |
| 11:00 – 12:00 | Exploring the OMOP Vocabulary |
| 12:00 – 13:00 | Lunch |
| 13:00 – 14:00 | Hands-on: Querying Concepts with SQL |
| 14:00 – 14:45 | Demo: Using Athena |
| 14:45 – 15:15 | Recap & Discussion |
| 15:15 – 15:30 | Homework & Next Steps |

---

## 🧠 Slides & Materials
- 📑 **Lecture slides:** [Exploring Concepts with OMOP and SQL (PPTX)](Exploring_Concepts_with_OMOP_and_SQL.pptx)  
- 🧾 **Markdown version:** [Exploring_Concepts_with_OMOP_and_SQL.md](Exploring_Concepts_with_OMOP_and_SQL.md)  
- 🧩 **Cheat Sheet:** [OMOP Vocabulary and SQL Cheat Sheet](OMOP_Vocabulary_and_SQL_Cheat_Sheet.md)  
- 🧮 **Homework Exercises:** [OHDSI OMOP Vocabulary SQL Training Exercise](OHDSI_OMOP_Vocabulary_SQL_Training_Exercise.md)  
- ✅ **Answer Key (for instructors):** `OHDSI_OMOP_Vocabulary_SQL_Training_Answers.md`  
- 🗂️ **All files:** stored under `/training/day1-omop-cdm/` in this repo.

---

## 🧭 Hands-on Activities

### 1️⃣ Explore Concepts in Athena
1. Go to [Athena](https://athena.ohdsi.org/).  
2. Search for “Major depressive disorder”.  
3. Identify the **standard concept** (*S* flag).  
4. Record `concept_id`, `concept_code`, `vocabulary_id`.  
5. Compare standard vs non-standard entries.

---

### 2️⃣ Query the `concept` Table
```sql
SELECT concept_id,
       concept_name,
       vocabulary_id,
       standard_concept
FROM concept
WHERE concept_name LIKE 'Major depressive disorder%';
```
➡ Identify which are standard (`'S'`) vs non-standard (`NULL`).

---

### 3️⃣ Map a Non-Standard Code to a Standard Concept
```sql
SELECT *
FROM concept_relationship
WHERE concept_id_1 = <nonstandard_id>
  AND relationship_id = 'Maps to';
```
➡ Find the standard `concept_id_2`.

---

### 4️⃣ Explore Concept Relationships
```sql
SELECT cr.relationship_id,
       c.concept_name AS related_concept,
       c.domain_id
FROM concept_relationship cr
JOIN concept c
  ON cr.concept_id_2 = c.concept_id
WHERE cr.concept_id_1 = <standard_concept_id>;
```
- Look for “Is a”, “Subsumes”, “Mapped from” relationships.  
- Note hierarchical links for concept set creation.

---

## 🧮 Homework / Quiz (Section Summaries)

1. Every data value in OMOP is a *concept* — **True**.  
2. `concept_id` is the unique OMOP integer identifier.  
3. Standard vs Non-standard → only standard concepts are used for analysis.  
4. Relationships between concepts are found in `concept_relationship`.  
5. A single `concept_name` may map to multiple IDs (True).  

> See [`OHDSI_OMOP_Vocabulary_SQL_Training_Exercise.md`](OHDSI_OMOP_Vocabulary_SQL_Training_Exercise.md) for full quiz and SQL practice tasks.  


Full reference: [OMOP Vocabulary and SQL Cheat Sheet](OMOP_Vocabulary_and_SQL_Cheat_Sheet.md)

---

## 📚 Suggested Reading
- [**Book of OHDSI** – Common Data Model chapter](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
- [**Book of OHDSI** – Standardized Vocabulary chapter] (https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
- [**OMOP CDM Reference**](https://ohdsi.github.io/CommonDataModel/)  
- [**Athena Vocabulary Browser**](https://athena.ohdsi.org/)  
- [**OHDSI Forum**](https://forums.ohdsi.org/) – discussion & support.  

---

## 🏁 Instructor Notes
- Demonstrate basic SQL queries live.  
- Encourage use of Athena to confirm concept IDs.  
- Remind learners that vocabularies update frequently — document versions.  
- Optional challenge: map a list of ICD codes to SNOMED standards and compare results.

---

🧩 *Day 1 lays the foundation for querying and interpreting standardized OMOP data.  
Day 2 will focus on building cohorts and extracting standardized data for analysis.*
