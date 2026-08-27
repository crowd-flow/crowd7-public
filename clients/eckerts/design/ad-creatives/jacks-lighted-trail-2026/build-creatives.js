const { chromium } = require('/Users/matlonginow/Desktop/site-cloner/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const A = '/Users/matlonginow/Desktop/crowd7-public/clients/eckerts/design/assets/jacks-lighted-trail';
const OUT = __dirname + '/out';
fs.mkdirSync(OUT, { recursive: true });

const img = f => `file://${A}/${f}`;
const LOGO = img('logo-jacks-lighted-trail.png');

// ── Brand tokens (verified: work/crowd7/projects/eckerts-jacks-lighted-trail-page/artifacts/brand-extract.md)
const C = {
  orange: '#ff6e00', glow: '#ffe730', amber: '#f9bb3e', lightglow: '#fff18a',
  purple: '#471f73', purpleLt: '#7730c5', red: '#ed1c24', ink: '#0a0a0a'
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;background:${C.ink};font-family:'Nunito',sans-serif;color:#fff;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:1080px;height:1350px;overflow:hidden;display:flex;flex-direction:column}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 45%}
.scrim{position:absolute;inset:0}
.scrim.bottom{background:linear-gradient(to bottom,rgba(6,3,10,.20) 0%,rgba(6,3,10,.30) 32%,rgba(6,3,10,.88) 72%,rgba(6,3,10,.97) 100%)}
.scrim.center{background:radial-gradient(ellipse at 50% 50%,rgba(6,3,10,.62) 0%,rgba(6,3,10,.80) 42%,rgba(6,3,10,.96) 100%)}
.scrim.card{background:linear-gradient(to bottom,rgba(6,3,10,.55) 0%,rgba(6,3,10,.35) 30%,rgba(6,3,10,.92) 68%,rgba(6,3,10,.99) 100%)}
.vig{position:absolute;inset:0;box-shadow:inset 0 0 220px 60px rgba(0,0,0,.75)}

/* top rail */
.rail{position:relative;z-index:5;display:flex;align-items:flex-start;justify-content:space-between;padding:52px 60px 0}
.logo{width:330px;height:auto;display:block;filter:drop-shadow(0 4px 22px rgba(0,0,0,.75))}
.logo.sm{width:250px}
.pill{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:22px;letter-spacing:.10em;text-transform:uppercase;
  padding:12px 24px;border-radius:50px;white-space:nowrap;line-height:1}
.pill.orange{background:${C.orange};color:${C.ink}}
.pill.red{background:${C.red};color:#fff}
.pill.ghost{background:rgba(255,110,0,.16);border:2px solid rgba(255,110,0,.55);color:${C.glow}}
.pill.purple{background:linear-gradient(90deg,${C.purple},${C.purpleLt});color:#fff}

/* content */
.body{position:relative;z-index:5;margin-top:auto;padding:0 60px 60px}
.body.mid{margin:auto 0;padding:0 76px;text-align:center}
.eye{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:26px;letter-spacing:.24em;text-transform:uppercase;color:${C.amber};margin-bottom:16px;text-shadow:0 2px 14px rgba(0,0,0,.9)}
.eye.p{color:#c79bff;text-shadow:0 2px 14px rgba(0,0,0,.9)}
h1{font-family:'Creepster',cursive;font-weight:400;color:${C.orange};line-height:.92;letter-spacing:.02em;
  font-size:118px;text-shadow:0 0 42px rgba(255,110,0,.60),0 6px 26px rgba(0,0,0,.75)}
h1.sm{font-size:96px}
h1.xs{font-size:82px}
h1 em{font-style:normal;color:${C.glow};text-shadow:0 0 42px rgba(255,231,48,.55),0 6px 26px rgba(0,0,0,.75)}
.sub{font-family:'Baloo 2',sans-serif;font-weight:600;font-size:38px;line-height:1.22;color:${C.lightglow};margin-top:18px}
.sub b{color:#fff}
.note{font-size:26px;line-height:1.45;color:rgba(255,255,255,.80);margin-top:16px;font-weight:600}

.chips{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}
.chips.c{justify-content:center}
.chip{display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border-radius:50px;
  background:rgba(255,110,0,.13);border:2px solid rgba(255,110,0,.42);font-size:25px;font-weight:700;color:#fff;line-height:1}
.chip b{color:${C.glow}}

.cta{display:inline-flex;align-items:center;gap:14px;margin-top:34px;background:${C.orange};color:${C.ink};
  font-family:'Baloo 2',sans-serif;font-weight:800;font-size:34px;letter-spacing:.03em;padding:22px 46px;border-radius:50px;
  box-shadow:0 0 46px rgba(255,110,0,.42)}
.cta.glow{background:${C.glow}}

.foot{position:relative;z-index:5;background:linear-gradient(90deg,${C.purple},${C.purpleLt});
  padding:22px 60px;display:flex;align-items:center;justify-content:space-between;font-size:24px;font-weight:700;letter-spacing:.02em}
.foot b{color:${C.glow}}
.foot .dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.5);display:inline-block;margin:0 14px}
.foot.dark{background:${C.ink};border-top:2px solid rgba(255,110,0,.35)}

/* price block */
.price{display:flex;align-items:baseline;gap:16px;margin-top:26px}
.price .num{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:130px;color:${C.glow};line-height:.85;
  text-shadow:0 0 46px rgba(255,231,48,.45)}
.price .lab{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:32px;color:rgba(255,255,255,.85)}

/* 4-up grid */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:34px}
.g{background:rgba(255,255,255,.055);border:2px solid rgba(255,110,0,.28);border-radius:22px;padding:26px 24px}
.g .ic{font-size:50px;line-height:1;display:block;margin-bottom:12px}
.g .t{display:block;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:29px;color:${C.amber};text-transform:uppercase;letter-spacing:.01em;line-height:1.1}
.g .d{display:block;font-size:22px;color:rgba(255,255,255,.68);margin-top:8px;line-height:1.35;font-weight:600}

/* burst */
.burst{position:absolute;top:150px;right:56px;z-index:6;width:230px;height:230px;border-radius:50%;
  background:radial-gradient(circle at 40% 35%,${C.red},#8c0d14);display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;transform:rotate(-9deg);
  box-shadow:0 0 60px rgba(237,28,36,.55);border:5px solid rgba(255,231,48,.85)}
.burst .a{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:26px;letter-spacing:.10em;color:${C.glow};text-transform:uppercase}
.burst .b{font-family:'Creepster',cursive;font-size:66px;color:#fff;line-height:.9;margin:2px 0}
.burst .c{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:21px;color:rgba(255,255,255,.92);letter-spacing:.04em}

.band{position:relative;z-index:5;margin:0;padding:20px 60px;background:${C.red};text-align:center;
  font-family:'Baloo 2',sans-serif;font-weight:800;font-size:30px;letter-spacing:.14em;text-transform:uppercase}
`;

// ── The 10 creatives ────────────────────────────────────────────────────
const FOOT = `<div class="foot"><span>Eckert's Belleville Farm &middot; Belleville, IL</span><span><b>Sept 11 &ndash; Oct 30</b></span></div>`;

const creatives = [
  {
    id: '01-brand-hero', name: 'Brand Hero — "Glowing Pumpkin Experience"',
    angle: 'Top-of-funnel awareness. Cold audiences, St. Louis DMA. The workhorse.',
    copy: 'Primary text: "St. Louis\'s glowing pumpkin experience is back. Larger-than-life carvings and dazzling displays light up a trail through towering corn stalks — a spellbinding stroll made for all ages. 🎃  Sept 11 – Oct 30 at Eckert\'s Belleville Farm."  ·  Headline: "Jack\'s Lighted Trail" · Description: "Trail Passes from $22" · CTA: Get Tickets',
    html: `
      <img class="bg" src="${img('hero-pumpkin-trail-red.jpg')}" style="object-position:center 28%">
      <div class="scrim bottom"></div><div class="vig"></div>
      <div class="rail"><img class="logo" src="${LOGO}"><span class="pill ghost">2026 Season</span></div>
      <div class="body">
        <div class="eye">St. Louis's Glowing Pumpkin Experience</div>
        <h1>Jack's<br><em>Lighted Trail</em></h1>
        <div class="sub">the spookiest event near st. louis</div>
        <div class="chips">
          <span class="chip">🎃 <b>Sept 11 &ndash; Oct 30</b></span>
          <span class="chip">🌽 Corn Stalk Lighted Path</span>
          <span class="chip">🎟️ From <b>$22</b></span>
        </div>
        <div class="cta">Get Tickets →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '02-flash-sale', name: 'Flash Sale — 4 Days Only',
    angle: 'Urgency / conversion. Runs Aug 31 → midnight Sept 4. Retarget site visitors + last-season purchasers.',
    copy: 'Primary text: "⚡ FLASH SALE — 4 days only. The lowest prices of the season on Jack\'s Lighted Trail, and then they\'re gone. Sale ends midnight Thu, Sept 4. 🎃" · Headline: "Lowest Prices of the Season" · Description: "Sept dates · Ends midnight 9/4" · CTA: Get Tickets',
    flag: 'Discount $ amount intentionally NOT printed — see handoff note.',
    html: `
      <img class="bg" src="${img('hero-jackolanterns-colorful.jpg')}">
      <div class="scrim center"></div><div class="vig"></div>
      <div class="rail"><img class="logo sm" src="${LOGO}"><span class="pill red">Ends midnight 9/4</span></div>
      <div class="body mid">
        <div class="eye" style="color:#ff5560">⚡ 4 Days Only &middot; Aug 31 &ndash; Sept 4</div>
        <h1 class="sm">Flash<br><em>Sale</em></h1>
        <div class="sub"><b>The lowest prices of the season.</b><br>Then they're gone.</div>
        <div class="chips c">
          <span class="chip">🎃 September dates</span>
          <span class="chip">✅ <b>No code needed</b></span>
        </div>
        <div class="cta">Grab Them Now →</div>
      </div>
      <div class="band">Sale ends midnight Thursday, Sept 4</div>
      ${FOOT}`
  },
  {
    id: '03-opening-night', name: 'Opening Night — Fri, Sept 11',
    angle: 'Launch-week urgency. Warm audiences + anyone who engaged with the flash sale but didn\'t buy.',
    copy: 'Primary text: "The lanterns go up Friday, Sept 11. 🕯️ Opening night of Jack\'s Lighted Trail — and opening weekend always books out first. Grab your night before your favorite date is gone." · Headline: "Opening Night is Sept 11" · Description: "Eckert\'s Belleville Farm" · CTA: Book Now',
    html: `
      <img class="bg" src="${img('hero-lantern-installation-2.jpg')}">
      <div class="scrim bottom"></div><div class="vig"></div>
      <div class="rail"><img class="logo" src="${LOGO}"><span class="pill orange">Opening Weekend</span></div>
      <div class="body">
        <div class="eye">The Lanterns Go Up</div>
        <h1 class="sm">Opening Night<br><em>Fri, Sept 11</em></h1>
        <div class="note">Opening weekend books out first &mdash; pick your night before your date disappears.</div>
        <div class="chips">
          <span class="chip">🕯️ Runs through <b>Oct 30</b></span>
          <span class="chip">🎟️ From <b>$22</b></span>
        </div>
        <div class="cta">Book Your Night →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '04-from-22', name: 'Value / Price Anchor — From $22',
    angle: 'Mid-funnel. Price-sensitive families comparing against the Zoo / Science Center / City Museum.',
    copy: 'Primary text: "A whole night out for $22 a person. 🎃 Glowing pumpkin trail, corn-stalk lighted path, cider shed, photo ops — one ticket covers it all. Sept 11 – Oct 30 at Eckert\'s Belleville Farm." · Headline: "Trail Passes from $22" · Description: "Online only · Pick your date" · CTA: Get Tickets',
    html: `
      <img class="bg" src="${img('hero-trail-purple-trees.jpg')}">
      <div class="scrim bottom"></div><div class="vig"></div>
      <div class="rail"><img class="logo" src="${LOGO}"><span class="pill ghost">Online Only</span></div>
      <div class="body">
        <div class="eye">Trail Pass &middot; General Admission</div>
        <div class="price"><span class="num">$22</span><span class="lab">per person<br>most nights</span></div>
        <h1 class="xs" style="margin-top:22px">a whole night<br><em>of glow</em></h1>
        <div class="note">Lighted trail, corn-stalk path, cider shed &amp; photo ops &mdash; all in one ticket.</div>
        <div class="cta">Pick Your Date →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '05-family-fun', name: 'Family Fun — Made for All Ages',
    angle: 'Core audience: women 25–54 planning a family night. Warm + lookalike.',
    copy: 'Primary text: "Made for all ages. 🧡 From twinkling pumpkins to friendly surprises, Jack\'s Lighted Trail is the fall night the whole family actually agrees on. Spooky-fun, never scary." · Headline: "Family Fun, Fully Lit" · Description: "Sept 11 – Oct 30 · From $22" · CTA: Get Tickets',
    html: `
      <img class="bg" src="${img('section-pumpkin-shelf-visitor.jpg')}" style="object-position:22% 55%">
      <div class="scrim bottom"></div><div class="vig"></div>
      <div class="rail"><img class="logo" src="${LOGO}"><span class="pill ghost">All Ages</span></div>
      <div class="body">
        <div class="eye">Spooky-Fun, Never Scary</div>
        <h1 class="sm">made for<br><em>all ages</em></h1>
        <div class="note">From twinkling pumpkins to friendly surprises &mdash; the fall night everybody actually agrees on.</div>
        <div class="chips">
          <span class="chip">🧡 Kid-friendly</span>
          <span class="chip">📸 Photo ops</span>
          <span class="chip">🎟️ From <b>$22</b></span>
        </div>
        <div class="cta">Plan Your Night →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '06-four-ways', name: 'Four Ways to Play — Attraction Grid',
    angle: 'Consideration. Answers "what do you actually DO there?" — the objection that kills cold traffic.',
    copy: 'Primary text: "One ticket, four ways to play. 🌽 A glowing path through towering corn stalks, treats worth the walk, and a hauntingly good sip at the Spook-Easy. Here\'s what a night at Jack\'s looks like." · Headline: "Four Ways to Play" · Description: "Sept 11 – Oct 30 · From $22" · CTA: Learn More',
    html: `
      <img class="bg" src="${img('hero-graveyard-fog.jpg')}">
      <div class="scrim card"></div><div class="vig"></div>
      <div class="rail"><img class="logo sm" src="${LOGO}"><span class="pill ghost">One Ticket</span></div>
      <div class="body">
        <div class="eye p">Along the Trail</div>
        <h1 class="xs">four ways<br><em>to play</em></h1>
        <div class="grid">
          <div class="g"><span class="ic">🌽</span><span class="t">Corn Stalk<br>Lighted Path</span><span class="d">A glowing trail through towering corn stalks</span></div>
          <div class="g"><span class="ic">🎃</span><span class="t">Family Fun</span><span class="d">Twinkling pumpkins &amp; friendly surprises</span></div>
          <div class="g"><span class="ic">🍩</span><span class="t">Tasty Treats</span><span class="d">Fall favorites &amp; spooky sweet snacks</span></div>
          <div class="g"><span class="ic">🥃</span><span class="t">The<br>Spook-Easy</span><span class="d">Sneak away for a hauntingly good sip</span></div>
        </div>
        <div class="cta">See the Trail →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '07-tasty-treats', name: 'Tasty Treats — Cider Shed & Spook-Easy',
    angle: 'Scroll-stopper. Food creative consistently out-performs on Meta for agritainment; strong for women 25–44.',
    copy: 'Primary text: "Warm cider donuts. A hauntingly good sip at the Spook-Easy. 🍩 Feast on fall favorites and snack on spooky sweet treats all along Jack\'s Lighted Trail." · Headline: "Treats Worth the Walk" · Description: "Sept 11 – Oct 30 · From $22" · CTA: Get Tickets',
    html: `
      <img class="bg" src="${img('section-cider-donuts.jpg')}" style="object-position:center 50%">
      <div class="scrim bottom"></div><div class="vig"></div>
      <div class="rail"><img class="logo" src="${LOGO}"><span class="pill orange">Cider Shed</span></div>
      <div class="body">
        <div class="eye">Tasty Treats</div>
        <h1 class="sm">treats worth<br><em>the walk</em></h1>
        <div class="note">Feast on fall favorites and spooky sweet snacks &mdash; then sneak away to the Spook-Easy for a hauntingly good sip.</div>
        <div class="chips">
          <span class="chip">🍩 Cider donuts</span>
          <span class="chip">🥃 Spook-Easy</span>
        </div>
        <div class="cta">Come Hungry →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '08-after-dark', name: 'After Dark 21+ — Thu, Oct 22',
    angle: 'Date-night / adults-only segment. Single-date scarcity — one night all season. Excludes parents-of-young-kids targeting.',
    copy: 'Primary text: "🥃 One night. Adults only. After Dark takes over Jack\'s Lighted Trail on Thursday, Oct 22 — the trail, the Spook-Easy, and none of the bedtimes. 21+ only, and it\'s the only one all season." · Headline: "After Dark · 21+ Only" · Description: "Thu, Oct 22 · $30" · CTA: Get Tickets',
    html: `
      <img class="bg" src="${img('section-family-photo-op.jpg')}" style="object-position:center 62%">
      <div class="scrim center"></div><div class="vig"></div>
      <div class="rail"><img class="logo sm" src="${LOGO}"><span class="pill purple">21+ Only</span></div>
      <div class="burst"><span class="a">One Night</span><span class="b">Only</span><span class="c">Thu, Oct 22</span></div>
      <div class="body mid">
        <div class="eye p">Adults Only &middot; Thu, Oct 22</div>
        <h1 class="sm">after<br><em>dark</em></h1>
        <div class="sub"><b>The trail, the Spook-Easy,<br>and none of the bedtimes.</b></div>
        <div class="chips c">
          <span class="chip">🥃 <b>$30</b> per person</span>
          <span class="chip">🌙 21+ only</span>
        </div>
        <div class="cta">Book Date Night →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '09-low-sensory', name: 'Low Sensory Night — Sat, Sept 19',
    angle: 'Inclusive-access angle. High organic-share rate; strong goodwill creative for special-needs parent groups in the STL DMA.',
    copy: 'Primary text: "🧡 Low Sensory Night — Saturday, Sept 19. A quieter hour on the trail with reduced sounds, gentler lighting and fewer surprises, so every family gets a night at Jack\'s. Quiet Hour 6:30–7:30 PM, regular activities after." · Headline: "Low Sensory Night" · Description: "Sat, Sept 19 · $22" · CTA: Get Tickets',
    html: `
      <img class="bg" src="${img('hero-lantern-installation-1.jpg')}">
      <div class="scrim bottom"></div><div class="vig"></div>
      <div class="rail"><img class="logo" src="${LOGO}"><span class="pill ghost">Sat, Sept 19</span></div>
      <div class="body">
        <div class="eye">A Night for Every Family</div>
        <h1 class="sm" style="color:${C.amber};text-shadow:0 0 34px rgba(249,187,62,.40),0 6px 26px rgba(0,0,0,.75)">low sensory<br><em style="color:#fff">night</em></h1>
        <div class="note">Reduced sounds, gentler lighting effects and fewer sensory surprises &mdash; so everybody gets a night on the trail.</div>
        <div class="chips">
          <span class="chip">🧡 <b>6:30&ndash;7:30 PM</b> Quiet Hour</span>
          <span class="chip">🎃 <b>7:30&ndash;9:30 PM</b> Regular</span>
        </div>
        <div class="cta">Reserve Sept 19 →</div>
      </div>
      ${FOOT}`
  },
  {
    id: '10-costume-night', name: 'Costume Night / Trails of Treats — Thu, Oct 29',
    angle: 'Season-closer urgency. "Trail is dark on Halloween" is the real hook — this is the Halloween night.',
    copy: 'Primary text: "👻 We\'re dark on Halloween — so Thursday, Oct 29 IS Halloween at Jack\'s. Costume Night + Trails of Treats: wear the costume, walk the glowing trail, collect the candy. One of the last nights of the season." · Headline: "Costume Night · Oct 29" · Description: "Trails of Treats · $32" · CTA: Get Tickets',
    html: `
      <img class="bg" src="${img('section-badwitch-goodwitch-photobooth.jpg')}" style="object-position:center 22%">
      <div class="scrim center"></div><div class="vig"></div>
      <div class="rail"><img class="logo sm" src="${LOGO}"><span class="pill red">Closed Halloween</span></div>
      <div class="body mid">
        <div class="eye">Thu, Oct 29 &middot; Trails of Treats</div>
        <h1 class="sm">costume<br><em>night</em></h1>
        <div class="sub"><b>We're dark on Halloween &mdash;<br>so this IS Halloween at Jack's.</b></div>
        <div class="chips c">
          <span class="chip">👻 Wear the costume</span>
          <span class="chip">🍬 Collect the treats</span>
          <span class="chip">🎟️ <b>$32</b></span>
        </div>
        <div class="cta">Get Oct 29 Tickets →</div>
      </div>
      <div class="band">One of the last nights of the season</div>
      ${FOOT}`
  }
];

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  for (const c of creatives) {
    const doc = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="ad">${c.html}</div></body></html>`;
    const f = path.join(__dirname, `${c.id}.html`);
    fs.writeFileSync(f, doc);
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(900);
    await p.screenshot({ path: path.join(OUT, `jlt-${c.id}.png`) });
    console.log('✓', c.id);
  }
  await b.close();
  fs.writeFileSync(path.join(__dirname, 'manifest.json'), JSON.stringify(
    creatives.map(({ id, name, angle, copy, flag }) => ({ id, name, angle, copy, flag })), null, 2));
})();
