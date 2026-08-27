#!/usr/bin/env python3
"""
Colony Acres · Early Bird 2026 · Meta static set (10 × 1080×1080)

EARLY BIRD, for this account, is the Labor Day sale — Bryan, 5/21 strategy call:
"our four tiers ... lead-up, flash sale, early bird, which for you early bird is
before doors open, which is going to be our Labor Day sale." It is the sustain
push between the flash sale closing (Aug 31) and the gates opening (Sept 19),
and it exists because "flash sales are great until they're over, and then you
freaking bottom out until the day before your event starts."

Two rules fall out of that and drive every line of copy here:

  1. Early Bird is NOT the best price of the season. Bryan: "I don't want to
     relaunch flash sale pricing. I want to protect that as the best price
     you're going to get in season." So nothing below claims a season-low.
  2. The job is to train the audience — "if you want a deal, you buy early. If
     you don't, in season, that's what you get." So the recurring beat is the
     price ladder and the closing window, not a discount percentage.

The visual system is Crowd7's shipped poster style, read off
marketing/fb-ad-reference-corpus (Colony's own Flash Sale set + Harbaugh's
Early Bird set): two-ink riso on cream stock, enormous distressed display type,
a halftoned cutout printed between the type lines with a mis-registered orange
echo behind it, a rubber-stamp badge, a vertical attractions rail, and orange
tag bars along the bottom. The display face is Colony's own Zilla Slab rather
than Harbaugh's western slab — house system, this account's typography.
"""

import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "render"
OUT.mkdir(exist_ok=True)
ART = "../art"
LOGO = "../../fall-harvest-festival-2026/img/logo-white.png"

# ── Campaign constants ──────────────────────────────────────────────────────
WINDOW = "Sept 4 – 18"          # Labor Day weekend → the day before doors open
OPEN_DAY = "September 19"
SEASON = "Sept 19 – Oct 31, 2026"
EB_ADMISSION = "$12.95"         # PROPOSED — above every flash price, below every gate price
GATE_WD, GATE_WE = "$13.80", "$15.80"
BUNDLE = "$17.95"               # Bryan: "same inclusions we did for 17"
PASS_EB, PASS_REG = "$35.95", "$39.95"   # PROPOSED discount off the assumed regular

RAIL = "Corn maze, barrel train, giant slide, duck races, pumpkin patch, and more!"

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Zilla+Slab:ital,wght@0,600;0,700;1,600;1,700&family=Oswald:wght@400;500;600;700'
    '&family=Caveat:wght@700&display=swap" rel="stylesheet">'
)

# ── The press: paper, ink, distress ─────────────────────────────────────────
BASE = """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1080px; overflow: hidden; background: #EDE5D4; }

.ad {
  width: 1080px; height: 1080px; position: relative; overflow: hidden;
  background: #EDE5D4;
  font-family: 'Oswald', sans-serif; color: #1A1612;
}

/* Cream stock: a fibre tint plus a finer speckle, both dialled low enough to
   read as paper rather than as a texture effect. */
.paper, .speck { position: absolute; inset: -40px; pointer-events: none; }
.paper { filter: url(#fibre); opacity: 0.38; }
.speck { filter: url(#speckle); opacity: 0.22; mix-blend-mode: multiply; }

.layer { position: absolute; inset: 0; }

/* ── display type ── */
.head {
  font-family: 'Zilla Slab', Georgia, serif; font-weight: 700;
  text-transform: uppercase; line-height: 0.82; letter-spacing: -0.022em;
  white-space: nowrap;   /* a wrapped display line silently collides with the next */
  color: #1A1612; filter: url(#erode);
}
.head.orange { color: #E8743C; }
.head.green  { color: #185C2E; }
.head.cream  { color: #EDE5D4; }
.head em { font-style: italic; }

.script {
  font-family: 'Caveat', cursive; font-weight: 700; color: #E8743C;
  line-height: 0.9; filter: url(#erode-soft);
}

/* ── plates ── */
.plate, .echo { position: absolute; }
.echo { opacity: 0.85; }

/* ── rubber stamp ── */
.stamp {
  position: absolute; width: 214px; height: 214px; border-radius: 50%;
  border: 4px solid #E8743C; color: #E8743C;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; font-weight: 700; font-size: 27px; line-height: 1.02;
  letter-spacing: 0.03em; text-transform: uppercase;
  filter: url(#erode); opacity: 0.92;
}
.stamp.ink { border-color: #1A1612; color: #1A1612; }
.stamp small { display: block; font-weight: 500; font-size: 16px; letter-spacing: 0.14em; margin-top: 5px; }

/* ── vertical attractions rail ── */
.rail {
  position: absolute; right: 26px; top: 50%; transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl; font-family: 'Zilla Slab', serif; font-style: italic;
  font-weight: 600; font-size: 25px; letter-spacing: 0.012em; color: #1A1612;
  max-height: 940px; opacity: 0.9;
}
.rail.cream { color: #EDE5D4; }

/* ── bottom furniture ── */
.foot {
  position: absolute; left: 54px; right: 54px; bottom: 46px;
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
}
.tag {
  background: #E8743C; color: #FFF6E8; padding: 11px 22px 12px;
  font-weight: 600; font-size: 23px; letter-spacing: 0.03em;
  filter: url(#erode-soft); white-space: nowrap;
}
.tag.ink { background: #1A1612; color: #EDE5D4; }
.tag.hollow { background: transparent; color: #1A1612; box-shadow: inset 0 0 0 3px #1A1612; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: #1A1612; opacity: 0.55; flex-shrink: 0; }
.foot img.logo { height: 74px; filter: brightness(0); }
.foot img.logo.cream { filter: brightness(0) invert(1); }
.getit {
  font-family: 'Zilla Slab', serif; font-style: italic; font-weight: 700;
  font-size: 27px; color: #1A1612; margin-left: auto; white-space: nowrap;
}
.getit.cream { color: #EDE5D4; }

/* ── misc ── */
.kick {
  font-weight: 600; font-size: 22px; letter-spacing: 0.2em; text-transform: uppercase;
  color: #8A6A4A;
}
.kick.cream { color: rgba(237,229,212,0.8); }
.body {
  font-family: 'Zilla Slab', serif; font-weight: 600; font-size: 29px;
  line-height: 1.34; color: #3A2E22;
}
.body.cream { color: rgba(237,229,212,0.94); }
.price-lg { font-weight: 700; font-size: 132px; line-height: 0.86; color: #E8743C; filter: url(#erode); }
.incl { list-style: none; }
.incl li {
  font-weight: 600; font-size: 26px; line-height: 1.85; padding-left: 34px; position: relative;
}
.incl li::before {
  content: ''; position: absolute; left: 0; top: 0.62em;
  width: 17px; height: 6px; background: #E8743C; filter: url(#erode-soft);
}
.strike { position: relative; opacity: 0.5; }
.strike::after {
  content: ''; position: absolute; left: -4%; right: -4%; top: 52%;
  height: 5px; background: currentColor; transform: rotate(-4deg);
}
"""

# Paper grain, speckle and letterpress erosion. Kept as one defs block reused by
# every artboard so the whole set prints on visibly the same stock.
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


def page(slug, body, extra=""):
    (OUT / f"{slug}.html").write_text(
        f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Colony Acres · Early Bird 2026 · {slug}</title>
{FONTS}<style>{BASE}{extra}</style></head><body>
{DEFS}
<div class="ad">
  <div class="paper"></div>
{body}
  <div class="speck"></div>
</div>
</body></html>""")
    return slug


def plate(name, style, echo_style=None):
    """Cutout plus its mis-registered orange echo, printed behind."""
    out = ""
    if echo_style:
        out += f'  <img class="echo" src="{ART}/{name}-echo.png" style="{echo_style}" alt="">\n'
    out += f'  <img class="plate" src="{ART}/{name}.png" style="{style}" alt="">\n'
    return out


def foot(tags, cream=False, getit="Get Tickets!"):
    c = " cream" if cream else ""
    bits = []
    for i, t in enumerate(tags):
        if i:
            bits.append('<span class="dot"></span>')
        bits.append(t)
    return (f'  <div class="foot">{"".join(bits)}'
            f'<img class="logo{c}" src="{LOGO}" alt="Colony Acres">'
            f'<span class="getit{c}">{getit}</span></div>\n')


# ════════════════════════════════════════════════════════════════════════════
# 01 · OPENS — the flash sale ended; this window did not
# ════════════════════════════════════════════════════════════════════════════
page("01-early-bird-is-here", f"""
  <div class="script" style="position:absolute;left:56px;top:52px;font-size:96px">Missed the flash sale?</div>
  <div class="head" style="position:absolute;left:50px;top:150px;font-size:186px">Early</div>
  <div class="head orange" style="position:absolute;left:50px;top:300px;font-size:186px">Bird</div>
{plate("girl-pump", "left:498px;top:196px;width:560px",
       "left:530px;top:214px;width:560px")}
  <div class="head" style="position:absolute;left:50px;top:452px;font-size:186px;z-index:3">Pricing</div>
  <div class="body" style="position:absolute;left:54px;top:648px;width:430px;z-index:3">
    The season's best price is gone — but you can still beat the gate.
    Buy before we open {OPEN_DAY}.
  </div>
  <div class="stamp" style="right:52px;top:44px;transform:rotate(-13deg)">Early Bird<small>Pricing</small></div>
  <div class="rail">{RAIL}</div>
{foot([f'<span class="tag">{WINDOW}</span>',
       f'<span class="tag hollow">Admission {EB_ADMISSION}</span>'])}
""")

# ════════════════════════════════════════════════════════════════════════════
# 02 · THE BUNDLE IS BACK — the hero offer, limited run
# ════════════════════════════════════════════════════════════════════════════
page("02-bundle-is-back", f"""
  <div class="kick" style="position:absolute;left:56px;top:54px">Labor Day · Limited Run</div>
  <div class="head" style="position:absolute;left:50px;top:96px;font-size:152px">The Bundle</div>
  <div class="head orange" style="position:absolute;left:50px;top:228px;font-size:152px">Is Back</div>
{plate("girl-slide", "left:560px;top:300px;width:470px",
       "left:596px;top:322px;width:470px")}
  <div class="body" style="position:absolute;left:56px;top:432px;width:470px">
    The Launch Day favorite, reopened for Labor Day — and capped again.
  </div>
  <ul class="incl" style="position:absolute;left:56px;top:528px">
    <li>Any-day admission</li>
    <li>A pumpkin to take home</li>
    <li>Lemonade or slushie</li>
    <li>A cup of donut holes</li>
  </ul>
  <div class="price-lg" style="position:absolute;left:52px;top:780px">{BUNDLE}</div>
  <div class="stamp" style="left:330px;top:632px;transform:rotate(11deg)">Limited<small>Quantity</small></div>
{foot([f'<span class="tag">{WINDOW}</span>',
       '<span class="tag ink">While they last</span>'])}
""")

# ════════════════════════════════════════════════════════════════════════════
# 03 · SEASON PASS — the sustain play
# ════════════════════════════════════════════════════════════════════════════
page("03-one-pass-all-fall", f"""
  <div class="head" style="position:absolute;left:50px;top:74px;font-size:168px">One Pass.</div>
  <div class="head orange" style="position:absolute;left:50px;top:220px;font-size:168px">All Fall.</div>
{plate("kids-races", "left:430px;top:430px;width:650px",
       "left:466px;top:452px;width:650px")}
  <div class="body" style="position:absolute;left:56px;top:400px;width:340px;z-index:3">
    Unlimited visits, {SEASON}. Come back every weekend for less than three
    single-day tickets.
  </div>
  <div style="position:absolute;left:56px;bottom:160px;display:flex;align-items:baseline;gap:20px;z-index:3">
    <span class="price-lg" style="font-size:118px">{PASS_EB}</span>
    <span class="strike" style="font-weight:600;font-size:44px;color:#1A1612">{PASS_REG}</span>
  </div>
  <div class="stamp ink" style="left:56px;bottom:290px;transform:rotate(-9deg)">Early Bird<small>Season Pass</small></div>
{foot([f'<span class="tag">Ends {OPEN_DAY}</span>',
       '<span class="tag hollow">Unlimited visits</span>'])}
""")

# ════════════════════════════════════════════════════════════════════════════
# 04 · BEAT THE GATE — the price-ladder ad, the campaign's core argument
# ════════════════════════════════════════════════════════════════════════════
page("04-beat-the-gate", f"""
  <div class="head" style="position:absolute;left:50px;top:70px;font-size:200px">Beat</div>
  <div class="head orange" style="position:absolute;left:50px;top:236px;font-size:176px">The Gate</div>
{plate("barrel-cab", "left:472px;top:404px;width:600px",
       "left:508px;top:426px;width:600px")}
  <div class="body" style="position:absolute;left:56px;top:428px;width:390px;z-index:3">
    Buy before the gates open and you keep the lower price — no matter which
    day you actually visit.
  </div>
  <div style="position:absolute;left:56px;top:610px;z-index:3">
    <div style="display:flex;align-items:baseline;gap:16px">
      <span class="price-lg" style="font-size:112px">{EB_ADMISSION}</span>
      <span style="font-weight:600;font-size:25px;letter-spacing:.14em;text-transform:uppercase">Now</span>
    </div>
    <div style="margin-top:16px;font-weight:600;font-size:27px;line-height:1.5;color:#3A2E22">
      <span class="strike">{GATE_WD}</span> weekday at the gate<br>
      <span class="strike">{GATE_WE}</span> weekend at the gate
    </div>
  </div>
  <div class="rail">{RAIL}</div>
{foot([f'<span class="tag">Through {OPEN_DAY}</span>',
       '<span class="tag hollow">Free parking, always</span>'])}
""")

# ════════════════════════════════════════════════════════════════════════════
# 05 · CENTENNIAL — the brand beat, printed green on the aerial maze
# ════════════════════════════════════════════════════════════════════════════
page("05-one-hundred-falls", f"""
{plate("maze-aerial", "left:-90px;top:250px;width:1270px;opacity:.95", None)}
  <div class="layer" style="background:linear-gradient(180deg,#EDE5D4 30%,rgba(237,229,212,0.55) 46%,rgba(237,229,212,0) 62%)"></div>
  <div class="kick" style="position:absolute;left:56px;top:56px">Est. 1926 · Centennial Year</div>
  <div class="head green" style="position:absolute;left:50px;top:104px;font-size:136px">One Hundred</div>
  <div class="head orange" style="position:absolute;left:50px;top:224px;font-size:182px">Falls</div>
  <div class="body" style="position:absolute;left:56px;top:404px;width:520px">
    A century of families finding their way through this field. Our hundredth
    fall opens {OPEN_DAY} — come walk it.
  </div>
  <div class="stamp" style="right:54px;top:52px;transform:rotate(9deg)">100<small>Years</small></div>
{foot([f'<span class="tag">{SEASON}</span>',
       f'<span class="tag ink">Early Bird {EB_ADMISSION}</span>'], cream=True,
      getit="Get Tickets!")}
""")

# ════════════════════════════════════════════════════════════════════════════
# 06 · WHAT'S INSIDE — the value/attractions beat
# ════════════════════════════════════════════════════════════════════════════
page("06-twenty-ways-to-play", f"""
  <div class="head" style="position:absolute;left:50px;top:62px;font-size:178px">Twenty</div>
  <div class="head" style="position:absolute;left:50px;top:206px;font-size:178px">Ways</div>
  <div class="head orange" style="position:absolute;left:50px;top:350px;font-size:178px">To Play</div>
{plate("girl-cheer", "right:44px;bottom:150px;width:452px",
       "right:12px;bottom:132px;width:452px")}
  <div class="body" style="position:absolute;left:56px;top:560px;width:440px">
    Corn maze, barrel train, giant double slide, duck races, corn box, pumpkin
    patch — every one of them included with admission.
  </div>
  <div class="script" style="position:absolute;left:56px;top:726px;font-size:78px">One ticket. All of it.</div>
  <div class="stamp ink" style="right:58px;top:58px;transform:rotate(-7deg);width:186px;height:186px;font-size:23px">
    Included<small>With Admission</small></div>
{foot([f'<span class="tag">{WINDOW}</span>',
       f'<span class="tag hollow">{EB_ADMISSION} any day</span>'])}
""")

# ════════════════════════════════════════════════════════════════════════════
# 07 · FAMILY MATH — four tickets, one decision
# ════════════════════════════════════════════════════════════════════════════
page("07-family-math", f"""
  <div class="kick" style="position:absolute;left:56px;top:54px">Do the fall math</div>
  <div class="head" style="position:absolute;left:50px;top:100px;font-size:122px">Four Tickets,</div>
  <div class="head orange" style="position:absolute;left:50px;top:212px;font-size:152px">One Trip</div>
{plate("kids-races", "right:-40px;bottom:128px;width:600px",
       "right:-76px;bottom:106px;width:600px")}
  <div style="position:absolute;left:56px;top:378px;width:430px;z-index:3">
    <div style="font-weight:600;font-size:29px;line-height:1.62;color:#3A2E22">
      Four Early Bird tickets<br>
      <span style="opacity:.62">Four at the weekend gate</span>
    </div>
    <div style="display:flex;align-items:baseline;gap:18px;margin-top:14px">
      <span class="price-lg" style="font-size:108px">$51<span style="font-size:56px">.80</span></span>
      <span class="strike" style="font-weight:600;font-size:40px;color:#1A1612">$63.20</span>
    </div>
    <div style="margin-top:12px;font-weight:600;font-size:26px;color:#E8743C">
      You keep $11.40 — about four cups of donut holes.
    </div>
  </div>
  <div class="stamp" style="left:56px;bottom:150px;transform:rotate(12deg)">Buy<small>Before 9/19</small></div>
{foot([f'<span class="tag">{WINDOW}</span>',
       '<span class="tag hollow">Ages 3 &amp; up</span>'])}
""")

# ════════════════════════════════════════════════════════════════════════════
# 08 · OPENING DAY — anticipation, dark plate for contrast in the feed
# ════════════════════════════════════════════════════════════════════════════
page("08-opening-day", f"""
  <div class="layer" style="background:#185C2E"></div>
  <div class="paper" style="opacity:.16;mix-blend-mode:screen"></div>
{plate("girl-slide", "right:-30px;bottom:120px;width:560px;opacity:.96",
       "right:6px;bottom:98px;width:560px")}
  <div class="kick cream" style="position:absolute;left:56px;top:58px">The gates open</div>
  <div class="head cream" style="position:absolute;left:50px;top:104px;font-size:200px">Sept</div>
  <div class="head orange" style="position:absolute;left:50px;top:266px;font-size:200px">19</div>
  <div class="body cream" style="position:absolute;left:56px;top:492px;width:430px">
    Six weeks of fall, Wednesday through Sunday, through October 31.
    Buy at Early Bird pricing before opening day and save.
  </div>
  <div class="script" style="position:absolute;left:56px;top:672px;font-size:86px;color:#F2C66A">Mark it down.</div>
  <div class="stamp" style="right:56px;top:52px;transform:rotate(-11deg);border-color:#F2C66A;color:#F2C66A">
    Early Bird<small>Ends 9/18</small></div>
  <div class="rail cream">{RAIL}</div>
{foot([f'<span class="tag">{SEASON}</span>',
       f'<span class="tag ink" style="background:#EDE5D4;color:#185C2E">{EB_ADMISSION} now</span>'],
      cream=True)}
""")

# ════════════════════════════════════════════════════════════════════════════
# 09 · LAST WEEK — urgency, retargeting
# ════════════════════════════════════════════════════════════════════════════
page("09-last-week", f"""
  <div class="head" style="position:absolute;left:50px;top:78px;font-size:170px">Last Week</div>
  <div class="head orange" style="position:absolute;left:50px;top:220px;font-size:112px"><em>of Early Bird</em></div>
{plate("girl-pump", "right:-48px;bottom:126px;width:520px",
       "right:-12px;bottom:104px;width:520px")}
  <div class="body" style="position:absolute;left:56px;top:392px;width:410px;z-index:3">
    This is the last discounted window before opening day. On {OPEN_DAY} the
    price steps up to the gate — and stays there all season.
  </div>
  <div style="position:absolute;left:56px;top:672px;display:flex;align-items:baseline;gap:20px;z-index:3">
    <span class="price-lg" style="font-size:120px">{EB_ADMISSION}</span>
    <span style="font-weight:600;font-size:34px;color:#1A1612">&rarr;</span>
    <span class="strike" style="font-weight:600;font-size:52px;color:#1A1612">{GATE_WE}</span>
  </div>
{foot([f'<span class="tag">Through Sept 18</span>',
       '<span class="tag ink">Then gate price</span>'])}
""")

# ════════════════════════════════════════════════════════════════════════════
# 10 · CLOSES — the final beat, orange flood
# ════════════════════════════════════════════════════════════════════════════
page("10-when-the-gates-open", f"""
  <div class="layer" style="background:#E8743C"></div>
  <div class="paper" style="opacity:.2;mix-blend-mode:multiply"></div>
{plate("barrel-cab", "left:-40px;bottom:118px;width:640px;opacity:.9", None)}
  <div class="head cream" style="position:absolute;left:50px;top:82px;font-size:158px;z-index:3">When The</div>
  <div class="head cream" style="position:absolute;left:50px;top:200px;font-size:142px;z-index:3">Gates Open,</div>
  <div class="head" style="position:absolute;left:50px;top:322px;font-size:150px;color:#1A1612;z-index:3">The Price</div>
  <div class="head" style="position:absolute;left:50px;top:448px;font-size:150px;color:#1A1612;z-index:3">Goes Up.</div>
  <div class="body cream" style="position:absolute;right:56px;bottom:186px;width:420px;text-align:right;z-index:3">
    Early Bird closes the night before we open. Last chance at {EB_ADMISSION} —
    after that it's {GATE_WD} weekday, {GATE_WE} weekend, every day of the season.
  </div>
  <div class="stamp" style="right:56px;top:56px;transform:rotate(-14deg);border-color:#EDE5D4;color:#EDE5D4">
    Last<small>Chance</small></div>
{foot(['<span class="tag ink">Ends Sept 18</span>',
       f'<span class="tag" style="background:#EDE5D4;color:#E8743C">Buy at {EB_ADMISSION}</span>'],
      cream=True)}
""")

slugs = sorted(p.stem for p in OUT.glob("[0-9]*.html"))
print(f"built {len(slugs)} artboards → {OUT}")
for s in slugs:
    print("  ", s)
