# v27 GitHub Web UI Guide

1. Download and unzip the v27 overlay.
2. Open `https://github.com/MontrealAI/goalos-agijobmanager-ascension`.
3. Click **Add file → Upload files**.
4. Drag the contents of the overlay into GitHub.
5. Commit directly to `main` with:

```text
Add Real-Task Benchmark Bridge v27
```

6. Go to **Actions**.
7. Run **GoalOS AGIJobManager Ascension Real-Task Benchmark Bridge Publisher v27**.
8. Use:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

Verify:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/real-task-benchmark-bridge.html
https://montrealai.github.io/goalos-agijobmanager-ascension/real-task-benchmark-bridge-demo.json
```
