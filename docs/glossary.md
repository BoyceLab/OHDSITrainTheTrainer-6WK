---
title: Glossary
status: new
---

# Glossary

<ul class="meta-row">
  <li><strong>Type</strong> reference</li>
  <li>Acronyms are also defined <strong>on hover</strong> throughout this site</li>
</ul>

Terms as they are used in this course. Where OHDSI usage differs from general
epidemiological usage, that is noted &mdash; those differences cause most of the
confusion.

---

## Core data model

Common Data Model (CDM)
:   The OMOP standard relational structure for observational health data.
    Standardized tables, standardized vocabularies, one shared shape.

Domain
:   The clinical area a concept belongs to, which determines which table its data
    lives in &mdash; Condition, Drug, Procedure, Measurement, Observation, Visit.
    A concept in the wrong domain for your criteria is a common cause of an empty
    cohort.

Concept
:   A single standardized clinical idea with a `concept_id`. The atom of the
    vocabulary system.

Standard concept
:   A concept marked `standard_concept = 'S'`, used for querying clinical tables.
    Non-standard concepts are for mapping *into* standard ones.

Concept set
:   A named collection of concepts, with per-concept rules about descendants,
    mapped codes, and exclusions. Defines *what counts* &mdash; but not *when*.

Concept ancestor
:   The table encoding the vocabulary hierarchy. "Include descendants" in ATLAS
    is a query against it.

Era
:   A derived table collapsing repeated records into periods &mdash;
    `drug_era`, `condition_era`, `dose_era`. Convenient, but derived: know the
    rules used to build it.

Source concept
:   The original code from the source system before mapping. Preserved in the
    `*_source_concept_id` columns, which is where you look when a mapping is
    suspect.

---

## Cohorts

Cohort
:   A set of people who satisfy a definition for a period of time. In OHDSI this
    is deliberately broad &mdash; a cohort can be an exposure, an outcome, a
    disease population, or a single event type.

Cohort definition
:   The logic: entry event, inclusion criteria, exit criteria. Lives in WebAPI as
    JSON and SQL. Reusable across studies.

Cohort generation
:   Executing a definition against a data source so rows land in the cohort
    table. **A definition that has not been generated does not exist in the
    database.**

`cohort_definition_id`
:   The integer that identifies a cohort. The hand-off between ATLAS and R.

Index date
:   `cohort_start_date`. Time zero. Everything else is measured relative to it.

Attrition
:   How many people each inclusion rule removed. The first thing to read after
    generation, and the last thing people remember to.

Event cohort
:   A cohort representing an occurrence rather than a population &mdash; a drug
    exposure, say. Required for treatment pathway analysis, where a concept set
    will not do.

---

## Study design

Target cohort (T)
:   The population at risk. Defines t = 0.

Outcome cohort (O)
:   What you are estimating the effect on, or predicting.

Comparator cohort (C)
:   The alternative exposure in a comparative effectiveness study.

Time at risk (TAR)
:   The window in which outcomes count, defined relative to the index date.
    Normally starts at day 1, so the index event itself cannot be the outcome.

Washout period
:   Time before index during which a person must have *no* prior exposure, to
    qualify as a new user.

New user
:   Someone with no prior exposure during the washout who initiates at a defined
    index date and is followed forward. Mirrors the time-zero logic of a
    randomized trial.

Lookback / observation window
:   The period *before* index from which covariates are built. Ends the day
    before index, to prevent leakage.

Persistence window
:   In pathway analysis, how long continuity is assumed between exposures.
    Controls whether two dispensings are one episode or two. Not the same as
    adherence.

Negative control
:   An exposure&ndash;outcome pair where you have strong reason to expect no
    causal effect. Used to measure how much systematic error a design carries.

---

## Analytics

HADES
:   Health Analytics Data-to-Evidence Suite &mdash; the OHDSI R package
    ecosystem. Formerly the OHDSI Methods Library.

ATLAS
:   The OHDSI web application for specifying cohorts, characterizations, and
    analyses. Called **SEARCH** in our environment.

WebAPI
:   The REST service layer ATLAS runs on. `ROhdsiWebApi` talks to it from R.

Characterization
:   Descriptive analysis: who these people are and what happened to them.

Population-level effect estimation (PLE)
:   Causal analysis: does this exposure change the risk of that outcome?

Patient-level prediction (PLP)
:   Prognostic analysis: for this individual, what is likely to happen next?

Covariate
:   A predictor variable built from data in the lookback window.
    `FeatureExtraction` can generate tens of thousands automatically.

Propensity score (PS)
:   The modelled probability of receiving the treatment given covariates. Used
    to balance comparison groups in `CohortMethod`.

Empirical calibration
:   Adjusting p-values and confidence intervals using the observed distribution
    of effects among negative controls. Measures residual bias rather than
    assuming it away.

---

## Evaluation

Discrimination
:   How well a model separates people who have the outcome from those who do not.
    Measured by AUROC and AUPRC.

AUROC
:   Area under the ROC curve. The probability the model ranks a random person
    with the outcome above a random person without. Insensitive to class
    imbalance &mdash; which is both its convenience and its trap.

AUPRC
:   Area under the precision&ndash;recall curve. The more informative metric when
    the outcome is rare.

Calibration
:   Whether predicted probabilities match observed rates. A model can
    discriminate well and be badly calibrated, and the difference matters at the
    bedside because clinicians act on absolute risk.

Calibration slope / intercept
:   Summary numbers for the calibration plot. Slope near 1 and intercept near 0
    means well calibrated.

Internal validation
:   Evaluation on held-out data from the development database. Guards against
    overfitting, not against non-transferability.

External validation
:   Evaluation on a different database. Tells you whether the model transfers.
    Often it does not, for reasons worth reporting.

Leakage
:   Information from at or after the index date contaminating the covariates.
    Produces implausibly good performance and a useless model. The first thing to
    suspect when AUROC exceeds about 0.90.

Recalibration
:   Adjusting a model's predicted probabilities for a new population. Legitimate,
    and must be reported.

---

## Infrastructure

`renv`
:   R package for locking dependency versions per project, so a study still runs
    next year and on someone else's machine.

`keyring`
:   R package for storing credentials outside your scripts.

Eunomia
:   A small synthetic CDM in an embedded SQLite database. No credentials, no
    governance review, ideal for teaching.

FAIR
:   Findable, Accessible, Interoperable, Reusable &mdash; the data principles
    OHDSI's file-based outputs and open code are designed to support.

Network study
:   A study executed at multiple sites, with only aggregate results shared.
    Patient-level data never leaves the site.

---

!!! tip "Missing a term?"

    Add it. This page is version-controlled like everything else, and the terms
    that confuse you are the terms that confuse the next cohort. Acronyms added
    to `includes/abbreviations.md` also become hover definitions site-wide.
