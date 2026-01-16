---
title: "Day 05 — Treatment Pathways"
---

# 🧪 Day 05 — Treatment Pathways

> 🚧 **This page is actively being refined.**  
> Content below is stable for teaching and exercises, but formatting and additional resources may continue to evolve.

---

## 📚 Table of Contents
- [Overview](#overview)
- [Learning Objectives](#learning-objectives)
- [Student Workbook & Hands-On Lab](#student-workbook--hands-on-lab)
  - [Part 1 — Confirm the Target Cohort](#part-1--confirm-the-target-cohort)
  - [Part 2 — Build Event Cohorts](#part-2--build-event-cohorts-drugs-as-cohorts)
  - [Part 3 — Configure the Pathway Analysis](#part-3--configure-the-treatment-pathway-analysis)
  - [Part 4 — Interpret the Visualization](#part-4--interpret-the-sunburst-visualization)
- [Knowledge Check](#knowledge-check)
- [Instructor Notes](#instructor-notes)

---

## Overview

In Day 05, participants learn how to use **OHDSI ATLAS Treatment Pathways** to describe **observable sequences of care** following cohort entry.

This module builds directly on:
- Cohort definition (Day 03)
- Cohort characterization (Day 04)

---

## Learning Objectives

By the end of this session, participants will be able to:

- Explain the difference between **target cohorts** and **event cohorts**
- Build drug-based cohorts for treatment pathway analysis
- Configure and run a pathway analysis in ATLAS
- Interpret both **sunburst visualizations** and **tabular outputs**
- Explain how **persistence windows** affect pathway results

---

## 📝 Student Workbook & Hands-On Lab

### 🧠 Key Reminders (Read Before You Start)

- **Concept sets define WHAT**
- **Cohorts define WHEN**
- Treatment pathways require **event cohorts**, not concept sets
- Pathways advance only when a **new event cohort** is entered
- Persistence windows affect interpretation, not patient behavior

---

### Part 1 — Confirm the Target Cohort

Confirm that the following cohort exists and has been generated:

- ** Type 2 Diabetes Mellitus**

✔ Cohort has an index date  
✔ Cohort successfully generated on your database  

✍️ **Record**  
- Total cohort count: ______________________

---

### Part 2 — Build Event Cohorts (Drugs as Cohorts)

Create cohorts representing **treatment events**.

Build **at least three** of the following:

- Metformin  
- DPP4 inhibitors  
- Sulfonylureas  
- Insulin  

#### Example — Metformin Event Cohort

1. Go to **Cohorts → New Cohort**
2. Name: `Metformin`
3. Concept set:
   - RxNorm ingredient: *metformin*
   - Include descendants
4. Entry event:
   - Drug exposure
   - Observation: `0 days before / 0 days after`
   - Limit to **earliest event per person**
5. Exit:
   - End of continuous drug exposure
   - Persistence window: `30 days`
6. Save and generate

✍️ Metformin cohort count: ______________________

---

### Part 3 — Configure the Treatment Pathway Analysis

1. Navigate to **Analyses → Pathways**
2. Create a **New Pathway Analysis**
3. Target cohort:
   - ` Type 2 Diabetes Mellitus`
4. Add event cohorts:
   - Metformin
   - DPP4
   - Sulfonylureas
   - Insulin
5. Persistence window:
   - `30 days`
6. Save and generate

✍️ Record:
- Persons with pathways: ______________________  
- % of cohort with pathways: ______________________

---

### Part 4 — Interpret the Sunburst Visualization

Answer while viewing the **Visualization** tab:

1. Most common first treatment after cohort entry:  
   ___________________________________________

2. Insulin appears:
   - ☐ Early
   - ☐ Late
   - ☐ Both

3. What do **Remain** and **Diff** represent?

✍️ Notes:


---

## ❓ Knowledge Check

Select the **single best answer**.

### Question 1  
What is the primary purpose of treatment pathway analysis?

A. Estimate causal effects  
B. Describe observable treatment sequences  
C. Calculate incidence  
D. Validate cohorts  

**Answer:** B

---

### Question 2  
What defines the center of the sunburst?

A. First drug exposure  
B. Start of observation  
C. Entry into the target cohort  
D. First event cohort  

**Answer:** C

---

### Question 3  
Why are drugs defined as cohorts in pathways?

A. Concept sets cannot include descendants  
B. Cohorts provide timing and persistence  
C. Drugs cannot be conditions  
D. Cohorts imply intent  

**Answer:** B

---

### Question 4  
What does each outward ring represent?

A. Time since diagnosis  
B. Dose escalation  
C. Entry into a new event cohort  
D. Refills  

**Answer:** C

---

### Question 5  
Which table best summarizes pathway complexity?

A. Table 1a  
B. Table 1b  
C. Table 1c  
D. Table 1d  

**Answer:** D

---

## 🧾 Scoring Guide

| Score | Interpretation |
|------:|----------------|
| 9–10 | Excellent |
| 7–8  | Solid |
| 5–6  | Review |
| <5   | Revisit materials |

---

## 🧑‍🏫 Instructor Notes

- Emphasize **Table 1d** for rapid understanding of complexity
- Reinforce that pathways are **descriptive, not causal**
- Encourage learners to experiment with persistence windows
