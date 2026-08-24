# 🎃 TicketSpice Build Brief — Confreda Farms (Hope, RI) · Fall Festival 2026

**Page:** brand-new, from-zero standalone TicketSpice page. No `crowd7-public` folder existed for
this client before this build (2026-08-24). Flash Sale opens **Wednesday Aug 26, 2026** — 2 days
out at build time.
**Built by:** Crowdly · 2026-08-24 (WS2/WS5 of `confreda-ticketspice-pages`)
**Locked-facts source:** `crowd7/data/clients/confreda-farms/events/fall-festival/event-info.md`,
drawn from `6.23.26.Crowd7ConfredaFarmsStrategyCall.transcript.md` (John, GM) +
`artifacts/evidence-sweep.md`. Every fact below traces to one of those two.
**Client contact:** John (Jonathan Confreda, GM) — `jonathan@confreda.net` / `jconfreda@gmail.com`

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date rules) — the
part the hybrid loader does NOT own. Page content/design (hero, banner, ticket cards, gallery)
ships from `crowd7-public` via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged, not invented)

1. **Operating hours are NOT confirmed for 2026.** The page shows 10am–5pm, pulled from
   `confredasfallfest.com`'s stale prior-season page (still showing 2024/2025 dates). John has
   never stated 2026 hours on any surface swept. See Open Items #1.
2. **The Nov 1 close date is soft.** John floated "let's leave it in there as november 1st" with
   no firm commitment on the 6/23 call. The page currently shows Sept 26 – Oct 31 only (does NOT
   include Nov 1) — confirm with John whether to extend before Wednesday. See Open Items #2.
3. **Exact live TS `<h4>` ticket name is a placeholder.** The content HTML's slash-through `GATE`
   map ships with `"General Admission"` as the literal key. The TS workspace for this event was
   invited today (2026-08-24) and the cart has not been configured — confirm the exact display
   name once built, or the strikethrough will silently fail to render. See Open Items #3.

## 🎫 Native TicketSpice ticket types (3 total)

Display order is **locked** — John specified it explicitly on the 6/23 call. Do not reorder.

| # | Ticket type | Online price | Gate/struck price | Notes |
|---|---|---|---|---|
| 1 | **Family Four Pack** | **$59.95** | — (no onsite price stated) | 4 admissions + 4 donuts + 2 pie pumpkins, framed as a $78 value ("Save 30%" badge on the content card — marketing only, not a TS field). |
| 2 | **Season Pass** | **$39.95**, online-only | — (no onsite price stated) | Unlimited visits all season. One donut + one pie pumpkin, included **once**, not every visit. The "10% off store" idea was discussed and explicitly **vetoed** for margin/ops complexity — do not add a store discount to this ticket. |
| 3 | **General Admission (GA)** | **$15.00** | **$17.00** (onsite/door) | Hayride + grounds + corn maze folded in — **no separate maze add-on** this year (a change from prior years). Pick-your-own pumpkins are priced separately by the pound, NOT included in the ticket price. This is the only ticket with a real online-vs-onsite delta. |

**Ticket insurance:** not discussed on the call — no instruction either way; use Crowd7's
standard default unless John says otherwise.

## 📅 Dates — native TS config

- **Event window:** Saturday Sept 26 – Saturday Oct 31 (Halloween), 2026.
- **Days open:** Saturdays, Sundays, and Columbus Day (Monday, Oct 12) only. Configure the TS
  calendar/date-picker to only offer those days — no general weekday sale.
- **Nov 1** is NOT currently configured (see Confirm-Before-Publish #2) — add only on John's
  explicit yes.
- **No flash-specific pricing window exists in the cart config** — the call only set season
  pricing, and per event-info.md §4 the flash sale launches at season price. There is no
  time-boxed "Order Date Is Between" Action needed for a flash-only price tier (unlike some other
  Crowd7 flash builds) — this page's price stays constant through Flash → Early Bird → In Season
  unless John/Bryan set a differentiated flash discount before Wednesday.

## 🎨 Slash-through pricing — where it lives

GA gets its struck $17.00 gate price via the name-keyed JS + `MutationObserver` +
`content: attr(data-gate)` pattern already built into the content HTML
(`crowd7/data/clients/_patterns/slash-through-pricing.md`) — NOT a native TS Action, it targets
TS's rendered `#ticketBlock`. **The one thing TS config needs to get right for this to work:** the
GA ticket-type display name in the cart must exactly match `"General Admission"` (see
Confirm-Before-Publish #3) — a one-character mismatch means the strikethrough silently doesn't
render. Season Pass and Family Four Pack are deliberately NOT struck — no onsite/door price exists
for either anywhere in the source material.

## ✅ Three artifacts (this build)

1. **Content HTML** — `preview/fall-festival-2026-content.html` (loader fetches this)
2. **Standalone preview** — `preview/fall-festival-2026-content-preview.html` (`open` in a browser
   for Mat/John to eyeball; mock `#ticketBlock` stub included)
3. **This build brief** — `ticketspice-build-brief.fall-festival.md`

Plus a fourth artifact outside this repo (private IP, never public): the instantiated loader
snippet at
`crowd7/data/clients/confreda-farms/design/ticketspice-loaders/hope.fall-festival-2026.ts-loader-snippet.v8.html`.

## 📋 Pre-publish checklist

- [ ] Confirm 2026 operating hours (Confirm-Before-Publish #1)
- [ ] Confirm/decide the Nov 1 test day (Confirm-Before-Publish #2)
- [ ] Configure **Family Four Pack** at $59.95
- [ ] Configure **Season Pass** at $39.95, online-only
- [ ] Configure **General Admission** at $15.00 online / $17.00 onsite
- [ ] Restrict sale days to Sat/Sun + Columbus Day (Oct 12)
- [ ] Confirm/correct the live GA ticket-type display name against the placeholder
      `"General Admission"` GATE-map key (Confirm-Before-Publish #3)
- [ ] Get Mat's/John's eyes on the content-HTML preview before promoting `preview/` → `production/`
- [ ] Add this page to `TS-CDN-MIGRATION.md` as **born-on-Cloudflare** once the loader is
      instantiated (done, see ledger)
- [ ] Get a live TicketSpice page URL for the loader paste (blocks only the paste, never the build)

## 🗒 Open Items (for Mat / John)

1. **2026 operating hours** — no current-season source states them anywhere. Only number in
   hand is `confredasfallfest.com`'s stale 10am–5pm.
2. **Nov 1 test day** — John's own words were non-committal ("let's leave it in there... as
   november 1st"). Needs a real yes/no before Wednesday.
3. **Exact live TS ticket-type display names** — impossible to know pre-cart-build; the GA name
   above is a best-guess match to the pricing-call language. Confirm/correct once Bryan builds the
   cart (invited 8/24, not yet configured as of this build).
4. **Attractions beyond hayride/maze/grounds/PYO pumpkins** — only these four are confirmed by
   John directly; any broader attraction list (petting zoo, playground, etc.) is unconfirmed.
5. **Flash-specific discount, if any** — the call only set season pricing; confirm whether the
   Aug 26–30 flash window gets its own discount or launches at season price (current build
   assumption: season price, no discount).
