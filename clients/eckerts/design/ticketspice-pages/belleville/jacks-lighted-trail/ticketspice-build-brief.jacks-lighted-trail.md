# 🎃 Eckert's Jack's Lighted Trail (Belleville) — TicketSpice Build Brief

**Page:** Jack's Lighted Trail — standalone rebranded event, **design overlay only**. Amanda has already built the native TicketSpice cart's actions, dates, and prices (*"I have the Jack's Lighted Trail page built in terms of actions and dates and prices. It just doesn't look as good as you guys make it."*) — this brief covers the overlay + the flash-sale mechanic, not a from-scratch cart build.
**ClickUp:** `86bb9w51y` (fleet ws `90141379118`)
**Built by:** Crowdly · 2026-08-06 — built with what we have per Mat's same-day directive (do not wait on Amanda's email/Dropbox; placeholder-and-flag every open value).
**Design system:** standalone `#jlt-funnel` sub-brand — dark/night theme, matched to the live Jack's Lighted Trail Wix site (`artifacts/brand-extract.md` in the project folder), NOT Eckert's house style.
**Target:** working concept to Amanda **Mon/Tue 8/10–8/11**. Flash sale launches **8/31**, runs through midnight **9/4**. Trail runs **9/11–10/30** (dark on Halloween).

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date rules, Actions) — the part the hybrid loader does NOT own. The page content/design (hero, gallery, ticket-card marketing copy, sold-out treatment) ships from the repo via the loader; see `code-snippets/ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

Every number below is a **clearly-tagged placeholder** in the shipped page content — built this way deliberately so WS2–WS5 didn't block on Amanda. Confirm all of these before promoting `preview/` → `production/`:

1. **Flash-sale threshold (X)** — the ticket count where "Launch Day Steal" ($10 off) sells out and steps down to Tier 2 ($7 off). Bryan asked Amanda to confirm; she hasn't yet. Bryan's own fallback: *"look back and see how many tickets we sold on day one of the flash sale [last year] — it was way more than they expected."* Use last year's day-one count as the working number if Amanda doesn't specify one before build-out.
2. **Actual dollar prices** — the page shows `[[$X.XX]]` placeholders on all three ticket cards (Launch Day Steal, September Savings, October Dates) and struck `[[gate price]]` values. Pull real numbers from Amanda's already-built TS cart (the Open Ask below) rather than inventing them — she said the actions/dates/prices already exist there.
3. **Exact TS ticket names** — the sold-out/hidden-price JS (see below) currently keys on the placeholder string `"Launch Day Steal"`. Confirm this matches Amanda's real ticket-type name in the live cart exactly (case, spacing, punctuation) before promoting — a one-character mismatch means the treatment silently never fires.
4. **Show-time / hours windows** — brand-extract.md found conflicting Fri/Sat windows across the source site (6:30–9pm vs. 7:30–9pm vs. 7–9pm), likely reflecting different weeks. Page currently shows `[[exact windows TBD]]` in the info row.
5. **October pricing** — Bryan confirmed October dates stay bookable during the flash window (*"Yes"*) but no October-specific discount was confirmed. Page treats October as full price, no discount — flag this assumption to Amanda explicitly.

## 🎫 Native TicketSpice ticket types (target shape — Amanda's cart already exists, reconcile against it)

| Ticket type (page copy) | Discount | Dates | Mechanism |
|---|---|---|---|
| **Launch Day Steal** | **$10 off**, auto-applied — **no discount code** (confirmed codeless last year: *"I don't think that we made them put in a code. It was just automatic."*) | September dates only | First **X** tickets (threshold TBD) — see mechanism note below |
| **September Savings** (Tier 2) | **$7 off**, auto-applied, no code | September dates only | Active once Launch Day Steal's cap is exhausted, through the rest of the flash window (closes midnight 9/4) |
| **October Dates** | Full price, no flash discount | October dates only | Bookable throughout the flash window per Bryan's "Yes" |

**Do not build these as three code-gated coupon tiers.** Amanda was explicit last year's flash sale ran with no code — the discount has to be either (a) a native TS **quantity-capped ticket type** that naturally shows Sold Out once its cap hits, or (b) a date+quantity-conditional **Action** that swaps the displayed price once a companion counter/cap trips. Option (a) is simpler and is TicketSpice's own sold-out behavior for free — recommend it unless Amanda's existing cart is already built a different way (check the Open Ask below before re-architecting what she has).

## 🎯 Sold-out + hidden-price treatment (the "Boom Ball pattern")

Bryan, 8/6 check-in, on why this matters: *"anytime we can have a sold out ticket type on a page, it just really helps the conversions."* On the mechanism: *"we hid the price so they couldn't see the previous price. So they're not going, oh, I missed it. They go, I better get now before these are sold out."*

Implemented in the content HTML (bottom of `jacks-lighted-trail-belleville-2026-content.html`) as a name-keyed `MutationObserver` against the native `#ticketBlock`, same shape as the existing slash-through-pricing pattern:

- Watches for `.ticket-type` rows matching the ticket name(s) in the `SOLD_OUT_HIDE_PRICE` array (currently `["Launch Day Steal"]` — **confirm the exact live name**).
- When TS marks that row sold out (either a `sold-out` class or "Sold Out" text TS renders natively), the row's `.ticket-cost` price is visually hidden and replaced with a `SOLD OUT` badge — not struck through, genuinely hidden, per Bryan's spec.
- Name-keyed, not position-keyed, so it survives Action-driven reordering — same rationale as `crowd7/data/clients/_patterns/slash-through-pricing.md`.
- **New reusable pattern documented** at `crowd7/data/clients/_patterns/flash-sale-tiered-sellout.md` (this build is the first shipped instance — reuse across the account per the state.md ask).

## 🧩 Cart configuration notes

- **Flash-sale window** — Mon 8/31 through midnight Thu 9/4 (per Why-This-Matters in the project's `state.md`). Native TS Action or quantity cap should gate this window; confirm exact cutover timestamps with Amanda.
- **Launch Day Steal cap** — set the TS quantity cap to the confirmed threshold (Open Ask #1). Once hit, TS's native sold-out state should trigger both (a) our hidden-price JS above and (b) unlock/reveal the September Savings tier if it isn't shown concurrently already.
- **October bookability** — confirm October dates are selectable in the TS date-picker throughout the flash window (Bryan confirmed "Yes" to allowing purchase, but the cart config itself needs verifying).
- **AMG wedge** — per `state.md`'s Why This Matters, this page is the visible proof point in the informal Crowd7-vs-AMG comparison Amanda is running. Bryan warned AMG may push back on the overlay approach — keep that in mind if Amanda routes any pushback through Bryan rather than direct.

## 📸 Image note

Page ships with **real, harvested imagery** — not placeholder gradients. 17 assets (7 hero, 9 section, 1 logo) pulled from Jack's own Wix CDN, web-optimized (83MB → 5.3MB), committed to `clients/eckerts/design/assets/jacks-lighted-trail/`. **Still provisional**: these are cropped/sized for Jack's Wix layout, not custom-shot for this page. When Amanda's Dropbox night photography lands (Open Ask, project `state.md`), swap the hero background + gallery cards for the higher-fidelity set — note this to Amanda explicitly in the handoff so she reviews with eyes open that imagery may still improve.

## ✅ Three artifacts (this build)

1. **Content HTML** — `jacks-lighted-trail/preview/jacks-lighted-trail-belleville-2026-content.html` (loader fetches this)
2. **Standalone preview** — `jacks-lighted-trail/preview/jacks-lighted-trail-belleville-2026-content-preview.html` (`open` in a browser for Mat/Amanda)
3. **This build brief** — `jacks-lighted-trail/ticketspice-build-brief.jacks-lighted-trail.md`

**4. Loader snippet** (private repo, not shown here) — `crowd7/data/clients/eckerts/design/ticketspice-loaders/belleville.jacks-lighted-trail.ts-loader-snippet.v8.html`. v8 Cloudflare-Pages-primary, born migrated (no jsDelivr purge step — see `TS-CDN-MIGRATION.md` row for this page).

## 🔌 Hybrid-loader wiring (for Bryan/Amanda — publish enablement)

This page's TS event **already exists** (Amanda built actions/dates/prices there) — this is a Raw HTML block swap, not new-page creation:

1. **Open the live Jack's Lighted Trail TS page in the TicketSpice editor.** Find the Raw HTML block holding the current hand-pasted design (or add one if the cart is currently bare).
2. **Paste the v8 loader snippet** (`ticketspice-loaders/belleville.jacks-lighted-trail.ts-loader-snippet.v8.html`) into that block. Save + Publish. One time only.
3. **Verify** on the TS preview URL — DevTools Console should show `[c7-loader] loaded from Cloudflare Pages, folder=preview/`.
4. **Promote `preview/` → `production/`** (`cp preview/<file> production/<file> && git push` — the push IS the deploy) once the CONFIRM-BEFORE-PUBLISH items above are locked. Hold promotion until then — right now the loader would fetch clearly-placeholder pricing.

## 🧱 Open dependencies (gate go-live, not the build)

- **The live TicketSpice page URL** — needed to confirm exact ticket names (blocks the sold-out JS's name-key) and to reconcile Amanda's already-built actions/dates/prices against this brief's target shape. **Not a build blocker** per the standing TS-URL rule — only blocks the human paste + final pricing reconciliation.
- **Amanda:** confirm flash-sale threshold X; confirm real dollar prices for all three tiers; confirm exact hours windows; confirm exact TS ticket-type name for the sold-out JS key; Dropbox night photography (imagery upgrade, not a blocker).
- **Bryan/Amanda:** paste the loader into the Raw HTML block; reconcile the native cart's existing Actions against the Launch Day Steal → September Savings mechanism above.
- **Mat:** review the preview by **8/10–8/11** (committed to Amanda), then promote preview→production once pricing + threshold land.
