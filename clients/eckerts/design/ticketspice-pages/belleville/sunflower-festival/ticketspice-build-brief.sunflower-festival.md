# 🌻 Eckert Sunflower Festival (Belleville) — TicketSpice Build Brief

**Page:** Eckert Sunflower Festival — standalone rebranded event (NOT on the field-access page)
**ClickUp:** `86ajbznww` (client ws `90132445704`) · fleet twin `86baqvpeh`
**Built by:** Crowdly · 2026-07-02 · **Revised 2026-07-09** — pricing/package structure reconciled to Amanda's 7/8 Slack spec (supersedes the 7/2-call package set below)
**Design system:** standalone `#sf-funnel` sunflower-gold sub-brand (forked from the Belleville field-access page look/feel; its own festival identity per the 6/5 brand-elevation decision)
**Live-by:** review-ready **7/14** · Flash sale **7/24–26** (Amanda's 7/9 window, confirmed feasible by Mat) · Festival opens **~7/25**, runs ~3 weekends thru **~8/8–9** (tentative)

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, rules, Actions) — the part the hybrid loader does NOT own. The page content/design (hero, benefits band, gallery, ticket-card copy) ships from the repo via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

Ticket structure + pricing are per **Amanda's 7/8/26 Slack message** in `#crowd7-and-eckerts-farm` (GA / Flower Power Pass / Family & Friends), which supersedes the 7/2-call package set (GA / Admission+Sip / Ultimate Experience). Two values are still open and are tagged in-page — confirm before publish:

1. **Flash-sale prices** — no flash discount amount has been set for the new package set yet (the old $8.95/$14.95 rec was for the retired GA/Admission+Sip structure). Needs a fresh number + sign-off via **Jill / Angie** before the **7/24** flash window opens.
2. **Exact flash cutover times + whether the "Cut-Your-Own Sunflower Bouquet" onsite item needs any online mention** — Amanda's spec marks that bouquet ($15, 3 sunflowers + 12 zinnias, plastic vase) as **onsite-purchase only**; it's shown on the page as an FYI add-on row, not wired as a TS checkout item. Confirm Eckert's wants it mentioned at all, or drop the row.

Also pending (do not block the cart config): **real sunflower photos** (Amanda → Dropbox; page ships with clearly-tagged placeholders until then), **exact festival open date** (sunflowers not yet planted — "~July 25" is still tentative), and **exact festival hours** (sunset slots planned — page shows "TBD" until locked).

## 🎫 Native TicketSpice ticket types

Configure these in the TS cart (`#ticketBlock`). GA is **per person**; Family & Friends is a **4-pack bundle** ticket type. Source: Amanda's 7/8/26 Slack message.

| Ticket type | Online price | Gate price | Includes | Flash (7/24–26) |
|---|---|---|---|---|
| **General Admission** | **$12.99** | **$18.00** | General admission for one · 1 cut-your-own sunflower | TBD *(pending sign-off)* |
| **Flower Power Pass** | **$19.99** | **$25.00** | General admission for one · 1 cut-your-own sunflower · 1 souvenir mason jar lemonade (boozy or non-alcoholic) · 1 flower crown | TBD *(pending sign-off)* |
| **Family & Friends Package** | **$74.99** | **$80.00** | General admission for four · 4 cut-your-own sunflowers · 4 souvenir mason jar lemonades (boozy or non-alcoholic) · 2 flower crowns · 2 pairs flower sunglasses | TBD *(pending sign-off)* |
| **Sunshine Picnic Basket** *(add-on)* | **$18** | — | Eckert's half-peck box: 2 deli ham & cheese sliders, kettle chips, brownie bites, fresh mixed fruit, cheese cubes, gummy bears | — |
| **Extra Flower Crown** *(add-on)* | **$4** | — | Additional crown, any ticket | — |
| **Flower Sunglasses** *(add-on)* | **$4** | — | Any ticket | — |
| **Cut-Your-Own Sunflower Bouquet** *(NOT a TS item — onsite cash/card only)* | **$15** | — | 3 sunflowers + 12 zinnias, plastic vase | — |

**Online-vs-gate slash pricing:** each tier shows a struck gate price next to the online price ($18/$25/$80 struck → $12.99/$19.99/$74.99 online) to drive pre-sale. Use the name-keyed JS + `MutationObserver` + `content: attr(data-gate)` pattern (`~/Desktop/crowd7/data/clients/_patterns/slash-through-pricing.md`) — match each ticket by its `<h4>` name, NOT DOM position.

## 🧩 Cart configuration notes

- **Flash-sale window (7/24–26)** — the flash discount is date-gated per Amanda's 7/9 message (Mat confirmed feasible same day). Use a TS **Action** (date-conditional) to swap all three tiers to flash pricing for the 7/24 00:00 → 7/26 23:59 window, reverting to standard online pricing once flash closes. **Flash price amounts are not yet set** — confirm with Jill/Angie before the window opens; do not publish the Action without real numbers.
- **Sales-open gate** — general public sales open once the flash window closes (~7/27). Confirm exact cutover with Amanda/Bryan.
- **Cut-your-own quantity** — GA/Flower Power Pass include 1 stem; Family & Friends includes 4. If guests can buy extra stems, add an optional per-stem add-on (not currently in Amanda's spec).
- **The lemonade choice** — Flower Power Pass and Family & Friends need a per-ticket **Action/dropdown** for the guest to pick *boozy* vs *non-alcoholic* mason jar lemonade (qty matches the tier: 1 for Flower Power Pass, 4 for Family & Friends). 21+ check on the boozy option (age-gate at pickup, note in confirmation copy).
- **Capacity / hours** — festival dates are still tentative (sunflowers not yet planted; "~July 25" opening, running ~3 weekends thru ~Aug 8–9). If sunset time slots are added, use the `wbx-calendar` date+slot picker restricted to confirmed festival dates once locked. Cap per slot TBD — confirm with Amanda.
- **Merch / souvenir glass** — the mason jar lemonade is served in a souvenir jar; no separate merch ticket needed unless Eckert's wants to sell the jar standalone.
- **Cut-Your-Own Sunflower Bouquet ($15)** — Amanda flagged this as **onsite-purchase only** (cash/card at the field), not a TicketSpice line item. Shown on the page as an informational add-on row with an "Onsite Only" tag — do NOT configure it as a cart item unless Amanda says otherwise.

## 🔌 Hybrid-loader wiring (for Bryan — publish enablement)

This is a **new standalone TicketSpice page** — it does not exist in TS yet. To take it live:

1. **Create the Sunflower Festival event/page in TicketSpice** (Bryan/Amanda) — its own page, separate from the Belleville field-access page.
2. **Paste the canonical hybrid loader** (from `ts-hybrid-loader-runbook.md`) into the new page's Raw HTML block **once**, editing only:
   - `u4` → `'ticketspice-pages/belleville/sunflower-festival/'`
   - `f`  → `'sunflower-festival-belleville-2026-content'`
3. **Promote `preview/` → `production/`** once Amanda's real photos are swapped in + prices are signed off (`cp preview/<file> production/<file> && git push` — the push IS the deploy). Until then the loader would fetch placeholder-flagged content, so **hold promotion until assets land**.

## 📸 Image note

Page currently ships with **clearly-tagged placeholders** — the hero is a sunflower-gold gradient (tagged "sunflower hero photo pending"), the gallery cards read "Photo pending." When Amanda uploads the sunflower set to Dropbox, swap the hero background + the gallery `sf-gcard` cards for real imagery (people in sunflowers / peak-bloom fields) to make the page feel purpose-built. Assets land in-repo at `clients/eckerts/design/assets/sunflower/` and are referenced via `raw.githubusercontent.com/crowd-flow/crowd7-public/master/...` URLs.

## ✅ Three artifacts (this build)

1. **Content HTML** — `sunflower-festival/preview/sunflower-festival-belleville-2026-content.html` (loader fetches this)
2. **Standalone preview** — `sunflower-festival/preview/sunflower-festival-belleville-2026-content-preview.html` (`open` in a browser for Mat/Amanda)
3. **This build brief** — `sunflower-festival/ticketspice-build-brief.sunflower-festival.md`

## 🧱 Open dependencies (gate go-live, not the build)

- **Amanda:** Sunflower photos to Dropbox; flash-price sign-off via Jill/Angie on the new (7/8) package set; confirm the onsite-only bouquet stays on-page or gets dropped.
- **Bryan/Amanda:** create the TS event + paste the loader.
- **Mat:** review the preview by **7/14** (committed to Amanda, Bryan CC'd, 7/9), then promote preview→production once photos + flash price land.
