# ⚡ Jack's Lighted Trail — Flash Sale Ad Set

**Built:** 2026-08-27 · **Format:** 1080 × 1080 PNG (1:1 — matches every shipped flash-sale static in the reference corpus)
**Count:** 10 statics, sequenced across the sale window
**Sale window:** Mon **Aug 31** → Thu **Sept 3**

## 🎯 The sale terms — confirmed, and confirmed recently

Every number on these ads comes from CrowdView's `price` rows for event 32, which trace to
**Amanda Morgan in `#crowd7-and-eckerts-farm`, 2026-08-27 09:10**, replying to Mat's direct question:

> "We are offering **$10 for the first 500** (advertised, but really 1000) and then after that the
> discount drops to **$7 off**. This is **ONLY for September dates**… We do **NOT** want to discount
> dates in October. The flash sale will run **Monday 8/31 – Thursday [9]/3**."

| | |
|---|---|
| Tier 1 | **$10 off** — first **500** tickets · Trail Pass **$22 → $12** |
| Tier 2 | **$7 off** — steps down automatically once tier 1 sells through · **$22 → $15** |
| Dates covered | **September visit dates only** — Sept 11, 12, 18, 19, 25, 26, 27 |
| Mechanism | Auto-applied, **no coupon code** |
| Window | Mon Aug 31 → Thu Sept 3 |

⚠️ This **supersedes** two earlier records that were wrong and are now closed out: a stale
`$5 flat / purchase Sept 7–9` row (Amanda: *"is it possible that some of that info got carried over
from last year?"*) and change 108's unreconciled tiering. The TicketSpice page content still carries
a comment describing the old conflict — **that comment is now stale and should be updated.**

## 🚫 Three things these ads must never say

1. **No gate / box-office price.** Trail Pass is Online Only with the Box Office Price toggle off, and
   CrowdView records the gate price as *NOT ON FILE* with an explicit instruction: *"Do not state a
   gate price in any email, ad or page until it is read from the cart."* The struck-through `$22` on
   these ads is the **regular online price**, which is on file — not a gate price.
2. **Never publish the real inventory.** Tier 1 is **1000** tickets; **500** is Amanda's deliberate
   scarcity figure and is the only number that may appear publicly.
3. **No peak-tier flash price.** Sept 26 is the only September peak date ($27). Amanda said "$10 off…
   ONLY for September dates" without splitting standard from peak, so the peak flash price is
   **unconfirmed** (see change 241). Every ad quotes the standard tier only.

## 🖼️ The ten — a sequenced campaign

| # | File | Concept | When to run |
|---|---|---|---|
| 01 | `jlt-sale-01-teaser.png` | Flash Sale Starts Monday | Pre-launch, Thu 8/27 → Sun 8/30 |
| 02 | `jlt-sale-02-launch.png` | $10 Off — first 500 | Mon 8/31, sale opens |
| 03 | `jlt-sale-03-price-proof.png` | $22 → $12 | Mon 8/31 – Tue 9/1 |
| 04 | `jlt-sale-04-scarcity-500.png` | Only 500 at $10 off | Tue 9/1 |
| 05 | `jlt-sale-05-september-only.png` | September nights only + date grid | Tue 9/1 – Wed 9/2 |
| 06 | `jlt-sale-06-family.png` | The family night out, $12 each | Wed 9/2 |
| 07 | `jlt-sale-07-low-sensory.png` | Low Sensory Night (Sept 19) is $12 | Wed 9/2 |
| 08 | `jlt-sale-08-tier-two.png` | $10 tier gone, $7 off still live | **Trigger** — the moment tier 1 sells through |
| 09 | `jlt-sale-09-24-hour.png` | 24 hours left | Wed 9/2 evening → Thu 9/3 |
| 10 | `jlt-sale-10-final-hours.png` | Final hours, ends midnight | Thu 9/3 |

Creative 08 is the only **event-triggered** asset — it replaces 02/03/04 the moment the $10 tier
sells out, and its rail reads "The $10 tier has sold out" rather than a date. Everything downstream
of it quotes $15, not $12.

Per-creative ad copy (primary text, headline, description, CTA) is in `manifest.json`.

Low Sensory Night (Sept 19) is the **only** special night inside the sale — Characters on the Trail
(Oct 1), After Dark (Oct 22) and Costume Night (Oct 29) are all October and must not be discounted.

## 🎨 Style

Structure follows the shipped Crowd7 house style in `crowd7/marketing/fb-ad-reference-corpus/`;
palette and type are JLT's own night sub-brand (verified extract at
`notes/work/crowd7/projects/eckerts-jacks-lighted-trail-page/artifacts/brand-extract.md`), so the
ads match the ticket page they click through to.

**Type:** Anton (offer/price mechanics — the house's heavy-condensed poster weight) · Creepster
(JLT brand display) · Baloo 2 (labels) · Nunito (rail, body).

**Imagery:** the 17 harvested assets in `../../../assets/jacks-lighted-trail/`. Note creative 01 zooms
past a "Jack Lantern Journey" watermark baked into `hero-graveyard-fog.jpg` — if that photo gets
reused elsewhere, crop it.

## 🔁 Rebuilding

```
node build-sale-creatives.js      # requires playwright (uses the site-cloner install)
```

Each creative is an HTML block in the `ads` array — edit copy there and re-run to regenerate all ten.
