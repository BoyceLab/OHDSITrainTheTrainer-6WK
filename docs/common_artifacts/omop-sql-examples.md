---
title: OMOP SQL Examples
status: new
---

# OMOP SQL Examples

<ul class="meta-row">
  <li><strong>Type</strong> reference</li>
  <li><strong>Tools</strong> Databricks · DBeaver · any SQL client</li>
</ul>

Common patterns for exploring an OMOP CDM. Referenced from Weeks 2 and 4, and
useful any time you want to check what ATLAS told you.

!!! note "Placeholders and dialects"

    `@cdmDatabaseSchema` and `@resultsDatabaseSchema` are SqlRender parameters.
    Replace them with your schema names, or render them from R with
    `SqlRender::render()`. Date functions and row-limiting syntax vary by
    platform &mdash; `SqlRender::translate()` handles that for you.

---

## Orientation

### What is actually in this CDM?

```sql
SELECT 'person'               AS table_name, COUNT(*) AS n FROM @cdmDatabaseSchema.person
UNION ALL SELECT 'observation_period', COUNT(*) FROM @cdmDatabaseSchema.observation_period
UNION ALL SELECT 'visit_occurrence',   COUNT(*) FROM @cdmDatabaseSchema.visit_occurrence
UNION ALL SELECT 'condition_occurrence', COUNT(*) FROM @cdmDatabaseSchema.condition_occurrence
UNION ALL SELECT 'drug_exposure',      COUNT(*) FROM @cdmDatabaseSchema.drug_exposure
UNION ALL SELECT 'procedure_occurrence', COUNT(*) FROM @cdmDatabaseSchema.procedure_occurrence
UNION ALL SELECT 'measurement',        COUNT(*) FROM @cdmDatabaseSchema.measurement
UNION ALL SELECT 'observation',        COUNT(*) FROM @cdmDatabaseSchema.observation;
```

### Which CDM and vocabulary version?

```sql
SELECT cdm_source_name, cdm_version, vocabulary_version, source_release_date
FROM @cdmDatabaseSchema.cdm_source;
```

Write the vocabulary version down. It is the reason a concept ID that works in a
tutorial may return nothing in your instance.

### What does the observation time look like?

```sql
SELECT COUNT(DISTINCT person_id)                     AS people,
       MIN(observation_period_start_date)            AS earliest,
       MAX(observation_period_end_date)              AS latest,
       AVG(DATEDIFF(DAY, observation_period_start_date, observation_period_end_date)) AS mean_days
FROM @cdmDatabaseSchema.observation_period;
```

---

## Vocabulary

### Look up a concept

```sql
SELECT concept_id, concept_name, domain_id, vocabulary_id,
       concept_class_id, standard_concept, concept_code
FROM @cdmDatabaseSchema.concept
WHERE concept_id = 313217;   -- atrial fibrillation
```

`standard_concept = 'S'` means standard. A blank means non-standard &mdash; usable
for mapping, but not for querying clinical tables directly.

### Search by name

```sql
SELECT concept_id, concept_name, domain_id, vocabulary_id, standard_concept
FROM @cdmDatabaseSchema.concept
WHERE LOWER(concept_name) LIKE '%atrial fibrillation%'
  AND standard_concept = 'S'
  AND invalid_reason IS NULL;
```

### Map a non-standard concept to its standard equivalent

```sql
SELECT c1.concept_id   AS source_concept_id,
       c1.concept_name AS source_name,
       c1.vocabulary_id AS source_vocabulary,
       c2.concept_id   AS standard_concept_id,
       c2.concept_name AS standard_name
FROM @cdmDatabaseSchema.concept_relationship cr
JOIN @cdmDatabaseSchema.concept c1 ON cr.concept_id_1 = c1.concept_id
JOIN @cdmDatabaseSchema.concept c2 ON cr.concept_id_2 = c2.concept_id
WHERE cr.relationship_id = 'Maps to'
  AND c1.concept_code = 'I48.91'
  AND c1.vocabulary_id = 'ICD10CM';
```

### Expand a concept and all its descendants

The pattern behind "include descendants" in ATLAS:

```sql
SELECT ca.descendant_concept_id, c.concept_name, ca.min_levels_of_separation
FROM @cdmDatabaseSchema.concept_ancestor ca
JOIN @cdmDatabaseSchema.concept c ON ca.descendant_concept_id = c.concept_id
WHERE ca.ancestor_concept_id = 313217
  AND c.standard_concept = 'S'
ORDER BY ca.min_levels_of_separation;
```

!!! warning "Descendants can be much larger than you expect"

    Always count before you build a concept set on an ancestor. A concept two
    levels up the hierarchy can pull in thousands of descendants, some of which
    you did not intend.

---

## Clinical data

### How often does a concept appear, and in how many people?

```sql
SELECT co.condition_concept_id,
       c.concept_name,
       COUNT(*)                        AS records,
       COUNT(DISTINCT co.person_id)    AS people
FROM @cdmDatabaseSchema.condition_occurrence co
JOIN @cdmDatabaseSchema.concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id IN (
  SELECT descendant_concept_id
  FROM @cdmDatabaseSchema.concept_ancestor
  WHERE ancestor_concept_id = 313217
)
GROUP BY co.condition_concept_id, c.concept_name
ORDER BY people DESC;
```

### First occurrence per person

```sql
SELECT person_id, MIN(condition_start_date) AS first_date
FROM @cdmDatabaseSchema.condition_occurrence
WHERE condition_concept_id IN (
  SELECT descendant_concept_id
  FROM @cdmDatabaseSchema.concept_ancestor
  WHERE ancestor_concept_id = 313217
)
GROUP BY person_id;
```

### Unmapped source data — a data quality check

```sql
SELECT COUNT(*) AS unmapped_records,
       COUNT(DISTINCT person_id) AS affected_people
FROM @cdmDatabaseSchema.condition_occurrence
WHERE condition_concept_id = 0;
```

A `concept_id` of `0` means the source value did not map. A high proportion here
means your ETL is losing information, and every downstream cohort will silently
undercount.

### Demographics of a cohort

```sql
SELECT CASE WHEN p.gender_concept_id = 8507 THEN 'Male'
            WHEN p.gender_concept_id = 8532 THEN 'Female'
            ELSE 'Other/unknown' END AS gender,
       COUNT(DISTINCT c.subject_id)  AS people,
       AVG(YEAR(c.cohort_start_date) - p.year_of_birth) AS mean_age_at_index
FROM @resultsDatabaseSchema.cohort c
JOIN @cdmDatabaseSchema.person p ON c.subject_id = p.person_id
WHERE c.cohort_definition_id = 1782708
GROUP BY p.gender_concept_id;
```

---

## Cohorts

### What is in the cohort table?

```sql
SELECT cohort_definition_id,
       COUNT(*)                    AS entries,
       COUNT(DISTINCT subject_id)  AS people,
       MIN(cohort_start_date)      AS earliest,
       MAX(cohort_start_date)      AS latest
FROM @resultsDatabaseSchema.cohort
GROUP BY cohort_definition_id
ORDER BY people DESC;
```

### Do two cohorts overlap?

```sql
SELECT COUNT(DISTINCT t.subject_id) AS in_both
FROM @resultsDatabaseSchema.cohort t
JOIN @resultsDatabaseSchema.cohort o
  ON t.subject_id = o.subject_id
WHERE t.cohort_definition_id = 1782708   -- target
  AND o.cohort_definition_id = 1782710;  -- outcome
```

### Outcomes inside a time-at-risk window

The SQL behind what a prediction study counts as an event:

```sql
SELECT COUNT(DISTINCT t.subject_id) AS people_with_outcome
FROM @resultsDatabaseSchema.cohort t
JOIN @resultsDatabaseSchema.cohort o
  ON t.subject_id = o.subject_id
 AND o.cohort_start_date >= DATEADD(DAY, 1,   t.cohort_start_date)
 AND o.cohort_start_date <= DATEADD(DAY, 365, t.cohort_start_date)
WHERE t.cohort_definition_id = 1782708
  AND o.cohort_definition_id = 1782710;
```

---

## Validating ATLAS

Export the cohort SQL from ATLAS (**Export → SQL**, choosing your dialect), run
it yourself, and compare. If your number and ATLAS's number differ, one of these
is usually why:

| Difference | Likely cause |
|---|---|
| Yours is higher | You counted entries, not distinct people; or you omitted an inclusion rule |
| Yours is lower | Missing descendant expansion, or a date filter applied too early |
| Wildly different | Different data source, or the cohort was regenerated after a CDM refresh |
| Zero rows | The cohort was never generated against *this* source |

See the [SQL Validation Mini Lab](sql-validation-mini-lab.md) for the full
walk-through.
