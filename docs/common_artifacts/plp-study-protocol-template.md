---
title: Prediction Study Protocol Template
status: new
---

# Prediction Study Protocol Template

<ul class="meta-row">
  <li><strong>Type</strong> fill-in template</li>
  <li><strong>Write this</strong> before you see any results</li>
</ul>

A protocol that specifies how you plan to execute the study, written in advance.
In a network study it will be reviewed by the governance boards of every
participating data source &mdash; but the more important reader is you, six
months from now, trying to remember why you made a choice.

!!! quote "Why bother, when the code is right there?"

    Because the code records *what* you did, not *what you intended*. A protocol
    written before the results exist is the only durable evidence that a design
    choice was a design choice rather than a reaction to an inconvenient
    finding.

    Reporting guidance for prediction models: [TRIPOD](https://www.tripod-statement.org/).

---

## 1. Administrative

| Field | Value |
|---|---|
| Study title | |
| Version and date | |
| Investigators | |
| Data sources | |
| Protocol registered at | |

## 2. Rationale and background

*Two or three paragraphs. What decision would a good model change? Who acts on
it, and when?*

## 3. Objective

State the prediction question in one sentence, in the OHDSI template form:

> Among **[target population]**, who will experience **[outcome]** within
> **[time at risk]**?

## 4. Study design

| Element | Specification |
|---|---|
| Design | Patient-level prediction |
| Target cohort (T) | Name, ATLAS ID, plain-language definition |
| Outcome cohort (O) | Name, ATLAS ID, plain-language definition |
| Time at risk | Start day, end day, relative to index |
| Minimum time at risk | |
| Prior observation required | |
| People with prior outcomes | Included / excluded, **and why** |

## 5. Data sources

| Database | CDM version | Vocabulary version | Refresh date | Role |
|---|---|---|---|---|
| | | | | Development / validation |

## 6. Covariates

| Element | Specification |
|---|---|
| Covariate lookback window | |
| Covariate end day | Normally `-1` |
| Domains included | Conditions / drugs / procedures / measurements / visits / demographics |
| Custom covariates | |
| Excluded covariates | And why &mdash; e.g. concepts that define cohort entry |

## 7. Analysis

| Element | Specification |
|---|---|
| Algorithms | List every one you will fit, in advance |
| Hyperparameter search | |
| Train/test split | Proportion, method, seed |
| Cross-validation folds | |
| Sampling | Note that under/oversampling is generally **not** recommended |

## 8. Evaluation

| Element | Specification |
|---|---|
| Discrimination | AUROC, AUPRC |
| Calibration | Plot, slope, intercept; subgroup calibration |
| Internal validation | |
| External validation | Which databases, and whether recalibration will be applied |
| Pre-specified subgroups | |

!!! tip "Pre-specify the threshold conversation"

    If the model will inform a decision, state *now* how a threshold would be
    chosen and what trade-off is acceptable. Choosing it after seeing the ROC
    curve is how a study quietly becomes a sales pitch.

## 9. Sample size and expected events

*Events per candidate variable, and what you will do if the outcome is rarer than
expected.*

## 10. Strengths and limitations

*Be specific. "Observational data has limitations" is not a limitation; "our
outcome definition requires an inpatient or emergency encounter and will
undercount events managed in primary care" is.*

## 11. Protection of human subjects

*IRB status, data use agreements, and confirmation that no patient-level data
leaves each site.*

## 12. Dissemination

*Where results, code, and the protocol itself will be published.*

---

## Appendix A · Cohort definitions

*Full definitions, exported from ATLAS as JSON and human-readable Markdown via
`CirceR`.*

## Appendix B · Concept sets

*Every concept set, with the vocabulary version used.*

## Appendix C · Environment

*Output of `sessionInfo()` and the contents of `renv.lock`.*
