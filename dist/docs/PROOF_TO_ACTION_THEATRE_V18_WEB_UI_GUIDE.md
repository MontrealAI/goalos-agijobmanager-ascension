# GitHub Web UI Guide — Proof-to-Action Theatre v18

## 1. Upload the overlay

Download and unzip:

```text
goalos-agijobmanager-ascension-proof-to-action-theatre-v18-overlay.zip
```

Open:

```text
https://github.com/MontrealAI/goalos-agijobmanager-ascension
```

Click:

```text
Add file -> Upload files
```

Drag the **contents** of the unzipped overlay into GitHub.

Commit directly to `main` with:

```text
Add Proof-to-Action Theatre v18
```

## 2. Run the workflow

Go to **Actions** and run:

```text
GoalOS AGIJobManager Ascension Proof-to-Action Theatre Publisher v18
```

Use:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

## 3. Verify the new page

After the run is green, open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/proof-to-action-theatre.html
https://montrealai.github.io/goalos-agijobmanager-ascension/proof-to-action-theatre-demo.json
```

## 4. What users should see

The page should let a user:

1. pick a public-safe mission;
2. click **Run until DONE**;
3. watch GoalOS gates advance;
4. see proof debt decrease and mission value increase;
5. inspect protocol objects;
6. download a public-safe Evidence Docket JSON;
7. stop at human review.

The page should not ask for an account, wallet, email, cookie permission, file upload, or personal information.
