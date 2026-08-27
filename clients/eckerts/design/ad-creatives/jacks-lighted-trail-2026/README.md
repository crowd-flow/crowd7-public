# 🎃 Jack's Lighted Trail (Belleville) — Meta Ad Creatives, 2026 Season

**Built:** 2026-08-27 · **Format:** 1080 × 1350 PNG (Meta 4:5 feed — the highest-real-estate placement)
**Count:** 10 statics
**Design system:** the standalone `Jack's Lighted Trail` sub-brand — the same dark/night system as the
TicketSpice overlay (`../../ticketspice-pages/belleville/jacks-lighted-trail/`), **not** Eckert's house style.

## 🎨 Style source

Palette and type are taken from the verified brand extract at
`notes/work/crowd7/projects/eckerts-jacks-lighted-trail-page/artifacts/brand-extract.md`, which was
pulled from the live Wix site's own theme colour table (`--color_N`), not a hex-frequency guess.

| Token | Hex | Use here |
|---|---|---|
| Primary / CTA orange | `#ff6e00` | Display headlines, CTA pill, chip borders |
| Glow yellow | `#ffe730` | Second-line headline word, chip values, footer dates |
| Amber | `#f9bb3e` | Eyebrows / section labels |
| Light glow | `#fff18a` | Sub-headlines |
| Deep purple → bright purple | `#471f73` → `#7730c5` | Footer bar, 21+ badge |
| Alert red | `#ed1c24` | Flash-sale + scarcity bands and bursts |
| Night ground | `#0a0a0a` / `#000` | Base |

**Type:** Creepster (display) · Baloo 2 (labels/CTA) · Nunito (body) — the same free stand-ins the
TicketSpice overlay uses, because the real faces ("Bite Hard", "Mogathe", "Berlin Sans FB Demi") are
Wix-hosted proprietary files and aren't licensable for ad export.

**Voice:** family-friendly spooky, never gory. Playful, alliterative, exclamation-forward, with the
site's deliberate case-mixing (ALL CAPS punch lines against all-lowercase stylized headers).

**Imagery:** the 17 assets in `../../assets/jacks-lighted-trail/`, harvested from Jack's own Wix CDN.

## 🖼️ The 10 creatives

| # | File | Concept | Funnel role |
|---|---|---|---|
| 01 | `jlt-01-brand-hero.png` | "Jack's Lighted Trail" / the spookiest event near st. louis | Cold / awareness — the workhorse |
| 02 | `jlt-02-flash-sale.png` | Flash Sale, 4 days only, Aug 31 – Sept 4 | Urgency / conversion |
| 03 | `jlt-03-opening-night.png` | Opening Night Fri, Sept 11 | Launch-week urgency |
| 04 | `jlt-04-from-22.png` | Trail Passes from $22 | Value / price anchor |
| 05 | `jlt-05-family-fun.png` | Made for all ages | Core audience (women 25–54) |
| 06 | `jlt-06-four-ways.png` | Four ways to play (attraction grid) | Consideration — answers "what do you DO there?" |
| 07 | `jlt-07-tasty-treats.png` | Treats worth the walk / Spook-Easy | Scroll-stopper |
| 08 | `jlt-08-after-dark.png` | After Dark 21+, Thu Oct 22 | Date-night segment, single-date scarcity |
| 09 | `jlt-09-low-sensory.png` | Low Sensory Night, Sat Sept 19 | Inclusive-access, high organic share |
| 10 | `jlt-10-costume-night.png` | Costume Night / Trails of Treats, Thu Oct 29 | Season-closer urgency |

Per-creative ad copy (primary text, headline, description, CTA) and targeting notes live in
`manifest.json`.

## ✅ What's confirmed vs. what is deliberately absent

**Confirmed and printed on the creatives** — Trail Pass date-tier pricing ($22 standard / $27 peak /
$30 After Dark 21+ Oct 22 / $32 premium & costume nights), the Sept 11 – Oct 30 run, closed on
Halloween, and all four special nights with their times. Source: CrowdView, 2026-08-27 — the same
data already shipped on the live TicketSpice page.

**⚠️ Deliberately NOT printed — the flash-sale discount amount.** Creative 02 says *"the lowest
prices of the season"* and carries the window (Aug 31 → midnight Sept 4) but no dollar figure,
because the amount is still in conflict: the TicketSpice build brief frames it as a two-tier
$10-off → $7-off, while CrowdView's DB describes a single $5 auto-discount over a Sept 7–9 window.
That conflict is logged in the project's `state.md` and is unresolved. Adding the number is a
one-line text edit in `build-creatives.js` once Amanda confirms — do not guess it into a live ad.

## 🔁 Rebuilding / editing

```
node build-creatives.js      # requires playwright (uses the site-cloner install)
```

Every creative is defined as an HTML block in the `creatives` array — edit copy there and re-run to
regenerate all 10. Add a `1080 × 1920` viewport pass to the same script for Stories/Reels cuts.

## 📌 Scope note

The account playbook (`crowd7/data/clients/eckerts/account-playbook.md`) still lists Jack's Lighted
Trail under *"Possibly Helping"* / deliberately out of scope, per Mat's 2026-08-03 directive. That
entry predates the TicketSpice page build (2026-08-06) and this creative pass (2026-08-27) — both
directed by Mat. **The playbook line is stale and should be updated**; flagged rather than edited
here because it's Crowdly's file to correct on its next pass.
