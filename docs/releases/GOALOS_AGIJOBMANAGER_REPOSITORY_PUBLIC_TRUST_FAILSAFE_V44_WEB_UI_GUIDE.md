# GitHub Web UI Guide — v44 Repository Public Trust Failsafe

1. Download and unzip the v44 full-source overlay.
2. Open the GitHub repository.
3. Click **Add file → Upload files**.
4. Drag the **contents** of the unzipped overlay into GitHub. Do not upload the ZIP file itself.
5. Commit directly to `main` with:

```text
Add Repository Public Trust Failsafe v44
```

6. Open **Actions**.
7. Run:

```text
GoalOS AGIJobManager Ascension Repository Public Trust Failsafe Publisher v44
```

8. Keep:

```text
deploy_pages: true
commit_generated_source: true
run_live_factual_check: false
strict_live_factual_check: false
```

9. After the workflow turns green, verify:

```text
https://montrealai.github.io/goalos-agijobmanager-ascension/
https://montrealai.github.io/goalos-agijobmanager-ascension/production-url.json
```

Old red workflow logs are historical and cannot be changed. Use v44 going forward.
