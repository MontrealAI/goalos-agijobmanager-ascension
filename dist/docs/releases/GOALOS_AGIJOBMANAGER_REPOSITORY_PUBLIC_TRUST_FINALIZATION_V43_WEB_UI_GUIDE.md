# GitHub Web UI Guide — v43 Repository & Public Trust Finalization

This guide is for non-technical users using the GitHub website.

## What to upload

Upload the **contents** of the v43 overlay ZIP, not the ZIP file itself.

## Steps

1. Open the repository:

   https://github.com/MontrealAI/goalos-agijobmanager-ascension

2. Click **Add file**.

3. Click **Upload files**.

4. Unzip the v43 overlay on your computer.

5. Drag the unzipped contents into GitHub.

6. Commit directly to `main` with:

```text
Add Repository Public Trust Finalization v43
```

7. Open the **Actions** tab.

8. Run:

```text
GoalOS AGIJobManager Ascension Repository Public Trust Publisher v43
```

9. Use these inputs:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

10. Wait for the green check.

## What the workflow will do

The workflow will:

- clean historical root-level reports into `docs/reports/historical-root/`;
- rehydrate missing public-safe routes if necessary;
- apply social metadata;
- run repository, docs, claim-boundary, and public-trust checks;
- build the static site;
- run post-build kernels;
- commit generated source and build artifacts back to `main` if enabled;
- deploy GitHub Pages if enabled.

## Verify after deployment

Open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/
https://montrealai.github.io/goalos-agijobmanager-ascension/ascension-flight-deck.html
https://montrealai.github.io/goalos-agijobmanager-ascension/experience-concierge.html
https://montrealai.github.io/goalos-agijobmanager-ascension/command-center.html
https://montrealai.github.io/goalos-agijobmanager-ascension/production-url.json
```

Confirm:

- no menu stacking;
- no visible `Loading…` fallback;
- homepage shows 50 public routes;
- public demos remain no-wallet and no-user-data;
- `production-url.json` includes `publicHtmlRouteCount: 50`.

Old red workflow runs are historical and cannot be edited. Use the new v43 workflow run going forward.
