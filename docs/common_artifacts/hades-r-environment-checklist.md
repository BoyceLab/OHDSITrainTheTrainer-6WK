---
title: HADES / R Environment Checklist
status: new
---

# HADES / R Environment Checklist

<ul class="meta-row">
  <li><strong>Start</strong> one week before Week 6</li>
  <li><strong>Time</strong> 30&ndash;90 min, plus waiting on IT</li>
</ul>

!!! warning "Start this early"

    The Java and Python dependencies are the part that goes wrong, and they often
    need someone with admin rights on your machine. A week of lead time turns a
    blocked session into a solved ticket.

<div class="lab-progress"></div>

## 1. R itself

- [ ] R **4.0 or higher** installed &mdash; check with `R.version.string`
- [ ] RStudio or Posit Workbench installed
- [ ] **Windows only:** RTools installed and on the path
- [ ] I can install a package from CRAN without an error

## 2. Java

Required by the JDBC drivers that `DatabaseConnector` uses.

- [ ] A JDK is installed
- [ ] `Sys.getenv("JAVA_HOME")` returns a path
- [ ] `library(rJava)` loads without error

??? failure "`rJava` fails to load"

    Nearly always an architecture mismatch &mdash; 64-bit R with a 32-bit JDK, or
    a JDK R cannot find. Confirm both are 64-bit, set `JAVA_HOME` explicitly, and
    restart R (not just the console) afterwards.

## 3. Database connectivity

- [ ] `DatabaseConnector` installed
- [ ] JDBC drivers downloaded via `DatabaseConnector::downloadJdbcDrivers()`
- [ ] `DATABASECONNECTOR_JAR_FOLDER` set to where the drivers live
- [ ] A test connection opens and closes cleanly

```r
connectionDetails <- DatabaseConnector::createConnectionDetails(
  dbms     = "postgresql",
  server   = keyring::key_get("server",   "study"),
  user     = keyring::key_get("user",     "study"),
  password = keyring::key_get("password", "study")
)

conn <- DatabaseConnector::connect(connectionDetails)
DatabaseConnector::querySql(conn, "SELECT COUNT(*) FROM cdm.person;")
DatabaseConnector::disconnect(conn)
```

## 4. Credentials

- [ ] `keyring` installed, **or** credentials set as environment variables
- [ ] No password appears in any `.R` file
- [ ] `.Renviron` is listed in `.gitignore`
- [ ] I have checked `git log` for credentials committed earlier

!!! danger "Check your history, not just your working copy"

    Removing a password from a file does not remove it from the repository. If
    one was ever committed, rotate it &mdash; do not just delete the line.

## 5. Reproducibility

- [ ] `renv` installed and `renv::init()` run for this project
- [ ] `renv.lock` committed to version control
- [ ] I know how to restore this environment elsewhere with `renv::restore()`

## 6. HADES packages

- [ ] `remotes` installed, for GitHub installs
- [ ] The packages your study needs, installed and loading

```r
install.packages("remotes")
remotes::install_github("OHDSI/CohortGenerator")
remotes::install_github("OHDSI/FeatureExtraction")
remotes::install_github("OHDSI/PatientLevelPrediction")
```

Check the [HADES site](https://ohdsi.github.io/Hades/) for the current
recommended installation route, which changes as packages reach CRAN.

## 7. Python *(only for some ML algorithms)*

- [ ] Python 3.9 or higher, Anaconda recommended
- [ ] `reticulate` installed and pointing at the right environment
- [ ] `reticulate::py_config()` shows the interpreter you expect

!!! info "You can skip Python"

    Regularized logistic regression &mdash; the model you should start with
    anyway &mdash; runs through `Cyclops` in R and needs no Python at all. Set
    Python up only when you actually reach for tree-based or neural models.

## 8. Practice data

- [ ] `Eunomia` installed and its example CDM loads

```r
connectionDetails <- Eunomia::getEunomiaConnectionDetails()
```

## Verification

Everything is ready when this runs clean:

```r
library(DatabaseConnector)
library(FeatureExtraction)
library(PatientLevelPrediction)

connectionDetails <- Eunomia::getEunomiaConnectionDetails()
conn <- connect(connectionDetails)
querySql(conn, "SELECT COUNT(*) AS n FROM main.person;")
disconnect(conn)

sessionInfo()   # keep this; it is study documentation
```
