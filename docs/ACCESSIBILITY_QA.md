# Accessibility and Public Trust QA

The website must be readable, keyboard-navigable, route-discoverable, and useful before JavaScript enhancement.

## Current public-trust standard

- Canonical route count comes from `data/canonical-route-manifest.json`.
- No flagship page should show `Loading…`, `0 routes`, or an empty primary state as the main content.
- Every flagship route should have title, description, canonical URL, OpenGraph metadata, Twitter Card metadata, and a visible next path.
- Navigation uses one native header plus one floating Site Command, not stacked menus.

## Manual QA checklist

- Keyboard can reach primary calls to action, route search, and copy/download buttons.
- Focus state is visible.
- Text remains legible at mobile widths without horizontal scroll.
- Reduced-motion users can still use the page.
- Public/private proof boundary is clear.
- No page asks for private keys, seed phrases, wallet signatures, personal data, customer data, confidential workpapers, or regulated information.

## Automated checks

```bash
node tools/accessibility-static-checker.mjs
node tools/metadata-integrity-checker.mjs
node tools/public-safe-static-checker.mjs
```
