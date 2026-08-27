#!/usr/bin/env python3
"""
Colony Acres · Annual Fall Festival 2026 · Meta static ad creative set (10)

Design system lifted 1:1 from the live TicketSpice page
  ../../ticketspice-pages/fall-harvest-festival/production/fall-harvest-festival-2026.html
so the ads, the landing page, and the farm's own site read as one campaign.

  Palette   barn green #009A4D / deep green #1F5C2E / warm orange #E8743C
            cream #FBF6EC / centennial gold #F2C66A + #C19A47 / ink #2A1A0E
  Type      Zilla Slab (display serif) · Oswald (condensed caps) ·
            Open Sans (body) · Caveat (centennial script, always gold)

Emits 10 standalone 1080x1080 HTML artboards into ../render/ plus an index
contact sheet. Render to PNG with render.sh.
"""

import os
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "render"
OUT.mkdir(exist_ok=True)

# ── Shared design system ────────────────────────────────────────────────────
BASE = """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body { width: 1080px; height: 1080px; overflow: hidden; background: #2A1A0E; }

.ad {
  width: 1080px; height: 1080px; position: relative; overflow: hidden;
  font-family: 'Open Sans', -apple-system, sans-serif;
  color: #2A1A0E; background: #FBF6EC;
}

/* ── photographic bed ── */
.bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
.scrim { position: absolute; inset: 0; }
.scrim-bottom {
  background: linear-gradient(to bottom,
    rgba(31,69,36,0.10) 0%, rgba(42,26,14,0.30) 38%,
    rgba(31,69,36,0.86) 78%, rgba(31,69,36,0.96) 100%);
}
.scrim-full {
  background: linear-gradient(150deg,
    rgba(31,69,36,0.90) 0%, rgba(31,69,36,0.74) 45%, rgba(42,26,14,0.80) 100%);
}
.scrim-side {
  background: linear-gradient(to right,
    rgba(31,69,36,0.95) 0%, rgba(31,69,36,0.88) 42%,
    rgba(31,69,36,0.35) 68%, rgba(31,69,36,0.06) 100%);
}

.stage { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; }

/* ── top banner: the page's green offer strip ── */
.banner {
  background: #006B35; color: #fff; text-align: center;
  padding: 22px 24px; font-family: 'Oswald', sans-serif; font-weight: 600;
  font-size: 25px; letter-spacing: 0.10em; text-transform: uppercase;
  display: flex; align-items: center; justify-content: center; gap: 16px;
}
.banner.orange { background: #E8743C; }
.banner .star { color: #F2C66A; }
.banner .dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.45); }

/* ── badges / ribbons ── */
.ribbon {
  display: inline-block; background: #C19A47; color: #2A1A0E;
  font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 21px;
  letter-spacing: 0.18em; text-transform: uppercase; padding: 10px 22px;
  border-radius: 5px; box-shadow: 0 6px 20px rgba(0,0,0,0.22);
}
.ribbon.orange { background: #E8743C; color: #fff; }
.ribbon.green  { background: #009A4D; color: #fff; }
.ribbon.cream  { background: #FBF6EC; color: #1F5C2E; }

/* ── type scale ── */
.headline {
  font-family: 'Zilla Slab', Georgia, serif; font-weight: 700;
  line-height: 0.98; letter-spacing: -0.015em;
  text-shadow: 0 3px 28px rgba(0,0,0,0.32);
}
.headline.on-cream { text-shadow: none; }
.script { font-family: 'Caveat', cursive; font-weight: 700; color: #F2C66A; line-height: 0.92; }
.kicker {
  font-family: 'Oswald', sans-serif; font-weight: 500; text-transform: uppercase;
  letter-spacing: 0.20em;
}
.sub { font-size: 28px; line-height: 1.45; }

/* ── CTA ── */
.cta {
  display: inline-flex; align-items: center; gap: 14px;
  background: #E8743C; color: #fff; padding: 22px 46px; border-radius: 60px;
  font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 27px;
  letter-spacing: 0.07em; text-transform: uppercase;
  box-shadow: 0 10px 30px rgba(232,116,60,0.42);
}
.cta.green { background: #009A4D; box-shadow: 0 10px 30px rgba(0,154,77,0.40); }
.cta.cream { background: #FBF6EC; color: #1F5C2E; box-shadow: 0 10px 30px rgba(0,0,0,0.22); }

/* ── lockup: logo + place, the sign-off every ad carries ── */
.lockup { display: flex; align-items: center; gap: 22px; }
.lockup img { width: 168px; display: block; }
.lockup.dark img { filter: none; }
.lockup .rule { width: 2px; height: 60px; background: rgba(255,255,255,0.30); }
.lockup .meta {
  font-family: 'Oswald', sans-serif; font-weight: 400; font-size: 19px;
  letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.86);
  line-height: 1.55;
}
.lockup.on-cream .rule { background: rgba(42,26,14,0.22); }
.lockup.on-cream .meta { color: rgba(42,26,14,0.68); }

/* ── price block ── */
.price { display: flex; align-items: baseline; gap: 14px; }
.price .amt {
  font-family: 'Oswald', sans-serif; font-weight: 700; line-height: 0.9; color: #E8743C;
}
.price .was {
  font-family: 'Oswald', sans-serif; font-weight: 400; font-size: 34px;
  color: rgba(42,26,14,0.45); text-decoration: line-through;
}
.price .was.light { color: rgba(255,255,255,0.62); }
.fine { font-size: 17px; color: rgba(42,26,14,0.55); letter-spacing: 0.02em; }
.fine.light { color: rgba(255,255,255,0.66); }

/* ── offer card ── */
.card {
  background: #FBF6EC; border-radius: 20px; padding: 42px 44px;
  box-shadow: 0 26px 60px rgba(0,0,0,0.34); border-top: 8px solid #E8743C;
}
.card.gold { border-top-color: #C19A47; }
.card.green { border-top-color: #009A4D; }
.card h3 {
  font-family: 'Zilla Slab', serif; font-weight: 700; font-size: 46px;
  line-height: 1.05; color: #2A1A0E; margin-bottom: 22px;
}
.card ul { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.card li { font-size: 25px; line-height: 1.3; display: flex; gap: 14px; align-items: flex-start; }
.card li .ic { flex-shrink: 0; width: 32px; text-align: center; }
"""

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?'
    'family=Zilla+Slab:wght@400;600;700&family=Oswald:wght@400;500;600;700'
    '&family=Open+Sans:wght@300;400;600;700&family=Caveat:wght@500;700'
    '&display=swap" rel="stylesheet">'
)

IMG = "../img"
LOGO = f"{IMG}/logo-white.png"


def lockup(light=True, meta="North Liberty, IA<br>Sept 19 – Oct 31, 2026"):
    cls = "lockup" if light else "lockup on-cream"
    filt = "" if light else ' style="filter:invert(1) brightness(0.22) sepia(0.5) hue-rotate(45deg)"'
    return (
        f'<div class="{cls}">'
        f'<img src="{LOGO}" alt="Colony Acres"{filt}>'
        f'<div class="rule"></div>'
        f'<div class="meta">{meta}</div>'
        f"</div>"
    )


def page(slug, body, extra_css=""):
    html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Colony Acres · Fall Festival 2026 · {slug}</title>
{FONTS}
<style>{BASE}{extra_css}</style>
</head><body>
{body}
</body></html>"""
    (OUT / f"{slug}.html").write_text(html)
    return slug


# ═══════════════════════════════════════════════════════════════════════════
# 01 · FLASH SALE HERO — offer-led, the aerial centennial maze
# ═══════════════════════════════════════════════════════════════════════════
page("01-flash-sale-hero", f"""
<div class="ad">
  <div class="bg" style="background-image:url('{IMG}/colony-100-years-maze.jpg');background-position:center 42%"></div>
  <div class="scrim scrim-bottom"></div>
  <div class="stage">
    <div class="banner"><span class="star">★</span> Flash Sale · Aug 26–30 <span class="dot"></span> Best Prices of the Season <span class="star">★</span></div>
    <div style="flex:1"></div>
    <div style="padding:0 64px 64px">
      <div class="ribbon" style="margin-bottom:26px">Celebrating 100 Years of Farming</div>
      <div class="headline" style="font-size:112px;color:#fff;margin-bottom:8px">Annual</div>
      <div class="headline" style="font-size:112px;color:#fff;margin-bottom:22px">Fall Festival</div>
      <div class="sub" style="color:rgba(255,255,255,0.94);margin-bottom:38px;max-width:720px">
        Six weeks of corn maze, hayrides, barrel trains and 20+ attractions —
        at the lowest prices we offer all season.
      </div>
      <div style="display:flex;align-items:center;gap:34px">
        <div class="cta">Get Tickets</div>
        <div style="font-family:'Oswald',sans-serif;font-size:23px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.82)">
          Sept 19 – Oct 31 · North Liberty, IA
        </div>
      </div>
    </div>
  </div>
</div>""")

# ═══════════════════════════════════════════════════════════════════════════
# 02 · LAUNCH DAY BUNDLE — scarcity, first 100 buyers
# ═══════════════════════════════════════════════════════════════════════════
page("02-launch-day-bundle", f"""
<div class="ad">
  <div class="bg" style="background-image:url('{IMG}/duckraces.webp');background-position:center 30%"></div>
  <div class="scrim scrim-full"></div>
  <div class="stage" style="padding:52px 60px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <div class="ribbon orange" style="margin-bottom:20px">Launch Day · 100 Only</div>
        <div class="script" style="font-size:64px;margin-bottom:2px">Our best</div>
        <div class="headline" style="font-size:80px;color:#fff">Launch Day Bundle</div>
      </div>
    </div>
    <div style="flex:1"></div>
    <div class="card" style="max-width:640px">
      <ul style="margin-bottom:30px">
        <li><span class="ic">🎫</span><span>One <strong>Any Day</strong> Fun Yard admission</span></li>
        <li><span class="ic">🎃</span><span>A pumpkin to take home</span></li>
        <li><span class="ic">🥤</span><span>Lemonade or slushie — your choice</span></li>
        <li><span class="ic">🍩</span><span>A cup of warm donut holes</span></li>
      </ul>
      <div style="border-top:2px dashed rgba(42,26,14,0.16);padding-top:26px">
        <div class="price">
          <span class="amt" style="font-size:96px">$17<span style="font-size:52px">.95</span></span>
          <span class="was">$36 value</span>
        </div>
        <div class="fine" style="margin-top:10px">Limited to the first 100 buyers · plus applicable taxes &amp; fees</div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:42px">
      <div class="cta">Claim Yours</div>
      {lockup(meta="Flash Sale · Aug 26–30<br>North Liberty, IA")}
    </div>
  </div>
</div>""")

# ═══════════════════════════════════════════════════════════════════════════
# 03 · FAMILY 4 PACK — family value
# ═══════════════════════════════════════════════════════════════════════════
page("03-family-4-pack", f"""
<div class="ad">
  <div class="bg" style="background-image:url('{IMG}/corn-box.jpg');background-position:center 55%"></div>
  <div class="scrim scrim-bottom"></div>
  <div class="stage">
    <div class="banner orange">Flash Sale · Aug 26–30 <span class="dot"></span> Save 40%</div>
    <div style="padding:56px 60px 0">
      <div class="ribbon cream" style="margin-bottom:22px">Best for Families</div>
      <div class="headline" style="font-size:96px;color:#fff;line-height:0.95">Family<br>4&nbsp;Pack</div>
    </div>
    <div style="flex:1"></div>
    <div style="padding:0 60px 60px">
      <div style="display:flex;align-items:flex-end;gap:48px;margin-bottom:36px">
        <div>
          <div class="price">
            <span class="amt" style="font-size:132px;color:#F2C66A">$64<span style="font-size:66px">.95</span></span>
            <span class="was light" style="font-size:42px">$107 value</span>
          </div>
          <div class="fine light" style="margin-top:8px;font-size:20px">Covers four guests · plus applicable taxes &amp; fees</div>
        </div>
      </div>
      <div style="display:flex;gap:18px;flex-wrap:wrap;margin-bottom:40px">
        <div class="ribbon green">✓ Admission for Four</div>
        <div class="ribbon green">🍪 Food &amp; Treats</div>
        <div class="ribbon green">🎃 A Pumpkin to Take Home</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="cta">Get the 4 Pack</div>
        {lockup(meta="Sept 19 – Oct 31, 2026<br>North Liberty, IA")}
      </div>
    </div>
  </div>
</div>""")

# ═══════════════════════════════════════════════════════════════════════════
# 04 · CENTENNIAL — brand story, the emotional one
# ═══════════════════════════════════════════════════════════════════════════
page("04-centennial-100-years", f"""
<div class="ad">
  <div class="bg" style="background-image:url('{IMG}/img2970.jpg');background-position:center 30%;background-size:150% auto"></div>
  <div class="scrim" style="background:linear-gradient(to bottom,rgba(31,69,36,0.86) 0%,rgba(31,69,36,0.46) 34%,rgba(42,26,14,0.34) 58%,rgba(31,69,36,0.80) 84%,rgba(31,69,36,0.94) 100%)"></div>
  <div class="stage" style="padding:64px 64px 56px;text-align:center;align-items:center">
    <div class="ribbon" style="margin-bottom:34px">Est. 1926 · Centennial Year</div>
    <div class="script" style="font-size:118px;margin-bottom:6px">A hundred Octobers</div>
    <div class="headline" style="font-size:82px;color:#fff;margin-bottom:30px">100 Years,<br>Still Family-Run</div>
    <div class="sub" style="color:rgba(255,255,255,0.94);max-width:760px;font-size:29px">
      Generations of kids grew up running through these fields. For 2026 we're
      celebrating with everything you love about Colony Acres — and a few new
      surprises for our centennial year.
    </div>
    <div style="flex:1"></div>
    <div class="cta cream" style="margin-bottom:44px">Come Make Memories</div>
    {lockup(meta="Annual Fall Festival · Sept 19 – Oct 31, 2026<br>1150 Front St. · North Liberty, IA")}
  </div>
</div>""")

# ═══════════════════════════════════════════════════════════════════════════
# 05 · SEASON DATES — awareness / save-the-date
# ═══════════════════════════════════════════════════════════════════════════
page("05-six-weeks-of-fall", f"""
<div class="ad">
  <div class="bg" style="background-image:url('{IMG}/barn.webp');background-position:center 60%"></div>
  <div class="scrim scrim-side"></div>
  <div class="stage" style="padding:64px">
    <div class="ribbon" style="align-self:flex-start;margin-bottom:auto">Annual Fall Festival 2026</div>
    <div style="max-width:640px">
      <div class="script" style="font-size:72px;margin-bottom:4px">Only</div>
      <div class="headline" style="font-size:126px;color:#fff;line-height:0.9;margin-bottom:26px">Six Weeks<br>of Fall</div>
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:30px">
        <div style="width:70px;height:4px;background:#E8743C"></div>
        <div class="kicker" style="font-size:30px;color:#F2C66A">Sept 19 – Oct 31</div>
      </div>
      <div class="sub" style="color:rgba(255,255,255,0.92);margin-bottom:40px">
        Open Wednesday through Sunday. Corn maze, hayrides, giant slide,
        barrel train, duck races and 20+ more — all on one ticket.
      </div>
      <div class="cta" style="margin-bottom:52px">Plan Your Visit</div>
    </div>
    <div style="margin-top:auto">{lockup(meta="A Little Country, in the City<br>North Liberty, IA")}</div>
  </div>
</div>""")

# ═══════════════════════════════════════════════════════════════════════════
# 06 · ATTRACTIONS GRID — feature-led, 20+ activities
# ═══════════════════════════════════════════════════════════════════════════
page("06-20-attractions", f"""
<div class="ad" style="background:#1F5C2E">
  <div class="stage">
    <div style="padding:54px 60px 34px;text-align:center">
      <div class="ribbon" style="margin-bottom:22px">One Ticket · Everything Included</div>
      <div class="headline" style="font-size:88px;color:#fff;line-height:0.98">20+ Attractions.<br><span style="color:#F2C66A">One Fun Yard.</span></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:0 6px">
      <div class="tile" style="background-image:url('{IMG}/slide.jpg')"><span>Giant Double Slide</span></div>
      <div class="tile" style="background-image:url('{IMG}/colony-100-years-maze.jpg')"><span>Centennial Corn Maze</span></div>
      <div class="tile" style="background-image:url('{IMG}/barrel-train.jpg')"><span>Barrel Train</span></div>
      <div class="tile" style="background-image:url('{IMG}/cppb21.jpg')"><span>Yard Games &amp; More</span></div>
    </div>
    <div style="flex:1"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:34px 60px 46px">
      <div class="cta">Get Tickets</div>
      {lockup(meta="Sept 19 – Oct 31, 2026<br>North Liberty, IA")}
    </div>
  </div>
</div>""", extra_css="""
.tile {
  height: 244px; background-size: cover; background-position: center;
  position: relative; display: flex; align-items: flex-end; padding: 20px 24px;
}
.tile::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(31,69,36,0.92) 0%, rgba(31,69,36,0.10) 62%);
}
.tile span {
  position: relative; z-index: 2; font-family: 'Oswald', sans-serif; font-weight: 600;
  font-size: 26px; letter-spacing: 0.06em; text-transform: uppercase; color: #fff;
}
""")

# ═══════════════════════════════════════════════════════════════════════════
# 07 · GATE PRICE ANCHOR — buy online, save at the gate
# ═══════════════════════════════════════════════════════════════════════════
page("07-online-vs-gate", f"""
<div class="ad" style="background:#FBF6EC">
  <div class="stage">
    <div class="banner">Buy Online <span class="dot"></span> Save at the Gate</div>
    <div style="padding:52px 60px 0;text-align:center">
      <div class="headline on-cream" style="font-size:80px;color:#2A1A0E;line-height:1.0;margin-bottom:14px">
        Why Pay <span style="color:#E8743C">Gate&nbsp;Price?</span>
      </div>
      <div class="sub" style="color:rgba(42,26,14,0.66)">Fun Yard Admission · every attraction included</div>
    </div>
    <div style="display:flex;gap:26px;padding:44px 60px 0;align-items:stretch">
      <div class="col win">
        <div class="col-tag" style="background:#009A4D">Online</div>
        <div class="col-amt" style="color:#009A4D">$10<span>.49</span></div>
        <div class="col-note">Weekday · flash sale<br>Weekend $11.95</div>
      </div>
      <div class="vs">vs</div>
      <div class="col lose">
        <div class="col-tag" style="background:#8A6A4A">At the Gate</div>
        <div class="col-amt" style="color:rgba(42,26,14,0.42);text-decoration:line-through">$16<span>.00</span></div>
        <div class="col-note">Weekday at the door<br>Weekend $15.80</div>
      </div>
    </div>
    <div style="flex:1"></div>
    <div style="padding:0 60px 30px;text-align:center">
      <div class="ribbon green" style="margin-bottom:26px">🅿️ Free Parking — Always</div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:0 60px 52px">
      <div class="cta">Buy Online &amp; Save</div>
      {lockup(light=False, meta="Sept 19 – Oct 31, 2026<br>North Liberty, IA")}
    </div>
  </div>
</div>""", extra_css="""
.col {
  flex: 1; background: #fff; border-radius: 18px; padding: 34px 30px 30px;
  text-align: center; box-shadow: 0 14px 34px rgba(42,26,14,0.10);
}
.col.win { border: 3px solid #009A4D; }
.col.lose { background: #F5EDD9; box-shadow: none; }
.col-tag {
  display: inline-block; color: #fff; font-family: 'Oswald', sans-serif; font-weight: 700;
  font-size: 20px; letter-spacing: 0.16em; text-transform: uppercase;
  padding: 8px 20px; border-radius: 4px; margin-bottom: 22px;
}
.col-amt { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 104px; line-height: 0.9; }
.col-amt span { font-size: 52px; }
.col-note { margin-top: 18px; font-size: 21px; line-height: 1.45; color: rgba(42,26,14,0.58); }
.vs {
  align-self: center; font-family: 'Zilla Slab', serif; font-style: italic;
  font-size: 34px; color: rgba(42,26,14,0.34);
}
""")

# ═══════════════════════════════════════════════════════════════════════════
# 08 · CORN MAZE SPOTLIGHT — single-attraction, full-bleed hero photo
# ═══════════════════════════════════════════════════════════════════════════
page("08-centennial-corn-maze", f"""
<div class="ad">
  <div class="bg" style="background-image:url('{IMG}/colony-100-years-maze.jpg');background-position:center 46%"></div>
  <div class="scrim" style="background:linear-gradient(to bottom,rgba(42,26,14,0.55) 0%,rgba(42,26,14,0.05) 34%,rgba(31,69,36,0.55) 74%,rgba(31,69,36,0.94) 100%)"></div>
  <div class="stage" style="padding:56px 60px">
    <div style="text-align:center">
      <div class="ribbon" style="margin-bottom:18px">This Year's Maze Design</div>
    </div>
    <div style="flex:1"></div>
    <div style="text-align:center">
      <div class="script" style="font-size:82px;margin-bottom:2px">Carved for our</div>
      <div class="headline" style="font-size:96px;color:#fff;margin-bottom:24px">Centennial Corn Maze</div>
      <div class="sub" style="color:rgba(255,255,255,0.93);max-width:740px;margin:0 auto 42px">
        Acres of tall stalks cut into one hundred years of Colony Acres.
        Find your way through — it's included with every Fun Yard ticket.
      </div>
      <div style="display:flex;justify-content:center;margin-bottom:48px"><div class="cta">Walk the Maze</div></div>
      <div style="display:flex;justify-content:center">{lockup(meta="Sept 19 – Oct 31, 2026<br>North Liberty, IA")}</div>
    </div>
  </div>
</div>""")

# ═══════════════════════════════════════════════════════════════════════════
# 09 · LAST CHANCE — urgency / retarget, orange-dominant
# ═══════════════════════════════════════════════════════════════════════════
page("09-last-chance-urgency", f"""
<div class="ad" style="background:#E8743C">
  <div class="bg" style="background-image:url('{IMG}/barrel-train.jpg');background-position:center 55%;opacity:0.30"></div>
  <div class="scrim" style="background:linear-gradient(150deg,rgba(232,116,60,0.94) 0%,rgba(216,95,40,0.88) 55%,rgba(42,26,14,0.72) 100%)"></div>
  <div class="stage" style="padding:60px;text-align:center;align-items:center">
    <div class="ribbon cream" style="margin-bottom:auto">⏳ Flash Sale · Ends Sunday</div>
    <div>
      <div class="headline" style="font-size:150px;color:#fff;line-height:0.86;margin-bottom:20px">Last<br>Chance</div>
      <div class="kicker" style="font-size:30px;color:#FFE9C8;margin-bottom:34px">Prices go up Aug 31</div>
      <div class="sub" style="color:rgba(255,255,255,0.96);max-width:700px;margin:0 auto 20px;font-size:30px">
        Season-low pricing on every Fun Yard ticket. Once the sale closes,
        it's gate price for the rest of fall.
      </div>
      <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-bottom:44px">
        <div class="ribbon cream">Weekday $10.49</div>
        <div class="ribbon cream">Weekend $11.95</div>
        <div class="ribbon cream">4 Pack $64.95</div>
      </div>
      <div class="cta cream" style="font-size:30px">Lock In Flash Pricing</div>
    </div>
    <div style="margin-top:auto">{lockup(meta="Annual Fall Festival · Sept 19 – Oct 31<br>North Liberty, IA")}</div>
  </div>
</div>""")

# ═══════════════════════════════════════════════════════════════════════════
# 10 · BRAND / TAGLINE — top-of-funnel, the farm itself
# ═══════════════════════════════════════════════════════════════════════════
page("10-a-little-country", f"""
<div class="ad">
  <div class="bg" style="background-image:url('{IMG}/dinner.jpg');background-position:center 50%"></div>
  <div class="scrim" style="background:linear-gradient(to bottom,rgba(42,26,14,0.62) 0%,rgba(42,26,14,0.30) 38%,rgba(31,69,36,0.78) 82%,rgba(31,69,36,0.95) 100%)"></div>
  <div class="stage" style="padding:64px;text-align:center;align-items:center">
    <img src="{LOGO}" alt="Colony Acres" style="width:340px;margin-bottom:auto">
    <div>
      <div class="script" style="font-size:96px;margin-bottom:10px">A little country,</div>
      <div class="headline" style="font-size:88px;color:#fff;margin-bottom:32px">in the city.</div>
      <div style="width:90px;height:4px;background:#E8743C;margin:0 auto 32px"></div>
      <div class="sub" style="color:rgba(255,255,255,0.94);max-width:720px;margin:0 auto 44px;font-size:30px">
        Fifteen minutes from Iowa City, one hundred years in the making.
        Our Annual Fall Festival opens September 19.
      </div>
      <div class="cta">See What's On</div>
    </div>
    <div class="kicker" style="margin-top:auto;padding-top:48px;font-size:21px;color:rgba(255,255,255,0.88)">
      1150 Front St. · North Liberty, IA · Wed–Sun · Sept 19 – Oct 31, 2026
    </div>
  </div>
</div>""")

# ── contact sheet ───────────────────────────────────────────────────────────
slugs = sorted(p.stem for p in OUT.glob("*.html") if p.stem != "index")
cards = "".join(
    f'<figure><img src="{s}.png" alt="{s}"><figcaption>{s}</figcaption></figure>'
    for s in slugs
)
(OUT / "index.html").write_text(f"""<!doctype html><html><head><meta charset="utf-8">
<title>Colony Acres · Fall Festival 2026 · Ad Creative Set</title>{FONTS}
<style>
 body{{background:#2A1A0E;color:#FBF6EC;font-family:'Open Sans',sans-serif;padding:48px}}
 h1{{font-family:'Zilla Slab',serif;font-size:42px;margin-bottom:8px}}
 p.sub{{color:#F2C66A;font-family:'Oswald',sans-serif;letter-spacing:.14em;
   text-transform:uppercase;font-size:15px;margin-bottom:40px}}
 .grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:28px}}
 figure{{margin:0}} img{{width:100%;display:block;border-radius:10px}}
 figcaption{{font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.1em;
   text-transform:uppercase;color:rgba(251,246,236,.6);margin-top:10px}}
</style></head><body>
<h1>Annual Fall Festival 2026 — Ad Creative Set</h1>
<p class="sub">Colony Acres · 10 statics · 1080×1080</p>
<div class="grid">{cards}</div>
</body></html>""")

print(f"built {len(slugs)} artboards + index → {OUT}")
for s in slugs:
    print("  ", s)
