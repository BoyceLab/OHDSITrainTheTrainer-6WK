# OHDSI Train-the-Trainer (6 Week)

Course site for a six-week, half-day OHDSI train-the-trainer curriculum, built
with [MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

Published at <https://boycelab.github.io/OHDSITrainTheTrainer-6WK>.

## Build locally

```bash
pip install -r requirements.txt
mkdocs serve          # live preview at http://127.0.0.1:8000
mkdocs build          # static site into ./site
```

GitHub Actions builds and deploys on every push to `main`
(`.github/workflows/pages.yml`).

## Layout

```
mkdocs.yml                 # nav, theme, extensions
overrides/main.html        # theme override — injects the under-construction notices
includes/abbreviations.md  # auto-appended to every page for hover definitions
docs/
  index.md                 # course home
  start-here.md            # how the course works
  syllabus.md              # master syllabus
  glossary.md              # course terminology
  modules/                 # one module per week (concepts + slides)
  exercises/               # one lab per week (what learners do)
  common_artifacts/        # cheat sheets, checklists, templates
  community/               # office hours, FAQ
  assets/
    css/custom.css         # course theme
    js/course.js           # quizzes + lab progress
    day6/                  # Week 6 figures and slide deck
```

## The "under construction" notices

Both notices are injected by `overrides/main.html`, **not** pasted into Markdown
files, so any page added later is covered automatically:

- an announcement bar at the top of the window (dismissible), and
- a banner at the top of every page's content.

To retire them when the site is finished, delete or comment out the two blocks in
`overrides/main.html`. Nothing in `docs/` needs to change.

## Authoring conventions

**Page metadata strip** — a row of pills under the title:

```html
<ul class="meta-row">
  <li><strong>Time</strong> 90 min</li>
  <li><strong>Track</strong> optional</li>
</ul>
```

**Lab progress bar** — add this once, above the checklists on a lab page. It
finds every task-list checkbox in the article, persists state to the reader's
own browser, and renders a progress bar with a reset button:

```html
<div class="lab-progress"></div>
```

**Self-check quiz** — mark the correct option with `data-correct="true"`. More
than one may be correct; the explanation shows after any click:

```html
<div class="quiz">
  <p class="quiz__q">Question text?</p>
  <ul class="quiz__opts">
    <li data-correct="false">A distractor</li>
    <li data-correct="true">The answer</li>
  </ul>
  <div class="quiz__why">
    <p>Why, and what the distractor was testing.</p>
  </div>
</div>
```

**Hand-off device** — the ATLAS → cohort ID → HADES motif. See
`docs/modules/day-06-hades.md` for the markup.

**Cohort IDs** — wrap in `<span class="cohort-id">#1769447</span>`.

**Abbreviations** — add to `includes/abbreviations.md` and the term gains a hover
definition everywhere on the site. Also add it to `docs/glossary.md` if it needs
more than a line.

**Figures** — use `<figure markdown="1">` with a `<figcaption>` that says what the
reader should notice, not just what the image is.

## Adding a week

1. Create `docs/modules/day-0N-topic.md` and `docs/exercises/day-0N-topic.md`.
2. Add both to the `Weeks` section of `nav` in `mkdocs.yml`.
3. Add a card to the week grid in `docs/index.md`.
4. Add a row to the syllabus table in `docs/syllabus.md`.

## Assets

Large binaries live under `docs/assets/`. Note that
`docs/assets/img/IMG_7932.png` is a 6.8 MB original; the site uses the optimized
`logo.png` (102 KB) and `favicon.png` (17 KB) generated from it. The original can
be removed from the repository once you are happy with the derived versions.
