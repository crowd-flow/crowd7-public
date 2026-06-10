# 🍎 TicketSpice Build Brief — Eckert's Versailles (KY) Apple Swap

**Page:** `versailles-farm-field-access-2026` (existing Versailles Field Access page — will be running **peaches** when this swap is needed)
**Goal:** Swap the live peach content → apple content for pick-your-own apples (peach→apple transition).
**Go-live:** **TBD** — when Versailles flips peach→apple. ⚠️ **Transition date pending Amanda** (not in the 6/5 brief).
**Source of locked specs:** 6/5 Amanda call — `work/crowd7/meetings/2026/6.5.26.Crowd7EckertsCheckIn.transcript.md` (crop sequence + standardized field-access pricing confirmed there; apple-specific price/date NOT yet captured).

This is a **content swap**, not a new page. The page already exists; by the time apples come in it'll be running the peach build. The apple swap reverses the crop: replace the peach HTML block with the apple HTML block, and rename the Fun Pass from Peach → Apple. Field-access passes are **unchanged** (standardized across all crops).

## 0. Before you start

Staged artifacts (pre-built 2026-06-09, Crowdly):

- **Snippet (paste into TS HTML editor):** `data/clients/eckerts/design/ticketspice-pages/versailles/apples/versailles-farm-field-access-pass-2026.apple-content.html`
- **Preview (open in browser first):** `…/versailles-farm-field-access-pass-2026.apple-content-preview.html`
- Rollback point: the live peach build remains at `versailles/peaches/`.

⚠️ **TWO GAPS must close before publish** (see Open Items):
1. **Apple imagery** — hero + gallery point at `longinow-assets/eckerts-apples/*` which is not yet pushed. Without it, images render broken (gradient fallback shows).
2. **Apple Fun Pass price/contents** — carried over the peach formula ($16/$20, donut + cider) as a placeholder. Confirm with Amanda.

## 1. Page basics

- Keep the page slug / URL unchanged (`versailles-farm-field-access-2026`).
- **Page description / HTML block:** replace the peach `peach-content.html` block with the `apple-content.html` snippet (full chunk — paste over the existing block).

## 2. Ticket types — RENAME the Fun Pass, keep field access

Versailles apple season sells **three** ticket products. The two field-access passes are **unchanged from peach/strawberry season** (standardized pricing).

| Ticket | Action | Online | At gate | Date rule | Notes |
|---|---|---|---|---|---|
| **Field Access Pass** ("Just Field Access") | Keep visible | $3 | $5 | Valid through apple season | Per person, ages 17 & older. No change. |
| **Field Access PLUS Playground** | Keep visible | $5 (Tue–Fri) / $7 (Sat–Sun) | $8 / $10 | Valid through apple season | Required ages 2–16. Includes playground + Mega Slide (Sat/Sun). No change. |
| **Peach Fun Pass → Apple Fun Pass** | **RENAME + reprice if needed** | **$16** ⚠️ | **$20** ⚠️ | Available at apple open | Rename the live Peach Fun Pass product to **Apple Fun Pass**. Price is the peach placeholder — **CONFIRM apple price + contents w/ Amanda** (see Open Items). |

**Fun Pass swap path:** in the TS ticket-types list, find the live **Peach Fun Pass** product and rename it to **Apple Fun Pass 🍎** (exact name — the slash-through script keys on this `<h4>` text). Update bundle copy + price if Amanda's apple spec differs from the peach formula.

## 3. Conditional Actions / date rules

- All three passes valid/visible through apple season. No date logic hard-coded in the HTML — date rules live in TS ticket config.
- The slash-through pricing script keys on ticket **name** (`Apple Fun Pass 🍎`, `Field Access`, the two Playground combos) — if you rename any ticket, update the `GATE` map at the bottom of the snippet to match.

## 4. Hours + last-wagon note

Unchanged from peach build:

- **Open Tue – Sun.** Farm closes 6 PM. **Last wagon out 5 PM.**
- Field-access weekend hours: Sat & Sun 9 AM–5 PM; Tue–Fri 10 AM–5 PM.

## 5. Merch

- **NONE** for Versailles. Do not add any merch products.

## 6. Imagery ⚠️

- The apple snippet points hero `background-image` + all gallery `<img>` URLs at `https://raw.githubusercontent.com/Mat-Longinow/longinow-assets/master/eckerts-apples/` (filenames: `apple-hero.jpg`, `apple-baby.jpg`, `apple-tree-basket.jpg`, `apples-family.jpg`, `apples-kids.jpg`, `apples-mom-and-daughter.jpg`).
- **That folder does not exist yet.** Creative Director must source + push the apple set to `longinow-assets/eckerts-apples/` before publish. The moment those files land at those names, the page resolves with no HTML edit.
- Gallery cards are duplicated for the marquee loop — if you change a filename, update **both** copies.

## 7. Pre-publish checklist

- [ ] Apple HTML snippet pasted, renders correctly in TS preview
- [ ] **Field Access Pass** visible, $3/$5
- [ ] **Field Access PLUS Playground** visible, $5/$7 (gate $8/$10)
- [ ] **Peach Fun Pass renamed → Apple Fun Pass 🍎**, price confirmed w/ Amanda
- [ ] Apple Fun Pass bundle contents confirmed w/ Amanda
- [ ] `GATE` map in snippet matches the final ticket names + apple price
- [ ] Apple hero + gallery imagery pushed to `longinow-assets/eckerts-apples/` and resolving
- [ ] Hours show Tue–Sun, farm closes 6 PM, **last wagon 5 PM**
- [ ] No merch products
- [ ] Crop-updates link points to `eckerts.com/crop-updates/#versailles-ky-orchard`

## 8. Open Items (for Mat / Amanda)

1. **Apple transition date** — when does Versailles flip peach→apple? (Needs Amanda; not in the 6/5 brief.) Gates the publish trigger, not the HTML.
2. **Apple Fun Pass price + contents** — confirm price (placeholder is $16 online / $20 gate) and bundle: apple quantity + unit (qt? peck? lb?), and whether donut + sweet cider carry over from the peach formula.
3. **Apple imagery** — Creative Director to source + push the apple hero + gallery set to `longinow-assets/eckerts-apples/`.

## 9. Mobile

Layout is identical to the peach build (same `#sbv-funnel` CSS + breakpoints at 1000 / 860 / 560px). Mobile audit inherits the peach build's pass — no per-crop mobile work needed. See `artifacts/mobile-audit.md` in the project folder.
