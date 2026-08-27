# Colony Acres — Early Bird 2026 · Press hero, 5 background variants

**Status:** Built, rendered. Mat-approved layout with his three edits applied.
**Built:** 2026-08-27, by Crowdly.
**Format:** 5 × 1080×1080 PNG.

## What this is

Mat picked **Concept A board 01** ("Early Bird Pricing") off the Concept B review page and
asked for it again with three changes and nothing else touched:

1. **Drop the body paragraph** — "The season's best price is gone…" is gone.
2. **Put the logo in that gap**, because the footer one was far too small.
3. **Swap the photograph**, with five variants differing only in it.

Everything else — paper, inks, erosion filters, type sizes, the script line, the stamp, the
rail, the tag bars — is a verbatim copy of the approved press, deliberately duplicated into
this folder rather than imported, so a later edit to `../early-bird-2026/` cannot silently
restyle approved creative.

## Why the logo was small — and what actually fixed it

Not a sizing mistake. `logo-white.png` is a **4167 × 4168** canvas whose artwork occupies
only a **3358 × 1157** band through the middle; the rest is transparent padding. So the
footer's `height: 74px` was drawing the mark about **20px tall** — roughly a quarter of what
the rule implied.

The fix was to crop the file to its alpha bounding box —
`../fall-harvest-festival-2026/img/logo-white-trim.png` — after which height rules mean what
they say. Worth knowing anywhere else in the account that places this logo; the same bug is
almost certainly making it small on other builds.

The footer lockup is dropped entirely rather than repeated, since the large mark in the gap
replaces it. Say the word if you'd rather keep both.

## The five

| # | File | Background |
|---|---|---|
| 01 | `01-girl-slide` | Girl on the giant double slide |
| 02 | `02-kids-races` | Two girls at the duck races |
| 03 | `03-barrel-cab` | Colony Acres barrel train, cropped to one barrel |
| 04 | `04-maze-aerial` | The centennial corn maze from the air |
| 05 | `05-girl-cheer` | Girl at the duck-race trough |

**Honest note on 05.** It's the weakest of the five — the source frame is backlit, so the
separation renders her close to a silhouette and the white trough competes with her. The
other four are clean. Happy to replace it; the constraint is that this template needs a
subject that cuts out cleanly, and the corpus doesn't hold many more that do. A fresh photo
from Katie would open it up.

## Two layout notes

**Landscape plates needed their own geometry.** The original photograph was portrait and held
the full right side against a three-line headline. Dropped in at the same box, the three
landscape subjects floated undersized — so they're scaled up and allowed to bleed past the
right edge, which fills the same zone. Left edges stay at 452+ so nothing crowds the logo,
which ends at x 454.

**The rail gained a paper-coloured halo.** Bleeding a dark plate under the vertical
attractions line made it unreadable on the barrel variant. A `text-shadow` in the stock
colour keeps it legible over ink and is invisible on bare paper.

## Rebuilding

```bash
cd src
python3 build.py     # 5 artboards
python3 render.py    # → 1080×1080 PNGs
```

Plates come from `../early-bird-2026/art/`. The one exception is `art/barrel-cab*.png` in
this folder: the shared plate is two barrels wide and the canvas cut landed mid-wordmark, so
it's cropped to a single barrel here. A variant can point at a different art directory by
adding a fourth item to its `VARIANTS` row.

Pricing is unchanged and still carries the Concept A caveats — `$12.95` and the
`Sept 4 – 18` window are Crowd7 proposals, not approved numbers.
