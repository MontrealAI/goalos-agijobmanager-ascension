# Security and Privacy Boundary

[Docs index](README.md)

The public site is designed as a public-safe, browser-local demonstration surface. It should be safe to review without providing secrets, personal information, customer data, wallet credentials, or transaction authority.

## Public-safe commitments

- No user data wanted.
- No forms for collecting personal data.
- No analytics.
- No cookies.
- No localStorage or sessionStorage requirement for public demos.
- No public wallet calls.
- No public token approvals.
- No network switching.
- No transaction broadcasting.
- No funds moved.
- No external action from public pages.
- No production authority from public demos.

## Public/private proof boundary

| Public proof surface | Private intelligence boundary |
| --- | --- |
| Commitment hashes | Private prompts |
| Evidence Docket summaries | Raw execution traces |
| Attestations | Customer data |
| Selection and settlement receipts | Confidential workpapers |
| Claim boundaries | Private evaluator notes |

Private material should be converted into hashes, commitments, summaries, or redacted attestations before it appears in public pages or public docs.

## Reviewer checklist

Before merging a public-route change, verify that it does not add forms, analytics, cookies, localStorage/sessionStorage dependency, wallet connection prompts, token approvals, network switching, transaction broadcasting, private-key handling, seed-phrase handling, or production authority language.

## Reporting security issues

Use the process in [`../SECURITY.md`](../SECURITY.md). Do not include secrets, private keys, seed phrases, customer data, personal data, or exploitable details in public issues.
