# 🎟️ Summers Farm — Season Pass 2026 · TicketSpice Build Brief

**Page:** Summers Farm Season Pass (page #2 of the cohesive 4-page design system)
**ClickUp:** `86ahze9za` (client) · fleet twin TBD
**Built by:** Crowdly · 2026-06-30
**Design donor:** Flower Festival page (deploy `a1b00e4`) — same `#sb-funnel` style system, brand palette, components.

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, rules) — the part the hybrid loader does NOT own. The page content/design (hero, value band, gallery, copy) ships from the repo via the loader; see `ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

All figures below are the **2025 Season Pass reference** (captured from `summersfarm.ticketspice.com/season-passes-2025`, 2026-06-30). Confirm/replace for 2026 with Rachel before this goes live — same convention used on the Flower page.

1. **2026 prices** — 2025 was **$50.50/person online · $54.50/person at the gate**. Confirm 2026.
2. **Season window / validity dates** — Rachel hasn't finalized the 2026 fall season; the Season Pass **sale starts "beginning of August"** (Rachel, 6/30). Confirm the exact "valid through" window.
3. **Scope** — does the pass cover the **Flower Festival + Fall Festival** both, or fall season only? Page copy says "all season long" without over-claiming a festival list — tighten once confirmed.
4. **Additional tiers** — 2025 sold a single per-person pass. If 2026 adds **family / senior / child** pass tiers, add them as ticket types below + matching cards on the page.

## 🎫 Native TicketSpice ticket types

Configure these in the TS cart (`#ticketBlock`). Online price shown; the page copy frames online-vs-gate.

| Ticket type | 2025 price (incl. fees) | Cap | Notes |
|---|---|---|---|
| **Season Pass — Online** | $50.50 / person | none | Unlimited visits all season; free Mega Slide every visit |
| **Season Pass — At the Gate** | $54.50 / person | none | Same pass, +$4 — set up only if gate sales run through TS; otherwise online-only |
| (2 & under) | Free — no ticket | — | Do not create a $0 ticket type; just omit, per the Flower page |

**Pass perk to encode:** every Season Pass includes **free Mega Slide access each visit** (the Mega Slide is a paid add-on for daily admission — this is the headline differentiator). If TS needs this as a comp/add-on attached to the pass, configure accordingly.

## 🧩 Cart configuration notes

- **No date calendar** — unlike the daily-admission pages, a season pass isn't date-gated; it's valid all season. Skip the `wbx-calendar` date-picker unless the farm wants a purchase-window.
- **Per-person quantity** — allow multiple passes in one checkout (families buy 3–5 at once).
- **Pass delivery** — if passes are scanned at the gate, confirm whether TS issues a scannable pass/QR or the farm uses a separate pass-card system.
- **Add-ons** — none carried by default. If the farm sells pass-holder add-ons (extra Mega Slide cards, food credit), list them.

## 🔌 Hybrid-loader wiring (for Bryan — publish enablement)

This page uses the same loader as the Flower page. To take it live, paste the canonical loader (from `ts-hybrid-loader-runbook.md`) into the Season Pass TS page's Raw HTML block **once**, editing only:

- `u4` → `'ticketspice-pages/season-pass/'`
- `f`  → `'season-pass-2026'`

Then promote `preview/` → `production/` when Rachel approves (a `git push` is the deploy). This is part of the umbrella loader ask to Bryan, ClickUp `86aj1q792` (loader block for all 4 pages).

## ✅ Three artifacts (this build)

1. **Content HTML** — `season-pass/preview/season-pass-2026.html` (loader fetches this)
2. **Standalone preview** — `season-pass/preview/season-pass-2026-preview.html` (`open` in a browser / htmlpreview link for Rachel)
3. **This build brief** — `season-pass/ticketspice-build-brief.season-pass.md`
