#!/usr/bin/env python3
"""
Colony Acres · Early Bird 2026 · Concept B, "Field" · 10 × 1080×1080

A second, quieter route. Concept A reproduced the two-ink poster press
(Colony's own Flash Sale set, Harbaugh's Early Bird set) — deliberately loud and
densely layered. This one is built from the *other* half of the reference
corpus:

  · riamede-farm/Riamede-Fall-Festival-Flash-Sale-1..9  — the closest category
    match that exists (farm fall festival, same tiered-ticket logic). Flat brand
    blocks, a photo held in a soft mask, white rounded price chips carrying a
    before/now pair, a pill CTA, generous empty ground.
  · montpelier-farms/33..38 — photo-forward restraint: one picture, one
    sentence, one badge, nothing else.

The rule that makes it quiet, applied without exception: **headline + one photo
+ at most two chips + CTA + logo.** No texture, no halftone, no stamps, no
vertical rails, no offset echoes. Where Concept A layered, this one leaves room.

The signature shape is the arch — a barn door and a silo, and Colony's own
rather than Riamede's oval or Montpelier's full bleed.
"""

import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "render"
OUT.mkdir(exist_ok=True)
IMG = "../img"
LOGO = f"{IMG}/logo-white.png"

# ── Campaign constants (same as Concept A — see that set's README for status) ──
WINDOW = "Sept 4 – 18"
OPEN_DAY = "September 19"
SEASON = "Sept 19 – Oct 31"
EB = "$12.95"
GATE_WD, GATE_WE = "$13.80", "$15.80"
BUNDLE = "$17.95"
PASS_EB, PASS_REG = "$35.95", "$39.95"

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Zilla+Slab:ital,wght@0,600;0,700;1,700&family=Oswald:wght@400;500;600;700'
    '&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">'
)

BASE = """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1080px; overflow: hidden; }

.ad {
  width: 1080px; height: 1080px; position: relative; overflow: hidden;
  background: #FBF6EC; color: #26201A;
  font-family: 'Open Sans', system-ui, sans-serif;
}
.ad.green { background: #1B5333; color: #FBF6EC; }
.ad.orange { background: #E8743C; color: #FFF6EA; }

/* ── the arch: barn door / silo, this set's one signature shape ── */
.arch {
  position: absolute; overflow: hidden;
  border-radius: 999px 999px 28px 28px;
  background: #DED3BC;
}
.arch.flat { border-radius: 28px; }
.arch img { width: 100%; height: 100%; object-fit: cover; display: block; }

.full { position: absolute; inset: 0; }
.full img { width: 100%; height: 100%; object-fit: cover; display: block; }
.veil { position: absolute; inset: 0; }

/* ── headline lockup: a large word over a smaller contrasting one ── */
.lock { position: absolute; }
.lock .a, .lock .b {
  font-family: 'Zilla Slab', Georgia, serif; font-weight: 700;
  text-transform: uppercase; line-height: 0.9; letter-spacing: -0.015em;
  white-space: nowrap; display: block;
}
.lock .a { font-size: 118px; color: #E8743C; }
.lock .b { font-size: 74px; color: #1B5333; margin-top: 4px; }
.lock.on-dark .a { color: #F6B98E; }
.lock.on-dark .b { color: #FBF6EC; }
.lock.solo .a { color: #1B5333; }

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

/* ── price chip: Riamede's before/now card, in Colony's colours ── */
.chip {
  position: absolute; background: #FFFFFF; border-radius: 20px;
  padding: 22px 28px 24px; box-shadow: 0 14px 34px rgba(38,32,26,0.13);
  text-align: center;
}
.chip .lab {
  font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 20px;
  letter-spacing: 0.13em; text-transform: uppercase; color: #1B5333;
  display: block; margin-bottom: 10px;
}
.chip .now {
  font-family: 'Zilla Slab', serif; font-weight: 700; font-size: 66px;
  line-height: 0.92; color: #E8743C; display: block;
}
.chip .was {
  font-family: 'Oswald', sans-serif; font-weight: 400; font-size: 24px;
  color: #9A8B76; text-decoration: line-through; display: block; margin-top: 8px;
}
.chip .fine {
  font-family: 'Oswald', sans-serif; font-weight: 400; font-size: 17px;
  letter-spacing: 0.06em; color: #9A8B76; display: block; margin-top: 8px;
  text-transform: uppercase;
}
.chip.green { background: #1B5333; }
.chip.green .lab { color: #9BD4AE; }
.chip.green .now { color: #FBF6EC; }
.chip.green .was, .chip.green .fine { color: rgba(251,246,236,0.6); }

/* ── CTA + sign-off ── */
.pill {
  position: absolute; background: #1B5333; color: #FBF6EC;
  padding: 20px 44px; border-radius: 999px;
  font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 26px;
  letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
}
.pill.orange { background: #E8743C; color: #FFF6EA; }
.pill.cream  { background: #FBF6EC; color: #1B5333; }

.mark { position: absolute; }
.mark img { height: 86px; display: block; filter: brightness(0); }
.mark.light img { filter: none; }

.stamp-date {
  position: absolute; font-family: 'Oswald', sans-serif; font-weight: 500;
  font-size: 22px; letter-spacing: 0.14em; text-transform: uppercase; color: #8A7355;
}
.stamp-date.light { color: rgba(251,246,236,0.78); }

.rule { position: absolute; height: 4px; background: #E8743C; border-radius: 2px; }
"""


def page(slug, cls, body):
    (OUT / f"{slug}.html").write_text(
        f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Colony Acres · Early Bird · Concept B · {slug}</title>
{FONTS}<style>{BASE}</style></head><body>
<div class="ad{cls}">
{body}
</div></body></html>""")
    return slug


def mark(style, light=False):
    return f'  <div class="mark{" light" if light else ""}" style="{style}"><img src="{LOGO}" alt="Colony Acres"></div>\n'


# ════════════════════════════════════════════════════════════════════════════
# 01 · OPENS — type left, arch right. The set's establishing layout.
# ════════════════════════════════════════════════════════════════════════════
page("01-early-bird-is-here", "", f"""
  <div class="arch" style="right:0;top:0;width:520px;height:840px;border-radius:0 0 0 320px">
    <img src="{IMG}/girl-pump.jpg" style="object-position:52% 32%" alt="">
  </div>
  <div class="eyebrow" style="position:absolute;left:72px;top:132px">Labor Day → Opening Day</div>
  <div class="lock" style="left:68px;top:176px"><span class="a">Early</span><span class="b">Bird Pricing</span></div>
  <div class="rule" style="left:72px;top:404px;width:96px"></div>
  <div class="say" style="position:absolute;left:72px;top:448px;width:420px">
    The flash sale is over. This is the last window before the gates open —
    buy now, visit any day of the season.
  </div>
  <div class="chip" style="left:72px;top:648px;width:300px">
    <span class="lab">Any-day admission</span>
    <span class="now">{EB}</span>
    <span class="fine">Through Sept 18</span>
  </div>
  <div class="pill" style="left:72px;bottom:96px">Get Tickets</div>
{mark("right:64px;bottom:92px")}
""")

# ════════════════════════════════════════════════════════════════════════════
# 02 · BUNDLE — centred arch, one chip. Montpelier's restraint.
# ════════════════════════════════════════════════════════════════════════════
page("02-bundle-is-back", "", f"""
  <div class="arch" style="left:50%;transform:translateX(-50%);top:96px;width:470px;height:530px">
    <img src="{IMG}/girl-slide.jpg" style="object-position:44% 42%" alt="">
  </div>
  <div class="eyebrow" style="position:absolute;left:0;right:0;top:44px;text-align:center">Labor Day · Limited Run</div>
  <div class="lock" style="left:0;right:0;top:664px;text-align:center">
    <span class="a" style="font-size:104px">The Bundle</span>
    <span class="b" style="font-size:62px">Is Back</span>
  </div>
  <div class="chip" style="right:76px;top:406px;width:262px">
    <span class="lab">Bundle</span>
    <span class="now">{BUNDLE}</span>
    <span class="fine">While they last</span>
  </div>
  <div class="say" style="position:absolute;left:0;right:0;top:872px;text-align:center;font-size:26px">
    Admission · a pumpkin · a slushie · donut holes
  </div>
{mark("left:72px;bottom:76px")}
  <div class="pill" style="right:72px;bottom:74px">Get Tickets</div>
""")

# ════════════════════════════════════════════════════════════════════════════
# 03 · SEASON PASS — deep green ground, single chip
# ════════════════════════════════════════════════════════════════════════════
page("03-one-pass-all-fall", " green", f"""
  <div class="arch" style="right:76px;top:96px;width:410px;height:600px">
    <img src="{IMG}/kids-races.jpg" style="object-position:56% 44%" alt="">
  </div>
  <div class="eyebrow light" style="position:absolute;left:72px;top:128px">Early Bird · Season Pass</div>
  <div class="lock on-dark" style="left:68px;top:172px">
    <span class="a" style="font-size:104px">One Pass.</span>
    <span class="b" style="font-size:104px;color:#F6B98E">All Fall.</span>
  </div>
  <div class="say light" style="position:absolute;left:72px;top:432px;width:390px">
    Unlimited visits, {SEASON}. Fewer than three single-day tickets.
  </div>
  <div class="chip" style="left:72px;top:632px;width:320px">
    <span class="lab">Season pass</span>
    <span class="now">{PASS_EB}</span>
    <span class="was">{PASS_REG}</span>
  </div>
  <div class="pill cream" style="left:72px;bottom:92px">Get Tickets</div>
{mark("right:72px;bottom:88px", light=True)}
""")

# ════════════════════════════════════════════════════════════════════════════
# 04 · BEAT THE GATE — the two-chip before/now, straight off Riamede
# ════════════════════════════════════════════════════════════════════════════
page("04-beat-the-gate", "", f"""
  <div class="arch flat" style="left:0;top:0;width:1080px;height:470px;border-radius:0">
    <img src="{IMG}/barrel-train.jpg" style="object-position:50% 62%" alt="">
  </div>
  <div class="eyebrow" style="position:absolute;left:72px;top:512px">Early Bird · {WINDOW}</div>
  <div class="lock" style="left:68px;top:548px"><span class="a">Beat the gate.</span></div>
  <div class="say" style="position:absolute;left:72px;top:668px;width:560px">
    Buy before {OPEN_DAY} and you keep the lower price, whichever day you visit.
  </div>
  <div class="chip" style="left:72px;top:784px;width:290px">
    <span class="lab">Now · Early Bird</span>
    <span class="now">{EB}</span>
    <span class="fine">Any day</span>
  </div>
  <div class="chip" style="left:396px;top:784px;width:290px;background:#F1E9D6;box-shadow:none">
    <span class="lab" style="color:#8A7355">At the gate</span>
    <span class="now" style="color:#9A8B76">{GATE_WE}</span>
    <span class="fine">Weekend · {GATE_WD} weekday</span>
  </div>
{mark("right:72px;bottom:96px")}
""")

# ════════════════════════════════════════════════════════════════════════════
# 05 · CENTENNIAL — full-bleed maze, one line, nothing else
# ════════════════════════════════════════════════════════════════════════════
page("05-one-hundred-falls", "", f"""
  <div class="full"><img src="{IMG}/colony-100-years-maze.jpg" style="object-position:50% 46%" alt=""></div>
  <div class="veil" style="background:linear-gradient(180deg,rgba(20,45,26,0.72) 0%,rgba(20,45,26,0.12) 40%,rgba(20,45,26,0.28) 66%,rgba(20,45,26,0.86) 100%)"></div>
  <div class="eyebrow light" style="position:absolute;left:0;right:0;top:88px;text-align:center">Est. 1926 · Centennial Year</div>
  <div class="lock on-dark" style="left:0;right:0;top:132px;text-align:center">
    <span class="a" style="font-size:96px;color:#FBF6EC">One Hundred</span>
    <span class="b" style="font-size:96px;color:#F6B98E">Falls</span>
  </div>
  <div class="say light" style="position:absolute;left:0;right:0;bottom:210px;text-align:center;font-size:29px">
    Our hundredth fall opens {OPEN_DAY}.
  </div>
  <div class="pill cream" style="left:50%;transform:translateX(-50%);bottom:106px">Get Tickets</div>
""")

# ════════════════════════════════════════════════════════════════════════════
# 06 · WHAT'S INCLUDED — a quiet list, no chips at all
# ════════════════════════════════════════════════════════════════════════════
page("06-all-included", "", f"""
  <div class="arch" style="right:0;top:0;width:440px;height:1080px;border-radius:260px 0 0 0">
    <img src="{IMG}/corn-box.jpg" style="object-position:58% 50%" alt="">
  </div>
  <div class="eyebrow" style="position:absolute;left:72px;top:128px">One ticket</div>
  <div class="lock" style="left:68px;top:172px">
    <span class="a" style="font-size:104px">All of it,</span>
    <span class="b" style="font-size:66px">included.</span>
  </div>
  <div style="position:absolute;left:72px;top:420px;font-family:'Zilla Slab',serif;font-weight:600;font-size:33px;line-height:1.95;color:#26201A">
    Corn maze<br>Barrel train<br>Giant double slide<br>Duck races<br>Corn box &amp; pumpkin patch
  </div>
  <div class="rule" style="left:72px;top:790px;width:96px"></div>
  <div class="say" style="position:absolute;left:72px;top:828px;width:400px;font-size:27px">
    Free parking, always. Early Bird admission {EB} through Sept 18.
  </div>
{mark("left:72px;bottom:82px")}
""")

# ════════════════════════════════════════════════════════════════════════════
# 07 · FAMILY MATH — one number, big
# ════════════════════════════════════════════════════════════════════════════
page("07-family-math", "", f"""
  <div class="arch" style="left:72px;top:96px;width:420px;height:560px">
    <img src="{IMG}/girl-cheer.jpg" style="object-position:53% 24%" alt="">
  </div>
  <div class="eyebrow" style="position:absolute;right:76px;top:132px;text-align:right;left:540px">Do the fall math</div>
  <div class="lock" style="right:76px;top:176px;text-align:right;left:520px">
    <span class="a" style="font-size:92px">Four in,</span>
    <span class="b" style="font-size:60px">one price.</span>
  </div>
  <div class="chip" style="right:76px;top:404px;width:340px">
    <span class="lab">Four Early Bird tickets</span>
    <span class="now">$51.80</span>
    <span class="was">$63.20 at the weekend gate</span>
  </div>
  <div class="say" style="position:absolute;right:76px;top:648px;left:520px;text-align:right">
    You keep $11.40 — about four cups of donut holes.
  </div>
  <div class="pill" style="right:76px;bottom:200px">Get Tickets</div>
  <div class="say" style="position:absolute;left:72px;bottom:120px;font-size:25px">
    Ages 3 &amp; up · {WINDOW}
  </div>
{mark("right:76px;bottom:92px")}
""")

# ════════════════════════════════════════════════════════════════════════════
# 08 · OPENING DAY — the date, and almost nothing else
# ════════════════════════════════════════════════════════════════════════════
page("08-opening-day", " green", f"""
  <div class="eyebrow light" style="position:absolute;left:0;right:0;top:150px;text-align:center">The gates open</div>
  <div class="lock on-dark" style="left:0;right:0;top:198px;text-align:center">
    <span class="a" style="font-size:210px;color:#FBF6EC;line-height:0.86">Sept 19</span>
  </div>
  <div class="say light" style="position:absolute;left:0;right:0;top:434px;text-align:center;font-size:29px">
    Wednesday through Sunday, {SEASON}.
  </div>
  <!-- Wider than the source's 4:3 so object-fit has vertical slack to crop with;
       at 560x430 the ratios matched and the frame filled with foreground lawn. -->
  <div class="arch" style="left:50%;transform:translateX(-50%);bottom:0;width:660px;height:410px;border-radius:330px 330px 0 0">
    <img src="{IMG}/img2970.jpg" style="object-position:50% 30%" alt="">
  </div>
  <div class="chip green" style="left:76px;bottom:150px;width:250px;border:3px solid rgba(251,246,236,0.28)">
    <span class="lab">Buy before</span>
    <span class="now" style="font-size:52px">{EB}</span>
  </div>
{mark("right:64px;bottom:60px", light=True)}
""")

# ════════════════════════════════════════════════════════════════════════════
# 09 · LAST WEEK — full-bleed, one sentence
# ════════════════════════════════════════════════════════════════════════════
page("09-last-week", "", f"""
  <div class="full"><img src="{IMG}/girl-slide.jpg" style="object-position:42% 40%" alt=""></div>
  <div class="veil" style="background:linear-gradient(180deg,rgba(27,83,51,0.10) 0%,rgba(27,83,51,0.06) 42%,rgba(20,45,26,0.80) 76%,rgba(20,45,26,0.94) 100%)"></div>
  <div class="lock on-dark" style="left:72px;bottom:330px">
    <span class="a" style="font-size:104px;color:#FBF6EC">Last week</span>
    <span class="b" style="font-size:62px;color:#F6B98E">of Early Bird</span>
  </div>
  <div class="say light" style="position:absolute;left:72px;bottom:214px;width:520px;font-size:28px">
    On {OPEN_DAY} the price steps up to the gate — and stays there all season.
  </div>
  <div class="pill orange" style="left:72px;bottom:98px">Get Tickets</div>
  <div class="stamp-date light" style="right:72px;bottom:118px">Through Sept 18</div>
""")

# ════════════════════════════════════════════════════════════════════════════
# 10 · CLOSES — orange ground, the price ladder as the whole ad
# ════════════════════════════════════════════════════════════════════════════
page("10-price-goes-up", " orange", f"""
  <div class="eyebrow" style="position:absolute;left:72px;top:128px;color:rgba(255,246,234,0.78)">Early Bird ends Sept 18</div>
  <div class="lock" style="left:68px;top:172px">
    <span class="a" style="font-size:104px;color:#FFF6EA">Then the</span>
    <span class="b" style="font-size:104px;color:#2E1608">price goes up.</span>
  </div>
  <div class="chip" style="left:72px;top:468px;width:280px">
    <span class="lab">Now</span>
    <span class="now">{EB}</span>
    <span class="fine">Any day</span>
  </div>
  <div style="position:absolute;left:396px;top:556px;font-family:'Zilla Slab',serif;font-weight:700;font-size:56px;color:rgba(255,246,234,0.85)">&rarr;</div>
  <div class="chip" style="left:494px;top:468px;width:280px;background:rgba(255,246,234,0.16);box-shadow:none">
    <span class="lab" style="color:#FFF6EA">From Sept 19</span>
    <span class="now" style="color:#FFF6EA">{GATE_WE}</span>
    <span class="fine" style="color:rgba(255,246,234,0.72)">Weekend at the gate</span>
  </div>
  <div class="arch" style="right:-60px;bottom:-60px;width:420px;height:420px;border-radius:999px">
    <img src="{IMG}/barrel-cab.jpg" style="object-position:50% 46%" alt="">
  </div>
  <div class="pill cream" style="left:72px;bottom:104px">Get Tickets</div>
{mark("left:72px;bottom:206px", light=True)}
""")

slugs = sorted(p.stem for p in OUT.glob("[0-9]*.html"))
print(f"built {len(slugs)} artboards → {OUT}")
for s in slugs:
    print("  ", s)
