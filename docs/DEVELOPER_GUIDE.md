# Developer Guide

This repository is dependency-zero for publishing. Use the committed tools and dynamic runners instead of hard-coding version-specific historical tests.

## Local commands

```bash
npm test
npm run build
node tools/route-manifest-integrity.mjs
```

## Adding a demo

1. Add `site/<route>.html` and local assets.
2. Add public-safe sample data under `data/`.
3. Add a schema under `schemas/` when the output object is structured.
4. Add the route to `data/canonical-route-manifest.json` and any audience catalog.
5. Add docs and a dependency-zero test.
6. Run `npm test` and `npm run build`.

Never add wallet connection, analytics, cookies, submitted forms, external demo calls, or unsupported capability claims.
