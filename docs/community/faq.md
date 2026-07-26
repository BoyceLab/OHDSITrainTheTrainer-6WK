---
title: Living FAQ
---

# Living FAQ

<ul class="meta-row">
  <li><strong>Type</strong> living document</li>
  <li>Add what stumped you</li>
</ul>

Questions that came up in sessions, with the answers we gave. If something
stumped you, it stumped someone else &mdash; add it.

---

## Getting started

??? question "I have ATLAS access but I cannot see any data sources."

    Access to the application and access to a data source are granted separately.
    Ask whoever administers your instance to add you to the relevant source. If
    you can see sources but they are greyed out, it is usually a permissions
    issue on the results schema rather than the CDM.

??? question "Which CDM version are we on, and does it matter?"

    It matters. Check with:

    ```sql
    SELECT cdm_source_name, cdm_version, vocabulary_version FROM cdm_source;
    ```

    Differences between 5.3 and 5.4 are mostly additive, but some tables and
    fields exist only in 5.4. Documentation and example code will assume one or
    the other.

??? question "Do I need to know R for this course?"

    Not for Weeks 1 to 5. Week 6 is optional and is where R appears. Even there,
    much of HADES is filling in skeleton code rather than writing from scratch
    &mdash; but you do need R installed and working, which is worth starting
    early.

## Vocabulary

??? question "Why does a concept ID from a tutorial return nothing in our data?"

    Three usual causes:

    1. **Vocabulary version mismatch.** Your CDM was built against an older
       release than the one Athena serves today.
    2. **The concept is non-standard.** Non-standard concepts do not appear in
       the `*_concept_id` columns of clinical tables.
    3. **Your data genuinely does not contain it.** Not every source records
       everything.

    Check the concept's `standard_concept` flag and your vocabulary version
    first.

??? question "Standard versus source concept — when do I use which?"

    Query clinical tables on **standard** concepts. Use **source** concepts to
    understand what the original system recorded and to debug mappings. If a
    large share of records have `concept_id = 0`, your ETL is dropping
    information and every cohort downstream will undercount.

??? question "Should I include descendants?"

    Usually yes &mdash; it is how you capture a clinical idea rather than one
    code. But always look at what you pulled in. A concept high in the hierarchy
    can bring thousands of descendants, and some will not be what you meant.

## Cohorts

??? question "My cohort has zero people."

    In order of likelihood:

    1. It was never **generated** against this data source.
    2. An inclusion rule removed everyone &mdash; read the attrition table.
    3. Domain mismatch: concepts from the wrong domain for the criteria.
    4. The prior-observation requirement is longer than your data supports.

??? question "The counts changed since last week."

    A CDM refresh, a vocabulary update, or someone edited the definition. This is
    why the [hand-off sheet](../common_artifacts/atlas-to-hades-handoff.md) asks
    you to record the generation date and refresh date alongside the ID.

??? question "Concept set or cohort — which do I need?"

    A concept set defines *what counts*. A cohort defines *who, and when*. Some
    analyses (treatment pathways, prediction) require cohorts, because they need
    dates, not just codes. This trips up almost everyone the first time.

## Week 6 and HADES

??? question "Do I have to use R? Can I do everything in ATLAS?"

    Most of the *specification* can happen in ATLAS, including generating a
    complete R study package from the Prediction module. The final analysis runs
    in R. There is no way around that, and it is not really a limitation &mdash;
    the R package ATLAS builds for you is the analysis.

??? question "`rJava` will not load."

    Almost always an architecture mismatch: 64-bit R with a 32-bit JDK, or a JDK
    R cannot locate. Check `Sys.getenv("JAVA_HOME")`, confirm both are 64-bit,
    and on Windows make sure RTools is installed. Restart R fully afterwards.

    This is the single most common Week 6 blocker, which is why the
    [checklist](../common_artifacts/hades-r-environment-checklist.md) says to
    start a week early.

??? question "My AUROC is 0.95. Is that good?"

    Almost certainly not &mdash; it is usually leakage. Check that your covariate
    window ends at `endDays = -1`, then look at the top covariates in the model
    tab for something that is really a marker of the outcome being recorded.

??? question "Which prediction algorithm should I use?"

    Start with regularized logistic regression. It is fast, interpretable, and
    frequently competitive in observational health data. Add others for
    comparison under the same study design, not instead of it.

??? question "How do I do any of this without CDM access?"

    Use [Eunomia](https://ohdsi.github.io/Eunomia/), a synthetic CDM in an
    embedded SQLite database. Every lab on this site can be attempted against it.

    ```r
    connectionDetails <- Eunomia::getEunomiaConnectionDetails()
    ```

## Methods and trust

??? question "How do I answer a reviewer who says OHDSI methods are non-standard?"

    Name the actual estimator. "Regularized Cox proportional hazards, fit with
    Cyclops, with propensity score adjustment and negative-control calibration"
    is a standard method described precisely, and every setting is inspectable.

    The longer version is in the
    [Week 6 module](../modules/day-06-hades.md#ohdsi-uses-methods-you-already-know).

??? question "Is this a black box?"

    Less so than most bespoke analysis scripts. The code is open, model settings
    are explicit, diagnostics are generated by default, and intermediate outputs
    are written to disk where you can inspect them.

## Contributing

??? question "How do I add to this FAQ?"

    Open a pull request against the course repository, or bring it to
    [office hours](office-hours.md) and we will add it. Questions asked in a
    session are the best source of material for this page.
