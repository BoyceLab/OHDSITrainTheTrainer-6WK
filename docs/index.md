---
title: Home
---

# OHDSI / OMOP Train-the-Trainer

Six weeks from *"what is a `person_id`?"* to running a reproducible analysis in R
against your own OMOP CDM &mdash; and being able to teach it to someone else.

<ul class="meta-row">
  <li><strong>6</strong> half-day sessions</li>
  <li><strong>2</strong> optional advanced weeks</li>
  <li>GUI <strong>and</strong> SQL tracks</li>
  <li>Bring your own CDM</li>
</ul>

This site is the living companion to the *Train-the-Trainer* program. Everything
here is version-controlled in the course repository, so slides, labs, and fixes
land here as they happen rather than in an email attachment you have to hunt for
six months from now.

!!! tip "New here? Read this first"

    Start with [**How This Course Works**](start-here.md) &mdash; it explains the
    three learner tracks, what you need installed before Week 1, and how to use
    the labs on this site. Then check the
    [Environment Walk-through](modules/00-environment-walkthrough.md).

---

## The six weeks

<div class="week-grid" markdown="1">

<div class="week-card" markdown="1">
<p class="wk">Week 01</p>

### OMOP CDM & Vocabularies

Learn the table structure and the vocabulary system that let different tools and
different institutions speak the same analytic language.

<div class="links" markdown="1">
[Module](modules/day-01-omop-cdm.md) ·
[Lab](exercises/day-01-athena-cdm.md) ·
[Snippets](exercises/code_snippets/day-01-snippets.md)
</div>
</div>

<div class="week-card week-card--vocab" markdown="1">
<p class="wk">Week 02</p>

### Data Quality & Concept Sets

Build concept sets in ATLAS, then validate what you built with SQL. Two views of
the same question: *did I actually capture what I meant to capture?*

<div class="links" markdown="1">
[Module](modules/day-02-vocab-dqd.md) ·
[Lab](exercises/day-02-vocab-dqd.md)
</div>
</div>

<div class="week-card" markdown="1">
<p class="wk">Week 03</p>

### Cohort Definitions

Index events, inclusion criteria, exit criteria. The design work that every later
analysis depends on &mdash; and the week where most study errors are prevented.

<div class="links" markdown="1">
[Module](modules/day-03-cohorts.md) ·
[Lab](exercises/day-03-cohorts.md)
</div>
</div>

<div class="week-card week-card--derived" markdown="1">
<p class="wk">Week 04</p>

### Cohort Extraction

Pull cohort data out for analysis and cross-check the counts by hand. Trust, but
verify &mdash; in Databricks or DBeaver.

<div class="links" markdown="1">
[Module](modules/day-04-extraction.md) ·
[Lab](exercises/day-04-extraction.md)
</div>
</div>

<div class="week-card week-card--system" markdown="1">
<p class="wk">Week 05 · optional</p>

### Treatment Pathways

Sequence treatments after cohort entry and read a sunburst plot without fooling
yourself about what "remain" means.

<div class="links" markdown="1">
[Module](modules/day-05-treatment-pathways.md) ·
[Lab & Quiz](exercises/day-05-pathways.md)
</div>
</div>

<div class="week-card week-card--derived" markdown="1">
<p class="wk">Week 06 · optional</p>

### HADES & Advanced Analytics

Take the cohorts you designed in ATLAS and run real analytics on them in R.
Characterization, estimation, and patient-level prediction.

<div class="links" markdown="1">
[Module](modules/day-06-hades.md) ·
[Packages](modules/day-06-hades-packages.md) ·
[Walk-through](modules/day-06-plp-walkthrough.md) ·
[Lab & Quiz](exercises/day-06-hades-optional.md)
</div>
</div>

</div>

---

## Recently added

- **Week 6 &mdash; HADES** is now a full module rather than a placeholder:
  [From ATLAS to HADES](modules/day-06-hades.md),
  a [package catalogue](modules/day-06-hades-packages.md),
  a [patient-level prediction walk-through](modules/day-06-plp-walkthrough.md),
  and a guide to [reading your results](modules/day-06-analysis-viewer.md).
- New artifacts: the
  [ATLAS to HADES hand-off sheet](common_artifacts/atlas-to-hades-handoff.md),
  a [HADES/R environment checklist](common_artifacts/hades-r-environment-checklist.md),
  and a [prediction study protocol template](common_artifacts/plp-study-protocol-template.md).
- A [glossary](glossary.md) with hover definitions. Any acronym on this site
  &mdash; CDM, TAR, AUROC &mdash; shows its meaning when you hover or tap it.

## How to use this site

<div class="grid cards" markdown="1">

-   **Follow the weeks in order.** Each week has a *Module* (the concepts and the
    slides) and a *Lab* (what you actually do). The modules assume you did the
    week before.

-   **Tick the boxes.** Lab checklists remember what you have completed, in your
    browser, per page. Nothing is sent anywhere.

-   **Answer the checks.** Self-check questions appear throughout. They are for
    you, not for a gradebook &mdash; click an option and you get the reasoning.

-   **Steal the artifacts.** Cheat sheets, checklists, and templates in the
    [Toolkit](resources.md) are meant to be copied into your own institution's
    documentation.

</div>

!!! question "Teaching this yourself?"

    The [Trainer Technical Considerations](common_artifacts/trainer-technical-considerations.md)
    page collects the things that go wrong in a live room &mdash; environment
    drift, permissions, cohort generation queues &mdash; and how to get ahead of
    them. Add to it as your sessions evolve.
