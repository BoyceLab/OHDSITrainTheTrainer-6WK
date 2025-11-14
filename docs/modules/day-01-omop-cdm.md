# 🗓️ Day 1 · OMOP Common Data Model and Standardized Vocabularies

Welcome to **Day 1 of the OHDSI Training Series**!  
Today we introduce the **OMOP Common Data Model (CDM)** — the foundation for all OHDSI analytics.  
You’ll learn how data are organized, standardized, and queried using the OMOP vocabulary tables.

---

# 🗓️ Day 1: OMOP Common Data Model (CDM)

## 📘 Required Reading: *The Book of OHDSI*

| Chapter | Section | Required |
|---------|---------|----------|
| Chapter 1: The OHDSI Community | – | Optional |
| Chapter 2: Where to Begin | – | Optional |
| Chapter 4: The Common Data Model | 4.1 Design Principles, 4.2 Data Model Conventions, 4.3 CDM Standardized Tables | ✅ Required |
| Chapter 5: Standardized Vocabularies | 5.1 Why Vocabularies, 5.2 Concepts, 5.3 Relationships, 5.4 Hierarchy | ✅ Required |

[📖 Read the Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)

---

## 🎯 Learning Objectives

1. Gain familiarity with OHDSI, OMOP CDM, and standardized vocabularies  
2. Understand concept hierarchy building and export concept IDs for SQL pipelines  
3. Understand why standardized vocabularies matter  

---

## 🕘 Session Agenda

| Time | Session Title |
|------|----------------|
| 9:30 am – 9:45 am | Welcome and Introduction |
| 9:45 am – 10:15 am | Value Proposition |
| 10:15 am – 10:45 am |Overview of OMOP CDM |
| 10:45 am – 11:30 am |Overview of Vocabulary and Athena |
| 11:30 am – 11:45 am |**Break**|
| 11:45 am – 12:45 pm |Hands-on Exercise|
| 12:45 pm – 1:00 pm | Review and Next Steps |

---

## 🧠 Slides & Materials
- 📑 **Lecture slides:** [Download Day 1 Slides](../training/docs/training/day1-omop-cdm/DAY_1.pdf)
- 🧩 **SQL Examples:** [Day 1 · Code Snippets](../exercises/code_snippets/day-01-snippets.md)
- 📘 **Cheat Sheet:** [OMOP Vocabulary and SQL Cheat Sheet](../common_artifacts/omop-vocab-sql-cheat-sheet.md)

---

## 🧭 Hands-on Activities
- The full in-class exercise lives here: **[Day 1 · Exercises](../exercises/day-01-athena-cdm.md)**.
- Need queries? See **[Day 1 · Code Snippets](../exercises/code_snippets/day-01-snippets.md)**.

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
JOIN concept c ON cr.concept_id_2 = c.concept_id
WHERE cr.concept_id_1 = <standard_concept_id>;
```
- Look for “Is a,” “Subsumes,” and “Mapped from” relationships.  
- Note hierarchical links for concept set creation.

---
## 🧮 Homework / Quiz Highlights
!!! tip "Check your understanding"
    The Day 1 self-check quiz and practice tasks are included in  
    **[Day 1 · Exercises](../exercises/day-01-athena-cdm.md)**.  
    Use the **[Cheat Sheet](../training/day1-omop-cdm/OMOP_Vocabulary_and_SQL_Cheat_Sheet.md)** and  
    **[Day 1 Slides](../training/day1-omop-cdm/DAY_1.pdf)** for reference.
 
> See the slides and cheat sheet for full practice queries.

---

## 📚 Suggested Reading
- [**Book of OHDSI** – Common Data Model chapter](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)  
- [**Book of OHDSI** – Standardized Vocabulary chapter](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)  
- [**OMOP CDM Reference**](https://ohdsi.github.io/CommonDataModel/)  
- [**Athena Vocabulary Browser**](https://athena.ohdsi.org/)  
- [**OHDSI Forum**](https://forums.ohdsi.org/) – discussion & support  

---

## 🏁 Instructor Notes
- Demonstrate basic SQL queries live.  
- Encourage use of Athena to confirm concept IDs.  
- Remind learners that vocabularies update frequently — document versions.  
- Optional challenge: map ICD codes to SNOMED standards and compare results.

---

🧩 *Day 1 lays the foundation for querying and interpreting standardized OMOP data. Day 2 will focus on building cohorts and extracting standardized data for analysis.*
