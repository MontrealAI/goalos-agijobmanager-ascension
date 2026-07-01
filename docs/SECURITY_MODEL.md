# Security Model

The public site is static, dependency-zero at publish time, and public-safe by default. The principal security control is removal of public authority: no wallet calls, no user-data collection, no submitted forms, no cookies, no analytics, and no external demo calls.

Static checkers scan routes, metadata, claims, workflow references, and public-safe invariants before publication.
