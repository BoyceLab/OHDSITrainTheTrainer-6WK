# Day 3 · Cohort Definition & Characterization

## 📘 Required Reading (Before Class)

### From *The Book of OHDSI*:
- **Chapter 10 — Cohort Definitions** (Required)
- **Chapter 5 — Standardized Vocabularies (review)**  
- Review your Day 2 concept sets and bring them to class

---

# Day 3 · Cohort Definition & Characterization

## 🎯 Learning Objectives (Week 3)

By the end of Day 3, participants will be able to:

1. **Understand ATLAS and cohort definition fundamentals**, including entry events, inclusion rules, and cohort exit criteria.  
2. **Build cohort definitions** using standardized vocabularies and concept sets.  
3. **Generate, validate, and troubleshoot cohorts**, including using characterization for sanity checks.  
4. **Document and share cohort definitions** to support transparency, reproducibility, and collaboration.

---

## 🕘 Day 3 Schedule

| Time | Session Title |
|------|----------------|
| **9:30 am – 10:15 am** | Welcome, review, Kahoot! |
| **10:15 am – 11:15 am** | OHDSI Cohort Definition Fundamentals |
| **11:15 am – 11:30 am** | Break |
| **11:30 am – 12:30 pm** | Hands-on: Creating, Generating, and Sharing a Cohort Definition |
| **12:30 pm – 12:45 pm** | Review of First Three Sessions |
| **12:45 pm – 1:00 pm** | Looking Ahead & Adjourn |


---

## 🖥️ Slides & Materials

- **📂 Day 3 Slides (Placeholder):** `DAY_3.pdf` *(upload to `docs/assets/day3/` then update this link)*  
  👉 Suggested path: `../assets/day3/DAY_3.pdf`

- **📝 Exercises:**  
  [Day 3 · Cohort Exercises](../exercises/day-03-cohorts.md)

- **🧾 Cheat Sheet:**  
  [Cohort Design Cheat Sheet](../common_artifacts/cohort-design-cheat-sheet.md)

---

## 🧩 In-Class Activities

### **1. Cohort Design Fundamentals**
- What is a cohort?  
- Target population definitions  
- Entry events vs. inclusion rules  
- Temporal logic (e.g., *first ever*, *first in X days*, *continuous observation*)  
- Cohort exit strategies

---

### **2. ATLAS Cohort Builder Hands-On**
- Build an entry event (condition, procedure, drug exposure, measurement)  
- Add inclusion criteria with temporal constraints  
- Add exclusion criteria  
- Select cohort exit logic and clean-up settings  
- Generate and export SQL for review  

---

### **3. Characterization Deep Dive**
- Interpreting demographics, visits, comorbidities, medications  
- Using Characterization for early cohort validity checks  
- Why characterization is essential before estimation or prediction  

---

## 🏠 Homework

- Build a **second cohort** of your choosing based on your institution’s data needs  
- Export its concept sets and SQL  
- Identify at least **two design decisions** you changed after reviewing sample characterization  
- Optional: Watch the 2017 Symposium Cohort Tutorial

---

## 🔗 Related Resources

- [Vocabulary & SQL Cheat Sheet](../common_artifacts/omop-vocab-sql-cheat-sheet.md)  
- [OMOP SQL Examples](../common_artifacts/omop-sql-examples.md)  
- [SQL Validation Mini Lab](../common_artifacts/sql-validation-mini-lab.md)  
- [Day 2 Module](../modules/day-02-vocab-dqd.md)  

