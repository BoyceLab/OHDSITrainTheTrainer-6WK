# Exercises — Day 2: ATLAS

## Study Examples & Supporting Material

### Semaglutide NAION Study

- [**Study repository**](https://github.com/ohdsi-studies/SemaglutideNaion)
- [**Study protocol**](https://ohdsi-studies.github.io/SemaglutideNaion/protocol.html)
- **Manuscript** [JAMA Ophthalmology article](https://jamanetwork.com/journals/jamaophthalmology/fullarticle/2830475)

### Data Quality Resources

- [**Kahn et al. Framework** PubMed link](https://pubmed.ncbi.nlm.nih.gov/27713905/)
- [**OHDSI Data Quality Dashboard Results**](https://data.ohdsi.org/DataQualityDashboard/)

---

## Words to Search

- Chlorpropamide (concept_id: **1594973**)  
- Sulfonylureas (concept_id: **21600749**)

---

# Sulfonylurea Class — OMOP Concept Set SQL

```sql
USE CATALOG cdm_catalog;
USE cdm_schema;

WITH sulfonylurea_ancestors AS (
    SELECT 21600749 AS concept_id   -- Sulfonylureas (drug class)
),

sulfonylurea_descendants AS (
    SELECT DISTINCT
        ca.descendant_concept_id AS concept_id
    FROM concept_ancestor ca
    JOIN sulfonylurea_ancestors sa
        ON ca.ancestor_concept_id = sa.concept_id
),

sulfonylurea_concept_set AS (
    SELECT concept_id FROM sulfonylurea_ancestors
    UNION
    SELECT concept_id FROM sulfonylurea_descendants
)

SELECT
    c.concept_id,
    c.concept_name,
    c.concept_code,
    c.vocabulary_id,
    c.domain_id,
    c.concept_class_id
FROM sulfonylurea_concept_set s
JOIN concept c
    ON c.concept_id = s.concept_id
WHERE c.invalid_reason IS NULL
ORDER BY c.concept_name;
```

---

# Explore Chlorpropamide (concept_id **1594973**)

This document explores the OMOP concept **1594973 --- Chlorpropamide**,
covering:

-   Basic concept details\
-   Hierarchy (ancestors and descendants)\
-   Direct concept relationships\
-   Drug exposure records (exact and hierarchical)\
-   Summary exposure counts

------------------------------------------------------------------------

## Concept Details

``` sql
SELECT *
FROM concept
WHERE concept_id = 1594973;
```

------------------------------------------------------------------------

## Ancestors

Retrieve ancestor concepts for Chlorpropamide, ordered by proximity in
the hierarchy.

``` sql
SELECT
  ca.ancestor_concept_id,
  a.concept_name AS ancestor_concept_name,
  ca.min_levels_of_separation
FROM concept_ancestor ca
JOIN concept a
  ON ca.ancestor_concept_id = a.concept_id
WHERE ca.descendant_concept_id = 1594973
ORDER BY ca.min_levels_of_separation;
```

------------------------------------------------------------------------

## Descendants

Retrieve all descendant concepts of Chlorpropamide.

``` sql
SELECT
  ca.descendant_concept_id,
  d.concept_name AS descendant_concept_name,
  ca.min_levels_of_separation
FROM concept_ancestor ca
JOIN concept d
  ON ca.descendant_concept_id = d.concept_id
WHERE ca.ancestor_concept_id = 1594973
ORDER BY ca.min_levels_of_separation, ca.descendant_concept_id;
```

------------------------------------------------------------------------

## Direct Relationships

List all direct concept-to-concept relationships involving
Chlorpropamide.

``` sql
SELECT
  cr.concept_id_1,
  c1.concept_name AS concept_1_name,
  cr.relationship_id,
  cr.concept_id_2,
  c2.concept_name AS concept_2_name
FROM concept_relationship cr
LEFT JOIN concept c1 ON cr.concept_id_1 = c1.concept_id
LEFT JOIN concept c2 ON cr.concept_id_2 = c2.concept_id
WHERE cr.concept_id_1 = 1594973
   OR cr.concept_id_2 = 1594973;
```

------------------------------------------------------------------------

## Drug Exposures --- Exact Match Only

``` sql
SELECT *
FROM drug_exposure
WHERE drug_concept_id = 1594973;
```

------------------------------------------------------------------------

## Drug Exposures --- Concept + Descendants

``` sql
WITH concept_set AS (
  SELECT descendant_concept_id AS concept_id
  FROM concept_ancestor
  WHERE ancestor_concept_id = 1594973
  UNION
  SELECT 1594973 AS concept_id
)

SELECT *
FROM drug_exposure de
JOIN concept_set cs
  ON de.drug_concept_id = cs.concept_id;
```

------------------------------------------------------------------------

## Summary Exposure Counts

Summaries of the number of drug exposures and unique persons exposed to
each concept in the hierarchy.

``` sql
WITH concept_set AS (
  SELECT descendant_concept_id AS concept_id
  FROM concept_ancestor
  WHERE ancestor_concept_id = 1594973
  UNION
  SELECT 1594973 AS concept_id
)

SELECT
  de.drug_concept_id,
  c.concept_name,
  COUNT(*) AS exposure_count,
  COUNT(DISTINCT person_id) AS person_count
FROM drug_exposure de
JOIN concept_set cs
  ON de.drug_concept_id = cs.concept_id
JOIN concept c
  ON de.drug_concept_id = c.concept_id
GROUP BY de.drug_concept_id, c.concept_name
ORDER BY exposure_count DESC;
```

------------------------------------------------------------------------

---

# Concept ID Lists for In-Class Exercises

## B.1.5 — DPP4 Inhibitors

```
43013884  
40239216  
40166035  
1580747  
19122137
```

## B.1.6 — Semaglutide

```
793143
```

## B.1.7 — SGLT2 Inhibitors

```
43526465  
44785829  
45774751  
793293
```

## B.1.8 — Sulfonylureas

```
1594973  
1597756  
1560171  
19097821  
1559684  
1502809  
1502855
```

## B.1.9 — Other Anti-Diabetics

```
1529331  
1530014  
730548  
19033498  
19001409  
19059796  
19001441  
1510202  
1502826  
1525215  
1516766  
1547504  
1515249
```

## B.1.10 — Insulin

```
1596977  
1550023  
1567198  
1502905  
1513876  
1531601  
1586346  
1544838  
1516976  
1590165  
1513849  
1562586  
1588986  
1513843  
1586369  
35605670  
35602717  
21600713  
19078608
```

## B.1.11 — Metformin

```
1503297
```

## B.1.12 — Secondary Diabetes Mellitus

```
195771  
761051
```

## B.1.13 — Type 1 Diabetes Mellitus

```
40484649  
42689695  
765533  
43531006  
765650  
45770986  
201254  
45768456  
40484648  
4128019  
435216
```

## B.1.14 — Type 2 Diabetes Mellitus

```
443238  
201820  
442793  
40484648  
201254  
435216  
195771  
761051  
4016045  
40484649  
43531009  
4024659
```

## B.1.15 — GLP-1 Receptor Agonists (Excluding Semaglutide)

```
45774435  
1583722  
40170911  
44506754  
793143  
44816332
```
