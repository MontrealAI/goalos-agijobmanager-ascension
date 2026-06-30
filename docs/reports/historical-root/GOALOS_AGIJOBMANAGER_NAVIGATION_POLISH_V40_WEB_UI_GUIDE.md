# v40 GitHub Web UI Guide

1. Download and unzip `goalos-agijobmanager-ascension-navigation-polish-v40-overlay.zip`.
2. Open `https://github.com/MontrealAI/goalos-agijobmanager-ascension`.
3. Click **Add file → Upload files**.
4. Drag the contents of the unzipped overlay into GitHub.
5. Commit directly to `main` with: `Add Navigation Polish v40`.
6. Go to **Actions**.
7. Run **GoalOS AGIJobManager Ascension Navigation Polish Publisher v40**.
8. Keep `deploy_pages = true`, `commit_generated_source = true`, `run_live_factual_check = false`, and `strict_live_factual_check = false`.
9. After the run is green, open `/`, `/experience-concierge.html`, `/command-center.html`, `/proof-settlement-lifecycle.html`, and `/production-url.json`.

Do not rerun old failed v39 jobs.
