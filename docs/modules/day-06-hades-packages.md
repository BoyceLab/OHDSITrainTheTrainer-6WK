---
title: HADES Package Catalogue
status: new
---

# HADES Package Catalogue

<ul class="meta-row">
  <li><strong>Type</strong> reference</li>
  <li><strong>Use</strong> during and after the session</li>
  <li>Companion: <strong><a href="../../common_artifacts/hades-package-cheat-sheet/">one-page cheat sheet</a></strong></li>
</ul>

There are roughly twenty packages. **You will never use all of them**, and trying
to learn them as a list is the wrong approach. They are grouped below by the job
you are trying to do, so you can find the three or four that matter for your
study and ignore the rest until they matter too.

!!! tip "If you only learn four"

    `DatabaseConnector` to get in, `CohortGenerator` to materialize cohorts,
    `FeatureExtraction` to build covariates, and whichever *one* analytic
    package matches your question &mdash; usually `CohortMethod` or
    `PatientLevelPrediction`. Everything else is either a dependency you never
    call directly, or a tool you reach for once you have a first result.

    Full package index and documentation: [ohdsi.github.io/Hades](https://ohdsi.github.io/Hades/).

---

## 1. Getting connected and moving data

These sit under almost everything else. You will call `DatabaseConnector`
directly; the others mostly work on your behalf.

| Package | What it does | When you notice it |
|---|---|---|
| **DatabaseConnector** | One connection interface across SQL platforms &mdash; SQL Server, Oracle, PostgreSQL, Redshift, Databricks, and others. Manages drivers and credentials. | Every single study. This is your front door. |
| **SqlRender** | Writes SQL in one dialect and translates it to another. Write once, run anywhere. | When you export cohort SQL from ATLAS and pick a dialect &mdash; this is what makes that dropdown work. |
| **Andromeda** | Keeps very large objects on disk while still letting you manipulate them, so a million-person covariate matrix does not have to fit in RAM. | When your extraction succeeds on a laptop and you wonder how. |
| **ParallelLogger** | Parallel computation, plus centralized logging to console, file, or email, and error tracking. | On long-running studies, when you need to know what failed at 3am. |

!!! example "SqlRender in practice"

    This is genuinely useful the first time you inherit someone else's study
    code. Their site runs PostgreSQL; yours runs Databricks. Nobody has to
    rewrite anything.

    ```r
    sql <- "SELECT TOP 10 * FROM @cdm.person;"
    SqlRender::translate(sql, targetDialect = "postgresql")
    #> SELECT * FROM @cdm.person LIMIT 10;
    ```

---

## 2. Building and checking cohorts

| Package | What it does |
|---|---|
| **CirceR** | The R interface to Circe, the engine behind ATLAS cohort definitions. Turns a cohort definition into JSON, SQL, or readable Markdown. |
| **CohortGenerator** | Creates the cohort tables and materializes cohort definitions into them from R &mdash; the scripted equivalent of clicking *Generate* in ATLAS. |
| **CohortDiagnostics** | Evaluates a cohort definition before you trust it: incidence rates, attrition through each inclusion rule, index event breakdown, and comparisons across databases. |
| **Eunomia** | A small synthetic CDM in an embedded SQLite database. No credentials, no server, no governance review. |

!!! warning "Run CohortDiagnostics before, not after"

    The most common expensive mistake in an OHDSI study is running the analysis
    first and inspecting the cohort second. Attrition tables routinely reveal
    that an inclusion rule you thought was mild removed 80% of your population,
    or that your index event fires on a follow-up visit rather than a diagnosis.

    Diagnostics are cheap. Reruns are not.

!!! tip "Eunomia is how you learn this without touching real data"

    Every lab on this site can be attempted against Eunomia. It is also the right
    answer when someone asks you to demo HADES and your CDM access is still
    working its way through an approval queue.

    ```r
    connectionDetails <- Eunomia::getEunomiaConnectionDetails()
    ```

---

## 3. Describing a population

| Package | What it does |
|---|---|
| **FeatureExtraction** | Automatically derives covariates from the CDM for a cohort &mdash; all conditions, drugs, procedures, plus age, sex, comorbidity indices, and custom covariates. Time-window aware. |

This one deserves emphasis because it does an enormous amount of quiet work. A
single `createCovariateSettings()` call can generate tens of thousands of
covariates from the CDM without you naming any of them, with explicit control
over the lookback windows.

```r
covariateSettings <- FeatureExtraction::createCovariateSettings(
  useDemographicsGender             = TRUE,
  useDemographicsAge                = TRUE,
  useConditionGroupEraLongTerm      = TRUE,
  useConditionGroupEraAnyTimePrior  = TRUE,
  useDrugGroupEraLongTerm           = TRUE,
  useDrugGroupEraAnyTimePrior       = TRUE,
  useVisitConceptCountLongTerm      = TRUE,
  longTermStartDays = -365,   # (1)!
  endDays           = -1      # (2)!
)
```

1. Look back one year before the index date.
2. Stop the day *before* index. Including index day itself is a classic
   leakage bug in prediction studies &mdash; the diagnosis that defines cohort
   entry becomes a predictor of cohort entry.

---

## 4. Estimating effects

Population-level effect estimation. Pick the design that matches the question and
the confounding you are worried about.

<div class="grid cards" markdown="1">

-   **CohortMethod**

    ---

    New-user cohort designs with propensity score adjustment and outcome models.
    The workhorse for comparative effectiveness and safety.

    *A "new user" has no prior exposure during a washout period, initiates at a
    defined index date, and is followed forward &mdash; mirroring the time-zero
    logic of a randomized trial.*

-   **SelfControlledCaseSeries**

    ---

    A within-person design: each person is their own control. Handles
    time-varying exposure and includes splines for age and seasonality.

    *Controls all time-invariant confounding by construction &mdash; genetics,
    stable comorbidity, anything that does not change within a person.*

-   **SelfControlledCohort**

    ---

    Uses pre-exposure time as the control window. Computationally simpler than
    SCCS and scalable enough for large screening studies.

-   **CaseControl**

    ---

    Matched case&ndash;control studies, matching on demographics and visit date,
    optionally nested within a cohort. Useful for rare outcomes.

-   **CaseCrossover**

    ---

    For transient exposures with acute effects. Within-person comparison, and
    supports the case&ndash;time&ndash;control variant.

-   **Cyclops**

    ---

    The regression engine underneath much of the above. High-performance
    regularized logistic, Poisson, and Cox models that scale to
    high-dimensional data.

</div>

!!! note "Choosing a design is an epidemiology decision, not a software one"

    The package list does not tell you which design is right. If time-invariant
    confounding is your main worry, a self-controlled design handles it by
    construction. If you need a comparator treatment, you need a new-user cohort
    design. If the exposure is transient and the effect acute, case-crossover.

    This is exactly the "HADES does not replace your knowledge" point from the
    [module](day-06-hades.md#hades-does-not-replace-your-knowledge).

---

## 5. Predicting for individuals

| Package | What it does |
|---|---|
| **PatientLevelPrediction** | Develops and validates patient-level risk models across many target/outcome combinations, with a wide set of machine learning algorithms and a full evaluation suite. |
| **DeepPatientLevelPrediction** | Deep learning architectures, in a separate package. |
| **EnsemblePatientLevelPrediction** | Combines multiple models into an ensemble. |
| **BigKnn** | A large-scale k-nearest-neighbour classifier built on the Lucene search engine. |

PatientLevelPrediction is the subject of the
[hands-on walk-through](day-06-plp-walkthrough.md).

---

## 6. Trusting the answer

This group is what distinguishes an OHDSI study from "I ran a regression." Do not
skip it.

| Package | What it does | Why it matters |
|---|---|---|
| **EmpiricalCalibration** | Uses negative control exposure&ndash;outcome pairs to profile and calibrate a study design, adjusting p-values and confidence intervals. | Your nominal 95% CI is almost certainly not a real 95% CI in observational data. This measures the gap instead of assuming it away. |
| **MethodEvaluation** | Benchmarks analytic methods using reference sets and injected signals. | Tells you when a method works well *in a context like yours*, and when it does not. |
| **EvidenceSynthesis** | Combines estimates and diagnostics across databases and sites. | The machinery behind federated network studies, where patient-level data never leaves the site. |

!!! quote "On empirical calibration"

    Negative controls are exposure&ndash;outcome pairs where you have strong
    reason to believe there is no causal effect. If your study design returns a
    "significant" effect for a large fraction of them, the design has residual
    bias &mdash; and now you can quantify and adjust for it rather than argue
    about it.

---

## 7. Packaging and sharing

| Package | What it does |
|---|---|
| **Hydra** | Generates executable R study packages from JSON specifications &mdash; the scaffolding behind ATLAS's "download study package" button. |
| **ROhdsiWebApi** | Talks to WebAPI from R: pull cohort definitions down by ID, trigger generation, retrieve results. The programmatic bridge to your ATLAS instance. |
| **OhdsiSharing** | Secure exchange of large result files between collaborators. |

!!! example "ROhdsiWebApi is the tidy version of the hand-off"

    Instead of copying cohort IDs out of the ATLAS URL bar, pull the definitions
    into R directly &mdash; you get the SQL and JSON with them, which means your
    study package carries its own cohort provenance.

    ```r
    cohortDefinitions <- ROhdsiWebApi::exportCohortDefinitionSet(
      baseUrl       = "https://your-atlas-host/WebAPI",
      cohortIds     = c(1782708, 1782710),   # target & outcome
      generateStats = TRUE
    )
    ```

---

## Self-check

<div class="quiz">
  <p class="quiz__q">You want to know whether a new antihypertensive raises the risk of acute kidney injury compared with an existing one. Which package is your primary tool?</p>
  <ul class="quiz__opts">
    <li data-correct="false">PatientLevelPrediction</li>
    <li data-correct="true">CohortMethod</li>
    <li data-correct="false">SelfControlledCaseSeries</li>
    <li data-correct="false">FeatureExtraction</li>
  </ul>
  <div class="quiz__why">
    <p>The question is comparative &mdash; drug A versus drug B &mdash; which
    calls for a new-user cohort design with propensity score adjustment, so
    <code>CohortMethod</code>. SCCS is a within-person design and has no place
    for a comparator drug. FeatureExtraction will be involved, but as a
    dependency generating your covariates, not as the analytic method.</p>
    <p>And whichever you pick, <code>EmpiricalCalibration</code> belongs in the
    plan too.</p>
  </div>
</div>

<div class="quiz">
  <p class="quiz__q">Your cohort generated successfully and the analysis ran without error. What should you look at before you believe the result?</p>
  <ul class="quiz__opts">
    <li data-correct="false">The p-value</li>
    <li data-correct="true">CohortDiagnostics attrition and incidence, then the calibration of the design against negative controls</li>
    <li data-correct="false">Whether the effect size is clinically plausible</li>
    <li data-correct="false">The package version numbers</li>
  </ul>
  <div class="quiz__why">
    <p>"It ran" and "it is right" are unrelated properties. Attrition tables tell
    you whether the population you analysed is the population you meant to
    analyse, and negative-control calibration tells you how much systematic error
    your design carries.</p>
    <p>Clinical plausibility is worth checking, but it is a weak test in both
    directions &mdash; it rejects surprising true findings and accepts
    comfortable false ones.</p>
  </div>
</div>

---

## Cited and further reading

- [HADES package index](https://ohdsi.github.io/Hades/) &mdash; the canonical list, always current
- [The Book of OHDSI, Ch. 14 &mdash; the HADES ecosystem](https://ohdsi.github.io/TheBookOfOhdsi/)
- [PatientLevelPrediction documentation](https://ohdsi.github.io/PatientLevelPrediction/)
- [HADES package cheat sheet](../common_artifacts/hades-package-cheat-sheet.md) &mdash; printable one-pager

!!! info "Cite the packages you use"

    Cite HADES packages in publications the way you would cite any statistical
    software. Each package's documentation site carries its preferred citation,
    usually via `citation("PackageName")` in R.
