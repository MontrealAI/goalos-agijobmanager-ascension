# GoalOS AGIJobManager Ascension Flight Deck v31 Report

## Summary

This release fixes the workflow fragility shown in earlier runs by removing hardcoded test sequencing from the publisher and replacing it with dynamic test discovery. It also adds a new browser-local guided launch page: **Ascension Flight Deck**.

## Corrections

- fixed fragile workflow sequencing with `tools/run-all-tests.mjs`
- retained dependency-zero, vendored-only publisher posture
- preserved public-safe boundaries: no wallet, no forms, no analytics, no user data wanted
- added a new user-friendly guided demo launcher with same-origin preview and JourneyReceipt export

## New page

- `ascension-flight-deck.html`

## New files

- `data/ascension-flight-deck-demo.json`
- `schemas/ascension-flight-deck.schema.json`
- `site/assets/ascension-flight-deck.css`
- `site/assets/ascension-flight-deck.js`
- `tests/ascension-flight-deck.test.mjs`
- `tools/ascension-flight-deck-kernel.mjs`
- `tools/run-all-tests.mjs`

## Result

The publisher becomes more resilient, more maintainable, and less likely to fail when demonstrations are added incrementally.
