# 🍂 TicketSpice Build Brief — Amber Brooke Farms (Eustis) · 6th Annual Fall Festival 2026 (In Season)

**Page:** the **main in-season ticketing page** — the counterpart to the Any-Day Flash Sale page that ran Jul 31 – Aug 4.
**Built by:** Crowdly · 2026-08-28 · **revised 2026-08-28 against the LIVE cart**
**Design donor:** the client's **own** flash-sale page (`../anyday-flash-2026/`) — same `#abf-funnel` brand system, same loader v8 posture, same house patterns (benefits tile strip, gallery marquee, enriched info row, scroll-reveal, floating buy-bar, CrowdView pop-up block v7).
**Content source:** the **live TicketSpice page's own `window.__BOOTSTRAP__` form definition** (saved export, 2026-08-28), which supersedes our internal record wherever the two disagree — and they disagree in five material ways, listed below. Secondary: `work/crowd7/projects/amber-brooke-campaign-brief/artifacts/source-sweep.md`, `.../brand-palette.md`, CrowdView Postgres (`accounts` 22 · `event` 4 · `price_book` 9).

**Live page:** `https://amberbrookefarms.ticketspice.com/2026-eus-fall-festival` — no Crowd7 loader on it today; it runs a hand-coded `header.rawHtml2` block (~5.2 KB).

Everything on this page is sourced. Nothing is invented. Gaps are called out as gaps.

## 🚨 What the live cart corrected — read this before touching pricing copy

The saved page was parsed field by field. Five things our internal record had wrong:

**1. Peak pricing covers NINE dates, not four.** The GA level carries `priceModifiers: [{modifier: "2", when: trigger 3a50f504}]`, and that trigger fires on **Oct 10, 11, 12, 17, 18, 24, 25, 31 and Nov 1**. So $19.95 → **$21.95** online and $22.95 → **$24.95** at the gate on all nine. Our source sweep, the CrowdView `price_book`, and this page's own first draft all had peak as the four Halloween dates only — which **understated the price on Oct 10, 11, 12, 17 and 18**. A guest reading "regular $19.95" and picking Oct 17 would have been charged $21.95 at checkout. **Fixed; the page now follows the cart.**

**2. Peak pricing and extended hours are DIFFERENT date sets.** A separate trigger (`de1d231c`) fires on only **Oct 24, 25, 31, Nov 1** and opens the extra 9 AM / 11 AM / 1 PM / 3 PM arrival windows. Nine dates cost more; four dates open early. Our record conflated them into one "peak" concept. The page now states them separately.

**3. Gemstone mining is a PAID ADD-ON, not included.** The cart carries a `merchandise` block — Gemstone Mining pay-dirt bags ($8 / $12 / $15 / $25 / $50), Paint Ball Range ($10 / $25 / $45), Flower Mason Jar, Pumpkin Eater. The first draft of this page listed gemstone mining under "what your admission gets you," which would have manufactured gate arguments. **Removed from "included"; add-ons now have their own section, deliberately styled as paid extras (dashed border) so nothing reads as included when it isn't.** "What's included" now uses the client's own published list.

**4. Timed entry exists and was missing from our record entirely.** Guests choose an arrival window; regular days offer 10 AM / 12 PM / 2 PM, peak days add 9 / 11 / 1 / 3. Arrive within 2 hours of your slot, no more than 10 minutes early, last entry 45 minutes before close. **Now on the page.**

**5. "2 and Under" is a real free ticket type**, not "no ticket needed" — guests add a $0 ticket at checkout. Copy corrected.

**Bonus — the capacity mystery is solved.** The garbled *"68 per two-hour window"* is moot: the cart carries real numbers. Base **2,000 per arrival window**, with per-window limits (9 AM 1,900 · 11 AM 1,500 · 12 PM 1,500 · 1 PM 1,900 · 3 PM 1,500) and ~5,500 remaining per day. Still not published — capacity is an ops number, not a marketing one — but we no longer have an unknown here.

## ⚠️ TWO LIVE CONFIG PROBLEMS FOUND IN THEIR CART — worth raising with Amanda

**A. The date-picker sells 33 days; their own date guide lists 26.** The cart's `dateRange` is `dow` Fri/Sat/Sun/**Mon** across Sept 19 – Nov 22, with only five Mondays excluded (Sep 21, Sep 28, Oct 5, Oct 19, Oct 26). That leaves **seven bookable dates the client's own on-page "Value Dates" list does not mention**: **Sept 25 (Fri), Nov 2 (Mon), Nov 6 (Fri), Nov 9 (Mon), Nov 13 (Fri), Nov 16 (Mon), Nov 20 (Fri)**.

**The November Mondays (Nov 2, 9, 16) look like a straight config oversight** — every September and October Monday was explicitly excluded and the November ones were not. If the farm is closed those days, guests can buy tickets for them right now.

**This page deliberately publishes the client's list (26 dates), not the cart's (33).** Rationale: listing fewer dates than the cart sells is today's status quo and costs nothing; listing dates the farm may be closed on would strand real guests. **This needs Amanda's answer before the page goes live** — either the cart gets the missing exclusions, or the page gets the extra dates.

**B. A `10OFF` tracking-code discount is live** (trigger `7c50be64`). Not referenced on the page. Confirm it's intentional and still wanted.

## 🔀 The one big difference from the flash page: this page CAN lead on price

The flash page deliberately did **not** lead on price. Any-Day GA was $19.95 — identical to the non-peak online price — so there was no discount to claim, and the page led on flexibility instead. That was the right call, and the sale still underperformed (359 tickets; Bryan, 8/12: *"they stuck to their pricing… it really wasn't that great of a value"*).

**This page is the opposite case.** There is a real, defensible discount here: the **$3 online/gate gap on both tiers** — Bryan's won ask from the 7/28 negotiation, delivered by taking the gate up $1. So this page leads on **"Buy online and save $3,"** and the family-of-four math actually computes ($12), unlike Bryan's flash-sale line that didn't.

## 🎫 Native TicketSpice ticket types

**Peak pricing is a DATE TIER, not a separate ticket type.** One GA product, priced by the date the guest selects at checkout.

| Tier | Dates | Online | Gate |
|---|---|---|---|
| **Value Dates** | Sept 19, 20, 26, 27 · Oct 2, 3, 4, 9, 16, 23, 30 · Nov 7, 8, 14, 15, 21, 22 | **$19.95** | $22.95 |
| **Peak Dates** | **Oct 10, 11, 12, 17, 18, 24, 25, 31 & Nov 1** (nine dates) | **$21.95** | $24.95 |
| **2 and Under** | any date | **$0.00** | — |

- **Hours:** weekdays 10 AM–5 PM · weekends 10 AM–6 PM · **Oct 24, 25, 31 & Nov 1 → 9 AM–6 PM**.
- **Timed entry:** regular days 10 AM / 12 PM / 2 PM; the four extended days add 9 / 11 / 1 / 3. Arrive within 2 hours of your slot, ≤10 min early, last entry 45 min before close.
- **All of the above is ALREADY CONFIGURED and live.** The `+$2` peak modifier, the date-picker, the arrival windows and the free 2-and-under level are all in the cart today. **No cart work is required for this page** — that's the difference from the flash-sale build, where the cart had to be built from scratch. The only outstanding cart question is item **A** above (the seven unlisted bookable dates).
- **Paid add-ons in the cart:** Gemstone Mining ($8/$12/$15/$25/$50) · Paint Ball Range ($10/$25/$45) · Flower Mason Jar · Pumpkin Eater. Shown on the page as add-ons, never as included.

## ⚠️ CONFIRM-BEFORE-PUBLISH

1. **Season Pass is BUILT but COMMENTED OUT.** The card is complete inside the ticket grid, wrapped in a clearly-marked HTML comment. Amanda is rebuilding the pass structure from scratch (the old multi-tier passes were *"really complicated"*); the shape she described on 7/28 — **Child (3–13) $79.95 · Adult $69.95 · Family 4-pack $199.95 · additional child $39.95**, with unlimited visits, free festival entry, free U-pick, Farm Fun Pass ($13 value), 10% off in-farm spend, one free guest/year — was **never published and has not been re-confirmed since**. **Do not uncomment without Amanda/Caleb signing off.** Uncommenting is the only work required; add `abf-grid-3` to the `.abf-grid` div and the layout goes 3-up (already in the CSS).
2. **Eustis only.** Amber Brooke has two farms (Eustis, Williston). CrowdView has exactly one location (Eustis, id 17) and one event, both Eustis. **If Williston runs its own fall festival, it needs its own page and its own event row — it does not exist anywhere in our data today.**
3. **On-sale date not set.** CrowdView's `event_phase` has In Season starting **2026-09-14**, five days before the festival opens (9/19). The page does not print an on-sale date anywhere, so nothing is wrong today — but if this is meant to go live earlier than 9/14, say so.
4. **Peak-day capacity still NOT on this page.** The garbled *"68 per two-hour window"* figure remains unverified and is correctly omitted, same as on the flash page.
5. **Early Bird / End of Season phases do not exist.** Bryan paused that strategy work on 8/12 (*"we put on pause strategy for dates and timelines for early bird and end season"*). This page covers In Season only. If an early-bird tier lands, it's a third row in the price table, not a new page.

## 🎨 Design notes

- Same palette as the flash page, sampled live from `amberbrookefarms.com`: navy `#36578c` headings, terracotta `#c66a2b` for every buy/CTA, sage `#5c7f71` for value/secondary, wheat `#debc8c` for information callouts, cream `#f7f5e7` page field.
- **The Halloween Weekend callout uses navy-on-wheat**, not terracotta — same discipline as the flash page's blackout notice. Terracotta means *buy* on this brand; a peak-pricing notice is information, not a CTA.
- **The $3-savings note uses sage**, not terracotta, for the same reason — it's value messaging, not a second buy button.
- **Reused, not rebuilt:** the `.abf-price-rows` / `.abf-price-row` online-vs-gate component was already defined in the flash page's CSS and then went unused when the one-price block replaced it. It is exactly the two-tier table this page needs, so it was adopted as-is rather than reinvented.
- **New for this page:** the **season-calendar strip** (`.abf-cal`) — three month cards + the Halloween Weekend callout. The flash page never needed it because the Any-Day ticket was date-agnostic by design; an in-season GA is date-bound, so *"which days are you even open"* becomes a first-class question and belongs above the ticket table.
- Hero photo, gallery marquee (13 images ×2 for the seamless loop), and logo badge all carry over unchanged.
- Mobile: `.abf-cal-grid` and `.abf-grid-3` both collapse to one column at ≤900px, matching the donor's proven breakpoints. This client is **92% mobile** — every layout decision here is mobile-first.

## 🔌 Hybrid-loader wiring — loader v8 (Cloudflare Pages primary)

New page → **born on Cloudflare Pages**. No jsDelivr, no migration, **no `purge.sh`**, no `?c7rev=`. A push to `crowd7-public` IS the deploy.

Paste the v8 loader snippet (`code-snippets/ts-hybrid-loader-runbook.md` § "The canonical loader (v8…)") into the page's Raw HTML block, editing only:

- `u3` → `'clients/amber-brooke-farms/design/'`
- `u4` → `'ticketspice-pages/eustis/fall-festival-2026/'`
- `f`  → `'amber-brooke.fall-festival-content'`

**Do NOT paste the floating "Buy Tickets" button separately.** It lives inside the content HTML and is injected by the loader — verified in a browser harness (`position: fixed`, renders correctly). The flash-sale brief's instruction to paste it as a second block is a leftover from an earlier architecture; following it here would produce two floating buttons.

The CrowdView pop-up block is already retargeted (`C7A_PAGE = 'eustis-fall-festival-2026'`) — no edit needed.

**Loader snippet (instantiated, ready to paste):** `crowd7/data/clients/amber-brooke-farms/design/ticketspice-loaders/eustis.fall-festival-2026.ts-loader-snippet.v8.html` — private repo, per the loader-is-IP rule. Pre-paste assertion `grep -c '\.html\|innerHTML\|fetch'` returns **0**.

**End-to-end verified 2026-08-28** in a local browser harness that simulates the TS Raw HTML block: loader fetched from Cloudflare Pages (`[c7-loader] loaded from Cloudflare Pages, folder=production/`), injected cleanly, exactly one `#c7-hybrid-content`, no scanner `appendChild` SyntaxError, all four injected scripts re-executed (confirmed by the CrowdView pop-up API call firing with the right `account`/`page` params), scroll-reveal fires on real scroll, floating buy-bar renders fixed. Content asserted live: Value $19.95 / Peak $21.95, the nine peak dates, three calendar cards, four add-ons, four FAQ items.

**Verify the RIGHT surface:** `assets.crowd7digital.us/clients/amber-brooke-farms/design/ticketspice-pages/eustis/fall-festival-2026/preview/amber-brooke.fall-festival-content.html` **and** the live TS page render. Checking the local file or `raw.githubusercontent.com` verifies the source, not the page.

## ✅ Three artifacts

1. **Content HTML** — `preview/amber-brooke.fall-festival-content.html` (the loader fetches this)
2. **Standalone preview** — `preview/amber-brooke.fall-festival-content-preview.html` (`open` in a browser)
3. **This build brief**

Both are mirrored into `production/` — promote by overwriting `production/` from `preview/` once approved.

## 📋 Pre-publish checklist

- [ ] Season Pass decision — publish (uncomment + add `abf-grid-3`) or leave out
- [ ] Confirm Eustis-only, or scope a Williston page
- [ ] Confirm the on-sale date vs. the 9/14 In Season phase in CrowdView
- [x] ~~Configure peak pricing / date-picker / arrival windows~~ — **already live in the cart**, verified field by field
- [ ] **Resolve item A** — the seven bookable dates the client's date guide doesn't list (Sept 25 · Nov 2, 6, 9, 13, 16, 20)
- [ ] Confirm the `10OFF` tracking-code discount is intentional
- [ ] Mat's/Bryan's eyes on the preview
- [ ] Promote `preview/` → `production/`, push — no purge needed (born-on-Cloudflare)
- [ ] **Remove the existing `header.rawHtml2` block**, then paste the v8 loader + floating-button blocks into `2026-eus-fall-festival`
- [ ] Verify against `assets.crowd7digital.us` AND the live TS render
- [ ] Add to the `TS-CDN-MIGRATION.md` ledger as **born-on-Cloudflare**

## 🗒 Open items (Mat / Bryan / Amanda)

1. **Season Pass** — is the new structure final? This is the single biggest unlocked item on the page, and it's Bryan's stated lever for the 18–20% → 30–50% repeat-rate goal.
2. **Williston** — one festival or two?
3. ~~Live TicketSpice page URL~~ — **RESOLVED.** `https://amberbrookefarms.ticketspice.com/2026-eus-fall-festival`.
4. **The seven unlisted bookable dates (item A above)** — cart exclusions, or publish them? Blocks go-live.
5. **Replacing vs. keeping their existing hero.** The live page runs a hand-coded 5.2 KB `header.rawHtml2` block (its own hero, marquee, what's-included, FAQ, and a value/peak date table with a `setInterval` calendar-colouring script). This page **supersedes all of it** — pasting the loader without removing that block would double every section. Their existing block is saved at `artifacts/existing-page-header-rawhtml2.html` for reference before it's replaced.
