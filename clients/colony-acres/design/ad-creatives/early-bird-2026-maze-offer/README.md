# Colony Acres — Early Bird 2026 · Maze offer board, 5 copy iterations

**Status:** Built, rendered.
**Built:** 2026-08-28, by Crowdly.
**Format:** 5 × 1080×1080 PNG.

## What this is

Mat picked Concept B board 05 ("One Hundred Falls") and asked for the layout held exactly —
big type up top, the middle of the frame left open so the maze reads, one line and a pill at
the foot — with the copy rewritten from a **brand beat into an offer**, in Early Bird
language that pushes the sale.

So these five differ in **copy only**. Same photograph, same crop, same veil, same type
sizes, same centred stack, same CTA. That makes it a clean copy test: whatever wins is the
message winning, not the picture.

## The five angles

| # | File | Headline | Angle |
|---|---|---|---|
| 01 | `01-save-before-we-open` | Save before / we open | The plain saving against the gate |
| 02 | `02-last-call` | Last call / before the gate | Last discount before opening day |
| 03 | `03-bundle-is-back` | The bundle / is back | The Launch Day inclusions, reopened |
| 04 | `04-one-pass-all-fall` | One pass, / all fall | The season-pass sustain play |
| 05 | `05-buy-early-pay-less` | Buy early. / Pay less. | Bryan's own audience-training line |

All five stay inside the Early Bird rule from the strategy call: the sale sits between the
flash sale closing and the gates opening, and it is explicitly **not** the season's best
price — so none of these claims a season low or a percentage off. They lead on the gate
comparison and the closing window instead.

Headlines are held to roughly 15 characters a line so they clear 1080px at 96px Zilla Slab
and never need a size change. That is the constraint that keeps the layout identical across
all five — if a new line needs a smaller size, it's too long.

## Pricing status

Unchanged and still provisional. `$12.95`, the `Sept 4 – 18` window and `$35.95` are Crowd7
proposals, not Katie's approved numbers — full reasoning in `../early-bird-2026/README.md`.
`$17.95` and the gate prices are the better-supported figures.

## Rebuilding

```bash
cd src
python3 build.py     # 5 artboards
python3 render.py    # → 1080×1080 PNGs
```

Copy lives in the `ITERATIONS` list — one row per board, `(slug, eyebrow, line A, line B,
foot line)`. Adding a sixth angle is one more row.

The photograph comes from `../early-bird-2026-concept-b/img/`. Layout, veil and components
are a verbatim copy of Concept B's press rather than an import, so a later edit to that set
cannot restyle approved creative.
