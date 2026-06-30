# GitHub Web UI Guide — Replay & Falsification Gauntlet v23

## Goal

Add the next browser-local public demonstration page to `MontrealAI/goalos-agijobmanager-ascension`.

## Step 1 — Upload the overlay

1. Download and unzip `goalos-agijobmanager-ascension-replay-falsification-gauntlet-v23-overlay.zip`.
2. Open the repository on GitHub.
3. Click **Add file → Upload files**.
4. Drag the contents of the unzipped overlay into GitHub.
5. Commit directly to `main` with this message:

```text
Add Replay & Falsification Gauntlet v23
```

## Step 2 — Run the workflow

Go to **Actions** and run:

```text
GoalOS AGIJobManager Ascension Replay & Falsification Gauntlet Publisher v23
```

Use:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

## Step 3 — Verify live pages

After the workflow succeeds, open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/replay-falsification-gauntlet.html
https://montrealai.github.io/goalos-agijobmanager-ascension/replay-falsification-gauntlet-demo.json
```

## What users will see

A browser-local gauntlet where they can choose a claim, run replay checks, run adversarial falsification probes, inspect the result, and download a public-safe ReplayReceipt JSON.
