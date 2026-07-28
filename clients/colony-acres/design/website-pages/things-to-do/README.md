# Colony Acres — Things To Do / Fun Yard Activities (WordPress/Divi Hybrid page)

Second Crowd7 **website-hybrid** page — same pattern as `special-events/` (first one, 2026-07-09),
the Arch Webflow hybrid, and the TicketSpice hybrid loader: the live WordPress/Divi page holds
only a thin loader; the real content lives here and updates by `git push`.

## How it works
- **`wordpress-embed-loader.html`** — paste ONCE into a Divi Code module / WordPress Custom HTML block on the
  "Fun Yard Activities" page (`colonyacres.farm/plan-your-visit/attractions/`). It `fetch`es the guts and
  injects them inline. Never needs editing again.
- **`production/things-to-do.html`** — the live guts (content block only, no `<html>` wrapper). **Not yet
  promoted from preview — this page has not shipped.**
- **`preview/things-to-do.html`** — staging guts. Load the page with `?preview=1` to see these.
- **`*.preview.html`** — standalone browser preview (`open` it) to eyeball without the Divi chrome.

## Content provenance (2026-07-28)
Captured from the live page via WebFetch (raw HTML/DOM capture was infra-blocked this session — see
`projects/colony-wp-hybrid-loader/state.md` WS1 note). The full activity list and the paintball-removal
note are verbatim from the live page. The intro paragraph is a rewrite — Katie's 7/22 ask was specifically
to "retell the descriptive paragraph" (the live version has a typo and reads as boilerplate).

## Edit loop (autonomous — no WordPress editor, once installed)
1. Edit `preview/things-to-do.html`; `open preview/things-to-do.preview.html` to check.
2. Promote: `cp preview/things-to-do.html production/things-to-do.html` (+ build `production/*.preview.html`)
3. `git push` — live within ~5 min (raw.githubusercontent CDN).

## Raw URLs
- production: https://raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/colony-acres/design/website-pages/things-to-do/production/things-to-do.html
- preview: https://raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/colony-acres/design/website-pages/things-to-do/preview/things-to-do.html
