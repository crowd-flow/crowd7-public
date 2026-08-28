const { chromium } = require('/Users/matlonginow/Desktop/site-cloner/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const A = '/Users/matlonginow/Desktop/crowd7-public/clients/eckerts/design/assets/jacks-lighted-trail';
const OUT = __dirname + '/live-out';
fs.mkdirSync(OUT, { recursive: true });
const img = f => `file://${A}/${f}`;
const LOGO = img('logo-jacks-lighted-trail.png');

/* ═══════════════════════════════════════════════════════════════════
   JACK'S LIGHTED TRAIL — FLASH SALE, "TEASER LAYOUT" FAMILY · 1080×1080

   One fixed layout, ten fills. Per Mat 2026-08-28: the JLT logo now sits
   bottom-LEFT at the same size as the "4 Days Only" stamp, mirroring it
   across the canvas. Only the title, the Creepster sub-title and the
   two-line sub-text change between executions.

   Ad 01 is the pre-launch teaser. Ads 02–10 all say the sale is LIVE,
   three per background:
     BG1 hero-graveyard-fog          02 03 04   (+ the teaser)
     BG2 hero-pumpkin-trail-red      05 06 07
     BG3 hero-jackolanterns-colorful 08 09 10

   SALE FACTS — CrowdView `price` rows, sourced to Amanda Morgan in
   #crowd7-and-eckerts-farm 2026-08-27 09:10:
     Mon Aug 31 → Thu Sept 3 · $10 off first 500, then $7 off
     $22 → $12 (tier 1) → $15 (tier 2) · September dates ONLY
     No coupon code, applied automatically.
   HARD RULES: no gate price (not on file); no peak-tier flash price
   (Sep 26 unconfirmed); never publish the real 1000 inventory — 500 is
   Amanda's advertised scarcity figure.
   ═══════════════════════════════════════════════════════════════════ */

const C = {
  orange: '#ff6e00', glow: '#ffe730', amber: '#f9bb3e', lightglow: '#fff18a',
  purple: '#471f73', red: '#ed1c24', ink: '#08060c'
};

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E\")";

// bottom-left logo and bottom-right stamp share this box size + baseline,
// so the two read as a matched pair across the canvas.
const MARK = 224, MARK_BOTTOM = 172, MARK_INSET = 54;
// logo box, sized + offset so the ARTWORK (not the padded canvas) mirrors the stamp
const LOGO_BOX = 320, LOGO_LEFT = 14, LOGO_BOTTOM = 133;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Anton&family=Baloo+2:wght@600;700;800&family=Nunito:wght@600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:${C.ink};color:#fff;
  font-family:'Nunito',sans-serif;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:1080px;height:1080px;overflow:hidden;
  background:radial-gradient(ellipse at 30% 8%, #241338 0%, #0f0917 45%, ${C.ink} 100%)}
.grain{position:absolute;inset:0;background-image:${GRAIN};background-size:180px;
  opacity:.30;mix-blend-mode:overlay;pointer-events:none;z-index:40}
.edge{position:absolute;inset:0;box-shadow:inset 0 0 190px 44px rgba(0,0,0,.82);z-index:38;pointer-events:none}

.bleed{position:absolute;inset:0}
.bleed img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.18) contrast(1.06)}
.duo{position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,110,0,.16),rgba(71,31,115,.26));
  mix-blend-mode:color}
.dark{position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 40%,rgba(8,6,12,.90) 0%,rgba(8,6,12,.76) 44%,
    rgba(8,6,12,.48) 74%,rgba(8,6,12,.84) 100%)}
.dark.lift{background:radial-gradient(ellipse at 50% 40%,rgba(8,6,12,.76) 0%,rgba(8,6,12,.60) 46%,
  rgba(8,6,12,.30) 76%,rgba(8,6,12,.70) 100%)}

/* ── the fixed copy block ─────────────────────────────── */
.block{position:absolute;z-index:10;left:70px;right:70px;top:82px;text-align:center}
.eye{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:23px;letter-spacing:.22em;
  text-transform:uppercase;color:${C.amber};text-shadow:0 2px 12px rgba(0,0,0,.95);margin-bottom:22px}
.title{font-family:'Anton',sans-serif;text-transform:uppercase;line-height:.84;
  letter-spacing:-.02em;color:#fff;text-shadow:0 6px 30px rgba(0,0,0,.75)}
.sub{font-family:'Creepster',cursive;color:${C.orange};letter-spacing:.02em;line-height:.92;
  margin-top:20px;text-shadow:0 0 34px rgba(255,110,0,.55),0 4px 18px rgba(0,0,0,.85)}
.body{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:31px;line-height:1.28;
  color:${C.lightglow};margin-top:26px;text-shadow:0 2px 14px rgba(0,0,0,.9)}
.body b{color:#fff}

/* ── the matched marks ────────────────────────────────── */
.mark{position:absolute;z-index:12;bottom:${MARK_BOTTOM}px;
  width:${MARK}px;height:${MARK}px;display:flex;align-items:center;justify-content:center}
.mark.logo{left:${LOGO_LEFT}px;bottom:${LOGO_BOTTOM}px;
  width:${LOGO_BOX}px;height:${LOGO_BOX}px}
.mark.logo img{width:100%;height:100%;object-fit:contain;display:block;
  filter:drop-shadow(0 6px 22px rgba(0,0,0,.9))}
.mark.stamp{right:${MARK_INSET}px;flex-direction:column;text-align:center;border-radius:50%;
  transform:rotate(-11deg);background:radial-gradient(circle at 38% 32%,#ff8a1f,${C.red} 72%);
  border:6px solid ${C.glow};box-shadow:0 0 62px rgba(255,110,0,.55),0 16px 44px -12px rgba(0,0,0,.9)}
.mark.stamp .t{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:24px;
  letter-spacing:.09em;color:${C.glow}}
.mark.stamp .n{font-family:'Anton',sans-serif;font-size:66px;color:#fff;line-height:.8;margin:3px 0}
.mark.stamp .s{font-family:'Nunito',sans-serif;font-weight:700;font-size:20px;color:rgba(255,255,255,.94)}

/* ── rail ─────────────────────────────────────────────── */
.rail{position:absolute;left:0;right:0;bottom:0;z-index:20;height:104px;
  background:rgba(6,4,10,.94);border-top:2px solid rgba(255,110,0,.34);
  display:flex;align-items:center;justify-content:space-between;padding:0 46px;
  font-family:'Baloo 2',sans-serif;font-weight:800;font-size:22px;letter-spacing:.05em;
  text-transform:uppercase;color:rgba(255,255,255,.9)}
.rail .grp{display:flex;align-items:center;gap:18px}
.rail .d{width:5px;height:5px;border-radius:50%;background:rgba(255,110,0,.7);flex-shrink:0}
.rail .hot{color:${C.glow}}
.terms{font-family:'Nunito',sans-serif;font-weight:700;font-size:17px;letter-spacing:.02em;
  text-transform:none;color:rgba(255,255,255,.55)}
`;

const BG = {
  fog:   ["hero-graveyard-fog.jpg",         "76% 22%",    "transform:scale(1.55);transform-origin:76% 22%", ""],
  red:   ["hero-pumpkin-trail-red.jpg",     "center 58%", "", ""],
  faces: ["hero-jackolanterns-colorful.jpg","center 52%", "filter:saturate(1.35) contrast(1.04) brightness(1.32)", "lift"],
};

/* ═══ the ten — one layout, ten fills ═══ */
const ads = [
{ id:'01-teaser', bg:'fog', eye:'Set Your Alarm', ts:196,
  t1:'Flash', t2:'Sale', sub:'starts monday', subSize:104,
  body:"Four days only. <b>The lowest price of the season</b><br>on Jack's Lighted Trail.",
  terms:'Mark your calendar', when:'Pre-launch · Thu 8/27 – Sun 8/30',
  name:'Teaser — Flash Sale Starts Monday',
  primary:"Something's coming. 🎃 Jack's Lighted Trail's flash sale opens Monday — the lowest price of the whole season, and it only runs four days. Set your alarm.",
  headline:'Flash Sale Starts Monday', desc:'Aug 31 – Sept 3 · September dates', cta:'Learn More' },

/* ── BG 1 · graveyard fog ───────────────────────────── */
{ id:'02-live-now', bg:'fog', eye:'⚡ The Sale Is On', ts:196,
  t1:'Flash', t2:'Sale', sub:'live now', subSize:112,
  body:"Four days only. <b>$10 off</b> every September<br>night on the glowing trail.",
  terms:'September dates only · no code needed', when:'Mon 8/31 – Thu 9/3',
  name:'Live Now — $10 Off',
  primary:"⚡ It's live. $10 off every September night at Jack's Lighted Trail — Trail Passes drop from $22 to $12. Four days only, and the discount comes off automatically at checkout.",
  headline:'The Flash Sale Is Live', desc:'$10 off · September dates', cta:'Get Tickets' },

{ id:'03-ten-off', bg:'fog', eye:'⚡ Happening Now', ts:214,
  t1:'$10', t2:'Off', sub:'happening now', subSize:100,
  body:"The lowest price of the season.<br><b>First 500 tickets</b>, then it steps down.",
  terms:'September dates only · no code needed', when:'Mon 8/31 – Tue 9/1',
  name:'Live — $10 Off, First 500',
  primary:"$10 off, right now. 🎃 Trail Passes for Jack's Lighted Trail drop from $22 to $12 — but only for the first 500 tickets, then the discount steps down to $7. September nights, no code needed.",
  headline:'$10 Off — First 500 Tickets', desc:'Was $22 · now $12', cta:'Get Tickets' },

{ id:'04-ends-thursday', bg:'fog', eye:'⚡ Four Days Only', ts:196,
  t1:'Flash', t2:'Sale', sub:'ends thursday', subSize:100,
  body:"Live now, gone Thursday. Then September<br>nights go back to <b>full price</b>.",
  terms:'Closes midnight Thursday', when:'Wed 9/2 – Thu 9/3',
  name:'Live — Ends Thursday',
  primary:"⏳ The flash sale closes midnight Thursday. After that every September night at Jack's Lighted Trail goes back to full price. $10 off while it lasts — no code, no extensions.",
  headline:'Flash Sale Ends Thursday', desc:'September dates · $10 off', cta:'Get Tickets' },

/* ── BG 2 · pumpkin trail red ───────────────────────── */
{ id:'05-is-live', bg:'red', eye:'⚡ The Sale Is Live', ts:196,
  t1:'Flash', t2:'Sale', sub:'is live', subSize:118,
  body:"<b>$10 off</b> the first 500 tickets.<br>September nights only, no code needed.",
  terms:'September dates only · no code needed', when:'Mon 8/31 – Thu 9/3',
  name:'Live — The Flash Sale Is Live',
  primary:"The flash sale is live. ⚡ $10 off the first 500 Trail Passes at Jack's Lighted Trail — September nights only, and the discount applies itself at checkout. Four days, then it's done.",
  headline:'The Flash Sale Is Live', desc:'First 500 tickets · $10 off', cta:'Get Tickets' },

{ id:'06-twelve', bg:'red', eye:'⚡ Right Now', ts:190,
  t1:'$12', t2:'Tickets', sub:'sale is on', subSize:106,
  body:"Was $22. <b>First 500 tickets only</b>,<br>then the discount steps down.",
  terms:'September dates only · no code needed', when:'Mon 8/31 – Tue 9/1',
  name:'Live — $12 Tickets',
  primary:"$22 → $12. 🎃 That's a whole night on the glowing pumpkin trail for twelve dollars. First 500 tickets, September nights, no code — the flash sale is live now.",
  headline:'Trail Passes Are $12', desc:'Was $22 · September dates', cta:'Get Tickets' },

{ id:'07-save-ten', bg:'red', eye:'⚡ This Week Only', ts:214,
  t1:'Save', t2:'$10', sub:'while it lasts', subSize:100,
  body:"Every September night on the glowing trail.<br>Sale ends <b>midnight Thursday</b>.",
  terms:'Closes midnight Thursday', when:'Tue 9/1 – Thu 9/3',
  name:'Live — Save $10',
  primary:"Save $10 on every September night at Jack's Lighted Trail. 🕯️ The flash sale is live now and closes midnight Thursday — after that, full price. No code needed, it comes off automatically.",
  headline:'Save $10 — This Week Only', desc:'September dates · ends Thu 9/3', cta:'Get Tickets' },

/* ── BG 3 · colourful jack-o-lanterns ───────────────── */
{ id:'08-on-now', bg:'faces', eye:'⚡ Four Days Only', ts:196,
  t1:'Flash', t2:'Sale', sub:'on now', subSize:120,
  body:"<b>The lowest price of the season</b><br>on Jack's Lighted Trail.",
  terms:'September dates only · no code needed', when:'Mon 8/31 – Thu 9/3',
  name:'Live — Flash Sale On Now',
  primary:"🎃 The flash sale is on. The lowest price of the season on Jack's Lighted Trail — $10 off every September night, four days only. St. Louis's glowing pumpkin experience, cheaper than it'll ever be again this year.",
  headline:'Flash Sale On Now', desc:'$10 off · September dates', cta:'Get Tickets' },

{ id:'09-its-live', bg:'faces', eye:'⚡ Flash Sale', ts:210,
  t1:"It's", t2:'Live', sub:'no code needed', subSize:96,
  body:"<b>$10 off</b> September nights &mdash; the discount<br>comes off automatically at checkout.",
  terms:'September dates only · no code needed', when:'Mon 8/31 – Wed 9/2',
  name:'Live — No Code Needed',
  primary:"It's live, and there's no code to remember. ⚡ $10 off every September night at Jack's Lighted Trail — the discount comes off automatically at checkout. Four days only.",
  headline:"It's Live — No Code Needed", desc:'$10 off · September dates', cta:'Get Tickets' },

{ id:'10-five-hundred', bg:'faces', eye:'⚡ Going Fast', ts:190,
  t1:'500', t2:'Tickets', sub:'at $10 off', subSize:104,
  body:"The flash sale is live now. When they're<br>gone the discount drops to <b>$7</b>.",
  terms:'September dates only · no code needed', when:'Tue 9/1 – Wed 9/2',
  name:'Live — 500 Tickets at $10 Off',
  primary:"Only 500 tickets get the full $10 off. 🕯️ After that the discount drops to $7 and it doesn't come back this season. The flash sale is live now — September nights at Jack's Lighted Trail.",
  headline:'Only 500 at $10 Off', desc:'Then the discount drops', cta:'Get Tickets' },
];

const render = a => {
  const [file, pos, extra, lift] = BG[a.bg];
  return `
  <div class="bleed"><img src="${img(file)}" style="object-position:${pos};${extra}"></div>
  <div class="duo"></div><div class="dark ${lift}"></div>
  <div class="block">
    <div class="eye">${a.eye}</div>
    <div class="title" style="font-size:${a.ts}px">${a.t1}<br>${a.t2}</div>
    <div class="sub" style="font-size:${a.subSize}px">${a.sub}</div>
    <div class="body">${a.body}</div>
  </div>
  <div class="mark logo"><img src="${LOGO}" alt=""></div>
  <div class="mark stamp">
    <span class="t">4 DAYS</span><span class="n">ONLY</span><span class="s">Aug 31 &ndash; Sep 3</span>
  </div>
  <div class="rail">
    <div class="grp"><span class="hot">Aug 31 &ndash; Sept 3</span></div>
    <div class="grp"><span class="terms">${a.terms}</span><span class="d"></span><span>Get Tickets</span></div>
  </div>`;
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
  for (const a of ads) {
    const doc = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body><div class="ad">${render(a)}<div class="edge"></div><div class="grain"></div></div></body></html>`;
    const f = path.join(__dirname, `live-${a.id}.html`);
    fs.writeFileSync(f, doc);
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(950);
    await p.screenshot({ path: path.join(OUT, `jlt-live-${a.id}.png`) });
    console.log('✓', a.id, '·', a.bg);
  }
  await b.close();
  fs.writeFileSync(path.join(__dirname, 'live-manifest.json'), JSON.stringify(
    ads.map(({ id, name, bg, when, primary, headline, desc, cta, t1, t2, sub, body }) =>
      ({ id, name, background: bg, when, title: `${t1} ${t2}`, subtitle: sub,
         subtext: body.replace(/<[^>]+>/g, '').replace(/&mdash;/g, '—'),
         primary, headline, desc, cta })), null, 2));
})();
