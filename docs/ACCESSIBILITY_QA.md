# Accessibility and Public Trust QA

The website is a public proof institution. It must be readable, navigable, and reviewable even before JavaScript enhances the page.

## Current public-trust standard

- Canonical route count: **50 routes** from `data/canonical-route-manifest-v43.json`.
- No shipped page should show `Loading…`, `0 routes`, `0 matching pages`, or dash-only route counts as its primary static content.
- Every public route should have a title, description, canonical URL, OpenGraph metadata, Twitter Card metadata, and a visible user path.
- Navigation should use one native header plus one floating Site Command, not stacked menus.

## Manual QA checklist

- Keyboard can reach the primary call to action.
- Focus state is visible.
- Text remains legible at mobile widths.
- Reduced-motion users can still use the page.
- Page title and meta description explain the route.
- Public/private proof boundary is clear.
- No page asks for private keys, seed phrases, wallet signatures, personal data, customer data, confidential workpapers, or regulated information.

## Automated checks

Run:

```bash
node tools/public-trust-checker-v43.mjs
```

The checker validates route metadata, exact homepage route count, canonical URLs, social preview tags, and the absence of blank/loading fallback states across the canonical public route manifest.
