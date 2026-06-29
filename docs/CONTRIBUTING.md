# Contributing

[Docs index](README.md)

## Add a demo page

1. Add the page under `site/`.
2. Add browser-local assets under `site/assets/`.
3. Add data contract in `data/`.
4. Add schema in `schemas/`.
5. Add a dependency-free test in `tests/`.
6. Update route/navigation catalogs.
7. Preserve public-safe boundaries: no user-data collection, no public wallet connection, no analytics, no cookies, and no unsupported claims.

## Before opening a PR

Run `npm run docs:check`, `npm run test:docs`, `npm run test`, and `npm run build`.
