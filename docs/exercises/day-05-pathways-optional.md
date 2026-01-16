# Exercises · Day 5 (Optional) — Treatment Pathways
# 🚧 Page Under Construction

This section of the *OHDSI Train-the-Trainer* site is currently being developed.  
Please check back soon for new materials, exercises, and resources.

> 💡 In the meantime, explore the [Resources](../resources.md) or [Modules](../modules/day-01-omop-cdm.md) sections for available content.

---
title: "Day 05 — Treatment Pathways"
---

# 📝 Day 05 — Treatment Pathways  
## Student Workbook & Hands-On Lab (ATLAS)

---

## 📌 Lab Overview

In this lab, you will build and analyze **treatment pathways** for a Type 2 Diabetes Mellitus cohort using **OHDSI ATLAS**.

You will:
- Create **event cohorts** from drug exposures
- Configure and run a **treatment pathway analysis**
- Interpret both **visual** and **tabular** results
- Explore how **persistence windows** change pathway complexity

---

## 🎯 Learning Objectives

By the end of this lab, you should be able to:

- Explain the difference between **target cohorts** and **event cohorts**
- Build drug-based cohorts for pathway analysis
- Run a treatment pathway analysis in ATLAS
- Correctly interpret:
  - Sunburst visualization
  - Tables 1a–1d
- Explain how persistence assumptions affect results

---

## 🧠 Key Reminders (Read Before You Start)

- **Concept sets define WHAT**
- **Cohorts define WHEN**
- Treatment pathways require **event cohorts**, not concept sets
- Pathways advance only when a **new event cohort** is entered
- Persistence windows affect interpretation, not patient behavior

---

## 🧩 Part 1 — Confirm the Target Cohort

### Task
Confirm that the following cohort already exists and has been generated:

- **[RB] Type 2 Diabetes Mellitus**

### Check
- Cohort has an index date
- Cohort was successfully generated on your database

✍️ **Write down**:
- Total cohort count: ______________________

---

## 🧱 Part 2 — Build Event Cohorts (Drugs as Cohorts)

You will now create cohorts that represent **treatment events**.

### Event Cohorts to Build
Create **at least three** of the following:

- Metformin  
- DPP4 inhibitors  
- Sulfonylureas  
- Insulin  

---

### Step-by-Step Example — Metformin Event Cohort

1. Go to **Cohorts → New Cohort**
2. Name the cohort:  
   `Metformin`

3. **Concept Set**
   - RxNorm ingredient: *metformin*
   - Include descendants

4. **Cohort Entry Event**
   - Drug exposure of metformin
   - Observation requirement: `0 days before / 0 days after`
   - Limit to **earliest event per person**

5. **Cohort Exit**
   - Persist until **end of continuous drug exposure**
   - Persistence window: `30 days`

6. Save and generate the cohort

✍️ **Record**:
- Metformin cohort count: ______________________

---

### Repeat for Additional Drug Classes

✍️ **Record cohort counts**:

| Drug Class | Cohort Count |
|-----------|--------------|
| DPP4 | |
| Sulfonylureas | |
| Insulin | |

---

## ⚙️ Part 3 — Configure the Treatment Pathway Analysis

1. Navigate to **Analyses → Pathways**
2. Create a **New Pathway Analysis**
3. Select **Target Cohort**:
   - `[RB] Type 2 Diabetes Mellitus`
4. Add **Event Cohorts**:
   - Metformin
   - DPP4
   - Sulfonylureas
   - Insulin
5. Set **Persistence Window**:
   - `30 days`
6. Save and **Generate**

✍️ **Record**:
- Persons with pathways: ______________________  
- % of cohort with pathways: ______________________

---

## 🌀 Part 4 — Interpret the Sunburst Visualization

Answer the following while viewing the **Visualization** tab.

### Questions

1. What is the **most common first treatment** after cohort entry?  
   ___________________________________________________________

2. Does insulin appear:
   - ☐ Early in pathways  
   - ☐ Late in pathways  
   - ☐ Both  

3. What do **Remain** and **Diff** represent when clicking a pathway segment?

✍️ Notes:
