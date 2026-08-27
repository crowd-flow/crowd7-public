# Colony Acres — Early Bird 2026 · Ad Creative Set (10 statics)

**Status:** Built, rendered, ready for review.
**Built:** 2026-08-27, by Crowdly.
**Format:** 10 × 1080×1080 PNG (Meta feed square). Source artboards are HTML — other
placements are a re-render, not a redesign.

## What "Early Bird" means on this account

Not a generic pre-sale. On the 5/21 strategy call Bryan defined Colony's four tiers and
placed Early Bird precisely:

> "our four tiers, which is lead-up, flash sale, **early bird, which is for you early bird is
> before doors open, which is going to be our Labor Day sale**, and then our in-season emails."

So Early Bird is the **sustain push between the flash sale closing and the gates opening** —
Labor Day weekend through the night before **September 19**. It exists to solve a problem
Bryan named outright:

> "What I've found with these flash sales is they're great until they're over, and then you
> freaking bottom out until the day before your event starts. And so, it's like, how do we
> sustain that? And I think it's early bird pricing, but we can pivot that to be, you know,
> labor day sales."

Two hard rules fall out of that, and they govern every line of copy in this set:

1. **Early Bird is NOT the season's best price.** Bryan: *"I don't want to relaunch flash sale
   pricing. I want to protect that as the best price you're going to get in season."* Nothing
   in this set claims a season-low, and 01 opens by conceding the flash sale is gone.
2. **The job is to train the audience.** Bryan: *"just really train our audience that if you
   want a deal, you buy early. If you don't, in season, that's what you get."* So the recurring
   beat across the set is the **price ladder and the closing window** — not a discount
   percentage. That's why there is no "33% OFF" stamp anywhere here, unlike the Flash Sale set.

The offer itself is Bryan's own proposal: *"maybe we open back up those launch day or we do a
labor day special with the same inclusions we did for 17 … and we do a limited number of them
… and then we also maybe discount our season pass."* That is exactly what 02 and 03 sell.

## Where the visual style came from

The style is **not** derived from the TicketSpice page — it's Crowd7's shipped poster system,
read directly off `crowd7/marketing/fb-ad-reference-corpus`:

- `colony-acres/Colony_Acres_-_Flash_Sale_{1,2,3}_V2.png` — this account's own Meta statics
- `harbaugh-village/Harbaugh-_Early_Bird_Asset_{1,2,3}_V*.png` — the same system doing an
  Early Bird campaign, which is the closest structural precedent that exists

The shared system, reproduced here:

| Element | How it's built |
|---|---|
| **Cream stock** | `#EDE5D4` with an SVG `feTurbulence` fibre tint + finer speckle plate |
| **Two-ink riso art** | Photos cut out (`rembg`), separated into an orange plate and a dark/green plate, each halftoned on its own screen angle (15° / 52°) — `src/prep_art.py` |
| **Mis-registered echo** | A solid orange silhouette of the same cutout, offset behind it |
| **Distressed display type** | `feTurbulence` + `feDisplacementMap` erosion filter on live text |
| **Rubber-stamp badge** | Circular outline, rotated, run through the same erosion filter |
| **Vertical attractions rail** | Rotated Zilla Slab italic up the right edge |
| **Orange tag bars** | Bottom-left date/price tags with roughened edges, then logo + "Get Tickets!" |

**The one deliberate departure:** Harbaugh's display face is a western slab. Colony's is
**Zilla Slab 700** — the face already on their ticket page and website. Same house system,
this account's typography. Inks are Colony's: orange `#E8743C`, barn green `#185C2E`,
ink `#1A1612` on cream.

Photography is all real Colony Acres material pulled from the corpus and the client's own
uploads. Nothing stock, nothing generated.

## The ten

Structured on the Opens → Value → Closes arc that Harbaugh's Early Bird set uses, widened
to ten and fitted to Colony's offer.

| # | File | Beat | Angle |
|---|---|---|---|
| 01 | `01-early-bird-is-here` | Opens | Concedes the flash sale is over; you can still beat the gate |
| 02 | `02-bundle-is-back` | Offer | The Launch Day bundle reopened for Labor Day, capped again |
| 03 | `03-one-pass-all-fall` | Offer | Season pass at an Early Bird price |
| 04 | `04-beat-the-gate` | Value | The price ladder — the campaign's core argument |
| 05 | `05-one-hundred-falls` | Brand | Centennial, printed green on the aerial maze |
| 06 | `06-twenty-ways-to-play` | Value | Everything included with admission |
| 07 | `07-family-math` | Value | Four tickets now vs. four at the weekend gate |
| 08 | `08-opening-day` | Anticipation | Sept 19 — the only green-flood board, for feed contrast |
| 09 | `09-last-week` | Closes | Last discounted window before opening day |
| 10 | `10-when-the-gates-open` | Closes | Orange flood, the final beat |

## ⚠️ Prices to confirm before these run

Bryan explicitly left the Labor Day structure open — *"we'll talk about maybe an idea there of
what we want to do. And I'll get that over to you."* So parts of this are **Crowd7's proposal,
not client-approved numbers.** Everything questionable is a single constant at the top of
`src/build.py` — a one-line swap, then rebuild.

| Value | Status |
|---|---|
| **`$12.95` Early Bird admission** | **PROPOSED by Crowd7.** Chosen to sit above every flash price ($10.49 / $11.95) and below every gate price, so rule 1 above holds. Not from the client. |
| **`Sept 4 – 18` window** | **DERIVED** — Labor Day weekend through the night before opening. Bryan implied it; nobody stated it. |
| **`$35.95` season pass** | **PROPOSED**, against an assumed `$39.95` regular that Bryan called "probably $39.95 would be my guess." Both need confirming. |
| **`$17.95` bundle** | Reasonably safe — Bryan said "the same inclusions we did for 17." |
| **`$13.80` / `$15.80` gate** | From the 5/21 pricing walk-through. Note the built ticket page says "$16 at gate," which conflicts; 04, 07 and 10 print the meeting numbers. |
| **Bundle quantity cap** | Left as "Limited Quantity" / "While they last" on purpose — the page says 100, the transcript says 300. No number is printed until that's settled. |

## Rebuilding

```bash
cd src
python3 prep_art.py      # photos → two-ink halftone plates + echoes (needs rembg)
python3 build.py         # 10 HTML artboards
python3 render.py        # → 1080×1080 PNGs
python3 render.py 1080x1920   # Stories/Reels
```

Copy and price live in the constants block and in one clearly-marked section per creative.
The press itself — paper, inks, erosion filters — is the shared `BASE`/`DEFS` block, so a
change there re-prints the whole set consistently.
