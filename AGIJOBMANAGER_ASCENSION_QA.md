# AGIJobManager Ascension QA

Status: PASS when `npm run test:final` completes.

v11 gates:

- Public/default-deny surfaces exclude wallet and transaction primitives.
- Expert Console contains explicit wallet, Mainnet, exact approval, simulation, gas estimate, typed confirmation, and wallet-signature gates.
- Sovereign Machine Economy route covers META-AGENTIC α-AGI, AGI Alpha Node v0, AGI Jobs v0 (v2), and AGIJobManager.
- Final Assurance Kernel emits `FINAL_ASSURANCE_DOCKET_V11.json` and `FINAL_ASSURANCE_DOCKET_V11.md`.
- Live Mainnet factual check runs in GitHub Actions unless disabled intentionally.


## v13 AGIALPHA Token Market Boundary

PASS-ready gate: official token checksum address `0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA` is present in canonical data, public legal pages, token-boundary policy, docs, and verification output. The site states AGIALPHA is not available from MontrealAI or this website, and that all third-party market/wallet/tax/securities/sanctions/privacy/jurisdictional obligations remain with users/operators.

## Dependency-Zero Final Publisher v14

Status: PASS locally.

- No `npm install` or `npm ci` is used in the production workflow.
- No lockfile is required or retained.
- Vendored `site/vendor/ethers.umd.min.js` supports the separated Expert Console.
- Public pages remain data-zero and do not contain wallet or broadcast primitives.
- Expert Console retains explicit, user-gated Mainnet operations.
- AGIALPHA token boundary remains checksum-addressed and not available from MontrealAI or this website.
