# 🍂 Summers Farm — Fall Festival 2026 · TicketSpice Build Brief

**Page:** Summers Farm Fall Festival (page #4 — final — of the cohesive 4-page design system)
**ClickUp:** `86ahzea01` (client) · fleet intake `86bapdp1j`
**Built by:** Crowdly · 2026-06-30
**Design donor:** Flower Festival page (deploy `a1b00e4`) via the Season Pass clone — same `#sb-funnel` style system, brand palette, components.

This brief covers the **native TicketSpice cart** (ticket types, prices, caps, date rules) — the part the hybrid loader does NOT own. The page content/design (hero, value band, gallery, copy) ships from the repo via the loader; see `ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

This is the flagship event and is a **FIRST DRAFT built well ahead of the Sept 26 kickoff** (per Rachel 6/30: deliver a first draft early so there's a feedback loop, then ready 2 weeks out). Everything below is 2025 reference or live-site copy — confirm with Rachel before publish. Same convention as the other 3 pages.

1. **2026 prices** — GA figure on the page is the **2025 weekday-online reference (~$16.95/person)**, shown as "starting at". Confirm/replace the 2026 **weekday** price, the **weekend** price, and whether gate pricing differs.
2. **2026 dates / hours** — summersfarm.com currently shows **"Dates & Hours Coming Soon."** Rachel 6/30: **Fall Festival kickoff = Sept 26**, marketing runs the two weeks prior, season not fully finalized. The info row shows a soft "September – October · dates coming soon" placeholder — confirm exact opening/closing dates + daily hours before publish.
3. **Ticket tiers** — 2025 sold weekday-vs-weekend GA plus a **Mega Slide add-on** and (per the 2025 draft) **senior / military value** tiers. Confirm the 2026 tier list; the page references GA + a Season Pass cross-sell only — no senior/military tier is shown yet (add cards once confirmed).
4. **Concessions / add-ons** — cider donuts + fresh-squeezed lemonade are named on the page as included farm eats (grounded in the 2025 brief). Confirm whether any are paid add-ons vs. on-site concessions.

## 🎫 Native TicketSpice ticket types

Configure these in the TS cart (`#ticketBlock`). Fall Festival is **date-gated** — daily admission tied to an operating calendar (unlike the Season Pass).

| Ticket type | 2025 reference (incl. fees) | Cap | Notes |
|---|---|---|---|
| **GA — Weekday (online)** | ~$16.95 / person | per-day | Ages 3–99; select rides 3:30–6:30pm on weekdays |
| **GA — Weekend (online)** | higher — confirm | per-day | All activities open; pumpkin train 11am–6:30pm, wagon rides 10am–6pm |
| **GA — At the Gate** | +gate premium — confirm | per-day | Only if gate sales run through TS |
| **Mega Slide add-on** | 2025 add-on — confirm | — | Free for Season Pass holders; paid add-on for daily admission |
| (2 & under) | Free — no ticket | — | Do not create a $0 ticket type; just omit, per the other pages |

**Senior / Military value tier:** the 2025 draft carried a senior/military value card. Not shown on this draft — add a ticket type + a page card if the farm runs it in 2026.

## 🧩 Cart configuration notes

- **Date calendar REQUIRED** — Fall Festival is daily-admission, date-gated. Wire the `wbx-calendar` date-picker to the operating-day calendar (weekends + festival weekdays, Sept 26 → end of October). The native-cart CSS already recolors the calendar to the brand palette (slate `#597792` enabled days).
- **Weekday vs. weekend pricing** — if TS drives the price off the selected date, configure the conditional so the page's "starting at $16.95 weekday · weekend priced higher" copy stays honest.
- **Per-person quantity** — allow multiple admissions in one checkout (families buy 3–6 at once).
- **Last wagon ride** — always 6pm daily; surface in cart confirmation copy if the farm wants it.
- **Group rates** — the farm runs group pricing (referenced on the live site). If groups buy through TS, add a group ticket type; otherwise leave the "Groups" page link native.

## 🔌 Hybrid-loader wiring (for Bryan — publish enablement)

Same loader as the other 3 pages. To take it live, paste the canonical loader (from `ts-hybrid-loader-runbook.md`) into the Fall Festival TS page's Raw HTML block **once**, editing only:

- `u4` → `'ticketspice-pages/fall-festival/'`
- `f`  → `'fall-festival-2026'`

Then promote `preview/` → `production/` when Rachel approves (a `git push` is the deploy). Part of the umbrella loader ask to Bryan, ClickUp `86aj1q792` (loader block for all 4 pages).

## ✅ Three artifacts (this build)

1. **Content HTML** — `fall-festival/preview/fall-festival-2026.html` (loader fetches this)
2. **Standalone preview** — `fall-festival/preview/fall-festival-2026-preview.html` (`open` in a browser / htmlpreview link for Rachel)
3. **This build brief** — `fall-festival/ticketspice-build-brief.fall-festival.md`
</content>
</invoke>
