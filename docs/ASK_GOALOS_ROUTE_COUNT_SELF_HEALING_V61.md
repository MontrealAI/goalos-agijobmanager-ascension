# Ask GoalOS Route Count Self-Healing v61

v61 corrects the public-site publication failure class where a living front-door document can mention a stale public route count after a new route is added.

## What changed

- The canonical manifest remains the source of truth.
- `tools/route-count-harmonizer-v61.mjs` normalizes README, `docs/DEMO_CATALOG.md`, public navigation manifests, and production URL contracts before metadata checks.
- The workflow runs the harmonizer before dynamic tests and again before build publication.
- Historical release notes may preserve history, but front-door docs must advertise the current canonical public route count.

## Current canonical route count

67 public routes.

## Boundary

No account, no form submission, no wallet connection, no token approval, no network request from the public demo, no analytics, no cookies, no browser storage, no transaction broadcast, no production authority, and no user data wanted.
