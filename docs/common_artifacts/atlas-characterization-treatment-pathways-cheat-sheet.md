# ATLAS Characterization & Treatment Pathways — Trainer Cheat Sheet

> A practical reference for instructors and learners using **OHDSI ATLAS**, focused on **cohort design**, **characterization**, and **treatment pathway analysis**.

---

## 1) Core Mental Models

### Concept Sets vs Cohorts
- **Concept Sets** define **WHAT** (lists of codes)
- **Cohorts** define **WHO and WHEN** (time-anchored events)

**Key rule:** Treatment pathways use **cohort definitions** as the main input, not concept sets.

### Target Cohort vs Event Cohorts
| Component | Purpose |
|---|---|
| **Target Cohort** | Defines who is studied (e.g., Type 2 Diabetes Mellitus) |
| **Event Cohorts** | Define what happens over time (e.g., Metformin, Insulin) |

**Where logic belongs**
- Diagnosis logic → **Target cohort**
- Drug exposure timing logic → **Event cohorts**

---

## 2) Best Practices for Target Cohort Design (for Pathways)

### Entry Events (typical)
- Use **condition occurrence** for disease entry (e.g., T2DM)
- Limit to **earliest event per person**
- Require **prior observation** (often **365–730 days**)

### Confirmation (recommended)
Use **ONE inclusion rule with OR logic**:
- **Dx × 2** within ±365 days of index  
  **OR**
- **Dx + antidiabetic drug exposure** within **0–180 days after** index

> Reminder: Multiple inclusion criteria in ATLAS are combined with **AND**.  
> If you want **OR**, keep it **inside one inclusion rule**.

### Common exclusions (strongly recommended)
- **Type 1 diabetes**
- **Gestational diabetes**
- **Age < 18** (optional but common)

---

## 3) Building Event Cohorts for Treatment Pathways

### Why drugs must be cohorts
Treatment pathways are **timelines**, which require:
- Start date
- End date
- Persistence rules

A concept set alone can’t represent time.

### Drug event cohort template (recommended)

**Example: Metformin event cohort**

**Cohort Entry**
- Entry event: **drug exposure** of metformin ingredient
- Limit initial events to: **earliest event per person**
- Observation requirement: **0 days before / 0 days after** (keep simple)

**Inclusion Criteria**
- None (intentional)

**Cohort Exit**
- Persist until: **end of continuous drug exposure**
- Persistence window: **30–60 days**
- Use: **days supply + exposure end date** where available

**Guiding principle:** Event cohorts should be **pure exposure definitions** (no diagnosis logic).

---

## 4) Persistence Windows (Critical for Interpretation)

### What persistence controls
- How ATLAS groups refills into **one episode vs multiple episodes**
- Does **NOT** change who gets a drug
- Does change:
  - Path length
  - Path complexity
  - Table 1d results

### Common persistence settings
| Persistence window | Typical effect |
|---:|---|
| 0 days | Highly fragmented pathways |
| 30 days | Common default |
| 60–90 days | More consolidated episodes |
| 180 days | Very conservative, fewer steps |

**Important:** Persistence ≠ adherence. Persistence ≠ true duration of therapy.

### Analysis settings

#### Target Cohort = who we’re analyzing
- **Event Cohorts** = what can show up as steps
- **Analysis Settings** = the rules that control noise vs detail:
- **Collapse Days** controls how tightly events are grouped in time
- **Minimum cell count** controls suppression of rare patterns
- **Maximum path length** controls how many steps we keep
- **Allow repeats** controls whether the same treatment can recur in one sequence”
---

## 5) Reading the Pathways Visualization (Sunburst)

### How to read it
- **Center** = target cohort entry (index event)
- **Inner ring** = first observed treatment event
- **Outer rings** = subsequent treatment changes
- **Colors** = event cohorts
- **Thickness** = number of people

**Key rule:** Pathways advance only when a **new event cohort** is entered.

### “Remain” vs “Diff”
- **Remain**: no further *new* treatment events observed after the selected step
- **Diff**: patient moved on to another treatment event

**Important:** “Remain” does **not** mean treatment stopped.

---

## 6) Tabular View — How to Teach Each Table

### Table 1a — All Pathways
- Each row = **exact pathway sequence** (up to max steps)
- “+” means **same step**, not order
- Use **% with Pathway** to compare rows; **% of Cohort** for prevalence

### Table 1b — Event Cohort Counts by Rank
- Rank = position in the pathway (1st, 2nd, 3rd…)
- Answers: *What appears first vs later?*

### Table 1c — Event Cohort Counts (Overall)
- “Ever exposed” counts across all ranks
- Not mutually exclusive (people can appear in multiple rows)

### Table 1d — Distinct Event Cohorts (Most Important Teaching Table)
- Exactly 1 = one observable treatment episode/event
- Exactly 2+ = multiple treatment changes/events

**Key insight:** Table 1d is highly sensitive to **persistence window assumptions**.

---

## 7) Common Misconceptions to Address

- “One step = simple care” → Not necessarily; may reflect persistence assumptions or limited event cohorts
- “More steps = worse care” → Not necessarily; may reflect stricter episode rules or richer event sets
- “Pathways show guideline adherence” → Pathways show observable transitions, not intent or quality
- “Percentages should sum to 100%” → Tables answer different questions; many counts overlap

---

## 8) Instructor One-Liners

- “Concept sets define **WHAT**; cohorts define **WHEN**.”
- “Pathways only move forward when something **new** happens.”
- “Persistence assumptions can change pathways more than patient behavior.”
- “Sunburst shows patterns; tables confirm them.”

---

## 9) Suggested Teaching Flow

1. Build target cohort  
2. Build one drug event cohort (Metformin)  
3. Add 2–3 more event cohorts  
4. Generate pathways  
5. Explain sunburst  
6. Move to tabular  
7. Change persistence window → regenerate → compare Table 1d  

---

## Final takeaway
**Treatment pathways are not just about drugs — they’re about how we define and interpret time in the data.**
