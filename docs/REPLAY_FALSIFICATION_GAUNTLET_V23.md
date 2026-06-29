# Replay & Falsification Gauntlet v23

## Purpose

The Replay & Falsification Gauntlet is a browser-local public demonstration of a core GoalOS idea:

> A proof claim advances only when it can be replayed, challenged, compared with baselines, bounded by public/private proof rules, and handed to human review.

It is not a factual certification, legal opinion, audit completion claim, investment communication, Mainnet transaction, or production authorization.

## User experience

A visitor can:

1. choose a public-safe claim preset;
2. tune trace completeness, baseline strength, replay readiness, validator independence, cost/risk accounting, and public/private boundary;
3. run a replay gauntlet;
4. run adversarial falsification probes;
5. inspect the baseline ladder, replay findings, falsification result, Chronicle trace, and protocol objects;
6. download a public-safe `ReplayReceipt` JSON.

## Protocol objects surfaced

- `GoalOSCommit`
- `RunCommitment`
- `ProofPacket`
- `EvalAttestation`
- `SelectionCertificate`
- `ReplayReceipt`
- `FalsificationReport`
- `ChronicleEntry`

## Public-safety boundary

The page uses no account, no form tag, no cookies, no analytics, no `localStorage`, no `sessionStorage`, no wallet connection, no network request, no token route, no transaction broadcast, and no production authority.

Users are instructed not to enter personal, confidential, regulated, customer, wallet, seed phrase, private-key, or proprietary information.

## Why this page matters

Earlier demos show objective-to-proof, Selection Gate discipline, Chronicle compounding, inflow control, and claim-boundary filtering. v23 adds the next public proof layer: replay and falsification. It shows that the next proof is not another claim; it is a replay people can challenge.
