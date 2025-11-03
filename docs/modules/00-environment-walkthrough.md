# Module 00 · Environment Setup and Access

!!! info "White-Label Program"
    This module is designed for **Train-the-Trainer programs** built around the OHDSI ecosystem.  
    It intentionally avoids site-specific branding so it can be **cloned and customized** by any institution or trainer team.  
    Replace placeholders and add links for your local environment as needed.

---

## Overview
This module ensures all participants have **functional access** to the systems, tools, and data sources required before the start of Week 1.  
Each participant should complete the environment checklist and verify all access points work correctly.

---

## Objectives
By the end of this module, participants will be able to:
1. Access all required OHDSI tools and environments (ATLAS, CDM database, SEARCH).
2. Verify permissions for data connections and tool execution.
3. Install and test required local software (R, RStudio, Git, SQL client).
4. Document readiness using the provided **Environment Checklist Template**.

---

## Systems & Tools Setup

### 🧭 ATLAS
- Confirm **login credentials** and ability to create/edit cohorts.
- Test saving and exporting a cohort definition (JSON).
- Verify cohort characterization jobs can run successfully.

### 🗃 OMOP CDM Access
- Confirm **read access** to a sandbox or training CDM database (synthetic or de-identified).
- Ensure network permissions and ODBC/connection strings are functional.
- Optional: Test a basic `SELECT * FROM PERSON LIMIT 5;` query via SQL client.

### 🔍 SEARCH Tool
*(If applicable for your site)*  
- Confirm access to SEARCH.
- Run a simple cohort-based extraction to ensure permissions are active.
- Save export outputs to your working directory.

### 📊 HADES Environment (Optional for Advanced Tracks)
- Verify R (≥ 4.2) and RStudio (or Posit Workbench) installation.
- Confirm ability to install and load OHDSI packages:
  ```r
  install.packages("remotes")
  remotes::install_github("ohdsi/Hades")
  library(Hades)
  ```
- Optional: Test Achilles or DQD on a small sample CDM if permissions allow.

### 💻 Local Tools
- **Git/GitHub:** ability to clone, pull, and push to this repository.  
- **SQL client:** Databricks, DBeaver, or similar with CDM connectivity.  
- **Text editor:** VS Code, RStudio, or preferred IDE.

---

## ✅ Environment Checklist Template
Trainers may clone and adapt this checklist for local use.  
A downloadable Markdown version is available here:  
➡️ [Download environment-checklist-template.md](../common_artifacts/environment-checklist-template.md)

| Area | Task | Verified (Y/N) | Notes |
|------|------|----------------|-------|
| ATLAS | Login successful and can save cohorts |  |  |
| CDM Database | Confirmed SQL read access |  |  |
| SEARCH | Extraction test completed |  |  |
| HADES | R environment installed and packages load |  |  |
| GitHub | Repo cloned and permissions confirmed |  |  |
| SQL Client | Connected to CDM successfully |  |  |

> Trainers: copy this table to your local documentation or export it as CSV for tracking participant readiness.

---

## Deliverables
- Completed **Environment Checklist** uploaded or shared with instructors.
- Verified tool access and functional test results (ATLAS, CDM, SEARCH if applicable).

---

## Tips for Trainers
- Keep setup **tool-agnostic** and **site-neutral**. Replace institutional URLs and connection details in your fork.  
- Encourage participants to complete setup **at least 48 hours before Week 1**.  
- Maintain a shared support document or Slack channel for troubleshooting access issues.

---

**Next:** Proceed to [Module 01 – Introduction to OHDSI](# Module 00 · Environment Setup and Access

!!! info "White-Label Program"
    This module is designed for **Train-the-Trainer programs** built around the OHDSI ecosystem.  
    It intentionally avoids site-specific branding so it can be **cloned and customized** by any institution or trainer team.  
    Replace placeholders and add links for your local environment as needed.

---

## Overview
This module ensures all participants have **functional access** to the systems, tools, and data sources required before the start of Week 1.  
Each participant should complete the environment checklist and verify all access points work correctly.

---

## Objectives
By the end of this module, participants will be able to:
1. Access all required OHDSI tools and environments (ATLAS, CDM database, SEARCH).
2. Verify permissions for data connections and tool execution.
3. Install and test required local software (R, RStudio, Git, SQL client).
4. Document readiness using the provided **Environment Checklist Template**.

---

## Systems & Tools Setup

### 🧭 ATLAS
- Confirm **login credentials** and ability to create/edit cohorts.
- Test saving and exporting a cohort definition (JSON).
- Verify cohort characterization jobs can run successfully.

### 🗃 OMOP CDM Access
- Confirm **read access** to a sandbox or training CDM database (synthetic or de-identified).
- Ensure network permissions and ODBC/connection strings are functional.
- Optional: Test a basic `SELECT * FROM PERSON LIMIT 5;` query via SQL client.

### 🔍 SEARCH Tool
*(If applicable for your site)*  
- Confirm access to SEARCH.
- Run a simple cohort-based extraction to ensure permissions are active.
- Save export outputs to your working directory.

### 📊 HADES Environment (Optional for Advanced Tracks)
- Verify R (≥ 4.2) and RStudio (or Posit Workbench) installation.
- Confirm ability to install and load OHDSI packages:
  ```r
  install.packages("remotes")
  remotes::install_github("ohdsi/Hades")
  library(Hades)
  ```
- Optional: Test Achilles or DQD on a small sample CDM if permissions allow.

### 💻 Local Tools
- **Git/GitHub:** ability to clone, pull, and push to this repository.  
- **SQL client:** Databricks, DBeaver, or similar with CDM connectivity.  
- **Text editor:** VS Code, RStudio, or preferred IDE.

---

## ✅ Environment Checklist Template
Trainers may clone and adapt this checklist for local use.  
A downloadable Markdown version is available here:  
➡️ [Download environment-checklist-template.md](../common_artifacts/environment-checklist-template.md)

| Area | Task | Verified (Y/N) | Notes |
|------|------|----------------|-------|
| ATLAS | Login successful and can save cohorts |  |  |
| CDM Database | Confirmed SQL read access |  |  |
| SEARCH | Extraction test completed |  |  |
| HADES | R environment installed and packages load |  |  |
| GitHub | Repo cloned and permissions confirmed |  |  |
| SQL Client | Connected to CDM successfully |  |  |

> Trainers: copy this table to your local documentation or export it as CSV for tracking participant readiness.

---

## Deliverables
- Completed **Environment Checklist** uploaded or shared with instructors.
- Verified tool access and functional test results (ATLAS, CDM, SEARCH if applicable).

---

## Tips for Trainers
- Keep setup **tool-agnostic** and **site-neutral**. Replace institutional URLs and connection details in your fork.  
- Encourage participants to complete setup **at least 48 hours before Week 1**.  
- Maintain a shared support document or Slack channel for troubleshooting access issues.

---

**Next:** Proceed to [Module 01 – Introduction to OHDSI](day-01-omop-cdm.md) once all environment checks are complete.


