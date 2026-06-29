# GoalOS AGIJobManager Ascension Navigation System Final v38 · GitHub Web UI Guide

## 1. Download

Download and unzip the v38 full-source overlay.

## 2. Upload to GitHub

Open:

https://github.com/MontrealAI/goalos-agijobmanager-ascension

Click:

Add file → Upload files

Drag the contents of the unzipped overlay into GitHub.

## 3. Commit

Commit directly to `main` with:

Add Navigation System Final v38

## 4. Run the workflow

Go to **Actions** and run:

GoalOS AGIJobManager Ascension Navigation System Final Publisher v38

Use:

- `deploy_pages: true`
- `commit_generated_source: true`
- `run_live_factual_check: false`
- `strict_live_factual_check: false`

## 5. Verify live pages

After the workflow is green, open:

- https://montrealai.github.io/goalos-agijobmanager-ascension/
- https://montrealai.github.io/goalos-agijobmanager-ascension/experience-hub.html
- https://montrealai.github.io/goalos-agijobmanager-ascension/command-center.html
- https://montrealai.github.io/goalos-agijobmanager-ascension/site-atlas.html
- https://montrealai.github.io/goalos-agijobmanager-ascension/site-navigation-v38.json
- https://montrealai.github.io/goalos-agijobmanager-ascension/archive-v36-ascension-chamber.html
- https://montrealai.github.io/goalos-agijobmanager-ascension/production-url.json

Old red Actions runs stay visible because GitHub preserves historical logs. The green v38 workflow is the production path going forward.
