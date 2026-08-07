# Riamede Farm — Season 2026 TicketSpice Build Brief

**Form:** `1017178` · **Client contact:** Ashley Asdal · **Account lead:** Bryan Japhet
**Spec:** `~/Desktop/crowd7/data/clients/riamede/ticket-types-2026.md` (locked 2026-08-03)

**⚠️ This is an OVERLAY, not a from-scratch cart.** Per the 8/3 call, Ashley/Bryan already have the fall page mostly built — actions, dates, and prices exist in the native TS cart. This brief documents the **deltas** needed for the season-2026 rebuild, ordered the way TS asks for values (ticket types → prices → caps → date rules → Actions → merch). Confirm each line against the LIVE cart before applying — don't assume a blank slate.

## 1. Ticket types & prices

| # | Ticket name (CONFIRM exact `<h4>` text) | Price | Window | Notes |
|---|---|---|---|---|
| 1 | *Family Four-Pack Fall Bundle* | $79.95 | Sale: Aug 10–14. Redeem: Sept 1 – Nov 1 | 4 admissions + bag of donuts + commemorative apple basket. **Redemption gated to Sept 1+** (apples not ready until ~8/29) — TS Action or date-restricted redemption, not just a sale-window cap. |
| 2 | *Flash Sale Season Pass* | $29.95 | Sale: Aug 10–14. Valid: all season | 10% off in-store (up from 5% last year) + 1 single-use guest ticket (checkbox redemption on the pass, NOT a separate QR/ticket). |
| 3 | *Flash Sale Any-Day Admission* | $11.49 | Sale: Aug 10–14. Valid: any single operating day, all season | Successor to last year's $10.50 any-day ticket. |
| 4 | *Bloomfest Weekend Admission* | $8.95 online / $12.95 gate | Aug 15–30, Sat+Sun only | Not discounted — season's lowest weekend price by design. Killed for 2026: last year's separate Aug 1–15 flower-entry / veggie-entry ticket types — do not recreate. |
| 5 | *Weekday Admission* | **$5 flat, all season** (was $3.50 last year, floated with season) | Every weekday except Tuesday | **Deliberately NOT tiered** — flat barrier price, not a discount ladder. |
| 6 | *Fall Fest Weekend & Holiday Admission* | 3 date-tiered steps — see §2 | Sept 1 – Nov 1, weekends + 2 holiday Mondays | Mechanically may be the SAME underlying ticket type as #4 (last year Ashley just renamed it mid-run) — confirm with Ashley/Bryan whether 2026's cart keeps them as one ticket type with date-based pricing Actions, or two separate types. Our marketing page (content HTML) treats them as two distinct cards either way. |

## 2. Fall Fest date-tiered pricing (ticket #6)

| Window | Online | Gate | Driver |
|---|---|---|---|
| Sept 1 – Sept 19 | $12.50 | $16.50 | Wagons + ponies start Labor Day weekend (9/5–9/7) |
| Sept 19 – Oct 25 | $15.50 | $19.50 | Pumpkin patch opens 9/19 — peak season |
| Oct 26 – Nov 1 | $12.50 | $16.50 | Nobody picks pumpkins after Halloween weekend |

Configure as three sequential price-change Actions (or three date-scoped ticket variants under one category) — whichever matches how last year's cart was actually built. **This is a native TS date/price concern; our content HTML mirrors the same three windows for its marketing copy but does not drive TS's pricing.**

## 3. Caps

No quantity caps called for in the spec (unlike the Eckert's Jack's Lighted Trail tiered-sellout pattern — Riamede has no sell-out mechanic this season). Leave uncapped unless Ashley wants headcount limits on any weekend.

## 4. Date-rule requirements

- **🚫 Riamede is closed Tuesdays — strip Tuesday from every calendar/date-picker across the whole form**, not just the weekday-admission ticket. Confirm this is already true in the live cart; if not, it's the single highest-priority date fix per the 8/3 call ("take Tuesday off of the offering off of everything").
- **Weekend = Saturday + Sunday**, plus two named holiday Mondays that run as weekend-equivalent days:
  - **Monday, Sept 7 — Labor Day**
  - **Monday, Oct 12 — Columbus Day**
- **Friday, Sept 11 (Rosh Hashanah) is explicitly SKIPPED** — do not open Fall Fest weekend admission/attractions on this date even though it's a Friday adjacent to a weekend; too early in the calendar, low expected volume, and Ashley normally observes it.
- **Flash-sale window:** Aug 10 00:00 – Aug 14 (through end of day, i.e. sale closes before Bloomfest opens Aug 15). Do NOT let flash-sale and Bloomfest tickets be simultaneously purchasable for the same date — the 8/3 call flagged this exact overlap risk ("I don't want to have an $8.95 ticket and an $11.95 [sic, $8.95] ticket on the same day available").
- **Family Bundle redemption:** gated to Sept 1 – Nov 1 (not usable during Bloomfest — apples aren't ready). Sale window (when it can be *purchased*) is Aug 10–14 only.

## 5. Actions (native TS logic)

1. **Bloomfest ticket suppression during flash sale** — the $8.95 Bloomfest ticket should NOT be purchasable/visible Aug 10–14, so buyers take the flash offer instead. (Confirm this is enforced by ticket-type date windows already, or needs an explicit Action.)
2. **Family Bundle redemption-date restriction** — see §4.
3. **Fall Fest 3-tier pricing** — see §2 (three sequential Actions or three date-scoped variants).
4. **Season Pass guest-ticket redemption** — configure as a redeemable checkbox item on the pass itself (per Ashley's confirmation on the 8/3 call: "it's not going to be an individual QR code, it's just going to be a checkbox that you go redeem items").
5. **Weekday $5 flat pricing** — remove any tiered/floating weekday pricing Action from last year; replace with a flat $5, all season, Tuesday excluded.

## 6. Merch / inclusions (non-ticket line items)

- **Family Bundle basket** — Ashley has physical apple baskets pre-stocked (confirmed "a case or two" on the call). No separate merch SKU needed if the basket redemption is handled as part of the bundle ticket type; flag to Ashley if she wants it broken out as a trackable inventory item.
- **Season Pass 10% discount** — in-store only, redeemed by showing the pass (same mechanism as last year's 5% version, just the percentage changed).

## 7. Copy / disclaimer requirements (must appear verbatim near the Family Bundle)

> Basket is filled with **farm-fresh** apples — not guaranteed you-pick. Redeemable after Aug 29 (Sept 1 – Nov 1).

This exact framing is required per Ashley's language on the 8/3 call — she may be filling baskets from a bin at the exit rather than guaranteeing hand-picked contents, and doesn't want a false you-pick promise.

## ⚠️ OPEN — blocks final confirmation, does NOT block the build

1. **Exact live ticket `<h4>` names** for all six ticket types above — needed to wire the content HTML's slash-through `GATE` map and avoid a silent no-op. Requires a live dump of form `1017178`.
2. **Family Bundle advertised value figure** — the content HTML currently omits the disputed "$117 value / save $37" claim entirely (leads with itemized inclusions instead) pending Mat's corrected math at the new $3.99/lb apple price.
3. **Whether ticket #4 (Bloomfest) and #6 (Fall Fest) are one TS ticket type or two** — affects whether §2's three price steps are Actions on a single type or three separate date-scoped types. Either way, the content HTML's two marketing cards are correct; this only affects how Bryan/Ashley wire the backend.
