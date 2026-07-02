# GitHub Web UI Guide — Complete Route Recovery v57

## Goal

Deploy v57 to restore every public page into the website navigation and canonical route manifest.

## Recommended file

Use:

`goalos-agijobmanager-ascension-complete-route-recovery-v57-overlay.zip`

## Step-by-step

1. Download the v57 full-source overlay ZIP.
2. Unzip it on your computer.
3. Open:

   `https://github.com/MontrealAI/goalos-agijobmanager-ascension`

4. Click **Add file → Upload files**.
5. Drag the **contents of the unzipped folder** into GitHub.
   - Do not upload the ZIP itself.
   - Upload the folder contents.
6. Commit directly to `main` with this message:

   `Add Complete Route Recovery and Institutional Experience Command v57`

7. Open **Actions**.
8. Run the v57 publisher workflow.
9. Use these inputs:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

## After the run is green

Open these pages:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/
https://montrealai.github.io/goalos-agijobmanager-ascension/complete-route-index.html
https://montrealai.github.io/goalos-agijobmanager-ascension/command-center.html
https://montrealai.github.io/goalos-agijobmanager-ascension/experience-hub.html
https://montrealai.github.io/goalos-agijobmanager-ascension/experience-concierge.html
https://montrealai.github.io/goalos-agijobmanager-ascension/loop-contract-theatre.html
https://montrealai.github.io/goalos-agijobmanager-ascension/evidence/
https://montrealai.github.io/goalos-agijobmanager-ascension/production-url.json
```

## What should look different

- The site should advertise **63 public routes**.
- The Command Center should show the complete route catalog.
- The Experience Hub should no longer show stale 43-route language.
- The Concierge should guide users by purpose.
- The floating Site Command should search all pages.
- `loop-contract-theatre.html` and `evidence/index.html` should be reachable.
- No public page should ask for accounts, wallets, forms, analytics, cookies, browser storage, or user data.

## If GitHub Actions still shows old red failures

That is expected. GitHub keeps historical logs. The important run is the new v57 workflow run after this upload.
