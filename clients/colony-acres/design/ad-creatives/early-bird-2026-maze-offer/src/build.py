#!/usr/bin/env python3
"""
Colony Acres · Early Bird 2026 · Maze offer board — 5 copy iterations

Mat picked Concept B board 05 ("One Hundred Falls") and asked for the layout
held exactly — big type up top, the middle of the frame left open so the maze
reads, one line and a call to action at the foot — with the copy rewritten from a brand
beat into an OFFER, in Early Bird language that pushes the sale.

So these five differ in copy only. Same photograph, same crop, same veil, same
type sizes, same centred stack. That makes them a clean copy test: whatever wins
is the message winning, not the picture.

Mat's later edits, applied here: the CTA is set as a smaller sibling of the
headline rather than a pill, and the top and bottom blocks are pushed further
apart so more of the maze shows through. Those are template-level, so they land
on all five — a copy test stops being a copy test the moment one board's layout
drifts from the rest.

The five angles, all drawn from the strategy call's Early Bird logic — the sale
sits between the flash sale closing and the gates opening, and it is explicitly
NOT the season's best price, so none of these claims a season low:

  01  the price      the plain saving against the gate
  02  the deadline   last discount before opening day
  03  the bundle     the Launch Day inclusions, reopened
  04  the season pass  the sustain play
  05  the ladder     "buy early, pay less" — Bryan's own audience-training line

Layout, veil and components are a verbatim copy of Concept B's press so a later
edit to that set cannot restyle approved creative.
"""

import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "render"
OUT.mkdir(exist_ok=True)
IMG = "../../early-bird-2026-concept-b/img"

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Zilla+Slab:ital,wght@0,600;0,700;1,700&family=Oswald:wght@400;500;600'
    '&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">'
)

# ── verbatim from early-bird-2026-concept-b/src/build.py ────────────────────
BASE = """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1080px; overflow: hidden; }

.ad {
  width: 1080px; height: 1080px; position: relative; overflow: hidden;
  background: #FBF6EC; color: #26201A;
  font-family: 'Open Sans', system-ui, sans-serif;
}

.full { position: absolute; inset: 0; }
.full img { width: 100%; height: 100%; object-fit: cover; display: block; }
.veil { position: absolute; inset: 0; }

.lock { position: absolute; }
.lock .a, .lock .b {
  font-family: 'Zilla Slab', Georgia, serif; font-weight: 700;
  text-transform: uppercase; line-height: 0.9; letter-spacing: -0.015em;
  white-space: nowrap; display: block;
}

.eyebrow {
  font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 21px;
  letter-spacing: 0.22em; text-transform: uppercase; color: #8A7355;
}
.eyebrow.light { color: rgba(251,246,236,0.72); }

.say {
  font-family: 'Zilla Slab', serif; font-weight: 600; font-size: 30px;
  line-height: 1.42; color: #4A3F31;
}
.say.light { color: rgba(251,246,236,0.92); }

/* The call to action is set as a smaller sibling of the headline rather than a
   button — same face, same treatment, peach so it echoes the second title line. */
.cta {
  position: absolute; left: 0; right: 0; text-align: center;
  font-family: 'Zilla Slab', Georgia, serif; font-weight: 700;
  text-transform: uppercase; letter-spacing: -0.012em; line-height: 0.9;
  font-size: 62px; color: #F6B98E;
}
"""

VEIL = ("linear-gradient(180deg,rgba(20,45,26,0.72) 0%,rgba(20,45,26,0.12) 40%,"
        "rgba(20,45,26,0.28) 66%,rgba(20,45,26,0.86) 100%)")

# ── the only thing that varies: the words ───────────────────────────────────
# Lines are held to ~15 characters so they clear 1080px at 96px Zilla Slab and
# never need a size change — the whole point is that the layout stays put.
ITERATIONS = [
    ("01-save-before-we-open", "Early Bird · Sept 4 – 18",
     "Save big before", "we open",
     "Don’t miss Early Bird pricing — Admission $12.95 through Sept 18."),

    ("02-last-call", "Early Bird ends Sept 18",
     "Last call", "before the gate",
     "The final discount before opening day. $12.95, any day you visit."),

    ("03-bundle-is-back", "Labor Day · limited run",
     "The bundle", "is back",
     "Admission, a pumpkin, a slushie and donut holes — $17.95."),

    ("04-one-pass-all-fall", "Early Bird · season pass",
     "One pass,", "all fall",
     "$35.95 through Sept 18. Unlimited visits, Sept 19 – Oct 31."),

    ("05-buy-early-pay-less", "Early Bird · Sept 4 – 18",
     "Buy early.", "Pay less.",
     "$12.95 now. $15.80 once the gates open September 19."),
]

for slug, eyebrow, line_a, line_b, say in ITERATIONS:
    (OUT / f"{slug}.html").write_text(
        f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Colony Acres · Early Bird maze offer · {slug}</title>
{FONTS}<style>{BASE}</style></head><body>
<div class="ad">
  <div class="full"><img src="{IMG}/colony-100-years-maze.jpg" style="object-position:50% 46%" alt=""></div>
  <div class="veil" style="background:{VEIL}"></div>
  <div class="eyebrow light" style="position:absolute;left:0;right:0;top:68px;text-align:center">{eyebrow}</div>
  <div class="lock" style="left:0;right:0;top:112px;text-align:center">
    <span class="a" style="font-size:96px;color:#FBF6EC">{line_a}</span>
    <span class="b" style="font-size:96px;color:#F6B98E">{line_b}</span>
  </div>
  <div class="say light" style="position:absolute;left:0;right:0;bottom:180px;text-align:center;font-size:29px">
    {say}
  </div>
  <div class="cta" style="bottom:76px">Get Tickets</div>
</div></body></html>""")

print(f"built {len(ITERATIONS)} iterations → {OUT}")
for slug, _, a, b, _s in ITERATIONS:
    print(f"   {slug:24s} {a} / {b}")
