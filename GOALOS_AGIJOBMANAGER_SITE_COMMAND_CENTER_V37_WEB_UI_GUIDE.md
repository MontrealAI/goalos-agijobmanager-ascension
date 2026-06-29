# v37 GitHub Web UI Guide

1. Download and unzip the v37 overlay.
2. Open `https://github.com/MontrealAI/goalos-agijobmanager-ascension`.
3. Click **Add file → Upload files**.
4. Drag the contents of the unzipped overlay into GitHub.
5. Commit directly to `main` with: `Add Site Command Center v37`.
6. Open **Actions**.
7. Run **GoalOS AGIJobManager Ascension Site Command Publisher v37**.
8. Keep `deploy_pages=true`, `commit_generated_source=true`, `run_live_factual_check=false`, and `strict_live_factual_check=false`.

After the workflow is green, verify:

- `/`
- `/site-atlas.html`
- `/ascension-flight-deck.html`
- `/site-navigation-map.json`
- `/production-url.json`
