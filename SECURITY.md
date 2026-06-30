# Security Policy

GoalOS AGIJobManager Ascension is a public-safe static website and repository. Public demos are designed to run locally in the browser with no account, no form, no analytics, no cookies, no browser storage, no public wallet connection, no token approval, no network switching, no transaction broadcast, no funds moved, and no production authority.

## Supported branch

Security review focuses on the `main` branch and the generated GitHub Pages production URL. Historical release artifacts are preserved for provenance but are not the primary support target.

## Report a security issue

Open a GitHub security advisory or contact the maintainers through the repository owner channels. Do not put secrets, seed phrases, private keys, customer data, personal data, wallet signatures, RPC credentials, unreleased vulnerabilities, or confidential traces in public issues.

## In scope

- Public pages that unexpectedly collect data or use storage.
- Public demos that unexpectedly call a wallet, request a network switch, approve tokens, or broadcast transactions.
- Missing claim boundaries around expert-only or Mainnet-facing pages.
- XSS, unsafe links, dependency or supply-chain regressions, and broken GitHub Pages workflows.
- Documentation that asks users to disclose secrets or regulated data.

## Out of scope

- Third-party wallets, exchanges, RPC providers, browsers, marketplaces, or user machines.
- Financial, tax, legal, securities, sanctions, market, custody, or investment outcomes.
- External factual correctness, external audit completion, or production certification claims.

## Expert surfaces

Expert console pages, if present, must remain separated from public-safe demos and must require deliberate human authority for any real wallet or Mainnet operation. Public pages must remain default-deny.
