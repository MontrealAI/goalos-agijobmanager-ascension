# GoalOS AGIJobManager Ascension — Evidence Docket Composer v34

## Summary

v34 corrects the v33 post-build failure by replacing marker-based legacy checks with a principle-based Dependency-Zero Kernel and a manifest-guarded kernel runner. It also adds a new flagship public demonstration: Evidence Docket Composer.

## Operational fixes

- overwrites stale `tools/dependency-zero-kernel.mjs` with a non-marker-based implementation
- keeps dependency-zero publishing: no npm install, no npm ci, no registry fetch
- keeps pathspec-proof commits through `git add -A`
- uses manifest-guarded test and kernel runners to avoid stale historical references
- preserves public-safe legal, privacy, token, wallet, and authority boundaries

## New public page

- `evidence-docket-composer.html`

## New public data contract

- `evidence-docket-composer-demo.json`

## User value

Visitors can compose a public-safe claim, tune evidence support, replay readiness, residual risk, and public/private boundary, then export an Evidence Docket JSON.

## Safety posture

No account, no form, no wallet, no token approval, no network request, no analytics, no cookies, no localStorage, no sessionStorage, no transaction broadcast, no production authority, and no user data wanted.
