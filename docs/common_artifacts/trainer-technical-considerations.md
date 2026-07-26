---
title: Trainer Technical Considerations
status: new
---

# Trainer Technical Considerations

<ul class="meta-row">
  <li><strong>Audience</strong> people teaching this</li>
  <li><strong>Status</strong> living document &mdash; add to it</li>
</ul>

The things that go wrong in a live room, and how to get ahead of them. This page
is meant to grow: when a session breaks in a new way, write it down here.

---

## Before the course

<div class="lab-progress"></div>

- [ ] Confirm every participant has ATLAS access **and has logged in once**
- [ ] Confirm CDM read access from a SQL client, not just from ATLAS
- [ ] Record the CDM version, vocabulary version, and last refresh date
- [ ] Check that cohort generation is not queued behind a long-running job
- [ ] Identify who can grant permissions quickly during a session
- [ ] Have a fallback data source &mdash; Eunomia, or a public demo ATLAS
- [ ] Decide and announce the local naming conventions

!!! tip "The single highest-value pre-flight step"

    Make everyone log in once, a week early, and screenshot what they see. Access
    that "should work" and access that has been exercised are different things,
    and the gap between them costs the first forty minutes of Week 1.

## Environment drift

The most common cause of "it worked last week":

| Drift | Effect | Mitigation |
|---|---|---|
| CDM refresh | Counts change mid-course | Note the refresh schedule; tell people counts will move |
| Vocabulary update | Concept IDs resolve differently | Record the vocabulary version in every exercise |
| ATLAS upgrade | Screens move | Re-shoot screenshots each cohort; date them |
| Package updates | Code in slides stops matching | Pin with `renv`; state package versions on slides |
| Credential rotation | Everyone is locked out at once | Know who rotates them and when |

## Permissions

Read access to the CDM is not enough. Participants also need:

- **Write** access to a results schema, so cohorts can be generated.
- **Execute** rights for whatever runs the generation job.
- Enough **query resource** that a cohort generation does not get killed.

Sort this out before Week 3, when cohort generation starts. Discovering it in the
room costs the session.

## Performance

- Cohort generation on a large CDM can take minutes to hours. Have a
  **pre-generated** cohort ready to fall back on.
- Characterization and pathway analyses are heavier still. Pre-run the demo.
- For Week 6, `sampleSize` is your friend. Say out loud that you are sampling and
  why.

## Week-specific notes

??? note "Weeks 1&ndash;2 — vocabulary"

    The reliable surprise is that Athena's current vocabulary release is newer
    than the one the local CDM was built against. Have an example ready where a
    concept ID from Athena returns nothing locally, and use it to teach the
    lesson rather than treating it as a hiccup.

??? note "Week 3 — cohort generation"

    Generation queues are the risk. Build the demo cohort ahead of time, and have
    participants build a deliberately *small* cohort so they see the whole loop
    within the session.

    Budget time for reading attrition tables. It is the most valuable ten minutes
    in the course and the first thing cut when running late.

??? note "Week 4 — SQL clients"

    Client setup varies more than you expect: driver versions, JDBC paths, VPN
    requirements. Send setup instructions early and hold a drop-in.

??? note "Week 5 — pathways"

    The reliable confusion is concept sets versus event cohorts. Expect it and
    plan the explanation rather than improvising it.

??? note "Week 6 — R and HADES"

    Java is the blocker, every time. See the
    [R environment checklist](hades-r-environment-checklist.md) and send it a
    week ahead.

    Have Eunomia ready. Have your own results directory ready so that Lab 5 can
    happen even if nobody's own run finished.

## Room and delivery

- **Two screens if possible** &mdash; slides on one, live tool on the other.
- **Zoom the browser to at least 125%.** ATLAS is dense and the back row cannot
  read it.
- **Narrate your clicks.** "I'm going to Cohort Definitions, then New" &mdash;
  people following along are always a beat behind.
- **Anonymous polling** at the start. Hide the leaderboard and turn off points,
  and say explicitly that it is not a test.
- **Pair people** for labs. Solo debugging in a workshop is where people quietly
  give up.

## When something breaks live

1. **Say so.** "That's not what I expected" is more credible than improvising.
2. **Switch to the pre-baked artifact.** Always have one.
3. **Write the failure down** &mdash; here, and in the
   [FAQ](../community/faq.md).
4. **Come back to it** at the end if you solved it. Debugging in public is good
   teaching, as long as it is bounded.

!!! quote "Model the honesty you want"

    Saying "I have not used that package myself" or "I don't know, let's find
    out" is not a weakness in a train-the-trainer setting. It is the behaviour
    you are asking them to carry into their own rooms.
