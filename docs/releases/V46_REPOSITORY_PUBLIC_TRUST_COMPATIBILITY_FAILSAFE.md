# v46 Repository Public Trust Compatibility Failsafe

v46 corrects the release-family failure in which an older compatibility kernel expected the generated build manifest to advertise v42 while the current public-trust publisher emitted a newer release name.

## Fixes

- Build manifest now advertises a v42/v43/v44/v45/v46 compatibility family.
- The v42 institutional finalization kernel now checks the full release family, not only one release string.
- The workflow no longer hard-calls individual test files.
- The workflow harmonizes `dist/build-manifest.json` after build and before post-build kernels.
- Dynamic test and kernel runners include v46 while preserving historical compatibility.
- Public-safe boundaries remain unchanged.

## Public-safe boundaries

No public page connects a wallet, approves tokens, switches networks, broadcasts transactions, moves funds, stores user data, uses analytics, uses cookies, or grants production authority.
