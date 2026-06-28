# GitHub Web UI Guide — Chronicle Compounding Lab v20

## 1. Download and unzip the overlay

Download `goalos-agijobmanager-ascension-chronicle-compounding-lab-v20-overlay.zip` and unzip it.

On macOS, press **Command + Shift + .** if hidden folders such as `.github` are not visible.

## 2. Upload the overlay

Open:

```text
https://github.com/MontrealAI/goalos-agijobmanager-ascension
```

Click:

```text
Add file → Upload files
```

Drag the **contents** of the unzipped overlay into GitHub.

Commit directly to `main` with:

```text
Add Chronicle Compounding Lab v20
```

## 3. Run the workflow

Go to **Actions** and run:

```text
GoalOS AGIJobManager Ascension Chronicle Compounding Lab Publisher v20
```

Use:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

## 4. Verify the live pages

After the workflow is green, open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/chronicle-compounding-lab.html
https://montrealai.github.io/goalos-agijobmanager-ascension/chronicle-compounding-lab-demo.json
```

The page should let visitors run a proof cycle, run a three-cycle climb, inspect Chronicle events, and download an Evidence Docket without any wallet, account, tracking, storage, or network request.
