const { chromium } = require('/Users/matlonginow/Desktop/site-cloner/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const A = '/Users/matlonginow/Desktop/crowd7-public/clients/eckerts/design/assets/jacks-lighted-trail';
const OUT = __dirname + '/sale-out';
fs.mkdirSync(OUT, { recursive: true });
const img = f => `file://${A}/${f}`;
const LOGO = img('logo-jacks-lighted-trail.png');

/* ═══════════════════════════════════════════════════════════════════
   JACK'S LIGHTED TRAIL — FLASH SALE AD SET · 1080×1080

   Structure follows the shipped Crowd7 house style
   (crowd7/marketing/fb-ad-reference-corpus): giant display headline,
   masked/duotone photography rather than a full-bleed website hero,
   a hard-edged offer badge with struck-through price, a solid pill
   CTA, and a bottom rail carrying dates · logo · terms · CTA.

   Palette + type are JLT's own night sub-brand.

   SALE FACTS — CrowdView `price` rows, sourced to Amanda Morgan in
   #crowd7-and-eckerts-farm 2026-08-27 09:10:
     · Mon Aug 31 → Thu Sept 3
     · Tier 1  $10 off, first 500 (ADVERTISED — never publish the
               real 1000 inventory figure)
     · Tier 2  $7 off, steps down automatically after tier 1
     · $22 standard → $12 tier 1 → $15 tier 2
     · September visit dates ONLY. October never discounted.
     · No coupon code, applied automatically.
   HARD RULES: no gate price anywhere (not on file — DB says do not
   state one); no peak-tier flash price (Sep 26 unconfirmed).
   ═══════════════════════════════════════════════════════════════════ */

const C = {
  orange: '#ff6e00', glow: '#ffe730', amber: '#f9bb3e', lightglow: '#fff18a',
  purple: '#471f73', purpleLt: '#7730c5', red: '#ed1c24', ink: '#08060c'
};

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E\")";

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

/* ── photography treatments ───────────────────────────── */
.arch{position:absolute;overflow:hidden;
  border-radius:47% 47% 47% 47% / 42% 42% 42% 42%;
  box-shadow:0 0 0 7px rgba(255,110,0,.16), 0 30px 80px -20px rgba(0,0,0,.9)}
.arch img{width:100%;height:100%;object-fit:cover;display:block}
.bleed{position:absolute;inset:0}
.bleed img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.18) contrast(1.06)}
.duo{position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,110,0,.16),rgba(71,31,115,.26));
  mix-blend-mode:color}
/* directional scrim — dark only where type lands, so the photo keeps its glow */
.dark{position:absolute;inset:0}
.dark.top{background:linear-gradient(180deg,rgba(8,6,12,.93) 0%,rgba(8,6,12,.86) 42%,rgba(8,6,12,.42) 72%,rgba(8,6,12,.72) 100%)}
.dark.mid{background:radial-gradient(ellipse at 50% 44%,rgba(8,6,12,.90) 0%,rgba(8,6,12,.74) 46%,rgba(8,6,12,.42) 78%,rgba(8,6,12,.80) 100%)}
.dark.heavy{background:radial-gradient(ellipse at 50% 40%,rgba(8,6,12,.94) 0%,rgba(8,6,12,.88) 44%,rgba(8,6,12,.72) 76%,rgba(8,6,12,.92) 100%)}
.dark.left{background:linear-gradient(100deg,rgba(8,6,12,.94) 0%,rgba(8,6,12,.86) 44%,rgba(8,6,12,.34) 74%,rgba(8,6,12,.62) 100%)}
.swoosh{position:absolute;z-index:2;pointer-events:none}

/* ── type ─────────────────────────────────────────────── */
.z{position:relative;z-index:10}
.brandline{font-family:'Creepster',cursive;color:${C.orange};letter-spacing:.02em;line-height:.92;
  text-shadow:0 0 34px rgba(255,110,0,.5),0 4px 18px rgba(0,0,0,.8)}
.slab{font-family:'Anton',sans-serif;text-transform:uppercase;line-height:.84;letter-spacing:-.005em}
.eye{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:23px;letter-spacing:.22em;
  text-transform:uppercase;color:${C.amber};text-shadow:0 2px 12px rgba(0,0,0,.95)}
.eye.r{color:#ff5a63}
.lede{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:31px;line-height:1.24;color:${C.lightglow}}
.lede b{color:#fff}
.small{font-size:23px;font-weight:700;color:rgba(255,255,255,.78);line-height:1.42}

/* ── offer badge (struck price → sale price) ──────────── */
.pcard{position:relative;overflow:hidden;border-radius:22px;padding:26px 30px 22px;
  box-shadow:0 18px 44px -14px rgba(0,0,0,.85)}
.pcard.a{background:${C.orange};color:#140a02}
.pcard.b{background:${C.purple};color:#fff;border:2px solid rgba(255,110,0,.45)}
.pcard.c{background:#151021;color:#fff;border:2px solid rgba(255,110,0,.5)}
.rib{position:absolute;top:0;left:0;width:132px;height:132px;overflow:hidden;z-index:3}
.rib span{position:absolute;top:27px;left:-36px;width:160px;text-align:center;
  transform:rotate(-45deg);background:${C.red};color:#fff;
  font-family:'Anton',sans-serif;font-size:19px;letter-spacing:.06em;padding:6px 0;
  box-shadow:0 3px 12px rgba(0,0,0,.5)}
.pcard .was{font-family:'Anton',sans-serif;font-size:38px;opacity:.72;
  text-decoration:line-through;text-decoration-thickness:4px;display:block;margin-left:76px}
.pcard .now{font-family:'Anton',sans-serif;font-size:104px;line-height:.82;display:block}
.pcard .lab{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:26px;
  text-transform:uppercase;line-height:1.05;display:block;margin-top:6px}
.pcard .sub{font-family:'Nunito',sans-serif;font-weight:700;font-size:17px;opacity:.8;display:block;margin-top:3px}

/* ── stamp ────────────────────────────────────────────── */
.stamp{position:absolute;z-index:12;display:flex;flex-direction:column;align-items:center;
  justify-content:center;text-align:center;border-radius:50%;transform:rotate(-11deg);
  background:radial-gradient(circle at 38% 32%,#ff8a1f,${C.red} 72%);
  border:6px solid ${C.glow};box-shadow:0 0 62px rgba(255,110,0,.55),0 16px 44px -12px rgba(0,0,0,.9)}
.stamp .n{font-family:'Anton',sans-serif;color:#fff;line-height:.8}
.stamp .t{font-family:'Baloo 2',sans-serif;font-weight:800;color:${C.glow}}
.stamp .s{font-family:'Nunito',sans-serif;font-weight:700;color:rgba(255,255,255,.92)}

/* ── CTA + rail ───────────────────────────────────────── */
.cta{display:inline-flex;align-items:center;gap:12px;background:${C.orange};color:#140a02;
  font-family:'Anton',sans-serif;font-size:40px;letter-spacing:.02em;text-transform:uppercase;
  padding:20px 46px 16px;border-radius:60px;box-shadow:0 0 44px rgba(255,110,0,.45)}
.cta.glow{background:${C.glow}}
.rail{position:absolute;left:0;right:0;bottom:0;z-index:20;height:104px;
  background:rgba(6,4,10,.94);border-top:2px solid rgba(255,110,0,.34);
  display:flex;align-items:center;justify-content:space-between;padding:0 42px;
  font-family:'Baloo 2',sans-serif;font-weight:800;font-size:21px;letter-spacing:.05em;
  text-transform:uppercase;color:rgba(255,255,255,.9)}
.rail .d{width:5px;height:5px;border-radius:50%;background:rgba(255,110,0,.7);flex-shrink:0}
.rail .grp{display:flex;align-items:center;gap:18px}
.rail .hot{color:${C.glow}}
.rail img{height:66px;width:auto;display:block;filter:drop-shadow(0 2px 6px rgba(0,0,0,.7))}
.terms{font-family:'Nunito',sans-serif;font-weight:700;font-size:16px;letter-spacing:.02em;
  text-transform:none;color:rgba(255,255,255,.5)}

/* ── date grid ────────────────────────────────────────── */
.dates{display:grid;grid-template-columns:repeat(4,1fr);gap:11px}
.dt{background:rgba(255,255,255,.06);border:2px solid rgba(255,110,0,.32);border-radius:14px;
  padding:13px 6px;text-align:center}
.dt b{display:block;font-family:'Anton',sans-serif;font-size:35px;color:${C.glow};line-height:.9}
.dt span{display:block;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:14px;
  letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.62);margin-top:5px}
`;

const SWOOSH = `<svg class="swoosh" width="1080" height="1080" viewBox="0 0 1080 1080" fill="none">
  <path d="M-40 640 C 250 470, 430 880, 700 600 S 1010 250, 1160 330"
        stroke="${C.orange}" stroke-opacity=".55" stroke-width="11" stroke-linecap="round"/>
</svg>`;

// dates · logo · terms · CTA — the house bottom rail
const rail = (terms = 'September dates only &middot; no code needed') => `
<div class="rail">
  <div class="grp"><span class="hot">Aug 31 &ndash; Sept 3</span><span class="d"></span>
    <img src="${LOGO}" alt=""></div>
  <div class="grp"><span class="terms">${terms}</span><span class="d"></span><span>Get Tickets</span></div>
</div>`;

const bleed = (f, pos = 'center 45%', mode = 'top', extra = '') => `
<div class="bleed"><img src="${img(f)}" style="object-position:${pos};${extra}"></div>
<div class="duo"></div><div class="dark ${mode}"></div>`;

const arch = (f, css, pos = 'center 45%') => `
<div class="arch" style="${css}"><img src="${img(f)}" style="object-position:${pos}"></div>`;

const price = (kind, was, now, lab, sub, ribbon, css) => `
<div class="pcard ${kind}" style="${css}">
  <div class="rib"><span>${ribbon}</span></div>
  <span class="was">${was}</span><span class="now">${now}</span>
  <span class="lab">${lab}</span><span class="sub">${sub}</span>
</div>`;

/* ═══════════════ THE 10 — a sequenced 4-day flash campaign ═══════════════ */
const ads = [
{ id:'01-teaser', name:'Teaser — Flash Sale Starts Monday', slot:'Pre-launch · run Thu 8/27 → Sun 8/30',
  role:'teaser',
  primary:"Something's coming. 🎃 Jack's Lighted Trail's flash sale opens Monday — the lowest price of the whole season, and it only runs four days. Set your alarm.",
  headline:'Flash Sale Starts Monday', desc:'Aug 31 – Sept 3 · September dates', cta:'Learn More',
  html:`${bleed('hero-graveyard-fog.jpg','76% 22%','mid','transform:scale(1.55);transform-origin:76% 22%')}
  <div class="z" style="position:absolute;left:70px;right:70px;top:82px;text-align:center">
    <div class="eye" style="margin-bottom:22px">Set Your Alarm</div>
    <div class="slab" style="font-size:196px;color:#fff;letter-spacing:-.02em">Flash<br>Sale</div>
    <div class="brandline" style="font-size:104px;margin-top:20px">starts monday</div>
    <div class="lede" style="margin-top:30px">Four days only. <b>The lowest price of the season</b><br>on Jack's Lighted Trail.</div>
  </div>
  <div class="stamp" style="width:212px;height:212px;right:56px;bottom:170px">
    <span class="t" style="font-size:23px;letter-spacing:.09em">4 DAYS</span>
    <span class="n" style="font-size:62px;margin:2px 0">ONLY</span>
    <span class="s" style="font-size:19px">Aug 31 &ndash; Sep 3</span>
  </div>
  ${rail('Mark your calendar')}` },

{ id:'02-launch', name:'Launch Day — $10 Off, First 500', slot:'Mon 8/31 · sale opens', role:'launch',
  primary:"⚡ IT'S LIVE. $10 off every September night at Jack's Lighted Trail — Trail Passes drop from $22 to $12. First 500 tickets only, then the discount steps down. No code, it comes off automatically.",
  headline:'$10 Off — First 500 Tickets', desc:'September dates · Ends Thu 9/3', cta:'Get Tickets',
  html:`${SWOOSH}
  ${arch('hero-pumpkin-trail-red.jpg','right:-40px;top:96px;width:560px;height:700px','center 42%')}
  <div class="z" style="position:absolute;left:66px;top:104px;width:600px">
    <div class="eye r">⚡ The Flash Sale Is Live</div>
    <div class="slab" style="font-size:172px;color:${C.orange};margin-top:14px;
      text-shadow:0 0 42px rgba(255,110,0,.45)">$10<br><span style="color:#fff">off</span></div>
    <div class="lede" style="margin-top:20px">First <b>500 tickets</b> only.<br>Then it steps down.</div>
  </div>
  ${price('a','$22','$12','Trail Pass','Any September night · no code',
    '$10 OFF','position:absolute;left:66px;bottom:190px;width:404px')}
  ${rail()}` },

{ id:'03-price-proof', name:'Price Proof — $22 becomes $12', slot:'Mon 8/31 – Tue 9/1 · price-led', role:'price',
  primary:"$22 → $12. 🎃 That's a whole night on the glowing pumpkin trail for twelve dollars. September dates, first 500 tickets, no code needed — the discount applies itself at checkout.",
  headline:'Trail Passes Are $12', desc:'Was $22 · September dates only', cta:'Get Tickets',
  html:`${bleed('hero-jackolanterns-colorful.jpg','center 52%','mid')}
  <div class="z" style="position:absolute;left:0;right:0;top:92px;text-align:center">
    <div class="eye">Flash Sale &middot; September Nights</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:34px;margin-top:26px">
      <span class="slab" style="font-size:112px;color:rgba(255,255,255,.5);
        text-decoration:line-through;text-decoration-color:${C.red};text-decoration-thickness:9px">$22</span>
      <span class="slab" style="font-size:60px;color:${C.orange}">&rarr;</span>
      <span class="slab" style="font-size:224px;color:${C.glow};
        text-shadow:0 0 52px rgba(255,231,48,.5)">$12</span>
    </div>
    <div class="brandline" style="font-size:74px;margin-top:16px">a whole night of glow</div>
    <div class="lede" style="margin-top:22px">First <b>500 tickets</b> &middot; no code needed</div>
    <div style="margin-top:34px"><span class="cta">Get Tickets</span></div>
  </div>
  ${rail()}` },

{ id:'04-scarcity-500', name:'Scarcity — Only 500 at $10 Off', slot:'Tue 9/1 · scarcity push', role:'scarcity',
  primary:"Only 500 tickets get the full $10 off. 🕯️ After that the discount drops to $7 and it never comes back this season. September nights at Jack's Lighted Trail — going now.",
  headline:'Only 500 at $10 Off', desc:'Then the discount drops', cta:'Get Tickets',
  html:`${bleed('hero-lantern-installation-2.jpg','center 46%','left')}
  <div class="z" style="position:absolute;left:66px;right:66px;top:118px">
    <div class="eye r">Going Fast</div>
    <div class="slab" style="font-size:236px;color:${C.glow};margin-top:6px;
      text-shadow:0 0 56px rgba(255,231,48,.45)">500</div>
    <div class="slab" style="font-size:78px;color:#fff;margin-top:4px">tickets at $10 off</div>
    <div class="lede" style="margin-top:26px">After that it drops to <b>$7 off</b> &mdash;<br>and it doesn't come back this season.</div>
  </div>
  <div style="position:absolute;left:66px;bottom:184px;z-index:12"><span class="cta glow">Claim Yours</span></div>
  ${rail()}` },

{ id:'05-september-only', name:'September Nights Only', slot:'Tue 9/1 – Wed 9/2 · date education', role:'dates',
  primary:"The flash sale only covers September nights. 🌽 Seven glowing evenings on the trail — Sept 11, 12, 18, 19, 25, 26 and 27 — at the lowest price of the season. October stays full price, so pick a September date.",
  headline:'September Nights Only', desc:'Sale ends Thu 9/3', cta:'Get Tickets',
  html:`${SWOOSH}
  ${arch('hero-trail-purple-trees.jpg','right:-64px;top:52px;width:472px;height:556px','center 45%')}
  <div class="z" style="position:absolute;left:64px;top:104px;width:580px">
    <div class="eye">The Sale Covers</div>
    <div class="slab" style="font-size:110px;color:#fff;margin-top:12px">September<br><span style="color:${C.orange}">nights only</span></div>
    <div class="small" style="margin-top:20px">October dates stay full price &mdash; pick a September night to get the discount.</div>
  </div>
  <div class="z" style="position:absolute;left:64px;right:64px;bottom:172px">
    <div class="dates">
      <div class="dt"><b>11</b><span>Fri</span></div>
      <div class="dt"><b>12</b><span>Sat</span></div>
      <div class="dt"><b>18</b><span>Fri</span></div>
      <div class="dt"><b>19</b><span>Sat</span></div>
      <div class="dt"><b>25</b><span>Fri</span></div>
      <div class="dt"><b>26</b><span>Sat</span></div>
      <div class="dt"><b>27</b><span>Sun</span></div>
      <div class="dt" style="background:${C.orange};border-color:${C.orange}">
        <b style="color:#140a02">$12</b><span style="color:rgba(20,10,2,.78)">Each</span></div>
    </div>
    <div class="small" style="margin-top:16px;text-align:center;color:rgba(255,255,255,.62)">
      Was $22 &middot; first 500 tickets &middot; no code needed</div>
  </div>
  ${rail()}` },

{ id:'06-family', name:'Family — A Night Out for $12 Each', slot:'Wed 9/2 · value / family angle', role:'family', noSwoosh:true,
  primary:"A whole family night out for $12 a head. 🧡 Twinkling pumpkins, a glowing corn-stalk path, treats along the way — Jack's Lighted Trail is the fall night everybody actually agrees on, and right now it's the cheapest it'll be all season.",
  headline:'The Family Night Out, $12 Each', desc:'September dates · Ends Thu 9/3', cta:'Get Tickets',
  html:`
  ${arch('section-pumpkin-shelf-visitor.jpg','right:-46px;top:88px;width:540px;height:672px','24% 52%')}
  <div class="z" style="position:absolute;left:64px;top:110px;width:576px">
    <div class="eye">Spooky-Fun, Never Scary</div>
    <div class="brandline" style="font-size:118px;margin-top:16px">made for<br>all ages</div>
    <div class="lede" style="margin-top:22px">And right now it's <b>$12 a person</b><br>for any September night.</div>
  </div>
  ${price('c','$22','$12','Per Person','Kids under 2 free','$10 OFF',
    'position:absolute;left:64px;bottom:214px;width:398px')}
  ${rail()}` },

{ id:'07-low-sensory', name:'Low Sensory Night — Sept 19, On Sale', slot:'Wed 9/2 · inclusive-access segment', role:'segment',
  primary:"🧡 Low Sensory Night falls on Saturday, Sept 19 — inside the flash sale. Reduced sounds, gentler lighting and fewer surprises from 6:30, regular activities after. Same quieter trail, $12 a person while the sale runs.",
  headline:'Low Sensory Night is $12', desc:'Sat, Sept 19 · Sale ends Thu 9/3', cta:'Get Tickets',
  html:`${SWOOSH}
  ${arch('hero-lantern-installation-1.jpg','right:-56px;top:74px;width:520px;height:660px','center 48%')}
  <div class="z" style="position:absolute;left:64px;top:100px;width:568px">
    <div class="eye">Sat, Sept 19 &middot; In the Sale</div>
    <div class="slab" style="font-size:96px;color:${C.amber};margin-top:14px">Low<br>Sensory<br><span style="color:#fff">Night</span></div>
    <div class="small" style="margin-top:20px">Reduced sounds, gentler lighting, fewer surprises.
      <b style="color:#fff">Quiet Hour 6:30&ndash;7:30 PM</b>, regular activities after.</div>
  </div>
  ${price('b','$22','$12','Sept 19','Quiet Hour included','$10 OFF',
    'position:absolute;left:64px;bottom:190px;width:392px')}
  ${rail()}` },

{ id:'08-tier-two', name:'Tier Two — $10 Off Gone, $7 Off Live', slot:'Deploy the moment tier 1 sells through', role:'tier2',
  primary:"The $10-off tickets are gone. 🕯️ $7 off is still live on every September night at Jack's Lighted Trail — $22 down to $15 — but only until the sale closes Thursday at midnight.",
  headline:'$7 Off — Still Live', desc:'$10 tier sold out · Ends Thu 9/3', cta:'Get Tickets',
  html:`${bleed('hero-scarecrow-night.jpg','center 46%','left')}
  <div class="z" style="position:absolute;left:66px;right:66px;top:112px">
    <div class="eye r">The $10 Tier Sold Out</div>
    <div class="slab" style="font-size:186px;color:${C.orange};margin-top:10px;
      text-shadow:0 0 46px rgba(255,110,0,.45)">$7 off</div>
    <div class="slab" style="font-size:64px;color:#fff;margin-top:6px">still live</div>
    <div class="lede" style="margin-top:24px">Every September night &mdash; but only<br>until <b>midnight Thursday</b>.</div>
  </div>
  ${price('a','$22','$15','Trail Pass','September nights · no code','$7 OFF',
    'position:absolute;right:66px;bottom:186px;width:392px')}
  ${rail('The $10 tier has sold out')}` },

{ id:'09-24-hour', name:'24-Hour Warning', slot:'Wed 9/2 evening → Thu 9/3', role:'urgency',
  primary:"24 hours left. ⏳ When the clock hits midnight Thursday the flash sale closes and September nights go back to full price. Last call on the cheapest tickets of the season.",
  headline:'24 Hours Left', desc:'Sale closes midnight Thu 9/3', cta:'Get Tickets',
  html:`${bleed('section-witch-photobooth-neon.jpg','center 44%','heavy','filter:saturate(.62) brightness(.72) hue-rotate(-14deg)')}
  <div class="z" style="position:absolute;left:0;right:0;top:150px;text-align:center">
    <div class="eye r">Closing Soon</div>
    <div class="slab" style="font-size:310px;color:#fff;margin-top:4px;
      text-shadow:0 0 60px rgba(237,28,36,.5)">24</div>
    <div class="slab" style="font-size:88px;color:${C.orange};margin-top:-6px">hours left</div>
    <div class="lede" style="margin-top:26px">Then September nights go back to<br><b>full price</b>. No extensions.</div>
    <div style="margin-top:32px"><span class="cta">Get Tickets</span></div>
  </div>
  ${rail('Closes midnight Thursday')}` },

{ id:'10-final-hours', name:'Final Hours — Ends Midnight', slot:'Thu 9/3 · last call', role:'urgency',
  primary:"Final hours. 🎃 The flash sale on Jack's Lighted Trail closes at midnight tonight and September nights go back to full price. If you've been waiting, this is it.",
  headline:'Final Hours — Ends Tonight', desc:'Midnight Thu 9/3 · September dates', cta:'Get Tickets',
  html:`${bleed('section-badwitch-goodwitch-photobooth.jpg','center 30%','mid')}
  <div class="z" style="position:absolute;left:0;right:0;top:118px;text-align:center">
    <div class="eye r">Last Call</div>
    <div class="slab" style="font-size:186px;color:${C.red};margin-top:8px;
      text-shadow:0 0 54px rgba(237,28,36,.55)">Final<br>Hours</div>
    <div class="brandline" style="font-size:68px;margin-top:18px">ends at midnight</div>
    <div class="lede" style="margin-top:22px">September nights from <b>$12</b> &mdash;<br>then they're back to full price.</div>
    <div style="margin-top:30px"><span class="cta glow">Get Tickets</span></div>
  </div>
  ${rail('Sale closes tonight at midnight')}` },
];

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
  for (const a of ads) {
    const doc = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body><div class="ad">${a.html}<div class="edge"></div><div class="grain"></div></div></body></html>`;
    const f = path.join(__dirname, `sale-${a.id}.html`);
    fs.writeFileSync(f, doc);
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(950);
    await p.screenshot({ path: path.join(OUT, `jlt-sale-${a.id}.png`) });
    console.log('✓', a.id);
  }
  await b.close();
  fs.writeFileSync(path.join(__dirname, 'sale-manifest.json'), JSON.stringify(
    ads.map(({ id, name, slot, role, primary, headline, desc, cta }) =>
      ({ id, name, slot, role, primary, headline, desc, cta })), null, 2));
})();
