# Colony Acres — Early Bird 2026 · Concept B, "Field" (10 statics)

**Status:** Built, rendered, ready for review. A second, quieter route alongside
`../early-bird-2026/` (Concept A, "Press").
**Built:** 2026-08-27, by Crowdly.
**Format:** 10 × 1080×1080 PNG.

## Why a second concept

Concept A reproduced the two-ink poster press — Colony's own Flash Sale set and Harbaugh's
Early Bird set. It is deliberately loud and densely layered. This set is built from the
**other half** of the reference corpus, and is deliberately quiet.

References used here, poster system explicitly excluded:

- **`riamede-farm/Riamede-Fall-Festival-Flash-Sale-1..9`** — the closest category match in
  the corpus: a farm fall festival running the same tiered-ticket logic. Flat brand blocks,
  a photo held in a soft mask, white rounded price chips carrying a before/now pair, a pill
  CTA, and a lot of empty ground.
- **`montpelier-farms/33..38`** — photo-forward restraint. One picture, one sentence, one
  badge, nothing else.

## The rule that keeps it quiet

Applied without exception across all ten:

> **headline + one photo + at most two chips + CTA + logo.**

No paper texture, no halftone, no cut-out silhouettes, no rubber stamps, no vertical rails,
no offset echoes, no overlapping type layers. Where Concept A layered, this one leaves room.

## The system

**Signature shape — the arch.** Photos sit in a rounded-top arch: a barn door and a silo.
Riamede uses an oval blob, Montpelier uses full bleed; the arch is Colony's own, so the set
reads as a sibling of the reference work rather than a copy of it.

**Palette** — flat, four values doing all the work:

| Role | Hex |
|---|---|
| Cream ground | `#FBF6EC` |
| Deep green (panels, headline B, CTA) | `#1B5333` |
| Orange (headline A, prices) | `#E8743C` |
| Ink | `#26201A` |
| Chip white | `#FFFFFF` |

**Type** — two faces only. **Zilla Slab 700** for the headline lockup, set as a large word
over a smaller contrasting one, the way Riamede stacks HARVEST over FESTIVAL. **Oswald**
for eyebrows, chip labels and the CTA. Open Sans appears nowhere in the display hierarchy.

**Components** — `.arch`, `.chip` (label / price / optional strikethrough), `.pill`, `.mark`.
That is the entire kit.

## The ten

Same Opens → Value → Closes arc and the same campaign logic as Concept A: Early Bird is the
Labor Day window before the gates open, it never claims a season-low, and the recurring beat
is the price ladder.

| # | File | Layout | Beat |
|---|---|---|---|
| 01 | `01-early-bird-is-here` | Type left, arch right | Opens |
| 02 | `02-bundle-is-back` | Centred arch, one chip | Offer |
| 03 | `03-one-pass-all-fall` | Green ground, arch right | Offer |
| 04 | `04-beat-the-gate` | Photo band top, two chips | Value |
| 05 | `05-one-hundred-falls` | Full bleed, one line | Brand |
| 06 | `06-all-included` | Tall arch right, quiet list, no chips | Value |
| 07 | `07-family-math` | Arch left, type right | Value |
| 08 | `08-opening-day` | Green ground, date only, arch foot | Anticipation |
| 09 | `09-last-week` | Full bleed, one sentence | Closes |
| 10 | `10-price-goes-up` | Orange ground, ladder as the whole ad | Closes |

## Pricing status

Unchanged from Concept A, and the same caveats apply — **`$12.95`, the `Sept 4 – 18` window
and `$35.95` are Crowd7 proposals, not client-approved numbers.** Full reasoning in
`../early-bird-2026/README.md`. Constants sit at the top of `src/build.py`; a swap plus a
rebuild updates every board.

## Rebuilding

```bash
cd src
python3 build.py     # 10 HTML artboards
python3 render.py    # → 1080×1080 PNGs
python3 render.py 1080x1920   # Stories/Reels
```

No `prep_art.py` here — this concept uses straight colour photography, so there is no plate
preparation step.

### One layout gotcha worth knowing

`object-position` only bites when the container's aspect ratio differs from the source
photo's. Board 08's arch was originally 560×430 (1.30) against a 4:3 photo (1.33) — near
identical, so `object-fit: cover` had no vertical slack and the frame filled with foreground
lawn no matter what position was set. Widening the arch to 660×410 (1.61) gave it room to
crop onto the barn. If a photo won't reframe, check the ratios before touching the position.
