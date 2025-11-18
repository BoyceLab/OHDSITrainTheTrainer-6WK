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


---


# Instructor Training Script (with Speaker Notes)

> This script is for instructors delivering a live training or demo on building the  
> **“New Semaglutide Users with T2DM”** cohort in ATLAS.  
> Each step includes:
> - **Narration** – what to say aloud  
> - **Speaker Notes** – guidance for you (not spoken verbatim)

---

## Step 1: Accessing ATLAS and Logging In

### Narration

“Welcome, everyone. To start our exercise, let’s open the ATLAS application in our web browser. I’m navigating to our ATLAS URL now. You’ll see the login screen – I’ll enter my credentials to log in.

Once logged in, this is the ATLAS homepage. Notice the menu on the left side; this is where we find different tools. Since we want to create a new cohort, I’ll click on **‘Cohort Definitions’** in the menu.

Now we see the **Cohort Definitions** page, which lists any existing cohorts in the system. We’re going to create a brand new cohort definition for our use case.”

### Speaker Notes

- Make sure everyone:
  - Has the URL.
  - Can log in (or knows it’s a public demo like `atlas-demo.ohdsi.org`).
- Point clearly to the **left-hand navigation** and **Cohort Definitions**.
- Mention ATLAS works best in Chrome.
- Emphasize: *all cohort building* happens under **Cohort Definitions**.

---

## Step 2: Starting a New Cohort Definition

### Narration

“Now, we’ll create a new cohort. On the top-right of the Cohort Definitions page, there’s a blue **‘New Cohort’** button. I’ll click that.

ATLAS opens a new cohort definition workspace for us. By default, it’s named **‘New Cohort Definition’**. The first thing I like to do is give it a meaningful name. I’ll click on the name field at the top and type:

> ‘New Semaglutide Users with T2DM’

This name reflects our cohort’s intent – patients starting semaglutide who have type 2 diabetes. After typing the name, I’ll hit the **Save** icon (the blue save button).

Saving now records the name and creates an entry in the system. You can see our cohort’s name in the top-left corner of the editor and it should also appear in the cohorts list on the left panel.”

### Speaker Notes

- Emphasize clear naming: include population and key qualifiers.
- Remind them:
  - Nothing is stored until **Save** is clicked.
- In a training environment, reassure:
  - Creating/naming a cohort doesn’t affect patient data.

---

## Step 3: Defining the Initial Event (Semaglutide Start)

### Narration

“Our next step is to define how people enter the cohort – the initial event. In this scenario, the entry event is the **first time a patient takes semaglutide**.

In ATLAS, we define that under **‘Cohort Entry Events’**. Let’s add a new entry criterion: I click **‘Add Initial Event Criteria’**. ATLAS asks what kind of event – since semaglutide is a drug, I choose **‘Drug Exposure’**.

Now it wants to know *which* drug exposure. We’ll specify semaglutide via a concept set. I’ll create a new concept set for semaglutide, naming it **‘semaglutide’**.

Now I search for the drug concept ‘semaglutide’. Here it is – semaglutide (RxNorm ingredient). I add that to my concept set. I’ll also check **‘Include Descendants’**, so any specific brands or forms of semaglutide are included. Good. I’ll save this concept set.

Back to our criteria: it now says **‘Drug Exposure of semaglutide’**.

Next, I’ll impose that it must be the **first time ever** the person has semaglutide. There’s an option here called **‘First Exposure in History’** – I’ll check that. This ensures we only count an exposure if the patient has no prior exposure to semaglutide in their record. Essentially, we’re capturing **new initiators** of the drug.

One more thing: we want to be confident it’s the first *observed* exposure. It’s possible a patient is new in the database and we see their first semaglutide, but they were actually on it before outside our data. To mitigate that, I’ll require at least **365 days of observation** before the index date.

See these fields ‘Prior Observation’ and ‘Post Observation’? I set ‘at least 365 days before’ and ‘0 days after’. Now the cohort entry event is defined as: the first semaglutide use for a patient, after at least a year in the database. We’ll use that one year as a **washout period** to ensure new use.

By default, ATLAS will now only use the earliest such event per person – especially since we marked first exposure – so each person can enter at most once. That’s exactly what we want.”

### Speaker Notes

- Show the interface live:
  - Drug Exposure selection
  - Concept set creation for **semaglutide**
  - **Include Descendants** checkbox
  - “First Exposure in History” option
- Explain **why**:
  - New-user design = first-ever exposure.
  - 365-day washout is a common standard but a design choice.
- Clarify:
  - Without adequate prior observation, you can’t be sure it’s truly first-ever use.
  - Including descendants covers all branded/forms of semaglutide.

---

## Step 4: Adding Criteria for T2DM and Age

### Narration

“Now we have our initial event, but we only want those patients who have **type 2 diabetes** and are **adults**.

So next, we’ll add some **additional entry criteria** to restrict by diagnosis and age. In ATLAS, I can add these as additional criteria that all need to be met for the person’s event to count.

First, I’ll add an **Age** criterion. I click **‘Add Additional Criteria’** and select **‘Demographic > Age’**. I set it to **‘>= 18’**. This means on the index date, the patient must be at least 18 years old. We’re excluding pediatric patients.

Next, I add a **Condition Occurrence** criterion for having Type 2 Diabetes. I don’t have a concept set for T2DM yet, so let’s make one. I’ll create a concept set named **‘Type 2 diabetes mellitus’**.

Now, defining this concept set is interesting – we want to capture all type 2 diabetes diagnoses. Often, there’s a mixture of codes: some specifically say Type 2, others just say ‘diabetes’ without specifying type. What I’ll do is **include a broad diabetes concept and then exclude Type 1 and other forms**:

- I search for ‘diabetes mellitus’ and add that broad concept (which covers all diabetes). I check **Include Descendants** so all related diabetes codes come in.
- Now I exclude ‘Type 1 diabetes’ concepts. Here’s ‘Type 1 diabetes mellitus’ – I add it to the set and mark it as **Excluded**. I also exclude ‘Secondary diabetes’ in the same way.

This way, any code that is a Type 1 or secondary diabetes will be filtered out of our concept set. The remainder essentially represents Type 2 diabetes and generic diabetes codes.

I’ll save that concept set.

Back in the criteria, I attach our ‘Type 2 diabetes mellitus’ concept set. I require at least **1 occurrence** of such a diagnosis. And I specify it can occur anytime in the patient’s history up to the index date (I set the window from ‘earliest observation’ to ‘on or before index date’). That ensures the patient has been diagnosed with T2DM at some point before or by the time they got semaglutide. This makes sense – semaglutide is for diabetes, so they should have the diagnosis.

Additionally, I want to make sure they **do not** have Type 1 or secondary diabetes, period. Even though our concept set excluded those from counting as T2, I want to explicitly exclude patients who have any Type 1 or secondary diabetes diagnosis in their record. This is a belt-and-suspenders approach to ensure our cohort is purely type 2 diabetics.

I add another Condition criterion for a **Type 1 diabetes** concept set (I’ll quickly create a ‘Type 1 diabetes’ concept set – basically all type 1 DM codes). And I set this to **0 occurrences** (meaning the patient should have none of those codes). Window: anytime before or on index. So if a patient had a Type 1 diabetes code at any point, they will be excluded.

Similarly, I add a criterion for **Secondary diabetes** with **0 occurrences**.

Now we have: Age ≥ 18, at least one T2DM diagnosis, no Type 1, no secondary DM. All these are set to ‘must all be true’.

In summary, at this point our cohort entry is:

> first semaglutide use (with ≥1 year prior observation) **and** the patient is an adult with type 2 diabetes (no type 1 or secondary).”

### Speaker Notes

- Explain concept set logic with a simple metaphor:
  - “Start broad, subtract what you don’t want.”
- Highlight the **“Exactly 0 occurrences”** setting for exclusions.
- Stress that all **Additional Criteria** use **AND** logic by default – all must be true.
- Ask the group:
  - “Why explicitly exclude Type 1 & secondary instead of only relying on the T2DM concept set?”
- Check that participants see:
  - Age ≥ 18
  - ≥1 T2DM condition
  - 0 Type 1 DM
  - 0 Secondary DM

---

## Step 5: Adding Inclusion Rules for Prior Treatments

### Narration

“Next, we have two more conditions to impose, both about prior treatments, and we’ll do these as **Inclusion Rules**.

The reason to use Inclusion Rules (as opposed to the previous section) is that it allows us to **name these rules** and to see **how many patients get excluded by each**. It’s about analysis transparency – but functionally they also filter the cohort.

We want:

1. Patients should have used **metformin** before (since typically, you’d be on metformin before going to semaglutide).
2. Patients should **not have used insulin** before or at the time of semaglutide start (we’re focusing on those who escalate therapy without having been on insulin yet).

Let’s do the metformin rule first.

I click **‘New Inclusion Rule’**, and name it **‘Prior metformin use’**. I’ll also set the rule logic to **ANY**, because I’m going to define two alternative ways someone could have prior metformin, and meeting either one will satisfy the rule.

Now, inside this rule, I add my first criterion: I choose **‘Drug Era’** of metformin.

We’ll create a Metformin concept set – adding the ingredient Metformin and descendants.

For this criterion, I require the drug era length **≥ 90 days**. This means a continuous period of metformin use for at least 3 months. And I set the timeframe for this era to be *before* the semaglutide start – for example, starting at least 90 days before the index.

The second criterion in this rule: I select **‘Drug Exposure’** of metformin (again using our Metformin concept set). Here I require **≥ 3 occurrences**. So, at least three separate metformin prescriptions or administrations before the index. And I set the window as any time before the index date (I won’t count things on the index date as prior, though if they had metformin on the same day it doesn’t really harm our logic either).

Now we have two criteria: one for a 90-day era, one for 3 distinct fills. Because I set the rule to **ANY**, a patient only needs to meet one of them. So:

- If someone had a 6-month continuous metformin era, they satisfy the first criterion.
- If someone never had a 90-day continuous run but did have, say, 3 or 4 separate metformin prescriptions, they satisfy the second criterion.
- If they satisfy both, that’s fine too.
- If they satisfy neither, they fail this rule and are excluded from the cohort.

Next, the insulin rule.

I add another Inclusion Rule and call it **‘No prior insulin use or combo initiation’**. This one will be **ALL** – the patient must meet all parts of it. Essentially:

- They should not have any **long-term insulin use** in the past.
- They should not be on insulin when starting semaglutide (**no overlapping start**).

For the first part, I add a **Drug Era** criterion for insulin (we have an Insulin concept set with all insulins). I set it to ‘Era length > 30 days’ and **occurrence = 0**. And I say any time before 30 days prior to index. So if they had an insulin era lasting more than a month at any point in their recorded history (except ignoring the last month which we’ll check separately), they would violate this. By requiring zero, we’re excluding those people. In other words, no evidence of sustained insulin therapy in the past. A quick example: if someone was on insulin for 6 months two years ago, this rule would catch that and exclude them.

For the second part, I add another criterion for insulin as a Drug Era (or Drug Exposure; era works because if they got it even once in that window it becomes an era anyway). Here I look at within **30 days before up to the index date**, and also require **0 occurrences**. That ensures they were not on insulin right before or on the day of starting semaglutide. So they didn’t overlap or start both together.

With both criteria in an ALL group, a patient must have **no** long-term insulin history and **no** recent insulin use. If they have either, they fail the rule. So this rule will exclude anyone who was an insulin user already.

After adding these, I will double-check that both inclusion rules are checked/enabled. By default, ATLAS will apply all inclusion rules, meaning a patient must pass both to be in the cohort. So if someone fails either prior metformin or the insulin rule, they won’t be included.

Let’s pause and think: We now have a cohort definition that’s pretty specific:

- First-time semaglutide users (with a year of data prior).
- They are adults with type 2 diabetes (no type1/secondary).
- They have been on metformin before.
- They have not been on insulin (at least not in any significant way before or during initiation).

This matches a scenario like:  
**‘Second-line therapy patients: started with metformin, now going to a GLP-1, not having progressed to insulin yet.’** That’s likely the use case we want.”

### Speaker Notes

- This step is dense. Go slowly.
- Metformin rule:
  - Explain **Drug Era ≥90 days** vs **≥3 Drug Exposures**.
  - Show clearly where to set rule logic = **ANY**.
- Insulin rule:
  - Emphasize **ALL** logic (both criteria must hold).
  - Explain thresholds:
    - >30 days era = sustained insulin use.
    - 30-day pre-index window = combination-start avoidance.
- Use examples:
  - Patient A: 6 months insulin last year → **excluded**.
  - Patient B: a single in-hospital insulin dose 3 years ago → **likely allowed**.
- Clarify “Exactly 0 occurrences” for NOT logic:
  - Not adding a criterion ≠ exclusion.
  - You must explicitly define exclusions.
- Summarize all criteria at this point so no one is lost.

---

## Step 6: Setting the Cohort Exit (End of Exposure)

### Narration

“Up to now, we defined who gets in the cohort and when. Now let’s define **how long they stay in the cohort**.

Currently, without specifying anything, each cohort entry would by default have the same start and end date (just a moment in time, essentially). But we want the cohort to represent the period the patient is on semaglutide therapy.

ATLAS lets us define an exit rule. We’ll use an **‘End of continuous drug exposure’** logic.

I’ll go to the **Cohort Exit** section. From the dropdown, I select **‘Custom Era’** based on our semaglutide concept set. I set **Gap Days = 30**. This means if there’s more than a 30-day gap in semaglutide prescriptions, we’ll consider the treatment episode ended at that point. And **Offset = 0 days**, meaning we don’t extend the cohort beyond the last day of exposure.

In simpler terms, once a person starts semaglutide (that’s cohort entry), they remain in the cohort until they discontinue semaglutide (with a grace period of 30 days for refills). If they never discontinue (at least as far as data goes), they’ll stay in until their data ends or our study ends. If they stop for more than 30 days, that’s the cohort exit.

Because we limited to the first exposure per person, each person will have at most one cohort era here. If someone did stop and restart much later, we aren’t allowing a second entry in this design. We’re just focusing on the first treatment course.

Let’s save this setting. Now our cohort definition is essentially complete!”

### Speaker Notes

- Explain why exit matters:
  - Without it, exposure time is misaligned with the cohort’s risk window.
- Justify 30-day gap:
  - Typical refill cycle.
  - Avoids prematurely splitting treatment episodes.
- Mention alternatives:
  - Fixed-duration cohorts (e.g., 90 days post-index).
  - Outcome-based exit (censor at event).
- Ask participants:
  - “Given different study questions, how might you define exit differently?”
- Encourage quick UI review:
  - Initial event
  - Additional criteria
  - Inclusion rules
  - Exit strategy
- Remind them to hit **Save** again.

---

## Step 7: Saving and Generating Results

### Narration

“I’ll click **Save** one more time to make sure all our changes are saved. Great.

Now, let’s see how many patients this cohort would include (assuming we have a database connected). I’ll go to the **‘Generate’** tab. Here I see a list of data sources. I’ll choose our example database and hit **‘Generate Cohort’**.

ATLAS is now executing the cohort definition against the database.

Once that’s done, we get some numbers. For instance, it says:

- **Distinct people:** _N_
- **Entries:** _N_

It also shows the **inclusion rule stats**. Let’s check the inclusion impact report. It shows something like:

- Initial events after basic criteria: maybe ~2,000 patients.
- After applying the **‘Prior metformin use’** rule: ~1,500.
- After applying the insulin rule: ~1,234.

These are hypothetical numbers, but the idea is that each rule trims the cohort.

These numbers help validate our logic. If, for example, almost everyone was excluded by one rule, we’d want to double-check that rule’s criteria to ensure we didn’t make it overly restrictive by mistake.

Everything looks reasonable here.

We can also view the cohort characterization reports – like age distribution, etc. – under the Reporting tab – to sanity check that, for example, we indeed have no one under 18 and no one with a type 1 diagnosis sneaking through.

That concludes the cohort creation. We defined it step by step and saw the result.

One more tip: if you ever get a cohort definition in **JSON** form, you can import it directly. Instead of doing all these clicks, you could go to **Export → JSON**, paste the JSON, hit **Reload**, and then **Save** – and you’d have the cohort built for you. We essentially could export what we just built as JSON to share with others, and they could import it. That ensures consistency across studies or sites.

Thank you for following along. We’ve now created a nuanced cohort definition using ATLAS, demonstrating how to incorporate drug exposures, condition criteria, demographic filters, and inclusion rules with temporal logic. This is a powerful way to define cohorts for observational studies.”

### Speaker Notes

- If you have pre-run generation:
  - Show real numbers from a sample database.
- Use the inclusion impact chart to:
  - Explain attrition
  - Spot overly restrictive rules
- Show JSON export (briefly):
  - **Export → JSON**
  - Mention it can be version-controlled or shared.
- Summarize the journey:
  - Concept sets → initial event → additional criteria → inclusion rules → exit.
- Encourage practice:
  - Suggest they try a simpler cohort afterward (e.g., “New Metformin Users with T2DM”).
- Invite questions.

---

*End of Training Script*

