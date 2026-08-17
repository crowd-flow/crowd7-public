# 🌾 TicketSpice Build Brief — Warm Belly Farms (Cottage Grove) · Full Harvest Flash Sale

**Page:** brand-new standalone flash-sale page (Aug 18–22 window) — separate TicketSpice page from Warm Belly's normal/in-season Full Harvest page, per Mat's decision 2026-08-17. No prior Full Harvest flash TS page exists in `crowd7-public`; this is a from-scratch build.
**Built by:** Crowdly · 2026-08-17 (WS4, urgent — flash opens 2026-08-18, tomorrow at time of writing)
**Structural parent:** Eckert's Millstadt Farm Admission 2026 — see `artifacts/build-plan.md` §1.
**Locked-facts source:** `work/crowd7/projects/warm-belly-full-harvest-flash-page/state.md` § 🔒 Locked Inputs (7/24/26 strategy call with the client on the line, `meetings/2026/7.24.26.Crowd7WarmBellyStrategyCall.transcript.md`) + `artifacts/build-plan.md`. Every fact below traces to one of those two.

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date-window Actions, insurance) — the part the hybrid loader does NOT own. Page content/design (hero, banner, ticket cards, gallery) ships from `crowd7-public` via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged, not invented)

1. **Timezone for the Aug 18–22 order-date close — UNCONFIRMED, do not guess.** Neither state.md nor the build plan states a timezone for the flash window's close. Configure the "Order Date Is Between" Action's window explicitly in whatever timezone Bryan confirms (Central is the reasonable default — Warm Belly Farms is Cottage Grove, WI — but this brief does not assume it silently). See Open Items #1.
2. **Exact live TS `<h4>` ticket names are placeholders.** The content HTML's slash-through `GATE` map ships with `"Any-Day Admission"` and `"Season Pass"` as literal ticket-name keys, matching the locked pricing-call names verbatim. If the cart is built with different display names, the slash-through struck-price pricing on the live page will silently fail to render (no error, just no strikethrough) until the `GATE` map is corrected to match. See Open Items #2.

## 🎫 Native TicketSpice ticket types (2 total)

| # | Ticket type | Online (flash) price | Gate/struck price | Cap | Notes |
|---|---|---|---|---|---|
| 1 | **Any-Day Admission** | **$11.95** | $18.00 (door price) | **1,500 tickets, hard cap** | Deliberately NOT date-based — the value-add framing per Bryan's call notes (redemption drops 8–10% on early any-day sales vs. date-locked tickets, which is why the flash leads with this rather than a straight discount). Configure the ticket type's inventory cap at exactly 1,500 in TicketSpice — this is a native inventory limit, not something the loader enforces. |
| 2 | **Season Pass** | **$29.95** (marketed "40% off") | $45.00 (season pass price) | none stated | The "40% off" framing is a marketing badge on the content-HTML card, independent of TS config — TS just needs the raw $29.95 price live. |

**Ticket insurance: OFF.** Explicit client instruction from the 7/24 call — it did not work last year and hurt conversion. Confirm this is disabled at the account/page level, not just unchecked by default.

## 📅 The Aug 18–22 order-date close — native TS Action

Per state.md §Locked Inputs and build-plan.md §7, this page is **single-phase for its entire life** — no phase-engine JS, no `getPhase()` date gate in the content HTML. The close is entirely a native TicketSpice mechanism:

- Configure a conditional **Action** on both ticket types using an **"Order Date Is Between"** (or TS's equivalent date-rule) condition scoped to **Aug 18 00:00 – Aug 22 23:59** (timezone TBD, see Confirm-Before-Publish #1), so both ticket types stop being purchasable the moment the window closes — no manual unpublish needed.
- This mirrors the BooMont flash Action pattern (same `orderDateIsBetween` mechanism, different dates/tickets).
- **This is Bryan/TS-cart config, not our content HTML or JS** — the runbook is explicit that date rules and day-of-week Actions stay native. Per Mat's Riamede-precedent directive, marketing pages switch phases via a manual paste, not a JS clock — the automated close belongs entirely in this native Action.

## 🎨 Slash-through pricing — where it lives

Both tickets get the struck gate/season-pass price via the name-keyed JS + `MutationObserver` + `content: attr(data-gate)` pattern already built into the content HTML (`crowd7/data/clients/_patterns/slash-through-pricing.md`) — this is NOT a native TS Action, it's our own JS targeting TS's rendered `#ticketBlock`. **The one thing TS config needs to get right for this to work:** the ticket-type display names in the cart must exactly match `"Any-Day Admission"` and `"Season Pass"` (see Confirm-Before-Publish #2) — a one-character mismatch means the strikethrough silently doesn't render.

## 📲 SMS launch

Warm Belly already runs TicketSpice **and** TicketSpice SMS — an SMS launch is part of the plan per the 7/24 call. This is Bryan/TicketSpice SMS config, not a page-build item — flagged here so it isn't dropped, no action needed from this brief.

## ✅ Three artifacts (this build)

1. **Content HTML** — `preview/cottage-grove.full-harvest-flash-content.html` (loader fetches this; built WS2)
2. **Standalone preview** — `preview/cottage-grove.full-harvest-flash-content-preview.html` (`open` in a browser for Mat/Bryan to eyeball; built WS3, mock `#ticketBlock`)
3. **This build brief** — `ticketspice-build-brief.full-harvest-flash.md`

Plus a fourth artifact outside this repo (private IP, never public): the instantiated loader snippet at `crowd7/data/clients/warm-belly-farm/design/ticketspice-loaders/cottage-grove.full-harvest-flash.ts-loader-snippet.v8.html`.

## 📋 Pre-publish checklist

- [ ] Confirm timezone for the Aug 18–22 "Order Date Is Between" Action (Confirm-Before-Publish #1)
- [ ] Confirm/correct the live ticket-type display names against the placeholder `"Any-Day Admission"` / `"Season Pass"` GATE-map keys (Confirm-Before-Publish #2)
- [ ] Configure **Any-Day Admission** at $11.95, hard cap 1,500 tickets
- [ ] Configure **Season Pass** at $29.95
- [ ] Confirm **ticket insurance is OFF**
- [ ] Configure the Aug 18–22 order-date-window close Action on both ticket types
- [ ] Get a live buyer-facing Warm Belly TicketSpice page URL for the loader paste (Open Items #3 — blocks only the paste, never this build)
- [ ] Get Mat's/Bryan's eyes on the content-HTML preview before promoting `preview/` → `production/`
- [ ] Add this page to `TS-CDN-MIGRATION.md` as **born-on-Cloudflare** once the loader (WS5) is instantiated
- [ ] Handle the suppression job separately (buy-buttons on warmbelly.farm already selling Full Harvest tickets — see state.md Open Asks; not part of this TS config pass but arguably more urgent)

## 🗒 Open Items (for Mat / Bryan)

1. **Timezone for the Aug 18–22 flash-window close** — not stated anywhere in state.md or the build plan. Needed before the order-date-window Action can be configured precisely. No default was guessed (Central is the operating-region guess, not an assumption baked into config).
2. **Exact live TS `<h4>` ticket names** — placeholder names `"Any-Day Admission"` / `"Season Pass"` ship first (matching the locked pricing-call names verbatim); confirm against a live cart dump once Bryan builds it and correct the content HTML's `GATE` map in a follow-up push if TS's actual names differ.
3. **TicketSpice account/page target** — no URL on record. Blocks only the human loader-paste step, never this build or the ticket-type configuration itself.
4. **Suppression job (unowned)** — swap warmbelly.farm's buy-ticket buttons to a "registration opens soon" pop-up before Aug 18 so nobody buys ahead of the flash window; scour the site for stray ticket links. They are already selling Full Harvest tickets today. Arguably more urgent than this page — see state.md Open Asks.
5. **Early Bird / In Season pricing (Aug 23 onward) is NOT locked** — irrelevant to this flash-only page, but flagged so that switchover doesn't get discovered late (same gap that bit BooMont).
