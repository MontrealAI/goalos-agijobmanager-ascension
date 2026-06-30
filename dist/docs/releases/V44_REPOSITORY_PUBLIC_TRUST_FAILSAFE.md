# v44 Repository Public Trust Failsafe

v44 is a failsafe publication release for GoalOS AGIJobManager Ascension.

## Why this release exists

A v43 GitHub Actions run failed because the workflow called `tools/root-cleanup-v43.mjs`, but the live repository state did not contain that file at runtime. v44 removes that failure class by bootstrapping resilient public-trust tools before any verification step runs.

## What changed

- Added a workflow bootstrap step that creates safe fallback tooling if a support script is missing.
- Added `tools/root-cleanup-v44.mjs`.
- Added `tools/apply-public-trust-metadata-v44.mjs`.
- Added `tools/public-trust-checker-v44.mjs`.
- Added `tools/repository-public-trust-failsafe-v44-kernel.mjs`.
- Added `data/canonical-route-manifest-v44.json` as the v44 route manifest alias.
- Updated `package.json` main scripts to use dynamic test and kernel runners.
- Preserved v43 public-trust documentation, metadata, route count, and clean-root posture.

## Public posture preserved

- No account.
- No form.
- No analytics.
- No cookies.
- No browser storage.
- No public wallet connection.
- No token approval.
- No network switch.
- No transaction broadcast.
- No funds moved.
- No production authority.
- No user data wanted.

## Verification intent

v44 is designed to pass the same public trust checks as v43 while preventing `MODULE_NOT_FOUND` failures for cleanup and metadata tools.
