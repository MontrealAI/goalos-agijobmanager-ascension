# V43 Repository & Public Trust Finalization

V43 turns the repository and website into a cleaner public proof institution. It is a trust-surface release, not a new demo release.

## Completed

1. Added explicit `LICENSE` and `NOTICE`.
2. Moved root-level historical vXX reports into `docs/reports/historical-root/`.
3. Kept the repository root cleaner and more institutional.
4. Upgraded `SECURITY.md`, `SUPPORT.md`, `CODE_OF_CONDUCT.md`, and `CONTRIBUTING.md`.
5. Rewrote `docs/DEMO_CATALOG.md` with human-readable, non-generic route descriptions.
6. Added exact route count from `data/canonical-route-manifest-v43.json`: **50 routes**.
7. Removed the last `Loading…` fallback from Ascension Flight Deck and other static route fallbacks.
8. Replaced legacy hard-coded package scripts with dynamic runner scripts.
9. Added OpenGraph, Twitter Card, canonical URL, and social preview metadata.
10. Added `docs/BRAND_AND_COMMUNICATIONS.md`.
11. Added `docs/ACCESSIBILITY_QA.md`.
12. Added static checks for canonical metadata and no `Loading…` on public pages.
13. Added these release notes.

## Public-safe posture preserved

No account. No form. No analytics. No cookies. No browser storage. No public wallet connection. No token approval. No network switch. No transaction broadcast. No funds moved. No production authority. No user data wanted.

## Verification

V43 should pass:

```bash
python3 tools/verify.py
node tools/no-registry-preflight.mjs
node tools/pathspec-proof-kernel.mjs
node tools/workflow-reference-auditor.mjs
node tools/docs-link-checker.mjs
node tools/claim-boundary-checker.mjs
node tests/documentation.test.mjs
node tools/run-all-tests.mjs
node tools/apply-public-trust-metadata-v43.mjs
python3 tools/build.py
node tools/run-existing-kernels.mjs
node tools/public-trust-checker-v43.mjs
node tools/repository-public-trust-finalization-v43-kernel.mjs
```
