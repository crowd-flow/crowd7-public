# 🍎 TicketSpice Build Brief — Eckert's Grafton (IL) Apple Swap

**Page:** `grafton-farm-field-access-2026` (existing Grafton Field Access page — will be running **peaches** when this swap is needed)
**Goal:** Swap the live peach content → apple content for pick-your-own apples (peach→apple transition).
**Go-live:** **TBD** — when Grafton flips peach→apple. ⚠️ **Transition date pending Amanda** (not in the 6/5 brief).
**Source of locked specs:** 6/5 Amanda call — `work/crowd7/meetings/2026/6.5.26.Crowd7EckertsCheckIn.transcript.md` (crop sequence + standardized field-access pricing confirmed there; apple-specific transition date NOT yet captured).

This is a **content swap**, not a new page. The page already exists; by the time apples come in it'll be running the peach build. Grafton is a **PYO-only** location — no playground, no Mega Slide, no Fun Pass. The page sells the **two standardized field-access tickets only** (weekday / weekend), unchanged across all crops. So the apple swap is the simplest of the Eckert's pages: replace the peach HTML block with the apple HTML block. **No ticket renames, no repricing.**

## 0. Before you start

Staged artifacts (pre-built 2026-06-09, Crowdly):

- **Snippet (paste into TS HTML editor):** `data/clients/eckerts/design/ticketspice-pages/grafton/apples/grafton-farm-field-access-2026.apple-content.html`
- **Preview (open in browser first):** `…/grafton-farm-field-access-2026.apple-content-preview.html`
- Rollback point: the live peach build remains at `grafton/peaches/`.

⚠️ **TWO GAPS must close before publish** (see Open Items):
1. **Apple imagery** — hero + gallery point at `longinow-assets/eckerts-apples/*` which is not yet pushed. Without it, images render broken (gradient fallback shows). Filenames match the Versailles apple build, so one Creative Director push resolves both pages.
2. **Apple transition date** — the page carries an "Apple Season" placeholder in the hero eyebrow + an "Apple Season Is Here" Opening Day card with no hard date. Drop the confirmed apple open date into both spots at publish. (Date gates the publish trigger, not the HTML — the page is paste-ready the moment imagery lands; the date is a copy polish.)

## 1. Page basics

- Keep the page slug / URL unchanged (`grafton-farm-field-access-2026`).
- **Page description / HTML block:** replace the peach content block with the `apple-content.html` snippet (full chunk — paste over the existing block).

## 2. Ticket types — NO CHANGES

Grafton sells **two** ticket products, both **unchanged from peach/blackberry season** (standardized field-access pricing). There is **no Fun Pass** at Grafton.

| Ticket | Action | Online | At gate | Notes |
|---|---|---|---|---|
| **Pick-Your-Own Field Access (Weekday Ticket)** | Keep visible, no change | $3 | $6 | Tue–Fri. Per person, ages 2 & up. |
| **Pick-Your-Own Field Access (Weekend Ticket)** | Keep visible, no change | $5 | $8 | Sat–Sun. Per person, ages 2 & up. |

No ticket renames. No repricing. The field-access products carry over from the peach build verbatim.

## 3. Conditional Actions / date rules

- Both tickets valid/visible through apple season. No date logic hard-coded in the HTML — date rules live in TS ticket config.
- The slash-through pricing script keys on ticket **name** (the two field-access names above) — unchanged from peach. If you rename any ticket, update the `GATE` map at the bottom of the snippet to match.

## 4. Hours + last-wagon note

Unchanged from peach build:

- **Open Tue – Sun · 9 AM – 5 PM.** **Last wagon out 4:30 PM.**

## 5. Merch

- **NONE** for Grafton. Do not add any merch products.

## 6. Imagery ⚠️

- The apple snippet points hero `background-image` + all gallery `<img>` URLs at `https://raw.githubusercontent.com/Mat-Longinow/longinow-assets/master/eckerts-apples/` (filenames: `apple-hero.jpg`, `apple-baby.jpg`, `apple-tree-basket.jpg`, `apples-family.jpg`, `apples-kids.jpg`, `apples-mom-and-daughter.jpg`).
- **That folder does not exist yet.** Creative Director must source + push the apple set to `longinow-assets/eckerts-apples/` before publish. The moment those files land at those names, the page resolves with no HTML edit. (Same set the Versailles apple page uses — one push covers both.)
- Gallery cards are duplicated for the marquee loop — if you change a filename, update **both** copies.

## 7. Pre-publish checklist

- [ ] Apple HTML snippet pasted, renders correctly in TS preview
- [ ] **PYO Field Access (Weekday Ticket)** visible, $3 (gate $6) — no change
- [ ] **PYO Field Access (Weekend Ticket)** visible, $5 (gate $8) — no change
- [ ] `GATE` map in snippet matches the final ticket names
- [ ] Apple hero + gallery imagery pushed to `longinow-assets/eckerts-apples/` and resolving
- [ ] Apple open date dropped into hero eyebrow + Opening Day card (replacing "Apple Season" placeholder)
- [ ] Hours show Tue–Sun 9 AM–5 PM, **last wagon 4:30 PM**
- [ ] No merch products
- [ ] Crop-updates link points to `eckerts.com/crop-updates/`

## 8. Open Items (for Mat / Amanda)

1. **Apple transition date** — when does Grafton flip peach→apple? (Needs Amanda; not in the 6/5 brief.) Gates the publish trigger + the copy polish (hero eyebrow + Opening Day card).
2. **Apple imagery** — Creative Director to source + push the apple hero + gallery set to `longinow-assets/eckerts-apples/` (shared with Versailles apple page).

## 9. Mobile

Layout is identical to the peach build (same `#sbv-funnel` CSS + breakpoints at 1000 / 860 / 560px). Mobile audit inherits the peach build's pass — no per-crop mobile work needed. See `artifacts/mobile-audit.md` in the project folder.
