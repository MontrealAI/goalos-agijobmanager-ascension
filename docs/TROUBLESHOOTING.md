# Troubleshooting

| Symptom | Check |
|---|---|
| Old red workflow run | Historical runs remain visible; rerun the current publisher after fixes. |
| Missing route file | Compare `site/` with [Demo Catalog](DEMO_CATALOG.md). |
| Missing kernel file | Run `node tools/run-existing-kernels.mjs`; it only invokes present kernels. |
| Stale workflow name | Check `.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml`. |
| Missing site rehydrate tooling | Ensure `tools/site-rehydrate.mjs` exists. |
| GitHub Pages delay | Wait, then verify `dist/production-url.json`. |
| Pages permissions | Use GitHub Pages from Actions and required workflow permissions. |
| Upload failed | Upload overlay contents, not the ZIP. |
| Browser cache | Hard refresh or try a private window. |
| Menu stacking | Do not add top-menu injection; inspect repeated nav blocks. |
| Docs link failures | Run `node tools/docs-link-checker.mjs`. |
| Claim-boundary failures | Run `node tools/claim-boundary-checker.mjs`. |

