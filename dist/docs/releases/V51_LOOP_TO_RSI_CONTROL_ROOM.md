# V51 — Loop → RSI Control Room

V51 adds `/loop-to-rsi-control-room.html`, a refined public demonstration of the transition from long-running agent loops to deterministic RSI governance.

## Added

- `site/loop-to-rsi-control-room.html`
- `site/assets/loop-to-rsi-control-room.css`
- `site/assets/loop-to-rsi-control-room.js`
- `data/loop-to-rsi-control-room-demo.json`
- `schemas/loop-to-rsi-control-room.schema.json`
- `tests/loop-to-rsi-control-room.test.mjs`
- `tools/loop-to-rsi-control-room-v51-kernel.mjs`
- `tools/public-trust-checker-v51.mjs`
- `tools/release-compatibility-harmonizer-v51.mjs`
- `tools/failsafe-bootstrap-v51.mjs`

## User-facing improvements

- Adds a clearer, more interactive RSI control room.
- Makes the loop-to-RSI path prominent in the homepage, Experience Hub, and Command Center.
- Updates canonical route count to 56.
- Keeps all public pages public-safe and no-wallet.

## Boundary preserved

No public wallet connection, no token approval, no network request, no user data collection, no browser storage, no forms, no analytics, and no production authority.
