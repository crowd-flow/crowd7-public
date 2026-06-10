# 🍎 TicketSpice Build Brief — Eckert's Belleville (IL) Apple Swap

**Page:** `belleville-farm-field-access-2026` (existing Belleville Field Access page — will be running **peaches** when this swap is needed)
**Goal:** Swap the live peach content → apple content for pick-your-own apples (peach→apple transition).
**Go-live:** **TBD** — when Belleville flips peach→apple. ⚠️ **Transition date pending Amanda** (the 6/5 brief confirmed the crop *sequence* blackberry→peach→apple, not the swap dates).
**Source of locked specs:** 6/5 Amanda call — `work/crowd7/meetings/2026/6.5.26.Crowd7EckertsCheckIn.transcript.md` (crop sequence + standardized field-access pricing confirmed there).

This is a **content swap**, not a new page. By the time apples come in the page will be running the peach build. Belleville is the **fuller PYO layout** — Fun Pass + day-gated Field Access + Season Pass — but **NO playground / Mega Slide** (Versailles only). So the apple swap mirrors the peach page exactly: replace the peach HTML block with the apple HTML block, rename the Fun Pass, reprice/recontent the Fun Pass when Amanda confirms.

## 0. Before you start

Staged artifacts (pre-built 2026-06-09, Crowdly):

- **Snippet (paste into TS HTML editor):** `data/clients/eckerts/design/ticketspice-pages/belleville/apples/belleville-farm-field-access-2026.apple-content.html`
- **Preview (open in browser first):** `…/belleville-farm-field-access-2026.apple-content-preview.html`
- Rollback point: the live peach build remains at `belleville/peaches/`.

⚠️ **TWO GAPS must close before publish** (see Open Items):

1. **Apple imagery** — hero + gallery point at `longinow-assets/eckerts-apples/*`, which is **not yet pushed**. Until then the gradient fallback shows. Filenames match the Versailles + Grafton apple builds (`apple-hero.jpg`, `apple-baby.jpg`, `apple-tree-basket.jpg`, `apples-family.jpg`, `apples-kids.jpg`, `apples-mom-and-daughter.jpg`) — **one Creative Director push resolves all three apple pages.**
2. **Apple Fun Pass price + bundle contents** — placeholder is $16 online / $20 gate, bundle = field access + PYO apples (mirrors blackberry/peach). Confirm apple quantity/unit (bag vs peck vs lb), donut/cider parity, and the locked price.

Plus the standing **Belleville hours** placeholder (3 spots inline) and the **apple transition date** (hero eyebrow has no hard date).

## 1. Page basics

- Keep the page slug / URL unchanged (`belleville-farm-field-access-2026`).
- **Page description / HTML block:** replace the peach content block with the `apple-content.html` snippet (full chunk — paste over the existing block). Floating Buy-Tickets button + slash-through script are included (paste the whole file).

## 2. Ticket types

| Ticket | Action | Online | At gate | Notes |
|---|---|---|---|---|
| **Apple Fun Pass** | Rename from "Peach Fun Pass"; recontent bundle | $16 ⚠️ | $20 ⚠️ | Placeholder price — CONFIRM w/ Amanda. Bundle: field access + PYO apples (qty TBD). |
| **Pick-Your-Own Field Access (Weekday Ticket)** | Keep visible, no change | $3 | $6 | Tue–Fri. Per person, ages 2 & up. |
| **Pick-Your-Own Field Access (Weekend Ticket)** | Keep visible, no change | $5 | $8 | Sat–Sun. Per person, ages 2 & up. |

Season Pass tiers (Eckert Experience Pass $32 was $75 · Picking Pass $22 was $50) are **season-wide, all-crop** products — carry over verbatim, no change.

## 3. Conditional Actions / date rules

- All tickets valid/visible through apple season. No date logic hard-coded in the HTML — date rules live in TS ticket config.
- The slash-through pricing script keys on ticket **name**. The `GATE` map has `Apple Fun Pass` + the two field-access names. **If the real Fun Pass name or price differs, update the `GATE` map + the card price.**

## 4. Hours + last-wagon note

Inherited Belleville placeholder — **CONFIRM**:

- **Tue–Thur 10–5 · Fri–Sun 9–5. Last wagon 5 PM.**

## 5. Merch

- **NONE** staged. Add in TS if Belleville apple season runs a merch add-on.

## 6. Imagery ⚠️

- Hero `background-image` + all gallery `<img>` URLs point at `https://raw.githubusercontent.com/Mat-Longinow/longinow-assets/master/eckerts-apples/`.
- **That folder does not exist yet.** Creative Director must source + push the apple set before publish. The moment those files land at those names, the page resolves with no HTML edit. **Same set the Versailles + Grafton apple pages use — one push covers all three.**
- Gallery cards are duplicated for the marquee loop — if you change a filename, update **both** copies.

## 7. Pre-publish checklist

- [ ] Apple HTML snippet pasted, renders correctly in TS preview
- [ ] **Apple Fun Pass** renamed from peach, price + bundle confirmed w/ Amanda (replace $16/$20 placeholder)
- [ ] **PYO Field Access (Weekday Ticket)** visible, $3 (gate $6) — no change
- [ ] **PYO Field Access (Weekend Ticket)** visible, $5 (gate $8) — no change
- [ ] Season Pass tiers present (Experience $32 / Picking $22) — no change
- [ ] `GATE` map in snippet matches the final ticket names + Fun Pass gate price
- [ ] Apple hero + gallery imagery pushed to `longinow-assets/eckerts-apples/` and resolving
- [ ] Apple open date dropped into hero eyebrow (replacing the undated "· 2026")
- [ ] Hours confirmed w/ Amanda + dropped into banner + benefits + info row (3 spots)
- [ ] Crop-updates link / text points to `eckerts.com/crop-updates`

## 8. Open Items (for Mat / Amanda)

1. **Apple transition date** — when does Belleville flip peach→apple? (Needs Amanda; not in the 6/5 brief.) Gates the publish trigger.
2. **Apple imagery** — Creative Director to source + push the apple hero + gallery set to `longinow-assets/eckerts-apples/` (shared with the Versailles + Grafton apple pages).
3. **Apple Fun Pass price + contents** — confirm locked price + bundle (apple quantity/unit, donut/cider parity y/n). Placeholder $16/$20 mirrors blackberry/peach.
4. **Belleville hours** — confirm Tue–Sun open/close (still the placeholder carried from the blackberry build).

## 9. Mobile

Layout is identical to the peach/blackberry builds (same `#sb-funnel` CSS + breakpoints at 1000 / 860 / 560px). Mobile audit inherits the template-wide pass — no per-crop mobile work needed. See `artifacts/mobile-audit.md` in the project folder.
