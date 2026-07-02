# Ask GoalOS Sovereign Router v62

Ask GoalOS v62 is the browser-local question router for GoalOS AGIJobManager Ascension. It answers public-site questions from the local route manifest, doctrine cards, and page descriptions, then points visitors to the best proof path.

## What it does

- Answers common public-site questions instantly in the browser.
- Scores the question against route titles, descriptions, output artifacts, boundaries, and intent cards.
- Explains the best next page and shows alternate routes.
- Opens a page only when the user explicitly asks to open, show, route, or go to a page.
- Emits a local `GoalOSQuestionRoutingReceipt` JSON.
- Preserves the public-safe boundary: no account, no form submission, no network request, no wallet, no analytics, no cookies, no browser storage, and no production authority.

## What it is not

- Not a server chatbot.
- Not a live external model call.
- Not a factual-certification engine.
- Not legal, financial, security, tax, investment, regulatory, or audit advice.
- Not a wallet, transaction, token, settlement, or Mainnet execution surface.

## User path

1. User asks a question in the floating widget or `/ask-goalos.html`.
2. The router classifies the question locally.
3. The router returns a short answer, confidence score, recommended pages, and the public-safe boundary.
4. The user chooses a route or asks the router to open it.
5. The user can download a local receipt.

## Technical posture

The implementation is dependency-free and static-site compatible. It reads `window.GOALOS_ASK_DATA`, which is generated from `data/ask-goalos-routing.json`, itself aligned with the canonical route manifest. The page remains compatible with GitHub Pages and the existing default-deny public proof institution.
