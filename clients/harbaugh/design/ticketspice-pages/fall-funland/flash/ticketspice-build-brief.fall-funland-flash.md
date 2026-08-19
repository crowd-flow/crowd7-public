# 🎃 TicketSpice Build Brief — Harbaugh Village Fall Funland · Flash Sale 2026

**Page:** brand-new standalone flash-sale page (Aug 19–23 window) — no prior Harbaugh TS page exists in `crowd7-public`; this is a from-scratch build.
**Built by:** Crowdly · 2026-08-17 (WS5, urgent — flash opens 2026-08-19, two days out at time of writing)
**Design donor / structural parent:** Amber Brooke Farms · Eustis · Any-Day GA Flash Sale 2026 (`amber-brooke-farms/design/ticketspice-pages/eustis/anyday-flash-2026/`) — see `artifacts/build-plan.md` §1 for the full parent-template reasoning.
**Content source:** `crowd7/data/clients/harbaugh/events/harbaugh-village-fall/event-info.md` (Harbaugh Village Funland Fall Strategy Call, Bryan → Mat 2026-08-04, last updated 2026-08-06) + `work/crowd7/projects/harbaugh-fall-funland-flash-page/state.md` + `artifacts/build-plan.md`. Every fact below traces to one of those three.

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date-window Actions) — the part the hybrid loader does NOT own. The page content/design (hero, gallery, ticket cards, Know-Before-You-Go panel) ships from `crowd7-public` via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged, not invented)

1. **Timezone for the Season Pass discount-window Action — UNCONFIRMED, do not guess.** Neither `event-info.md` nor `state.md` states a timezone for the Aug 19–23 flash window. Configure the `orderDateIsBetween` Action's window explicitly in whatever timezone Bryan/Michael confirm (Eastern is the reasonable default given Harbaugh's operating region, but this brief does **not** assume it silently — get an explicit answer before publishing the Action). See Open Items #1.
2. **Whether Flex Admission needs its own visit-date calendar Action — leans NO, confirm.** `event-info.md` explicitly calls Flex "any-day," which reads as no date restriction on redemption. Built this brief on that basis. If Bryan/Michael intend Flex to require the buyer to pick a specific visit date at purchase (the way Eckert's day-tiered admission tickets work), that's a different cart mechanism than modeled here — see Open Items #2.
3. **Flex $17.95 online-only step (post-flash, from Sep 10) is a FUTURE Action, out of scope for this launch.** Documented below so it isn't lost, but do not configure it now — it belongs to the Early Bird/In-Season phase, not the Aug 19–23 flash window.

## 🎫 Native TicketSpice ticket types (in TS-entry order)

| # | Ticket type | Price | Window | Notes |
|---|---|---|---|---|
| 1 | **Flex Admission** | **$13.95** | Flash window, Aug 19–23 | The flash lead — any-day ticket, no gate/door variant exists for this SKU (event-info.md: *"No at-the-gate flex, because a same-day walk-up is already the $19.95 fixed-date door price"*). One price, full stop, for this configuration pass. **No `orderDateIsBetween` Action needed on this ticket for the flash window itself** — it's simply the live price for as long as this ticket type is active at $13.95; the flash window is enforced by which price is live, not by a purchase-date Action gating this specific ticket. |
| 2 | **Season Pass** | **$34.95** flash (vs. **$44.95** regular) | Aug 19–23, purchase-date gated | Needs a **date-window discount Action**: `orderDateIsBetween` Aug 19 00:00 – Aug 23 23:59 (timezone TBD — see Confirm-Before-Publish #1). Regular price is $44.95; the Action drops the purchase price to $34.95 only when the order date falls in the flash window. On the content-HTML side this already renders as a plain "was $44.95 / now $34.95" compare-at price in our own markup (build-plan.md §3) — the native cart's discount Action is a separate, independent piece of config that must match the same window. |

### 🔜 Future price-step Action — NOT part of this launch, on record so it isn't missed

**Flex Admission steps to $17.95, online-only, effective Sep 10, 2026** (event-info.md §3: *"Flex Admission: $17.95 — online only, from Sep 10"*). This is downstream of both the flash window (Aug 19–23) and the Early Bird window (Aug 24–Sep 10) — it is the price Flex settles at once Early Bird ends. **Do this update on or after Sep 10, 2026.** Out of scope for the Aug 19 launch; flagging here so it's on record for whoever configures the Early Bird→In-Season transition, rather than surfacing only when someone notices the price is stale.

## 🚫 Excluded tickets — explicitly out-of-scope for THIS flash-sale TS config pass

Do not build any of the following into this launch. Listed so nobody accidentally configures them against the Aug 19–23 flash window:

- **Fixed Date Admission** ($15.95 online / $19.95 gate, peak $16.95 all-October) — belongs to the In-Season phase, not flash.
- **Early Bird** ($15.95, Aug 24 – Sep 10) — separate campaign phase, separate window, not this ticket config pass.
- **Family 4-Pack Bundle** — Early Bird and in-season only per event-info.md.
- **Fire Pits** — offered but **unpriced** (event-info.md Open Ask #1). Can't configure a priced item with no price.
- **Igloos** — offered but **unpriced** (event-info.md Open Ask #1). Same reason.
- **Launch Day Special** — unconfirmed per event-info.md (*"limited to first 300 buyers?"* — the doc's own question mark; Bryan redlined it on the 6.16 call because "Flash has outperformed"). Treat as NOT in plan until confirmed.

## 📅 Date rules / calendar Actions — the visiting-season calendar

**This is the calendar of when a ticket-holder can actually VISIT Harbaugh Village — not the Aug 19–23 purchase window.** Pulled straight from `event-info.md` / `state.md`:

- **September:** 19–20 and 26–27 only · Sat 12pm–7pm · Sun 12pm–6pm
- **October:** Saturdays + Sundays, 10am–7pm, starting October 7
- **Halloween (Sat Oct 31):** 10am–2pm (short day)
- **November:** 7–8
- **Sanderson Sisters:** Oct 17, 24 & 31 only (last three Saturdays in October), 12pm–2pm — client correction 2026-08-19; the act is NOT booked for Sept or Nov

**Does TS need its own calendar/date-picker Action to reflect these operating days?** **Likely yes, if and only if a ticket requires the buyer to pick a specific visit date at checkout.** Per Confirm-Before-Publish #2, Flex Admission reads as genuinely any-day/no-date-restriction from event-info.md's own language, so no calendar Action is modeled for it in this brief. **If that lean is wrong** — i.e., if Flex actually needs a redemption-date picker — the structural reference to build from is Eckert's day-tiered admission pattern (`ticketspice-build-brief.farm-admission-2026.md`, Millstadt): TS's native day-of-week/date Actions gate which ticket/date combinations are sellable, restricting the date-picker to valid operating days (there, Wed/Thu/Fri/Sat-Sun tiers with a closed Mon/Tue; here it would be the September-weekends-only / October-every-weekend / Halloween-short-day / November-7–8 pattern above). This is flagged as a **build step for Bryan/Michael to configure only if Confirm-Before-Publish #2 resolves toward "yes, Flex needs a visit-date picker."** Season Pass, being a season-long access product, would need the same calendar underneath it if TS enforces valid-visit-dates per product — worth deciding once for both tickets rather than twice.

## 🎨 Slash-through / native-cart pricing — NOT NEEDED on this page

**Confirmed explicitly so nobody re-derives this:** neither Flex Admission nor Season Pass has a same-ticket gate-vs-online price split on this page — Flex has no gate variant at all (it's the online-only flash price), and Season Pass's regular-vs-flash comparison is a date-window price change, not a simultaneous gate/online split on one SKU. Per `artifacts/build-plan.md` §3, the name-keyed JS + `MutationObserver` + `content: attr(data-gate)` pattern (`crowd7/data/clients/_patterns/slash-through-pricing.md`) **does not apply here.** The Season Pass "was $44.95" comparison ships as plain markup in the content HTML (a `<s>$44.95</s>` next to `$34.95`) — no JS, no `#ticketBlock` DOM targeting.

## ✅ Three artifacts (this build)

1. **Content HTML** — `preview/fall-funland.flash-content.html` (loader fetches this; built in parallel WS3, not this workstream)
2. **Standalone preview** — `preview/fall-funland.flash-content-preview.html` (`open` in a browser for Mat/Bryan/Michael to eyeball; built in parallel WS4, not this workstream)
3. **This build brief** — `ticketspice-build-brief.fall-funland-flash.md`

## 📋 Pre-publish checklist

- [ ] Confirm timezone for the Season Pass `orderDateIsBetween` Action (Confirm-Before-Publish #1)
- [ ] Confirm Flex Admission is genuinely any-day/no-calendar-restriction, or needs a visit-date picker (Confirm-Before-Publish #2)
- [ ] Configure **Flex Admission** at $13.95 (flash price, no gate variant, no date-window Action needed if #2 resolves "any-day")
- [ ] Configure **Season Pass** at $44.95 regular / $34.95 via the flash-window discount Action (Aug 19 00:00 – Aug 23 23:59, timezone TBD)
- [ ] Confirm NONE of Fixed Date Admission / Early Bird / Family 4-Pack / Fire Pits / Igloos / Launch Day Special are configured in this pass
- [ ] Get a live buyer-facing Harbaugh TicketSpice page URL for the loader paste (Open Items #3 — blocks only the paste, never this build)
- [ ] Get Mat's/Bryan's/Michael's eyes on the content-HTML preview before promoting `preview/` → `production/`
- [ ] Add this page to `TS-CDN-MIGRATION.md` as **born-on-Cloudflare** once the loader (WS6) is instantiated
- [ ] Note the Sep 10 Flex → $17.95 online-only price step on whatever tracks the Early Bird/In-Season transition, so it isn't discovered late

## 🗒 Open Items (for Bryan / Michael)

1. **Timezone for the Aug 19–23 flash-window date Action** — not stated anywhere in `event-info.md` or `state.md`. Needed before the Season Pass discount Action can be configured precisely (an Eastern-vs-Pacific-vs-other ambiguity at the boundary hours matters for a 5-day window). No default was guessed.
2. **Does Flex Admission need its own visit-date calendar Action, or is it genuinely any-day/no-restriction?** `event-info.md` calls it "any-day," and this brief leans toward no calendar restriction on that basis — but confirm explicitly, since it changes whether a date-picker Action needs to be built at all (see the Date Rules section above).
3. **TicketSpice page target** — no `*.ticketspice.com` URL for Harbaugh exists anywhere in the data layer yet (carried from `build-plan.md` §8 / `state.md`). Blocks only the human loader-paste step, never this build or the TS ticket-type configuration itself.
4. **Early Bird switchover (Aug 24, $15.95)** — pricing is locked; flagged only so the price-swap and the Sep 10 Flex step-up both get scheduled rather than discovered late.
5. **Fire Pits / Igloos pricing, Launch Day Special (in/out + 300-buyer cap), Labor Day Early Bird pricing** — all pre-existing open asks from `event-info.md`'s own "Open asks" list (#1–3). None affect this flash-window TS config pass (all excluded per the table above) — listed here only so the full picture is in one place; not blockers to publishing Flex + Season Pass.
