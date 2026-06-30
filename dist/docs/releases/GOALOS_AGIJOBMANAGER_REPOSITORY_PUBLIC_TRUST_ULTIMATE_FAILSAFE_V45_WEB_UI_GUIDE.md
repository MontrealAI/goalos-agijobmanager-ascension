# GitHub Web UI Guide — V45 Repository Public Trust Ultimate Failsafe

## Use the hotfix first

Upload the v45 hotfix overlay if the repository already has the v43/v44 public-trust files but the workflow failed with:

```text
Cannot find module tests/repository-public-trust-v43.test.mjs
```

## Steps

1. Download and unzip the v45 hotfix overlay.
2. Open `https://github.com/MontrealAI/goalos-agijobmanager-ascension`.
3. Click **Add file → Upload files**.
4. Drag the **contents of the unzipped folder**, not the ZIP itself.
5. Commit directly to `main` with:

```text
Add Repository Public Trust Ultimate Failsafe v45
```

6. Open **Actions**.
7. Run:

```text
GoalOS AGIJobManager Ascension Repository Public Trust Ultimate Failsafe Publisher v45
```

8. Use the safe defaults:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

## After the workflow is green

Open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/
https://montrealai.github.io/goalos-agijobmanager-ascension/ascension-flight-deck.html
https://montrealai.github.io/goalos-agijobmanager-ascension/experience-concierge.html
https://montrealai.github.io/goalos-agijobmanager-ascension/command-center.html
https://montrealai.github.io/goalos-agijobmanager-ascension/production-url.json
```

## Important

Do not rerun the failed v44 job. Historical failed runs remain visible in GitHub Actions and cannot be edited. Deploy v45 going forward.
