# 🦇 TicketSpice Build Brief — Confreda Farms (Hope, RI) · Scary Acres 2026

**Page:** brand-new, from-zero standalone TicketSpice page. No `crowd7-public` folder existed for
this client before this build (2026-08-24). Flash Sale opens **Wednesday Aug 26, 2026** — 2 days
out at build time.
**Built by:** Crowdly · 2026-08-24 (WS3/WS5 of `confreda-ticketspice-pages`)
**Locked-facts source:** `crowd7/data/clients/confreda-farms/events/scary-acres/event-info.md`,
drawn from `6.23.26.Crowd7ConfredaFarmsStrategyCall.transcript.md` (Cory) + live
`scaryacresri.com` (checked 2026-08-24) + `artifacts/evidence-sweep.md`.
**Client contact:** Cory (Corey Confreda) — `coreycconfreda@gmail.com`, `+1 (401) 580-2152`

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date-based Actions)
— the part the hybrid loader does NOT own. Page content/design ships from `crowd7-public` via the
loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## 🚨 READ FIRST — pricing conflict, not resolved by this build

The 6/23 strategy call and the **currently-live** `scaryacresri.com` describe two different
pricing structures for 2026. Both are the client's own current artifacts — a genuine disagreement,
not a stale-vs-fresh situation. **This page is built on the 6/23-call numbers** (consistent with
the rest of the Crowd7 campaign — ads, emails, phase windows were all built around these numbers),
but Cory needs to confirm which set is real before Wednesday:

| | 6/23 call (used in this build) | Live site (`scaryacresri.com`, checked 8/24) |
|---|---|---|
| Season passes | Killed — sold <12 last year | **NEW**: GA Season Pass $99.99, VIP Season Pass $149.99 |
| General | $29.95 off-peak / $34.95 weekend ($40 onsite) | Combo $30 (Sun/Mon/Thu) / $35 (Fri/Sat), no onsite price shown |
| Fast Pass / VIP | Fast Pass Ultimate $74.95 online / $59 onsite | VIP $50 flat |
| At-door sales | Fast Pass sellable onsite when sold out | **"NOT available at the door"** — online only |

**If Cory confirms the live-site numbers are the real 2026 pricing, this is a pricing-only edit,
not a rebuild** — the three-artifact pattern supports a surgical price swap.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged, not invented)

1. **Run dates are genuinely unresolved.** Three non-reconciling statements on the same 6/23 call
   (moved back a week / "goes to Nov 7, second weekend" / "the 6th and 7th"), never settled since.
   The page does NOT print specific calendar dates for the season — it shows the confirmed
   *weekly operating pattern* only (days + hours). See Open Items #1.
2. **Fast Pass Ultimate price has two conflicting statements on the same call** — $74.95
   online/$59 onsite (used here, the earlier/more fully-specified statement) vs. a later $49/$59
   float. See Open Items #2.
3. **VIP has no confirmed price anywhere.** The only figure in any source is the live site's "$50
   flat" — but that's under the OLD uncapped VIP structure the call explicitly replaced. The card
   ships with a "Starting at" framing, no hard number. See Open Items #3.
4. **VIP per-time-slot cap is unconfirmed** — the only number ("~60 per slot") was Bryan thinking
   out loud, not a Cory-confirmed figure.
5. **Exact live TS `<h4>` ticket name is a placeholder** — `"General Admission"` in the GATE map,
   unverified against a live cart (TS workspace invited today, not yet configured).

## 🎫 Native TicketSpice ticket types (3 total, per the 6/23-call baseline)

**No season pass this year** per the call (sold <12 combined last year, explicitly killed) — do
not build one unless Cory reverses this based on the pricing-conflict resolution above.

| # | Ticket type | Online price | Gate/struck price | Notes |
|---|---|---|---|---|
| 1 | **General** | **$29.95 off-peak / $34.95 weekend** | **$40.00** (onsite/door) | Needs a date-based Action to shift price by day-of-week (see below). |
| 2 | **Fast Pass Ultimate** | **$74.95** | $59.00 (onsite) — **do NOT strike this, see below** | Front-of-line access + ticket insurance. **The ONLY ticket sellable onsite when the event is sold out.** |
| 3 | **VIP** | **No confirmed price** — ships as "Starting at" framing pending Cory | — | Re-scoped to date/time-based, capped per slot (replaces last year's uncapped any-time VIP). Cap number unconfirmed (Open Items #4). |

**⚠️ Fast Pass Ultimate pricing is INVERTED — online ($74.95) is HIGHER than onsite ($59) — and
that inversion is intentional client pricing, confirmed twice on the same call. Do not "fix" it.**

**Merchandise: none this year.** Tariffs roughly tripled the order cost (~$5k quoted → ~$23k) —
canceled. No beer/wine on site either. Don't configure a merch add-on.

## 📅 Dates / hours — native TS config

- **Run dates:** genuinely unresolved (see Confirm-Before-Publish #1) — do not configure a hard
  season start/end until Cory confirms. CrowdView's Sept 11–Nov 7 window is a calendar-derived
  planning estimate, not a client confirmation.
- **Weekly operating pattern (confirmed, not in conflict with the call):** Thursday & Monday
  7–9pm; Friday/Saturday/Sunday 7–10pm. Gates open 7pm, trail opens at sundown. Safe to configure.
- **Off-peak vs. weekend General pricing needs a date-based Action** — General admission price
  should shift by day-of-week per the two-tier pricing above.

## 🎨 Slash-through pricing — where it lives

General gets its struck $40.00 gate price via the name-keyed JS + `MutationObserver` +
`content: attr(data-gate)` pattern (`crowd7/data/clients/_patterns/slash-through-pricing.md`).
**Fast Pass Ultimate is deliberately excluded from the GATE map** — its onsite price ($59) is
LOWER than online ($74.95), so a strike-through there would falsely claim a discount that doesn't
exist. **The one thing TS config needs to get right:** the General ticket-type display name in the
cart must exactly match `"General Admission"` (Confirm-Before-Publish #5) — a mismatch means the
strikethrough silently doesn't render.

## ✅ Three artifacts (this build)

1. **Content HTML** — `preview/scary-acres-2026-content.html` (loader fetches this)
2. **Standalone preview** — `preview/scary-acres-2026-content-preview.html` (`open` in a browser
   for Mat/Cory to eyeball; mock `#ticketBlock` stub included)
3. **This build brief** — `ticketspice-build-brief.scary-acres.md`

Plus a fourth artifact outside this repo (private IP, never public): the instantiated loader
snippet at
`crowd7/data/clients/confreda-farms/design/ticketspice-loaders/hope.scary-acres-2026.ts-loader-snippet.v8.html`.

## 📋 Pre-publish checklist

- [ ] **Get Cory's confirmation on the pricing-conflict question** (banner above) — this gates
      everything else in this brief
- [ ] Confirm real run dates (Confirm-Before-Publish #1)
- [ ] Confirm Fast Pass Ultimate price: $74.95/$59 or $49/$59 (Confirm-Before-Publish #2)
- [ ] Confirm a real VIP price (Confirm-Before-Publish #3)
- [ ] Confirm VIP per-time-slot cap (Confirm-Before-Publish #4)
- [ ] Configure **General** at $29.95 off-peak / $34.95 weekend, date-based Action, onsite $40
- [ ] Configure **Fast Pass Ultimate** at $74.95 online / $59 onsite, front-of-line + insurance
- [ ] Configure **VIP**, date/time-based, capped per slot, once Cory gives a real price + cap
- [ ] Confirm/correct the live General ticket-type display name (Confirm-Before-Publish #5)
- [ ] Get Mat's/Cory's eyes on the content-HTML preview before promoting `preview/` → `production/`
- [ ] Add this page to `TS-CDN-MIGRATION.md` as **born-on-Cloudflare** once the loader is
      instantiated (done, see ledger)
- [ ] Get a live TicketSpice page URL for the loader paste (blocks only the paste, never the build)

## 🗒 Open Items (for Mat / Cory)

1. **Which pricing is real for 2026 — the 6/23 call numbers or what's live on scaryacresri.com
   right now?** They materially disagree (season passes, General tiers, VIP/Fast Pass structure,
   at-door sales policy). Highest-priority open question — affects displayed prices Wednesday.
2. **Final run dates** — three different answers came up on the same call; need one real answer.
3. **Fast Pass Ultimate: $74.95 online / $59 onsite, or $49 online / $59 onsite?** Both were said
   on the same call, never reconciled.
4. **VIP per-time-slot cap and price** — no confirmed number for either exists anywhere.
5. **Hero/carousel imagery** — no site clone exists for this WordPress property; the content HTML
   ships CSS-only (no client photography). Source live imagery from `scaryacresri.com` or supply
   photos directly if richer visuals are wanted before launch.
