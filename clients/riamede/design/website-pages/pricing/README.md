# Riamede Farm — Pricing (Wix Hybrid page)

First Crowd7 **website-hybrid** page on Wix (as opposed to WordPress/Divi or a TicketSpice
page) — same pattern as the Colony Acres WordPress pages and the Arch Webflow hybrid: the live
Wix page holds only a thin loader; the real content lives here and updates by `git push`.

## How it works

- **Loader** — lives in the **private** `crowd7` repo (never here — it's IP):
  `crowd7/data/clients/riamede/design/website-loaders/pricing.wix-custom-code-loader.js`.
  Paste ONCE into Wix Dashboard → Settings → Custom Code → **Body — end**, scoped to the
  Pricing page only. It polls for the Wix platform id `#SITE_PAGES`, hides the original page
  content (never deletes it — full rollback on any fetch failure), and injects the fetched
  guts into a `#c7-riamede-pricing` host div.
- **`production/pricing.html`** — the live guts (content fragment only, no `<html>` wrapper).
- **`preview/pricing.html`** — staging guts. Load the page with `?c7preview=1` to see these
  instead of production.
- **`*.preview.html`** — standalone browser preview (`open` it) to eyeball without Wix chrome.

## Content provenance (2026-08-21)

Extracted from a Wix SSR capture of the live page (`artifacts/pricing.source-capture.html` in
the project folder) — full block inventory at
`work/crowd7/projects/riamede-pricing-wix-loader/artifacts/page-inventory.md`. Pricing pulled
from the **locked 2026 spec** (`crowd7/data/clients/riamede/ticket-types-2026.md`), not the
live page, which is still showing stale 2025 numbers. Generator:
`work/crowd7/projects/riamede-pricing-wix-loader/artifacts/build_pricing.py` (re-runnable).

**Fall Calendar image** rebuilt hybrid (cropped artwork + generated HTML/CSS, not a flat PNG)
— the original was 2025 dates. Generator: `.../artifacts/build_calendar.py`. Assets:
`design/assets/calendar/fall-calendar-lockup.png` + `paper-texture.png`.

**Decisions made without a client sign-off — flagged, not silently resolved:**

1. **BUY TICKETS target.** The live page splits its 4 buttons across a Wix native lightbox
   popup (`data-popupid`, on Weekend + General Admission) and a plain link
   (`https://tickets.riamedefarm.com/admission`, on Season Pass + Weekday). Neither the popup's
   contents nor which link is "current" is recoverable from a static capture. All 4 buttons
   here point uniformly at `https://tickets.riamedefarm.com/admission-2026` — the same URL the
   site's own (Wix-owned, currently-live) header nav "buy tickets" button already uses.
   **Confirm with Bryan/Ashley this is the right landing page before treating this as final.**
2. **Taxes/fees wording carried forward verbatim, contradiction and all** — Weekend/Season
   Pass/Weekday say "Includes taxes and fees"; General Admission says "Does NOT include taxes
   and fees." This is a pre-existing pricing-disclosure bug on the live page, not something
   introduced here. **Needs Ashley/Bryan before this ships live.**
3. **Card restructuring.** The original "WEEKEND ADMISSION" card showed one flat range
   (`$3.50–$8.95` online) that actually blended the weekday price into a weekend range — a
   content bug on the live page. Rebuilt as a 3-tier table matching the locked Fall Fest
   date-tiered spec. The original "GENERAL ADMISSION" card ($8.95/$12.95) is unchanged
   year-over-year per the spec — kept as-is, now labeled to its actual season window
   (Bloomfest, Aug 15–30) instead of floating unlabeled lower on the page.
4. **Calendar provisional dates** (Christmas at the Farm Nov 7–8, festival-day placement) are
   carried forward from the 2025 artwork's pattern, not confirmed on the 2026 Master Calendar
   — see the generator's header comment and project state.md.

## Edit loop (autonomous — no Wix editor, once installed)

1. Edit `artifacts/build_pricing.py` in the project folder (or `preview/pricing.html`
   directly for a one-off tweak); regenerate; `open preview/pricing.preview.html` to check.
2. Promote: `cp preview/pricing.html production/pricing.html` (+ rebuild
   `production/pricing.preview.html`).
3. `git push` — live within seconds (Cloudflare Pages, atomic per-push deploy, no purge step).

## Live URLs (Cloudflare Pages)

- production: https://assets.crowd7digital.us/clients/riamede/design/website-pages/pricing/production/pricing.html
- preview: https://assets.crowd7digital.us/clients/riamede/design/website-pages/pricing/preview/pricing.html
