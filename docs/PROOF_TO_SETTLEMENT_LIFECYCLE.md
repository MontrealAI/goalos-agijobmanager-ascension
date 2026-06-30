# Proof-to-Settlement Lifecycle

Request → Escrow → Execute → Proof → Validate → Settle → Chronicle.

| Stage | Meaning | Gate |
|---|---|---|
| Request | Define objective and authority. | Clear mission contract. |
| Escrow | Hold settlement boundary before work is trusted. | No public funds movement by demos. |
| Execute | Perform work under constraints. | Browser-local/public-safe in demos. |
| Proof | Produce ProofBundle. | No ProofBundle, no settlement. |
| Validate | Replay/evaluate evidence. | No replay, no settlement. |
| Settle | Record bounded result. | SettlementReceipt only within stated boundary. |
| Chronicle | Preserve memory for reuse. | Claim-bound ChronicleEntry. |

Public-safe boundary: no user data wanted, no forms, no analytics, no cookies, no localStorage/sessionStorage, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, and no production authority from public demos.

