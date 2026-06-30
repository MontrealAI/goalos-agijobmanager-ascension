# Demo Catalog

| Route | User type | Purpose | Inputs | Output artifact | Safety posture | Related data file | Related schema file | Evidence status |
|---|---|---|---|---|---|---|---|---|
| `/experience-concierge.html` | New visitor | Guided site path | Click choices | Route plan | Public-safe | `data/site-navigation-v42.json` | `schemas/site-navigation-v42.schema.json` | Demonstration |
| `/trust-equation-simulator.html` | Reviewer | Proof law | Sample factors | Trust receipt | Public-safe | `data/trust-equation-simulator-demo.json` | `schemas/trust-equation-simulator.schema.json` | Demonstration |
| `/evidence-docket-composer.html` | Operator | Evidence room | Public-safe claim | Evidence Docket | Public-safe | `data/evidence-docket-composer-demo.json` | `schemas/evidence-docket-composer.schema.json` | Demonstration |
| `/proof-settlement-lifecycle.html` | Developer | Settlement rail | Sample request | SettlementReceipt / Chronicle | Public-safe simulation | `data/proof-settlement-lifecycle-demo.json` | `schemas/proof-settlement-lifecycle.schema.json` | Demonstration |
| `/expert-mainnet-console.html` | Expert | Human-directed Mainnet console | Expert-only operator inputs | Wallet-signed state if used | Expert-only separated surface | `data/mainnet-capability-contract.json` | `schemas/mainnet-capability-contract.schema.json` | Boundary-gated |

For the complete source route list, run `find site -maxdepth 1 -name "*.html" -printf "%f\n" | sort`.


## Shared boundary

Public demos are browser-local and public-safe: no user data wanted, no forms, no analytics, no cookies, no localStorage/sessionStorage, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, and no production authority. This material is not legal, financial, investment, tax, medical, audit, safety-certification, or professional advice. It does not claim achieved AGI, achieved ASI, empirical SOTA, external audit completed, production certified, safe autonomy proven, guaranteed return, or investment opportunity.
