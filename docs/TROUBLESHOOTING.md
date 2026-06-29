# Troubleshooting

[Docs index](README.md)

| Symptom | Fix |
| --- | --- |
| Red historical GitHub Actions run | Logs are immutable; commit a fix and rerun current workflow. |
| Missing route files | Run `node tools/site-rehydrate.mjs` and `python3 tools/build.py`. |
| Missing kernel files | Run `node tools/run-existing-kernels.mjs`; add only dependency-free kernels. |
| Workflow reference failures | Run `node tools/workflow-reference-auditor.mjs`. |
| GitHub Pages not updating | Check Pages environment permissions and latest deployment. |
| Upload did not work | Upload overlay contents, not the zip file itself. |
| Browser shows stale page | Hard refresh or clear cache. |
| Stale workflow names | Use the v41 publisher workflow currently in `.github/workflows/`. |
| Need production URL proof | Inspect `dist/production-url.json` after build if present. |
