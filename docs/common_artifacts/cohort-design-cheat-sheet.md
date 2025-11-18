# Cohort Definition Design Cheat Sheet

> Quick-reference guide for building high-quality, reproducible OHDSI cohorts in ATLAS.

---

## 🧩 Core Components of a Cohort

| Component | Meaning | Examples |
|-----------|----------|----------|
| **Entry Event** | The event that qualifies a person to enter the cohort | First diabetes diagnosis; first metformin exposure |
| **Inclusion Criteria** | Additional criteria that must be true after entry | Age ≥ 18, 365 days prior observation |
| **Exclusion Criteria** | Disqualifying conditions or events | Prior cancer diagnosis |
| **Cohort Exit** | When a subject leaves the cohort | End of drug exposure; end of condition era |
| **Censoring Windows** | Periods lacking reliable data | Gaps in observation period |

---

## 🧠 Design Principles

- Keep entry logic **simple**, move detail to inclusion rules.  
- Use **standard concepts + descendants** to avoid missing related codes.  
- Require **continuous observation** (often 365 days prior).  
- Validate via **Characterization** before using cohort downstream.  
- Explicitly define **cohort exit** — common source of design errors.  
- Use **eras** to combine repeated exposures or conditions.  

---

## 🧪 Concept Set Tips

- Always start with **Standard Concepts Only** in ATLAS search.  
- Include **descendants** unless concept already broad.  
- Remove noisy administrative or rule-out codes.  
- Document your decisions (what you included/excluded and why).  

---

## 🧭 Temporal Logic Examples

### Entry Examples
- First-ever hypertension diagnosis  
- First metformin exposure after diabetes diagnosis  

### Inclusion Examples
- Age ≥ 40 at index  
- ≥ 180 days continuous prior observation  
- No cancer diagnosis within the prior year  

### Exit Logic Examples
- End of drug exposure + 30-day gap  
- End of condition era  
- Fixed-time follow-up (e.g., 1 year)  

---

## 🧰 Quality Checks

- Look for implausible ages or counts.  
- Compare phenotype prevalence to expected values.  
- Examine time trends for sudden spikes/drops.  
- Review characterization: comorbidities, medications, visits.  
- Confirm cohort size aligns with expectations.  

---

## 📤 Exporting Cohort SQL

Generated SQL includes:
- Temp tables for concept sets  
- Entry rule logic  
- Inclusion rule logic  
- Exit logic  

Run in:
- Databricks  
- Postgres  
- SQL Server  
- Snowflake  
- BigQuery  
- Redshift  

---

## 📚 Additional References

- *Book of OHDSI* — Chapter 10 (Cohort Definitions)  
- OHDSI ATLAS Documentation  
- OHDSI Cohort Library (example cohorts)
