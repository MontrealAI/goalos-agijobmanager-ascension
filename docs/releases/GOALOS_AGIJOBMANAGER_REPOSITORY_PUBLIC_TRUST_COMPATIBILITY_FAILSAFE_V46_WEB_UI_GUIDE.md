# v46 GitHub Web UI Guide

## What this fixes

Use v46 if GitHub Actions fails with:

```text
FAIL · build manifest advertises v42
```

v46 makes the publisher release-invariant across the v42 → v46 lineage.

## Recommended upload

Upload the hotfix overlay first:

```text
goalos-agijobmanager-ascension-repository-public-trust-compatibility-failsafe-v46-hotfix-overlay.zip
```

## Steps

1. Download and unzip the hotfix overlay.
2. Open:

```text
https://github.com/MontrealAI/goalos-agijobmanager-ascension
```

3. Click:

```text
Add file → Upload files
```

4. Drag the **contents of the unzipped folder** into GitHub. Do not drag the ZIP itself.
5. Commit directly to `main` with:

```text
Add Repository Public Trust Compatibility Failsafe v46
```

6. Open **Actions**.
7. Run:

```text
GoalOS AGIJobManager Ascension Repository Public Trust Compatibility Failsafe Publisher v46
```

8. Use:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

## Verify after green run

Open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/
https://montrealai.github.io/goalos-agijobmanager-ascension/ascension-flight-deck.html
https://montrealai.github.io/goalos-agijobmanager-ascension/experience-concierge.html
https://montrealai.github.io/goalos-agijobmanager-ascension/command-center.html
https://montrealai.github.io/goalos-agijobmanager-ascension/production-url.json
```

Do not rerun old failed v43/v44/v45 jobs; GitHub keeps old red logs permanently.
