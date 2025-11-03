# Environment Checklist Template

> This template may be copied and customized by any trainer for environment readiness tracking.  
> Clone or download this file in your own program repository and modify it to match your local setup.

---

## Participant Information

| Field | Entry |
|--------|--------|
| **Name** |  |
| **Email Address** |  |
| **Institution / Site** |  |
| **Role** |  |
| **Trainer / Reviewer (if applicable)** |  |
| **Date Completed** |  |

> Trainers can expand this section as needed (e.g., add local site IDs, cohort names, or training wave numbers).

---

## Environment Details & Access Points

| Tool / System | URL or Server Name | Access Verified (Y/N) | Notes / Credentials (if applicable) |
|----------------|-------------------|-----------------------|------------------------------------|
| **ATLAS** | *(Insert URL)* |  | e.g., atlas.myinstitution.edu |
| **OMOP CDM Database** | *(Insert Server / Schema Name)* |  | e.g., OMOP_CDM_TRAINING |
| **Athena Vocabulary Browser** | https://athena.ohdsi.org |  |  |
| **SEARCH Tool** | *(Insert URL or Access Portal)* |  |  |
| **RStudio / Posit Workbench** | *(Insert Server URL if applicable)* |  |  |
| **GitHub Repository** | *(Insert Repo URL or Org)* |  |  |
| **Teams / Communication Channel** | *(Insert Teams/Slack Channel URL)* |  | e.g., #ohdsi-training-support |
| **VPN / Network Requirements** | *(Insert VPN name if needed)* |  |  |
| **Help Desk / IT Support Contact** | *(Insert Name & Email)* |  | e.g., jane.doe@institution.edu |
| **CDM Administrator Contact** | *(Insert Name & Email)* |  |  |
| **Data Access Approval Contact** | *(Insert Name & Email)* |  |  |
| **Atlas Admin Contact** | *(Insert Name & Email)* |  |  |

> Trainers should ensure all institutional approval contacts and system URLs are verified before the start of Week 1.

---

## Optional Advanced Test
- **Achilles or DQD:** Test on a small sample CDM if permissions allow.

---

## 💻 Local Tools
- **Git/GitHub:** Verify ability to clone, pull, and push to this repository (optional).
- **SQL client:** Databricks, DBeaver, or similar with CDM connectivity.
- **Text editor:** VS Code, RStudio, or preferred IDE.

---

## ✅ Environment Checklist

| Area | Task | Verified (Y/N) | Notes |
|------|------|----------------|-------|
| ATLAS | Login successful and can save cohorts |  |  |
| CDM Database | Confirmed SQL read access |  |  |
| SEARCH | Extraction test completed |  |  |
| HADES | R environment installed and packages load |  |  |
| GitHub | Repo cloned and permissions confirmed |  |  |
| SQL Client | Connected to CDM successfully |  |  |
| Teams / Slack | Joined correct support channel |  |  |
| VPN | Connection stable and verified |  |  |

> Trainers: Copy this table into your documentation or export it as CSV for tracking participant readiness.

---

## Deliverables
- Completed **Environment Checklist** uploaded or shared with instructors.  
- Verified tool access and functional test results (ATLAS, CDM, SEARCH if applicable).

---

## Tips for Trainers
- Keep setup **tool-agnostic** and **site-neutral**. Replace institutional URLs and connection details in your fork.  
- Encourage participants to complete setup **at least 48 hours before Week 1**.  
- Maintain a shared support document or Slack/Teams channel for troubleshooting access issues.  
- Include all **institutional contacts** and **approval workflows** in your local version for clarity.

---

**Next:** Proceed to [Day 1 – OMOP Common Data Model](../modules/day-01-omop-cdm.md) once all environment checks are complete.
