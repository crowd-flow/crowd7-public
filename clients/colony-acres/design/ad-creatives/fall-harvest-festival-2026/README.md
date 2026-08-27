# Colony Acres — Annual Fall Festival 2026 · Ad Creative Set (10 statics)

**Status:** Built, rendered, ready for Katie's review.
**Built:** 2026-08-27, by Crowdly.
**Format:** 10 × 1080×1080 PNG (Meta feed square). Source artboards are HTML — re-crop
to 1080×1350 or 1080×1920 by changing one `window-size` flag, no redesign needed.

## Where the style came from

Every color, typeface, and component in these ads is lifted 1:1 from the live TicketSpice
page — `../ticketspice-pages/fall-harvest-festival/production/fall-harvest-festival-2026.html`
— so the ad, the click-through, and the farm's own site read as one campaign instead of three.

**Palette**

| Role | Hex | Where it comes from |
|---|---|---|
| Barn green | `#009A4D` | page nav |
| Deep green | `#1F5C2E` | story strip (the ADA-corrected value, not the original `#009A4D`) |
| Warm orange | `#E8743C` | primary CTA |
| Cream | `#FBF6EC` | page ground |
| Centennial gold | `#F2C66A` / `#C19A47` | script accents + ribbons |
| Ink | `#2A1A0E` | body copy |

**Type**

- **Zilla Slab** 700 — headlines
- **Oswald** 400–700 — eyebrows, ribbons, prices, CTAs (always uppercase, wide tracking)
- **Open Sans** 300–600 — body
- **Caveat** 700 — centennial script accents, *always* gold, never any other color

**Components carried over from the page:** the green offer banner strip, gold ribbon badges,
50px-radius uppercase orange CTA pill, the cream offer card with a colored top border, and the
logo + place/date lockup as a consistent sign-off.

**Photography:** all real Colony Acres imagery — the farm's own WordPress uploads plus the
Webconnex CDN set already on the ticket page. Nothing stock, nothing generated.

## The ten

| # | File | Angle | Funnel stage |
|---|---|---|---|
| 01 | `01-flash-sale-hero` | Flash Sale · best prices of the season, aerial centennial maze | Offer / prospecting |
| 02 | `02-launch-day-bundle` | $17.95 bundle, $36 value, **first 100 buyers** | Scarcity / conversion |
| 03 | `03-family-4-pack` | $64.95 for four, $107 value | Family value / conversion |
| 04 | `04-centennial-100-years` | Est. 1926, "100 years, still family-run" | Brand / emotional |
| 05 | `05-six-weeks-of-fall` | Sept 19 – Oct 31, Wed–Sun | Awareness / save-the-date |
| 06 | `06-20-attractions` | 4-tile grid, 20+ attractions on one ticket | Feature / consideration |
| 07 | `07-online-vs-gate` | $10.49 online vs $16 at the gate | Rational / conversion |
| 08 | `08-centennial-corn-maze` | Single-attraction spotlight, full-bleed maze | Consideration |
| 09 | `09-last-chance-urgency` | "Prices go up Aug 31" | Urgency / retargeting |
| 10 | `10-a-little-country` | Tagline + logo, 15 min from Iowa City | Top-of-funnel awareness |

Deliberately spread across the funnel rather than ten variations of the same discount —
02/03/07/09 carry price, 04/05/10 carry brand, 06/08 carry product. That gives Meta enough
creative diversity to optimize against instead of fatiguing one angle.

## ⚠️ Numbers to confirm with Katie before these go live

The pricing on 02, 03, 07 and 09 is pulled from the **built ticket page**, which is ahead of
`data/clients/colony-acres/events/fall-harvest-festival/event-info.md` in places. Flagging the
deltas rather than silently picking one:

- **Launch Day Bundle cap:** the ad says **first 100 buyers**, matching the live page. The
  5/21 strategy meeting said **300**. The page is newer — but confirm which is real, because
  it's printed on the creative and drives the urgency claim.
- **Fun Yard weekday flash price:** ads use **$10.49** (live page). Meeting notes floated
  $10.40 / $10.95. Weekend $11.95 is consistent across both.
- **Gate price:** ad 07 anchors against **$16.00** weekday. The page's card says "$16 at gate"
  but the meeting notes say weekday door is **$13.80** / weekend **$15.80**. If $13.80 is the
  real weekday door price, ad 07's anchor is overstated and must be corrected before it runs —
  this is the one number in the set that could be a compliance problem, not just a typo.
- **Family 4 Pack:** $64.95 / $107 value comes from the page only; it does not appear in the
  meeting notes at all. Confirm it exists as a real SKU.
- **"Ends Sunday" on ad 09:** flash sale is Aug 26–30 with a *planned* one-day extension to
  Aug 31. Ad 09's body says "prices go up Aug 31," which assumes the extension is live. If the
  extension is instead activated mid-sale, this creative's dates need a swap.

## Rebuilding

```bash
cd src
python3 build.py     # regenerates the 10 HTML artboards + contact sheet
./render.sh          # headless Chrome → 1080×1080 PNGs
```

Edit copy/layout in `src/build.py` — each creative is one clearly-marked block. The shared
design system lives in the `BASE` stylesheet at the top of that file, so a palette or type
change propagates to all ten at once.

Other sizes: change `--window-size=1080,1080` in `render.sh` (and the `html, body` dimensions
in `build.py`'s `BASE`) to `1080,1350` for 4:5 feed or `1080,1920` for Stories/Reels.
