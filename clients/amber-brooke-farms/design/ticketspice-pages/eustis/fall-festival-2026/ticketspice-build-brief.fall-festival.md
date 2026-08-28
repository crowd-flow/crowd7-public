# 🍂 TicketSpice Build Brief — Amber Brooke Farms (Eustis) · 6th Annual Fall Festival 2026 (In Season)

**Page:** the **main in-season ticketing page** — the counterpart to the Any-Day Flash Sale page that ran Jul 31 – Aug 4.
**Built by:** Crowdly · 2026-08-28
**Design donor:** the client's **own** flash-sale page (`../anyday-flash-2026/`) — same `#abf-funnel` brand system, same loader v8 posture, same house patterns (benefits tile strip, gallery marquee, enriched info row, scroll-reveal, floating buy-bar, CrowdView pop-up block v7).
**Content source:** `work/crowd7/projects/amber-brooke-campaign-brief/artifacts/source-sweep.md` + `.../brand-palette.md` + **CrowdView Postgres** (`accounts` id 22 · `event` id 4 Fall Festival · `event_phase` · `price_book` 9).

Everything on this page is sourced. Nothing is invented. Gaps are called out as gaps.

## 🔀 The one big difference from the flash page: this page CAN lead on price

The flash page deliberately did **not** lead on price. Any-Day GA was $19.95 — identical to the non-peak online price — so there was no discount to claim, and the page led on flexibility instead. That was the right call, and the sale still underperformed (359 tickets; Bryan, 8/12: *"they stuck to their pricing… it really wasn't that great of a value"*).

**This page is the opposite case.** There is a real, defensible discount here: the **$3 online/gate gap on both tiers** — Bryan's won ask from the 7/28 negotiation, delivered by taking the gate up $1. So this page leads on **"Buy online and save $3,"** and the family-of-four math actually computes ($12), unlike Bryan's flash-sale line that didn't.

## 🎫 Native TicketSpice ticket types

**Peak pricing is a DATE TIER, not a separate ticket type.** One GA product, priced by the date the guest selects at checkout.

| Tier | Dates | Online | Gate |
|---|---|---|---|
| **Regular Days** | Sept 19 – Nov 22, excluding the four below | **$19.95** | $22.95 |
| **Halloween Weekends** | **Oct 24, 25, 31 & Nov 1** | **$21.95** | $24.95 |

- **Operating days:** September Sat + Sun · October Fri/Sat/Sun **plus Columbus Day (Mon Oct 12)** · November Sat + Sun. The date-picker must offer only these days.
- **Hours:** Fri & Columbus Day 10 AM–5 PM · Sat & Sun 10 AM–6 PM · **the four Halloween Weekend days 9 AM–6 PM** (open an hour early for capacity).
- **Ages 2 & under free** — no ticket needed.
- **Cart requirement:** the four peak dates must resolve to $21.95, every other valid date to $19.95, automatically on date selection. Do not model these as two separate purchasable ticket types the guest picks between — that invites the wrong-date-wrong-price mismatch at the gate.

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

Then paste the floating "Buy Tickets" button block (bottom of the content HTML) as a **separate** Custom HTML block on the same page.

The CrowdView pop-up block is already retargeted (`C7A_PAGE = 'eustis-fall-festival-2026'`) — no edit needed.

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
- [ ] Configure the GA ticket to price by selected date: $19.95 regular / $21.95 on Oct 24, 25, 31 & Nov 1
- [ ] Restrict the date-picker to actual operating days (Sept Sat/Sun · Oct Fri–Sun + Mon Oct 12 · Nov Sat/Sun)
- [ ] Confirm the extended 9 AM–6 PM hours print on Halloween-Weekend tickets + confirmation emails
- [ ] Mat's/Bryan's eyes on the preview
- [ ] Promote `preview/` → `production/`, push — no purge needed (born-on-Cloudflare)
- [ ] Get the live TS page URL, paste the v8 loader + floating-button blocks
- [ ] Verify against `assets.crowd7digital.us` AND the live TS render
- [ ] Add to the `TS-CDN-MIGRATION.md` ledger as **born-on-Cloudflare**

## 🗒 Open items (Mat / Bryan / Amanda)

1. **Season Pass** — is the new structure final? This is the single biggest unlocked item on the page, and it's Bryan's stated lever for the 18–20% → 30–50% repeat-rate goal.
2. **Williston** — one festival or two?
3. **Live TicketSpice page URL** for the loader paste. Until that lands this is a design artifact, not a live page.
