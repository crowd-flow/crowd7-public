# 🌻 Eckert Sunflower Festival (Belleville) — TicketSpice Build Brief

**Page:** Eckert Sunflower Festival — standalone rebranded event (NOT on the field-access page)
**ClickUp:** `86ajbznww` (client ws `90132445704`) · fleet twin `86baqvpeh`
**Built by:** Crowdly · 2026-07-02
**Design system:** standalone `#sf-funnel` sunflower-gold sub-brand (forked from the Belleville field-access page look/feel; its own festival identity per the 6/5 brand-elevation decision)
**Live-by:** **7/23** · Flash sale **7/27–29** · Sales open **Aug 1** · Festival weekend **Aug 1–2**

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, rules, Actions) — the part the hybrid loader does NOT own. The page content/design (hero, benefits band, gallery, ticket-card copy) ships from the repo via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

Ticket structure + dates are **LOCKED from the 7/2/26 Eckert's strategy call** (Matt, Brian, Amanda). Three values are still open and are tagged in-page — confirm before publish:

1. **Admission + Sip final price** — shown at **$15.95**, but the souvenir mason-jar / sunflower-glass cost is not yet priced (Amanda pricing out with Eckert's). That cost *locks* the Admission-Plus price. Confirm before publish.
2. **Flash-sale prices** — GA **$8.95** / Admission+Sip **$14.95** (Matt's rec) still pending sign-off via **Jill / Angie**. Confirm before the 7/27 flash window opens.
3. **Picnic add-on price** — the "Picnic in the Sunflowers" upsell is in the design as an add-on; no price set yet. Confirm and configure as a cart add-on, or drop for launch.

Also pending (do not block the cart config): **real sunflower photos** (Amanda → Dropbox; page ships with clearly-tagged placeholders until then) and **exact festival hours** (sunset slots planned — page shows "TBD" until locked).

## 🎫 Native TicketSpice ticket types

Configure these in the TS cart (`#ticketBlock`). GA is **per person**; the 2-pack / 4-pack are **bundle** ticket types.

| Ticket type | Online price | Gate price | Includes | Flash (7/27–29) |
|---|---|---|---|---|
| **General Admission** | **$10.00** | **$15.00** | Sunflower field access · 1 cut-your-own sunflower · photo scenes & observation deck | **$8.95** |
| **Admission + Sip** | **$15.95** *(pending jar cost)* | — | Everything in GA **+** guest choice of a boozy sip *or* peach lemonade **+** a fresh-baked cookie | **$14.95** *(pending sign-off)* |
| **Ultimate Experience · Couple** | **$44.95** | — | Admission for 2 · 1 sunshine picnic basket · 2 drinks (boozy sip or peach lemonade) · cut-your-own sunflowers | — |
| **Ultimate Experience · Family** | **$89.95** | — | Admission for 4 · family-size (double) sunshine picnic basket · 2 boozy sips + 2 peach lemonades · cut-your-own sunflowers | — |
| **Picnic add-on** | TBD *(confirm)* | — | Curated picnic spread, add-on at checkout · optional "sunflower sweet treats" upsell (cookie + flower crown) | — |

**Online-vs-gate slash pricing:** GA shows a struck **$15 at gate** next to the **$10 online** price to drive pre-sale. Use the name-keyed JS + `MutationObserver` + `content: attr(data-gate)` pattern (`~/Desktop/crowd7/data/clients/_patterns/slash-through-pricing.md`) — match the ticket by its `<h4>` name, NOT DOM position. Struck value = the $15 gate price.

## 🧩 Cart configuration notes

- **Flash-sale window (7/27–29)** — the flash discount is date-gated. Use a TS **Action** (date-conditional) that swaps GA → $8.95 and Admission+Sip → $14.95 for the 7/27 00:00 → 7/29 23:59 window only, then reverts to standard online pricing when general sales open Aug 1. Confirm the exact flash cutover times with Amanda/Bryan.
- **Sales-open gate** — general public sales open **Aug 1**. Decide whether the page is live-but-locked before then (flash-only) or opens fully 7/27. Simplest: flash window 7/27–29, standard pricing from Aug 1; between 7/30–7/31 either close sales or keep standard pricing available (confirm intent).
- **Cut-your-own quantity** — GA includes 1 stem; 2-pack = 2; 4-pack = 4. If guests can buy extra stems, add an optional per-stem add-on.
- **The "Sip" choice** — Admission + Sip needs a per-ticket **Action/dropdown** for the guest to pick *boozy sip* vs *peach lemonade*. 21+ check on the boozy option (age-gate at pickup, note in confirmation copy).
- **Capacity / hours** — festival is Aug 1–2 (2 days). If sunset time slots are added, use the `wbx-calendar` date+slot picker restricted to festival dates. Cap per slot TBD — confirm with Amanda.
- **Merch / souvenir glass** — the "Sip" is served in a souvenir mason jar / sunflower glass; its cost is being priced (see confirm #1). No separate merch ticket needed unless Eckert's wants to sell the glass standalone.

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

- **Amanda:** Sunflower bundle write-up + photos to Dropbox; mason-jar/glass cost; flash-price sign-off via Jill/Angie.
- **Bryan/Amanda:** create the TS event + paste the loader.
- **Mat:** review the preview, then promote preview→production once photos + prices land.
