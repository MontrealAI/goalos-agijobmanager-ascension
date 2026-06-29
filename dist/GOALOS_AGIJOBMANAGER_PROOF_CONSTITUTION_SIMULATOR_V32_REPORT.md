# GoalOS AGIJobManager Ascension · Proof Constitution Simulator v32

## Summary

v32 corrects the brittle workflow class shown in the GitHub Actions screenshots and adds a new flagship public demonstration: **Proof Constitution Simulator**.

## Error corrections

- The publisher no longer hard-codes individual demo test files.
- The workflow uses dynamic test discovery through `tools/run-all-tests.mjs`.
- `tools/workflow-reference-auditor.mjs` fails the build if the workflow references a missing local script.
- The release keeps dependency-zero publication: no `npm install`, no `npm ci`, no registry fetch.
- The commit step remains pathspec-proof through `git add -A`.

## New page

`/proof-constitution-simulator.html`

The page lets users run the core GoalOS constitutional law as an interactive browser-local workbench:

- Aim → Act → Prove → Evolve;
- GoalOSCommit → RunCommitment → ProofPacket → SelectionCertificate;
- public/private proof boundary;
- L0-L6 conformance;
- hard gates;
- constitutional verdict;
- exportable ConstitutionReceipt JSON.

## Public safety posture

- no account;
- no form;
- no wallet;
- no analytics;
- no cookies;
- no storage;
- no external network request;
- no user data wanted.

## Verification

Validated locally with:

- repository verifier;
- no-registry preflight;
- pathspec proof kernel;
- workflow reference auditor;
- dynamic test discovery over all tests;
- static build;
- proof constitution kernel;
- Flight Deck kernel;
- Router Observatory kernel.
