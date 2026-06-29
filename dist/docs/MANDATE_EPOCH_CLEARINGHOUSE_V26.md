# MandateEpoch Clearinghouse v26

The MandateEpoch Clearinghouse is a browser-local public demonstration of proof-settlement at scale.

It teaches a simple GoalOS/AGI ALPHA rule:

> One mandate can clear many proof receipts through one human-reviewed settlement boundary.

The page demonstrates sponsor mandate, Paymaster-style budget envelope, NettingHouse-style receipt batching, Alpha-Factory-style work swarm, ProofBundle export, challenge window, AGIJobManager-compatible checkpoint, and Chronicle handoff.

## Public safety boundary

The page has no account, no form tag, no cookies, no analytics, no localStorage, no sessionStorage, no wallet connection, no network request, no token route, no transaction broadcast, and no production authority.

## Protocol objects

The page emits a public-safe `MandateEpochReceipt` containing `receiptRoot`, `payoutRoot`, `archiveDeltaRoot`, `quarantineRoot`, acceptance counts, quarantine counts, dispute counts, alpha-work-unit estimates, and a claim boundary.

## Claim boundary

The demo is not a live settlement event, not an on-chain transaction, not a wallet instruction, not an offer, not token availability, not factual certification, and not production authority.
