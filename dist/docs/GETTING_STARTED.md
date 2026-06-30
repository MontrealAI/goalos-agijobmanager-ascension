# Getting Started

## Fastest public-safe path

Open https://montrealai.github.io/goalos-agijobmanager-ascension/ and click **Experience Concierge**. For a full map, use **Command Center**.

## Fastest developer path

```bash
node --version
python3 tools/verify.py
node tools/docs-link-checker.mjs
node tools/claim-boundary-checker.mjs
node tests/documentation.test.mjs
python3 tools/build.py
```

No npm install is required; dependencies are intentionally empty.

Public-safe boundary: no user data wanted, no forms, no analytics, no cookies, no localStorage/sessionStorage, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, and no production authority from public demos.

