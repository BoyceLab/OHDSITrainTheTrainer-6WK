---
title: "Day 05 — Treatment Pathways"
---

# 🧪 Day 05 — Treatment Pathways in OHDSI Atlas

## 🎯 Learning Objectives

By the end of this session, participants will be able to:

- Explain the purpose of treatment pathways
- Build **event cohorts** from concept sets
- Configure and run a treatment pathway analysis
- Interpret pathway visualizations and tabular results
- Understand the role of persistence windows and sequence definitions

---

## 🌀 What Are Treatment Pathways?

**Treatment pathways** describe the sequence of treatments or events that patients experience over time **after entering a target cohort**.

In contrast to cohort characterization (which describes *who* the patients are), pathways describe *how* treatments unfold over time.

---

## 🎯 Key Concepts

- **Target Cohort** — The population whose treatment journey we want to understand  
  Example: *Type 2 Diabetes Mellitus*

- **Event Cohorts** — Specific observable events (e.g., drugs) that make up the pathway  
  Example: *Metformin*, *DPP4 inhibitors*, *SGLT2 inhibitors*, *Insulin*

- **Persistence Window** — How long we assume continuity between exposures  
  Determines whether separate exposures are part of a *single episode*

---

## 🧱 Step 1 — Build Event Cohorts

Unlike concept sets used for cohort definitions, **treatment pathways require drugs/events as cohorts**.

> Each drug/class must be defined as a **cohort event**.

### Example — Metformin

1. **Create a new cohort definition**
   - Name: `Metformin`
2. **Concept Set**
   - Ingredient-level *metformin* RxNorm concept
   - Include descendants
3. **Cohort Definition**
   - **Entry:** Drug exposure of *metformin*
   - **Observation:** 0 days before / 0 days after
   - **Limit initial events:** Earliest per person
4. **Cohort Exit / Persistence**
   - Persist until *end of continuous drug exposure*
   - Persistence window: ~30 days

Repeat this for other drug classes (DPP4, SGLT2, Insulin, etc).

**Note:** Do *not* include diagnosis logic here — event cohorts should be exposure definitions only.

---

## ⚙️ Step 2 — Configure the Pathway Analysis

1. In **Analyses → Pathways**
2. **Select Target Cohort**
   - `[RB] Type 2 Diabetes Mellitus`
3. **Add Event Cohorts**
   - `Metformin`, `DPP4`, `SGLT2`, `Insulin`, …
4. **Persistence Window**
   - Set a default (e.g., 30 days)
5. Save and **Generate**

---

## 📊 Step 3 — Explore the Visualization

### 🌀 Sunburst Plot

- The **center** is cohort entry (diagnosis)
- Each **ring** is a subsequent treatment event
- **Colors** represent different event cohorts

**Reading the plot:**
- The first ring = first treatment after index
- Outward rings = next distinct treatments
- Thickness = number of people following that path

---

## 🔍 Path Details

When you click a segment:

- **Name:** Shows the event or sequence
- **Remain:** Patients who end on that path
- **Diff:** Patients who move to another event

> Note: “Remain” does *not* imply discontinuation — it means *no further new events observed*.

---

## 📋 Step 4 — Explore the Tabular View

Switch to **Tabular** to see:

### Table 1a — All Pathways
- Lists sequences and counts
- `% with Pathway`: percentage of the pathway population

### Table 1b — Event Cohort Counts by Rank
- Shows how often each event appears at a given sequence position

### Table 1c — Event Cohort Counts (Overall)
- How many patients ever experienced each event

### Table 1d — Distinct Event Cohorts
- How many unique events each patient experienced
- Useful for understanding the complexity of pathways

---

## 🔁 Persistence Window Sensitivity

**Persistence windows strongly shape pathways:**
- *Short windows* produce more fragmented episodes
- *Long windows* merge exposures into single episodes

Example:
| Persistence | More steps? | Fewer steps? |
|-------------|-------------|--------------|
| 0 days      | ✅ Yes       | ❌ No         |
| 30 days     | Balanced     | Balanced     |
| 90 days     | ❌ No        | ✅ Yes        |

---

## 🧠 Common Pitfalls & Clarifications

### Concept Sets vs Cohorts
> Concept sets define *what* a drug is — but ATLAS needs **cohorts** to define *when* it occurs.

### Persistence ≠ Adherence
Persistence windows control how we **interpret exposure continuity**

### Sequence ≠ Order of Random Clinical Decision
ATLAS shows observable sequence — it doesn’t imply clinical intent or guideline adherence.

---
### [ATLAS Characterization & Treatment Pathways Cheat Sheet](common_artifacts/atlas-characterization-treatment-pathways-cheat-sheet.md)
> A practical reference for building target cohorts, event cohorts, and interpreting pathway visualizations and tables.  
> Ideal for Weeks 5–6 (ATLAS Characterization + Treatment Pathways).

### [Atlas Treatment Pathways Exercises & Quiz](exercises/day-05-pathways.md)
> Companion materials for week 5.

## 🎤 Tips for Teaching

- Start with **one pathway event (Metformin)** before adding others
- Explain **why no days appear** in event cohort definitions
- Use both **Sunburst and Tabular** together
- Compare different persistence windows to show effect on Table 1d

---

## 🧪 Suggested Hands-On Exercises

1. Build event cohorts for 3 drug classes
2. Generate pathways and interpret top 3 paths
3. Change persistence from 30 → 90 days and compare Table 1d
4. Compare pathways across two databases

---

## 🧾 Summary

- Pathways tell *what happens next* after cohort entry
- Event cohorts must be defined *as cohorts*
- Persistence windows are key to interpreting results
- Use both visualization and tabular summaries to understand patterns

