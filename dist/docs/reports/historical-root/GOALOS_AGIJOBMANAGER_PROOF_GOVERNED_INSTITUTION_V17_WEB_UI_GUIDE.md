# GitHub Web UI Guide · Proof-Governed Institution Lab v17

## 1. Download and unzip the overlay

Download `goalos-agijobmanager-ascension-proof-governed-institution-v17-overlay.zip` and unzip it.

On macOS, press `Command + Shift + .` so hidden folders such as `.github` are visible.

## 2. Upload to GitHub

Open:

`https://github.com/MontrealAI/goalos-agijobmanager-ascension`

Click:

`Add file → Upload files`

Drag the **contents** of the unzipped overlay into GitHub.

Commit directly to `main` with:

`Add proof-governed institution lab v17`

## 3. Run the workflow

Open the Actions tab and run:

`GoalOS AGIJobManager Ascension Proof-Governed Institution Publisher v17`

Use:

- `deploy_pages: true`
- `commit_generated_source: true`
- `run_live_factual_check: false`
- `strict_live_factual_check: false`

## 4. Verify live pages

After the workflow is green, open:

- `https://montrealai.github.io/goalos-agijobmanager-ascension/coordination-lab.html`
- `https://montrealai.github.io/goalos-agijobmanager-ascension/proof-governed-institution-demo.json`
- `https://montrealai.github.io/goalos-agijobmanager-ascension/start.html`
- `https://montrealai.github.io/goalos-agijobmanager-ascension/demo-lab.html`

## 5. What users can do

Users can choose a mission, compare coordination models, run the proof cycle, inspect Chronicle traces, copy a briefing, and download an Evidence Docket JSON.

Everything runs locally in the browser.
