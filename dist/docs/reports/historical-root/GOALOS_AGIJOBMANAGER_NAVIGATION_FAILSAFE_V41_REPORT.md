# GoalOS AGIJobManager Ascension Navigation Failsafe v41 Report

## Summary

v41 corrects the remaining GitHub Actions and website UX issues after v40.

## Corrections

- Fixes the `v38 navigation injected into homepage` failure by updating the navigation-final kernel to the current standard.
- Adds `tools/navigation-source-sanitizer.mjs` so source HTML is cleaned before tests and build.
- Keeps `tools/site-rehydrate.mjs` and workflow fallback so missing public route helpers cannot stop the publisher.
- Ensures generated pages have one native page header and one floating Site Command, not stacked top menus.
- Verifies the homepage and Command Center exclude legacy injectors such as `site-shell.js`, `site-guide.js`, `navigation-v38.js`, `navigation-v37.js`, and `navigation-atlas.js`.
- Preserves all proof demos, evidence rooms, legal pages, token-boundary pages, expert surfaces, and public routes.

## Public posture

No accounts, no forms, no analytics, no cookies, no localStorage, no sessionStorage, no public wallet connection, no token approval, no network switch, no transaction broadcast, no funds moved, no production authority, and no user data wanted.

## Verification

Local verification passed:

- repository verifier: PASS
- no-registry preflight: PASS
- pathspec-proof kernel: PASS
- workflow reference auditor: PASS
- dynamic production tests: PASS, 34 files
- static build: PASS, 345 files
- manifest-guarded post-build kernels: PASS, 28 kernels
- menu-over-menu checks: PASS
