---
title: HADES Package Cheat Sheet
status: new
---

# HADES Package Cheat Sheet

<ul class="meta-row">
  <li><strong>Type</strong> printable one-pager</li>
  <li>Companion to the <a href="../../modules/day-06-hades-packages/">full catalogue</a></li>
</ul>

## Start with these four

| Package | One-line job |
|---|---|
| `DatabaseConnector` | Connect to the CDM, whatever platform it runs on |
| `CohortGenerator` | Materialize cohort definitions into the cohort table |
| `FeatureExtraction` | Turn a cohort into covariates |
| *One analytic package* | `CohortMethod` **or** `PatientLevelPrediction`, depending on the question |

## By the job you are doing

| I want to... | Reach for |
|---|---|
| Connect to a database | `DatabaseConnector` |
| Run the same SQL on a different platform | `SqlRender` |
| Handle data too big for memory | `Andromeda` |
| Run in parallel and keep logs | `ParallelLogger` |
| Turn a cohort definition into SQL or JSON | `CirceR` |
| Create and populate cohort tables | `CohortGenerator` |
| Check a cohort before trusting it | `CohortDiagnostics` |
| Practise without real data | `Eunomia` |
| Build covariates | `FeatureExtraction` |
| Compare two treatments | `CohortMethod` |
| Use each person as their own control | `SelfControlledCaseSeries`, `SelfControlledCohort` |
| Study a rare outcome | `CaseControl` |
| Study a transient exposure | `CaseCrossover` |
| Fit a big regularized regression | `Cyclops` |
| Predict individual risk | `PatientLevelPrediction` |
| Add deep learning | `DeepPatientLevelPrediction` |
| Quantify residual bias | `EmpiricalCalibration` |
| Benchmark a method | `MethodEvaluation` |
| Combine results across sites | `EvidenceSynthesis` |
| Generate a study package | `Hydra` |
| Talk to ATLAS from R | `ROhdsiWebApi` |
| Share large result files | `OhdsiSharing` |

## Question family → design → package

| Question family | Typical design | Package |
|---|---|---|
| Clinical characterization | Descriptive summary of a cohort | `FeatureExtraction` |
| Population-level estimation | New-user cohort with propensity scores | `CohortMethod` |
| Population-level estimation | Within-person, time-varying exposure | `SelfControlledCaseSeries` |
| Patient-level prediction | T / O / TAR with covariates from a lookback window | `PatientLevelPrediction` |

## Non-negotiables

- **Diagnose the cohort before you analyse it.** `CohortDiagnostics`, every time.
- **Calibrate against negative controls** for any estimation study.
- **End covariate windows at `endDays = -1`** in prediction studies.
- **Pin package versions** with `renv` before you share anything.
- **Cite the packages.** `citation("PackageName")` in R.

## Links

- [HADES package index](https://ohdsi.github.io/Hades/)
- [The Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)
- [OHDSI Forums](https://forums.ohdsi.org/)
