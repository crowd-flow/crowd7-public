# Colony Acres — Special Events (WordPress/Divi Hybrid page)

First Crowd7 **website-hybrid** page — same pattern as the Arch Webflow hybrid + the TicketSpice hybrid loader:
the live WordPress/Divi page holds only a thin loader; the real content lives here and updates by `git push`.

## How it works
- **`wordpress-embed-loader.html`** — paste ONCE into a Divi Code module / WordPress Custom HTML block on the
  Special Events page. It `fetch`es the guts and injects them inline. Never needs editing again.
- **`production/special-events.html`** — the live guts (content block only, no `<html>` wrapper).
- **`preview/special-events.html`** — staging guts. Load the page with `?preview=1` to see these.
- **`*.preview.html`** — standalone browser preview (`open` it) to eyeball without the Divi chrome.
- **`assets/`** — repo-hosted images for this page (current images point at the Webconnex CDN and work as-is).

## Edit loop (autonomous — no WordPress editor)
1. Edit `preview/special-events.html`; `open preview/special-events.preview.html` to check.
2. Promote: `cp preview/special-events.html production/special-events.html`
3. `git push` — live within ~5 min (raw.githubusercontent CDN).

## Raw URLs
- production: https://raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/colony-acres/design/website-pages/special-events/production/special-events.html
- preview: https://raw.githubusercontent.com/crowd-flow/crowd7-public/master/clients/colony-acres/design/website-pages/special-events/preview/special-events.html
