# Exercises · Day 3 — Cohorts in ATLAS
# 🚧 Page Under Construction

This section of the *OHDSI Train-the-Trainer* site is currently being developed.  
Please check back soon for new materials, exercises, and resources.

> 💡 In the meantime, explore the [Resources](../resources.md) or [Modules](../modules/day-01-omop-cdm.md) sections for available content.

# Building a Cohort Definition in OHDSI ATLAS

## Introduction

In OHDSI, a **cohort** is defined as a set of persons who satisfy one or more inclusion criteria for a duration of time. Cohorts are a fundamental unit of analysis, so it’s crucial to define them precisely, including how patients enter the cohort (initial events) and how they exit.

In this tutorial, we will walk through creating a cohort definition from scratch in **OHDSI ATLAS**, using an example scenario:

> Patients with type 2 diabetes who are initiating the drug **semaglutide**, with prior **metformin** use and **no prior insulin**.

We will cover every step in detail – from logging into ATLAS and creating concept sets, to defining initial events, inclusion criteria (with timelines), and cohort exit. Each step includes rationale for the settings chosen. Image placeholders (e.g. `step1-navigation.png`) indicate where screenshots should be inserted, with descriptions of what they illustrate.

**Prerequisites**

You will need:

- Access to an **ATLAS** instance (e.g., OHDSI demo or your org’s installation)
- A user account (if the instance is secured)
- An ATLAS environment connected to WebAPI with:
  - OMOP CDM data
  - Standardized vocabularies

---

## Step-by-Step Instructions

---

## Step 1: Access ATLAS and Log In

**Action**

1. Open your browser (Chrome recommended).
2. Navigate to your ATLAS URL, e.g.  
   `https://<your-atlas-server>/ATLAS`
3. Log in with your credentials (if required).
4. On the left-hand navigation menu, click **“Cohort Definitions”** (or **“Cohorts”**).

This opens the **Cohort Definitions** page, which lists existing cohorts and allows you to manage them.

**Rationale**

- Ensures you’re in the right place to create/edit cohort definitions.
- All work for cohort building happens under **Cohort Definitions**.

---

## Step 2: Create a New Cohort Definition

**Action**

1. On the **Cohort Definitions** page, click the blue **“New Cohort”** button (usually top-right).
2. A blank cohort editor opens, titled **“New Cohort Definition”**.
3. At the top, in the **Name** field, enter:

   > `New Semaglutide Users with T2DM (Training Example)`

4. Click the **Save** icon (blue save button).

You should now see your cohort’s name at the top of the editor and in the list of cohorts.

**Verify Context**

- The cohort editor is open with your new name at the top-left.
- You should see tabs/sections like:
  - **Definition**
  - **Concept Sets**
  - **Inclusion Criteria** / **Inclusion Rules**
  - **Generation** / **Results**, etc.

We’ll work mainly in **Definition** and **Concept Sets**.

**Rationale**

- Naming and saving early avoids confusion.
- A descriptive name (e.g., “New Semaglutide Users with T2DM”) makes intent immediately clear.
- Saving ensures the cohort definition shell and its concept sets/criteria are persisted.

---

## Step 3: Define the Initial Event – Semaglutide Exposure

Cohort entry is defined by one or more **initial events**. In this scenario, the entry event is **initiating semaglutide**.

### 3.1 Add Initial Event Criteria

1. In the **Definition** section, find **“Cohort Entry Events”** or **“Initial Event Criteria”**.
2. Click **“Add Initial Event Criteria”** (plus icon or similar).
3. In the domain selection, choose **Drug Exposure**.

### 3.2 Create Concept Set for Semaglutide

We must specify which drug exposures count as **semaglutide**.

1. In the Drug Exposure criterion, there should be a field like “Drug exposures of [Concept Set]”.
2. Click to select a concept set, then choose **“Create New Concept Set”**.

In the concept set editor:

- **Name**: `semaglutide`
- Use the search bar to find **“semaglutide”** in the **Drug** domain.
- Select the **semaglutide** RxNorm ingredient concept.
- Click **Add** to include it in the concept set.
- Check **“Include Descendants”** to capture all formulations (e.g., Ozempic, Rybelsus, different strengths).
- Save the concept set.

Back in the criteria dialog:

- Confirm **Concept Set: semaglutide** is selected.

### 3.3 Restrict to First Exposure Only

We want **incident (new)** semaglutide users.

- In the Drug Exposure criterion options, find and check **“First Exposure in History”** (or similar).

This ensures that only the **first-ever** semaglutide exposure per patient can qualify as an entry event.

### 3.4 Require Prior Observation (Washout Period)

To ensure this is truly new use (and to gather covariates), we require a **washout period**.

- In **Observation Period** or **Observation Window** settings:
  - **Prior Days**: `365`
  - **Post Days**: `0`
  - Mark as **continuous observation** before index.

In JSON this corresponds to:

```json
"ObservationWindow": {
  "PriorDays": 365,
  "PostDays": 0
}
