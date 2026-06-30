# 🔥 Summers Farm — Campfires 2026 · TicketSpice Build Brief

**Page:** Summers Farm Campfires (page #3 of the cohesive 4-page design system)
**ClickUp:** `86ahze9zt` (client) · fleet twin TBD
**Built by:** Crowdly · 2026-06-30
**Design donor:** Flower Festival page (deploy `a1b00e4`) — same `#sb-funnel` style system, brand palette, components. Cloned via the Season Pass build.

This brief covers the **native TicketSpice cart** (reservation types, prices, caps, rules) — the part the hybrid loader does NOT own. The page content/design (hero, value band, gallery, copy) ships from the repo via the loader; see `ts-hybrid-loader-runbook.md`.

## ⚠️ CONFIRM-BEFORE-PUBLISH (flagged — not invented)

All figures below were captured from the **live `summersfarm.com/campfires` page, 2026-06-30**. Confirm with Rachel before publish — same convention used on the Flower + Season Pass pages.

1. **2026 prices** — **$85 per campfire** (Fri / Sat afternoon / Sun afternoon) · **$95 per campfire** (Fri & Sat night). Confirm these are the 2026 rates and whether TicketSpice adds processing fees on top of the listed figure.
2. **Campfire dates / season window** — the site currently lists campfire dates as **"Coming Soon"** for the new season (historically reservations open ~late August). Confirm the exact 2026 campfire window before publish.
3. **Time slots / days** — confirm the afternoon-vs-night windows (start/end times) and exactly which days each rate applies to.
4. **Group pricing** — site references a group rate for **15+ tickets**. Confirm the exact terms if it should appear as its own ticket type / tier.

## 🎫 Native TicketSpice reservation types

Configure these in the TS cart (`#ticketBlock`). Each is a **per-campfire** reservation, NOT per person.

| Reservation type | 2025/26 price | Cap per fire | Notes |
|---|---|---|---|
| **Campfire — Afternoon** | $85 / campfire | up to 50 guests | Fri, Sat afternoon, Sun afternoon |
| **Campfire — Night** | $95 / campfire | up to 50 guests | Friday & Saturday nights |
| **Farm Ticket (per visitor)** | per farm pricing | — | **Required for every visitor** — no exceptions. Bundle/require alongside the campfire reservation. |
| (Group rate 15+) | TBD — confirm | — | Only add if it should be a selectable tier |

**Key rule to encode:** the campfire reservation does **not** include farm admission. Every person in the group must **also** buy a farm ticket. Configure the cart so a campfire reservation prompts/requires farm tickets for the headcount (an Action or a required companion ticket), so guests don't arrive without admission.

## 🧩 Cart configuration notes

- **Date / time picker** — campfires are date- AND slot-specific (afternoon vs. night, specific days). Use the `wbx-calendar` date-picker restricted to valid campfire dates, with afternoon/night as the ticket types or as an Action-gated selection.
- **Capacity** — each campfire holds up to 50; the *reservation* is one unit (the fire), and headcount drives the farm-ticket quantity. Decide whether to cap the number of campfires available per slot.
- **No alcohol** — surface this in the cart confirmation copy (it's enforced on-site; good to remind at checkout).
- **Cancellation policy** — full refund if the farm closes for weather or the guest cancels ≥10 days prior; within 10 days forfeits the fee. Put this in the TS confirmation/terms.
- **Add-ons** — none carried by default. If the farm sells campfire add-ons (extra wood bundles, s'mores kits, food credit), list them as upgrades.

## 🔌 Hybrid-loader wiring (for Bryan — publish enablement)

This page uses the same loader as the Flower page. To take it live, paste the canonical loader (from `ts-hybrid-loader-runbook.md`) into the Campfires TS page's Raw HTML block **once**, editing only:

- `u4` → `'ticketspice-pages/campfires/'`
- `f`  → `'campfires-2026'`

Then promote `preview/` → `production/` when Rachel approves (a `git push` is the deploy). This is part of the umbrella loader ask to Bryan, ClickUp `86aj1q792` (loader block for all 4 pages).

## ✅ Three artifacts (this build)

1. **Content HTML** — `campfires/preview/campfires-2026.html` (loader fetches this)
2. **Standalone preview** — `campfires/preview/campfires-2026-preview.html` (`open` in a browser / htmlpreview link for Rachel)
3. **This build brief** — `campfires/ticketspice-build-brief.campfires.md`

## 📸 Image note

Reuses the same farm-wide photo set as the Flower / Season Pass pages (no campfire-specific photos supplied yet). When Rachel/Mat provide actual campfire-at-dusk photos, swap the 6 `gallery-*.png` references + the `hero.png` for campfire imagery to make the page feel purpose-built.
