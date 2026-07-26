---
title: ATLAS to HADES Hand-off Sheet
status: new
---

# ATLAS → HADES Hand-off Sheet

<ul class="meta-row">
  <li><strong>Type</strong> working template</li>
  <li><strong>Use</strong> once per study, before you write any R</li>
</ul>

Fill this in before you open RStudio. Most Week 6 debugging sessions are really
this document, reconstructed under pressure.

---

## 1. Connection

| Item | Value | Where it comes from |
|---|---|---|
| Platform | | `sql server`, `postgresql`, `redshift`, `databricks`, `oracle`, `spark` |
| Server | | Your DBA or ATLAS configuration |
| `cdmDatabaseSchema` | | Where `person`, `condition_occurrence` etc. live |
| `resultsDatabaseSchema` | | Where the `cohort` table lives |
| `cohortTable` | | Often `cohort`; sometimes a study-specific table |
| CDM version | | 5.3 or 5.4 |
| Vocabulary version | | `SELECT * FROM vocabulary WHERE vocabulary_id = 'None'` |
| CDM refresh date | | Ask; results are not reproducible without it |

!!! danger "Never put credentials in this table"

    Or in your script, or in your Git history. Use `keyring` or environment
    variables:

    ```r
    cdmDatabaseSchema <- keyring::key_get("cdmDatabaseSchema", "mdcd")
    ```

## 2. Cohorts

| Role | Cohort name | ID | People | Generated on |
|---|---|---|---|---|
| Target (T) | | | | |
| Outcome (O) | | | | |
| Comparator (C) *(estimation only)* | | | | |
| Negative controls | | | | |

- [ ] Every cohort above has been **generated** against this data source
- [ ] Counts recorded here match what ATLAS reports
- [ ] `CohortDiagnostics` has been run on the target cohort
- [ ] I can explain every inclusion rule out loud

## 3. Design parameters

| Parameter | Value | Notes |
|---|---|---|
| Time at risk start | | Days relative to index; usually `1` |
| Time at risk end | | Days relative to index |
| Minimum time at risk | | |
| Require prior observation | | Days |
| Covariate lookback start | | e.g. `-365` |
| Covariate end | | **`-1`**, unless you can justify otherwise |
| Include people with prior outcomes | | Yes / no, and why |
| Washout period *(new-user designs)* | | |

## 4. The R stub this produces

```r
# --- connection -------------------------------------------------
connectionDetails <- DatabaseConnector::createConnectionDetails(
  dbms     = "",                                   # from section 1
  server   = keyring::key_get("server", "study"),
  user     = keyring::key_get("user", "study"),
  password = keyring::key_get("password", "study")
)

cdmDatabaseSchema     <- ""
resultsDatabaseSchema <- ""
cohortTable           <- ""

# --- cohorts ----------------------------------------------------
targetId  <-          # from section 2
outcomeId <-          # from section 2

# --- design -----------------------------------------------------
covariateSettings <- FeatureExtraction::createCovariateSettings(
  useDemographicsGender        = TRUE,
  useDemographicsAge           = TRUE,
  useConditionGroupEraLongTerm = TRUE,
  useDrugGroupEraLongTerm      = TRUE,
  longTermStartDays = -365,     # from section 3
  endDays           = -1        # from section 3
)
```

## 5. Before you run

- [ ] `renv::snapshot()` has captured the environment
- [ ] The script is in version control
- [ ] No credentials appear anywhere in the repository
- [ ] `saveDirectory` is set, so results land on disk
- [ ] A [protocol](plp-study-protocol-template.md) exists and predates the results

!!! tip "Verify the hand-off before the analysis"

    One query, thirty seconds, saves an afternoon:

    ```sql
    SELECT cohort_definition_id, COUNT(DISTINCT subject_id) AS people
    FROM @resultsDatabaseSchema.@cohortTable
    WHERE cohort_definition_id IN (<targetId>, <outcomeId>)
    GROUP BY cohort_definition_id;
    ```

    If a cohort returns zero rows, it was never generated against *this* data
    source. That is the single most common Week 6 failure.
