# GoalOS AGIJobManager Ascension — Complete Route Recovery v57

## Release

**v57 — Complete Route Recovery and Institutional Experience Command**

Production URL:

https://montrealai.github.io/goalos-agijobmanager-ascension/

## Purpose

This release restores complete public route visibility and turns the website into a cleaner institutional navigation system. It preserves all existing public-safe pages and adds a single static-first route recovery front door.

## What was corrected

- Reinstated all current `site/**/*.html` pages into the canonical route manifest.
- Added the missing public navigation entries for:
  - `loop-contract-theatre.html`
  - `evidence/index.html`
  - `complete-route-index.html`
- Increased the canonical route count to **63 public routes**.
- Rebuilt Command Center, Experience Hub, Experience Concierge, Site Atlas, Navigation Atlas, and Experience Atlas so they point to the complete route constellation.
- Removed stale route-count drift, including stale 43-route Experience Hub language.
- Preserved the Ascension Flight Deck iframe/JourneyReceipt interface instead of overwriting it with a generic page.
- Updated Site Command search with every public route.
- Added versioned manifest aliases for historical compatibility kernels.
- Updated README, Demo Catalog, release notes, tests, workflow, and build metadata.

## New / updated public pages

- `complete-route-index.html`
- `command-center.html`
- `experience-hub.html`
- `experience-concierge.html`
- `site-atlas.html`
- `navigation-atlas.html`
- `experience-atlas.html`
- `index.html`

## New / updated implementation files

- `tools/route-recovery-v57.mjs`
- `tools/release-compatibility-harmonizer-v57.mjs`
- `tools/complete-route-recovery-v57-kernel.mjs`
- `tools/public-trust-checker-v57.mjs`
- `tests/complete-route-recovery-v57.test.mjs`
- `site/assets/route-recovery-v57.css`
- `site/assets/site-command-v41.js`
- `data/canonical-route-manifest*.json`
- `data/site-navigation*.json`
- `data/site-navigation-catalog.json`
- `data/site-navigation-map.json`
- `data/experience-hub-catalog.json`
- `.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml`

## Public-safe posture preserved

- No account.
- No form.
- No wallet connection.
- No token approval.
- No analytics.
- No cookies.
- No browser storage.
- No transaction broadcast.
- No production authority.
- No user data wanted.

## Verification completed locally

```text
npm test: PASS
npm run build: PASS
verify.py: PASS
no-registry-preflight: PASS
pathspec-proof-kernel: PASS
workflow-reference-auditor: PASS
docs-link-checker: PASS
claim-boundary-checker: PASS
metadata-integrity-checker: PASS
route-manifest-integrity: PASS
accessibility-static-checker: PASS
public-safe-static-checker: PASS
production tests: 50 files executed
post-build kernels: 46 kernels executed
public-trust checker: PASS
complete route recovery v57 kernel: PASS
canonical public routes: 63
site HTML routes: 63
dist HTML routes: 63
build output: 731 files
```

## Deployment recommendation

Use the full-source overlay ZIP first. It contains the corrected source, workflow, docs, data, tests, tools, and prebuilt `dist` artifacts.

Do not rerun old failed workflows. Upload v57, commit to `main`, then run the v57 workflow.
