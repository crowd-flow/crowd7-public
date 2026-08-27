#!/usr/bin/env python3
"""
Colony Acres · Early Bird 2026 · Press hero — 5 background variants

Mat picked Concept A board 01 ("Early Bird Pricing") off the Concept B review
page and asked for it again with three changes, everything else held identical:

  1. Drop the body paragraph ("The season's best price is gone…").
  2. Put the logo in that gap instead — the footer one was far too small.
  3. Swap the photograph, and give him five variants that differ only in it.

On (2): the footer logo looked tiny because `logo-white.png` is a 4167×4168
canvas whose artwork occupies only a 3358×1157 band in the middle — so a
`height: 74px` rule was actually drawing the mark about 20px tall. This set uses
`logo-white-trim.png` (the same file cropped to its alpha bounding box), which
is why it now scales honestly. The footer lockup is dropped entirely rather than
repeated, since the large mark in the gap replaces it.

Everything else — paper, inks, erosion filters, type sizes, script line, stamp,
rail, tag bars — is a verbatim copy of the approved Concept A press, deliberately
duplicated rather than imported so that later edits to that set cannot silently
restyle approved creative.
"""

import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "render"
OUT.mkdir(exist_ok=True)
ART = "../../early-bird-2026/art"
LOGO = "../../fall-harvest-festival-2026/img/logo-white-trim.png"

WINDOW = "Sept 4 – 18"
EB_ADMISSION = "$12.95"
RAIL = "Corn maze, barrel train, giant slide, duck races, pumpkin patch, and more!"

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Zilla+Slab:ital,wght@0,600;0,700;1,600;1,700&family=Oswald:wght@400;500;600;700'
    '&family=Caveat:wght@700&display=swap" rel="stylesheet">'
)

# ── verbatim from early-bird-2026/src/build.py ──────────────────────────────
BASE = """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1080px; overflow: hidden; background: #EDE5D4; }

.ad {
  width: 1080px; height: 1080px; position: relative; overflow: hidden;
  background: #EDE5D4;
  font-family: 'Oswald', sans-serif; color: #1A1612;
}

.paper, .speck { position: absolute; inset: -40px; pointer-events: none; }
.paper { filter: url(#fibre); opacity: 0.38; }
.speck { filter: url(#speckle); opacity: 0.22; mix-blend-mode: multiply; }

.head {
  font-family: 'Zilla Slab', Georgia, serif; font-weight: 700;
  text-transform: uppercase; line-height: 0.82; letter-spacing: -0.022em;
  white-space: nowrap;
  color: #1A1612; filter: url(#erode);
}
.head.orange { color: #E8743C; }

.script {
  font-family: 'Caveat', cursive; font-weight: 700; color: #E8743C;
  line-height: 0.9; filter: url(#erode-soft);
}

.plate, .echo { position: absolute; }
.echo { opacity: 0.85; }

.stamp {
  position: absolute; width: 214px; height: 214px; border-radius: 50%;
  border: 4px solid #E8743C; color: #E8743C;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; font-weight: 700; font-size: 27px; line-height: 1.02;
  letter-spacing: 0.03em; text-transform: uppercase;
  filter: url(#erode); opacity: 0.92;
}
.stamp small { display: block; font-weight: 500; font-size: 16px; letter-spacing: 0.14em; margin-top: 5px; }

.rail {
  position: absolute; right: 26px; top: 50%; transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl; font-family: 'Zilla Slab', serif; font-style: italic;
  font-weight: 600; font-size: 25px; letter-spacing: 0.012em; color: #1A1612;
  max-height: 940px; opacity: 0.9;
  /* The landscape variants bleed a plate under the rail; a paper-coloured halo
     keeps it legible over dark ink without changing how it reads on bare stock. */
  text-shadow: 0 0 7px #EDE5D4, 0 0 14px #EDE5D4, 0 0 3px #EDE5D4;
}

.foot {
  position: absolute; left: 54px; right: 54px; bottom: 46px;
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
}
.tag {
  background: #E8743C; color: #FFF6E8; padding: 11px 22px 12px;
  font-weight: 600; font-size: 23px; letter-spacing: 0.03em;
  filter: url(#erode-soft); white-space: nowrap;
}
.tag.hollow { background: transparent; color: #1A1612; box-shadow: inset 0 0 0 3px #1A1612; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: #1A1612; opacity: 0.55; flex-shrink: 0; }
.getit {
  font-family: 'Zilla Slab', serif; font-style: italic; font-weight: 700;
  font-size: 27px; color: #1A1612; margin-left: auto; white-space: nowrap;
}

/* NEW — the large mark that replaces the dropped paragraph. Trimmed artwork, so
   the height rule is the height you actually see. */
.bigmark { position: absolute; left: 52px; top: 656px; width: 402px; filter: brightness(0); }
.bigmark img { width: 100%; display: block; }
"""

DEFS = """
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="fibre" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="4" seed="11"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.47  0 0 0 0 0.36  0 0 0 0.5 0"/>
  </filter>
  <filter id="speckle" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="5"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0.42 0"/>
  </filter>
  <filter id="erode">
    <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" seed="3" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="5.5"
                       xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="erode-soft">
    <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" seed="9" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3"
                       xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs></svg>
"""

# ── the only thing that varies between the five ─────────────────────────────
# Each plate has its own aspect ratio, so each gets its own box rather than one
# shared rule — a wide plate at the portrait geometry floats undersized against a
# headline stack this tall. The three landscape subjects are therefore scaled past
# the right edge and allowed to bleed, which fills the zone the original portrait
# photograph held. Left edges stay at 452+ so nothing crowds the new logo (which
# ends at x 454). The echo keeps Concept A's +32 / +18 mis-registration throughout.
VARIANTS = [
    ("01-girl-slide",  "girl-slide",  "left:502px;top:206px;width:548px"),
    ("02-kids-races",  "kids-races",  "left:460px;top:298px;width:760px"),
    # Uses this set's own art/ — the shared plate is two barrels wide and the
    # canvas cut landed mid-wordmark, so it's cropped to a single barrel here.
    ("03-barrel-cab",  "barrel-cab",  "left:470px;top:272px;width:614px", "../art"),
    ("04-maze-aerial", "maze-aerial", "left:458px;top:296px;width:744px"),
    ("05-girl-cheer",  "girl-cheer",  "left:498px;top:200px;width:566px"),
]


def offset(style, dx=32, dy=18):
    """Shift a plate's box to make its mis-registered echo."""
    out = []
    for part in style.split(";"):
        k, _, v = part.partition(":")
        if k in ("left", "top"):
            v = f"{int(v.rstrip('px')) + (dx if k == 'left' else dy)}px"
        out.append(f"{k}:{v}")
    return ";".join(out)


for slug, plate, box, *art_override in VARIANTS:
    art = art_override[0] if art_override else ART
    body = f"""
  <div class="script" style="position:absolute;left:56px;top:52px;font-size:96px">Missed the flash sale?</div>
  <div class="head" style="position:absolute;left:50px;top:150px;font-size:186px">Early</div>
  <div class="head orange" style="position:absolute;left:50px;top:300px;font-size:186px">Bird</div>
  <img class="echo" src="{art}/{plate}-echo.png" style="{offset(box)}" alt="">
  <img class="plate" src="{art}/{plate}.png" style="{box}" alt="">
  <div class="head" style="position:absolute;left:50px;top:452px;font-size:186px;z-index:3">Pricing</div>
  <div class="bigmark"><img src="{LOGO}" alt="Colony Acres"></div>
  <div class="stamp" style="right:52px;top:44px;transform:rotate(-13deg)">Early Bird<small>Pricing</small></div>
  <div class="rail">{RAIL}</div>
  <div class="foot">
    <span class="tag">{WINDOW}</span>
    <span class="dot"></span>
    <span class="tag hollow">Admission {EB_ADMISSION}</span>
    <span class="getit">Get Tickets!</span>
  </div>
"""
    (OUT / f"{slug}.html").write_text(
        f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Colony Acres · Early Bird press hero · {slug}</title>
{FONTS}<style>{BASE}</style></head><body>
{DEFS}
<div class="ad">
  <div class="paper"></div>
{body}
  <div class="speck"></div>
</div>
</body></html>""")

print(f"built {len(VARIANTS)} variants → {OUT}")
for slug, plate, *_ in VARIANTS:
    print(f"   {slug:16s} {plate}")
