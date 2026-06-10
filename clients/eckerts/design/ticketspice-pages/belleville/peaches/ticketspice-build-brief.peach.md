# 🍑 TicketSpice Build Brief — Eckert's Belleville (IL) Peach Swap

**Page:** `belleville-farm-field-access-2026` (existing Belleville Field Access page — running **blackberries** for the 6/12 launch; this is the next swap)
**Goal:** Swap the live blackberry content → peach content for pick-your-own peaches (blackberry→peach transition).
**Go-live:** **TBD** — when Belleville flips blackberry→peach. ⚠️ **Transition date pending Amanda** (the 6/5 brief confirmed the crop *sequence* blackberry→peach→apple, not the swap dates).
**Source of locked specs:** 6/5 Amanda call — `work/crowd7/meetings/2026/6.5.26.Crowd7EckertsCheckIn.transcript.md` (crop sequence + standardized field-access pricing confirmed there).

This is a **content swap**, not a new page. The page already exists; by the time peaches come in it'll be running the blackberry build. Belleville is the **fuller PYO layout** — Fun Pass + day-gated Field Access + Season Pass — but **NO playground / Mega Slide** (that's Versailles only; confirmed by reading the live Belleville blackberry parent). So the peach swap mirrors the blackberry page exactly: replace the blackberry HTML block with the peach HTML block, rename the Fun Pass, reprice/recontent the Fun Pass when Amanda confirms.

## 0. Before you start

Staged artifacts (pre-built 2026-06-09, Crowdly):

- **Snippet (paste into TS HTML editor):** `data/clients/eckerts/design/ticketspice-pages/belleville/peaches/belleville-farm-field-access-2026.peach-content.html`
- **Preview (open in browser first):** `…/belleville-farm-field-access-2026.peach-content-preview.html`
- Rollback point: the live blackberry build remains at `belleville/blackberries/`.

✅ **Imagery is NOT a gap.** Hero + gallery point at `longinow-assets/eckerts-peaches/*`, which is **already live** (the production Versailles peach page uses the same set). The page resolves with real images the moment it's pasted — no Creative Director push needed.

⚠️ **GAPS that should close before publish** (see Open Items):

1. **Peach Fun Pass price + bundle contents** — placeholder is $16 online / $20 gate, bundle = field access + pick-your-own peaches (mirrors the Belleville blackberry pass structure). Confirm peach quantity/unit, whether a donut/cider bundle applies, and the locked price.
2. **Peach transition date** — hero eyebrow carries "Eckert's Belleville Farm · 2026" (no hard date). Drop the confirmed peach open date in if you want a dated callout. (Date gates the publish *trigger*, not the HTML — the page is paste-ready now.)
3. **Hours** — inherited Belleville hours placeholder (`Tue–Thur 10–5 · Fri–Sun 9–5`) carried from the blackberry build's unresolved hours TODO. If Amanda has since confirmed Belleville hours, update banner + benefits + info row (3 spots, all flagged inline).

## 1. Page basics

- Keep the page slug / URL unchanged (`belleville-farm-field-access-2026`).
- **Page description / HTML block:** replace the blackberry content block with the `peach-content.html` snippet (full chunk — paste over the existing block). The floating Buy-Tickets button + slash-through script are included in the snippet (paste the whole file).

## 2. Ticket types

Belleville sells **three** products. Field access carries over verbatim; the Fun Pass renames blackberry→peach.

| Ticket | Action | Online | At gate | Notes |
|---|---|---|---|---|
| **Peach Fun Pass** | Rename from "Blackberry Fun Pass"; recontent bundle | $16 ⚠️ | $20 ⚠️ | Placeholder price — CONFIRM w/ Amanda. Bundle: field access + PYO peaches (qty TBD). |
| **Pick-Your-Own Field Access (Weekday Ticket)** | Keep visible, no change | $3 | $6 | Tue–Fri. Per person, ages 2 & up. |
| **Pick-Your-Own Field Access (Weekend Ticket)** | Keep visible, no change | $5 | $8 | Sat–Sun. Per person, ages 2 & up. |

Season Pass tiers (Eckert Experience Pass $32 was $75 · Picking Pass $22 was $50) are **season-wide, all-crop** products — carry over verbatim, no change.

## 3. Conditional Actions / date rules

- All tickets valid/visible through peach season. No date logic hard-coded in the HTML — date rules live in TS ticket config.
- The slash-through pricing script keys on ticket **name**. The `GATE` map at the bottom of the snippet has `Peach Fun Pass` + the two field-access names. **If the real Fun Pass name or price differs, update the `GATE` map to match** (and the card price in the design block).

## 4. Hours + last-wagon note

Inherited Belleville placeholder — **CONFIRM**:

- **Tue–Thur 10–5 · Fri–Sun 9–5. Last wagon 5 PM.**

## 5. Merch

- **NONE** staged. If Belleville peach season runs a merch add-on, add it in TS — not represented in the HTML block.

## 6. Imagery ✅

- Hero `background-image` + all gallery `<img>` URLs point at `https://raw.githubusercontent.com/Mat-Longinow/longinow-assets/master/eckerts-peaches/` (filenames: `peach-hero2.jpg`, `peach-baby.jpg`, `peach-tree-basket.jpg`, `peaches-family.jpg`, `peaches-kids.jpg`, `peaches-mom-and-daughter.jpg`).
- **This folder is already live** (same set the production Versailles peach page uses). No push needed.
- Gallery cards are duplicated for the marquee loop — if you change a filename, update **both** copies.

## 7. Pre-publish checklist

- [ ] Peach HTML snippet pasted, renders correctly in TS preview
- [ ] **Peach Fun Pass** renamed from blackberry, price + bundle confirmed w/ Amanda (replace $16/$20 placeholder)
- [ ] **PYO Field Access (Weekday Ticket)** visible, $3 (gate $6) — no change
- [ ] **PYO Field Access (Weekend Ticket)** visible, $5 (gate $8) — no change
- [ ] Season Pass tiers present (Experience $32 / Picking $22) — no change
- [ ] `GATE` map in snippet matches the final ticket names + Fun Pass gate price
- [ ] Peach hero + gallery imagery resolving (should be immediate — set is live)
- [ ] Hours confirmed w/ Amanda + dropped into banner + benefits + info row (3 spots)
- [ ] Crop-updates link / text points to `eckerts.com/crop-updates`

## 8. Open Items (for Mat / Amanda)

1. **Peach transition date** — when does Belleville flip blackberry→peach? (Needs Amanda; not in the 6/5 brief.) Gates the publish trigger.
2. **Peach Fun Pass price + contents** — confirm locked price + bundle (peach quantity/unit, donut/cider parity y/n). Placeholder $16/$20 mirrors blackberry.
3. **Belleville hours** — confirm Tue–Sun open/close (still the placeholder carried from the blackberry build).

## 9. Mobile

Layout is identical to the blackberry build (same `#sb-funnel` CSS + breakpoints at 1000 / 860 / 560px). Mobile audit inherits the template-wide pass — no per-crop mobile work needed. See `artifacts/mobile-audit.md` in the project folder.
