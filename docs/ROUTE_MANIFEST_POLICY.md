# Route Manifest Policy

The current source of truth is `data/canonical-route-manifest.json`. It contains 60 canonical public routes for v56. Historical manifests remain for traceability and compatibility only.

## Rules

- Every canonical route must exist in `site/`.
- After `npm run build`, every canonical route must exist in `dist/`.
- README and demo catalog route counts must match the canonical manifest or avoid hard-coded counts.
- Compatibility adapters may preserve old release labels, but stale build metadata must not redefine the current route count.

Run `node tools/route-manifest-integrity.mjs`.
