# TicketSpice Build Brief — Eckert's Versailles "Christmas in July" Flash Sale

**Page:** standalone flash landing page (own TS page, not a modification of the existing field-access page).
**Sale window:** Friday, July 24 – Sunday, July 26, 2026 (discount must expire automatically after 7/26).
**What it discounts:** September 8–30, 2026 fall farm admission AND October 2026 bonfire site rentals, both 50% off.
**Promo code:** `Christmas26` (already decided by Amanda — not an open A/B choice like Millstadt's brief).

## 1. Raw HTML block — one-time paste

This page needs its own **new** TicketSpice page (not built yet). Once Mat/Bryan create it in the TS dashboard:

1. Add a Raw HTML block holding the **hybrid loader snippet** (`code-snippets/ts-hybrid-loader-runbook.md` — copy the canonical v6 loader verbatim, only edit the two marked lines).
2. Set the loader's two constants to:
   - `u4 = 'ticketspice-pages/versailles/christmas-in-july/'`
   - `f  = 'versailles-christmas-in-july.flash-content'`
3. Save + Publish once. All future content edits ship via `git push` to `crowd7-public` — no further TS editor work.

## 2. The discount mechanic

The content HTML (this repo) is copy/design ONLY — it does not compute or display a price. **The actual 50%-off discount must be configured natively in TicketSpice**, on whichever cart the CTA buttons send buyers to (the existing Versailles field-access page's fall tickets, and the not-yet-built bonfire product — see dependency below). Amanda has already fixed the mechanic as a **promo code**, not left open like Millstadt's:

- **Promo code:** `Christmas26`
- **Discount:** 50% off
- **Active window:** 7/24/2026 00:00 – 7/26/2026 23:59 (auto-expire; deactivate the code after 7/26 if TS doesn't auto-kill it)
- **Scope:** restrict the code to (a) the two fall admission tickets — `Weekday Fall Field Access & Playground Admission` and `Weekend Fall Field Access & Playground Admission` (TS page id `1000122`) — for visit dates **Sept 8–30, 2026 only**, and (b) whatever bonfire-site ticket type gets stood up for October dates (see §3). Do NOT scope it to the full fall window (Sept 5–Nov 1) — the sale is Sept 8–30 specifically, so either a date-range restriction on the code itself or a conditional Action (`apply-discount`, 50%, gated `Ticket Date Selection is between 2026-09-08 and 2026-09-30`) is needed on top of the code so a buyer can't stack it against, say, an October pumpkin-season admission date.
- Confirm in the TS dashboard whether a promo-code URL parameter can pre-apply `Christmas26` on the CTA links (matches the Millstadt pattern); if not, the buyer enters it manually at checkout — either way, flag the code prominently in the page copy (already done in the WS2 build).

## 3. ⚠️ Dependency — the October bonfire product doesn't exist yet for Versailles

Unlike the fall-admission side (already live — see §4), **no bonfire site rental product exists anywhere for Versailles** — confirmed via repo-wide grep across `crowd7-public` and `crowd7` for "bonfire" (zero hits outside Millstadt's own build). This is a harder gap than Millstadt's, which at least had an off-season 2025 form to roll over; Versailles has no prior-year bonfire page to clone from at all.

**Mat's call:** stand up a new Versailles bonfire product in TS before 7/24 (likely cloning Millstadt's bonfire cart structure and re-pointing it at Versailles' October dates/capacity), or the bonfire half of the promo has nothing to discount and the offer card should be pulled/reworked before send. This is the single blocking dependency on this build.

## 4. ✅ Good news — the Sept 2026 fall-admission cart already exists live

Confirmed via the live actions file (`versailles-farm-field-access-pass-2026.actions.json`, TS page id `1000122`, synced 2026-06-08): two Actions — `show-weekday-fall-after-sep5` / `show-weekend-fall-after-sep5` — auto-switch the field-access page to `Weekday Fall Field Access & Playground Admission` / `Weekend Fall Field Access & Playground Admission` for any visit date after Sep 5, 2026 (with Oct 6–8 weekend-rate overrides layered on top, irrelevant to this Sept 8–30 window). **Sept 8–30 falls entirely inside this existing live fall-ticket window** — no new cart needs to be built for the admission half, only the promo code/Action from §2 scoping it to 50% off. This is one fewer dependency than Millstadt had (whose 2026 admission cart didn't exist yet at brief-writing time).

## 5. Pricing reference (current summer field-access baseline, NOT the confirmed fall price)

The live Versailles field-access page (`versailles-farm-field-access-pass-2026.html`) only mirrors the *currently active* season's pricing in-repo — right now that's summer. No fall-specific dollar figures for `Weekday Fall Field Access & Playground Admission` / `Weekend Fall Field Access & Playground Admission` are captured anywhere in the repo (the actions.json only stores show/hide/discount *logic*, not base prices). Use the table below only as a directional sense-check, same caveat Millstadt's brief carried for its 2025 baseline:

| Day | Summer 2026 Online | Summer 2026 Gate |
|---|---|---|
| Tue – Fri | $5 | $8 |
| Sat & Sun | $7 | $10 |

Confirm the actual Sept 2026 fall base prices from Amanda or the live TicketSpice admin before setting the 50%-off discount amount — a wrong assumption here directly affects promo math. Bonfire site base price is not published anywhere for Millstadt either (its brief flagged the same gap), so confirm alongside the bonfire product build in §3.

## 6. Links to swap in the content HTML

The content file has two placeholder tokens — `__TS_ADMISSION_URL__` and `__TS_BONFIRE_URL__` — used on all CTA buttons. Only the **manage/edit** URL for the field-access page is on record (`https://manage.webconnex.com/a/147655/pages/1000122/edit/actions`) — the buyer-facing public URL isn't recorded in-repo (almost certainly exists already since the page is live; needs pulling from the TS dashboard or Amanda). The bonfire URL doesn't exist until the product in §3 is built. Once both real URLs exist, swap both tokens (simple find/replace across the file) and push.

## 7. What's still needed from Mat/Amanda

- [ ] Stand up the October bonfire product in TS (§3) — the one hard blocker on this build.
- [ ] Confirm actual Sept 2026 fall admission base prices (§5) so the 50%-off discount amount is set correctly.
- [ ] Confirm/scope the `Christmas26` promo code (or a paired conditional Action) so it only fires for Sept 8–30 visit dates, not the full Sept 5–Nov 1 fall window (§2).
- [ ] Pull the live buyer-facing TS URL for the Versailles admission page (§6).
- [ ] Confirm promo-code URL pre-apply is supported in TS, or the CTA links stay a manual-code-entry checkout.
