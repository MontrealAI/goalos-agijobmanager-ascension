# GitHub Web UI Guide — Action Graph Handoff v28

## Goal

Add the next public GoalOS demonstration to the existing repository:

`https://github.com/MontrealAI/goalos-agijobmanager-ascension`

No new repository is created.

## Steps

1. Download and unzip the v28 overlay ZIP.
2. Open the GitHub repository.
3. Click **Add file → Upload files**.
4. Drag the contents of the unzipped overlay into GitHub.
5. Commit directly to `main` with:

`Add Action Graph Handoff v28`

6. Go to **Actions**.
7. Run **GoalOS AGIJobManager Ascension Action Graph Handoff Publisher v28**.
8. Use:

- `deploy_pages: true`
- `commit_generated_source: true`
- `run_live_factual_check: false`
- `strict_live_factual_check: false`

## Verify

Open:

- `https://montrealai.github.io/goalos-agijobmanager-ascension/action-graph-handoff.html`
- `https://montrealai.github.io/goalos-agijobmanager-ascension/action-graph-handoff-demo.json`

The demo should run entirely in the browser and produce a downloadable `ActionGraphHandoffReceipt` JSON.
