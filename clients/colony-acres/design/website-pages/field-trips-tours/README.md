# Colony Acres — Field Trips & Tours (WordPress/Divi Hybrid page)

Fifth Crowd7 **website-hybrid** page — same pattern as `special-events/`, `home/`, `party-in-the-maze/`,
and `things-to-do/`: the live WordPress/Divi page holds only a thin loader; the real content lives here
and updates by `git push`.

## How it works
- **Loader snippet** — lives in the PRIVATE `crowd7` repo (Crowd7 IP, never in this public repo):
  `crowd7/data/clients/colony-acres/design/website-loaders/field-trips-tours.wordpress-embed-loader.html`.
  Paste ONCE into a Divi Code module / WordPress Custom HTML block on the "Field Trips & Tours" page
  (`colonyacres.farm/field-trips-tours/`, WP page-id 16648). It `fetch`es the guts and injects them inline.
  Never needs editing again.
- **`production/field-trips-tours.html`** — the live guts (content block only, no `<html>` wrapper).
  **Not yet pasted into WordPress — building this does not make it live.** See WS4 in the project state.
- **`preview/field-trips-tours.html`** — staging guts. Load the page with `?preview=1` to see these.
- **`*.preview.html`** — standalone browser preview (`open` it) to eyeball without the Divi chrome.
- Loader is Cloudflare-native from the start (`assets.crowd7digital.us`) — no jsDelivr/raw.githubusercontent.com
  migration needed later, unlike the first four pages (see `TS-CDN-MIGRATION.md`-style follow-up note in the
  project state.md).

## Content provenance (2026-08-05, WS8)
- Source capture: `projects/colony-wp-hybrid-loader/artifacts/field-trips-tours.source-capture.html` (Mat's
  browser download, staged since the drainer can't reach `~/Downloads`). Carved per the Option B trim —
  breadcrumb section and theme header/footer stripped, page-builder content only (`et_pb_section_1` +
  `et_pb_section_2`, WP page-id 16648).
- CSS ported from the REAL live Divi generated stylesheet (WS7-proven method: `python3 urllib` with a
  browser `User-Agent` + `Referer` header, no interactive-approval gate, no SANDBOX-OFF needed) —
  `https://colonyacres.farm/wp-content/et-cache/16648/et-core-unified-tb-664-tb-666-deferred-16648.min.css`.
  Column layout (float + width% + gutter) is ported from Divi's own base theme CSS for a plain
  `.et_pb_gutters2` row (no `et_pb_equal_columns` class on this row, so it's float-based, not flexbox).
- Katie's ask (Slack `#crowd7-colony-acres`, 2026-08-03 13:47): link the new group-tour reservation page
  (`https://colonyacres.ticketspice.com/colony-acres-group-tour-reservation-2026`) into this page. Verified
  the page's one existing `ticketspice.com` reference (a general-admission link in the theme footer nav) is
  unrelated — no duplicate/contradicting link risk.
- **Three CTA placements** (2 requested + 1 natural extra, not sprayed):
  1. Inside the brown box (`.et_pb_text_1`, real ported bg `#472426` — this IS Katie's "brown box").
  2. At the bottom of the main body text (`.et_pb_text_4`, after the reservation-payment paragraph).
  3. The `id="tickets"` section (`et_pb_section_2`) was captured completely empty in the live page — a
     natural standalone CTA block, not a duplicate of anything. Its column class `et_pb_column_empty` was
     removed since it's no longer empty (that class is `display:none` at ≤980px in Divi's real CSS — leaving
     it would have hidden the new CTA on tablet/mobile).

## Edit loop (autonomous — no WordPress editor, once installed)
1. Edit `preview/field-trips-tours.html`; `open preview/field-trips-tours.preview.html` to check.
2. Promote: `cp preview/field-trips-tours.html production/field-trips-tours.html` (+ rebuild
   `production/field-trips-tours.preview.html`).
3. `git push` — Cloudflare Pages builds atomically, no purge step, live within ~30-90s.

## Live URLs (Cloudflare Pages)
- production: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/field-trips-tours/production/field-trips-tours.html
- preview: https://assets.crowd7digital.us/clients/colony-acres/design/website-pages/field-trips-tours/preview/field-trips-tours.html
