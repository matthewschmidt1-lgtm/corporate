# Corporate BS Detector

A funny, honest card game about whether a company is built for the customer or for itself.
Real workplace scenarios, a culture type, and specific things to do on Monday.

**Privacy:** it is a static site. Nothing you answer is sent, saved or tracked. See `privacy.html`.
**Method:** `methodology.html` explains the scoring and its limits. It is a conversation tool, not a validated assessment.

## Run it locally

    python3 -m http.server 8000

Then open http://localhost:8000/

## Files

- `index.html` the front door, `play.html` the game, `lessons.html` the field guide
- `scenarios.js` the cards and scoring data, `detector.js` the game engine
- `privacy.html`, `methodology.html`, `404.html`
