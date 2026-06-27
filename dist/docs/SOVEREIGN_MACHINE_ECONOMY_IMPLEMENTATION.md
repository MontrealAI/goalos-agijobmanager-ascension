# GoalOS AGIALPHA Ascension — Sovereign Machine Economy

This document records how the AGIJobManager Ascension repository covers the previous initial iteration of META-AGENTIC α‑AGI × AGI Alpha Node v0 × AGI Jobs v0 (v2) inside the existing repository rather than creating a new repository.

## Scope

The implementation adds a Sovereign Machine Economy route, local proof-flight console, capability contract, schema, source module, verification tests, and publisher workflow.

## System mapping

| Surface | Role | Repository implementation |
|---|---|---|
| META-AGENTIC α‑AGI | Institution foundry | `site/sovereign-machine-economy.html`, `src/sovereign/sovereign-machine-economy.mjs` |
| AGI Alpha Node v0 | Deterministic proof flight | `site/assets/sovereign-economy.js` |
| AGI Jobs v0 (v2) | Work OS / proof parliament | `data/sovereign-machine-economy-capability-contract.json` |
| AGIJobManager | Settlement rail | `site/expert-console.html`, `data/agijobmanager-expert-action-catalog.json` |

## Boundary

Public pages remain local and default-deny. Expert Mainnet operations are intentionally separated and require wallet action, exact approval, preflight simulation, gas estimation, typed authority confirmation, and wallet confirmation.

## Canonical identities

- AGIJobManager: `0xB3AAeb69b630f0299791679c063d68d6687481d1`
- AGIALPHA: `0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA`
- Production URL: `https://montrealai.github.io/goalos-agijobmanager-ascension/`
