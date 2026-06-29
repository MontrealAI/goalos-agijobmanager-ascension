# Deployment with the GitHub Web UI

[Docs index](README.md) · [Workflow autopilot](WORKFLOW_AUTOPILOT.md)

1. Open the repository on GitHub.
2. Upload the overlay contents, not the zip file itself.
3. Commit to `main`.
4. Open **Actions**.
5. Run **GoalOS AGIJobManager Ascension Navigation Source Polish Publisher v41**.
6. Keep `deploy_pages` = `true`.
7. Keep `commit_generated_source` = `true`.
8. Leave live factual checks `false` unless `ETHEREUM_RPC_URL` is configured.
9. Confirm the production URL: https://montrealai.github.io/goalos-agijobmanager-ascension/.

## Recovery

If a historical run is red, do not edit immutable logs. Commit a fix and run the current workflow again.
