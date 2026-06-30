# Troubleshooting

- Red historical workflow runs are immutable; rerun after fixing source.
- Missing route files: compare links with `site/*.html`.
- Missing kernel files: run `node tools/run-existing-kernels.mjs`.
- Workflow reference failures: run `node tools/workflow-reference-auditor.mjs`.
- Stale workflow names: use the current publisher name in `.github/workflows/`.
- GitHub Pages delay: wait, then inspect `dist/production-url.json`.
- Pages permissions: verify Pages source and Actions permissions.
- Upload overlay contents, not ZIP.
- Browser cache: hard refresh.
- Menu stacking: inspect generated page headers and Site Command only once.
- No-JS/placeholder checks: run `python3 tools/verify.py`.
- Docs link failures: run `node tools/docs-link-checker.mjs` and fix local links.


## Shared boundary

Public demos are browser-local and public-safe: no user data wanted, no forms, no analytics, no cookies, no localStorage/sessionStorage, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, and no production authority. This material is not legal, financial, investment, tax, medical, audit, safety-certification, or professional advice. It does not claim achieved AGI, achieved ASI, empirical SOTA, external audit completed, production certified, safe autonomy proven, guaranteed return, or investment opportunity.
