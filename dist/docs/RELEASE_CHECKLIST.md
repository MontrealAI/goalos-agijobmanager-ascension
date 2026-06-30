# Release Checklist

[Docs index](README.md)

Use this checklist before publishing a documentation, route, or data-contract change.

## Build and route checks

- [ ] All pages build with `python3 tools/build.py`.
- [ ] Route catalog is current in the relevant `data/site-navigation*.json` files.
- [ ] No menu stacking or duplicate global header was introduced.
- [ ] Existing demos and pages were preserved unless a route was demonstrably broken and repaired.
- [ ] `production-url.json` resolves to the production URL after publication.

## Documentation checks

- [ ] README front door is current.
- [ ] Demo catalog is current.
- [ ] Docs links pass with `node tools/docs-link-checker.mjs`.
- [ ] Documentation assertions pass with `node tests/documentation.test.mjs`.
- [ ] Release notes were updated when the change is release-visible.

## Boundary checks

- [ ] No unsupported claims were introduced.
- [ ] No achieved AGI/ASI/SOTA/audit/certification claim was introduced.
- [ ] No wallet connection, token approval, network switching, or transaction broadcasting was introduced on public pages.
- [ ] No analytics, cookies, forms, localStorage dependency, or sessionStorage dependency was introduced.
- [ ] No user data, customer data, private key, seed phrase, personal data, or secret is requested.
- [ ] AGIALPHA boundary language remains: identity reference only, no offer, sale, distribution, custody, brokerage, recommendation, or availability from the site.
- [ ] Legal, privacy, data-zero, and third-party responsibility boundaries are preserved.

## Evidence checks

- [ ] Data contracts are present for changed demos when applicable.
- [ ] JSON schemas are present for changed proof objects when applicable.
- [ ] Tests cover new data/schema/route behavior when applicable.
- [ ] Rollback path is understood before publication.
