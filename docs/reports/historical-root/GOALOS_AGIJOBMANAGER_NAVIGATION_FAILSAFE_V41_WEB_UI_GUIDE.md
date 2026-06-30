# GoalOS AGIJobManager Ascension Navigation Failsafe v41 · GitHub Web UI Guide

1. Download and unzip the v41 full-source overlay ZIP.
2. Open `https://github.com/MontrealAI/goalos-agijobmanager-ascension`.
3. Click **Add file → Upload files**.
4. Drag the **contents** of the unzipped overlay into GitHub.
5. Commit directly to `main` with: `Add Navigation Failsafe v41`.
6. Open **Actions**.
7. Run **GoalOS AGIJobManager Ascension Navigation Failsafe Publisher v41**.
8. Use:
   - `deploy_pages: true`
   - `commit_generated_source: true`
   - `run_live_factual_check: false`
   - `strict_live_factual_check: false`
9. After the run is green, verify:
   - `/`
   - `/experience-hub.html`
   - `/command-center.html`
   - `/experience-concierge.html`
   - `/proof-settlement-lifecycle.html`
   - `/production-url.json`

Do not rerun old failed v40, v39, or v38 jobs.
