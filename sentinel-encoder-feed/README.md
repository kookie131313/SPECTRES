# Sentinel Encoder Feed

A matrix-style continuous encoder feed built with React. Displays seven scrolling data channels on an endless loop over an animated glyph rain.

## Channels

- MOTOR / SPEECH - fine motor and articulation exercises
- READING / WRITING - literacy and speech-production practice
- LITERATURE / STYLE - writing trends and style guidance
- WEALTH / LOGIC - personal-finance education (general only) and reasoning drills
- HEALTH / WELL-BEING - gentle health prompts and a 1-10 feelings check-in
- SECURITY / CONTINUITY - data-protection tips
- THREAT SCAN / INJECTION WATCH - malicious-injection watch status

## Design principles

- Identity masked: the display uses only the codename SENTINEL; no personal identifiers appear in the feed or logs.
- Defense in depth: display layer is fully decoupled from any data generation; content is reviewed before rendering.
- Continuous loop: tickers rotate position every cycle so the feed never appears static.

## Usage

`App.tsx` is a self-contained React component. It requires `react` and Tailwind CSS utility classes at build time. Mount the default export in any React application.

## Health and safety notice

Wellness entries are general prompts only and do not constitute medical advice. Consult a qualified professional for health concerns. Wealth entries are general education only and do not constitute investment advice.
