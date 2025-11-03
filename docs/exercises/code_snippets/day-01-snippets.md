# Day 1 — OMOP / OHDSI Code Snippets

These SQL examples accompany **Day 1 – OMOP Common Data Model**.  Learners can use them within Databricks, DBeaver, or any SQL client connected to an OMOP‑formatted database.

---

## **Atrial Fibrillation — Concept Exploration**

### Finding the Right Concept #1

```sql
SELECT * FROM concept WHERE concept_id = 313217;
```

### Finding the Right Concept #2

```sql
SELECT * FROM concept WHERE concept_name = 'Atrial fibrillation';
```

### Finding the Right Concept #3

```sql
SELECT * FROM concept WHERE concept_code = '427.31';
SELECT * FROM concept_relationship WHERE concept_id_1 = 44821957;
SELECT * FROM concept WHERE concept_id = 313217;
```

### Mapping = Translating

```sql
SELECT * FROM concept WHERE concept_code = '427.31';
SELECT * FROM concept_relationship WHERE concept_id_1 = 44821957 AND relationship_id = 'Maps to';
SELECT * FROM concept WHERE concept_id = 313217;
```

### Exercise – Find Standard Concept ID from Source Concept

```sql
SELECT * FROM concept WHERE concept_code = '427.31';
SELECT * FROM concept_relationship WHERE concept_id_1 = [source_concept_id] AND relationship_id = 'Maps to';
SELECT * FROM concept WHERE concept_id = [mapped_concept_id];
```

### Concept Relationships

```sql
SELECT * FROM concept_relationship WHERE concept_id_1 = 313217;
```

### Exploring Relationships #2

```sql
SELECT cr.relationship_id, c.*
FROM concept_relationship cr
JOIN concept c ON cr.concept_id_2 = c.concept_id
WHERE cr.concept_id_1 = 313217;
```

### Ancestry Relationships

```sql
SELECT max_levels_of_separation, c.*
FROM concept_ancestor ca, concept c
WHERE ca.descendant_concept_id = 313217
  AND ca.ancestor_concept_id = c.concept_id
ORDER BY max_levels_of_separation;
```

### Exploring Descendants

```sql
SELECT max_levels_of_separation, c.*
FROM concept_ancestor ca, concept c
WHERE ca.ancestor_concept_id = 44784217
  AND ca.descendant_concept_id = c.concept_id
ORDER BY max_levels_of_separation;
```

### Upper GI Bleeding Example

```sql
SELECT * FROM concept WHERE concept_name = 'Upper gastrointestinal bleeding';
SELECT * FROM concept
  WHERE LOWER(concept_name) LIKE '%upper gastrointestinal%'
    AND domain_id = 'Condition'
    AND standard_concept = 'S';
SELECT max_levels_of_separation, c.*
FROM concept_ancestor ca, concept c
WHERE ca.descendant_concept_id = 4332645
  AND ca.ancestor_concept_id = c.concept_id
ORDER BY max_levels_of_separation;
```

### Warfarin Examples

```sql
SELECT * FROM concept WHERE LOWER(concept_name) = 'warfarin';

SELECT person_id, MIN(drug_exposure_start_date) AS index_date
FROM drug_exposure
WHERE drug_concept_id = [Warfarin_ingredient_ID]
GROUP BY person_id
HAVING MIN(drug_exposure_start_date) - observation_period_start_date > INTERVAL '180 days';

SELECT p.person_id,
       p.year_of_birth,
       de.drug_exposure_start_date,
       (EXTRACT(YEAR FROM de.drug_exposure_start_date) - p.year_of_birth) AS age
FROM drug_exposure de
JOIN person p ON de.person_id = p.person_id
WHERE de.drug_concept_id = [Warfarin_ingredient_ID]
  AND (EXTRACT(YEAR FROM de.drug_exposure_start_date) - p.year_of_birth) >= 65;

SELECT de.person_id,
       de.drug_exposure_start_date,
       co.condition_start_date
FROM drug_exposure de
JOIN condition_occurrence co ON de.person_id = co.person_id
WHERE de.drug_concept_id = [Warfarin_ingredient_ID]
  AND co.condition_concept_id = [Atrial_Fibrillation_ID]
  AND co.condition_start_date < de.drug_exposure_start_date;
```

---

## **Diabetes Mellitus**

### Finding the Right Concept #1

```sql
SELECT * FROM concept WHERE concept_id = 201820;
```

### Finding the Right Concept #2

```sql
SELECT * FROM concept WHERE concept_name = 'Diabetes mellitus';
```

### Finding the Right Concept #3

```sql
SELECT * FROM concept WHERE concept_code = '73211009';
SELECT * FROM concept_relationship WHERE concept_id_1 = 201820;
SELECT * FROM concept WHERE concept_id = 201820;
```

### Mapping = Translating

```sql
SELECT * FROM concept WHERE concept_code = '73211009';
SELECT * FROM concept_relationship WHERE concept_id_1 = 201820 AND relationship_id = 'Maps to';
SELECT * FROM concept WHERE concept_id = 201820;
```

### Concept Relationships

```sql
SELECT * FROM concept_relationship WHERE concept_id_1 = 201820;
```

### Exploring Relationships #2

```sql
SELECT cr.relationship_id, c.*
FROM concept_relationship cr
JOIN concept c ON cr.concept_id_2 = c.concept_id
WHERE cr.concept_id_1 = 201820;
```

### Ancestry Relationships

```sql
SELECT max_levels_of_separation, c.*
FROM concept_ancestor ca, concept c
WHERE ca.descendant_concept_id = 201820
  AND ca.ancestor_concept_id = c.concept_id
ORDER BY max_levels_of_separation;
```

### Exploring Descendants

```sql
SELECT max_levels_of_separation, c.*
FROM concept_ancestor ca, concept c
WHERE ca.ancestor_concept_id = 201820
  AND ca.descendant_concept_id = c.concept_id
ORDER BY max_levels_of_separation;
```

---

## **Motor Neuron Disease**

### Finding the Right Concept #1

```sql
SELECT * FROM concept WHERE concept_id = 374631;
```

### Finding the Right Concept #2

```sql
SELECT * FROM concept WHERE concept_name = 'Motor neuron disease';
```

### Finding the Right Concept #3

```sql
SELECT * FROM concept WHERE concept_code = '37340000';
SELECT * FROM concept_relationship WHERE concept_id_1 = 374631;
SELECT * FROM concept WHERE concept_id = 374631;
```

### Mapping = Translating

```sql
SELECT * FROM concept WHERE concept_code = '37340000';
SELECT * FROM concept_relationship WHERE concept_id_1 = 374631 AND relationship_id = 'Maps to';
SELECT * FROM concept WHERE concept_id = 374631;
```

### Exploring Descendants

```sql
SELECT max_levels_of_separation, c.*
FROM concept_ancestor ca, concept c
WHERE ca.ancestor_concept_id = 374631
  AND ca.descendant_concept_id = c.concept_id
ORDER BY max_levels_of_separation;
```
