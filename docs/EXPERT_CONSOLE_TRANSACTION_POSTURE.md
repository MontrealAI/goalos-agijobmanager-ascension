# Expert Console Transaction Posture

The public site remains read-only by default. Mainnet actions live in `site/expert-console.html` and require all of the following: explicit wallet connection, Ethereum Mainnet chain check, risk/terms acknowledgement, local authority phrase, action review, optional exact $AGIALPHA approval, simulation, gas estimate, and typed `AUTHORIZE MAINNET` confirmation before the wallet is opened for the final transaction.

The console does not store private keys, does not auto-connect, does not ask for unlimited approvals, and does not broadcast without a wallet signature.
