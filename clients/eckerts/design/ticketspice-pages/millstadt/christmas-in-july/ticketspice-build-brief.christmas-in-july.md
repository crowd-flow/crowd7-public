# TicketSpice Build Brief — Eckert's Millstadt "Christmas in July" Flash Sale

**Page:** standalone flash landing page (own TS page, not a modification of the existing admission/bonfire cart pages).
**Sale window:** Friday, July 17 – Sunday, July 19, 2026 (discount must expire automatically after 7/19).
**What it discounts:** September 2026 farm admission tickets AND September 2026 bonfire site rentals, both 50% off.
**Deadline:** page content ready for Amanda's review by Tue 7/14; live 7/17.

## 1. Raw HTML block — one-time paste

This page needs its own **new** TicketSpice page (not built yet). Once Mat/Bryan create it in the TS dashboard:

1. Add a Raw HTML block holding the **hybrid loader snippet** (`code-snippets/ts-hybrid-loader-runbook.md` — copy the canonical v6 loader verbatim, only edit the two marked lines).
2. Set the loader's two constants to:
   - `u4 = 'ticketspice-pages/millstadt/christmas-in-july/'`
   - `f  = 'millstadt-christmas-in-july.flash-content'`
3. Save + Publish once. All future content edits ship via `git push` to `crowd7-public` — no further TS editor work.

## 2. The discount mechanic — CRITICAL, needs Mat/Bryan decision

The content HTML (this repo) is copy/design ONLY — it does not compute or display a price. **The actual 50%-off discount must be configured natively in TicketSpice**, on whichever cart the CTA buttons send buyers to (the existing Millstadt admission + bonfire pages, or their 2026 successors — see the dependency flagged below). Two standard TS mechanics, pick one:

- **Option A — Promo code.** Create a percentage-off promo code (e.g. `CHRISTMASINJULY` or `BONFIRE50`) valid **only 7/17 00:00–7/19 23:59**, 50% off, restricted to September-dated admission + bonfire tickets. Simplest to build and to revoke after the window; the flash page's CTA buttons link straight to checkout and the buyer enters the code (or the link can pre-apply it via TS's promo-code URL parameter, if supported — confirm in the TS dashboard).
- **Option B — Conditional Action.** A date-gated Action that auto-applies 50% off any September-dated ticket line, active only 7/17–19. More setup, but no code for the buyer to remember/mistype.

**Recommendation: Option A (promo code)** — matches last year's Millstadt play per Amanda, faster to build under this deadline, and trivially expires after 7/19 (deactivate the code).

## 3. ⚠️ Dependency — the actual September 2026 Millstadt cart doesn't exist yet

As of 7/9, `eckerts.ticketspice.com` has no 2026-suffixed Millstadt admission or bonfire form — only 2025 (`millstadt-farm-admission-tickets-2025`, `millstadt-bonfire-site-rental-2025`), both currently gated "Closed for the Season." The full 2026 Millstadt page rebuild is tracked separately (`projects/eckerts-millstadt-admission-page/`) and is on hold pending an Amanda↔Bryan strategy call (1-page-vs-2, bundling) with no date attached — Sept 5 open gives it runway under normal circumstances, but this flash sale needs a **purchasable September date live by 7/17**, which is sooner than that project's current pace.

**Mat's call:** either (a) accelerate a bare-bones 2026 Millstadt cart (clone the 2025 form, bump dates/prices, skip the bigger redesign decision for now) so the promo code has something real to discount, or (b) confirm the 2025 forms auto-roll to 2026 dates without a rebuild and the promo code can point there directly. Either way, someone needs to lock this down before 7/17.

## 4. Pricing reference (2025 baseline, NOT to be treated as this year's confirmed price)

Pulled live off the 2025 TS admission page — use only as a sense-check when setting 2026 prices, not as gospel:

| Day | 2025 Online | 2025 Gate |
|---|---|---|
| Wed/Thu | $3 | $5 |
| Friday | $12 | $17 |
| Sat/Sun | $17 | $22 |

Bonfire site base price: not publicly listed anywhere (2025 TS bonfire page only reveals price after picking a date in the live widget) — confirm from Amanda or TicketSpice admin.

## 5. Links to swap in the content HTML

The content file has two placeholder tokens — `__TS_ADMISSION_URL__` and `__TS_BONFIRE_URL__` — used on all 3 CTA buttons. Once the real 2026 (or rolled-over) TS URLs exist, swap both tokens (simple find/replace across the file) and push.

## 6. What's still needed from Mat/Amanda

- [ ] Confirm promo mechanic (Option A vs B above) and the actual September 2026 base prices
- [ ] Confirm/accelerate the Millstadt 2026 cart so there's something live to discount by 7/17
- [ ] Hero/creative assets (optional) — page currently ships with a design-only gradient hero (no photo dependency), can swap in real Millstadt bonfire/fall photography once supplied
- [ ] Confirm Versailles is out of scope for this pass (Amanda's original ask mentioned both; Mat's Slack commit was Millstadt only)
