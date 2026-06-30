# GitHub Web UI Guide — Proof-to-Action Theatre v18

## 1. Download and unzip the overlay

Download:

```text
goalos-agijobmanager-ascension-proof-to-action-theatre-v18-overlay.zip
```

Unzip it on your computer.

On macOS, press:

```text
Command + Shift + .
```

to make hidden folders such as `.github` visible.

## 2. Upload through GitHub Web UI

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
Add Proof-to-Action Theatre v18
```

## 3. Run the autonomous workflow

Go to:

```text
Actions → GoalOS AGIJobManager Ascension Proof-to-Action Theatre Publisher v18
```

Click **Run workflow**.

Use:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

## 4. Verify the live page

After the run is green, open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/proof-to-action-theatre.html
https://montrealai.github.io/goalos-agijobmanager-ascension/proof-to-action-theatre-demo.json
```

Also confirm the homepage has a visible link to the new theatre.

## 5. What success looks like

The page should let users:

```text
Choose a mission preset
Edit a public-safe objective
Run until DONE
Watch report-only output vs GoalOS proof loop
Inspect the Chronicle
Download a public-safe Evidence Docket
Copy an executive brief
```

The page must not ask for accounts, personal data, wallet access, token approvals, network permissions, or production authority.
