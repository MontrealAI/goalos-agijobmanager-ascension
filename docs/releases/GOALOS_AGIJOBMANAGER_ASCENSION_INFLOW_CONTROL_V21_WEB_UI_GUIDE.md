# GitHub Web UI Guide — Ascension Inflow Control Room v21

1. Download and unzip `goalos-agijobmanager-ascension-ascension-inflow-control-v21-overlay.zip`.
2. Open `https://github.com/MontrealAI/goalos-agijobmanager-ascension`.
3. Click **Add file → Upload files**.
4. Drag the contents of the unzipped overlay into GitHub.
5. Commit directly to `main` with:

```text
Add Ascension Inflow Control Room v21
```

6. Go to **Actions**.
7. Run **GoalOS AGIJobManager Ascension Inflow Control Publisher v21**.
8. Use:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

9. After the workflow succeeds, open:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/ascension-inflow-control.html
https://montrealai.github.io/goalos-agijobmanager-ascension/ascension-inflow-control-demo.json
```
