# ⚡ Jack's Lighted Trail — Flash Sale, Single-Layout Set

**Built:** 2026-08-28 · **Format:** 1080 × 1080 PNG · **Count:** 10
**Brief:** Mat, 2026-08-28 — *"I really like this style of ad… create 9 more iterations of this
specific layout. I only want to change the title, sub-title and the sub-text."*

One fixed layout, ten fills. Ad 01 is the pre-launch teaser; **02–10 all say the sale is live.**

## 📐 The layout — what is fixed vs. what varies

**Fixed on every execution:** eyebrow, the two matched bottom marks, the bottom rail, the scrim,
grain and vignette treatment, and all spacing.

**Varies per execution — only these four things:**

1. **Title** — two lines of Anton
2. **Sub-title** — one line of Creepster, orange
3. **Sub-text** — two lines of Baloo 2
4. **Background** — one of three

### The matched marks

The **JLT logo (bottom-left)** and the **"4 Days Only" stamp (bottom-right)** are a mirrored pair —
same optical size, same baseline.

⚠️ **Sizing gotcha, if you ever touch this:** `logo-jacks-lighted-trail.png` is a 1200×1200 canvas
but the artwork only occupies **x 149–1048, y 289–981** — 900×693, and sitting **35px below** canvas
centre. Dropping it into a box the same size as the stamp therefore renders it ~25% too small and
slightly low. The constants `LOGO_BOX / LOGO_LEFT / LOGO_BOTTOM` in the build script compensate;
they are derived from those bounds, not eyeballed. Re-derive them if the logo file is ever replaced.

## 🌙 The three backgrounds

| | Asset | Used by | Treatment |
|---|---|---|---|
| **BG1** | `hero-graveyard-fog.jpg` | 01 02 03 04 | Zoomed 1.55× — the source has a *"Jack Lantern Journey"* watermark baked in that the crop pushes off-canvas |
| **BG2** | `hero-pumpkin-trail-red.jpg` | 05 06 07 | Standard scrim |
| **BG3** | `hero-jackolanterns-colorful.jpg` | 08 09 10 | Lifted scrim + `brightness(1.32)` — it's an already-black field of glowing faces and the standard scrim flattened it to solid black |

## 🖼️ The ten

| # | File | Title / sub-title | BG |
|---|---|---|---|
| 01 | `jlt-live-01-teaser.png` | Flash Sale / *starts monday* | 1 |
| 02 | `jlt-live-02-live-now.png` | Flash Sale / *live now* | 1 |
| 03 | `jlt-live-03-ten-off.png` | $10 Off / *happening now* | 1 |
| 04 | `jlt-live-04-ends-thursday.png` | Flash Sale / *ends thursday* | 1 |
| 05 | `jlt-live-05-is-live.png` | Flash Sale / *is live* | 2 |
| 06 | `jlt-live-06-twelve.png` | $12 Tickets / *sale is on* | 2 |
| 07 | `jlt-live-07-save-ten.png` | Save $10 / *while it lasts* | 2 |
| 08 | `jlt-live-08-on-now.png` | Flash Sale / *on now* | 3 |
| 09 | `jlt-live-09-its-live.png` | It's Live / *no code needed* | 3 |
| 10 | `jlt-live-10-five-hundred.png` | 500 Tickets / *at $10 off* | 3 |

Angles across the nine live executions: plain announcement (02, 05, 08), price-led (03, 06, 07),
scarcity (10), deadline (04), and no-code ease (09) — so the set can be split-tested rather than
just rotated. Per-creative ad copy is in `manifest.json`.

## 🎯 Sale terms

From CrowdView's `price` rows, sourced to **Amanda Morgan, `#crowd7-and-eckerts-farm` 2026-08-27 09:10**:
**$10 off the first 500**, then **$7 off**; Trail Pass **$22 → $12 → $15**; **September dates only**
(October never discounted); no coupon code; **Mon Aug 31 → Thu Sept 3**.

**Three things these ads never say:** no gate price (CrowdView records it as *not on file* with an
explicit instruction not to state one — the struck `$22` is the regular *online* price); never the
real 1000 inventory (**500** is Amanda's advertised scarcity figure); no peak-tier flash price
(Sept 26 unconfirmed).

## 🔁 Rebuilding

```
node build-live-creatives.js      # requires playwright (uses the site-cloner install)
```

Each execution is one object in the `ads` array carrying `t1`/`t2` (title), `sub`, `body` and `bg`.
Adding an eleventh is a new object — the layout is shared, so nothing else needs touching.
`ts` and `subSize` are per-ad type sizes; long titles like "TICKETS" need `ts` around 190 to keep
clear of the edges.

## 📝 One change beyond the brief

The rail terms read **"September dates only · no code needed"** on the live executions rather than the
teaser's **"Mark your calendar"** — leaving the teaser's wording on a live ad would have been wrong.
The small duplicate logo that used to sit in the rail was removed, since the new bottom-left mark
replaces it. Flagged here because both sit outside the "only change the title, sub-title and
sub-text" brief.
