# GoalOS AGIJobManager Ascension · v33 Web UI Guide

## Use this package

Upload the contents of the v33 overlay ZIP. It includes the corrected workflow, all tools, all tests, and the new Until-DONE Mission Control page.

## GitHub Web UI steps

1. Open `https://github.com/MontrealAI/goalos-agijobmanager-ascension`.
2. Click **Add file → Upload files**.
3. Unzip the v33 overlay on your computer.
4. Drag the **contents** of the unzipped overlay into GitHub.
5. Commit directly to `main` with: `Add Until-DONE Mission Control v33`.
6. Open **Actions**.
7. Run: **GoalOS AGIJobManager Ascension Until-DONE Publisher v33**.
8. Keep:
   - `deploy_pages: true`
   - `commit_generated_source: true`
   - `run_live_factual_check: false`
   - `strict_live_factual_check: false`

## Verify after a green run

Open:

- `https://montrealai.github.io/goalos-agijobmanager-ascension/until-done-mission-control.html`
- `https://montrealai.github.io/goalos-agijobmanager-ascension/until-done-mission-control-demo.json`
- `https://montrealai.github.io/goalos-agijobmanager-ascension/proof-constitution-simulator.html`
- `https://montrealai.github.io/goalos-agijobmanager-ascension/production-url.json`

## Important

Do not rerun old failed jobs. GitHub preserves old red logs. The corrected path is to upload v33 and run the v33 workflow.
