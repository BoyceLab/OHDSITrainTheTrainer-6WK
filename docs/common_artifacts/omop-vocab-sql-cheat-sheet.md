# 🧾 OMOP Vocabulary & SQL Cheat Sheet  
### OHDSI Training Reference

---

## 🧩 Core Concepts

| Term | Definition | Example / Notes |
|------|-------------|-----------------|
| **Concept** | The basic unit of meaning in OMOP. Each observation (condition, drug, measurement, etc.) is stored as a *concept* with a unique ID. | “Hypertension”, “Blood pressure”, “Atorvastatin 10 mg tablet” |
| **Concept ID (`concept_id`)** | A unique integer identifier assigned by OMOP to every concept across all vocabularies. | e.g., `4152280` for *Major depressive disorder* |
| **Concept Code (`concept_code`)** | The identifier used in the *source vocabulary* (e.g., ICD9, SNOMED, RxNorm). | e.g., ICD9 `296.3`, SNOMED `370143000` |
| **Concept Name (`concept_name`)** | The human-readable description of a concept. | “Major depressive disorder” |
| **Vocabulary ID (`vocabulary_id`)** | Identifies the vocabulary the concept belongs to. | e.g., `ICD9CM`, `SNOMED`, `RxNorm`, `LOINC` |
| **Domain ID (`domain_id`)** | The high-level category of data the concept belongs to. | e.g., `Condition`, `Drug`, `Measurement`, `Observation` |
| **Concept Class (`concept_class_id`)** | Subcategory within a vocabulary for additional granularity. | e.g., “Clinical Finding” within SNOMED |

---

## 🧠 Standardization

| Term | Definition | Example / Notes |
|------|-------------|-----------------|
| **Standard Concept** | Canonical concept used across OMOP datasets for analysis. Standard concepts are marked with `standard_concept = 'S'`. | SNOMED concept for *Major depressive disorder* |
| **Non-Standard Concept** | Concept that exists in the source vocabulary but is *not* standardized. Marked with `standard_concept = NULL`. | ICD9 code `296.3` (must be mapped to SNOMED equivalent) |
| **Standard Vocabulary** | A vocabulary designated as the reference for a given domain (e.g., SNOMED for conditions, RxNorm for drugs, LOINC for measurements). | Always use concepts from these vocabularies in analyses. |
| **Source Vocabulary** | The original vocabulary from which data originate (ICD, CPT, etc.). | Used during ETL (Extract-Transform-Load) but mapped to standard vocabulary. |

---

## 🔗 Relationships & Mappings

| Term | Definition | Example / Notes |
|------|-------------|-----------------|
| **Concept Relationship Table (`concept_relationship`)** | Defines how two concepts relate to each other. | Links a non-standard ICD9 code to a standard SNOMED concept. |
| **Relationship ID (`relationship_id`)** | Type of relationship between two concepts. | Common values below ↓ |

### Common Relationship Types

| Relationship ID | Meaning | Typical Use |
|-----------------|----------|-------------|
| **Maps to** | Non-standard → Standard concept mapping. | Used during ETL and normalization. |
| **Mapped from** | Reverse of “Maps to” (Standard → Non-standard). | Reference only. |
| **Is a** | Indicates hierarchy — the concept is a subtype of another. | “Essential hypertension” *is a* “Hypertension”. |
| **Subsumes** | The broader concept encompasses another. | “Hypertension” *subsumes* “Essential hypertension”. |
| **Concept replaced by** | Indicates an outdated concept replaced by a newer one. | Useful for version tracking in vocabularies. |
| **Has synonym** | Indicates equivalent wording or alternate naming. | “HTN” *has synonym* “Hypertension”. |

---

## 🧬 Concept Hierarchies

| Term | Definition | Example / Notes |
|------|-------------|-----------------|
| **Concept Ancestor Table (`concept_ancestor`)** | Stores *pre-computed hierarchical relationships* (all ancestors and descendants of each concept). | Used for expanding or collapsing concept sets. |
| **Ancestor Concept** | A broader concept higher up the hierarchy. | “Hypertension” is an ancestor of “Essential hypertension”. |
| **Descendant Concept** | A more specific concept under a broader ancestor. | “Gestational hypertension” is a descendant of “Hypertension”. |

---

## 💾 SQL Table Overview (Key OMOP Vocabulary Tables)

| Table | Purpose |
|--------|----------|
| **concept** | Contains all concept records (IDs, codes, names, vocabularies, domains). |
| **concept_relationship** | Defines pairwise relationships between concepts (e.g., “Maps to”, “Is a”). |
| **concept_ancestor** | Pre-computes hierarchical ancestor–descendant pairs for faster querying. |
| **concept_synonym** | Lists alternative names for concepts. |
| **vocabulary** | Lists all vocabularies included in OMOP (e.g., SNOMED, LOINC, RxNorm). |

---

## 🧮 Common SQL Patterns

| Goal | Example SQL | Notes |
|------|--------------|-------|
| Find concept by name | ```sql SELECT * FROM concept WHERE concept_name = 'Hypertension'; ``` | Returns all vocabularies with that name. |
| Find standard concept by code | ```sql SELECT * FROM concept WHERE concept_code = '370143000'; ``` | Returns SNOMED entry if standard. |
| Map non-standard to standard | ```sql SELECT * FROM concept_relationship WHERE concept_id_1 = <nonstandard_id> AND relationship_id = 'Maps to'; ``` | Use the resulting `concept_id_2` as your standard ID. |
| Explore concept relationships | ```sql SELECT cr.relationship_id, c.concept_name FROM concept_relationship cr JOIN concept c ON cr.concept_id_2 = c.concept_id WHERE cr.concept_id_1 = <concept_id>; ``` | View all related concepts. |
| Retrieve descendants | ```sql SELECT descendant_concept_id FROM concept_ancestor WHERE ancestor_concept_id = <concept_id>; ``` | Use for broad cohort definitions. |

---

## 🧾 Vocabulary Best Practices

- ✅ Always use **standard concepts** for analysis.  
- 🔁 Map **non-standard** codes to their standard equivalents using “Maps to”.  
- 🧱 Use **concept sets** to define reusable groups of concepts.  
- 🔍 Use the **Athena browser** ([https://athena.ohdsi.org/](https://athena.ohdsi.org/)) to explore and download vocabularies.  
- ⚙️ When building SQL queries, filter with `standard_concept = 'S'` to avoid duplicates or source-only codes.  
- 📅 Document vocabulary versions — they evolve over time.  

---

## 🧠 Quick Reference Mnemonics

| Tip | Remember |
|-----|-----------|
| 🔢 `concept_id` | Internal OMOP ID (never changes across vocab versions). |
| 🧾 `concept_code` | Source code (e.g., ICD, SNOMED, RxNorm). |
| 🧱 Standard Concept | The “canonical” version you analyze with. |
| 🔗 Maps to | The bridge from non-standard → standard. |
| 🌳 Ancestor / Descendant | Think “tree”: Ancestor is broader, Descendant is narrower. |
| 🧭 Domain ID | Tells you what kind of concept (Condition, Drug, etc.). |
| 🧠 `concept_relationship` | How concepts are connected. |

---

## 📚 Additional Resources

- **OHDSI Book of OHDSI:** [https://ohdsi.github.io/TheBookOfOhdsi/](https://ohdsi.github.io/TheBookOfOhdsi/)  
- **OMOP Vocabulary Reference:** [https://ohdsi.github.io/CommonDataModel/](https://ohdsi.github.io/CommonDataModel/)  
- **Athena Vocabulary Browser:** [https://athena.ohdsi.org/](https://athena.ohdsi.org/)  
- **OHDSI Forum Discussions:** [https://forums.ohdsi.org/](https://forums.ohdsi.org/)

---

🧩 *This cheat sheet is designed for OHDSI OMOP CDM training programs and complements hands-on SQL practice sessions.*
