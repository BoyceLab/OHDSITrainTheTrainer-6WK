---
title: ATLAS User Process Guide
status: new
---

# ATLAS User Process Guide

<ul class="meta-row">
  <li><strong>Type</strong> process reference</li>
  <li><strong>Used in</strong> Weeks 2&ndash;6</li>
</ul>

The order of operations in ATLAS, and what each step actually produces. Referenced
from Week 3 onward.

!!! note "Local naming"

    In our environment ATLAS is called **SEARCH**, and a cohort definition is
    called a **criteria definition**. The screens are the same.

---

## The pipeline

<div class="handoff">
  <div class="handoff__side handoff__side--design">
    <h4>You build</h4>
    <ul>
      <li>Concept set &mdash; <em>what counts</em></li>
      <li>Cohort definition &mdash; <em>who and when</em></li>
      <li>Analysis &mdash; <em>what question</em></li>
    </ul>
  </div>
  <div class="handoff__pipe">
    <span class="label">produces</span>
    <span class="cohort-id">cohort_id</span>
    <span class="label">for everything downstream</span>
  </div>
  <div class="handoff__side handoff__side--exec">
    <h4>You get</h4>
    <ul>
      <li>Rows in the cohort table</li>
      <li>Exportable SQL and JSON</li>
      <li>An ID R can reference</li>
    </ul>
  </div>
</div>

---

## 1. Search — find concepts

Start in **Search** or in [Athena](https://athena.ohdsi.org/).

- Prefer **standard** concepts (`standard_concept = 'S'`) for anything you intend
  to query.
- Check the **domain**: a concept in the Condition domain will not be found in
  `drug_exposure`, no matter how sensible that seems.
- Look at **record counts** in your own data source before committing. A concept
  that is perfect in theory and absent in practice is not perfect.

## 2. Concept Sets — define what counts

- Add concepts, then decide per row on **descendants**, **mapped**, and
  **excluded**.
- **Include descendants** is how you capture a clinical idea rather than one code
  &mdash; but check how many descendants you just pulled in.
- **Include mapped** brings in non-standard source concepts that map to your
  standard ones. Usually what you want when the ETL is imperfect.
- Use the **Included Concepts** and **Included Source Codes** tabs to see exactly
  what you built. This is the step people skip and then regret.

!!! tip "Name concept sets for a stranger"

    `[Study] Atrial fibrillation - broad` beats `AF v3 final FINAL`. Someone will
    inherit this, and it may be you.

## 3. Cohort Definitions — define who and when

| Component | Question it answers |
|---|---|
| **Initial event** | What puts someone in, and on what date? This sets the index date. |
| **Observation window** | How much data before and after index must exist? |
| **Limit initial events** | Earliest event per person, or all events? |
| **Inclusion criteria** | Which qualifying events survive additional filters? |
| **Exit criteria** | When does the person leave the cohort? |

Then **Generate** against each data source. Nothing exists in the database until
you do.

- Check the **Generation** tab for counts and errors.
- Read the **inclusion rule attrition** &mdash; how many people each rule removed.
- Note the **cohort ID** at the top of the screen. That is what R will use.

!!! warning "Generation is per data source"

    A cohort generated against source A does not exist in source B. This is the
    most common reason an R script returns zero rows for a cohort you can see in
    the browser.

## 4. Characterization — describe the cohort

Cohort characterization produces demographics, prior conditions, drugs, and
utilization for a cohort. Useful both as a result and as a sanity check: if the
mean age is 12 in an atrial fibrillation cohort, stop and look at the definition.

## 5. Cohort Pathways — sequence events

See [Week 5](../modules/day-05-treatment-pathways.md). Requires event cohorts, not
concept sets &mdash; a distinction that catches almost everyone the first time.

## 6. Incidence Rates, Estimation, Prediction

The analysis modules consume cohorts you have already built. The Prediction
module can generate a full R study package &mdash; see the
[Week 6 walk-through](../modules/day-06-plp-walkthrough.md).

## 7. Export — take it with you

Every cohort definition can be exported as:

| Format | Use |
|---|---|
| **SQL** | Run it yourself to validate; choose your dialect |
| **JSON** | Version control, sharing, and programmatic reuse |
| **Markdown** | Human-readable definition for a protocol appendix |

---

## Habits worth forming

- [ ] Name things for a stranger
- [ ] Generate before you assume a cohort exists
- [ ] Read the attrition table every time
- [ ] Export the JSON into version control
- [ ] Record the cohort ID, data source, and generation date together
- [ ] Run `CohortDiagnostics` before any analysis depends on the cohort

## Common failure modes

| Symptom | Usual cause |
|---|---|
| Cohort has zero people | Never generated on this source; or an inclusion rule removed everyone |
| Far more people than expected | Descendants pulled in more than intended; or all events rather than earliest |
| Counts changed since last week | CDM refresh, or vocabulary update, or someone edited the definition |
| R cannot find the cohort | Wrong `resultsDatabaseSchema`, wrong cohort table, or wrong data source |
| Concept set looks right, cohort is empty | Domain mismatch &mdash; concepts from the wrong domain for the criteria used |
