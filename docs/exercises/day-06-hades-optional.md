---
title: Week 6 Lab & Quiz
status: new
---

# Lab & Quiz · Week 6 HADES

<ul class="meta-row">
  <li><strong>Time</strong> 90&ndash;120 min</li>
  <li><strong>Track</strong> optional / advanced</li>
  <li><strong>Needs</strong> R + CDM, or Eunomia</li>
  <li><strong>Prereq</strong> <a href="../../modules/day-06-hades/">Week 6 module</a></li>
</ul>

Work through these in order. Your progress is saved in this browser &mdash;
nothing is sent anywhere, and **Reset** clears it.

<div class="lab-progress"></div>

!!! tip "No CDM access yet? Use Eunomia."

    Every lab below can be done against
    [Eunomia](https://ohdsi.github.io/Eunomia/), a small synthetic CDM in an
    embedded SQLite database. No credentials, no server, no governance review.

    ```r
    connectionDetails <- Eunomia::getEunomiaConnectionDetails()
    ```

    The cohort IDs will differ from your ATLAS instance, but every concept in
    these labs transfers.

---

## Lab 0 · Environment

Full detail on the
[HADES / R environment checklist](../common_artifacts/hades-r-environment-checklist.md).

- [ ] R 4.0 or higher is installed and `R.version.string` confirms it
- [ ] Java is installed and `rJava` loads without error
- [ ] `DatabaseConnector` is installed and its JDBC drivers are downloaded
- [ ] I can connect to my CDM (or Eunomia) and run a `SELECT` from R
- [ ] My credentials come from `keyring` or environment variables, **not** from the script
- [ ] `renv` is initialised for this project
- [ ] Python is available if I plan to use tree-based or neural models

??? failure "`rJava` will not load"

    The usual cause is an architecture mismatch &mdash; 64-bit R against a
    32-bit JDK, or a JDK that R cannot find. Check `Sys.getenv("JAVA_HOME")`,
    and on Windows confirm RTools is installed. This is the single most common
    Week 6 blocker, which is why the checklist says to start it a week early.

---

## Lab 1 · Trace the hand-off

The point of this lab is to make the cohort ID concrete. **Ten minutes.**

- [ ] Open a cohort definition in ATLAS and note its ID from the top of the screen
- [ ] Confirm it is generated against your data source
- [ ] In a SQL client, query the cohort table for that `cohort_definition_id`
- [ ] Confirm the row count matches the count ATLAS reports
- [ ] In R, connect and run the same query

```sql
SELECT cohort_definition_id,
       COUNT(DISTINCT subject_id) AS people,
       MIN(cohort_start_date)     AS first_entry,
       MAX(cohort_start_date)     AS last_entry
FROM @resultsDatabaseSchema.cohort
WHERE cohort_definition_id = 1782708
GROUP BY cohort_definition_id;
```

!!! question "What you should take away"

    ATLAS did not do anything mysterious. It wrote rows to a table, and both
    your SQL client and R can read them. Once that lands, the rest of HADES is
    ordinary programming.

**Record for your notes:**

| | Value |
|---|---|
| Cohort name | |
| `cohort_definition_id` | |
| People in cohort | |
| Data source | |
| Generated on | |

---

## Lab 2 · Diagnose before you analyse

- [ ] Run `CohortDiagnostics` against one target cohort
- [ ] Read the **attrition** table: how many people did each inclusion rule remove?
- [ ] Find the rule that removed the most people, and decide whether that was intended
- [ ] Look at the **index event breakdown**: which concepts actually triggered entry?
- [ ] Note the incidence rate and compare it to what you would expect from the literature

??? tip "What 'surprising' looks like"

    - An inclusion rule that removes 80% of the population when you expected 5%.
    - Index events dominated by a concept you did not intend to include.
    - An incidence rate an order of magnitude off published estimates.

    Any of these means the definition needs work &mdash; and finding it now costs
    an afternoon rather than a resubmission.

---

## Lab 3 · Build covariates

- [ ] Write a `createCovariateSettings()` call with a one-year lookback
- [ ] Confirm `endDays = -1`, and be able to explain why
- [ ] Extract covariates for your cohort
- [ ] Report how many covariates were generated

```r
covariateSettings <- FeatureExtraction::createCovariateSettings(
  useDemographicsGender        = TRUE,
  useDemographicsAge           = TRUE,
  useConditionGroupEraLongTerm = TRUE,
  useDrugGroupEraLongTerm      = TRUE,
  longTermStartDays = -365,
  endDays           = -1
)
```

- [ ] **Now break it deliberately:** set `endDays = 0` and note what changes

??? warning "Why break it on purpose?"

    Because you will meet this bug in someone else's code, and it is much easier
    to recognise once you have watched your own AUROC jump for a reason you
    understand.

---

## Lab 4 · Run a small prediction study

Follow the [walk-through](../modules/day-06-plp-walkthrough.md) with your own
cohorts, or with Eunomia.

- [ ] Set `sampleSize` small enough that a run takes minutes, not hours
- [ ] Fit a regularized logistic regression (`setLassoLogisticRegression()`)
- [ ] Save the results to disk
- [ ] Record the AUROC and the outcome count
- [ ] Fit a second model &mdash; gradient boosting &mdash; on the same design
- [ ] Compare them

| Model | AUROC | AUPRC | Outcome count |
|---|---|---|---|
| LASSO logistic regression | | | |
| Gradient boosting | | | |

---

## Lab 5 · Read the results honestly

- [ ] Launch the viewer on your saved results
- [ ] Check the summary row: population size, outcome count, time at risk
- [ ] Read the calibration plot &mdash; slope and intercept
- [ ] Open the model tab and list the top five covariates
- [ ] Decide whether each of those five makes clinical sense
- [ ] Pick a threshold and write down the sensitivity, specificity, and PPV there

**The question to answer in writing:** *would you be comfortable showing this
model to a clinician who will act on it?* One paragraph, with your reasoning.

??? note "There is no wrong answer here, but there is a wrong process"

    Concluding "yes, AUROC 0.76" is the wrong process. Concluding "no, because
    calibration is poor in the over-80 subgroup and that is exactly the group
    this would be used on" is the right one, even though it is a negative result.

---

## Stretch goals

- [ ] Generate a study package from the ATLAS Prediction module and run it
- [ ] Externally validate your model against a second database
- [ ] Add a custom covariate that the CDM does not provide directly
- [ ] Run `EmpiricalCalibration` on a set of negative controls for an estimation study
- [ ] Fill in the [protocol template](../common_artifacts/plp-study-protocol-template.md) for a study you actually want to run

---

## Quiz

Five questions. Click an option to see the reasoning.

<div class="quiz">
  <p class="quiz__q">1. What is stored in the <code>cohort</code> table?</p>
  <ul class="quiz__opts">
    <li data-correct="false">The inclusion criteria and cohort logic</li>
    <li data-correct="true">One row per person per cohort entry: cohort_definition_id, subject_id, cohort_start_date, cohort_end_date</li>
    <li data-correct="false">The SQL that ATLAS generated</li>
    <li data-correct="false">Covariates extracted for the cohort</li>
  </ul>
  <div class="quiz__why">
    <p>Four columns, and that is the whole contract between design and analysis.
    The <em>logic</em> lives in the cohort definition (in WebAPI, as JSON and
    SQL); the <em>result</em> of applying that logic lives in the cohort
    table.</p>
    <p>This distinction is why two people can get different results from "the
    same" cohort: same definition, different vocabulary version or CDM refresh,
    different rows.</p>
  </div>
</div>

<div class="quiz">
  <p class="quiz__q">2. Which statement about ATLAS and HADES is accurate?</p>
  <ul class="quiz__opts">
    <li data-correct="false">HADES is the R replacement for ATLAS</li>
    <li data-correct="false">ATLAS maintains its own copy of the CDM for performance</li>
    <li data-correct="true">They are different layers of one stack: ATLAS specifies, HADES executes, both against the same tables</li>
    <li data-correct="false">HADES can only consume cohorts built in ATLAS</li>
  </ul>
  <div class="quiz__why">
    <p>Same database, same tables, same connection &mdash; different job. And
    HADES will consume any correctly structured cohort table, however you
    populated it, which is what makes the SQL-only path viable for sites without
    ATLAS.</p>
  </div>
</div>

<div class="quiz">
  <p class="quiz__q">3. You need to know whether your study design carries residual systematic bias. Which package?</p>
  <ul class="quiz__opts">
    <li data-correct="false">CohortDiagnostics</li>
    <li data-correct="true">EmpiricalCalibration</li>
    <li data-correct="false">MethodEvaluation</li>
    <li data-correct="false">EvidenceSynthesis</li>
  </ul>
  <div class="quiz__why">
    <p><code>EmpiricalCalibration</code> uses negative control
    exposure&ndash;outcome pairs &mdash; pairs where you have strong reason to
    expect no effect &mdash; to measure how far off your design's nominal error
    rates are, and to adjust p-values and confidence intervals accordingly.</p>
    <p><code>CohortDiagnostics</code> evaluates the <em>cohort</em>, not the
    design. <code>MethodEvaluation</code> benchmarks methods in general, which is
    a related but broader question. Both are worth knowing; neither answers this
    one.</p>
  </div>
</div>

<div class="quiz">
  <p class="quiz__q">4. Your covariate settings use <code>longTermStartDays = -365, endDays = -1</code>. What does that mean?</p>
  <ul class="quiz__opts">
    <li data-correct="false">Follow people for 365 days after index</li>
    <li data-correct="true">Build covariates from the year before index, ending the day before index</li>
    <li data-correct="false">Require 365 days of prior observation to be included</li>
    <li data-correct="false">Censor outcomes occurring more than a year after index</li>
  </ul>
  <div class="quiz__why">
    <p>Covariate windows are about the <em>past</em>; time at risk is about the
    <em>future</em>. Requiring prior observation is a separate setting again
    &mdash; and it is possible to set a one-year lookback without requiring
    anyone to actually have a year of data, which quietly fills your covariates
    with structural zeros.</p>
    <p>Three different settings, three different jobs, easy to conflate.</p>
  </div>
</div>

<div class="quiz">
  <p class="quiz__q">5. A model discriminates well but is poorly calibrated. What can you still legitimately do with it?</p>
  <ul class="quiz__opts">
    <li data-correct="false">Report absolute risk to individuals</li>
    <li data-correct="true">Rank people for prioritisation, while stating clearly that the predicted probabilities are not trustworthy as absolute risks</li>
    <li data-correct="false">Nothing; discard it</li>
    <li data-correct="false">Use it as-is, since AUROC is the standard reported metric</li>
  </ul>
  <div class="quiz__why">
    <p>Ranking only needs the ordering to be right, so a well-discriminating,
    poorly-calibrated model can still support "review these 200 people first."
    What it cannot support is telling someone their risk is 12%.</p>
    <p>The obligation is to say which one you are doing. Reporting AUROC alone
    and letting readers assume the probabilities are meaningful is the failure
    mode TRIPOD was written to prevent.</p>
  </div>
</div>

---

## Trainer notes

??? note "Running this lab in a live room"

    **Pre-stage the environment.** The R setup will eat your session if you let
    it. Send the
    [environment checklist](../common_artifacts/hades-r-environment-checklist.md)
    a week ahead and hold a drop-in for it. Have Eunomia ready as the fallback
    for anyone whose access is still pending &mdash; and expect that to be
    several people.

    **Pair people up.** One driving, one reading the documentation. This lab
    punishes solo debugging.

    **Timebox Lab 4 hard.** A first PLP run on a real CDM can take far longer
    than a session allows. Set `sampleSize` aggressively and say why: iteration
    speed during development, full sample only for the final run.

    **Lab 5 is the one that matters.** If you are short on time, cut Labs 3 and
    4 and demo them instead &mdash; but make everyone do Lab 5 on your demo
    results. Interpretation is the skill they will actually need, and the one
    they cannot get from a vignette.

??? note "Common questions"

    **"Can I do all of this in ATLAS?"** &mdash; Most of the specification, yes.
    The final analysis must run in R, but the ATLAS Prediction module will build
    the R package for you.

    **"Which model should I use?"** &mdash; Start with regularized logistic
    regression. Add others for comparison, not instead.

    **"Why is my AUROC so high?"** &mdash; It is leakage. It is almost always
    leakage.
