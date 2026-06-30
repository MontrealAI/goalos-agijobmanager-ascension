# Workflow Autopilot

Publisher workflow: `.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml`
Display name: **GoalOS AGIJobManager Ascension Institutional Website Publisher v42**

It rehydrates routes, runs dependency-free checks, builds static output, optionally commits generated source, and deploys GitHub Pages when requested. It never installs package-registry dependencies, never adds analytics, never creates forms, never connects wallets, never approves tokens, and never broadcasts transactions.

Inputs: `deploy_pages`, `commit_generated_source`, `run_live_factual_check`, `strict_live_factual_check`. Safe defaults keep live factual checks off unless an RPC secret is configured.

To recover from red historical runs, fix source, rerun the current workflow, inspect logs, and verify `dist/production-url.json`.

