---
title: How This Course Works
status: new
---

# How This Course Works

<ul class="meta-row">
  <li><strong>Read time</strong> ~6 min</li>
  <li>Do this <strong>before Week 1</strong></li>
</ul>

This page answers the four questions people ask in the first ten minutes of
every cohort: what am I going to be able to do at the end, what do I need
installed, how much of this is programming, and what do I do if I fall behind.

---

## What you will be able to do

By the end of the six core weeks you should be able to sit down in front of an
unfamiliar OMOP CDM and:

- read the table structure and find out what is actually in it;
- look up a clinical idea in Athena and tell a standard concept from a source
  concept, and explain why the difference matters;
- build a concept set and a cohort definition in ATLAS that someone else could
  review;
- export that cohort's SQL and check the numbers yourself;
- and explain all of the above to a colleague who has never heard of OHDSI.

The two optional weeks extend that into treatment pathway analysis (Week 5) and
R-based analytics with HADES (Week 6).

!!! note "This is a *train-the-trainer* course"

    The bar is not "I can click through ATLAS." The bar is "I can teach this
    without hand-waving." Where a module includes **Teaching notes**, that is the
    part you will need when it is your turn at the front of the room.

---

## Three tracks through the same material

Nobody arrives with the same background. Pick the track that matches you &mdash;
you will still attend the same sessions, but you will spend your effort
differently. The [Personas & Learning Paths](personas.md) page has the longer
version.

=== "GUI-first"

    **You are** a clinician, terminologist, or analyst who wants to design and
    interpret studies, not write pipelines.

    **Spend your time in** Athena, the ATLAS Concept Set and Cohort editors, and
    the Characterization module. Read the SQL that ATLAS generates; you do not
    need to write it from scratch.

    **Skip-able:** the SQL validation mini-labs, the R environment setup.

=== "SQL-first"

    **You are** a data analyst or engineer who already lives in Databricks,
    DBeaver, or SQL Server and is coming from Epic Clarity or a similar warehouse.

    **Spend your time in** the exported cohort SQL, the
    [OMOP SQL Examples](common_artifacts/omop-sql-examples.md), and the
    [SQL Validation Mini Lab](common_artifacts/sql-validation-mini-lab.md).
    Your instinct to check ATLAS's arithmetic is correct &mdash; use it.

    **Skip-able:** none of the vocabulary material. It is where SQL-first people
    most often get burned.

=== "Methods-first"

    **You are** a statistician or epidemiologist evaluating whether OHDSI methods
    are trustworthy enough to use in your own work.

    **Spend your time in** Weeks 3 through 6, especially cohort definition
    (because that is where the causal assumptions live) and
    [Week 6 HADES](modules/day-06-hades.md).

    **Start with:** [OHDSI uses methods you already know](modules/day-06-hades.md#ohdsi-uses-methods-you-already-know).
    You are right to be skeptical; that section is written for you.

---

## Before Week 1

Work through the [Environment Walk-through](modules/00-environment-walkthrough.md)
and the [Environment Checklist](common_artifacts/environment-checklist-template.md).
The short version:

<div class="lab-progress"></div>

- [ ] I can log in to **ATLAS** and see at least one data source
- [ ] I can run a `SELECT` against the **CDM schema** from a SQL client
- [ ] I know which **CDM version** my instance is on (5.3 or 5.4)
- [ ] I know my **cdmDatabaseSchema** and **resultsDatabaseSchema** names
- [ ] I have an [Athena](https://athena.ohdsi.org/) account
- [ ] I have joined the [OHDSI Forums](https://forums.ohdsi.org/)

For Week 6 only, you will also need R. That has its own list on the
[HADES / R Environment Checklist](common_artifacts/hades-r-environment-checklist.md)
&mdash; start it a week early, because the Java and Python dependencies are the
part that goes wrong.

!!! warning "Vocabulary drift is real"

    If your CDM was built against an older vocabulary release than the one
    Athena is serving today, concept IDs you look up online may not resolve in
    your instance. Find out which vocabulary version you are on before Week 1 and
    write it down. It explains a surprising share of "the query returns zero rows"
    problems.

---

## Using the labs on this site

**Checklists remember you.** Any lab with checkboxes keeps your progress in your
own browser's local storage, per page. It never leaves your machine, and
clearing your browser data clears it. There is a **Reset** button on the progress
bar at the top of each lab.

**Self-checks are not graded.** Click an option and you get the answer plus the
reasoning. Getting one wrong on purpose to read the explanation is a legitimate
study strategy.

**Acronyms are defined in place.** Hover or tap any acronym &mdash; CDM, TAR,
AUROC, SCCS &mdash; to see what it stands for. The full list lives in the
[Glossary](glossary.md).

**Code blocks copy.** The icon in the top-right of any code block copies it.

---

## If you fall behind

The weeks build, but they do not all build equally. If you have to miss one:

| Missed week | How much it hurts | Catch up by |
|---|---|---|
| Week 1 &mdash; CDM & vocabularies | **A lot.** Everything downstream assumes it. | Doing the Week 1 lab before Week 2, even if late |
| Week 2 &mdash; Concept sets & DQ | Moderate | Reading the module; the lab can wait |
| Week 3 &mdash; Cohort definitions | **A lot.** Weeks 4&ndash;6 all consume cohorts. | Doing the lab; ask for a review of your definition |
| Week 4 &mdash; Extraction | Low if you are GUI-first | Skimming the SQL examples |
| Week 5 &mdash; Pathways | None; it is optional and self-contained | Whenever you like |
| Week 6 &mdash; HADES | None; optional | Whenever you like, but do the R setup first |

Bring questions to [Office Hours](community/office-hours.md), and add anything
that stumped you to the [Living FAQ](community/faq.md) &mdash; if it stumped you,
it stumped someone else.
